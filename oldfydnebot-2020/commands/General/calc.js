const Command = require("../../base/Command.js"),
Discord = require("discord.js"),
math = require("mathjs");

class Calc extends Command {
    constructor (client) {
        super(client, {
            name: "кальк",
            description: (language) => language.get("CALC_DESCRIPTION"),
            usage: (language) => language.get("CALC_USAGE"),
            examples: (language) => language.get("CALC_EXAMPLES"),
            dirname: __dirname,
            enabled: true,
            guildOnly: false,
            aliases: ["calc"],
            memberPermissions: [],
            botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            ownerOnly: false,
            cooldown: 1000
        });
    }
 
    async run (message, args, data) {

        if(!args[0]) return message.channel.send(message.language.get("CALC_EMPTY"));

        let result;
        try {
            result = math.evaluate(args.join(" ").replace(/[x]/gi, "*").replace(/[,]/g, ".").replace(/[÷]/gi, "/"));
        } catch (e) {
            return message.channel.send(message.language.get("CALC_ERROR"));
        }

        let embed = new Discord.MessageEmbed()
            .setColor(data.config.embed.color)
            .setAuthor(message.language.get("CALC_TITLE"), this.client.user.displayAvatarURL())
            .addField(message.language.get("CALC_OPERATION"), `\`\`\`Js\n${args.join("").replace(/[x]/gi, "*").replace(/[,]/g, ".").replace(/[÷]/gi, "/")}\`\`\``)
            .addField(message.language.get("CALC_RESULT"), `\`\`\`Js\n${result}\`\`\``)
            .setFooter(data.config.embed.footer);
        message.channel.send(embed);

    }
}

module.exports = Calc;
