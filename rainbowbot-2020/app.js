const util = require("util"),
mongoose = require("mongoose");
const Discord = require('./dis.js');
const client = new Discord.Client();
const logger = require('./f/logger');
let mongoData = require("./mongo/guild");
const config = require("./config");
let botid = 1;
let first = true;
const init = async () => {
    client.login(config.tokens[0]);
    mongoose.connect(config.mongoDB, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
        logger.log("Connected to the Mongodb database.", "log");
        /*soon*/
        /*require("./dashboard/app").load();*/
    }).catch((err) => {
        logger.log(`Unable to connect to the Mongodb database. Error: ${err}`, "error");
    });
};

init();
const data = {};
data.config = config;
client.on("reconnecting", () => logger.log(`Bot reconnecting... #${botid}`, "log"))
    .on("error", (e) => logger.log(e, "error"))
    .on("warn", (info) => logger.log(info, "warn"));

process.on("unhandledRejection", (err) => {
    console.error(err);
});
var int = 0;
var rc = 255;
var gc = 0;
var bc = 0;
client.on("ready", () =>{
    client.user.setActivity(`https:// | #${botid}`)
    client.user.setStatus("idle");
    setInterval(() => {
        client.user.setActivity(`https:// | #${botid}`)
        client.user.setStatus("idle");
    }, 30000);
    if(first){
        lgbt();
        first = false;
    }
})

function lgbt() {
    setInterval(() => {
        try{
            client.guilds.forEach(async (guild) => {
                const guildData = await mongoData.findOne({ id: guild.id });
                if (guildData != null){
                    guildData.roles.forEach(async (role) => {
                        var rolec = guild.roles.get(role);
                        try{rolec.setColor(changecolor());}catch{int = 0; rc = 255; gc = 0; bc = 0; logger.log(info, "hmm, fail change color");}
                        antiban();
                    });
                } else if (guildData === null){
                    let nguildData = await CreateGuild({
						id : guild.id
					});
					await nguildData.save();
                }
            });
        }catch{}
    }, 1000);
}
function antiban() {
    if(config.tokens.length > 30){
        if(config.bots <= botid) botid = 0;
        client.destroy();
        client.login(config.tokens[botid]);
        botid++;
    }
}
function changecolor() {
    if(int < 256){
        int+=10;
        gc+=10;
        if(gc > 255) gc = 255;
        return rgbToHex(rc, gc, bc);
    }else if(int < 511){
        int+=10;
        rc-=10;
        if(rc < 0) rc = 0;
        return rgbToHex(rc, gc, bc);
    }else if(int < 766){
        int+=10;
        bc+=10;
        if(bc > 255) bc = 255;
        return rgbToHex(rc, gc, bc);
    }else if(int < 1021){
        int+=10;
        gc-=10;
        if(gc < 0) gc = 0;
        return rgbToHex(rc, gc, bc);
    }else if(int < 1276){
        int+=10;
        rc+=10;
        if(rc > 255) rc = 255;
        return rgbToHex(rc, gc, bc);
    }else if(int < 1531){
        int+=10;
        bc-=10;
        if(bc < 0) bc = 0;
        return rgbToHex(rc, gc, bc);
    }else{
        int = 0;
        rc = 255;
        gc = 0;
        bc = 0;
        if(config.bots <= botid) botid = 0;
        client.destroy();
        client.login(config.tokens[botid]);
        botid++;
        logger.log(`Bot changed... #${botid}`, "log")
        return '#00ffff';
    }
}
function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}
function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}
var CreateGuild = async(param, isLean) => {
	let guildsData = require("./mongo/guild");
	return new Promise(async function (resolve, reject){
		let guildData = new guildsData(param);
		await guildData.save();
		resolve(isLean ? guildData.toJSON() : guildData);
	});
}