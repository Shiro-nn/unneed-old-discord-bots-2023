const Command = require("../../base/Command.js"),
Discord = require("../../dis.js");

class help extends Command {

    constructor(client) {
        super(client, {
            name: "хелп",
            dirname: __dirname,
            enabled: true,
            guildOnly: true,
            aliases: ["hentai"],
            memberPermissions: [],
            botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
            nsfw: false,
            ownerOnly: false,
            cooldown: 0
        });
    }
    async run(message, args, data) {
        let prefix = data.guild.prefix;
        if (!prefix) {
            return;
        }
        message.delete(0);
        const embed = new Discord.RichEmbed()
            .setTitle("fydne")
            .setDescription("Список команд fydne.\n:one: Аниме\n:two: Настройки бота\n:three: Бот\n<:four:772049037976928266> Тикеты\n<:update:722587515156168836> Обновить")
            .setColor(data.guild.color)
            .setThumbnail(this.client.user.displayAvatarURL)
            .setFooter("© fydne#0557", `${this.client.user.displayAvatarURL}`)

        const help1 = new Discord.RichEmbed()
            .setColor(data.guild.color)
            .setThumbnail(this.client.user.displayAvatarURL)
            .setDescription(`**Аниме**\n
    **\ ${prefix}хентай** \`\`отправляет хентай в NSFW канал\`\``, true)
            .setFooter("© fydne#0557", `${this.client.user.displayAvatarURL}`)

        const help2 = new Discord.RichEmbed()
            .setColor(data.guild.color)
            .setThumbnail(this.client.user.displayAvatarURL)
            .setDescription(`**Настройки бота**\n
    [**Настроить бота можно на сайте**](https://bot.fydne.xyz)`)
            .setFooter("© fydne#0557", `${this.client.user.displayAvatarURL}`)

        const help3 = new Discord.RichEmbed()
            .setColor(data.guild.color)
            .setThumbnail(this.client.user.displayAvatarURL)
            .setDescription(`**Бот:**\n
    **\ ${prefix}стата** \`\`статистика бота\`\`
    **\ ${prefix}конфиги** \`\`посмотреть конфиги сервера\`\`
    **\ ${prefix}пер** \`\`перезапустить определенную команду\`\`
    **\ ${prefix}сервера** \`\`посмотреть сервера, на которых есть бот\`\`
    **\ ${prefix}eval** \`\`eval\`\``)
            .setFooter("© fydne#0557", `${this.client.user.displayAvatarURL}`)

        const help4 = new Discord.RichEmbed()
            .setColor(data.guild.color)
            .setThumbnail(this.client.user.displayAvatarURL)
            .setDescription(`**Тикеты:**\n
    **\ ${prefix}логи** \`\`сохранить логи\`\`
    **\ ${prefix}закрыть** \`\`закрыть тикет\`\`
    `)
            .setFooter("© fydne#0557", `${this.client.user.displayAvatarURL}`)

        const songDisplay = await message.channel.send(embed);
        await songDisplay.react('762955569739857920');
        await songDisplay.react('762955588678058004');
        await songDisplay.react('762955615311101953');
        await songDisplay.react('772049037976928266');
        await songDisplay.react('722587515156168836');
        await songDisplay.react('742945862560382987');
        const reactionCollector = songDisplay.createReactionCollector(
            (reaction, user) => !user.bot,
            { time: 0 }
        );
        reactionCollector.on('collect', reaction => {
            const user = reaction.users.last();
            reaction.remove(user);
            if (reaction.emoji.id === '762955569739857920') {
                songDisplay.edit(help1);
            }
            if (reaction.emoji.id === '762955588678058004') {
                songDisplay.edit(help2);
            }
            if (reaction.emoji.id === '762955615311101953') {
                songDisplay.edit(help3);
            }
            if (reaction.emoji.id === '772049037976928266') {
                songDisplay.edit(help4);
            }
            if (reaction.emoji.id === '722587515156168836') {
                songDisplay.edit(embed);
            };
            if (reaction.emoji.id === '742945862560382987') {
                songDisplay.delete();
            };
        });
    }
}
module.exports = help;