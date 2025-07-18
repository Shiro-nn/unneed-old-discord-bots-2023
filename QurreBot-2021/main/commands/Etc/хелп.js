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
        .setAuthor("Qurre", message.client.user.displayAvatarURL(), config.dashboard.baseURL)
        .setThumbnail(message.client.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
        .setDescription("Список команд")
        .setColor(data.guild.color)
        .addField(`**${data.guild.prefix}хелп (help)**`, `Отправляет команды бота`, true)
        .addField(`**${data.guild.prefix}удалить (remove)**`, `Удалить определенный трек из очереди`, true )
        .addField(`**${data.guild.prefix}перемешать\n(shuffle, пере)**`, `Перемешать очередь`, true)
        .addField(`**${data.guild.prefix}плей (play)**`, `Включить трек или плейлист`, true)
        .addField(`**${data.guild.prefix}скип (skip)**`, `Пропустить трек`, true)
        .addField(`**${data.guild.prefix}очередь (queue)**`, `Посмотреть плейлист`, true)
        .addField(`**${data.guild.prefix}стата (stats)**`, `Статистика бота`, true)
        .addField(`**${data.guild.prefix}аниме (anime)**`, `Информация про какое-либо аниме`, true)
        .addField(`**${data.guild.prefix}бан (ban)**`, `Забанить участника`, true)
        .addField(`**${data.guild.prefix}кик (kick)**`, `Кикнуть участника`, true)
        .addField(`**${data.guild.prefix}мьют (мут/mute)**`, `Замьютить участника`, true)
        .addField(`**${data.guild.prefix}размьют (размут/ummute)**`, `Размьютить участника`, true)
        .addField(`**${data.guild.prefix}очистить (clear)**`, `Удалить сообщения`, true)
        .addField(`**${data.guild.prefix}эмодзи (emoji)**`, `Загрузить emoji на сервер`, true)
        .setTimestamp();
        message.channel.send(messageOptions).catch();
    }
}
module.exports = help;