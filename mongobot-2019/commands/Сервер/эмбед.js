const Command = require("../../base/Command.js");
const Discord = require("../../dis.js");

class embed extends Command {

    constructor(client) {
        super(client, {
            name: "эмбед",
            dirname: __dirname,
            enabled: true,
            guildOnly: true,
            aliases: ["ембед"],
            memberPermissions: [],
            botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
            nsfw: false,
            ownerOnly: false,
            cooldown: 0
        });
    }
    async run(message, args, data) {
        message.delete();
        const embed = new Discord.RichEmbed()
            .setDescription(args.join(' '))
            .setColor(data.guild.color)
        message.channel.send(embed);
    }
}
module.exports = embed;