const Command = require("../../base/Command.js"),
Discord = require("discord.js");

class Queue extends Command {

    constructor (client) {
        super(client, {
            name: "плейлист",
            description: (language) => language.get("QUEUE_DESCRIPTION"),
            usage: (language) => language.get("QUEUE_USAGE"),
            examples: (language) => language.get("QUEUE_EXAMPLES"),
            dirname: __dirname,
            enabled: true,
            guildOnly: true,
            aliases: [ "queue","playlist" ],
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

module.exports = Queue;