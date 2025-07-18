const Discord = require("discord.js");

module.exports = class {

    constructor (client) {
      this.client = client;
    }
    
    async run (guild) {
        let sendthx = false;
        let messageOptions = {};
        messageOptions.embed = new Discord.MessageEmbed()
            .setAuthor("Спасибо, что добавили меня в свою гильдию!")
            .setDescription("Чтобы узнать больше обо мне, введите `"+this.client.config.prefix+"хелп` и посмотрите на команды бота!\n[Сайт по настройке бота](https://bot2.fydne.xyz)")
            .setColor(this.client.config.embed.color)
            .setFooter(this.client.config.embed.footer)
            .setTimestamp();
        messageOptions.files = [
            {
                name: "fydne.gif",
                attachment: "https://media.discordapp.net/attachments/676095371147214878/772306757787189278/redbigfydnelogo.gif"
            }
        ]
        var refreshIntervalId = setInterval(() => {
            if(!sendthx){
                if(guild.owner !== undefined && guild.owner !== null){
                    sendthx = true;
                    guild.owner?.send(messageOptions).catch((err) => {});
                    clearInterval(refreshIntervalId);
                }
            }
        }, 1000);

        let text = `Бота добавили на сервер **${guild.name}**, там **${guild.cache.memberCount}** юзеров`;

        let messagelogsOptions = {};
        messagelogsOptions.embed = new Discord.MessageEmbed()
            .setAuthor(guild.name, guild.iconURL)
            .setColor("#32CD32")
            .setDescription(text);
        this.client.channels.cache.get(this.client.config.support.logs)?.send(messagelogsOptions);
    }
}  