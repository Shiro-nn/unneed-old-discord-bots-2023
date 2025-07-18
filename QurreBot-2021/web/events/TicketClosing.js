const Discord = require("discord.js");
const { exec } = require("child_process");
const { token } = require("../config");
const config = require("../config");
const axios = require('axios');
module.exports = class {
    constructor(client) {
        this.client = client;
        this.closing = [];
    }
    async run(interaction) {
        const client = this.client;
        const guid=function(){return'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'.replace(/[xy]/g,function(c){var r=Math.random()*16|0,v=c=='x'?r:r&0x3|0x8;return v.toString(16);});}
        try {
            if(this.closing.filter(x => x == interaction.message.channelId).length > 0){
                interaction.reply({content:'Тикет уже закрывается', ephemeral: true});
                return;
            }
            const hash = guid();
            const TicketLogs = await this.client.database.TicketLogs.findOne({channel: interaction.message.channel.id});
            if (!TicketLogs) return;
            const guild = client.guilds.cache.get(TicketLogs.guild);
            if(guild == null || guild == undefined) return;
            const channel = interaction.message.channel;
            if(channel == null || channel == undefined) return;
            const message = await interaction.message;
            if(message == null || message == undefined) return;
            const member = interaction.member;
            if (!(member.roles.cache.some((r) => TicketLogs.roles.includes(r.id)) || channel.permissionsFor(member).has("MANAGE_MESSAGES"))) {
                interaction.reply({content:'Недостаточно прав', ephemeral: true});
                return;
            }
            this.closing.push(channel.id);
            let guildDB = await client.database.Guilds.findById(guild.id)
            if(!guildDB) guildDB = await client.database.Guilds({_id: guild.id}).save();
            let logs_msg = await channel.send({embeds:[new Discord.MessageEmbed().setColor(guildDB.color).setDescription('Сохранение логов <a:hourglass:909131354913005650>')]});
            let opener = {cdn:{}};
            try{opener=await guild.members.fetch(TicketLogs.user);}catch{}
            try{
                const _data = await axios.post(`https://scpsl.store/api/discord?id=${TicketLogs.user}&type=main`);
                if(_data != null) opener.cdn = _data.data;
            }catch{}
            exec(`dotnet ${config.directory}/DiscordChatExporter.CLI/DiscordChatExporter.Cli.dll export -t "${token}" -b -c ${channel.id} -f HtmlDark -o "${config.root_directory}/tickets/${hash}/index.html"`, async (error) => {
                if (error) setTimeout(errorsave, 2000);
                else setTimeout(trysave, 2000);
            });
            async function errorsave() {
                logs_msg.edit({embeds:[new Discord.MessageEmbed().setColor('#ff0000').setDescription('<:errorv1:674651259424473088> Произошла ошибка при сохранении логов.')]});
                let logs_sending = await channel.send({embeds:[new Discord.MessageEmbed().setColor(guildDB.color).setDescription('Отправка сообщения в лс <a:hourglass:909131354913005650>')]});
                const _user_data = GetUserData(opener);
                const sendembeddl = new Discord.MessageEmbed()
                    .setAuthor(_user_data[0], _user_data[1])
                    .setColor(guildDB.color)
                    .addField("Создатель тикета:", `<@${TicketLogs.user}>`, true)
                    .addField("Название тикета:", TicketLogs.name, true)
                    .addField("Тикет закрыт:", member.user.toString(), true)
                    .addField("Логи:", `Произошла ошибка при сохранении логов`, true)
                if (guildDB.logs.channel !== ''){
                    const __ch =  guild.channels.cache.get(guildDB.logs.channel)
                    if(__ch) await __ch.send({embeds:[sendembeddl]});
                }
                setTimeout(sendedit, 1000);
                async function sendedit() {
                    try{
                        await opener.send({embeds:[sendembeddl]});
                        logs_sending.edit({embeds:[new Discord.MessageEmbed().setColor('#15ff00').setDescription('Логи отправлены <:agree:760107426065416242>')]});
                    }catch{
                        logs_sending.edit({embeds:[new Discord.MessageEmbed().setColor('#ff0000').setDescription("Произошла ошибка при отправке <:disagree:742945862560382987>")]});
                    }
                    setTimeout(deletet, 5000);
                    await channel.send({embeds:[new Discord.MessageEmbed().setColor('#ff0000').setDescription('<:errorv1:674651259424473088> Тикет будет удален через 5 секунд.')]});
                };
            }
            async function trysave() {
                logs_msg.edit({embeds:[new Discord.MessageEmbed().setColor('#15ff00').setDescription('Логи сохранены <:agree:760107426065416242>')]});
                let logs_sending = await channel.send({embeds:[new Discord.MessageEmbed().setColor(guildDB.color).setDescription('Отправка сообщения в лс <a:hourglass:909131354913005650>')]});
                const _user_data = GetUserData(opener);
                const sendembeddl = new Discord.MessageEmbed()
                    .setAuthor(_user_data[0], _user_data[1])
                    .setColor(guildDB.color)
                    .addField("Создатель тикета:", `<@${TicketLogs.user}>`, true)
                    .addField("Название тикета:", TicketLogs.name, true)
                    .addField("Тикет закрыт:", member.user.toString(), true)
                    .addField("Логи:", `[Логи](https://bot.fydne.xyz/tickets/${hash})`, true)
                if (guildDB.logs.channel !== ''){
                    const __ch =  guild.channels.cache.get(guildDB.logs.channel)
                    if(__ch) await __ch.send({embeds:[sendembeddl]});
                }
                setTimeout(sendedit, 1000);
                async function sendedit() {
                    try{
                        await opener.send({embeds:[sendembeddl]});
                        logs_sending.edit({embeds:[new Discord.MessageEmbed().setColor('#15ff00').setDescription('Логи отправлены <:agree:760107426065416242>')]});
                    }catch{
                        logs_sending.edit({embeds:[new Discord.MessageEmbed().setColor('#ff0000').setDescription('Произошла ошибка при отправке <:disagree:742945862560382987>')]});
                    }
                    setTimeout(deletet, 5000);
                    await channel.send({embeds:[new Discord.MessageEmbed().setColor('#ff0000').setDescription('<:errorv1:674651259424473088> Тикет будет удален через 5 секунд.')]});
                };
            }
            async function deletet(){channel.delete()}
            function GetUserData(user) {
                try{
                    return [user.cdn.user + "#" + user.cdn.discriminator, user.cdn.avatar];
                }catch{
                    try{
                        return [user.user.username + "#" + user.user.discriminator, user.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 })];
                    }catch{
                        return ['error#0000', 'https://cdn.scpsl.store/scpsl.store/users/avatars/unknow.png'];
                    }
                }
            }
            function sleep(ms) {
                return new Promise(resolve => setTimeout(resolve, ms));
            }
        }catch(e){
            let msg = `Произошла ошибка.\nИвент: TicketClosing\nКод ошибки:\n${e}`;
            this.client.channels.cache.get(this.client.config.errors_channel).send(msg);;
        }
    }
};