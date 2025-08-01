const Command = require("../../base/Command.js"),
Discord = require("discord.js");

class Addcommand extends Command {

    constructor (client) {
        super(client, {
            name: "команда",
            description: (language) => language.get("ADDCOMMAND_DESCRIPTION"),
            usage: (language) => language.get("ADDCOMMAND_USAGE"),
            examples: (language) => language.get("ADDCOMMAND_EXAMPLES"),
            dirname: __dirname,
            enabled: true,
            guildOnly: true,
            aliases: [ "addcommand" ],
            memberPermissions: [ "MANAGE_GUILD" ],
            botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            ownerOnly: false,
            cooldown: 3000
        });
    }

    async run (message, args, data) {
        
        let name = args[0].split("\n")[0];
        if(!name){
            return message.channel.send(message.language.get("ADDCOMMAND_ERR_NAME"));
        }

        if(this.client.commands.get(name) || this.client.aliases.get(name) || data.guild.customCommands.find((c) => c.name === name)){
            return message.channel.send(message.language.get("ADDCOMMAND_ERR_EXISTS", name));
        }

        let answer = (args[0].split("\n")[1] || "") + args.slice(1).join(" ");
        if(!answer){
            return message.channel.send(message.language.get("ADDCOMMAND_ERR_ANSWER"));
        }
        
        data.guild.customCommands.push({
            name: name.toLowerCase(),
            answer: answer
        });
        data.guild.save();
        
        message.channel.send(message.language.get("ADDCOMMAND_SUCCESS", name));
    }
    
}

module.exports = Addcommand;
