module.exports = {
	token: "",
	host: 'localhost',//bot.fydne.xyz
	safe: 'https',
	dotnet: '/home/jsapps/.dotnet/dotnet',
	directory: '/home/jsapps/QurreBot',
	root_directory: '/home/jsapps',
	errors_channel: '',
	dashboard: {
		secret: "",
		baseURL: `https://bot.fydne.xyz`,
		cdn: "https://cdn.fydne.xyz"
	},
	support: {
		id: "",
		logs: "",
	},
	mongoDB: "mongodb://@mongo.scpsl.store:27020/qurre-bot?authSource=admin",
	prefix: ".",
	embed: {
		color: "#ff0000"
	},
	owner: {
		id: "784745992444444723",
		name: "fydne#1337"
	},
	status: [
		{
			name: "@Qurre | https://bot.fydne.xyz",
			type: "PLAYING"
		},
		{
			name: "@Qurre | https://fydne.xyz",
			type: "PLAYING"
		}
	],
}