const ytdlDiscord = require("ytdl-core-discord");
const scdl = require("soundcloud-downloader");
const { canModifyQueue } = require("./util");
const config = require("../config");
const Discord = require("discord.js");
const moment = require('moment');
require('moment-duration-format');
let embed_play_desc = '';
let embed_play_edit = false;
const createBar = require("string-progressbar");

module.exports = {
    async play(song, message, data) {
        BotData = await message.client.findOrCreateBot();
        BotData.music++
        BotData.save();
        let SOUNDCLOUD_CLIENT_ID = config.apiKeys.soundcloud;
        const queue = message.client.queue.get(message.guild.id);
        if (!song) {
            queue.channel.leave();
            message.client.queue.delete(message.guild.id);
            let m = await queue.textChannel.send("\\💢 | Музыка закончилась.").catch();
            setTimeout(() => {
                m.delete().catch();
            }, 5000);
            return;
        }
        const embed_play = function(text = ''){
            embed_play_desc = text;
            let embed = new Discord.MessageEmbed()
                .setAuthor('Сейчас играет:', message.client.user.displayAvatarURL())
                .setThumbnail(song.ava)
                .setColor(data.guild.color)
                .setDescription(embed_play_desc)
                .addField('Название:', `[${song.title}](${song.url})`)
                .addField('Автор:', `[${song.author_name}](${song.author_link})`, true)
                .addField('Длительность:', `${moment.duration(parseInt(song.duration), 'seconds').format()}`, true)
                .addField('Включил:', `${song.owner}`, true)
                .addField('Громкость:', `${queue.volume}%`, true)
                .addField('Повтор:', `${queue.loop ? "**Включен**" : "**Выключен**"}`, true)
            try{
                const seek = (queue.connection.dispatcher.streamTime - queue.connection.dispatcher.pausedTime) / 1000;
                const left = song.duration - seek;
                embed.addField(
                  "\u200b",
                  new Date(seek * 1000).toISOString().substr(11, 8) +
                    " [ " +
                    createBar(song.duration == 0 ? seek : song.duration, seek, 15, '\\▬', '🔘')[0] +
                    " ] " +
                    (song.duration == 0 ? " \\◉ LIVE" : new Date(song.duration * 1000).toISOString().substr(11, 8)),
                  false
                );
                if (song.duration > 0) embed.setFooter("Осталось: " + new Date(left * 1000).toISOString().substr(11, 8));
            }catch{}
            let messageOptions = {};
            messageOptions.embed = embed;
            return messageOptions;
        }
        let stream = null;
        let streamType = song.url.includes("youtube.com") ? "opus" : "ogg/opus";
        try {
            if (song.url.includes("youtube.com")) {
                stream = await ytdlDiscord(song.url, { highWaterMark: 1 << 25 });
            }else if (song.url.includes("soundcloud.com")){
                try {
                    stream = await scdl.downloadFormat(
                        song.url,
                        scdl.FORMATS.OPUS,
                        SOUNDCLOUD_CLIENT_ID ? SOUNDCLOUD_CLIENT_ID : undefined
                    );
                }catch{
                    stream = await scdl.downloadFormat(
                        song.url,
                        scdl.FORMATS.MP3,
                        SOUNDCLOUD_CLIENT_ID ? SOUNDCLOUD_CLIENT_ID : undefined
                    );
                    streamType = "unknown";
                }
            }
        }catch (error){
            if (queue) {
                queue.songs.shift();
                module.exports.play(queue.songs[0], message, data);
            }
            return message.channel.send(`Ошибка: ${error.message ? error.message : error}`);
        }
        queue.connection.on("disconnect", () => message.client.queue.delete(message.guild.id));
        try{
            const dispatcher = queue.connection
            .play(stream, { type: streamType }, data)
            .on("finish", () => {
                if (collector && !collector.ended) collector.stop();
                if (queue.loop) {
                    let lastSong = queue.songs.shift();
                    queue.songs.push(lastSong);
                    module.exports.play(queue.songs[0], message, data);
                } else {
                    queue.songs.shift();
                    module.exports.play(queue.songs[0], message, data);
                }
            })
            .on("error", (err) => {
                queue.songs.shift();
                module.exports.play(queue.songs[0], message, data);
            });
            dispatcher.setVolumeLogarithmic(queue.volume / 100);
            var playingMessage = await queue.textChannel.send(embed_play());
            embed_play_edit = true;
            await playingMessage.react("⏭");
            await playingMessage.react("⏯");
            await playingMessage.react("🔇");
            await playingMessage.react("🔉");
            await playingMessage.react("🔊");
            await playingMessage.react("🔁");
            await playingMessage.react("⏹");
            const filter = (reaction, user) => user.id !== message.client.user.id;
            var collector = playingMessage.createReactionCollector(filter, {
                time: song.duration > 0 ? song.duration * 1000 : 600000
            });
            collector.on("collect", async(reaction, user) => {
                if (!queue) return;
                const member = message.guild.member(user);
                switch (reaction.emoji.name) {
                    case "⏭":
                        queue.playing = true;
                        reaction.users.remove(user).catch(console.error);
                        if (!canModifyQueue(member)) return;
                        queue.connection.dispatcher.end();
                        playingMessage.edit(embed_play(`${user} ⏩ скипнул музыку`));
                        collector.stop();
                    break;
                    case "⏯":
                        reaction.users.remove(user).catch(console.error);
                        if (!canModifyQueue(member)) return;
                        if (queue.playing) {
                            queue.playing = !queue.playing;
                            queue.connection.dispatcher.pause(true);
                            playingMessage.edit(embed_play(`${user} ⏸ поставил на паузу`));
                        } else {
                            queue.playing = !queue.playing;
                            queue.connection.dispatcher.resume();
                            playingMessage.edit(embed_play(`${user} ▶ убрал с паузы`));
                        }
                    break;
                    case "🔇":
                        reaction.users.remove(user).catch(console.error);
                        if (!canModifyQueue(member)) return;
                        if (queue.volume <= 0) {
                            queue.volume = 100;
                            queue.connection.dispatcher.setVolumeLogarithmic(100 / 100);
                            playingMessage.edit(embed_play(`${user} 🔊 включил звук`));
                        } else {
                            queue.volume = 0;
                            queue.connection.dispatcher.setVolumeLogarithmic(0);
                            playingMessage.edit(embed_play(`${user} 🔇 выключил звук`));
                        }
                    break;
                    case "🔉":
                        reaction.users.remove(user).catch(console.error);
                        if (!canModifyQueue(member)) return;
                        if (queue.volume - 10 <= 0) queue.volume = 0;
                        else queue.volume = queue.volume - 10;
                        queue.connection.dispatcher.setVolumeLogarithmic(queue.volume / 100);
                        playingMessage.edit(embed_play(`${user} 🔉 убавил громкость до ${queue.volume}%`));
                    break;
                    case "🔊":
                        reaction.users.remove(user).catch(console.error);
                        if (!canModifyQueue(member)) return;
                        if (queue.volume + 10 >= 100) queue.volume = 100;
                        else queue.volume = queue.volume + 10;
                        queue.connection.dispatcher.setVolumeLogarithmic(queue.volume / 100);
                        playingMessage.edit(embed_play(`${user} 🔊 добавил громкость до ${queue.volume}%`));
                    break;
                    case "🔁":
                    reaction.users.remove(user).catch(console.error);
                    if (!canModifyQueue(member)) return;
                    queue.loop = !queue.loop;
                    playingMessage.edit(embed_play(`${user} 🔁 ${queue.loop ? "Включил" : "Выключил"} повтор`));
                    break;
                    case "⏹":
                        reaction.users.remove(user).catch(console.error);
                        if (!canModifyQueue(member)) return;
                        queue.songs = [];
                        let m7 = await queue.textChannel.send(`${user} ⏹ остановил музыку`).catch();
                        setTimeout(() => {
                            m7.delete().catch();
                        }, 10000);
                        playingMessage.edit(embed_play());
                        try {
                            queue.connection.dispatcher.end();
                        } catch (error) {
                            console.error(error);
                            queue.connection.disconnect();
                        }
                        collector.stop();
                    break;
                    default:
                        reaction.users.remove(user).catch();
                    break;
                }
            });
        }catch{
            return message.client.commands.get("плей").run(message, [queue.songs[0].url], data);
        }
        collector.on("end", () => {
            embed_play_desc = '';
            embed_play_edit = false;
            playingMessage.delete().catch();
        });
        setInterval(() => {
            try{
                if(embed_play_edit) playingMessage.edit(embed_play(embed_play_desc));
            }catch{}
        }, 5000);
    }
};