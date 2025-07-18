const Command = require("../../base/Command.js");
const Discord = require("discord.js");
const { play } = require("../../helpers/play");
const ytdl = require("ytdl-core");
const YouTubeAPI = require("simple-youtube-api");
const scdl = require("soundcloud-downloader");
const config = require("../../config");
let YOUTUBE_API_KEY = config.apiKeys.simpleYoutube;
let SOUNDCLOUD_CLIENT_ID = config.apiKeys.soundcloud;
const youtube = new YouTubeAPI(YOUTUBE_API_KEY);

class play_com extends Command {

    constructor (client) {
        super(client, {
            name: "плей",
            dirname: __dirname,
            enabled: true,
            guildOnly: true,
            aliases: [ "play" ],
            memberPermissions: [],
            botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            ownerOnly: false,
            cooldown: 0
        });
    }
    async run (message, args, data) {
        message.delete().catch();
        const { channel } = message.member.voice;
        const serverQueue = message.client.queue.get(message.guild.id);
        if (!channel) {
            let m = await message.reply(`зайди в войс`).catch();
            setTimeout(() => {
                m.delete().catch();
            }, 5000);
            return;
        }
        if (serverQueue && channel !== message.guild.me.voice.channel){
            let m = await message.reply(`вы должны быть в том же канале, что и ${message.client.user}`).catch();
            setTimeout(() => {
                m.delete().catch();
            }, 5000);
            return;
        }
        if (!args.length){
            let m = await message.reply(`пример: ${data.guild.prefix}плей <YouTube URL | Название | Soundcloud URL>`).catch();
            setTimeout(() => {
                m.delete().catch();
            }, 5000);
            return;
        }
        const permissions = channel.permissionsFor(message.client.user);
        if (!permissions.has("CONNECT")){
            let m = await message.reply("не удается подключиться к голосовому каналу, отсутствуют разрешения");
            setTimeout(() => {
                m.delete().catch();
            }, 5000);
            return;
        }
        if (!permissions.has("SPEAK")){
            let m = await message.reply("Я не могу говорить в этом голосовом канале, убедитесь, что у меня есть соответствующие разрешения");
            setTimeout(() => {
                m.delete().catch();
            }, 5000);
            return;
        }
        const search = args.join(" ");
        const videoPattern = /^(https?:\/\/)?(www\.)?(m\.)?(youtube\.com|youtu\.?be)\/.+$/gi;
        const playlistPattern = /^.*(list=)([^#\&\?]*).*/gi;
        const scRegex = /^https?:\/\/(soundcloud\.com)\/(.*)$/;
        const url = args[0];
        const urlValid = videoPattern.test(args[0]);
        if (!videoPattern.test(args[0]) && playlistPattern.test(args[0])) {
            return message.client.commands.get("плейлист").run(message, args, data);
        } else if (scdl.isValidUrl(url) && url.includes("/sets/")) {
            return message.client.commands.get("плейлист").run(message, args, data);
        }
        const queueConstruct = {
            textChannel: message.channel,
            channel,
            connection: null,
            songs: [],
            loop: false,
            volume: 100,
            playing: true
        };
        let songInfo = null;
        let song = null;
        if (urlValid) {
            try{
                songInfo = await ytdl.getInfo(url);
                song = {
                    title: songInfo.videoDetails.title,
                    url: songInfo.videoDetails.video_url,
                    duration: songInfo.videoDetails.lengthSeconds,
                    owner: message.author,
                    ava: `https://img.youtube.com/vi/${songInfo.videoDetails.videoId}/maxresdefault.jpg`,
                    author_link: songInfo.videoDetails.author.user_url,
                    author_name: songInfo.videoDetails.author.name
                };
            }catch(error){
                let m = await message.reply(error.message).catch();
                setTimeout(() => {
                    m.delete().catch();
                }, 5000);
                return;
            }
        }else if (scRegex.test(url)){
            try {
                const trackInfo = await scdl.getInfo(url, SOUNDCLOUD_CLIENT_ID);
                song = {
                    title: trackInfo.title,
                    url: trackInfo.permalink_url,
                    duration: Math.ceil(trackInfo.duration / 1000),
                    owner: message.author,
                    ava: trackInfo.artwork_url,
                    author_link: trackInfo.user.permalink_url,
                    author_name: trackInfo.user.username
                };
            }catch(error){
                if (error.statusCode === 404){
                    let m = await message.reply("Не удалось найти на Soundcloud.").catch();
                    setTimeout(() => {
                        m.delete().catch();
                    }, 5000);
                    return;
                }
                let m = await message.reply("При воспроизведении произошла ошибка.").catch();
                setTimeout(() => {
                    m.delete().catch();
                }, 5000);
                return;
            }
        }else{
            try{
                const results = await youtube.searchVideos(search, 1);
                songInfo = await ytdl.getInfo(results[0].url);
                song = {
                    title: songInfo.videoDetails.title,
                    url: songInfo.videoDetails.video_url,
                    duration: songInfo.videoDetails.lengthSeconds,
                    owner: message.author,
                    ava: `https://img.youtube.com/vi/${songInfo.videoDetails.videoId}/maxresdefault.jpg`,
                    author_link: songInfo.videoDetails.author.user_url,
                    author_name: songInfo.videoDetails.author.name
                };
            }catch{
                let m = await message.reply("Видео с подходящим названием не найдено.").catch();
                setTimeout(() => {
                    m.delete().catch();
                }, 5000);
                return;
            }
        }
        if(serverQueue){
            serverQueue.songs.push(song);
            let messageOptions = {};
            messageOptions.embed = new Discord.MessageEmbed().setDescription(`:musical_note: | Добавлено в очередь:\n[**${song.title}**](${song.url})`).setColor(data.guild.color);
            let m = await serverQueue.textChannel.send(messageOptions).catch();
            setTimeout(() => {
                m.delete().catch();
            }, 5000);
            return;
        }
        queueConstruct.songs.push(song);
        message.client.queue.set(message.guild.id, queueConstruct);
        try {
            queueConstruct.connection = await channel.join();
            await queueConstruct.connection.voice.setSelfDeaf(true);
            play(queueConstruct.songs[0], message, data);
        } catch (error) {
            message.client.queue.delete(message.guild.id);
            await channel.leave();
            return message.channel.send(`Не удалось присоединиться к каналу:\n${error}`).catch();
        }
    }
}
module.exports = play_com;