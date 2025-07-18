const Command = require("../../base/Command.js"),
Discord = require("discord.js");

class Skip extends Command {

    constructor (client) {
        super(client, {
            name: "скип",
            description: (language) => language.get("SKIP_DESCRIPTION"),
            usage: (language) => language.get("SKIP_USAGE"),
            examples: (language) => language.get("SKIP_EXAMPLES"),
            dirname: __dirname,
            enabled: true,
            guildOnly: true,
            aliases: [ "skip","next" ],
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

module.exports = Skip;