const Command = require("../../base/Command.js"),
Discord = require("../../dis.js");
const config = require("../../config.js");

class Getconf extends Command {

    constructor(client) {
        super(client, {
            name: "конфиги",
            dirname: __dirname,
            enabled: true,
            guildOnly: false,
            aliases: ["конфиг"],
            memberPermissions: [],
            botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
            nsfw: false,
            ownerOnly: true,
            cooldown: 3000
        });
    }

    async run(message, args, data) {
        let guildID = args[0];
        if (!guildID) {
            return message.channel.send(`<:errorv1:674651259424473088> | Пожалуйста, введите правильный ID сервера!`);
        }
        let guild = message.client.guilds.get(guildID);
        if (!guild) {
            return message.channel.send(`<:errorv1:674651259424473088> | Сервер не найден!`);
        }
        const headings = [
            ["Каналы игнорируются", "Каналы не игнорируются"],
            ["Авто роль", "Авто роль выключена"],
            ["Приветствие", "Приветствие выключено"],
            ["Прощание", "Прощание выключено"],
            ["Слоумод", "Нет каналов с вкл слоумодом"],
            ["Каналы"],
            ["Варны"],
            ["Автомодерация", "Автомодерация выключена"],
            ["Авто удаление команд", "Авто удаление команд выключено"],
            ["Изменить конфиги", `[Нажмите для перехода в панель управления!](${config.dashboard.baseURL})`]
        ],
            guildData = await this.client.findOrCreateGuild({ id: guild.id });
        let embed = new Discord.RichEmbed()
            .setAuthor(guild.name, guild.iconURL)
            .setColor(data.guild.color)
            .setFooter(data.config.embed.footer);
        embed.addField(`Префикс:`, guildData.prefix);
        embed.addField(headings[1][0],
            (guildData.plugins.autorole.enabled) ?
                `Роль: <@&${guildData.plugins.autorole.role}>`
                : 'Выключена'
        );
        embed.addField("Хентай:",
            (guildData.plugins.hentai.enabled) ?
                `Отправлено сообщений: ${guildData.hentaimsg}`
                : 'Выключен.'
        );
        embed.addField('Каналы:',
            `Логов: ${(guildData.channellogs !== '') ? `<#${guildData.channellogs}>` : 'Выключен'}`
        );
        message.channel.send(embed);
    }
}

module.exports = Getconf;
