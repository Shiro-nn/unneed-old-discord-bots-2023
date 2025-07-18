const Command = require("../../base/Command.js");
const Discord = require("discord.js");
const config = require("../../config");
const { canModifyQueue } = require("../../helpers/util");

class remove extends Command {

    constructor (client) {
        super(client, {
            name: "удалить",
            dirname: __dirname,
            enabled: true,
            guildOnly: true,
            aliases: [ "remove" ],
            memberPermissions: [],
            botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            ownerOnly: false,
            cooldown: 0
        });
    }
    async run (message, args, data) {
        message.delete().catch();
        const queue = message.client.queue.get(message.guild.id);
        let messageOptions = {};
        if(!queue){
            messageOptions.embed = new Discord.MessageEmbed().setDescription(`\\💢 | Очереди нет.`).setColor(data.config.embed.color);
            let m = await message.reply(messageOptions).catch();
            setTimeout(() => {
                m.delete().catch();
            }, 5000);
            return;
        }
        if (!canModifyQueue(message.member)) return;
        if (!args.length){
            messageOptions.embed = new Discord.MessageEmbed().setDescription(`\\💢 | Пример: ${data.config.prefix}${module.exports.name} <Номер очереди>`).setColor(data.config.embed.color);
            let m = await message.reply(messageOptions).catch();
            setTimeout(() => {
                m.delete().catch();
            }, 5000);
            return;
        }
        if(isNaN(args[0])){
            messageOptions.embed = new Discord.MessageEmbed().setDescription(`\\💢 | Пример: ${data.config.prefix}${module.exports.name} <Номер очереди>`).setColor(data.config.embed.color);
            let m = await message.reply(messageOptions).catch();
            setTimeout(() => {
                m.delete().catch();
            }, 5000);
            return;
        }
        const song = queue.songs.splice(args[0] - 1, 1);
        messageOptions.embed = new Discord.MessageEmbed().setDescription(`\\❌ | ${message.author} удалил **${song[0].title}** из плейлиста`).setColor(data.config.embed.color)
        let m = await queue.textChannel.send(messageOptions).catch();
        setTimeout(() => {
            m.delete().catch();
        }, 5000);
      }
}
module.exports = remove;