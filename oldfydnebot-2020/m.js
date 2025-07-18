const { MessageEmbed } = require('discord.js');
const ytdl = require('ytdl-core-discord');
const ytpl = require('ytpl');
const request = require('node-superfetch');
const moment = require('moment');
const paginationEmbed = require('discord.js-pagination');
require('moment-duration-format');

module.exports = class MusicClient {
	constructor(client, options) {
		this.client = client;
		this.apiKey = options && options.apiKey;
		this.defVolume = (options && options.defVolume) || 50;
		this.bitRate = (options && options.bitRate) || 'auto';
		this.maxHistory = (options && options.maxHistory) || 50;
		this.maxQueue = (options && options.maxQueue) || 500;
		this.searchFilters = options && options.searchFilters;
		this.color = (options && options.color) || 13632027;
		this.logger = (options && options.logger) || console;
		this.autoLeaveIn = (options && options.autoLeaveIn) || 5 * 60 * 1000;
		this.guilds = new Map();
		this.searchFiltersEnabled = this.searchFilters ? true : false;
		this.timeout = null;
	}

	static get queueMode() {
		return {
			NORMAL: 'n',
			REPEAT_ALL: 'ra',
			REPEAT_ONE: 'ro'
		};
	}
	static get noteType() {
		return {
			ERROR: 'error',
			INFO: 'info',
			MUSIC: 'music',
			SEARCH: 'search'
		};
	}
	static song() {
		return {
			id: '',
			title: '',
			uploader: '',
			uploaderURL: '',
			requester: '',
			requesterAvatarURL: '',
			url: '',
			duration: ''
		};
	}

	getGuild(guildId) {
		if (!this.guilds.has(guildId)) {
			this.guilds.set(guildId, {
				id: guildId,
				audioDispatcher: null,
				queue: new Array(),
				history: new Array(),
				mode: MusicClient.queueMode.NORMAL,
				volume: this.defVolume
			});
		}
		const guild = this.guilds.get(guildId);
		return guild;
	}
	getCurrentSong(guild) {
		return guild.history[0];
	}
	getNextSong(guild) {
		if (guild.queue.length > 0) {
			const song = guild.queue[0];
			if (guild.mode === MusicClient.queueMode.NORMAL) {
				guild.queue.shift();
			} else if (guild.mode === MusicClient.queueMode.REPEAT_ALL) {
				guild.queue.shift();
				guild.queue.push(song);
			}
			return song;
		}
	}
	addSongToHistory(guild, song) {
		if (guild.history[0] !== song) {
			guild.history.unshift(song);
			while (guild.history.length > this.maxHistory) guild.history.pop();
		}
	}
	async playStream(song, msg, volume, seek = 0) {
		const conn = await this.getVoiceConnection(msg);
		const info = await ytdl.getBasicInfo(song.url);
		const isLive = info.player_response.videoDetails.isLiveContent && info.player_response.videoDetails.isLive;
		const options = {
			filter: 'audioonly',
			quality: 'highestaudio',
			highWaterMark: 1 << 25
		};
		if (isLive) {
			options.begin = Date.now();
		}
		return conn.play(await ytdl(song.url, options), {
			bitrate: this.bitRate,
			passes: 3,
			seek,
			volume: volume / 100,
			type: 'opus',
			highWaterMark: 1
		});
	}
	async playNow(guild, song, msg) {
		try {
			if (this.timeout) {
				clearTimeout(this.timeout);
				this.timeout = null;
			}
			guild.audioDispatcher = await this.playStream(song, msg, guild.volume);
			this.addSongToHistory(guild, song);
			guild.audioDispatcher.on('finish', () => this.playNext(guild, msg));
			guild.audioDispatcher.on('error', error => this.note(error, msg, MusicClient.noteType.ERROR));
			this.displaySong(guild, msg, song);
		} catch (error) {
			this.note(msg, error, MusicClient.noteType.ERROR);
			this.playNext(guild, msg);
		}
	}
	playNext(guild, msg) {
		try {
			const song = this.getNextSong(guild);
			if (song) return this.playNow(guild, song, msg);
			this.stop(guild, msg, false);
			if (this.autoLeaveIn !== 0) {
				this.timeout = setTimeout(() => this.disconnectVoiceConnection(msg), this.autoLeaveIn);
			}
			this.note(msg, 'Очередь пуста, воспроизведение завершено.', MusicClient.noteType.MUSIC);
		} catch (error) {
			this.disconnectVoiceConnection(msg);
		}
	}
	stop(guild, msg, displayNote = true) {
		if (!guild.audioDispatcher && displayNote) {
			return this.note(msg, 'В данный момент ничего не играет, как жаль(', MusicClient.noteType.ERROR);
		}
		guild.audioDispatcher.pause();
		guild.audioDispatcher.destroy();
		guild.audioDispatcher = null;
		if (displayNote) return this.note(msg, 'Музыка остановлена.', MusicClient.noteType.MUSIC);
	}
	async getVoiceConnection(msg, force = false) {
		if (!msg.guild) throw new Error('Невозможно найти дискорд сервер.');
		const voiceChannel = msg.member.voice.channel;
		const voiceConnection = this.client.voice.connections.find(val => val.channel.guild.id === msg.guild.id);
		if (!voiceConnection || force) {
			if (voiceChannel && voiceChannel.joinable) return await voiceChannel.join();
			throw new Error('Невозможно присоединиться к вашему голосовому каналу.');
		}
		return voiceConnection;
	}
	disconnectVoiceConnection(msg) {
		this.client.voice.connections.forEach(conn => {
			if (conn.channel.guild.id === msg.guild.id) conn.disconnect();
		});
	}
	async getSongViaUrl(url) {
		const info = await ytdl.getBasicInfo(url);
		const song = MusicClient.song();
		song.id = info.video_id;
		song.title = info.title;
		song.url = info.video_url;
		song.uploader = info.author.name;
		song.uploaderURL = info.author.channel_url;
		song.duration = moment.duration(parseInt(info.length_seconds), 'seconds').format();
		return [song];
	}
	async getSongsViaPlaylistUrl(url) {
		const playId = url.toString().split('list=')[1];
		const playlist = await ytpl(playId);
		if (playlist.items.length < 1) throw new Error('Не удалось получить ни одной песни из этого плейлиста.');
		const songs = [];
		for (const info of playlist.items) {
			const song = MusicClient.song();
			song.id = info.id;
			song.title = info.title;
			song.url = info.url_simple;
			song.uploader = info.author.name;
			song.uploaderURL = info.author.ref;
			song.duration = info.duration;
			songs.push(song);
		}
		return songs;
	}
	filterSong(songs, query) {
		let exclude = this.searchFilters;
		exclude = exclude.filter(term => !query.includes(term));
		let hit = songs[0];
		songs.reverse().forEach(song => {
			if (!new RegExp(exclude.join('|'), 'u').test(song.title.trim().toLowerCase())) hit = song;
		});
		return hit;
	}
	async getSongsViaSearchQuery(query) {
		const searchString = query.trim();
		const { body, error } = await request.get('https://www.googleapis.com/youtube/v3/search').query({
			part: 'snippet',
			type: 'video',
			maxResults: this.searchFiltersEnabled && this.searchFilters ? 5 : 1,
			q: searchString,
			key: this.apiKey
		});
		if (!body.items.length || error) throw new Error(`По поиску: **"${searchString}"** ничего не найдено(.`);
		const songs = [];
		for (const info of body.items) {
			const song = MusicClient.song();
			song.id = info.id.videoId;
			song.title = info.snippet.title;
			song.url = `https://www.youtube.com/watch?v=${info.id.videoId}`;
			song.uploader = info.snippet.channelTitle;
			song.uploaderURL = `https://www.youtube.com/channel/${info.snippet.channelId}`;
			song.duration = moment
			.duration(parseInt((await ytdl.getBasicInfo(song.url)).length_seconds), 'seconds')
			.format();
			songs.push(song);
		}
		if (this.searchFiltersEnabled && this.searchFilters && songs.length > 0) {
			return [this.filterSong(songs, searchString)];
		}
		return [songs[0]];
	}
	async search(msg, query) {
		let searchString = query.trim();
		let songs = [];
		let note;
		if (searchString.includes('youtu.be/') || searchString.includes('youtube.com/')) {
			if (searchString.includes('&')) searchString = searchString.split('&')[0];
			if (searchString.includes('watch') || searchString.includes('youtu.be/')) {
				note = await this.note(msg, '*~Поиск по ссылке YouTube~*', MusicClient.noteType.SEARCH);
				songs = await this.getSongViaUrl(searchString);
			} else if (searchString.includes('playlist')) {
				note = await this.note(msg, '*~Поиск плейлиста на YouTube~*', MusicClient.noteType.SEARCH);
				songs = await this.getSongsViaPlaylistUrl(searchString);
			}
		} else {
			note = await this.note(msg, '*~Поиск...~*', MusicClient.noteType.SEARCH);
			songs = await this.getSongsViaSearchQuery(query);
		}
		note.delete({ timeout: 3000 });
		return songs;
	}
	async displaySong(guild, msg, song) {
		if (!msg.channel) throw new Error('Канал недоступен.');
		let repeatMode = 'Выключен';
		if (guild.mode === MusicClient.queueMode.REPEAT_ALL) repeatMode = 'Всегда';
		if (guild.mode === MusicClient.queueMode.REPEAT_ONE) repeatMode = 'Только сейчас';
		const embed = new MessageEmbed()
			.setAuthor('Сейчас играет:', this.client.user.displayAvatarURL())
			.setThumbnail(`https://img.youtube.com/vi/${song.id}/maxresdefault.jpg`)
			.setColor(this.color)
			.addField('Название:', `[${song.title}](${song.url})`)
			.addField('Автор:', `[${song.uploader}](${song.uploaderURL})`, true)
			.addField('Длительность:', `${song.duration}`, true)
			.addField('Включил:', `<@${song.requester}>`, true)
			.addField('Громкость:', `${guild.audioDispatcher.volume * 100}%`, true)
			.addField('Повтор:', `${repeatMode}`, true);
		const songDisplay = await msg.channel.send(embed);
		const emojiList = ['⏪', '⏯', '⏩', '⏹', '🔀', '🔁'];
		for (const emoji of emojiList) await songDisplay.react(emoji);
		const reactionCollector = songDisplay.createReactionCollector(
			(reaction, user) => emojiList.includes(reaction.emoji.name) && !user.bot,
			{ time: 0 }
		);
		reactionCollector.on('collect', reaction => {
			switch (reaction.emoji.name) {
				case '⏪':
					this.previousFunction(msg);
					break;
				case '⏯':
					if (guild.audioDispatcher.paused) this.resumeFunction(msg);
					else this.pauseFunction(msg);
					break;
				case '⏩':
					this.skipFunction(msg);
					break;
				case '⏹':
					this.stopFunction(msg);
					break;
				case '🔀':
					this.showQueueFunction(msg);
					break;
				case '🔁':
					if (guild.mode === MusicClient.queueMode.NORMAL) this.repeatFunction(msg, 'тс');
					else if (guild.mode === MusicClient.queueMode.REPEAT_ONE) this.repeatFunction(msg, 'в');
					else this.repeatFunction(msg, 'выкл');
					break;
				default:
					break;
			}
		});
	}
	async note(msg, text, type) {
		if (!msg.channel) throw new Error('Канал недоступен.');
		const embed = new MessageEmbed().setColor(this.color);
		switch (type) {
			case MusicClient.noteType.INFO:
				return await msg.channel.send(embed.setDescription(`:information_source: | ${text}`));
			case MusicClient.noteType.MUSIC:
				return await msg.channel.send(embed.setDescription(`:musical_note: | ${text}`));
			case MusicClient.noteType.SEARCH:
				return await msg.channel.send(embed.setDescription(`:mag: | ${text}`));
			case MusicClient.noteType.ERROR:
				return await msg.channel.send(embed.setDescription(`:warning: | ${text}`));
			default:
				return await msg.channel.send(embed.setDescription(`${text}`));
		}
	}
	pageEmbed(_title, _isField, _extraTitle, _extraText) {
		class pageEmbed extends MessageEmbed {
			constructor(title, avatarURL, color, isField = false, extraTitle, extraText) {
				super();
				this.setAuthor(title, avatarURL);
				this.setColor(color);
				if (extraTitle) this.addField(extraTitle, extraText);
				this.isField = isField;
			}
			addContent(title, text) {
				!this.isField ? this.setDescription(text) : this.addField(title, text);
			}
		}
		const avatarURL = this.client.user.displayAvatarURL();
		return new pageEmbed(_title, avatarURL, this.color, _isField, _extraTitle, _extraText);
	}
	pageBuilder(title, list, pageLimit, isField, extraTitle, extraText) {
		const pages = [];
		if (list.length < 1) {
			const pageEmbed = this.pageEmbed(title, isField, extraTitle, extraText);
			pageEmbed.addContent(title, `По поиску ${title} пусто.`);
			pages.push(pageEmbed);
		}
		for (let i = 0; i < list.length; i += pageLimit) {
			let text = '';
			const pageEmbed = this.pageEmbed(title, isField, extraTitle, extraText);
			list.slice(i, i + pageLimit).forEach((entry, index) => {
				text += `${i + index + 1}. [${entry.title}](${entry.url})\n*Включен: <@${entry.requester}>*\n`;
			});
			pageEmbed.addContent(title, text);
			pages.push(pageEmbed);
		}
		return pages;
	}

	async playFunction(msg, query, force = false) {
		if (!query) return this.note(msg, 'URL или запрос не найдены.', MusicClient.noteType.ERROR);
		const guild = this.getGuild(msg.guild.id);
		const voiceChannel = msg.member.voice.channel;
		if (!voiceChannel) return this.note(msg, 'Вы должны быть в голосовом канале', MusicClient.noteType.ERROR);
		try {
			let songs = await this.search(msg, query);
			if (songs.length + guild.queue.length > this.maxQueue) {
				if (songs.length === 1) return this.note(msg, 'Очередь переполнена.', MusicClient.noteType.ERROR);
				(await this.note(msg, 'Плейлист был сокращен.', MusicClient.noteType.ERROR)).delete({
					timeout: 3000
				});
				songs = songs.slice(0, this.maxQueue - guild.queue.length);
			}
			for (const song of songs) {
				song.requester = msg.author.id;
				song.requesterAvatarURL = msg.author.displayAvatarURL();
			}
			if (force) {
			} else {
				guild.queue = guild.queue.concat(songs);
			}
			if (songs.length > 1) {
				this.note(msg, `Добавлено в очередь: ${songs.length} песен`, MusicClient.noteType.MUSIC);
			} else {
				this.note(msg, `Добавлено в очередь: [${songs[0].title}](${songs[0].url})`, MusicClient.noteType.MUSIC);
			}
			if (!guild.audioDispatcher) this.playNext(guild, msg);
		} catch (error) {
			this.note(msg, error, MusicClient.noteType.ERROR);
		}
	}
	clearFunction(msg) {
		const guild = this.getGuild(msg.guild.id);
		guild.queue = new Array();
		this.note(msg, 'Очередь очищена', MusicClient.noteType.MUSIC);
	}
	async joinFunction(msg) {
		const voiceChannel = msg.member.voice.channel;
		if (!voiceChannel) return this.note(msg, 'Вы должны быть в голосовом канале.', MusicClient.noteType.ERROR);
		await this.getVoiceConnection(msg, true);
		this.note(msg, 'Уже в войсе', MusicClient.noteType.MUSIC);
	}
	leaveFunction(msg) {
		const voiceConnection = this.client.voice.connections.find(val => val.channel.guild.id === msg.guild.id);
		if (!voiceConnection) return this.note(msg, 'Я не в войсе.', MusicClient.noteType.ERROR);
		const guild = this.getGuild(msg.guild.id);
		this.stop(guild, msg);
		this.disconnectVoiceConnection(msg);
		this.note(msg, 'Ливаю...', MusicClient.noteType.MUSIC);
	}
	nowPlayingFunction(msg) {
		const guild = this.getGuild(msg.guild.id);
		if (!guild.audioDispatcher) return this.note(msg, 'Сейчас ничего не играет(', MusicClient.noteType.ERROR);
		this.displaySong(guild, msg, this.getCurrentSong(guild));
	}
	pauseFunction(msg) {
		const guild = this.getGuild(msg.guild.id);
		if (!guild.audioDispatcher) {
			this.note(msg, 'Сейчас ничего не играет(', MusicClient.noteType.ERROR);
		} else if (guild.audioDispatcher.paused) {
			this.note(msg, 'Музыка уже приостановлена.', MusicClient.noteType.ERROR);
		} else {
			guild.audioDispatcher.pause(true);
			this.note(msg, 'Останавливаю...', MusicClient.noteType.MUSIC);
		}
	}
	resumeFunction(msg) {
		const guild = this.getGuild(msg.guild.id);
		if (!guild.audioDispatcher) {
			this.note(msg, 'Сейчас ничего не играет(', MusicClient.noteType.ERROR);
		} else if (!guild.audioDispatcher.paused) {
			this.note(msg, 'Музыка уже играет.', MusicClient.noteType.ERROR);
		} else {
			guild.audioDispatcher.resume();
			this.note(msg, 'Воспроизведение возобновлено.', MusicClient.noteType.MUSIC);
		}
	}
	stopFunction(msg) {
		const guild = this.getGuild(msg.guild.id);
		this.stop(guild, msg);
		guild.queue = new Array();
		this.note(msg, 'Очередь пуста.', MusicClient.noteType.MUSIC);
	}
	repeatFunction(msg, mode) {
		const guild = this.getGuild(msg.guild.id);
		switch (mode.trim().toLowerCase()) {
			case 'тс':
				if (guild.queue[0] !== guild.history[0]) guild.queue.unshift(guild.history[0]);
				guild.mode = MusicClient.queueMode.REPEAT_ONE;
				return this.note(msg, 'Повтор: только сейчас', MusicClient.noteType.MUSIC);
			case 'в':
				if (guild.queue[guild.queue.length - 1] !== guild.history[0]) guild.queue.push(guild.history[0]);
				guild.mode = MusicClient.queueMode.REPEAT_ALL;
				return this.note(msg, 'Повтор: Всегда', MusicClient.noteType.MUSIC);
			case 'выкл':
				guild.mode = MusicClient.queueMode.NORMAL;
				return this.note(msg, 'Повтор: выключен', MusicClient.noteType.MUSIC);
			default:
				return this.note(msg, 'Вы точно правильно написали?', MusicClient.noteType.ERROR);
		}
	}
	removeFunction(msg, songIndex) {
		if (!songIndex) return this.note(msg, 'Индекс не указан.', MusicClient.noteType.ERROR);
		const index = songIndex - 1;
		const guild = this.getGuild(msg.guild.id);
		if (index < 0 || index >= guild.queue.length) {
			return this.note(msg, 'Индекс выходит за пределы.', MusicClient.noteType.ERROR);
		}
		const song = guild.queue[index];
		guild.queue.splice(index, 1);
		return this.note(msg, `[${song.title}](${song.url}) удален!`, MusicClient.noteType.MUSIC);
	}
	shuffleFunction(msg) {
		const guild = this.getGuild(msg.guild.id);
		if (guild.queue.length < 1) return this.note(msg, 'Очередь пуста.', MusicClient.noteType.ERROR);
		for (let i = guild.queue.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[guild.queue[i], guild.queue[j]] = [guild.queue[j], guild.queue[i]];
		}
		this.note(msg, 'Очередь перемешана.', MusicClient.noteType.MUSIC);
	}
	previousFunction(msg) {
		const guild = this.getGuild(msg.guild.id);
		if (!guild.audioDispatcher) return this.note(msg, 'Сейчас ничего не играет', MusicClient.noteType.ERROR);
		this.note(msg, 'Ок', MusicClient.noteType.MUSIC);
		if (guild.queue[0] !== guild.history[0]) guild.queue.unshift(guild.history[0]);
		guild.audioDispatcher.end();
	}
	skipFunction(msg) {
		const guild = this.getGuild(msg.guild.id);
		if (!guild.audioDispatcher) return this.note(msg, 'Сейчас ничего не играет', MusicClient.noteType.ERROR);
		this.note(msg, 'Музыка пропущена.', MusicClient.noteType.MUSIC);
		guild.audioDispatcher.end();
	}
	volumeFunction(msg, volume) {
		if (isNaN(volume)) return this.note(msg, 'Громкость не указана', MusicClient.noteType.ERROR);
		if (volume < 0 || volume > 200) {
			return this.note(msg, 'Громкость должна быть от 0 до 200.', MusicClient.noteType.ERROR);
		}
		const guild = this.getGuild(msg.guild.id);
		this.note(msg, `Громкость изменена на: ${volume}.`, MusicClient.noteType.MUSIC);
		guild.defVolume = volume;
		if (guild.audioDispatcher) guild.audioDispatcher.setVolume(volume / 100);
	}
	showHistoryFunction(msg) {
		const guild = this.getGuild(msg.guild.id);
		const pages = this.pageBuilder('История:', guild.history, 10);
		paginationEmbed(msg, pages);
	}
	showQueueFunction(msg) {
		const guild = this.getGuild(msg.guild.id);
		const nowPlaying = this.getCurrentSong(guild);
		let nowPlayingText = 'Сейчас ничего не играет, жаль(';
		if (nowPlaying && guild.audioDispatcher) {
			nowPlayingText = `[${nowPlaying.title}](${nowPlaying.url})\n*Включил: <@${nowPlaying.requester}>*\n`;
		}
		const pages = this.pageBuilder('Очередь', guild.queue, 5, true, 'Сейчас играет:', nowPlayingText);
		paginationEmbed(msg, pages);
	}
	showSearchFiltersFunction(msg) {
		this.note(
			msg,
			`Текущие поисковые фильтры: \`${this.searchFilters.join(', ')}\`.\nФильтры поиска \`${
				this.searchFiltersEnabled ? 'вкл' : 'выкл'
			}\`.`,
			MusicClient.noteType.INFO
		);
	}
	setSearchFiltersFunction(msg, filters) {
		this.searchFilters = filters;
		this.showSearchFiltersFunction(msg);
	}
	searchFiltersModeFunction(msg, mode) {
		switch (mode.trim().toLowerCase()) {
			case 'вкл':
				this.searchFiltersEnabled = true;
				return this.note(msg, 'Фильтры для поиска включены!', MusicClient.noteType.INFO);
			case 'выкл':
				this.searchFiltersEnabled = false;
				return this.note(msg, 'Повтор выключен', MusicClient.noteType.INFO);
			default:
				return this.note(msg, 'Хмм, вы точно написали правильно?.', MusicClient.noteType.ERROR);
		}
	}
};