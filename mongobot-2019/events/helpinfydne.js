const Discord = require("../dis.js");
module.exports = class {

    constructor(client) {
        this.client = client;
    }

    async run() {
        let client = this.client;
        const server = client.guilds.get('616697847261298688');
        const channel = server.channels.get('678550861814693888');
        const songDisplay = await channel.fetchMessage('683028276020903979');
        const guildData = await client.findOrCreateGuild({ id: server.id });
        const prefix = guildData.prefix;
        const embed = new Discord.RichEmbed()
            .setTitle("fydne")
            .setDescription("Список команд fydne.\n<:one:762955569739857920> Аниме\n<:two:762955588678058004> Настройки бота\n<:three:762955615311101953> Бот\n<:four:772049037976928266> Тикеты\n<:update:722587515156168836> Обновить")
            .setColor('#08f7fe')
            .setThumbnail(client.user.displayAvatarURL)
            .setFooter("© fydne#0557", `${client.user.displayAvatarURL}`)

        const help1 = new Discord.RichEmbed()
            .setColor('#08f7fe')
            .setThumbnail(client.user.displayAvatarURL)
            .setDescription(`**Аниме**\n
        **\ ${prefix}хентай** \`\`отправляет хентай в NSFW канал\`\``, true)
            .setFooter("© fydne#0557", `${client.user.displayAvatarURL}`)

        const help2 = new Discord.RichEmbed()
            .setColor('#08f7fe')
            .setThumbnail(client.user.displayAvatarURL)
            .setDescription(`**Настройки бота**\n
        [**Настроить бота можно на сайте**](https://bot.fydne.xyz)`)
            .setFooter("© fydne#0557", `${client.user.displayAvatarURL}`)

        const help3 = new Discord.RichEmbed()
            .setColor('#08f7fe')
            .setThumbnail(client.user.displayAvatarURL)
            .setDescription(`**Бот:**\n
        **\ ${prefix}стата** \`\`статистика бота\`\`
        **\ ${prefix}конфиги** \`\`посмотреть конфиги сервера\`\`
        **\ ${prefix}пер** \`\`перезапустить определенную команду\`\`
        **\ ${prefix}сервера** \`\`посмотреть сервера, на которых есть бот\`\`
        **\ ${prefix}eval** \`\`eval\`\``)
            .setFooter("© fydne#0557", `${client.user.displayAvatarURL}`)

        const help4 = new Discord.RichEmbed()
            .setColor('#08f7fe')
            .setThumbnail(client.user.displayAvatarURL)
            .setDescription(`**Тикеты:**\n
        **\ ${prefix}логи** \`\`сохранить логи\`\`
        **\ ${prefix}закрыть** \`\`закрыть тикет\`\`
        `)
            .setFooter("© fydne#0557", `${this.client.user.displayAvatarURL}`)
        //await songDisplay.react('762955569739857920');
        //await songDisplay.react('762955588678058004');
        //await songDisplay.react('762955615311101953');
        //await songDisplay.react('772049037976928266');
        //await songDisplay.react('722587515156168836');
        const emojiList = ['762955569739857920', '762955588678058004', '762955615311101953', '772049037976928266', '722587515156168836'];
        for (const emoji of emojiList) await songDisplay.react(emoji);
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
        });
    }
}