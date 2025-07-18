const { Client: Joker } = require("blague.xyz"),
util = require("util"),
fs = require("fs"),
readdir = util.promisify(fs.readdir),
AmeClient = require("amethyste-api"),
mongoose = require("mongoose");

// Load fydne class
const fydne = require("./base/fydne"),
client = new fydne();

const init = async () => {

    // Search for all commands
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

    // Then we load events, which will include our message and ready event.
    const evtFiles = await readdir("./events/");
    evtFiles.forEach((file) => {
        const eventName = file.split(".")[0];
        const event = new (require(`./events/${file}`))(client);
        client.on(eventName, (...args) => event.run(...args));
        delete require.cache[require.resolve(`./events/${file}`)];
    });

    client.login(client.config.token); // Log in to the discord api

    // connect to mongoose database
    mongoose.connect(client.config.mongoDB, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
        client.logger.log("Connected to the Mongodb database.", "log");
    }).catch((err) => {
        client.logger.log("Unable to connect to the Mongodb database. Error:"+err, "error");
    });

    if(client.config.apiKeys.amethyste){
        client.AmeAPI = new AmeClient(client.config.apiKeys.amethyste);
    }

    if(client.config.apiKeys.blagueXYZ){
        client.joker = new Joker(client.config.apiKeys.blagueXYZ, {
            defaultLanguage: "ru"
        });
    }

    if(client.config.apiKeys.simpleYoutube){
        const { Player } = require("discord-player");
        client.player = new Player(client, client.config.apiKeys.simpleYoutube, {
            leaveOnEmpty: false
        });
    }

};

init();
const data = {};
data.config = client.config;
const MusicClient = require("./m.js"),
cmusic = new MusicClient(client, {
    apiKey: client.config.apiKeys.simpleYoutube,
    defVolume: 150,
    bitRate: 24000,
    maxHistory: 50,
    maxQueue: 100,
    searchFilters: ['cover', 'live', 'remix', 'mix', 'parody', 'hour', 'extended', 'trailer'],
    color: data.config.embed.color,
    logger: console.log()
});
client.on('message', async message => {

    if(message.guild){
        // Gets guild data
        let guild = await client.findOrCreateGuild({ id: message.guild.id });
        data.guild = guild;
    }
    let prefix = client.functions.getPrefix(message, data);
    if(!prefix){
        return;
    }
    let arq = message.content.slice((typeof prefix === "string" ? prefix.length : 0)).trim().split(/ +/g);
    let cmq = arq.shift().toLowerCase();
    let arg = message.content.slice();
    if(cmq == `очистить`)
    {
        cmusic.clearFunction(message);
    }
    if(cmq == `история`)
    {
        cmusic.showHistoryFunction(message);
    }
    if(cmq == `ливнуть`)
    {
        cmusic.leaveFunction(message);
    }
    if(cmq == `си`)
    {
        cmusic.nowPlayingFunction(message);
    }
    if(cmq == `пауза`)
    {
        cmusic.pauseFunction(message);
    }
    if(cmq == `плей`)
    {
    let ar = message.content.slice((typeof prefix === "string" ? cmq.length+1 : 0)).trim().split(/ +/g);
    let name = ar.join(" ");
    cmusic.playFunction(message, name);
    }
    if(cmq == `плейлист`)
    {
        cmusic.showQueueFunction(message);
    }
    if(cmq == `пер`)
    {
        cmusic.shuffleFunction(message);
    }
    if(cmq == `перемешать`)
    {
        cmusic.shuffleFunction(message);
    }
    if(cmq == `скип`)
    {
        cmusic.skipFunction(message);
    }
    if(cmq == `стоп`)
    {
        cmusic.stopFunction(message);
    }
    if(cmq == `громкость`)
    {
        let arq = message.content.slice((typeof prefix === "string" ? prefix.length : 0)).trim().split(/ +/g);
        const volume = arq.join(" ");
        if (volume <= 0 && volume >= 200)
        {
            return true;
        }
        cmusic.volumeFunction(message, volume);
    }
    if(cmq == `звук`)
    {
        let arq = message.content.slice((typeof prefix === "string" ? prefix.length : 0)).trim().split(/ +/g);
        const volume = arq.join(" ");
        if (volume <= 0 && volume >= 200)
        {
            return true;
        }
        cmusic.volumeFunction(message, volume);
    }
});
// if there are errors, log them
client.on("disconnect", () => client.logger.log("Bot is disconnecting...", "warn"))
    .on("reconnecting", () => client.logger.log("Bot reconnecting...", "log"))
    .on("error", (e) => client.logger.log(e, "error"))
    .on("warn", (info) => client.logger.log(info, "warn"));

// if there is an unhandledRejection, log them
process.on("unhandledRejection", (err) => {
    console.error(err);
});
