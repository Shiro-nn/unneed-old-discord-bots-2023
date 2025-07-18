const Command = require("../../base/Command.js"),
Discord = require("discord.js");

class Np extends Command {

    constructor (client) {
        super(client, {
            name: "си",
            description: (language) => language.get("NP_DESCRIPTION"),
            usage: (language) => language.get("NP_USAGE"),
            examples: (language) => language.get("NP_EXAMPLES"),
            dirname: __dirname,
            enabled: true,
            guildOnly: true,
            aliases: [ "тп","np","nowplaying", "now-playing" ],
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

module.exports = Np;