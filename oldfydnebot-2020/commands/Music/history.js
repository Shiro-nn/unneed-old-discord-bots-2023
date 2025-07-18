const Command = require("../../base/Command.js"),
Discord = require("discord.js");

class history extends Command {

    constructor (client) {
        super(client, {
            name: "история",
            description: (language) => language.get("history_DESCRIPTION"),
            usage: (language) => language.get("history_USAGE"),
            examples: (language) => language.get("history_EXAMPLES"),
            dirname: __dirname,
            enabled: true,
            guildOnly: true,
            aliases: [ "history" ],
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
module.exports = history;