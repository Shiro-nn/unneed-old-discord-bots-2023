const Command = require("../../base/Command.js"),
Discord = require("../../dis.js");

class ServersList extends Command {

    constructor(client) {
        super(client, {
            name: "сервера",
            dirname: __dirname,
            enabled: true,
            guildOnly: false,
            aliases: ["servers-list", "slist"],
            memberPermissions: [],
            botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
            nsfw: false,
            ownerOnly: true,
            cooldown: 5000
        });
    }

    async run(message, args, data) {
        let i0 = 0;
        let i1 = 10;
        let page = 1;
        let description =
            `Серверов : ${message.client.guilds.size}\n\n` +
            message.client.guilds.sort((a, b) => b.memberCount - a.memberCount).map((r) => r)
                .map((r, i) => `**${i + 1}** - ${r.name} | ${r.memberCount} Людей`)
                .slice(0, 10)
                .join("\n");
        let embed = new Discord.RichEmbed()
            .setColor(data.guild.color)
            .setFooter(message.client.user.username)
            .setTitle(`Страница: ${page}/${Math.ceil(message.client.guilds.size / 10)}`)
            .setDescription(description);
        let msg = await message.channel.send(embed);
        await msg.react("⬅");
        await msg.react("➡");
        await msg.react("❌");
        let collector = msg.createReactionCollector((reaction, user) => user.id === message.author.id);
        collector.on("collect", async (reaction, user) => {
            if (reaction._emoji.name === "⬅") {
                i0 = i0 - 10;
                i1 = i1 - 10;
                page = page - 1;
                if (i0 < -1) {
                    return msg.delete();
                }
                if (!i0 || !i1) {
                    return msg.delete();
                }
                description = `Серверов : ${message.client.guilds.size}\n\n` +
                    message.client.guilds.sort((a, b) => b.memberCount - a.memberCount).map((r) => r)
                        .map((r, i) => `**${i + 1}** - ${r.name} | ${r.memberCount} юзеров`)
                        .slice(i0, i1)
                        .join("\n");
                embed.setTitle(`Страница: ${page}/${Math.round(message.client.guilds.size / 10)}`)
                    .setDescription(description);
                msg.edit(embed);
            };
            if (reaction._emoji.name === "➡") {
                i0 = i0 + 10;
                i1 = i1 + 10;
                page = page + 1;
                if (i1 > message.client.guilds.size + 10) {
                    return msg.delete();
                }
                if (!i0 || !i1) {
                    return msg.delete();
                }
                description = `Серверов : ${message.client.guilds.size}\n\n` +
                    message.client.guilds.sort((a, b) => b.memberCount - a.memberCount).map((r) => r)
                        .map((r, i) => `**${i + 1}** - ${r.name} | ${r.memberCount} юзеров`)
                        .slice(i0, i1)
                        .join("\n");
                embed.setTitle(`Страница: ${page}/${Math.round(this.client.guilds.size / 10)}`)
                    .setDescription(description);
                msg.edit(embed);
            };
            if (reaction._emoji.name === "❌") {
                return msg.delete();
            }
            await reaction.remove(message.author.id);
        });
    }
}

module.exports = ServersList;