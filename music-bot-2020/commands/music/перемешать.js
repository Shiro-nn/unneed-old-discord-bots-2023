const Command = require("../../base/Command.js");
const Discord = require("discord.js");
const config = require("../../config");
const { canModifyQueue } = require("../../helpers/util");

class shuffle extends Command {

    constructor (client) {
        super(client, {
            name: "перемешать",
            dirname: __dirname,
            enabled: true,
            guildOnly: true,
            aliases: [ "shuffle", "пере" ],
            memberPermissions: [],
            botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            ownerOnly: false,
            cooldown: 0
        });
    }
    async run (message, args, data) {
        message.delete().catch();
        let messageOptions = {};
        const queue = message.client.queue.get(message.guild.id);
        if(!queue){
            messageOptions.embed = new Discord.MessageEmbed().setDescription(`\\💢 | Очереди нет.`).setColor(data.guild.color);
            let m = await message.reply(messageOptions).catch();
            setTimeout(() => {
                m.delete().catch();
            }, 5000);
            return;
        }
        if (!canModifyQueue(message.member)) return;
    
        let songs = queue.songs;
        for (let i = songs.length - 1; i > 1; i--) {
          let j = 1 + Math.floor(Math.random() * i);
          [songs[i], songs[j]] = [songs[j], songs[i]];
        }
        queue.songs = songs;
        message.client.queue.set(message.guild.id, queue);
        if(!queue){
            messageOptions.embed = new Discord.MessageEmbed().setDescription(`\\🔀 | ${message.author} перемешал очередь.`).setColor(data.guild.color);
            let m = await queue.textChannel.send(messageOptions).catch();
            setTimeout(() => {
                m.delete().catch();
            }, 5000);
            return;
        }
    }
}
module.exports = shuffle;