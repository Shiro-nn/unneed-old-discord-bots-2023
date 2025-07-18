const Command = require("../../base/Command.js");
const Discord = require("discord.js");
const config = require("../../config");

class help extends Command {

    constructor (client) {
        super(client, {
            name: "хелп",
            dirname: __dirname,
            enabled: true,
            guildOnly: true,
            aliases: [ "help" ],
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
        messageOptions.embed = new Discord.MessageEmbed()
        .setAuthor("fydne", message.client.user.displayAvatarURL(), config.dashboard.baseURL)
        .setThumbnail(message.client.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
        .setDescription("Список команд")
        .setColor(data.config.embed.color)
        .addField(`**${data.config.prefix}хелп (help)**`, `Отправляет команды бота`, true)
        .addField(`**${data.config.prefix}удалить (remove)**`, `Удалить определенный трек из очереди`, true )
        .addField(`**${data.config.prefix}перемешать\n(shuffle, пере)**`, `Перемешать очередь`, true)
        .addField(`**${data.config.prefix}плей (play)**`, `Включить трек`, true)
        .addField(`**${data.config.prefix}плейлист (playlist)**`, `Добавить плейлист`, true)
        .addField(`**${data.config.prefix}поиск (search)**`, `Найти трек`, true)
        .addField(`**${data.config.prefix}скип (skip)**`, `Пропустить трек`, true)
        .addField(`**${data.config.prefix}очередь (queue)**`, `Посмотреть плейлист`, true)
        .addField(`**${data.config.prefix}стата (stats)**`, `Статистика бота`, true)
        .setTimestamp();
        message.channel.send(messageOptions).catch();
    }
}
module.exports = help;