const Command = require("../../base/Command.js");
const { get } = require('node-superfetch');
const Discord = require("../../dis.js");
const { version } = require("../../package.json");
const moment = require("moment");

class stats extends Command {

    constructor(client) {
        super(client, {
            name: "стата",
            dirname: __dirname,
            enabled: true,
            guildOnly: true,
            aliases: ["стат"],
            memberPermissions: [],
            botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
            nsfw: false,
            ownerOnly: false,
            cooldown: 0
        });
    }
    async run(message, args, data, client) {
        const duration = moment.duration(client.uptime).format(" D [дней], H [часов], m [мин], s [сек]");
        const BotData = await client.findOrCreateBot();
        const embed = new Discord.RichEmbed()
            .setAuthor(`Статистика ${client.user.username}`, client.user.avatarURL)
            .setColor('#00ffff')
            .setThumbnail(client.user.displayAvatarURL)
            .addField(`Открыто тикетов:`, `\`${BotData.ticketsopen}\``, true)
            .addField(`Сохранено логов:`, `\`${BotData.logsave}\``, true)
            .addField(`Версия бота`, `\`${version}\``, true)
            .addField(`Серверов:`, `\`${client.guilds.size}\``, true)
            .addField(`Каналов`, `\`${client.channels.size.toLocaleString()}\``, true)
            .addField(`Юзеров:`, `\`${client.users.size.toLocaleString()}\``, true)
            .addField(`Потр. ОЗУ`, `\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB\``, true)
            .addField(`Node`, `\`${process.version}\``, true)
            .addField(`Ping:`, `\`${client.ping}\``, true)
            .addField(`Онлайн`, `\`${duration}\``, true)
        const reactmssage = await message.channel.send(embed)
        setInterval(async () => {
            const BotDatau = await client.findOrCreateBot();
            const duratio = moment.duration(client.uptime).format(" D [дней], H [часов], m [мин], s [сек]");
            const stata = new Discord.RichEmbed()
                .setAuthor(`Статистика ${client.user.username}`, client.user.avatarURL)
                .setColor('#08f7fe')
                .setThumbnail(client.user.displayAvatarURL)
                .addField(`Открыто тикетов:`, `\`${BotDatau.ticketsopen}\``, true)
                .addField(`Сохранено логов:`, `\`${BotDatau.logsave}\``, true)
                .addField(`Версия бота`, `\`${version}\``, true)
                .addField(`Серверов:`, `\`${client.guilds.size}\``, true)
                .addField(`Каналов`, `\`${client.channels.size.toLocaleString()}\``, true)
                .addField(`Юзеров:`, `\`${client.users.size.toLocaleString()}\``, true)
                .addField(`Потр. ОЗУ`, `\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB\``, true)
                .addField(`Node`, `\`${process.version}\``, true)
                .addField(`Ping:`, `\`${client.ping.toFixed(0)}\``, true)
                .addField(`Онлайн`, `\`${duratio}\``, true)
                .setTimestamp();
            reactmssage.edit(stata)
        }, 30000);
    }
}

module.exports = stats;