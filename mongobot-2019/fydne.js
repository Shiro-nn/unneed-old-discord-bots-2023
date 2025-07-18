const util = require("util"),
fs = require("fs"),
readdir = util.promisify(fs.readdir),
mongoose = require("mongoose");
require("moment-duration-format");
const moment = require("moment");
const config = require("./config");
const fydne = require("./base/fydne"),
Discord = require("./dis.js");
client = new fydne({intents: new Discord.Intents(Discord.Intents.ALL)});
const cfg = require('./config');


const init = async () => {
    /*let directories = await readdir(`${cfg.hehe}/commands/`);
    directories.forEach(async (dir) => {
        let commands = await readdir(`${cfg.hehe}/commands/${dir}/`);
        commands.filter((cmd) => cmd.split(".").pop() === "js").forEach((cmd) => {
            const response = client.loadCommand(`${cfg.hehe}/commands/${dir}`, cmd);
            if(response){
                client.logger.log(response, "error");
            }
        });
    });
    const evtFiles = await readdir(`${cfg.hehe}/events/`);
    evtFiles.forEach((file) => {
        const eventName = file.split(".")[0];
        const event = new (require(`${cfg.hehe}/events/${file}`))(client);
        client.on(eventName, (...args) => event.run(...args));
        delete require.cache[require.resolve(`${cfg.hehe}/events/${file}`)];
    });*/
    client.loadCommand(`${config.hehe}/commands/Сервер`, "эмбед");
    client.loadCommand(`${config.hehe}/commands/General`, "стата");
    client.loadCommand(`${config.hehe}/commands/General`, "топ");
    client.loadCommand(`${config.hehe}/commands/General`, "хелп");
    client.loadCommand(`${config.hehe}/commands/General`, "хентай");
    client.loadCommand(`${config.hehe}/commands/Owner`, "конфиги");
    client.loadCommand(`${config.hehe}/commands/Owner`, "пер");
    client.loadCommand(`${config.hehe}/commands/Owner`, "сервера");
    client.loadCommand(`${config.hehe}/commands/Owner`, "eval");
    client.loadCommand(`${config.hehe}/commands/Ticket`, "закрыть");
    client.loadCommand(`${config.hehe}/commands/Ticket`, "логи");
    client.on("adminreactadd", (...args) => new (require(`./events/adminreactadd.js`))(client).run(...args));
    client.on("aroflmsg", (...args) => new (require(`./events/aroflmsg.js`))(client).run(...args));
    client.on("guildCreate", (...args) => new (require(`./events/guildCreate.js`))(client).run(...args));
    client.on("guildDelete", (...args) => new (require(`./events/guildDelete.js`))(client).run(...args));
    client.on("helpinfydne", (...args) => new (require(`./events/helpinfydne.js`))(client).run(...args));
    client.on("hentaichekguild", (...args) => new (require(`./events/hentaichekguild.js`))(client).run(...args));
    client.on("hentaisend", (...args) => new (require(`./events/hentaisend.js`))(client).run(...args));
    client.on("hentaisendguild", (...args) => new (require(`./events/hentaisendguild.js`))(client).run(...args));
    client.on("message", (...args) => new (require(`./events/message.js`))(client).run(...args));
    client.on("messageUpdate", (...args) => new (require(`./events/messageUpdate.js`))(client).run(...args));
    client.on("mongobdready", (...args) => new (require(`./events/mongobdready.js`))(client).run(...args));
    client.on("reactcheck", (...args) => new (require(`./events/reactcheck.js`))(client).run(...args));
    client.on("ready", (...args) => new (require(`./events/ready.js`))(client).run(...args));
    client.on("selectguilds", (...args) => new (require(`./events/selectguilds.js`))(client).run(...args));
    client.on("ticketenable0", (...args) => new (require(`./events/ticketenable0.js`))(client).run(...args));
    client.on("ticketenable1", (...args) => new (require(`./events/ticketenable1.js`))(client).run(...args));
    client.on("ticketenable2", (...args) => new (require(`./events/ticketenable2.js`))(client).run(...args));
    client.on("ticketenable3", (...args) => new (require(`./events/ticketenable3.js`))(client).run(...args));
    client.on("ticketenable4", (...args) => new (require(`./events/ticketenable4.js`))(client).run(...args));
    client.on("ticketenable5", (...args) => new (require(`./events/ticketenable5.js`))(client).run(...args));
    client.on("ticketenable6", (...args) => new (require(`./events/ticketenable6.js`))(client).run(...args));
    client.on("ticketenable7", (...args) => new (require(`./events/ticketenable7.js`))(client).run(...args));
    client.on("ticketenable8", (...args) => new (require(`./events/ticketenable8.js`))(client).run(...args));
    client.on("ticketenable9", (...args) => new (require(`./events/ticketenable9.js`))(client).run(...args));

    client.login(client.config.token);

    // connect to mongoose database
    setTimeout(() => {
        mongoose.connect(client.config.mongoDB, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
            client.logger.log("Connected to the Mongodb database.", "log");
            client.emit('mongobdready');
            client.emit('hentaisend');
            client.emit('selectguilds');
            client.dashboard.load(client);
        }).catch((err) => {
            client.logger.log("Unable to connect to the Mongodb database. Error:"+err, "error");
        });
    }, 10000);
};

init();
const data = {};
data.config = client.config;

// if there are errors, log them
client.on("disconnect", () => client.logger.log("Bot is disconnecting...", "warn"))
    .on("reconnecting", () => client.logger.log("Bot reconnecting...", "log"))
    .on("error", (e) => client.logger.log(e, "error"))
    .on("warn", (info) => client.logger.log(info, "warn"));

// if there is an unhandledRejection, log them
process.on("unhandledRejection", (err) => {
    console.error(err);
});
//client.on("ready", async()=>{
//    client.guilds.forEach(async (guild) => {
//        if(guild.id === '674633771294785540')
//        {
//            guild.members.forEach(member => {
//                console.log(member.user.username);
//                member.addRole('731368909097271386');
//            });
//        }
//    });
//})