const Command = require("../../base/Command.js");
const Discord = require("discord.js");
const malScraper = require("mal-scraper");
const translate = require("@k3rn31p4nic/google-translate-api");
class anime extends Command {
    constructor (client) {
        super(client, {
            name: "аниме",
            dirname: __dirname,
            enabled: true,
            guildOnly: true,
            aliases: [ "anime" ],
            memberPermissions: [],
            botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            ownerOnly: false,
            cooldown: 0
        });
    }
    async run (message, args, data) {
        message.delete().catch();
		let search = args.join(" ")
		if (!search) return message.reply("введите название аниме.")
		const embed = new Discord.MessageEmbed().setColor(data.guild.color).setImage("https://cdn.fydne.xyz/bot/waiting.gif");
		let _msg = await message.channel.send({embed})
		search = await translate(search, { to: 'en' });
		malScraper.getInfoFromName(search.text).then(async anime => {
            let desc = await translate(anime.synopsis, { from: 'en', to: 'ru' });
            let _date = await translate(anime.aired, { from: 'en', to: 'ru' });
            let _rating = await translate(anime.rating, { from: 'en', to: 'ru' });
            let _duration = await translate(anime.duration, { from: 'en', to: 'ru' });
            let _genres = await translate(anime.genres.join(", "), { from: 'en', to: 'ru' });
			embed
				.setThumbnail(anime.picture)
				.setImage("")
				.setColor(data.guild.color)
				.setTitle("Описание")
				.setDescription(desc.text)
				.addField('Название аниме', anime.englishTitle ? anime.englishTitle : anime.japaneseTitle, true)
				.addField('Тип', anime.type, true)
				.addField('Эпизодов', anime.episodes, true)
				.addField('Рейтинг', _rating.text, true)
				.addField('Начало/Окончание', _date.text, true)
				.addField('Отзывы', anime.score, true)
				.addField('Просмотров', anime.members, true)
				.addField('Длительность', _duration.text, true)
				.addField('Ранг', anime.ranked, true)
				.addField('Популярность', anime.popularity, true)
				.addField("Трейлер", `[Линк](${anime.trailer})`, true)
				.addField('Жанры', `${_genres.text}`, true);
			_msg.edit({embed});
		}).catch((err) => {
			console.log(err.stack)
			_msg.delete().catch();
			message.reply(`аниме ${search} не найдено`)
		})
    }
}
module.exports = anime;