const Command = require("../../base/Command.js"),
Discord = require("discord.js");

class Pause extends Command {

    constructor (client) {
        super(client, {
            name: "пауза",
            description: (language) => language.get("PAUSE_DESCRIPTION"),
            usage: (language) => language.get("PAUSE_USAGE"),
            examples: (language) => language.get("PAUSE_EXAMPLES"),
            dirname: __dirname,
            enabled: true,
            guildOnly: true,
            aliases: ["pause"],
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

module.exports = Pause;