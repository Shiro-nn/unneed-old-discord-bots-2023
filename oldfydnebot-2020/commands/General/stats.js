const Command = require("../../base/Command.js"),
Discord = require("discord.js");

class Stats extends Command {

    constructor (client) {
        super(client, {
            name: "стат",
            description: (language) => language.get("STATS_DESCRIPTION"),
            usage: (language) => language.get("STATS_USAGE"),
            examples: (language) => language.get("STATS_EXAMPLES"),
            dirname: __dirname,
            enabled: true,
            guildOnly: false,
            aliases: [ "стата","статистика","stats","statistics", "infobot", "botinfos", "bot-infos", "bot-info", "infos-bot", "info-bot" ],
            memberPermissions: [],
            botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            ownerOnly: false,
            cooldown: 3000
        });
    }

    async run (message, args, data) {

        let statsHeadings = message.language.get("STATS_HEADINGS", message.client);
        let inviteURL = "https://discord.gg/UCUBU2z";
        let statsEmbed = new Discord.MessageEmbed()
            .setColor(data.config.embed.color)
            .setFooter(data.config.embed.footer)
            .setAuthor(message.language.get("STATS_HEADINGS")[0])
            .setDescription(message.language.get("STATS_DESC"))
            .addField(statsHeadings[1], message.language.get("STATS", message.client.guilds.size, message.client.users.size), true)
            .addField(statsHeadings[2], `\`Discord.js : v${Discord.version}\`\n\`Nodejs : v${process.versions.node}\``, true)
            .addField(statsHeadings[3], `\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB\``, true)
            .addField(statsHeadings[4], message.language.get("STATS_ONLINE", message.language.convertMs(message.client.uptime)))
            .addField(statsHeadings[5], message.language.get("STATS_VC", message.client.voice.connections.size))
            .addField(statsHeadings[6], message.language.get("STATS_CREDITS"))
            .addField("\u200B", message.language.get("STATS_LINKS", inviteURL, message.client.user.id));
            message.channel.send(statsEmbed);
    }

}

module.exports = Stats;