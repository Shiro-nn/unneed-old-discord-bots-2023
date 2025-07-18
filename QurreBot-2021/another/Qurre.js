const Discord = require("discord.js");
const fydne = require("./base/fydne"),
client = new fydne({
	ws:{intents: new Discord.Intents(Discord.Intents.ALL)}
});
const axios = require('axios');
const DsData = require("./base/discords");
const mongoose = require("mongoose");
const cdn_host = 'https://cdn.scpsl.store';
const init = async () => {
    client.loadEvents(`${__dirname}/events`);
    client.login(client.config.token);
    mongoose.connect('mongodb://fydne:KGJSf7sjsasfiuh76e76saidty77t7Gydau@mongo.scpsl.store/login?authSource=admin',
    {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
        console.log("Connected to the MongoDB database.");
        setTimeout(() => UpdateDiscords(), 5000);
        UpdateDiscords();
    }).catch((err) => console.error(`Unable to connect to the Mongodb database. Error: ${err}`));
};
init();
setInterval(() => UpdateDiscords(), 86400000);
async function UpdateDiscords() {
    let _id = 0;
    //console.log(client.users.cache.find(x => x.id == '784745992444444723'));return;
    client.users.cache.forEach(user => {
        let int = (_id+1) * 2000;
        _id++;
        var length = Math.ceil((Math.log(int)/Math.log(2))/8);
        if(length > 32){
            console.log(`${length} byte`, "warn");
            int = 0;
        }
        setTimeout(() => UpdateDiscord(user), int);
    });
}
async function UpdateDiscord(user) {
    try{
        let link = user.displayAvatarURL({ format: 'png', dynamic: true });
        let name = link.split('.')[link.split('.').length - 1];
        let cdn_link = `${cdn_host}/avatar/discord/${user.id}/${user.avatar}.${name}`;
        let data = await DsData.findOne({id: user.id});
        if(data === null || data === undefined) {
            data = new DsData({id: user.id});
        }
        if(data.user !== user.username ||
            data.discriminator !== user.discriminator ||
            data.avatar !== cdn_link){
            axios.post(`${cdn_host}/upload/link`, {}, {
                params: {
                    link: link,
                    name: `${user.avatar}.${name}`,
                    dir: `avatar/discord/${user.id}`
                }
            });
            data.user = user.username;
            data.discriminator = user.discriminator;
            data.avatar = cdn_link;
            await data.save();
        }
    }catch(e){
        let msg = `Произошла ошибка в обновлении бд.\nМетод: UpdateDiscord\nМодуль: Another\nКод ошибки:\n${e}`;
        this.client.guilds.cache.get('616697847261298688').channels.cache.get('809399907211280414').send(msg);
    }
}
process.on("unhandledRejection", (err) => console.error(err));
process.on("uncaughtException", (err) => console.error(err));