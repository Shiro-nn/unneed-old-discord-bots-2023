const Discord = require("discord.js");
module.exports = class {
    constructor(client) {
        this.client = client;
    }
    async run(interaction) {
        const client = this.client;
        try {
            const TicketLogs = await this.client.database.TicketLogs.findOne({channel: interaction.message.channel.id});
            if (!TicketLogs) return;
            let guildDB = await client.database.Guilds.findById(TicketLogs.guild)
            if(!guildDB) guildDB = await client.database.Guilds({_id: TicketLogs.guild}).save();
            const channel = interaction.message.channel;
            if(channel == null || channel == undefined) return;
            const message = await interaction.message;
            if(message == null || message == undefined) return;
            const member = interaction.member;
            if (!(member.roles.cache.some((r) => TicketLogs.roles.includes(r.id)) || channel.permissionsFor(member).has("MANAGE_MESSAGES"))) {
                interaction.reply({content:'Недостаточно прав', ephemeral:true, allowedMentions:{repliedUser: false}});
                return;
            }
            const embed_submit = new Discord.MessageEmbed()
            .setColor(guildDB.color)
            .setDescription('Вы уверены, что хотите закрыть тикет?')
            const doButton = new Discord.MessageButton()
            .setCustomId('CloseTicketSubmitBottom')
            .setLabel('Да')
            .setEmoji('760107426065416242')//✔️
            .setStyle('SUCCESS');
            const Button = new Discord.MessageActionRow().addComponents(doButton);
            interaction.reply({embeds:[embed_submit], components:[Button], ephemeral:true, allowedMentions:{repliedUser: false}});
        }catch(e){
            let msg = `Произошла ошибка.\nИвент: ReactCheck\nКод ошибки:\n${e}`;
            this.client.channels.cache.get(this.client.config.errors_channel).send(msg);;
        }
    }
};