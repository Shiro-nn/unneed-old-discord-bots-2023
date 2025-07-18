const Command = require("../../base/Command.js");
const Discord = require("discord.js");
const { play } = require("../../helpers/play");
const YouTubeAPI = require("simple-youtube-api");
const scdl = require("soundcloud-downloader");
const config = require("../../config");
let YOUTUBE_API_KEY = config.apiKeys.simpleYoutube;
let SOUNDCLOUD_CLIENT_ID = config.apiKeys.soundcloud;
const youtube = new YouTubeAPI(YOUTUBE_API_KEY);

class playlist extends Command {

    constructor (client) {
        super(client, {
            name: "плейлист",
            dirname: __dirname,
            enabled: true,
            guildOnly: true,
            aliases: [ "playlist" ],
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
        if(serverQueue && channel !== message.guild.me.voice.channel){
            let m = await message.reply(`вы должны быть в том же канале, что и ${message.client.user}`).catch();
            setTimeout(() => {
                m.delete().catch();
            }, 5000);
            return;
        }
        if(!args.length){
            let m = await message.reply(`пример: ${data.guild.prefix}плейлист <YouTube URL | Название>`).catch();
            setTimeout(() => {
                m.delete().catch();
            }, 5000);
            return;
        }
        if(!channel){
            let m = await message.reply(`зайди в войс`).catch();
            setTimeout(() => {
                m.delete().catch();
            }, 5000);
            return;
        }
        const permissions = channel.permissionsFor(message.client.user);
        if(!permissions.has("CONNECT")){
            let m = await message.reply("не удается подключиться к голосовому каналу, отсутствуют разрешения");
            setTimeout(() => {
                m.delete().catch();
            }, 5000);
            return;
        }
        if(!permissions.has("SPEAK")){
            let m = await message.reply("Я не могу говорить в этом голосовом канале, убедитесь, что у меня есть соответствующие разрешения");
            setTimeout(() => {
                m.delete().catch();
            }, 5000);
            return;
        }
        const search = args.join(" ");
        const pattern = /^.*(youtu.be\/|list=)([^#\&\?]*).*/gi;
        const url = args[0];
        const urlValid = pattern.test(args[0]);
        const queueConstruct = {
            textChannel: message.channel,
            channel,
            connection: null,
            songs: [],
            loop: false,
            volume: 100,
            playing: true
        };
        let song = null;
        let playlist = null;
        let videos = [];
        if(urlValid){
            try{
                playlist = await youtube.getPlaylist(url, { part: "snippet" });
                videos = await playlist.getVideos(MAX_PLAYLIST_SIZE || 10, { part: "snippet" });
            }catch{
                let messageOptions = {};
                messageOptions.embed = new Discord.MessageEmbed().setDescription(`\\💢 | Плейлист не найден :(`).setColor(data.guild.color);
                let m = await message.reply(messageOptions);
                setTimeout(() => {
                    m.delete().catch();
                }, 5000);
                return;
            }
        }else if(scdl.isValidUrl(url)){
            if(args[0].includes("/sets/")){
                let messageOptions = {};
                messageOptions.embed = new Discord.MessageEmbed().setDescription(`\\⌛ | Получение плейлиста...`).setColor(data.guild.color);
                let m = await message.reply(messageOptions);
                setTimeout(() => {
                    m.delete().catch();
                }, 5000);
                playlist = await scdl.getSetInfo(args[0], SOUNDCLOUD_CLIENT_ID);
                videos = playlist.tracks.map((track) => ({
                    title: track.title,
                    url: track.permalink_url,
                    duration: track.duration / 1000,
                    ava: track.artwork_url,
                    author_link: track.user.permalink_url,
                    author_name: track.user.username
                }));
            }
        }else{
            try{
                const results = await youtube.searchPlaylists(search, 1, { part: "snippet" });
                playlist = results[0];
                videos = await playlist.getVideos(MAX_PLAYLIST_SIZE || 10, { part: "snippet" });
            }catch{
                let messageOptions = {};
                messageOptions.embed = new Discord.MessageEmbed().setDescription(`\\💢 | Плейлист не найден :(`).setColor(data.guild.color);
                let m = await message.reply(messageOptions);
                setTimeout(() => {
                    m.delete().catch();
                }, 5000);
                return;
            }
        }
        videos.forEach(async(video) => {
            try{
                song = {
                    title: video.title,
                    url: video.url,
                    duration: video.durationSeconds,
                    owner: message.author,
                    ava: `https://img.youtube.com/vi/${video.videoDetails.videoId}/maxresdefault.jpg`,
                    author_link: video.videoDetails.author.user_url,
                    author_name: video.videoDetails.author.name
                };
            }catch{
                song = {
                    title: video.title,
                    url: video.url,
                    duration: video.duration,
                    owner: message.author,
                    ava: video.ava,
                    author_link: video.author_link,
                    author_name: video.author_name
                };
            }
            if(serverQueue){
                serverQueue.songs.push(song);
                let messageOptions = {};
                messageOptions.embed = new Discord.MessageEmbed().setDescription(`:musical_note: | Добавлено в очередь:\n[**${song.title}**](${song.url})`).setColor(data.guild.color);
                let m = await serverQueue.textChannel.send(messageOptions).catch();
                setTimeout(() => {
                    m.delete().catch();
                }, 5000);
            }else{
                queueConstruct.songs.push(song);
                let messageOptions = {};
                messageOptions.embed = new Discord.MessageEmbed().setDescription(`:musical_note: | Добавлено в очередь:\n[**${song.title}**](${song.url})`).setColor(data.guild.color);
                let m = await queueConstruct.textChannel.send(messageOptions).catch();
                setTimeout(() => {
                    m.delete().catch();
                }, 5000);
            }
        });
        let playlistEmbed = new Discord.MessageEmbed()
        .setTitle(`${playlist.title}`)
        .setURL(playlist.url)
        .setColor(data.guild.color)
        .setTimestamp();
        playlistEmbed.setDescription(queueConstruct.songs.map((song, index) => `${index + 1}. ${song.title}`));
        if(playlistEmbed.description.length < 1) playlistEmbed.description = serverQueue.songs.map((song, index) => `${index + 1}. ${song.title}`);
        if(playlistEmbed.description.length >= 2048)
        playlistEmbed.description = playlistEmbed.description.substr(0, 2007) + "\nПлейлист превышает ограничение на количество символов...";
        let messageOptions = {};
        messageOptions.embed = playlistEmbed;
        let m = await message.channel.send(`${message.author} запустил плейлист`, messageOptions);
        setTimeout(() => {
            m.delete().catch();
        }, 10000);
        if(!serverQueue){
            message.client.queue.set(message.guild.id, queueConstruct);
            try{
                queueConstruct.connection = await channel.join();
                await queueConstruct.connection.voice.setSelfDeaf(true);
                play(queueConstruct.songs[0], message, data);
            }catch(error){
                message.client.queue.delete(message.guild.id);
                await channel.leave();
                let messageOptions2 = {};
                messageOptions2.embed = new Discord.MessageEmbed().setDescription(`\\💢 | Не удалось присоединиться к каналу:\n${error}`).setColor(data.guild.color);
                let m = await message.channel.send(messageOptions2).catch();
                setTimeout(() => {
                    m.delete().catch();
                }, 5000);
            }
        }
    }
}
module.exports = playlist;