const Command = require("../../base/Command.js"),
Discord = require("discord.js");

class Resume extends Command {

    constructor (client) {
        super(client, {
            name: "вкл",
            description: (language) => language.get("RESUME_DESCRIPTION"),
            usage: (language) => language.get("RESUME_USAGE"),
            examples: (language) => language.get("RESUME_EXAMPLES"),
            dirname: __dirname,
            enabled: true,
            guildOnly: true,
            aliases: ["resume"],
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

module.exports = Resume;