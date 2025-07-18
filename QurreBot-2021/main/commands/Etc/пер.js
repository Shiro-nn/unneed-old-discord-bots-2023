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
        let mode = args[0].toLowerCase();
        if(mode == "комманду" || mode == "команду" || mode == "command" || mode == "com"){
            let command = args[1];
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
        if(mode == "ивент" || mode == "event" || mode == "ev"){
            let event = args[1];
            let cmd = this.client.reloadEvent(`../events`, event);
            if(!cmd) message.channel.send(`<:errorv1:674651259424473088> | Ивент \`${event}\` не найден!`);
            if(cmd) message.channel.send(`<:agree:664980465740152883> | Ивент ${event} перезагружен!`);
        }
    }

}

module.exports = Reload;