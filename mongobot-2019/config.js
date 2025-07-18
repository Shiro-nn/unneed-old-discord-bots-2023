module.exports = {
	token: "",
	shardCount: 2,
	hehe: '..', //.
	host: 'bot.fydne.xyz',
	safe: 'https',
	/* For the support server */
	support: {
		id: "", // The ID of the support server
		logs: "", // And the ID of the logs channel of your server (new servers for example)
	},
	/* Dashboard configuration */
	dashboard: {
		enabled: true, // whether the dashboard is enabled or not
		secret: "F9ZOCbc08ydyeJHkwdOZk0mrtOypRBVo", // Your discord client secret
		baseURL: `https://bot.fydne.xyz`, // The base URl of the dashboard
		logs: "", // The channel ID of logs
		expressSessionPassword: "XXXXXXXXXXX", // Express session password (it can be what you want)
		failureURL: `https://bot.fydne.xyz` // url on which users will be redirected if they click the cancel button (discord authentication)
	},
	shardLogs: "",
	mongoDB: "@mongo.scpsl.store/ticket-db?authSource=admin", // The URl of the mongodb database
	prefix: "*", // The default prefix for the bot
	/* For the embeds (embeded messages) */
	embed: {
		color: "#00ffff", // The default color for the embeds
		footer: "© fydne#0557" // And the default footer for the embeds
	},
	defaultLanguage: "french", // The default language for the new servers
	botname: "fydne", // The name of the bot
	/* Bot's owner informations */
	owner: {
		id: "426747861175107585", // The ID of the bot's owner
		name: "fydne#0557" // And the name of the bot's owner
	},
	/* The API keys that are required for certain commands */
	apiKeys: {
		simpleYoutube: ""
	},
	/* The emojis that are required for certain commands */
	emojis: {
		error: "<:xxx:674648543775948822>",
		success: "<:yeasss:674649413880381455>",
		loading: "<a:loading:707642528916176947>",
		stats: "<:barchartisometric:674650053868257281>",
		ram: "<:processor:674650231140253754>",
		version: "<:installingupdates:674650376888385576>",
		link: "<:link:674650517875589120>",
		voice: "<:speaker:674650682808336437>",
		add: "<:plus:674650796129910825>",
		vote: "<:votebutton:674650920935489563>",
		help: "<:help:674651056994517003>",
		warn: "<:errorv1:674651259424473088>",
		games: "<:computerrrr:674651452945465365>",
		crown: "<:crown:674651844957569025>",
		discriminator: "<:hashtagggg:674652004567482368>",
		bot: "<:bot:674652208133963776>",
		avatar: "<:picture:674652342058221578>",
		calendar: "<:calendar:674652483921903626>",
		calendar2: "<:calendar2:674652636762472458>",
		up: "<:circledupv2:674652762973143040>",
		pencil: "<:pencil:674652886394994718>",
		roles: "<:adminsettingsmale:674653008231006248>",
		color: "<:colorpalette:674653142918365194>",
		minecraft: "<:minecraftsword:674653248812089374>",
		users: "<:group:674653361991319593>",
		title: "<:tagwindow:674653493503590424>",
		singer: "<:rap:674653622344351761>",
		time: "<:future:674653763809706011>",
		search: "<:searchv2:674653938162597897>",
		desc: "<:textbox:674654056345501696>",
		playlist: "<:smartplaylist:674654230832873533>",
		channels: "<:filledchat:674654363171422217>",
		afk: "<:nomicrophone:674654470013190175>",
		id: "<:idverified:674654639634776106>",
		ip: "<:ipaddress:674654992367484938>",
		folder: "<:openedfolder:674655235553099796>",
		desc2: "<:editproperty:674655342243872768>",
		patreon: "<:patreon:674655463970832398>",
		server: "<:rootserver:674655641083707403>",
		boost: "<:nitro:674655772453634048>",
		status: {
			idle: "<:idle:674655913960931349>",
			dnd: "<:dnd:674656051328712704>",
			offline: "<:offline:674656214285811733>",
			online: "<:online:674656375619452949>"
		},
		letters: {
			a: "<:A_:674656511397724162>",
			w: "<:W_:674656642775646229>",
			r: "<:RRRRRRRRRRRRRRR:674656775102005278>",
			d: "<:DDDDDDDDDDDDD:674656904479506483>"
		},
		categories: {
			administration: "<:admincom:674657061186830357>",
			// RE: https://img.icons8.com/color/96/000000/horizontal-settings-mixer.png
			economy: "<:economy:674657199292940332>",
			// RE: https://img.icons8.com/color/96/000000/banknotes.png
			fun: "<:smiling:674657426879938562>",
			// RE: https://img.icons8.com/color/96/000000/smiling.png
			general: "<:general:674657840425861152>",
			// RE: https://i.goopics.net/3X5oq.png
			images: "<:picture:674652342058221578>",
			// RE: https://img.icons8.com/color/96/000000/picture.png
			moderation: "<:moder:674658108659990558>",
			// RE: https://img.icons8.com/color/96/000000/police-badge.png
			music: "<:musically:674658223319678986>",
			musicv2: "<:musically:674658223319678986>",
			// RE: https://img.icons8.com/color/96/000000/musically.png
			owner: "<:owner:674658347265425439>",
			// RE: https://img.icons8.com/color/96/000000/queen-uk.png
			custom: "<:requestservice:674658485752823850>"
			// RE: https://img.icons8.com/color/96/000000/request-service.png
		}
	},
	/* The others utils links */
	others: {
		github: "https://github.com/fydne", // Founder's github account
		donate: "https://patreon.com/fydne" // Donate link
	},
	/* The badges for the badges command */
	badges: {
		games: [
			{ name: "Minecraft", emoji: "XXXXXXXXXXX", price: 1200 },
			{ name: "GTA", emoji: "XXXXXXXXXXX", price: 1200 },
			{ name: "Fortnite", emoji: "XXXXXXXXXXX", price: 1200 },
			{ name: "Mario", emoji: "XXXXXXXXXXX", price: 1200 },
			{ name: "LOL", emoji: "XXXXXXXXXXX", price: 1200 }
		],
		flags: [
			{ name: "France", emoji: "XXXXXXXXXXX", price: 1500 },
			{ name: "Canada", emoji: "XXXXXXXXXXX", price: 1500 },
			{ name: "Swiss", emoji: "XXXXXXXXXXX", price: 1500 },
			{ name: "Great Britain", emoji: "XXXXXXXXXXX", price: 1500 },
			{ name: "USA", emoji: "XXXXXXXXXXX", price: 1500 }
		],
		others: [
			{ name:"Rich", emoji: "XXXXXXXXXXX", price: 18000 },
			{ name:"Troll", emoji: "XXXXXXXXXXX", price: 3000 },
			{ name:"fydne", emoji: "XXXXXXXXXXX", price: 1200 },
			{ name:"IAMABOT", emoji: "XXXXXXXXXXX", price: 1000 },
			{ name:"Discordien", emoji: "XXXXXXXXXXX", price: 500 }
		]
	},
	addLogs:        "681505557311389697",
    removeLogs:     "681505557311389697",
    shardLogs:      "681505557311389697",
    dashLogs:       "681505557311389697",
	/* The Bot status */
	status: [
		{
			name: "https://bot.fydne.xyz",
			type: "PLAYING"
		},
		{
			name: "https://fydne.xyz",
			type: "PLAYING"
		}
	],
	proMode: false, // Whether the bot is in pro mode (only users in the proUsers array will be able to invite the bot)
	/* The pro users */
	proUsers: [
		"DiscordUser ID",
		"Another DiscordUser ID"
	]
}
