const Command = require("../../base/Command.js"),
Discord = require("../../dis.js");
const config = require("../../config");
const { exec } = require("child_process");

class ticket_close extends Command {

    constructor(client) {
        super(client, {
            name: "закрыть",
            dirname: __dirname,
            enabled: true,
            guildOnly: true,
            aliases: [],
            memberPermissions: [],
            botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
            nsfw: false,
            ownerOnly: false,
            cooldown: 0
        });
    }
    async run(message, args, data) {
        data.bot.reactmessage.forEach(async (closereact) => {
            if (closereact.id.cid === message.channel.id) {
                let did = closereact.id.did;
                let cid = closereact.id.cid;
                let gid = closereact.id.gid;
                let mu = closereact.id.mu;
                let chn = closereact.id.chn;
                let guild = message.guild;
                let userd = message.author;
                let BotData = data.bot;
                const member = guild.members.get(mu.id, false);
                message.delete();
                let guildData = data.guild;
                const closembed = new Discord.RichEmbed().setColor(guildData.color).setDescription(guildData.ticketsave)
                let f = await message.channel.send(closembed);
                exec(`dotnet ${config.hehe}/DiscordChatExporter.CLI/DiscordChatExporter.Cli.dll export -t "${config.token}" -b -c ${cid} -f HtmlDark -o "${config.hehe}/dashboard/public/tickets/${cid}/index.html"`, async (error, stdout, stderr) => {
                    if (error) {
                        console.log(error)
                        setTimeout(errorsave, 5000);
                        return;
                    }
                    if (stderr) {
                        setTimeout(trysave, 5000);
                        return;
                    }
                    setTimeout(trysave, 5000);
                    return;
                });
                async function errorsave() {
                    const sendembedfatal = new Discord.RichEmbed().setColor('#ff0000').setDescription(guildData.errorticketsend.replace("722057687881482250", "742945862560382987"))
                    const sendembed = new Discord.RichEmbed().setColor(guildData.color).setDescription(guildData.ticketwaitsend)
                    const delembed = new Discord.RichEmbed().setColor('#ff0000').setDescription(guildData.ticketdelete)
                    const sendembedsuc = new Discord.RichEmbed().setColor('#15ff00').setDescription(guildData.ticketsend)
                    const ticketerrorsave = new Discord.RichEmbed().setColor('#ff0000').setDescription(guildData.ticketerrorsave)
                    f.edit(ticketerrorsave);
                    let n = await message.channel.send(sendembed);
                    const sendembeddl = new Discord.RichEmbed()
                        .setAuthor(mu.username + "#" + mu.discriminator, mu.displayAvatarURL)
                        .setColor(guildData.color)
                        .addField("Создатель тикета:", `<@!${mu.id}>`, true)
                        .addField("Название тикета:", chn, true)
                        .addField("Тикет закрыт:", `<@!${userd.id}>`, true)
                        .addField("Логи:", `Произошла ошибка при сохранении логов`, true)
                    if (guildData.channellogs !== '') {
                        await guild.channels.get(guildData.channellogs).send(sendembeddl);
                    }
                    setTimeout(sendedit, 1000);
                    async function sendedit() {
                        try {
                            await member.send(sendembeddl);
                            n.edit(sendembedsuc);
                        } catch {
                            n.edit(sendembedfatal);
                        }
                        setTimeout(deletet, 5000);
                        await message.channel.send(delembed);
                        async function deletet() {
                            message.channel.delete();
                            await guildData.ticketsopen--;
                            await guildData.save();
                            await BotData.errortickets++;
                            await BotData.save();
                            await deletef();
                        };
                    };
                    return;
                }
                async function trysave() {
                    const sendembedfatal = new Discord.RichEmbed().setColor(guildData.color).setDescription(guildData.errorticketsend)
                    const sendembed = new Discord.RichEmbed().setColor(guildData.color).setDescription(guildData.ticketwaitsend)
                    const delembed = new Discord.RichEmbed().setColor(guildData.color).setDescription(guildData.ticketdelete)
                    const sendembedsuc = new Discord.RichEmbed().setColor('#15ff00').setDescription(guildData.ticketsend)
                    const savembed = new Discord.RichEmbed().setColor('#15ff00').setDescription(guildData.ticketlogsaved)
                    f.edit(savembed);
                    let n = await message.channel.send(sendembed);
                    let messageOptions = {};
                    messageOptions.embed = new Discord.RichEmbed()
                    .setAuthor(mu.username + "#" + mu.discriminator, mu.displayAvatarURL)
                    .setColor(guildData.color)
                    .addField("Создатель тикета:", `<@!${mu.id}>`, true)
                    .addField("Название тикета:", chn, true)
                    .addField("Тикет закрыт:", `<@!${userd.id}>`, true)
                    .addField("Логи:", `[Логи](https://bot.fydne.xyz/tickets/${cid})`, true)
                    messageOptions.files = [
                        {
                            name: `logs-${cid}.html`,
                            attachment: `https://bot.fydne.xyz/tickets/${cid}`
                        }
                    ]
                    if (guildData.channellogs !== '') {
                        let channelogs = guild.channels.get(guildData.channellogs);
                        let _msg = await channelogs.send(messageOptions);
                        _msg.attachments.forEach(attachment => {
                            messageOptions.embed = new Discord.RichEmbed()
                            .setAuthor(mu.username + "#" + mu.discriminator, mu.displayAvatarURL)
                            .setColor(guildData.color)
                            .addField("Создатель тикета:", `<@!${mu.id}>`, true)
                            .addField("Название тикета:", chn, true)
                            .addField("Тикет закрыт:", `<@!${userd.id}>`, true)
                            .addField("Логи:", `[Логи](https://bot.fydne.xyz/tickets?load=${attachment.url})`, true)
                            _msg.edit(messageOptions)
                        });
                    }
                    setTimeout(sendedit, 1000);
                    async function sendedit() {
                        try {
                            let _msg = await member.send(messageOptions);
                            _msg.attachments.forEach(attachment => {
                                messageOptions.embed = new Discord.RichEmbed()
                                .setAuthor(mu.username + "#" + mu.discriminator, mu.displayAvatarURL)
                                .setColor(guildData.color)
                                .addField("Создатель тикета:", `<@!${mu.id}>`, true)
                                .addField("Название тикета:", chn, true)
                                .addField("Тикет закрыт:", `<@!${userd.id}>`, true)
                                .addField("Логи:", `[Логи](https://bot.fydne.xyz/tickets?load=${attachment.url})`, true)
                                _msg.edit(messageOptions)
                            });
                            n.edit(sendembedsuc);
                        } catch {
                            n.edit(sendembedfatal);
                        }
                        setTimeout(deletet, 5000);
                        await message.channel.send(delembed);
                        async function deletet() {
                            message.channel.delete();
                            await guildData.ticketsopen--;
                            await guildData.save();
                            await BotData.logsave++;
                            await BotData.save();
                            await deletef();
                        };
                    };
                    return;
                }
                async function deletef() {
                    const BotData = await message.client.findOrCreateBot();
                    BotData.reactmessage.forEach(async (deleteits) => {
                        if (deleteits.id.did === did) {
                            const BotData = await message.client.findOrCreateBot();
                            BotData.reactmessage.pull({
                                id: deleteits.id
                            });
                            await BotData.save();
                        }
                    });
                };
            }
        });
    }
}
module.exports = ticket_close;