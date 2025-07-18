const Discord = require("../dis.js");

module.exports = class {

    constructor(client) {
        this.client = client;
    }

    async run(guild) {
        try {
            let client = this.client;

            const BotData = await client.findOrCreateBot();

            let guildData = await client.findOrCreateGuild({ id: guild.id });

            if (guildData.ticketenable8) {
                if (guildData.ticketmessage8 === '') return;
                client.logger.log(`В ${guild.name} включен 9-ый тикет`, `debug`)
                const server = client.guilds.get(guild.id);
                const channele = server.channels.get(guildData.ticketchannel8);
                const songDisplay = await channele.fetchMessage(guildData.ticketmessage8);
                const emojiList = [guildData.ticketreact8];
                songDisplay.react(guildData.ticketreact8);
                const reactionCollector = songDisplay.createReactionCollector(
                    (reaction, user) => (emojiList.includes(reaction.emoji.id) || emojiList.includes(reaction.emoji.name)) && !user.bot,
                    { time: 0 }
                );
                reactionCollector.on('collect', async reaction => {
                    guildData = await client.findOrCreateGuild({ id: server.id });
                    const user = reaction.users.last();
                    reaction.remove(user);
                    let id = guildData.ticketopen8;
                    await guildData.ticketopen8++;
                    await guildData.ticketsopen++;
                    await guildData.save();
                    await BotData.ticketsopen++;
                    await BotData.save();
                    const member = guild.member(user) || await guild.fetchMember(user);
                    if (true) {
                        guild.createChannel(`${guildData.ticketchannelname8}-${id}`, {
                            type: 'text'
                        }).then(async c => {
                            if (guildData.ticketcategoryon8) c.setParent(guildData.ticketcategory8);
                            // let supportRole = message.guild.roles.find(`id`, config.supportRole)
                            c.overwritePermissions(guild.defaultRole, {
                                VIEW_CHANNEL: false
                            })
                            c.overwritePermissions(member, {
                                VIEW_CHANNEL: true,
                                SEND_MESSAGES: true
                            })
                            c.overwritePermissions(guildData.ticketchannelperms8, {
                                VIEW_CHANNEL: true,
                                SEND_MESSAGES: true
                            });
                            await c.setTopic(`${member} | ${guildData.ticketchannelname8}`);
                            if (guildData.ticketmessage1enable8) await c.send(guildData.ticketmessage1send8);
                            if (guildData.ticketmessage2enable8) await c.send(guildData.ticketmessage2send8.replace(/{member}/g, member));
                            if (guildData.ticketmessage3enable8) {
                                const welcome = new Discord.RichEmbed()
                                    .setColor(guildData.color)
                                    .setDescription(guildData.ticketmessage3send8)
                                let w = await c.send(welcome);
                                await w.pin();
                                await c.bulkDelete(1);
                            }
                            const close = new Discord.RichEmbed()
                                .setColor(guildData.color)
                                .setDescription(guildData.ticketclosemsg8)
                            let d = await c.send(close)
                            await d.pin();
                            await c.bulkDelete(1);
                            d.react('722545677908836372');
                            client.emit('reactcheck', d.id, c.id, guild.id, member.user, `${guildData.ticketchannelname8}-${id}`, guildData.ticketchannelperms8);
                            BotData.reactmessage.push({
                                id: {
                                    mu: member.user,
                                    did: d.id,
                                    cid: c.id,
                                    gid: guild.id,
                                    chn: `${guildData.ticketchannelname8}-${id}`,
                                    ri: guildData.ticketchannelperms8
                                },
                            });
                            BotData.save();
                        });
                    }
                });
            };
        } catch { }
    }
};