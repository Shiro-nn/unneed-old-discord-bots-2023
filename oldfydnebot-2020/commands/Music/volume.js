const Command = require("../../base/Command.js"),
Discord = require("discord.js");

class volum extends Command {

    constructor (client) {
        super(client, {
            name: "громкость",
            description: (language) => language.get("volume_DESCRIPTION"),
            usage: (language) => language.get("volume_USAGE"),
            examples: (language) => language.get("volume_EXAMPLES"),
            dirname: __dirname,
            enabled: true,
            guildOnly: true,
            aliases: [ "volume","vol","звук" ],
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

module.exports = volum;