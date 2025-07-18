const Command = require("../../base/Command.js");
const Discord = require("discord.js");
const YouTubeAPI = require("simple-youtube-api");
const config = require("../../config");
const youtube = new YouTubeAPI(config.apiKeys.simpleYoutube);

class search extends Command {

    constructor (client) {
        super(client, {
            name: "поиск",
            dirname: __dirname,
            enabled: true,
            guildOnly: true,
            aliases: [ "search" ],
            memberPermissions: [],
            botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            ownerOnly: false,
            cooldown: 0
        });
    }
    async run (message, args, data) {
        if (!args.length){
            let m = await message.reply(`пример: ${data.config.prefix}поиск <Название>`).catch();
            setTimeout(() => {
                m.delete().catch();
            }, 5000);
            return;
        }
        if (message.channel.activeCollector){
            let m = await message.reply(`поиск уже запущен в этом канале`).catch();
            setTimeout(() => {
                m.delete().catch();
            }, 5000);
            return;
        }
        if (!message.member.voice.channel){
            let m = await message.reply(`зайди в войс`).catch();
            setTimeout(() => {
                m.delete().catch();
            }, 5000);
            return;
        }
        const search = args.join(" ");
        let messageOptions = {};
        let resultsEmbed = new Discord.MessageEmbed()
        .setTitle(`**Ответьте номером музыки, которую хотите воспроизвести**`)
        .setDescription(`Результаты поиска: ${search}`)
        .setColor(data.config.embed.color);
        try{
            const results = await youtube.searchVideos(search, 10);
            results.map((video, index) => resultsEmbed.addField(video.shortURL, `${index + 1}. ${video.title}`));
            messageOptions.embed = resultsEmbed;
            var resultsMessage = await message.channel.send(messageOptions).catch();
            function filter(msg) {
                const pattern = /(^[1-9][0-9]{0,1}$)/g;
                return pattern.test(msg.content) && parseInt(msg.content.match(pattern)[0]) <= 10;
            }
            message.channel.activeCollector = true;
            const response = await message.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ["time"] });
            const choice = resultsEmbed.fields[parseInt(response.first()) - 1].name;
            message.channel.activeCollector = false;
            message.client.commands.get("плей").run(message, [choice], data);
            resultsMessage.delete().catch();
        }catch(error){
            console.error(error)
            message.channel.activeCollector = false;
        }
    }
}
module.exports = search;