const Discord = require("../dis.js");
const { exec } = require("child_process");
const { token } = require("../config");
const config = require("../config");

module.exports = class {

    constructor(client) {
        this.client = client;
    }

    async run(did, cid, gid, mu, chn, ri) {
        try {
            if (ri == null || ri == undefined) ri = 0;
            let client = this.client;
            /*try{
              const guild = client.guilds.get(gid);
              const c = guild.channels.get(cid);
              const d = await c.fetchMessage(did);
              d.react('722545677908836372');
            }catch{
              const BotDat = await client.findOrCreateBot();
              BotDat.reactmessage.forEach(async (deleteits) => {
                if(deleteits.id.did === did){
                  const BotDat = await client.findOrCreateBot();
                  BotDat.reactmessage.pull({
                    id: deleteits.id
                  });
                  await BotDat.save();
                }
              });
            }*/
            client.guilds.get(gid).fetchMember(mu.id, false).then(async (aut) => {
                const guildData = await client.findOrCreateGuild({ id: gid });
                const guild = client.guilds.get(gid);
                if(guild == null || guild == undefined) return;
                const c = guild.channels.get(cid);
                if(c == null || c == undefined) return;
                const d = await c.fetchMessage(did);
                if(d == null || d == undefined) return;
                const closembed = new Discord.RichEmbed()
                    .setColor(guildData.color)
                    .setDescription(guildData.ticketsave)
                const BotData = await client.findOrCreateBot();
                const closereact = d.createReactionCollector(
                    (reaction, user) => !user.bot,
                    { time: 0 }
                );
                closereact.on('collect', async reaction => {
                    let closeemoji = false;
                    client.guilds.get(gid).fetchMember(reaction.users.last().id, false).then(async (member) => {
                        if (reaction.emoji.id === '722545677908836372') {
                            closeemoji = false;
                            const user = reaction.users.last();
                            reaction.remove(user);
                            if (member.roles.some((r) => r.id === ri) || c.permissionsFor(member).has("MANAGE_MESSAGES")) {
                                d.react('742945862560382987');
                                d.react('760107426065416242');
                                let count = 10;
                                setInterval(() => {
                                    if (count !== 0) {
                                        if (!closeemoji) {
                                            d.reactions.forEach(async (reaction) => {
                                                if (reaction._emoji.id !== '742945862560382987') d.react('742945862560382987');
                                                if (reaction._emoji.id !== '760107426065416242') d.react('760107426065416242');
                                            });
                                            count--;
                                        }
                                    }
                                }, 100);
                            }
                        }
                        if (reaction.emoji.id === '742945862560382987') {//❌
                            closeemoji = true;
                            const userc = reaction.users.last();
                            reaction.remove(userc);
                            if (member.roles.some((r) => r.id === ri) || c.permissionsFor(member).has("MANAGE_MESSAGES")) {
                                let count = 5;
                                setInterval(() => {
                                    if (count !== 0) {
                                        if (closeemoji) {
                                            d.reactions.forEach(async (reaction) => {
                                                if (reaction._emoji.id !== '722545677908836372') {
                                                    reaction.remove();
                                                }
                                            });
                                            count--;
                                        }
                                    }
                                }, 100);
                                await d.react('722545677908836372');
                            }
                        }
                        if (reaction.emoji.id === '760107426065416242') {//✔️
                            const userd = reaction.users.last();
                            reaction.remove(userd);
                            if (member.roles.some((r) => r.id === ri) || c.permissionsFor(member).has("MANAGE_MESSAGES")) {
                                let f = await c.send(closembed);
                                exec(`dotnet ${config.hehe}/DiscordChatExporter.CLI/DiscordChatExporter.Cli.dll export -t "${token}" -b -c ${c.id} -f HtmlDark -o "${config.hehe}/dashboard/public/tickets/${c.id}/index.html"`, async (error, stdout, stderr) => {
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
                                    const sendembedfatal = new Discord.RichEmbed()
                                        .setColor('#ff0000')
                                        .setDescription(guildData.errorticketsend.replace("722057687881482250", "742945862560382987"))
                                    const sendembed = new Discord.RichEmbed()
                                        .setColor(guildData.color)
                                        .setDescription(guildData.ticketwaitsend)
                                    const delembed = new Discord.RichEmbed()
                                        .setColor('#ff0000')
                                        .setDescription(guildData.ticketdelete)
                                    const sendembedsuc = new Discord.RichEmbed()
                                        .setColor('#15ff00')
                                        .setDescription(guildData.ticketsend)
                                    const ticketerrorsave = new Discord.RichEmbed()
                                        .setColor('#ff0000')
                                        .setDescription(guildData.ticketerrorsave)
                                    f.edit(ticketerrorsave);
                                    let n = await guild.channels.get(cid).send(sendembed);
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
                                            await aut.send(sendembeddl);
                                            n.edit(sendembedsuc);
                                        } catch {
                                            n.edit(sendembedfatal);
                                        }
                                        setTimeout(deletet, 5000);
                                        await guild.channels.get(cid).send(delembed);
                                        async function deletet() {
                                            guild.channels.get(cid).delete();
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
                                    const sendembedfatal = new Discord.RichEmbed()
                                        .setColor(guildData.color)
                                        .setDescription(guildData.errorticketsend)
                                    const sendembed = new Discord.RichEmbed()
                                        .setColor(guildData.color)
                                        .setDescription(guildData.ticketwaitsend)
                                    const delembed = new Discord.RichEmbed()
                                        .setColor(guildData.color)
                                        .setDescription(guildData.ticketdelete)
                                    const sendembedsuc = new Discord.RichEmbed()
                                        .setColor('#15ff00')
                                        .setDescription(guildData.ticketsend)
                                    const savembed = new Discord.RichEmbed()
                                        .setColor('#15ff00')
                                        .setDescription(guildData.ticketlogsaved)
                                    f.edit(savembed);
                                    let n = await guild.channels.get(cid).send(sendembed);
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
                                            let _msg = await aut.send(messageOptions);
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
                                        await c.send(delembed);
                                        async function deletet() {
                                            guild.channels.get(cid).delete();
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
                                    const BotData = await client.findOrCreateBot();
                                    BotData.reactmessage.forEach(async (deleteits) => {
                                        if (deleteits.id.did === did) {
                                            const BotData = await client.findOrCreateBot();
                                            BotData.reactmessage.pull({
                                                id: deleteits.id
                                            });
                                            await BotData.save();
                                        }
                                    });
                                };
                            }
                        }
                    });
                })
            });
        } catch { }
    }
};