const Discord = require("discord.js");
const fydne = require("./base/fydne"),
client = new fydne({
	disableMentions: "everyone",
	ws: { intents: new Discord.Intents(Discord.Intents.ALL) }
});
const ShardManager = require('./base/ShardsManager')

const init = async () => {
    if (client.shard) client.shardManager = new ShardManager(client)
    client.loadCommands("./commands");
    client.loadEvents("./events");
    client.login(client.config.token);
    client.queue = new Map();
};
init();
client.on("disconnect", () => client.logger.log("Bot is disconnecting...", "warn"))
    .on("reconnecting", () => client.logger.log("Bot reconnecting...", "log"))
    .on("error", (e) => client.logger.log(e, "error"))
    .on("warn", (info) => client.logger.log(info, "warn"));
process.on("unhandledRejection", (err) => console.error(err));
process.on("uncaughtException", (err) => console.error(err));