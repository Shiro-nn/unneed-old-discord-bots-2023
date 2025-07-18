const mongoose = require("mongoose");
const fydne = require("./base/fydne");
const util = require("util");
const fs = require("fs");
const readdir = util.promisify(fs.readdir);
const Discord = require("discord.js"),
client = new fydne({
	disableMentions: "everyone",
	ws: { intents: new Discord.Intents(Discord.Intents.ALL) }
});

const init = async () => {
    const dir_com = `${__dirname}/commands`;
    const ev_com = `${__dirname}/events`;
    let directories = await readdir(dir_com);
    directories.forEach(async (dir) => {
        let commands = await readdir(`${dir_com}/${dir}`);
        commands.filter((cmd) => cmd.split(".").pop() === "js").forEach((cmd) => client.loadCommand(`${dir_com}/${dir}`, cmd));
    });
    const evtFiles = await readdir(ev_com);
    evtFiles.forEach((file) => {
        const eventName = file.split(".")[0];
        const event = new (require(`${ev_com}/${file}`))(client);
        client.on(eventName, (...args) => {
            try { event.run(...args); }
            catch (err) { console.err(err); }
        });
        delete require.cache[require.resolve(`${ev_com}/${file}`)];
    });
    client.login(client.config.token);
    mongoose.connect(client.config.mongoDB, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
        client.logger.log("Connected to the Mongodb database.", "log");
        StatsFix()
    }).catch((err) => {
        client.logger.log("Unable to connect to the Mongodb database. Error:"+err, "error");
    });
};
async function StatsFix() {
    let DsData = require("./base/stats");
    let cached = [];
    let cached2 = [];
    let data = await DsData.find();
    data.forEach(async el => {/*
        //console.log(!cached.includes(el.steam+el.discord))
        if(!cached.includes(el.steam+el.discord)) cached.push(el.steam+el.discord)
        else{
            if(el.lvl == 1){
                console.log(el);
                await el.deleteOne();
            }
            else cached2.push(el.steam+el.discord);
        }
        el.ips = el.ips.filter(x => x != null);
        el.markModified('ips');
        await el.save();
        console.log(el.steam)*/
    });
    console.log(cached2);
}
const data = {};
data.config = client.config;
client
.on("disconnect", () => client.logger.log("Bot is disconnecting...", "warn"))
.on("error", (e) => client.logger.log(e, "error"))
.on("warn", (info) => client.logger.log(info, "warn"));
process.on("unhandledRejection", (err) => console.error(err));
process.on("uncaughtException", (err) => console.error(err));
init();