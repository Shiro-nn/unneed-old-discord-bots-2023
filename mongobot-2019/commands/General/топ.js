const Command = require("../../base/Command.js");
const { get } = require('node-superfetch');
const Discord = require("../../dis.js");
const { version } = require("../../package.json");
const moment = require("moment");

class top extends Command {

    constructor(client) {
        super(client, {
            name: "топ",
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
    async run(message, args, data, client) {
        const mm = message;
        const cc = message.channel;
        message.delete();
        var leadOut = ['', ''];
        let MemData = require("../../base/Member");
        let count = 1;
        let count2 = 1;
        let countall = 1;
        let page = 1;
        let memberData = await MemData.find({ guildID: message.guild.id });
        memberData.sort((a, b) => b.level - a.level);
        memberData.forEach((e) => {
            try {
                mm.guild.fetchMember(e.id, false).then(async (member) => {
                    if (member !== undefined) {
                        if (member.user !== undefined) {
                            if (count2 == 5) {
                                count2 = 0;
                                count++;
                            }
                            count2++;
                            let neededXp = 5 * (e.level * e.level) + 80 * e.level + 100;
                            let msg = `${member.user.username}#${member.user.discriminator} | ${e.level}lvl | ${e.exp}/${neededXp}xp\n`;
                            if (count2 === 1) {
                                leadOut[count] = `${msg}`;
                            } else {
                                leadOut[count] += `${msg}`;
                            }
                            leadOut[count].replace("undefined", "");
                        }
                    }
                });
            } catch { }
        });
        setTimeout(async () => {
            countall = count;
            const embed = new Discord.RichEmbed()
                .setColor(data.guild.color)
                .setThumbnail(mm.guild.iconURL)
                .setTitle(`${page}/${countall}`)
                .addField(`Топ общительных **${mm.guild.name}**`, `${leadOut[page]}`, true)
                .setFooter("© fydne#0557", `${client.user.displayAvatarURL}`);
            let msg = await cc.send(embed);
            if(msg == null) return;
            await msg.react("⬅");
            await msg.react("➡");
            await msg.react("❌");
            let collector = msg.createReactionCollector((reaction, user) => user.id === msg.author.id);

            collector.on("collect", async (reaction, user) => {
                if (reaction._emoji.name === "⬅") {
                    page = page - 1;
                    if (page > count) {
                        return msg.delete();
                    }
                    if (page < 1) {
                        return msg.delete();
                    }
                    countall = count;
                    const embed = new Discord.RichEmbed()
                        .setColor(data.guild.color)
                        .setThumbnail(mm.guild.iconURL)
                        .setTitle(`${page}/${countall}`)
                        .addField(`Топ общительных **${mm.guild.name}**`, `${leadOut[page]}`, true)
                        .setFooter("© fydne#0557", `${client.user.displayAvatarURL}`)
                    msg.edit(embed);
                };
                if (reaction._emoji.name === "➡") {
                    page = page + 1;
                    if (page > count) {
                        return msg.delete();
                    }
                    if (page < 0) {
                        return msg.delete();
                    }
                    countall = count;
                    const embed = new Discord.RichEmbed()
                        .setColor(data.guild.color)
                        .setThumbnail(mm.guild.iconURL)
                        .setTitle(`${page}/${countall}`)
                        .addField(`Топ общительных **${mm.guild.name}**`, `${leadOut[page]}`, true)
                        .setFooter("© fydne#0557", `${client.user.displayAvatarURL}`)
                    msg.edit(embed);
                };
                if (reaction._emoji.name === "❌") {
                    return msg.delete();
                }
                await reaction.remove(mm.author.id);

            });
        }, 100);
    }
}
module.exports = top;