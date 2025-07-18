const Command = require("../../base/Command.js"),
Discord = require("discord.js");

class shuffle extends Command {

    constructor (client) {
        super(client, {
            name: "перемешать",
            description: (language) => language.get("shuffle_DESCRIPTION"),
            usage: (language) => language.get("shuffle_USAGE"),
            examples: (language) => language.get("shuffle_EXAMPLES"),
            dirname: __dirname,
            enabled: true,
            guildOnly: true,
            aliases: [ "пер","shuffle" ],
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

module.exports = shuffle;