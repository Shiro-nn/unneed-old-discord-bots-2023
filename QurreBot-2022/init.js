const Discord = require("discord.js");
const { MessageActionRow, MessageButton, MessageEmbed, Intents } = require('discord.js');
const fydne = require("./base/fydne"),
client = new fydne({
	allowedMentions: {parse: ['users', 'roles'], repliedUser: true},
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS]
});
const init = async () => {
    client.loadCommands("./commands");
    client.loadEvents("./events");
    client.login(client.config.token);
};
init();
client.on("disconnect", () => client.logger.log("Bot is disconnecting...", "warn"))
    .on("reconnecting", () => client.logger.log("Bot reconnecting...", "log"))
    .on("error", (e) => client.logger.log(e, "error"))
    .on("warn", (info) => client.logger.log(info, "warn"));

process.on("unhandledRejection", (err) => console.error(err));
process.on("uncaughtException", (err) => console.error(err));