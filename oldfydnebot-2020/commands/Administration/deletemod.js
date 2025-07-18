const Command = require("../../base/Command.js"),
Discord = require('discord.js');

class Deletemod extends Command {

    constructor (client) {
        super(client, {
            name: "автоудаление",
            description: (language) => language.get("DELETEMOD_DESCRIPTION"),
            usage: (language) => language.get("DELETEMOD_USAGE"),
            examples: (language) => language.get("DELETEMOD_EXAMPLES"),
            dirname: __dirname,
            enabled: true,
            guildOnly: true,
            aliases: [ "автодел", "ад", "deletemod", "autodeletemodcommands" ],
            memberPermissions: [ "MANAGE_MESSAGES" ],
            botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            ownerOnly: false,
            cooldown: 3000
        });
    }

    async run (message, args, data) {
        let status = args[0];
        if(!status || status !== "вкл" && status !== "выкл"){
            return message.channel.send(message.language.get("DELETEMOD_ERR_STATUS"));
        }
        if(status === "вкл"){
            data.guild.autoDeleteModCommands = true;
            data.guild.save();
            message.channel.send(message.language.get("DELETEMOD_SUCCESS_ENABLED"));
        } else {
            data.guild.autoDeleteModCommands = false;
            data.guild.save();
            message.channel.send(message.language.get("DELETEMOD_SUCCESS_ENABLED"));
        }
    }

}

module.exports = Deletemod;