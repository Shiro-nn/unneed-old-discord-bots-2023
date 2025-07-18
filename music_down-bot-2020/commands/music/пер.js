const Command = require("../../base/Command.js");

class Reload extends Command {

    constructor (client) {
        super(client, {
            name: "пер",
            dirname: __dirname,
            enabled: true,
            guildOnly: false,
            aliases: ["reload"],
            memberPermissions: [],
            botPermissions: [],
            nsfw: false,
            ownerOnly: true,
            cooldown: 3000
        });
    }

    async run (message, args) {
        let command = args[0];
        let cmd = this.client.commands.get(command) || this.client.commands.get(this.client.aliases.get(command));
        if(!cmd && command !== undefined){
            message.channel.send(`<:errorv1:674651259424473088> | Команда \`${command}\` не найдена!`);
        }
        if(cmd !== undefined){
            await this.client.unloadCommand(cmd.conf.location, cmd.help.name);
            await this.client.loadCommand(cmd.conf.location, cmd.help.name);
            message.channel.send(`<:agree:664980465740152883> | Команда ${cmd.help.name} перезагружена!`);
        }
    }

}

module.exports = Reload;