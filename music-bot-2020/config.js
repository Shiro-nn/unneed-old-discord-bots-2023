module.exports = {
	token: "",
	shardCount: 2,
	host: 'bot2.fydne.xyz',
	safe: 'https',
	dashboard: {
		secret: "",
		baseURL: `https://bot2.fydne.xyz`,
		logs: "",
		failureURL: `https://bot2.fydne.xyz`
	},
	support: {
		id: "",
		logs: "",
	},
	mongoDB: "@mongo.scpsl.store/music?authSource=admin",
	prefix: ".",
	embed: {
		color: "#ff0000",
		footer: "© fydne#0557"
	},
	owner: {
		id: "426747861175107585",
		name: "fydne#0557"
	},
	apiKeys: {
		simpleYoutube: "",
		soundcloud: "",
	},
	status: [
		{
			name: "@fydne | https://bot2.fydne.xyz",
			type: "PLAYING"
		},
		{
			name: "@fydne | https://fydne.xyz",
			type: "PLAYING"
		}
	],
}