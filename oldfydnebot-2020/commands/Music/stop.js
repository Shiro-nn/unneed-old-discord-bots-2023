const Command = require("../../base/Command.js"),
Discord = require("discord.js");

class Stop extends Command {

    constructor (client) {
        super(client, {
            name: "стоп",
            description: (language) => language.get("STOP_DESCRIPTION"),
            usage: (language) => language.get("STOP_USAGE"),
            examples: (language) => language.get("STOP_EXAMPLES"),
            dirname: __dirname,
            enabled: true,
            guildOnly: true,
            aliases: [ "stop","leave" ],
            memberPermissions: [],
            botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            ownerOnly: false,
            cooldown: 0
        });
    }
    async run (message, args, data) {
    }
}

module.exports = Stop;