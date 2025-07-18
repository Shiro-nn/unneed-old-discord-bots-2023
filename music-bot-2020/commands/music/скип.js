const Command = require("../../base/Command.js");
const Discord = require("discord.js");
const config = require("../../config");
const { canModifyQueue } = require("../../helpers/util");

class skip extends Command {

    constructor (client) {
        super(client, {
            name: "скип",
            dirname: __dirname,
            enabled: true,
            guildOnly: true,
            aliases: [ "skip" ],
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
        if(!args.length){
            messageOptions.embed = new Discord.MessageEmbed().setDescription(`\\💢 | Пример: ${data.guild.prefix}${module.exports.name} <Номер очереди>`).setColor(data.guild.color);
            let m = await message.reply(messageOptions).catch();
            setTimeout(() => {
                m.delete().catch();
            }, 5000);
            return;
        }
        if(isNaN(args[0])){
            messageOptions.embed = new Discord.MessageEmbed().setDescription(`\\💢 | Пример: ${data.guild.prefix}${module.exports.name} <Номер очереди>`).setColor(data.guild.color);
            let m = await message.reply(messageOptions).catch();
            setTimeout(() => {
                m.delete().catch();
            }, 5000);
            return;
        }
        const queue = message.client.queue.get(message.guild.id);
        if(!queue){
            messageOptions.embed = new Discord.MessageEmbed().setDescription(`\\💢 | Очереди нет.`).setColor(data.guild.color);
            let m = await message.reply(messageOptions).catch();
            setTimeout(() => {
                m.delete().catch();
            }, 5000);
            return;
        }
        if(!canModifyQueue(message.member)) return;
        if(args[0] > queue.songs.length){
            messageOptions.embed = new Discord.MessageEmbed().setDescription(`\\💢 | В плейлисте только ${queue.songs.length} треков`).setColor(data.guild.color);
            let m = await message.reply(messageOptions).catch();
            setTimeout(() => {
                m.delete().catch();
            }, 5000);
            return;
        }
        queue.playing = true;
        if(queue.loop){
            for (let i = 0; i < args[0] - 2; i++) {
                queue.songs.push(queue.songs.shift());
            }
        }else{
          queue.songs = queue.songs.slice(args[0] - 2);
        }
        queue.connection.dispatcher.end();
        messageOptions.embed = new Discord.MessageEmbed().setDescription(`\\⏭ | ${message.author} пропустил ${args[0] - 1} треков`).setColor(data.guild.color);
        let m = await queue.textChannel.send(messageOptions).catch();
        setTimeout(() => {
            m.delete().catch();
        }, 5000);
    }
}
module.exports = skip;