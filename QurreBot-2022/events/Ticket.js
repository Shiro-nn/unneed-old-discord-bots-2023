const Discord = require("discord.js");
module.exports = class {
    constructor(client) {
        this.client = client;
        this.anti_flood = [];
    }
    async run(interaction) {
        try {
            const client = this.client;
            const data = await client.database.Tickets.findOne({message:interaction.message.id});
            if(!data || !data.enable){
                interaction.reply({ content: 'Тикет отключен', ephemeral: true, allowedMentions: { repliedUser: false } });
                return;
            }
            const hash = data._id;
            const guild = client.guilds.cache.get(data.guild);
            if(!guild) return;
            const member = interaction.member;
            const user = member.user;
            if(this.anti_flood.filter(x => x.user == user.id && x.ticket == hash).length > 0){
                if(Date.now() < new Date(this.anti_flood.find(x => x.user == user.id && x.ticket == hash).date + 30000).getTime()){
                    interaction.reply({ content: 'Вы уже создали тикет', ephemeral: true, allowedMentions: { repliedUser: false } });
                    return;
                }
                else this.anti_flood.find(x => x.user == user.id).date = Date.now();
            }else{this.anti_flood.push({user: user.id, date: Date.now(), ticket:hash})}
            data.opens++;
            await data.save();
            {
                let _guild = await client.database.Guilds.findById(guild.id)
                if(!_guild) _guild = await client.database.Guilds({_id: guild.id}).save();
                guild.channels.create(`${data.name}-${data.opens}`, { type: 'text' }).then(async ch => {
                    interaction.reply({ content: `Тикет создан - <#${ch.id}>`, ephemeral: true, allowedMentions: { repliedUser: false } });
                    try{if (data.category != '') ch.setParent(data.category);}catch{}
                    ch.permissionOverwrites.create(guild.roles.everyone, {
                        VIEW_CHANNEL: false
                    })
                    ch.permissionOverwrites.create(user.id, {
                        VIEW_CHANNEL: true,
                        SEND_MESSAGES: true
                    })
                    let everyone_role = guild.roles.cache.find(x => x.rawPosition == 0).id;
                    data.roles.forEach(role_id => {
                        if(role_id == everyone_role) ch.permissionOverwrites.create(guild.roles.everyone, { VIEW_CHANNEL: true, SEND_MESSAGES: true });
                        else try{ ch.permissionOverwrites.create(role_id, { VIEW_CHANNEL: true, SEND_MESSAGES: true }); }catch{}
                    });
                    await ch.setTopic(`${member} | ${data.name}`);
                    const embed_main = new Discord.MessageEmbed()
                    .setColor(_guild.color)
                    .setDescription(data.message_embed)
                    let close_msg = "Для закрытия тикета, нажмите на 🔒";
                    if(data.only_admin_close) close_msg += "\n**Закрыть может только администратор**";
                    const embed_close = new Discord.MessageEmbed()
                    .setColor(_guild.color)
                    .setDescription(close_msg)
                    const doButton = new Discord.MessageButton()
                    .setCustomId('CloseTicketBottom')
                    .setLabel('Закрыть тикет')
                    .setEmoji('909150674082734090')
                    .setStyle('PRIMARY');
                    const row = new Discord.MessageActionRow().addComponents(doButton);
                    const msg = await ch.send({content:data.message_text.replace(/{member}/g, member), embeds:[embed_main, embed_close], components:[row]});
                    await msg.pin();
                    await ch.bulkDelete(1);
                    await this.client.database.TicketLogs({
                        user: member.user.id,
                        message: msg.id,
                        channel: ch.id,
                        guild: guild.id,
                        name: `${data.name}-${data.opens}`,
                        roles: data.roles
                    }).save();
                });
            }
        }catch(e){
            try{interaction.reply({ content: 'Произошла ошибка при создании тикета', ephemeral: true, allowedMentions: { repliedUser: false } });}catch{}
            let msg = `Произошла ошибка.\nИвент: Ticket\nКод ошибки:\n${e}`;
            this.client.channels.cache.get(this.client.config.errors_channel).send(msg);
        }
    }
};