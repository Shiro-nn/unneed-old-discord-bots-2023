const Command = require("../../base/Command.js"),
Discord = require("discord.js");

class leave extends Command {

    constructor (client) {
        super(client, {
            name: "ливнуть",
            description: (language) => language.get("CLEARM_DESCRIPTION"),
            usage: (language) => language.get("CLEARM_USAGE"),
            examples: (language) => language.get("CLEARM_EXAMPLES"),
            dirname: __dirname,
            enabled: true,
            guildOnly: true,
            aliases: [ "leave" ],
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
module.exports = leave;