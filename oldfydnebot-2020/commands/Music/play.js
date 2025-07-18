const Command = require("../../base/Command.js"),
Discord = require("discord.js");

class Play extends Command {

    constructor (client) {
        super(client, {
            name: "плей",
            description: (language) => language.get("PLAY_DESCRIPTION"),
            usage: (language) => language.get("PLAY_USAGE"),
            examples: (language) => language.get("PLAY_EXAMPLES"),
            dirname: __dirname,
            enabled: true,
            guildOnly: true,
            aliases: [ "play","joue" ],
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
module.exports = Play;