const util = require("util"),
fs = require("fs"),
readdir = util.promisify(fs.readdir),
mongoose = require("mongoose");
const Discord = require("discord.js")
const fydne = require("./base/fydne"),
client = new fydne({
	disableMentions: "everyone",
	//ws: { intents: new Discord.Intents(Discord.Intents.ALL) }
});

const init = async () => {
    let directories = await readdir("./commands/");
    directories.forEach(async (dir) => {
        let commands = await readdir("./commands/"+dir+"/");
        commands.filter((cmd) => cmd.split(".").pop() === "js").forEach((cmd) => {
            const response = client.loadCommand("./commands/"+dir, cmd);
            if(response){
                client.logger.log(response, "error");
            }
        });
    });

    const evtFiles = await readdir("./events/");
    evtFiles.forEach((file) => {
        const eventName = file.split(".")[0];
        const event = new (require(`./events/${file}`))(client);
        client.on(eventName, (...args) => event.run(...args));
        delete require.cache[require.resolve(`./events/${file}`)];
    });

    client.login(client.config.token);
    client.queue = new Map();

    mongoose.connect(client.config.mongoDB, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
        client.logger.log("Connected to the Mongodb database.", "log");
    }).catch((err) => {
        client.logger.log("Unable to connect to the Mongodb database. Error:"+err, "error");
    });
};

init();
const data = {};
data.config = client.config;

client.on("disconnect", () => client.logger.log("Bot is disconnecting...", "warn"))
    .on("reconnecting", () => client.logger.log("Bot reconnecting...", "log"))
    .on("error", (e) => client.logger.log(e, "error"))
    .on("warn", (info) => client.logger.log(info, "warn"));

process.on("unhandledRejection", (err) => {
    console.error(err);
});