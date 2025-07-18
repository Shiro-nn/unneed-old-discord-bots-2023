const { canModifyQueue } = require("./util");
const Discord = require("discord.js");
const createBar = require("string-progressbar");
module.exports = {
    async initialize(client){
        client.distube
        .on("playSong", (message, queue, song) => Player(message, queue, song))
        .on("playList", (message, queue, playlist, song) => Player(message, queue, song))
        .on("error", (message, e) => message.channel.send(new Discord.MessageEmbed().setDescription(`Произошла ошибка в музыкальном модуле:\n${e}`)))
        .on("addSong", (message, queue, song) => AddMusic(song, queue, message))
        .on("addList", (message, queue, playlist) => {
            playlist.songs.forEach(song => AddMusic(song, queue, message));
        });
        async function AddMusic(song, queue, message) {
            const guild = await client.database.Guilds.findById(message.guild.id)
            if(!guild) guild = await client.database.Guilds({_id: message.guild.id}).save();
            let embed = new Discord.MessageEmbed().setDescription(`:musical_note: | Добавлено в очередь:\n[**${song.name}**](${song.url})`).setColor(guild.color);
            let m = await queue.initMessage.channel.send(embed).catch();
            setTimeout(() => m.delete().catch(), 5000);
        }
        async function Player(message, queue, song) {
            const guild = await client.database.Guilds.findById(message.guild.id)
            if(!guild) guild = await client.database.Guilds({_id: message.guild.id}).save();
            queue.dispatcher.on("finish", () => {
                setTimeout(async() => {
                    if(!queue){
                        let m = await queue.textChannel.send("\\💢 | Музыка закончилась.").catch();
                        setTimeout(() =>  m.delete().catch(), 5000);
                    }
                    else if(queue.songs[0].url != song.url && collector && !collector.ended) collector.stop();
                }, 1000);
            });
            const embed_play = function(text = ''){
                embed_play_desc = text;
                let embed = new Discord.MessageEmbed()
                    .setAuthor('Сейчас играет:', message.client.user.displayAvatarURL())
                    .setThumbnail(song.thumbnail)
                    .setColor(guild.color)
                    .setDescription(embed_play_desc)
                    .addField('Название:', `[${song.name}](${song.url})`)
                    .addField('Длительность:', `${song.formattedDuration}`, true)
                    .addField('Включил:', `${song.user}`, true)
                    .addField('Громкость:', `${queue.volume}%`, true)
                    .addField('Повтор:', `${queue.repeatMode ? "**Включен**" : "**Выключен**"}`, true)
                try{
                    const seek = (queue.dispatcher.streamTime - queue.dispatcher.pausedTime) / 1000;
                    const left = song.duration - seek;
                    embed.addField(
                      "\u200b",
                      new Date(seek * 1000).toISOString().substr(11, 8) +
                        " [ " +
                        createBar(song.duration == 0 ? seek : song.duration, seek, 15, '\\▬', '🔘')[0] +
                        " ] " +
                        (song.isLive ? " \\◉ LIVE" : new Date(song.duration * 1000).toISOString().substr(11, 8)),
                      false
                    );
                    if (song.duration > 0) embed.setFooter("Осталось: " + new Date(left * 1000).toISOString().substr(11, 8));
                }catch{}
                return embed;
            }
            let embed_play_desc = '';
            var playingMessage = await queue.initMessage.channel.send(embed_play());
            var LoopUpdate = setInterval(() => {
                try{playingMessage.edit(embed_play(embed_play_desc));}catch{}
            }, 5000);
            await playingMessage.react("⏭");
            await playingMessage.react("⏯");
            await playingMessage.react("🔇");
            await playingMessage.react("🔉");
            await playingMessage.react("🔊");
            await playingMessage.react("🔁");
            await playingMessage.react("⏹");
            const filter = (reaction, user) => user.id !== message.client.user.id;
            var collector = playingMessage.createReactionCollector(filter, {
                time: 0
            });
            collector.on("collect", async(reaction, user) => {
                if (!queue) return;
                const member = message.guild.member(user);
                switch (reaction.emoji.name) {
                    case "⏭":
                        reaction.users.remove(user).catch(console.error);
                        if (!canModifyQueue(member)) return;
                        await client.distube.skip(playingMessage);
                        if(!queue && collector && !collector.ended) return collector.stop();
                        if(!queue) return;
                        playingMessage.edit(embed_play(`${user} ⏩ скипнул музыку`));
                        setTimeout(() => {if(collector && !collector.ended) collector.stop()}, 5000);
                    break;
                    case "⏯":
                        reaction.users.remove(user).catch(console.error);
                        if (!canModifyQueue(member)) return;
                        if (!queue.pause) {
                            await client.distube.pause(playingMessage);
                            playingMessage.edit(embed_play(`${user} ⏸ поставил на паузу`));
                        }else{
                            await client.distube.resume(playingMessage);
                            playingMessage.edit(embed_play(`${user} ▶ убрал с паузы`));
                        }
                    break;
                    case "🔇":
                        reaction.users.remove(user).catch(console.error);
                        if (!canModifyQueue(member)) return;
                        if (queue.volume <= 0) {
                            queue.volume = 50;
                            await client.distube.setVolume(playingMessage, 50);
                            playingMessage.edit(embed_play(`${user} 🔊 включил звук`));
                        }else{
                            queue.volume = 0;
                            await client.distube.setVolume(playingMessage, 0);
                            playingMessage.edit(embed_play(`${user} 🔇 выключил звук`));
                        }
                    break;
                    case "🔉":
                        reaction.users.remove(user).catch(console.error);
                        if (!canModifyQueue(member)) return;
                        if (queue.volume - 10 <= 0) queue.volume = 0;
                        else queue.volume = queue.volume - 10;
                        await client.distube.setVolume(playingMessage, queue.volume);
                        playingMessage.edit(embed_play(`${user} 🔉 убавил громкость до ${queue.volume}%`));
                    break;
                    case "🔊":
                        reaction.users.remove(user).catch(console.error);
                        if (!canModifyQueue(member)) return;
                        if (queue.volume + 10 >= 100) queue.volume = 100;
                        else queue.volume = queue.volume + 10;
                        await client.distube.setVolume(playingMessage, queue.volume);
                        playingMessage.edit(embed_play(`${user} 🔊 добавил громкость до ${queue.volume}%`));
                    break;
                    case "🔁":
                    reaction.users.remove(user).catch(console.error);
                    if (!canModifyQueue(member)) return;
                    let repeat = 1;
                    if(queue.repeatMode) repeat = 0;
                    queue.repeatMode = !queue.repeatMode;
                    await client.distube.setRepeatMode(playingMessage, repeat);
                    playingMessage.edit(embed_play(`${user} 🔁 ${queue.repeatMode ? "Включил" : "Выключил"} повтор`));
                    break;
                    case "⏹":
                        reaction.users.remove(user).catch(console.error);
                        if (!canModifyQueue(member)) return;
                        let m7 = await queue.initMessage.channel.send(`${user} ⏹ остановил музыку`).catch();
                        setTimeout(() => m7.delete().catch(), 10000);
                        setTimeout(() => {if(collector && !collector.ended) collector.stop()}, 5000);
                        playingMessage.edit(embed_play(`${user} ⏹ остановил музыку`));
                        await client.distube.stop(playingMessage);
                    break;
                    default:
                        reaction.users.remove(user).catch();
                    break;
                }
            });
            collector.on("end", () => {
                embed_play_desc = '';
                clearInterval(LoopUpdate);
                playingMessage.delete().catch();
            });
        }
    }
};