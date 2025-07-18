const Discord = require("discord.js");
const { exec } = require("child_process");
const config = require("../config");
module.exports = class {
    constructor(client) {
        this.client = client;
    }
    async run(member) {
        setTimeout(async() => {
            try {
                let client = this.client;
                let guild = member.guild;
                let guildDB = await client.database.Guilds.findById(guild.id)
                if(!guildDB) return;
                const embed = new Discord.MessageEmbed()
                .setColor("#fffa00")
                .setAuthor("Лив с сервера »  " + member.user.username + "#" + member.user.discriminator, member.user.displayAvatarURL({ format: 'png', dynamic: true }))
                .setDescription(`Участник ${member} покинул сервер`)
                .setFooter(`Id участника: ${member.id}`)
                .setTimestamp();
                const ch =  guild.channels.cache.get(guildDB.logs.channel);
                if(ch) await ch.send({embeds: [embed]});
            } catch (e){
                let msg = `Произошла ошибка.\nИвент: guildMemberRemove {do}\nКод ошибки:\n${e}`;
                this.client.channels.cache.get(this.client.config.errors_channel).send(msg);
            }
        }, 1);
        try {
            let client = this.client;
            let guild = member.guild;
            let guildDB = await client.database.Guilds.findById(guild.id)
            if(!guildDB) return;
            let TicketLogs = await this.client.database.TicketLogs.find();
            TicketLogs.filter(x => x.user == member.id && x.guild == guild.id).forEach(async log => {
                const channel = guild.channels.cache.get(log.channel);
                let opener = member;
                try{
                    const _data = await axios.post(`https://scpsl.store/api/discord?id=${TicketLogs.user}&type=main`);
                    if(_data != null) opener.cdn = _data.data;
                }catch{}
                let logs_msg = await channel.send({embeds:[new Discord.MessageEmbed().setColor(guildDB.color).setDescription('Сохранение логов...')]});
                exec(`${config.dotnet} ${config.directory}/DiscordChatExporter.CLI/DiscordChatExporter.Cli.dll export -t "${config.token}" -b -c ${channel.id} -f HtmlDark -o "${config.root_directory}/tickets/${channel.id}/index.html"`, async (error) => {
                    if (error) setTimeout(errorsave, 2000);
                    else setTimeout(trysave, 2000);
                });
                async function errorsave() {
                    const _user_data = GetUserData(opener);
                    logs_msg.edit({embeds:[new Discord.MessageEmbed().setColor('#ff0000').setDescription('<:errorv1:674651259424473088> Произошла ошибка при сохранении логов.')]});
                    let logs_sending = await channel.send({embeds:[new Discord.MessageEmbed().setColor(guildDB.color).setDescription('Отправка сообщения в лс...')]});
                    const sendembeddl = new Discord.MessageEmbed()
                        .setAuthor(_user_data[0], _user_data[1])
                        .setColor(guildDB.color)
                        .addField("Создатель тикета:", opener.user.toString(), true)
                        .addField("Название тикета:", log.name, true)
                        .addField("Тикет закрыт:", client.user.toString(), true)
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
                    const _user_data = GetUserData(opener);
                    logs_msg.edit({embeds:[new Discord.MessageEmbed().setColor('#15ff00').setDescription('Логи сохранены <:agree:760107426065416242>')]});
                    let logs_sending = await channel.send({embeds:[new Discord.MessageEmbed().setColor(guildDB.color).setDescription('Отправка сообщения в лс...')]});
                    const sendembeddl = new Discord.MessageEmbed()
                        .setAuthor(_user_data[0], _user_data[1])
                        .setColor(guildDB.color)
                        .addField("Создатель тикета:", opener.user.toString(), true)
                        .addField("Название тикета:", log.name, true)
                        .addField("Тикет закрыт:", client.user.toString(), true)
                        .addField("Логи:", `[Логи](https://bot.fydne.xyz/tickets/${log.channel})`, true)
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
            });
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
        } catch (e){
            let msg = `Произошла ошибка.\nИвент: guildMemberRemove\nКод ошибки:\n${e}`;
            this.client.channels.cache.get(this.client.config.errors_channel).send(msg);
        }
    }
};