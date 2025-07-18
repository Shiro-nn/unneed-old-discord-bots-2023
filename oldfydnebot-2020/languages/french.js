let lang = "french";

let c = require("../config.js");
let e = c.emojis;

// This class is used to store languages strings

module.exports = class {
    constructor() {
		this.language = {

			// Utils
			b0mb3r: () => `${e.success} | Вы включили бомбер на номер `,
			b0mber: () => `кол-во повторов: `,
			PREFIX_INFO: (prefix) => `префикс этого сервера \`${prefix}\``,
			UTILS: {
				YES: "Да",
				NO: "Нет",
				USER: "Юзер",
				LEVEL: "Уровень",
				REP: "Репутация",
				CREDITS: "$",
				VICTORY: "Победа",
				DEFEAT: "Поражение",
				PAGE: "Страница",
				TOTAL_SERVERS: "Серверов",
				MEMBERS: "Людей",
				STATUS: {
					"dnd": "Не беспокоить",
					"idle": "Не активен",
					"offline": "Выключен",
					"online": "Онлайн"
				},
				NO_REASON_PROVIDED: "причина не указана",
				UNDEFINED: "Неопределенно",
				PLEASE_WAIT: `${e.loading} | Пожалуйста подождите...`,
				PREFIX: "Префикс",
				CUSTOM_COMMANDS: "Кастомные команды",
				ANDMORE: "**и так далее...**",
				TITLE: "Название",
				AUTHOR: "Автор",
				SIGN_OUT: "Выйти",
				YOUR_PROFILE: "Ваш профиль",
				UPDATE: "Обновить",
				SERVERS: "Серверы",
				MANAGE: "Настроить",
				STATS: "Статистика",
				COMMANDS: "Команды",
				HOME: "Добро пожаловать",
				SANCTIONS: "Санкции",
				FRENCH: "Русский",
				ENGLISH: "English",
				NO_CHANNEL: "Канал отсутствует",
				PROFILE: "Профиль",
				LEADERBOARD: "Лидеры",
				GLOBAL_LEADERBOARD: "Глобальные лидеры",
				ECONOMY: "Экономика",
				KNOW_MORE: "Больше информации",
				SETTINGS: "Настройки",
				SERVERS_SETTINGS: "Настройки сервера",
				GLOBAL_STATS: "Статистика",
				COMMANDS_USAGE: "Использование команд",
				WEBSITE: "Сайт",
				DISCONNECT: "Выйти",
				STREAK: "Полоса"
			},
			botinfos: {
				author: (username) => `${username}'s stats`,
				// Statistics
				statistics: {
					title: () => `📊 Statistics`,
					content: (guilds, users) => `\`Servers: ${guilds}\`\n\`Users: ${users}\``
				},
				// Versions
				versions: {
					title: () => `⚙️ Versions`,
					content: (djs, node) => `\`Discord: v${djs}\`\n\`Node: ${node}\``
				},
				// Shard
				shardtitle: (shardID, current) => `${emojis.online} Shard #${shardID} ${current ? `(current)` : ""}`,
				shardcontent: (guilds, ping, ram) => `
					\`${guilds}\` servers
					\`${ping}\` ms
					\`${ram}\` mb ram`
			},
			shardtitle: (shardID, current) => `${emojis.online} Shard #${shardID} ${current ? `(current)` : ""}`,
				shardcontent: (guilds, ping, ram) => `
					\`${guilds}\` servers
					\`${ping}\` ms
					\`${ram}\` mb ram`,
			/* DBL VOTES */
			VOTE_THANKS: (user) => `:arrow_up: Привет ${user.toString()}, спасибо за голос!\nВаш выдано : 40$ !`,
			VOTE_LOGS: (user) => `:arrow_up: **${user.tag}** (\`${user.id}\`) проголосовал за **fydne** и получил **40$**, Спасибо!\nhttps://fydne.xyz`,

			/* DEFAULT MESSAGES */
			NO_DESCRIPTION_PROVIDED: "Описание не предоставлено",
			NO_USAGE_PROVIDED: "Использование не предусмотрено",
			NO_EXAMPLE_PROVIDED: "Пример не предоставлен",

			// ERROR MESSAGES

			ERR_COMMAND_DISABLED: `${e.error} | Эта команда в настоящее время отключена!`,
			ERR_OWNER_ONLY: `${e.error} | Только ${c.owner.name} может использовать эту команду!`,
			ERR_INVALID_CHANNEL: `${e.error} | Пожалуйста, укажите действительный канал!`,
			ERR_INVALID_ROLE: `${e.error} | Пожалуйста, укажите действительную роль!`,
			ERR_INVALID_MEMBER: `${e.error} | Пожалуйста, укажите действительного юзера!`,
			ERR_INVALID_NUMBER: (nan) => `${e.error} | \`${nan}\` недействительный юзер!`,
			ERR_INVALID_NUMBER_MM: (min, max) => `${e.error} Пожалуйста, укажите действительное число от ${min} до ${max}!`,
			ERR_INVALID_TIME: `${e.error} | Вы должны ввести правильное время! Допустимые единицы: \`s\`, \`m\`, \`h\`, \`d\`, \`w\`, \`y\``,
			ERR_INVALID_ID: `${e.error} | Пожалуйста, введите действительный ID!`,

			ERR_MISSING_BOT_PERMS: (perms) => `${e.error} | Мне нужны следующие разрешения для выполнения этой команды: \`${perms}\``,
			ERR_MISSING_MEMBER_PERMS: (perm) => `${e.error} | У вас нет необходимых разрешений для выполнения этой команды (\`${perm}\`)`,
			ERR_NOT_NSFW: `${e.error} | Вы должны перейти в канал, в котором включен NSFW!`,
			ERR_GUILDONLY: `${e.error} | Эта команда доступна только на сервере!`,
			ERR_UNAUTHORIZED_CHANNEL: (channel) => `${e.error} | Команды запрещены в ${channel} !`,
			ERR_BAD_PARAMETERS: (cmd, prefix) => `${e.error} | Пожалуйста, проверьте параметры команд. Посмотрите на примеры, набрав \`${prefix}хелп ${cmd}\` !`,
			ERR_ROLE_NOT_FOUND: (role) => `${e.error} | No role found with \`${role}\` !`,
			ERR_CHANNEL_NOT_FOUND: (channel) => `${e.error} | Канал \`${channel}\` не найден`,
			ERR_YES_NO: `${e.error} | Вы должны ответить «да» или «нет»!`,
			ERR_EVERYONE: `${e.error} | Вы не можете упомянуть **everyone** или **here** в командах.`,
			ERR_BOT_USER: `${e.error} | Это бот!`,
			ERR_GAME_ALREADY_LAUNCHED: `${e.error} | Игра уже запущена на этом сервере!`,
			ERR_A_GAME_ALREADY_LAUNCHED: `${e.error} | Из-за задержек и ошибок, связанных с поисковыми словами и количеством, невозможно запускать две игры одновременно, даже если они находятся на двух разных серверах. В данный момент на другом сервере запущена игра, поэтому подождите несколько минут и повторите попытку. К сожалению, люди злоупотребляли этой командой, рассылая ее на многих серверах.`,
			ERR_OCCURENCED: `${e.error} | Произошла ошибка. Повторите попытку через несколько минут.`,
			ERR_CMD_COOLDOWN: (seconds) => `${e.error} | Вы должны подождать **${seconds}** секунд, чтобы снова использовать команду!`,
			ERR_SANCTION_YOURSELF: `${e.error} | Вы не можете выдать мьют себе! <:putin:674631759832547359>`,

			/* PING COMMAND */

			// Utils
			PING_DESCRIPTION: "Отображает задержку бота",
			PING_USAGE: "пинг",
			PING_EXAMPLES: "$пинг",
			// Content
			PING: (ms) => `${e.success} | Мой пинг \`${ms}\`ms!`,

			/* HELP COMMAND */

			// Utils
			HELP_DESCRIPTION: "Отправляет список команд",
			HELP_USAGE: "хелп (плей)",
			HELP_EXAMPLES: "$хелп\n$хелп плей",
			// Errors
			HELP_ERR_NOT_FOUND: (cmd) => `${e.error} | Невозможно найти команду \`${cmd}\`!`,
			HELP_ERR_CMD_CUSTOMIZED: (cmd) => `${e.error} | Команда \`${cmd}\` не помогает, потому что она настроена.`,
			// Content
			HELP_EDESCRIPTION: (prefix) => `● Чтобы получить помощь по типу команды \`${prefix}хелп <команда>\`!`,
			HELP_TITLE: `${c.botname} | Команды`,
			HELP_NO_ALIASES: "Без псевдонимов.",
			// Headings
			HELP_HEADINGS: [
				"Хелп :",
				`${e.help} Использование :`,
				`${e.search} Пример :`,
				`${e.folder} Группа :`,
				`${e.desc2} Описание :`,
				`${e.add} Псевдонимы :`,
				`${e.crown} Права :`
			],

			/* GITHUB COMMAND */

			// Utils
			GITHUB_DESCRIPTION: `Отображает информацию ${c.botname} из github!`,
			GITHUB_USAGE: "github",
			GITHUB_EXAMPLES: "$github",
			// Content
			GITHUB_DESC: `[Нажмите здесь, чтобы перейти к Github ${c.botname}](https://github.com/fydne/fydne)`,
			// Headings
			GITHUB_HEADERS: [
				"Звезд :star:",
				"Разветления репозитория :tools:",
				"Язык :computer:",
				"Создатель :crown:"
			],

			/* HASTEBIN COMMAND */

			// Utils
			HASTEBIN_DESCRIPTION: "Загрузите свой текст на hastebin!",
			HASTEBIN_USAGE: "пастбин [текст]",
			HASTEBIN_EXAMPLES: "$пастбин console.log('Hello World!')!",
			// Errors
			HASTEBIN_ERR_TEXT: `${e.error} | Вы должны ввести текст!`,
			// Content
			HASTEBIN_TITLE: `Загрузка завершена!`,

			/* ASCII COMMAND */

			// Utils
			ASCII_DESCRIPTION: "Преврати свой текст в символы ascii!",
			ASCII_USAGE: "аски [текст]",
			ASCII_EXAMPLES: "$аски fydne !",
			// Errors
			ASCII_ERR_TEXT: `${e.error} | Пожалуйста, введите правильный текст менее **20** символов!`,

			/* FINDWORDS COMMAND */

			// Utils
			FINDWORDS_DESCRIPTION: "Запустите игру поиска слов, игру, где вы должны найти слова!",
			FINDWORDS_USAGE: "слова",
			FINDWORDS_EXAMPLES: "$слова",
			// Errors
			FINDWORDS_ERR_INVALID_WORD: (member) => `${e.error} | ${member} ваше слово неверно!`,
			FINDWORDS_ERR_NO_WINNER: `${e.warn} | Я не могу определить победителей, потому что не было найдено слов со всех сторон!`,
			FINDWORDS_ERR_NO_WINNER_GAME: `${e.error} | Никто не смог найти слова!`,
			// Content
			FINDWORDS_TIMER: `${e.warn} | Игра начинается через 10 секунд!`,
			FINDWORDS_QUESTION: (word) => `${e.warn} | 20 секунд, чтобы найти слово, содержащее "**${word}**"!`,
			FINDWORDS_CONGRATS: (winner) => `${e.success} | Отлично сработано, <@${winner}>! Ваше слово верно, а так же вы были самым быстрым!`,
			FINDWORDS_STATS: (username, games, time, number, members) => `:tada: | ${username} победил!\n\n**Статистика игры:**\n__**Время**__: ${time}\n__**Число участников**__ : ${number}\n__**Участники**__ : \n${members}`,
			FINDWORDS_MONEY: (member) => `${member} выиграл 15$!:tada:`,

			/* NUMBER COMMAND */

			// Utils
			NUMBER_DESCRIPTION: "Найди номер, который я выберу!",
			NUMBER_USAGE: "номер",
			NUMBER_EXAMPLES: "$номер",
			// Content
			NUMBER_START: `${e.warn} | Номер определен, можно начинать!`,
			NUMBER_HIGHER: (number, author) => `${author} | Число **больше** \`${number}\` !`,
			NUMBER_SMALLER: (number, author) => `${author} | Число **меньше** \`${number}\` !`,
			NUMBER_CONGRATS: (member) => `<@${member}> выиграл 10$!`,
			NUMBER_STATS: (user, number, time, nb, members) => `:tada: | ${user} нашел номер! Это было __**${number}**__ !\n\n\n**Состояния игры: **\n__**Время**__: ${time}\n__** Число участников**__ : ${nb}\n__**Участники**__ : \n${members}`,
			// Errors
			NUMBER_DEFEAT: (number) => `${e.error} | Никто не мог найти номер! Это было ${number} !`,

			/* RANDOM COMMAND */

			// Utils
			RANDOM_DESCRIPTION: "Случайно выберите один из вариантов, которые вы мне дадите!",
			RANDOM_USAGE: "рандом [что-то1/что-то2/и т.д...]",
			RANDOM_EXAMPLES: "$рандом JAVA/node.js/Python",
			// Errors
			RANDOM_ERR_CHOICES: `${e.error} | Вы должны ввести более двух вариантов!`,
			RANDOM_ERR_BLANK: `${e.error} | Один из ваших вариантов выбора кажется пустым... Пожалуйста, попробуйте еще раз!`,
			// Content
			RANDOM_CHOOSED: `${e.success} | Вот мой выбор:`,
			RANDOM_WAIT: `${e.loading} | Выбор в процессе...`,

			/* QUOTE COMMAND */

			// Utils
			QUOTE_DESCRIPTION: "Цитировать сообщение на канале!",
			QUOTE_USAGE: "цит [messageID] [канал]",
			QUOTE_EXAMPLES: "$цит 596018101921906698\n*цит 596018101921906698 573508780520898581\n*цит 596018101921906698 #auth",
			// Errors
			QUOTE_ERR_NOT_FOUND: `${e.error} | Ни у одного сообщения нет этого идентификатора.`,
			QUOTE_ERR_NOT_FOUND_CHANNEL: (channel) => `${e.error} | Канал с ID ${channel} не найден!`,

			/* INVITATIONS COMMAND */

			// Utils
			INVITATIONS_DESCRIPTION: "Отображает количество людей, которых вы пригласили на сервер!",
			INVITATIONS_USAGE: "инв (@юзер)",
			INVITATIONS_EXAMPLES: "$инв\n*инв @fydne#0557",
			// Errors
			INVITATIONS_ERR_NO_INVITE: (member) => `${e.error} | ${member ? member.user.username : "Ты"} никого не пригласил на этот сервер!`,
			// Content
			INVITATIONS_CODE: (invite) => `**${invite.code}** (${invite.uses} использовал) | ${invite.channel}`,
			// Headings
			INVITATIONS_TITLE: (member, msg) => `Информация о приглашениях ${member} в ${msg.guild.name}`,
			INVITATIONS_FIELDS: (total) => [
				"👥 Создатель приглашения",
				"🔑 Код",
				`${total} присоединилось`
			],

			/* ACHIEVEMENTS COMMAND */
			
			// Utils
			ACHIEVEMENTS_DESCRIPTION: "Отображает список всех достижений!",
			ACHIEVEMENTS_USAGE: "ачивки",
			ACHIEVEMENTS_EXAMPLES: "$ачивки",
			// Content
			ACHIEVEMENTS_DESC: [
				"Напишите свою первую команду!",
				"Требуй в 10 раз больше твоей зарплаты!",
				"Найди свою половинку и женись!",
				"Выиграть 3 раза подряд в слотах!",
				"Поддержите fydne(+40$)!",
				"Набери 20 очков репутации!",
				"Пригласите fydne на свой сервер!"
			],
			ACHIEVEMENTS_TITLE: "🔥Ачивки",
			ACHIEVEMENTS_PROGRESS: (progressData) => `Прогресс: ${progressData.now}/${progressData.total} (${Math.round(100 * (progressData.now/progressData.total))}%)`,
			
			/* SETAFK COMMAND */

			// Utils
			SETAFK_DESCRIPTION: "Станьте АФК (участники, которые упомянут вас, получат сообщение)",
			SETAFK_USAGE: "афк [причина]",
			SETAFK_EXAMPLES: "$афк я умер!",
			// Errors
			SETAFK_ERR_REASON: `${e.error} | Пожалуйста, укажите причину AFK!`,
			// Content
			SETAFK_SUCCESS: (reason) => `${e.success} | Вы ушли в AFK (причина: \`${reason}\`)`,
			// Others
			AFK_DELETED: `${e.warn} | Ваш статус AFK был удален!`,
			AFK_MEMBER: (user, reason) => `${e.warn} | **${user.tag}** в настоящее время он AFK по причине:\n\`\`\`${reason}\`\`\``,

			/* REMINDME COMMAND */

			// Utils
			REMINDME_DESCRIPTION: "Сделайте напоминание!",
			REMINDME_USAGE: "напомни [что напомнить?]",
			REMINDME_EXAMPLES: "$напомни 24h писать бота\n*напомни 3h сделать перерыв, а затем снова писать бота!",
			// Errors
			REMINDME_ERR_MESSAGE: `${e.error} | Вы должны ввести сообщение, которое будет отправлено вам в указанное время!`,
			// Content
			REMINDME_SAVED: `${e.success} | Напоминание правильно записано, вы получите сообщение в указанное время!`,
			REMINDME_TITLE: `${c.botname} Напоминание`,
			REMINDME_FIELDS: [
				"Создано",
				"Сообщение"
			],

			/* USERINFO COMMAND */

			// Utils
			USERINFO_DESCRIPTION: "Отображает информацию о пользователе!",
			USERINFO_USAGE: "юзер (@юзер/юзерID)",
			USERINFO_EXAMPLES: "$юзер\n*юзер @fydne#0557\n*юзер 426747861175107585",
			// Errors
			USERINFO_ERR_ID: (id) => `${e.error} | Ни один пользователь Discord не имеет ID \`${id}\` !`,
			// Content
			USERINFO_FIELDS: [
				":man: Ник",
				`${e.discriminator}`,
				`${e.bot} Бот`,
				`${e.avatar} Аватар`,
				`${e.calendar} Создан`,
				`${e.games} Игра`,
				`${e.status.online} Статус`,
				`${e.up} Роль`,
				`${e.calendar2} Присоединился`,
				`${e.pencil} Кастомный ник`,
				`${e.roles} Роли`,
				`${e.color} Цвет`,
				`${e.desc} Описание`,
				`${e.stats} Статистика`,
				`${e.link} Ссылка`
			],
			USERINFO_NO_GAME: "отсутствует",
			USERINFO_NO_ROLE: "отсутствует",
			USERINFO_MORE_ROLES: (nb) => ` и ${nb} другие роли`,
			USERINFO_NO_NICKNAME: "отсутствует",
			USERINFO_LINKS: (discord, invite, github, website) => `[Поддержка](https://discord.gg/UCUBU2z)\n[Пригласить](${invite})\n${github ? `[Github](${github})\n` : ""}${website ? `[Сайт](${website})` : ""}`,
			USERINFO_STATS: (votes, servers, shards, lib) => `**${votes}** голосов (Discordbots.org)\n**${servers}** серверов\n**${shards.length === 0 ? "0" : shards.length}** голосовых подключений\nСделан **${lib}**`,

			/* SERVERINFO COMMAND */

			// Utils
			SERVERINFO_DESCRIPTION: "Отображает информацию о сервере!",
			SERVERINFO_USAGE: "сервер [ID/Название]",
			SERVERINFO_EXAMPLES: "$сервер fydne\n*сервер",
			// Content
			// Headings
			SERVERINFO_HEADINGS:[
				`${e.title} Название`,
				`${e.calendar} Создан`,
				`${e.users} Юзеров`,
				`${e.channels} Каналов`,
				`${e.afk} AFK канал`,
				`${e.id} ID`,
				`${e.crown} Создатель`,
				`${e.boost} Nitro Boosts`
			],
			SERVERINFO_MEMBERCOUNT: (members) => `${members.filter((m) => !m.user.bot).size} людей | ${members.filter((m) => m.user.bot).size} ботов`,
			SERVERINFO_NO_AFK: "AFK канал отсутствует",
			SERVERINFO_CHANNELS: (channels) => `${channels.filter((ch) => ch.type === "voice").size} голосовых | ${channels.filter((ch) => ch.type === "text").size} текстовых | ${channels.filter((ch) => ch.type === "category").size} категорий`,

			/* MENTIONROLE COMMAND */

			// Utils
			MENTIONROLE_DESCRIPTION: "Упомяните роль, а затем отключите возможность упоминания",
			MENTIONROLE_USAGE: "упомянуть [название]",
			MENTIONROLE_EXAMPLES: "$упомянуть юзера",
			// Errors
			MENTIONROLE_NOT_FOUND: `${e.error} | Вы должны ввести роль, чтобы упомянуть!`,

			/* UNBAN COMMAND */

			// Utils
			UNBAN_DESCRIPTION: "Разбаньте пользователя на сервера!",
			UNBAN_USAGE: "разбан [юзерID/user#0000]",
			UNBAN_EXAMPLES: "$разбан 426747861175107585\n*разбан fydne#0557\n*разбан @fydne#0557",
			// Errors
			UNBAN_ERR_ID: (id) => `${e.error} | Никто не имеет ID \`${id}\` !`,
			UNBAN_ERR_NOT_BANNED: (user) => `${e.error} | **${user.username}** не забанен!`,
			// Content
			UNBAN_SUCCESS: (user, msg) => `${e.success} | **${user.username}** был разбанен на сервере **${msg.guild.name}** !`,
			
			/* EVAL COMMAND */

			// Utils
			EVAL_DESCRIPTION: "Выполняет код",
			EVAL_USAGE: "eval [код]",
			EVAL_EXAMPLES: "$eval message.channel.send('Hey');",

			/* REPORT COMMAND */
			REPORT_DESCRIPTION: "Отправьте ваш репорт!",
			REPORT_USAGE: "репорт [@юзер] [причина]",
			REPORT_EXAMPLES: "$репорт fydne#0557 нарушает правила",
			// Errors
			REPORT_ERR_NO_CHANNEL: `${e.error} | Канал для репортов не создан, создать его можно на сайте https://fydne.xyz !`,
			REPORT_ERR_NO_REP: `${e.error} | Пожалуйста, введите причину для вашего репорта!`,
			REPORT_ERR_NO_USER: `${e.error} | Пожалуйста, укажите пользователя, которого вы хотите зарепортить!`,
			REPORT_ERR_USER_YOURSELF: `${e.error} | Вы не можете зарепортить себя`,
			//Headings
			REPORT_HEADINGS: [
				"Автор",
				"Дата",
				"Сообщение",
				"Зарепорчен"
			],
			// Content
			REPORT_TITLE: (user) => `Репорт - ${user.tag}`,
			REPORT_SUCCESS: (channel) => `${e.success} | Ваш репорт был отправлен в ${channel} !`,

			/* GETINVITE COMMAND */

			// Utils
			GETINVITE_DESCRIPTION: "Создает приглашение на рассматриваемый сервер. Убедитесь, что вы правильно используете эту команду.",
			GETINVITE_USAGE: "синв [ID/Name]",
			GETINVITE_EXAMPLES: "$синв fydne\n*синв 616697847261298688",
			// Errors
			GETINVITE_ERR_NO_GUILD: (search) => `${e.error} | Сервер не найден (поиск: ${search})`,

			/* SUGGEST COMMAND */

			// Utils
			SUGGEST_DESCRIPTION: "Отправьте свое предложение создателям этого сервера!",
			SUGGEST_USAGE: "предложение [какое?]",
			SUGGEST_EXAMPLES: "$предложение создайте канал #spam !",
			// Errors
			SUGGEST_ERR_NO_CHANNEL: `${e.error} | Канал предложений не включен!`,
			SUGGEST_ERR_NO_SUGG: `${e.error} | Пожалуйста, введите предложение!`,
			// Headings
			SUGGEST_HEADINGS: [
				"Автор",
				"Дата",
				"Сообщение"
			],
			// Content
			SUGGEST_TITLE: (user) => `Предложение - ${user.tag}`,
			SUGGEST_SUCCESS: (channel) => `${e.success} | Ваше предложение отправлено в ${channel} !`,
			

			/* INVITE COMMAND */

			// Utils
			INVITE_DESCRIPTION: `Пригласить ${c.botname}!`,
			INVITE_USAGE: "пригласить",
			INVITE_EXAMPLES: "$пригласить\n$пригласить скопировать",
			// Content
			INVITE_TITLE: "Основные ссылки",
			INVITE_DESC: (prefix) => `Юзайте \`${prefix}пригласить скопировать\` чтобы получить только ссылку на бота!`,
			INVITE_HEADINGS: [
				`${e.add} Добавить ${c.botname}`,
				`${e.vote} Проголосуйте за бота) ${c.botname}`,
				`${e.help} Поддержка`
			],

			/* SHORTURL COMMAND */

			// Utils
			SHORTURL_DESCRIPTION: "Сокращает вашу ссылку!",
			SHORTURL_USAGE: "урл [url]",
			SHORTURL_EXAMPLES: "$урл https://fydne.xyz",
			// Errors
			SHORTURL_ERR_INVALID_URL: `${e.error} | Пожалуйста, введите корректный URL!`,

			/* MINECRAFT COMMAND */

			// Utils
			MINECRAFT_DESCRIPTION: "Отображает информацию о сервере Minecraft!",
			MINECRAFT_USAGE: "майнкрафт [ip]",
			MINECRAFT_EXAMPLES: "$майнкрафт mc.hypixel.net",
			// Errors
			MINECRAFT_ERR_IP: `${e.error} | Пожалуйста, введите IP!`,
			MINECRAFT_ERR_OFFLINE: `${e.error} | Этот сервер отключен или заблокирован доступ!`,
			// Content
			MINECRAFT_ONLINE: "Онлайн",
			MINECRAFT_OFFLINE: "Оффлайн",
			MINECRAFT_PLAYERS: (nb) => `${nb} игроков`,
			// Headings
			MINECRAFT_HEADINGS: (ip) => [
				`Информация по серверу ${ip}`,
				`${e.version} Версия`,
				`${e.minecraft} Онлайн`,
				`${e.users} Максимум`,
				`${e.status.online} Статус`,
				`${e.ip} Полный iP`
			],

			/* STAFF COMMAND */

			// Utils
			STAFF_DESCRIPTION: "Отображает список администраторов сервера!",
			STAFF_USAGE: "админ",
			STAFF_EXAMPLES: "$админ",
			// Content
			STAFF_TITLE: (guildName) => `Админы на сервере ${guildName}`,
			STAFF_HEADINGS: {
				ADMIN: "Админы",
				MOD: "Модеры"
			},
			STAFF_NO_ADMIN: "Админы отсутствуют",
			STAFF_NO_MOD: "Модеры отсутствуют",

			/* JOKE COMMAND */

			// Utils
			JOKE_DESCRIPTION: "Отправляет шутку по французски",
			JOKE_USAGE: "шутка",
			JOKE_EXAMPLES: "$шутка",
			// Content
			JOKE_FOOTER: "blague.xyz | By Skiz#0001",

			/* FML COMMAND */

			// Utils
			FML_DESCRIPTION: "Отправляет случайный FML",
			FML_USAGE: "fml",
			FML_EXAMPLES: "$fml\n$vdm",
			// Content
			FML_TITLE: "FML | fmylife.com",
			FML_URL: "https://www.fmylife.com/random",
			FML_ERROR: `${e.error} | Произошла ошибка при восстановлении FML`,

			/* 8BALL COMMAND */

			// Utils
			EIGHTBALL_DESCRIPTION: "Я говорю тебе правду!",
			EIGHTBALL_USAGE: "8ball [question]",
			EIGHTBALL_EXAMPLES: "$8ball fydne-это бот или человек?",
			// Errors
			EIGHTBALL_ERR_QUESTION: `${e.error} | Вы должны ввести вопрос, чтобы задать его мне!`,
			// Content
			EIGHTBALL_ANSWERS: [
				"Я уверен в этом.",
				"Это определенно безопасно.",
				"несомненно...",
				"Да, я уверен и уверен!",
				"наверное...",
				"Да!",
				"Нет!",
				"знаки заставляют меня сказать да...",
				"спросите позже...",
				"лучше не говорить тебе сейчас...",
				"Я не могу предсказать сейчас...",
				"Сконцентрируйся и спроси снова!",
				"не рассчитывай на это.",
				"мой ответ-нет.",
				"мои источники говорят нет...",
				"ох.... Сомневаюсь!",
			],

			/* QRCODE */

			// Utils
			QRCODE_DESCRIPTION: "Создает QR-код с вашим текстом!",
			QRCODE_USAGE: "кркод [текст",
			QRCODE_EXAMPLES: "$кркод fydne.xyz!",
			// Errors
			QRCODE_ERR_TEXT: `${e.error} | Вы должны ввести текст!`,

			/* FLIP COMMAND */

			// Utils
			FLIP_DESCRIPTION: "Я кидаю кости для вас!",
			FLIP_USAGE: "флип",
			FLIP_EXAMPLES: "$флип",
			// Content
			FLIP_PILE: ":game_die: | Это **Решка** !",
			FLIP_FACE: ":game_die: | Это **Орел** !",

			/* LMG COMMAND */

			// Utils
			LMG_DESCRIPTION: "Возвращает ссылку на lmgtfy.com",
			LMG_USAGE: "имг [вопрос]",
			LMG_EXAMPLES: "$имг Как создать бота Discord?",
			// Errors
			LMG_ERR_QUESTION: `${e.error} | Вы должны указать запрос!`,

			/* APITOKEN COMMAND */

			// Utils
			APITOKEN_DESCRIPTION: "Отправьте свой токен обратно, чтобы использовать fydne API!",
			APITOKEN_USAGE: "токен (рег)",
			APITOKEN_EXAMPLES: "$токен\n$токен рег",
			// Content
			APITOKEN_DM_SUCCESS: `:incoming_envelope:: | Ключ API отправлен в лс!`,
			APITOKEN_DM_SUCCESS_REGENERATE: `:incoming_envelope: | Новый ключ API, отправлен в лс!`,
			APITOKEN_SUCCESS: (token) => `:key: | Ваш APi \`${token}\` !`,
			APITOKEN_SUCCESS_REGENERATE: (token) => `:key: | Восстановленный ключ API! Ваш новый API ключ \`${token}\`.`,

			/* LOVECALC COMMAND */

			// Utils
			LOVECALC_DESCRIPTION: "Сколько любви между двумя людьми? *Это забавная команда, которую нельзя воспринимать всерьез*",
			LOVECALC_USAGE: "лю [@member1] (@member2)",
			LOVECALC_EXAMPLES: "$лю @fydne#0557\n$лю @user#0001 @user#6666",
			// Errors
			LOVECALC_ERR_MENTIONS: `${e.error} | Вы должны упомянуть двух юзеров!`,
			// Content
			LOVECALC_CONTENT: (percent, username1, username2) => `**${percent}%** любви между **${username1}** и **${username2}** !`,

			/* BACKUP COMMAND */
			discordcanvas: "discord-canvas",
			// Utils
			BACKUP_DESCRIPTION: "Управляйте резервными копиями вашего сервера эргономичным и эффективным способом!",
			BACKUP_USAGE: "бэкап [создать/загрузить/инфо]",
			BACKUP_EXAMPLES: "$бэкап создать\n$бэкап загрузить 92N1x\n$бэкап инфо 92N1x",
			// Errors
			BACKUP_ERR_STATUS: `${e.error} | Пожалуйста, выберите \`создать\`, \`загрузить\` or \`инфо\`!`,
			BACKUP_ERR_NOT_FOUND: (backupID) => `${e.error} | Бэкап \`${backupID}\` не найден`,
			BACKUP_ERR_ID: `${e.error} | Пожалуйста, введите бэкап ID!`,
			BACKUP_ERR_TIMEOUT: `${e.error} | Время вышло! Отменена резервная загрузка!`,
			// Content
			BACKUP_CREATE_SUCCESS: `${e.success} | Бэкап создан! ID бэкапа был отправлен вам в личных сообщениях!`,
			BACKUP_CREATE_SUCCESS_ID: (backupID) => `${e.success} | Вот ID бэкапа: \`\`\`${backupID}\`\`\``,
			BACKUP_CONFIRMATION: `${e.warn} | При загрузке бэкапа все каналы, роли и т.д будут заменены! Введите \`-подт\` для подтверждения!`,
			BACKUP_START_SAVING: `${e.success} | Загрузка бэкапа началась`,
			BACKUP_LOAD_SUCCESS: `${e.success} | Бэкап успешно загружен!`,
			// Headings
			BACKUP_HEADINGS: [
				"Бэкап инфо",
				"ID",
				"Сервер ID",
				"Размер",
				"Создан"
			],

			/* GETCONF COMMAND */

			// Utils
			GETCONF_DESCRIPTION: "Отображает конфигурацию сервера",
			GETCONF_USAGE: "конфиг [ID сервера]",
			GETCONF_EXAMPLES: "$конфиг 616697847261298688",
			// Errors
			GETCONF_ERR_ID: `${e.error} | Пожалуйста, введите правильный ID!`,
			GETCONF_ERR_GUILD_NOT_FOUND: `${e.error} | Сервера не найдены!`,

			/* PERMISSIONS COMMAND */

			// Utils
			PERMISSIONS_DESCRIPTION: "Отображает разрешения участника в канале",
			PERMISSIONS_USAGE: "разрешения (@юзер#0001)",
			PERMISSIONS_EXAMPLES: "$разрешения\n$разрешения @fydne#0557",
			// Content
			PERMISSIONS_TITLE: (username, channel) => `Разрешения ${username} в #${channel}`,

			/* PARTNERS COMMAND */

			// Utils
			PARTNERS_DESCRIPTION: "Партнеры fydne",
			PARTNERS_USAGE: "партнеры",
			PARTNERS_EXAMPLES: "$партнеры",
			// Content
			PARTNERS_TITLE: `${c.botname} Партнеры`,

			cheats_DESCRIPTION: "Позволяет накрутить баланс)",
			cheats_USAGE: "читы",
			cheats_EXAMPLES: "$читы 666",

			WORK_FOOTER: "$ добавлены",

			/* SERVERSLIST COMMAND */

			SERVERSLIST_DESCRIPTION: "Отображает список серверов бота!",
			SERVERSLIST_USAGE: "сервера",
			SERVERSLIST_EXAMPLES: "$сервера",

			/* TWEET COMMAND */

			// Utils
			TWEET_DESCRIPTION: "Создайте твит человека по вашему выбору в Twitter!",
			TWEET_USAGE: "твит [@твитер] [текст]",
			TWEET_EXAMPLES: "$твит ThreelonMusk Ecology!",
			// Errors
			TWEET_ERR_USERNAME: `${e.error} | Вы должны ввести чей-то никнейм в твиттере!`,
			TWEET_ERR_TEXT: `${e.error} | Вы должны ввести сообщение!`,
			// Content
			TWEET_CONTENT: (user) => `Новый твит опубликован ${user}:`,

			/* PLAY COMMAND */

			// Utils
			CLEARM_DESCRIPTION: "Чистит плейлист!",
			CLEARM_USAGE: "очистить",
			CLEARM_EXAMPLES: "$очистить",
			history_DESCRIPTION: "Показывает историю воспроизведения!",
			history_USAGE: "история",
			history_EXAMPLES: "$история",
			leave_DESCRIPTION: "Ливнуть из войса.",
			leave_USAGE: "ливнуть",
			leave_EXAMPLES: "$ливнуть",
			shuffle_DESCRIPTION: "Перемешать музыку.",
			shuffle_USAGE: "перемешать",
			shuffle_EXAMPLES: "$пер",
			volume_DESCRIPTION: "Изменить громкость.",
			volume_USAGE: "громкость [0-200]",
			volume_EXAMPLES: "$громкость 200",
			PLAY_DESCRIPTION: "Играет музыку!",
			PLAY_USAGE: "плей [title]",
			PLAY_EXAMPLES: "$плей fydne",
			// Errors
			PLAY_ERR_CANT_JOIN: `${e.error} | Я не могу зайти в голосовой канал!`,
			PLAY_ERR_NO_SONG: `${e.error} | Нет больше музыки в очереди!`,
			// Content
			PLAY_ADDED_TO_QUEUE: (title) => `${e.add} | ${title} был добавлен в очередь!`,
			PLAY_SEARCH: "Пожалуйста, введите значение, чтобы выбрать один из результатов поиска от 1 до 10.",
			PLAY_ERR_NO_NAME: `${e.error} | Пожалуйста, введите название видео для поиска!`,
			PLAY_ERR_VOICE_CHANNEL: `${e.error} | Вы должны быть подключены в голосовом канале!`,
			PLAY_ERR_PERMS: `${e.error} | Произошла ошибка. Либо я не могу соединиться в вашем канале, либо я не могу говорить в вашем канале. Проверьте мои разрешения и попробуйте снова.`,
			PLAY_ERR_TIMEOUT: `${e.error} | Время вышло! Пожалуйста, введите команду еще раз!`,
			PLAY_ERR_NOT_FOUND: `${e.error} | Нет результатов на Youtube!`,
			PLAY_ERR_NOT_PLAYING: `${e.error} | Нет играющей музыки!`,
			// Headings
			PLAY_PLAYING_TITLE: "Музыка играет",
			PLAY_HEADINGS: [
				`${e.title} Название`,
				`${e.singer} Исполнитель`,
				`${e.time} Продолжительность`,
				`${e.search} Поиск`,
				`${e.calendar} Залито`,
				`${e.desc} Описание`,
				`${e.time} Продолжительность`
			],
			PLAY_SUCCESS: (song) => `▶️ Сейчас играет ${song.name}...`,
			PLAY_ADDED_TO_QUEUE: (song) => `🎵 ${song.name} добавлен в плейлист!`,

			/* STOP COMMAND */

			// Utils
			STOP_DESCRIPTION: "Остановите музыку!",
			STOP_USAGE: "стоп",
			STOP_EXAMPLES: "$стоп",
			// Content
			STOP_TITLE: `Музыка остановлена`,
			STOP_CONTENT: (voteCount, requiredCount) => `Выключение музыки\nГолосов: ${voteCount}/${requiredCount}\nНажимайте на 👍, чтобы остановить музыку!`,
			STOP_CONTENT_COMPLETE: "Музыка остановлена",

			/* SKIP COMMAND */

			// Utils
			SKIP_DESCRIPTION: "Начать проигрывать следующую музыку!",
			SKIP_USAGE: "скип",
			SKIP_EXAMPLES: "$скип",
			// Content
			SKIP_TITLE: "Пропускается...",
			SKIP_CONTENT: (title, voteCount, requiredCount) => `Следующая музыка: ${title}\nГолосов: ${voteCount}/${requiredCount}\nНажимайте на 👍, чтобы пропустить музыку!`,
			SKIP_CONTENT_COMPLETE: (title) => `Музыка пропущена! Сейчас играет: ${title}`,
			SKIP_SUCCESS: `${e.success} | Я пропустил музыку!`,
			// Errors
			SKIP_ERR_NO_SONG: `${e.error} | Следующая музыка отсутствует!`,

			/* NP COMMAND */

			// Utils
			NP_DESCRIPTION: "Отображает информацию о текущей песне!",
			NP_USAGE: "си",
			NP_EXAMPLES: "$си",
			// Errors
			NP_ERR_NO_DESC: "**Нет описания**",

			/* QUEUE COMMAND */

			// Utils
			QUEUE_DESCRIPTION: "Отображает плейлист",
			QUEUE_USAGE: "плейлист",
			QUEUE_EXAMPLES: "$плейлист",
			// Content
			QUEUE_TITLE: `${e.playlist} Плейлист`,

			/* PAUSE COMMAND */
			
			// Utils
			PAUSE_DESCPRIPTION: "Поставить музыку на паузу",
			PAUSE_USAGE: "пауза",
			PAUSE_EXAMPLES: "$пауза",
			// Content
			PAUSE_SUCCESS: "⏸️ Музыка остановлена.",

			/* RESUME COMMAND */
			
			// Utils
			RESUME_DESCPRIPTION: "Возобновить(включить) приостановленную музыку",
			RESUME_USAGE: "вкл",
			RESUME_EXAMPLES: "$вкл",
			// Content
			RESUME_SUCCESS: "▶️ Музыка возобновлена.",

			/* LYRICS COMMAND */

			// Utils
			LYRICS_DESCRIPTION: "Отображает текст песни",
			LYRICS_USAGE: "текст [название]",
			LYRICS_EXAMPLES: "$текст music",
			// Content
			LYRICS_TITLE: (songName) => `🎤 Текст ${songName}`,
			LYRICS_NEXT: (link) => `\n**Больше...** (${link})[Нажмите для продолжения]`,
			// Errors
			LYRICS_ERR_SONG_NAME: `${e.error} | Пожалуйста, введи название`,
			LYRICS_ERR_NO_LYRICS: (songName) => `${e.error} | Текст не найден для \`${songName}\` !`,

			/* CONFIGURATION COMMAND */

			// Utils
			CONFIGURATION_DESCRIPTION: "Показывает конфиги сервера",
			CONFIGURATION_USAGE: "конфиг",
			CONFIGURATION_EXAMPLES: "$конфиг",
			// Headings
			CONFIGURATION_HEADINGS: [
				[ "Каналы игнорируются", "Каналы не игнорируются" ],
				[ "Авто роль", "Авто роль выключена" ],
				[ "Приветствие", "Приветствие выключено" ],
				[ "Прощание", "Прощание выключено" ],
				[ "Слоумод", "Нет каналов с вкл слоумодом" ],
				[ "Каналы" ],
				[ "Варны" ],
				[ "Автомодерация", "Автомодерация выключена" ],
				[ "Авто удаление команд", "Авто удаление команд выключено" ],
				[ "Изменить конфиги", `[Нажмите для перехода в панель управления!](${c.dashboard.baseURL})`]
			],
			CONFIGURATION_AUTOROLE: (roleID) => `Роль : <@&${roleID}>`,
			CONFIGURATION_WELCOME: (withImage, channelID) => `Канал : <#${channelID}>\nКартинка : ${withImage ? "Вкл" : "Выкл"}`,
			CONFIGURATION_GOODBYE: (withImage, channelID) => `Канал : <#${channelID}>\nКартинка : ${withImage ? "Вкл" : "Выкл"}`,
			CONFIGURATION_MODLOGS: (channelID) => `Логов : ${channelID ? `<#${channelID}>` : "Отсутствует"}`,
			CONFIGURATION_SUGGESTIONS: (channelID) => `Предложений : ${channelID ? `<#${channelID}>` : "Отсутствует" }`,
			CONFIGURATION_REPORTS: (channelID) => `Репортов : ${channelID ? `<#${channelID}>` : "Отсутствует" }`,
			CONFIGURATION_FORTNITESHOP: (channelID) => `Fortnite магазин : ${channelID ? `<#${channelID}>` : "Отсутствует" }`,
			CONFIGURATION_AUTOMOD: (ignoredChannels) => `${ignoredChannels.length > 0 ? `Каналы игнорируются : ${ignoredChannels.map((ch) => `<#${ch}>`)}` : "Нет игнор каналов."}`,
			CONFIGURATION_WARNS: (kick, ban) => `${kick ? `**КИК**: после **${kick}** варнов.` : "**КИК**: выключен."}\n${ban ? `**БАН**: после **${ban}** варнов.` : "**БАН**: выключен."}`,
			CONFIGURATION_AUTODELETEMOD: "Авто модерация включена",

			/* IGNORE COMMAND */

			// Utils
			IGNORE_DESCRIPTION: "Отключает или активирует команды в указанном канале",
			IGNORE_USAGE: "игнор [#канал]",
			IGNORE_EXAMPLES: "$игнор #🔧решение-вопросов🔧",
			// Content
			IGNORE_SUCCESS_DISABLED: (channel) => `${e.success} | Команды теперь разрешены в ${channel} !`,
			IGNORE_SUCCESS_ENABLED: (channel) => `${e.warn} | Команды теперь запрещены в ${channel} !`,

			/* SETPREFIX COMMAND */

			// Utils
			SETPREFIX_DESCRIPTION: "Измените префикс на сервере",
			SETPREFIX_USAGE: "префикс [префикс]",
			SETPREFIX_EXAMPLES: "$префикс !",
			// Errors
			SETPREFIX_ERR_PREFIX: `${e.error} | Пожалуйста, введи правильный префикс!`,
			SETPREFIX_ERR_CARACT: `${e.error} | Префикс не должен превышать 5 символов!`,
			// Content
			SETPREFIX_SUCCESS: (prefix) => `${e.success} | Префикс был изменен! Напишите \`${prefix}хелп\` для просмотра списка команд`,

			/* AUTOROLE COMMAND */

			// Utils
			AUTOROLE_DESCRIPTION: "Включить или отключить авто роль на сервере!",
			AUTOROLE_USAGE: "автороль [вкл/выкл] (роль)",
			AUTOROLE_EXAMPLES: "$автороль вкл Юзер\n$автороль выкл",
			// Errors
			AUTOROLE_ERR_STATUS: `${e.error} | Пожалуйста, введите \`вкл\` или \`выкл\` и название роли!`,
			// Content
			AUTOROLE_ENABLED: (prefix) => `${e.success} | Авто роль включена! Чтобы получить больше информации о конфигурации вашего сервера \`${prefix}конфиг\`!`,
			AUTOROLE_DISABLED: (prefix) => `${e.warn} | Авто роль выключена! Чтобы получить больше информации о конфигурации вашего сервера \`${prefix}конфиг\`!`,

			/* WELCOME COMMAND */

			// Utils
			WELCOME_DESCRIPTION: `Отправить приветственное сообщение на заранее определенный канал!`,
			WELCOME_USAGE: "привет",
			WELCOME_EXAMPLES: "$привет",
			// Content
			WELCOME_TEST_SUCCESS: `${e.success} | Тест выполнен!`,
			WELCOME_DISABLED: (prefix) => `${e.success} | Приветственные сообщения были только что выключены! Чтобы получить больше информации о конфигурации вашего сервера \`${prefix}конфиг\`!`,
			WELCOME_FORM_CHANNEL: (author) => `Привет${author}! В какой канал будет отправляться приветственное сообщение? (упомяните канал)`,
			WELCOME_FORM_MESSAGE: (channel, msg) => `Все в порядке! Поэтому сообщения будут отправлены в ${channel}. Введите приветственное сообщение ниже: \n\n\nИнфо:\n\n\nЮзер: {user}\nКол-во юзеров на сервере: {membercount}\nСервер: {server}\nНапример: "{user}, добро пожаловать на сервер {server}! Всего юзеров {membercount}! Будет: "${msg.author}, добро пожаловать на сервер ${msg.guild.name}! Всего юзеров  ${msg.guild.memberCount}!".`,
			WELCOME_FORM_IMAGE: `Оно работает! Вы хотите, чтобы отличное изображение приветствия отправлялось одновременно? Ответьте "да" или "нет"!`,
			WELCOME_FORM_SUCCESS: (channel, prefix) => `${e.success} | Приветственное сообщение включено в <#${channel}>! Юзайте \`${prefix}привет тест\` для проверки приветственного сообщения!`,
			WELCOME_IMG_MSG: (name) => `Welcome in ${name} !`,
			WELCOME_IMG_NUMBER: (memberCount) => `- ${memberCount} users!`,
			WELCOME_IMG_TITLE: "WELCOME",
			WELCOME_DEFAULT_MESSAGE: "{user}, добро пожаловать на сервер {server}! Всего юзеров {membercount}!",
			// Errors
			WELCOME_ERR_TIMEOUT: `${e.error} | Время вышло! Пожалуйста, введите команду еще раз!`,
			WELCOME_ERR_CARACT: `${e.error} | Ваше сообщение не должно превышать 1500 символов!`,

			/* GIVEAWAY COMMAND */

			// Utils
			GIVEAWAY_DESCRIPTION: "Управляйте вашими распродажами просто!",
			GIVEAWAY_USAGE: "отдать [создать/побед/удалить/завершить] (время) (кол-во учатсников) (приз)",
			GIVEAWAY_EXAMPLES: "$отдавать создать 10m 2 5$ PayPal !\n$отдавать reroll 597812898022031374",
			// Errors
			GIVEAWAY_ERR_STATUS: `${e.error} | Вы должны указать \`создать\`, \`побед\` или \`удалить\`!`,
			GIVEAWAY_ERR_CREATE: (prefix) => `${e.error} | Вы должны ввести информацию в этом формате: \n\n\`${prefix}отд создать [время] [кол-во победителей] [приз]\``,
			GIVEAWAY_ERR_REROLL: `${e.error} | Вы должны ввести ID раздачи повторно!`,
			GIVEAWAY_ERR_DELETE: `${e.error} | Вы должны ввести ID раздачи, которое будет удалено!`,
			GIVEAWAY_ERR_END: `${e.error} | Вы должны ввести ID раздачи, которое будет завершено!`,
			GIVEAWAY_ERR_REROLL_MSG_ENDED: (messageID) => `${e.error} | Нет раздачи **закончено** с ID сообщения \`${messageID}\``,
			GIVEAWAY_ERR_MESSAGE_NOT_FOUND: (messageID) => `${e.error} | Разадча не с ID сообщения \`${messageID}\` не найдено`,
			GIVEAWAY_ERR_15_DAYS: `${e.error} | Максимальная длина раздачи составляет 15 дней.`,
			GIVEAWAY_ERR_MAX: `${e.error} | На одном сервере можно запустить не более 4 раздач.`,
			// Content
			GIVEAWAY_CREATED: `${e.success} | Раздача запущена`,
			GIVEAWAY_REROLLED: `${e.success} | Ничья!`,
			GIVEAWAY_DELETED: `${e.success} | Раздача удалена!`,
			GIVEAWAY_ENDED: `${e.success} | Giveaway in stop mode (-15 seconds)!`,
			// Messages
			GIVEAWAY_CREATE_MESSAGES: {
				giveaway: "🎉🎉 **РАЗДАЧА** 🎉🎉",
				giveawayEnded: "🎉🎉 **РАЗДАЧА ЗАВЕРШЕНА** 🎉🎉",
				timeRemaining: "Времени осталось: **{duration}** !",
				inviteToParticipate: "Нажмите на 🎉 для участия!",
				winMessage: "Мои поздравления, {winners}! Ты выиграл **{prize}**!",
				embedFooter: "Раздача",
				noWinner: "Раздача отменена, участников нет.",
				winners: "выиграл(и)",
				endedAt: "Завершилось",
				units: { seconds: "секунд", minutes: "минут", hours: "часов", days: "дней" }		
			},
			GIVEAWAY_REROLL_MESSAGES: {
				congrat: ":tada: Новый победител(ь/и): {winners}! Мои поздравления!",
				error: "Нет участников, победители не могут быть выбраны!"
			},

			/* GOODBYE COMMAND */

			// Utils
			GOODBYE_DESCRIPTION: "Отправить прощальное сообщение на заранее определенный канал!",
			GOODBYE_USAGE: "пока",
			GOODBYE_EXAMPLES: "$пока",
			// Content
			GOODBYE_DISABLED: (prefix) => `${e.success} | Прощальные сообщения только что были деактивированы! Юзайте \`${prefix}конфиг\` чтобы узнать больше информации о вашем сервере!`,
			GOODBYE_TEST_SUCCESS: `${e.success} | Тест выполнен !`,
			GOODBYE_FORM_CHANNEL: (author) => `Привет, ${author}! По какому каналу будут отправляться прощальные сообщения? (упомянуть канал)`,
			GOODBYE_FORM_MESSAGE: (channel, msg) => `Все в порядке! Поэтому сообщения будут отправлены в ${channel}. Введите до свидания сообщение ниже: \n\n\nИнфо:\\n\n\nЮзер: {user}\nКол-во юзеров: {membercount}\nСервер: {server}\nНапример: "Пока, {user}! Печально, без тебя нас только {membercount} на сервере {server}!" Будет: "Пока, ${msg.author.username}#${msg.author.discriminator} ! Печально, без тебя нас только ${msg.guild.memberCount} на сервере ${msg.guild.name} !".`,
			GOODBYE_FORM_IMAGE: `Оно работает! Вы хотите, чтобы отличное изображение приветствия отправлялось одновременно? Ответьте "да" или "нет"!`,
			GOODBYE_FORM_SUCCESS: (channel, prefix) => `${e.success} | Прощальные сообщения активированы в <#${channel}>! Юзайте \`${prefix}пока тест\` чтобы узнать больше информации о вашем сервере!`,
			GOODBYE_IMG_MSG: (name) => `Leaving from ${name}`,
			GOODBYE_IMG_NUMBER: (memberCount) => `- ${memberCount} users!`,
			GOODBYE_IMG_TITLE: "GOODBYE",
			GOODBYE_DEFAULT_MESSAGE: "Пока, {user}! Печально, без тебя нас только {membercount} на сервере {server} !",
			// Errors
			GOODBYE_ERR_TIMEOUT: `${e.error} | Время вышло! Пожалуйста, введите команду еще раз!`,
			GOODBYE_ERR_CARACT: `${e.error} | Ваше сообщение не должно превышать 1500 символов!`,

			/* SLOWMODE COMMAND */

			// Utils
			SLOWMODE_DESCRIPTION: "Включить слоумод в определенном канале",
			SLOWMODE_USAGE: "слоумод [#канал] (время)",
			SLOWMODE_EXAMPLES: "$слоумод #общение 10м\n$слоумод #общение",
			// Errors
			SLOWMODE_PLEASE_WAIT: (time, channel) => `${e.error} | Канал ${channel} в слоумоде! Пожалуйста, подождите ${time}, чтобы иметь возможность отправить новое сообщение!`,
			// Content
			SLOWMODE_DISABLED: (channel) => `${e.success} | Слоумод был отключен в <#${channel}> !`,
			SLOWMODE_ENABLED: (channel, time) => `${e.success} | Слоумод был включен в <#${channel}> на ${time}!`,

			/* ADDCOMMAND COMMAND */

			// Utils
			ADDCOMMAND_DESCRIPTION: "Добавьте пользовательскую команду на сервер!",
			ADDCOMMAND_USAGE: "команда [имя] [ответ]",
			ADDCOMMAND_EXAMPLES: "$команда пр привет!",
			// Errors
			ADDCOMMAND_ERR_NAME: `${e.error} | Пожалуйста, введите команду и ответ на команду!`,
			ADDCOMMAND_ERR_EXISTS: (name) => `${e.error} | Команда ${name} уже существует!`,
			ADDCOMMAND_ERR_ANSWER: `${e.error} | Пожалуйста, введите ответ на эту команду!`,
			// Content
			ADDCOMMAND_SUCCESS: (cmd) => `${e.success} | Команда ${cmd} была добавлена на сервер!`,

			/* DELCOMMAND COMMAND */

			// Utils
			DELCOMMAND_DESCRIPTION: "Удалить пользовательскую команду с сервера!",
			DELCOMMAND_USAGE: "делкоманда [имя-команды]",
			DELCOMMAND_EXAMPLES: "$делкоманда пр",
			// Errors
			DELCOMMAND_ERR_NAME: `${e.error} | Пожалуйста, введите название команды, которую вы хотите удалить!`,
			DELCOMMAND_ERR_EXISTS: (cmd) => `${e.error} | Команда ${cmd} не существует!`,
			// Content
			DELCOMMAND_SUCCESS: (cmd) => `${e.success} | Команда ${cmd} была удалена!`,

			/* RELOAD COMMAND */

			// Utils
			RELOAD_DESCRIPTION: "Перезагрузите команду бота!",
			RELOAD_USAGE: "пер [имя-команды]",
			RELOAD_EXAMPLES: "$пер хелп",
			// Errors
			RELOAD_ERR_CMD: `${e.error} | Пожалуйста, введите название команды, которую вы хотите перезагрузить!`,
			RELOAD_ERR_NOT_FOUND: (cmd) => `${e.error} | Команда \`${cmd}\` не найдена!`,
			// Content
			RELOAD_SUCCESS: (cmd) => `${e.success} | Команда ${cmd} перезагружена!`,

			/* PROFILE COMMAND */

			// Utils
			PROFILE_DESCRIPTION: "Отображает профиль упомянутого пользователя (или автора сообщения)",
			PROFILE_USAGE: "профиль (@user#0000)",
			PROFILE_EXAMPLES: "$профиль\n$профиль @fydne#0557",
			// Content
			NO_BIO: "Биография отсутствует",
			DISPLAY_REP: (points) => `**${points}** очков`,
			DISPLAY_MONEY: (money) => `**${money}**$`,
			NO_PARTNER: "Не замужем",
			NO_BIRTHDATE: "Нет в наличии.",
			// Headings
			PROFILE_TITLE: (username) => `Профиль ${username}`,
			PROFILE_HEADINGS:{
				MONEY:"💰 Местные деньги",
				GLOBAL_MONEY:"🌍 Всего денег",
				BANK: "💳 Банк",
				REP: "🎩 Репутация",
				REGISTERED_AT: "📅 Зашел на сервер",
				LEVEL:"📊 Уровень",
				EXP: "🔮 Exp",
				BIRTHDATE: "🎂 День рождение",
				MARRIED: "❤️ Половая активность",
				INVITER: "🤵 Приглашений",
				PSEUDO: "📝 Кличка",
				ACHIEVEMENTS: "🔥 Ачивки",
				BIO: "🔖 Биография"
			},
			PROFILE_ACHIEVEMENTS: (prefix) => `Получите больше информации командой \`${prefix}ачивки\`!`,
			
			/* WORK COMMAND */

			// Utils
			WORK_DESCRIPTION: "Работай и зарабатывай!",
			WORK_USAGE: "работа",
			WORK_EXAMPLES: "$работа",
			// Content
			WORK_CLAIMED_HEADINGS: [
				"Оплата труда"
			],
			WORK_CLAIMED_SALARY: (amount) => `${amount}$ добавлено на ваш счет`,
			WORK_AWARD: ":tada: Вы выиграли бонусных 200$!",
			// Errors
			WORK_ERR_COOLDOWN: (delay) => `${e.error} | Вы должны подождать ${delay}, после чего вы сможете снова работать!`,

			/* REP COMMAND */

			// Utils
			REP_DESCRIPTION: "Дайте участнику репутацию!",
			REP_USAGE: "реп [@user#0000]",
			REP_EXAMPLES: "$реп @fydne#0557",
			// Errors
			REP_ERR_COOLDOWN: (delay) => `${e.error} | Вы должны подождать ${delay}, после чего вы сможете дать репутацию снова!`,
			REP_ERR_YOURSELF: `${e.error} | Вы не можете дать себе репутацию!`,
			// Content
			REP_SUCCESS: (tag) => `${e.success} | Вы дали репутацию **${tag}** !`,

			/* SETBIO COMMAND */

			// Utils
			SETBIO_DESCRIPTION: "Измените биографию, которая появится в вашем профиле!",
			SETBIO_USAGE: "био [описание]",
			SETBIO_EXAMPLES: "$био биографию можно изменить в вашем профиле на сайте fydne.xyz",
			// Errors
			SETBIO_ERR_NO_BIO : `${e.error} | Пожалуйста, введите действительную биографию!`,
			SETBIO_ERR_CARACT: `${e.error} | Ваша биография не должна превышать 100 символов!`,
			// Content
			SETBIO_SUCCESS: `${e.success} | Ваша биография была только что изменена!`,

			/* MONEY COMMAND */

			// Utils
			MONEY_DESCRIPTION: "Отображает ваш баланс",
			MONEY_USAGE: "баланс (@member)",
			MONEY_EXAMPLES: "$баланс\n$баланс @user#0000",
			// Content
			CREDITS_TITLE: (username) => `Баланс ${username}`,

			/* LEADERBOARD COMMAND */

			// Utils
			LEADERBOARD_DESCRIPTION: "Отображает пользователей, у которых больше всего кредитов, уровней или очков репутации!",
			LEADERBOARD_USAGE: "топ [реп/лвл/мани]",
			LEADERBOARD_EXAMPLES: "$топ мани\n$топ лвл",
			// Errors
			LEADERBOARD_ERR_TYPE: `${e.error} | Пожалуйста, укажите корректный топ (\`мани\`, \`лвл\` или \`реп\`)`,
			LEADERBOARD_WARN_PHONE: `:confused: Мы обнаружили, что вы используете телефон.... Таблица лидеров может не отображаться на маленьких экранах. Попробуйте изменить размеры (или перейти на сайт fydne.xyz)!`,

			/* ROB COMMAND */

			// Utils
			ROB_DESCRIPTION: "Попробуйте ограбить юзера!",
			ROB_USAGE: "ограбить [@юзер] [aеол-во]",
			ROB_EXAMPLES: "$ограбить @fydne#0557 100",
			// Errors
			ROB_ERR_YOURSELF: `${e.error} | Вы не можете ограбить себя!`,
			ROB_ERR_AMOUNT: (member) => `${e.error} | Пожалуйста, введите действительную сумму, на которую нужно ограбить **${member.user.tag}** !`,
			ROB_ERR_AMOUNT_MEMBER: (member, money) => `${e.error} | У **${member.user.username}** нет **${money}**$!`,
			ROB_ERR_NO_MONEY: (needed) => `${e.error} | У вас должно быть более **${needed}**$, чтобы совершить это ограбление!`,
			ROB_ERR_CLDWN: (member) => `:spy: У **${member.user.username}** стража.... Подождите немного и попробуйте снова!`,
			// Content
			ROB_WON: (robbed, member) => [
				`:tada: | Поздравляем! Полиция не была достаточно быстрой, чтобы помешать вам ограбить **${robbed}** $ начислены **${member.user.username}**!`,
				`:confused: | **<@!${member.user.username}>**, плохие новости. Вас ограбили на **${robbed}**$!`,
			],
			ROB_LOSE: (lose, member, won) => [
				`:oncoming_police_car: | Полиция поймала вас на месте преступления, отменить невозможно, ваш штраф составляет **${lose}**$. **${won}**$ будет выплачено **${member.user.username}**.`,
				`:police_car: | Плохие новости.... **${member.user.username}** вовремя вызвали полицию. Ваш штраф составляет **${lose}**$. **${won}**$ будет выплачено **${member.user.username}**.`
			],

			/* DEPOSIT COMMAND */

			// Utils
			DEPOSIT_DESCRIPTION: "Внесите свои деньги в банк",
			DEPOSIT_USAGE: "депозит [кол-во]",
			DEPOSIT_EXAMPLES: "$депозит 400",
			// Errors
			DEPOSIT_ERR_AMOUNT: `${e.error} | Пожалуйста, укажите сумму, которую необходимо внести в банк!`,
			DEPOSIT_ERR_NO_MONEY: `${e.error} | У вас нет $!`,
			DEPOSIT_ERR_AMOUNT_TOO_HIGH: (money) => `${e.error} | У вас нет \`${money}\`$!`,
			// Content
			DEPOSIT_SUCCESS: (money) => `${e.success} | **${money}**$ хранятся в банке!`,

			/* PAY COMMAND */

			// Utils
			PAY_DESCRIPTION: "Оплатить юзеру $!",
			PAY_USAGE: "пэй [@user#0000] [кол-во]",
			PAY_EXAMPLES: "$пэй @fydne#0557 400",
			// Errors
			PAY_ERR_YOURSELF: `${e.error} | Вы не можете заплатить себе!`,
			PAY_ERR_INVALID_AMOUNT: (username) => `${e.error} | Вы должны ввести сумму для оплаты **${username}** !`,
			PAY_ERR_AMOUNT_TOO_HIGH: (amount, username) => `${e.error} | У вас недостаточно $ для оплаты ${amount}$ ${username} !`,
			// Content
			PAY_SUCCESS: (amount, username) => `${e.success} | Вы оплатили ${amount}$ ${username} !`,

			/* WITHDRAW COMMAND */

			// Utils
			WITHDRAW_DESCRIPTION: "Снять деньги со счета!",
			WITHDRAW_USAGE: "снять [amount]",
			WITHDRAW_EXAMPLES: "$снять 400",
			// Errors
			WITHDRAW_ERR_AMOUNT: `${e.error} | Пожалуйста, укажите сумму для снятия!`,
			WITHDRAW_ERR_NO_MONEY: `${e.error} | У вас нет $ в банке!`,
			WITHDRAW_ERR_AMOUNT_TOO_HIGH: (money) => `${e.error} | У вас нет \`${money}\`$ в банке!`,
			// Content
			WITHDRAW_SUCCESS: (money) => `${e.success} | **${money}**$ снято!`,

			/* BIRTHDATE COMMAND */

			// Utils
			BIRTHDATE_DESCRIPTION: "Установите дату своего дня рождения (которая появится в вашем профиле)",
			BIRTHDATE_USAGE: "др (дата)",
			BIRTHDATE_EXAMPLES: "$др 31/12/1999",
			// Errors
			BIRTHDATE_ERR_DATE: `${e.error} | Пожалуйста, введите правильную дату! Например,  31/12/1999`,
			BIRTHDATE_ERR_DATE_FORMAT: `${e.error} | Вы ввели неверную дату. Напоминание: формат даты должен быть: день/месяц/год. Например, 31/12/1999-31 Декабря, 1999.`,
			BIRTHDATE_ERR_INVALID_DATE_FORMAT: `${e.error} | Вы ввели неверную дату (или указанная дата не существует). Напоминание: формат даты должен быть: день/месяц/год. Например, 31/12/1999-31 Декабря, 1999.`,
			BIRTHDATE_ERR_TOO_HIGH: `${e.error} | Ты не мог еще не родиться!`,
			BIRTHDATE_ERR_TOO_LOW: `${e.error} | Более 80 лет?:eyes:`,
			// Content
			BIRTHDATE_SUCCESS: (date) => `${e.success} | Ваш день рождения был установлен на ${date} !`,
			
			
			/* WEDDING COMMAND */

			// Utils
			WEDDING_DESCRIPTION: "Выйти замуж за человека по вашему выбору!",
			WEDDING_USAGE: "свадьба [@user#0000]",
			WEDDING_EXAMPLES: "$свадьба @user#0000",
			// Errors
			WEDDING_ERR_AUTHOR_MARRIED: (prefix) => `${e.error} | Вы уже женаты! Сначала используйте \`${prefix} развод\` для развода`,
			WEDDING_ERR_MEMBER_MARRIED: (username) => `${e.error} | Место занято, товарищ! **${username}** уже замужем!`,
			WEDDING_ERR_AUTHOR_PENDING_REQUESTER: (username) => `${e.error} | Вы уже женаты с **${username}** !`,
			WEDDING_ERR_AUTHOR_PENDING_RECEIVER: (username) => `${e.error} | **${username}** уже отправил вам запрос! Пожалуйста, откажитесь или примите его (или подождите, пока он не истечет через несколько минут).`,
			WEDDING_ERR_MEMBER_PENDING_REQUESTER: (username1, username2) => `${e.error} | **${username2}** уже отправил запрос **${username1}** !`,
			WEDDING_ERR_MEMBER_PENDING_RECEIVER: (username1, username2) => `${e.error} | **уже отправил запрос **${username2}**! Подождите, пока **${username2}** не примет или не отклонит запрос **${username1}** или пока он не истечет, и повторите попытку!`,
			WEDDING_ERR_TIMEOUT: (member) => `${e.error} | ${member} не ответил.... Подождите, пока он/она подключится, а затем повторите попытку!`,
			WEDDING_ERR_DENIED: (author, member) => `${e.error} | ${author}, У меня плохие новости ... ${member} отклонил ваше предложение.`,
			WEDDING_ERR_YOURSELF: `${e.error} | Вы не можете жениться на себе!`,
			// Content
			WEDDING_REQUEST: (member, author) => `${e.warn} | ${member}, ты согласен жениться на ${author}? Ответьте "да" или "нет"!`,
			WEDDING_SUCCESS: (author, member) => `${e.success} | ${author}, У меня есть хорошие новости ... ${member} принял ваше предложение! `,

			/* DIVORCE COMMAND */

			// Utils
			DIVORCE_DESCRIPTION: "Развестись с человеком, за которого ты в настоящее время женат!",
			DIVORCE_USAGE: "развод",
			DIVORCE_EXAMPLES: "развод",
			// Errors
			DIVORCE_ERR_NOT_WEDDED: `${e.error} | Вы в настоящее время не женаты!`,
			// Content
			DIVORCE_SUCCESS: (username) => `${e.success} | Вы развелись с **${username}** !`,

			/* SLOTS COMMAND */

			// Utils
			SLOTS_DESCRIPTION: "Казино!",
			SLOTS_USAGE: "казино [кол-во]",
			SLOTS_EXAMPLES: "$казино\n$казино 10",
			// Content
			SLOTS_DEFEAT: (amount, username) => `**${username}** потратил ${amount}$ и отдал всё <:putin:674631759832547359>.`,
			SLOTS_VICTORY: (text, amount, won, username) => `${text}**${username}** потратил ${amount}$ и выиграл ${won}$!`,
			// Errors
			SLOTS_ERR_TOO_HIGH: (money) => `${e.error} | У вас нет ${money}$.`,

			/* STATS COMMAND */

			// Utils
			STATS_DESCRIPTION: "Показать статистику бота!",
			STATS_USAGE: "стат",
			STATS_EXAMPLES: "$стат",
			// Content
			STATS: (serv, users) => `\`Серверов : ${serv}\`\n\`Юзеров: ${users}\``,
			STATS_DESC: `${c.botname}-это бот, который разработан ${c.owner.name} !`,
			STATS_ONLINE: (time) => `${time}`,
			STATS_VC: (nb) => `Музыка играет на \`${nb}\` серверах`,
			STATS_CREDITS: "Спасибо [`https://icones8.fr/icons/`](https://icones8.fr/icons/), почти все смайлики с этого сайта!\n__**Другие боты**__:\n- [`fydne#0773`](https://top.gg/bot/626106847451152399) **Еще один мой бот,** [**github**](https://github.com/fydne/fydne)\n- [`JDAmusic#7873`](https://top.gg/bot/655120572493070356) **Английский музыкальный бот(JAVA)**\n- [`musicPY#0907`](https://top.gg/bot/636213418730455043) **Английский музыкальный бот(Python)**\n- [`JDAmusic#4280`](https://top.gg/bot/655522285104660501)(ru) **Русский музыкальный бот(JAVA)**",
			STATS_LINKS: (url, id) => `[Server](https://discord.gg/UCUBU2z) ● [Invite](https://discordapp.com/oauth2/authorize?client_id=${id}&scope=bot&permissions=2146958847) ● [Сайт](https://fydne.xyz) ● [Github](${c.others.github})`,
			// Headings
			STATS_HEADINGS:[
				`Статистика`,
				`${e.stats} • __Статистика__`,
				`${e.version} • __Версии__`,
				`${e.ram} • __RAM__`,
				`${e.status.online} • __Онлайн__`,
				`${e.voice} • __Музыка__`,
				":heart: • __Отдельное спасибо__",
				`${e.link} • __Ссылки__`,
			],
			/* CAPTCHA COMMAND */

			// Utils
			CAPTCHA_DESCRIPTION: "Создается изображение с `капчей` при помощи Nekobot API",
			CAPTCHA_USAGE: "капча (@юзер)",
			CAPTCHA_EXAMPLES: "$капча\n$капча @fydne#0557",

			/* PHCOMMENT COMMAND */

			// Utils
			PHCOMMENT_DESCRIPTION: "Создает картинку с коментом на ||Por*hub||",
			PHCOMMENT_USAGE: "пх (@юзер) (комент)",
			PHCOMMENT_EXAMPLES: "$пх\n$пх @fydne#0557",
			// Errors
			PHCOMMENT_ERR_TEXT: `${e.error} | Вы должны ввести текст комментария!`,

			/* AVATAR COMMAND */

			// Utils
			AVATAR_DESCRIPTION: "Отображает аватар упомянутого участника",
			AVATAR_USAGE: "ава (@юзер)",
			AVATAR_EXAMPLES: "$ава\n$ава @fydne#0557",

			/* LOVE COMMAND */

			// Utils
			LOVE_DESCRIPTION: "Создает рофл изображение с помощью API Nekobot",
			LOVE_USAGE: "рофл [@юзер1] (@юзер2)",
			LOVE_EXAMPLES: "$рофл @fydne#0557\n$рофл @JDAmusic#7873 @musicPY#0907",

			/* CLYDE COMMAND */

			// Utils
			CLYDE_DESCRIPTION: "Создает изображение «Discord бота», используя Nekobot API",
			CLYDE_USAGE: "дбот [текст]",
			CLYDE_EXAMPLES: "$дбот {spam}.",
			// Errors
			CLYDE_ERR_TEXT: `${e.error} | Пожалуйста, введите текст!`,

			/* TRANSLATE COMMAND  */

			// Utils
			TRANSLATE_DESCRIPTION: "Я переведу ваш текст!",
			TRANSLATE_USAGE: "перевод [язык] [сообщение]",
			TRANSLATE_EXAMPLES: "$перевод russian How are you ?",
			// Content
			TRANSLATE_LANGS: `${e.success} | Список языков был только что отправлен вам в лс!`,
			// Errors
			TRANSLATE_ERR_LANG: (prefix) => `${e.error} | Пожалуйста, введите язык! Чтобы отобразить список языков, введите \`${prefix}перевод языки\` !`,
			TRANSLATE_ERR_NOT_FOUND: (prefix, lang) => `${e.error} |Язык \`${lang}\` не существует! Чтобы отобразить список языков, введите \`${prefix}перевод языки\`!`,
			TRANSLATE_ERR_MSG: `${e.error} | Пожалуйста, введите текст для перевода!`,

			/* BAN COMMAND */

			// Utils
			BAN_DESCRIPTION: "Забанить упомянутого участника!",
			BAN_USAGE: "бан [@юзер] (причина)",
			BAN_EXAMPLES: "$бан @fydne#0557 спам",
			// Errors
			BAN_ERR_BANNED: (user) => `${e.error} | **${user.username}** уже забанен!`,
			BAN_ERR_PERMISSIONS: `${e.error} | Произошла ошибка... Проверьте, что у меня есть разрешения на бан этого участника и повторите попытку!`,
			BAN_SUCCESS_DM: (user, msg, reason) => `${e.error} | Привет, <@${user.id}>,\nВы только что были забанены **${msg.author.tag}** на сервере **${msg.guild.name}** по причине **${reason}** !`,
			BAN_SUCCESS_CHANNEL: (user, msg, reason) => `${e.success} | **${user.username}** только что был забанен на сервере **${msg.guild.name}** админом **${msg.author.tag}** по причине **${reason}** !`,
			BAN_TITLE_LOGS: (caseNumber) => `БАН | #${caseNumber}`,

			/* KICK COMMAND */

			// Utils
			KICK_DESCRIPTION: "Кикните упомянутого участника!",
			KICK_USAGE: "кик [@юзер] (причина)",
			KICK_EXAMPLES: "$кик @fydne#0557 спам",
			// Errors
			KICK_ERR_PERMISSIONS: `${e.error} | Произошла ошибка... Проверьте, что у меня есть разрешение кикнуть этого участника и попробуйте еще раз!`,
			KICK_SUCCESS_DM: (user, msg, reason) => `${e.error} | Здравствуйте, <@${user.id}>, \ nВы были исключены из **${msg.guild.name}** админом **${msg.author.tag}** по причине **${reason}**!`,
			KICK_SUCCESS_CHANNEL: (user, msg, reason) => `${e.success} | **${user.username}** только что был кикнут с сервера **${msg.guild.name}** админом **${msg.author.tag}** по причине **${reason}** !`,
			KICK_TITLE_LOGS: (caseNumber) => `КИК | #${caseNumber}`,

			/* CHECKINVITES COMMAND */

			// Utils
			CHECKINVITES_DESCRIPTION: "Убедитесь, что у участников нет рекламы их сервера Discord в их статусе, игре!",
			CHECKINVITES_USAGE: "пп",
			CHECKINVITES_EXAMPLES: "$пп",
			// Content
			CHECKINVITES_NOT_FOUND: `${e.success} | Ни один участник не рекламирует игрой!`,

			/* CLEAR COMMAND */

			// Utils
			CLEAR_DESCRIPTION: "Удаляет сообщения очень быстро!",
			CLEAR_USAGE: "удалить [кол-во сообщений] (@юзер)",
			CLEAR_EXAMPLES: "$удалить 10\n$удалить 10 @fydne#0557",
			// Errors
			CLEAR_ERR_AMOUNT: `${e.error} | Вы должны указать количество сообщений для удаления!`,
			CLEAR_ERR_TIMEOUT: `${e.error} | Время вышло! Пожалуйста, введите команду еще раз!`,
			// Content
			CLEAR_CLONE: `${e.warn} | Все сообщения канала будут удалены! Для подтверждения введите \`-подт\``,
			CLEAR_DELETED: `${e.success} | Чат очищен`,
			CLEAR_SUCCESS: (amount) => `${e.success} | **${amount}** сообщений удалено!`,
			CLEAR_SUCCESS_USER: (amount, user) => `${e.success} | **${amount}** сообщений **${user.tag}** удалено!`,

			/* MUTE COMMAND */

			// Utils
			MUTE_DESCRIPTION: "Запрещает участнику отправлять сообщения и подключаться к голосовым в течение определенного периода времени!",
			MUTE_USAGE: "мьют [@юзер] [время]",
			MUTE_EXAMPLES: "$мьют @fydne#0557 Spam",
			// Content
			MUTE_SUCCESS: (member, time, reason) => `${e.success} | **${member.user.tag}** замьючен на **${time}** по причине **${reason}** !`,
			MUTE_SUCCESS_DM: (message, time, reason) => `${e.error} | Вы замьючены на сервере **${message.guild.name}** на **${time}** по причине **${reason}** !`,
			MUTE_TITLE_LOGS: (caseNumber) => `Mute | Case #${caseNumber}`,

			/* UNMUTE COMMAND */

			// Utils
			UNMUTE_DESCRIPTION: "Размьютить юзера!",
			UNMUTE_USAGE: "размьют [@юзер]",
			UNMUTE_EXAMPLES: "$размьют @fydne#0557",
			// Errors
			UNMUTE_ERR_NOT_MUTED: `${e.error} | Этот юзер не замьючен`,
			// Content
			UNMUTE_SUCCESS: (userID, caseNumber) => `<@${userID}> размьючен (ID мьюта #${caseNumber})`,
			UNMUTE_SUCCESS_USER: (user) => `${e.success} | ${user.tag} размьючен`,

			/* SANCTIONS COMMAND */
			
			// Utils
			SANCTIONS_DESCRIPTION: "Отображает список нарушений, совершенных участником!",
			SANCTIONS_USAGE: "нарушения [@юзер]",
			SANCTIONS_EXAMPLES: "$нарушения @fydne#0557",
			// Errors
			SANCTIONS_ERR_NOTHING: "Этот участник не совершал никаких нарушений.",
			PRINT_SANCTION: (sData) => `Модератор: <@${sData.moderator}>\nПричина: ${sData.reason}`,

			/* DELETEMOD COMMAND */

			// Utils
			DELETEMOD_DESCRIPTION: "Включает или отключает автоматическое удаление команд модерации!",
			DELETEMOD_USAGE: "автоудаление [вкл/выкл]",
			DELETEMOD_EXAMPLES: "$автоудаление вкл",
			// Errors
			DELETEMOD_ERR_STATUS: `${e.error} | Вы должны указать \`вкл\` или \`выкл\`!`,
			// Content
			DELETEMOD_SUCCESS_ENABLED: `${e.success} | Команды модерации будут автоматически удалены!`,
			DELETEMOD_SUCCESS_DISABLED: `${e.success} | Команды модерации больше не будут автоматически удаляться!`,

			/* WARN COMMAND */

			// Utils
			WARN_DESCRIPTION: "Предупредить участника в личных сообщениях",
			WARN_USAGE: "варн [@юзер] [причина]",
			WARN_EXAMPLES: "$варн @fydne#0557 спам",
			// Errors
			WARN_ERR_REASON: `${e.error} | Пожалуйста, введите причину!`,
			// Content
			WARN_AUTOBAN: (member, number) => `${e.success} | **${member.user.tag}** был забанен, потому что было более **${number}** предупреждений!`,
			WARN_AUTOKICK: (member, number) => `${e.success} | **${member.user.tag}** был кикнут, потому что было более **${number}** предупреждений!`,
			WARN_SUCCESS_DM: (msg, reason) => `${e.warn} | Вы только что получили варн на сервере **${msg.guild.name}** админом **${msg.author.tag}** причина **${reason}** !`,
			WARN_SUCCESS: (member, reason) => `${e.success} | **${member.user.tag}** был предупрежден в лс с причиной **${reason}** !`,
			WARN_TITLE_LOGS: (caseNumber) => `Warn | Case #${caseNumber}`,

			/* CLEARSANCTIONS COMMAND */

			// Utils
			CLEARSANCTIONS_DESCRIPTION: "Удаляет все предупреждения юзера!",
			CLEARSANCTIONS_USAGE: "делнарушения [@юзер]",
			CLEARSANCTIONS_EXAMPLES: "$делнарушения @fydne#0557",
			// Content
			CLEARSANCTIONS_SUCCESS: `${e.success} | Sanctions deleted!`,

			/* SETWARNS COMMAND */

			// Utils
			SETWARNS_DESCRIPTION: "Укажите что получат юзеры, которые получат определенное количество предупреждений!",
			SETWARNS_USAGE: "сетварн [кик/бан] [предупреждений/сброс]",
			SETWARNS_EXAMPLES: "$сетварн кик 10\n$сетварн бан 10\n$сетварн бан сброс",
			// Errors
			SETWARNS_ERR_SANCTION: `${e.error} | Пожалуйста, укажите правильный тип действия! (\`кик\`, \`бан\`)`,
			// Content
			SETWARNS_SUCCESS_KICK: (prefix, number) => `${e.success} | Конфигурация сохранена! Когда участник достиг ${number} предупреждений, он будет кикнут. Введите \`${prefix}конфиг\`, чтобы увидеть вашу новую конфигурацию!`,
			SETWARNS_SUCCESS_BAN: (prefix, number) => `${e.success} | Конфигурация сохранена! Когда участник достиг ${number} предупреждений, он будет забанен. Введите \`${prefix}конфиг\`, чтобы увидеть вашу новую конфигурацию!`,
			SETWARNS_SUCCESS_RESET_KICK: (prefix) => `${e.success} | Конфигурация сохранена! Бот не будет кикать за варны! Введите \`${prefix}конфиг\`, чтобы увидеть вашу новую конфигурацию!`,
			SETWARNS_SUCCESS_RESET_BAN: (prefix) => `${e.success} |  Конфигурация сохранена! Бот не будет банить за варны! Введите \`${prefix}конфиг\`, чтобы увидеть вашу новую конфигурацию!`,

			/* POLL COMMAND */

			// Utils
			POLL_DESCRIPTION: "Запустите опрос в текущем канале!",
			POLL_USAGE: "опрос [вопрос]",
			POLL_EXAMPLES: "$опрос Хотите новый канал?",
			// Errors
			POLL_ERR_QUESTION: `${e.error} | Вы должны ввести вопрос!`,
			POLL_ERR_TIMEOUT: `${e.error} | Время вышло! Пожалуйста, введите команду еще раз!`,
			// Content
			POLL_FORM_MENTION: "Вы хотите добавить упоминание к своему сообщению? Ответьте \`да\` или \`нет\`!",
			POLL_FORM_MENTION_HE: "Введите один из следующих ответов: `все` (для упоминания everyone) или `онлайн` (для упоминания here)!",
			POLL_REACT: `Реагируйте ${e.success} или ${e.error}!`,
			POLL_HEADING: "📊 Опрос:",

			/* ANNOUNCEMENT COMMAND */

			// Utils
			ANNOUNCEMENT_DESCRIPTION: "Отправить объявление в текущем канале!",
			ANNOUNCEMENT_USAGE: "объявление [text]",
			ANNOUNCEMENT_EXAMPLES: "$объявление появился новый канал <#664979536982704151>!",
			// Errors
			ANNOUNCEMENT_ERR_TEXT: `${e.error} | Вы должны ввести текст объявления!`,
			ANNOUNCEMENT_ERR_TEXT_LENGTH: `${e.error} | Пожалуйста, введите текст длиной менее 1030 символов!`,
			ANNOUNCEMENT_ERR_TIMEOUT: `${e.error} | Время вышло! Пожалуйста, введите команду еще раз!`,
			// Content
			ANNOUNCEMENT_FORM_MENTION: "Вы хотите добавить упоминание к своему сообщению? Ответьте \`да\` или \`нет\`!",
			ANNOUNCEMENT_FORM_MENTION_HE: "Введите один из следующих ответов: `все` (для упоминания everyone) или `онлайн` (для упоминания here)!",
			ANNOUNCEMENT_HEADING: "📢 Announcement :",

			/* MODOGS EMBEDS */
			MODLOGS_HEADINGS: {
				USER: "Юзер",
				MODERATOR: "Модератор",
				REASON: "Причина",
				TIME: "Время",
				EXPIRATION: "Осталось"
			},

			/* SETMODLOGS COMMAND */

			// Utils
			SETMODLOGS_DESCRIPTION: "Определите лог-канал!",
			SETMODLOGS_USAGE: "логи (#канал)",
			SETMODLOGS_EXAMPLES: "$логи #logs\n$логи",
			// Content
			SETMODLOGS_SUCCESS: (id) => `${e.success} | Логи теперь будут в этом канале <#${id}> !`,

			/* SOMEONE COMMAND */

			// Utils
			SOMEONE_DESCRIPTION: "Выберите случайного юзера на сервере!",
			SOMEONE_USAGE: "кто-то",
			SOMEONE_EXAMPLES: "$кто-то\n@кто-то",
			// Headings
			SOMEONE_HEADINGS: [
				"Ник",
				"#",
				"ID"
			],

			/* SETSUGGESTS COMMAND */

			// Utils
			SETSUGGESTS_DESCRIPTION: "Определите канал предложений!",
			SETSUGGESTS_USAGE: "предложения (#канал)",
			SETSUGGESTS_EXAMPLES: "$предложения #предложения\n$предложения",
			// Content
			SETSUGGESTS_SUCCESS: (channel) => `${e.success} | Канал предложений сейчас ${channel} !`,

			/* SETREPORTS COMMAND */
			SETREPORTS_DESCRIPTION: "Определите канал репортов!",
			SETREPORTS_USAGE: "репорты (#канал)",
			SETREPORTS_EXAMPLES: "$репорты #репорты\n$репорты",
			// Content
			SETREPORTS_SUCCESS: (channel) => `${e.success} | Канал репортов сейчас ${channel} !`,
			
			/* ADDEMOTE COMMAND */

			// Utils
			ADDEMOTE_DESCRIPTION: "Добавьте Emoji на сервер!",
			ADDEMOTE_USAGE: "эмодзи [URL] [название]",
			ADDEMOTE_EXAMPLES: "$эмодзи https://fydne.xyz/anime.png anime",
			// Errors
			ADDEMOTE_ERR_NAME: `${e.error} | Пожалуйста, укажите имя смайлика!`,
			ADDEMOTE_ERR_URL: `${e.error} | Пожалуйста, укажите адрес Emoji!`,
			ADDEMOTE_ERROR: `${e.error} | URL к изображению недействителен или у вас больше нет места для Emoji в вашей гильдии Discord!`,
			// Content
			ADDEMOTE_SUCCESS: (emote) => `${e.success} | Эмодзи ${emote.name} добавлен на сервер! ID: \`${emote.toString()}\``,
			
			/* AUTOMOD COMMAND */

			// Utils
			AUTOMOD_DESCRIPTION: "Включает или отключает автоматическое удаление приглашений",
			AUTOMOD_USAGE: "пригл [вкл/выкл] (#канал)",
			AUTOMOD_EXAMPLES: "$пригл вкл\n$пригл выкл #auth\n$пригл выкл",
			// Errors
			AUTOMOD_ERR_STATUS: `${e.error} | Пожалуйста, введите действительный статус! (\`вкл\` или \`off\`)!`,
			// Content
			AUTOMOD_SUCCESS_ENABLED: (prefix) => `${e.success} | Приглашения в гильдии дискорд будут автоматически удалены! Если вы хотите игнорировать это в определенном канале, то просто наберите \`${prefix}пригл выкл #канал\`! Это отключит автоматическую модерацию в указанном канале!`,
			AUTOMOD_SUCCESS_DISABLED_CHANNEL: (channel) => `${e.success} | Автомодерация больше не будет выполняться в канале ${channel} !`,
			AUTOMOD_SUCCESS_DISABLED: `${e.success} | Все в порядке! Авто модерация больше не работает на этом сервере!`,
			AUTOMOD_MSG: (msg) => `${msg.author} | Ваше сообщение содержало приглашение Discord, поэтому оно было удалено. Если оно было непреднамеренным, вы можете отредактировать ваше сообщение еще раз, оно было отправлено вам лс!`,

			/* SETLANG COMMAND */

			// Utils
			SETLANG_DESCRIPTION: "Change the server language!",
			SETLANG_USAGE: "язык [русский/english]",
			SETLANG_EXAMPLES: "$язык русский\n$язык english",
			// Errors
			SETLANG_ERR_LANG: `${e.error} | Пожалуйста, введите правильный язык (\`русский\` или \`english\`) !`,
			// Content
			SETLANG_LANGS:[
				":flag_ru: | Русский язык включен!",
				":flag_gb: | The language of this server is now English!"
			],

			/* FORTNITE COMMAND */
			
			// Utils
			FORTNITE_DESCRIPTION: "Отображает статистику игрока Fortnite!",
			FORTNITE_USAGE: "фортнайт [пс/хб/пк] [ник]",
			FORTNITE_EXAMPLES: "$фортнайт пк debil",
			// Errors
			FORTNITE_ERR_PLATFORM: `${e.error} | Введите действительную платформу: \`пс\`, \`пк\` или \`хб\`!`,
			FORTNITE_ERR_USERNAME: `${e.error} | Введите действительныё ник в fortnite!`,
			FORTNITE_ERR_NOT_FOUND: (platform, username) => `${e.error} | \`${username}\` не найден на платформе \`${platform}\`!`,
			// Content
			FORTNITE_TITLE: (username, link) => `[${username}](${link}) Fortnite статистика`,
			FORTNITE_STATS_RIGHT: (kd, percent) => `${kd} K/D - ${percent} WIN%`,
			FORTNITE_AVERAGE_KILLS: "Килов/матчей",
			FORTNITE_AVERAGE_KILL: "Убийств на матч",
			FORTNITE_W_PERCENT: "V%",
			FORTNITE_KD: "K/D",
			FORTNITE_WINS : "Побед",
			FORTNITE_WIN : "Побед",
			FORTNITE_KILLS : "Убийств",
			FORTNITE_KILL : "убийств",
			FORTNITE_WINS_PERCENT : "%побед",
			FORTNITE_MATCHES : "Матчей",
			FORTNITE_MATCH : "Матч",

			/* FORTNITESHOP COMMAND */
			
			// Utils
			FORTNITESHOP_DESCRIPTION: "Отображает магазин Fortnite предметов!",
			FORTNITESHOP_USAGE: "фортнайтм",
			FORTNITESHOP_EXAMPLES: "$фортнайтм",
			// Content
			FORTNITESHOP_HEADER: "FORTNITE магазин",
			FORTNITESHOP_DAILY: "ЕЖЕДНЕВНО",
			FORTNITESHOP_FEATURED: "ЛУЧШЕЕ",
			FORTNITESHOP_TITLE: (date) => `Fortnite магазин ${date}`,

			/* SETFORTNITESHOP COMMAND */
			
			// Utils
			SETFORTNITESHOP_DESCRIPTION: "Определите канал магазина Fortnite!",
			SETFORTNITESHOP_USAGE: "сфортнайт (#channel)",
			SETFORTNITESHOP_EXAMPLES: "$сфортнай #магазин\n$сфортнайт",
			// Content
			SETFORTNITESHOP_DISABLED: `${e.success} | Магазин Fortnite отключен!`,
			SETFORTNITESHOP_ENABLED: (id) => `${e.success} | Канал магазина Fortnite <#${id}> !`,

			b0mb3r_DESCRIPTION: "Запустите b0mb3r в **ознакомительных** целях",
			b0mb3r_USAGE: "b0mb3r <id страны(поддерживаемые: +7, +375, +380, если номера нет в списке, то просто +(после этого пробел))> <номер(слитно, без всяких доп. знаков)>, <кол-во повторов>",
			b0mb3r_EXAMPLES: "b0mb3r +7 8005553535 5",
			b0mb3r_ERR: `${e.warn} | Введите корректный код страны!`,
			/* CALC COMMAND */
			
			// Utils
			CALC_DESCRIPTION: "Калькулятор, способный решать сложные операции и конвертировать единицы!",
			CALC_USAGE: "кальк [калькулятор]",
			CALC_EXAMPLES: "$кальк 10*5+sin(3)\n$кальк 10см в м",
			// Errors
			CALC_EMPTY: `${e.error} | Введите то, что надо посчитать!`,
			CALC_ERROR: `${e.error} | Введите действительный расчет!`,
			// Content
			CALC_TITLE: "Калькулятор",
			CALC_OPERATION: "Пример",
			CALC_RESULT: "Результат",
						
			/* PURGE COMMAND */

			// Utils
			PURGE_DESCRIPTION: "Кикните неактивных юзеров",
			PURGE_USAGE: "чистка [дни]",
			PURGE_EXAMPLES: "$чистка 10",
			// Errors
			PURGE_ERR_DAYS: `${e.error} | Пожалуйста, укажите кол-во дней!`,
			PURGE_ERR_TIMEOUT: `${e.error} | Время вышло! Пожалуйста, введите команду еще раз!`,
			// Content
			PURGE_CONFIRMATION: (members) => `${e.warn} | ${members} участники будут выгнаны! Чтобы подтвердить, напечатайте \`подт\`!`,
			PURGE_SUCCESS: (members) => `${e.success} | ${members} юзеров кикнуто!`,

			/* DASHBOARD */

			FIRST_LOGIN: (username) => `${username} впервые подключен к сайту! :tada:`,
			REGISTERED_FROM: (date) => `Участник с ${(date ? date : "")}`,
			HELLO: (username) => `Привет, ${username}`,
			SEARCH_SERVERS: "Поиск серверов....",
			SERVERS_LIST: "Список серверов",
			SELECTOR: "Гильдии",
			SHOP: "Магазин",
			HHH: "Главная",
			SPAM: "Хочется своего бота, но не хочется его писать и покупать vps? Тогда fydne для тебя!",
			SPAMM: "Для этого просто надо ввести желаемый префикс, id бота, токен бота!",
			SPAMMM: "Если вы захотели купить бота с панелью управления, то вам еще надо будет ввести Secret и желаем субдомен!",
			SERVERS_MANAGEMENT: "УПРАВЛЕНИЕ СЕРВЕРОМ",
			ERR_NOT_FOUND: "К сожалению! Страница не найдена.",
			ERR_NOT_FOUND_CONTENT: "Мы не нашли страницу, которую вы искали. А пока вы можете вернуться в панель управления или попробовать воспользоваться формой поиска.",
			ERR_SOMETING_WENT_WRONG: "К сожалению! Что-то пошло не так.",
			ERR_SOMETING_WENT_WRONG_CONTENT: "Мы постараемся исправить это немедленно. А пока вы можете вернуться в панель управления или попробовать воспользоваться формой поиска.",
			ERR_NO_SERVER_FOUND: "Сервер не найден",
			ERR_NO_SERVER_FOUND_CONTENT: "Нет сервера для отображения. Убедитесь, что вы вошли в систему с правильного аккаунта и повторите попытку.",
			SERVER_CONF: "Настройки",
			CONFIG_HEADINGS: {
				BASIC: "📝 Базовая настройка",
				WELCOME: "👋 Приветственное сообщение",
				GOODBYE: "😢 Прощальное сообщение",
				CHANNELS: "🌀 Специальные каналы",
				AUTOROLE: "🎖️ Автороль"
			},
			CONFIG_FIELDS: {
				PREFIX: "Префикс",
				LANG: "Язык",
				CHANNEL: "Канал",
				MESSAGE: "Сообщение",
				ROLE: "Роль",
				WITHIMAGE_WELCOME: "Добавьте отличное изображение приветствия",
				WITHIMAGE_GOODBYE: "Добавьте отличное прощальное изображение",
				SUGGESTIONS: "Предложения",
				MODLOGS: "Логи",
				REPORTS: "Репорты",
				FORTNITESHOP: "Fortnite магазин"
			},
			ENABLE_MESSAGES: "Включить сообщения",
			DISABLE_MESSAGES: "Выключить сообщения",
			ENABLE_AUTOROLE: "Включить автороль",
			DISABLE_AUTOROLE: "Выключить автороль",
			SWITCH_LANG: "Переключить на Английский 🇬🇧",
			FIRST_LEAD_MONEY: "1 место в рейтинге \"$\"",
			FIRST_LEAD_LEVEL: "1 место в рейтинге \"Уровни\"",
			FIRST_LEAD_REP: "1 место в рейтинге \"Репутация\"",
			VIEW_PUB_PROFILE: "Посмотреть мой публичный профиль",
			SETTINGS_HEADINGS: [
				"🇷🇺 Русский",
				"Выйти"
			]

        }
    }

    /**
	 * The method to get language strings
	 * @param {string} term The string or function to look up
	 * @param {...*} args Any arguments to pass to the lookup
	 * @returns {string|Function}
	 */
	get(term, ...args) {
		//if (!this.enabled && this !== this.store.default) return this.store.default.get(term, ...args);
		const value = this.language[term];
		/* eslint-disable new-cap */
		switch (typeof value) {
			case 'function': return value(...args);
			default: return value;
		}
	}

	getLang(){
		return lang;
	}

	printDate(pdate, isLongDate){
        let monthNames = [
            "Января", "Февраля", "Марта",
            "Апреля", "Мая", "Июня", "Июля",
            "Августа", "Сентября", "Октября",
            "Ноября", "Декабря"
          ];
        
        let day = pdate.getDate();
        let monthIndex = pdate.getMonth();
        let year = pdate.getFullYear();
        let hour = pdate.getHours() < 10 ? "0" + pdate.getHours() : pdate.getHours();
        let minute = pdate.getMinutes() < 10 ? "0" + pdate.getMinutes() : pdate.getMinutes();

        let thedate = (isLongDate) ? day + " " + monthNames[monthIndex] + " " + year + " в " + hour + ":" + minute 
        : day + " " + monthNames[monthIndex] + " " + year
        return thedate;
	}
	
	/**
	 * Parse ms and returns a string
	 * @param {number} milliseconds The amount of milliseconds
	 * @returns The parsed milliseconds
	 */
	convertMs(milliseconds){
		let roundTowardsZero = milliseconds > 0 ? Math.floor : Math.ceil;
		let days = roundTowardsZero(milliseconds / 86400000),
		hours = roundTowardsZero(milliseconds / 3600000) % 24,
		minutes = roundTowardsZero(milliseconds / 60000) % 60,
		seconds = roundTowardsZero(milliseconds / 1000) % 60;
		if(seconds === 0){
			seconds++;
		}
		let isDays = days > 0,
		isHours = hours > 0,
		isMinutes = minutes > 0;
		let pattern = 
		(!isDays ? "" : (isMinutes || isHours) ? "{days} дней, " : "{days} дней и ")+
		(!isHours ? "" : (isMinutes) ? "{hours} часов, " : "{hours} часов и ")+
		(!isMinutes ? "{minutes} минут " : "{minutes} минут и ")+
		("{seconds} секунд");
		let sentence = pattern
			.replace("{duration}", pattern)
			.replace("{days}", days)
			.replace("{hours}", hours)
			.replace("{minutes}", minutes)
			.replace("{seconds}", seconds);
		return sentence;
	}
}