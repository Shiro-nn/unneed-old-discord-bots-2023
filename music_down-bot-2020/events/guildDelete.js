const Discord = require("discord.js");

module.exports = class {

    constructor (client) {
      this.client = client;
    }
    
    async run (guild) {
        let text = `Бота удалили с сервера **${guild.name}**, там **${guild.cache?.memberCount}** юзеров`;
        let messageOptions = {};
        messageOptions.embed = new Discord.MessageEmbed()
            .setAuthor(guild.name, guild.iconURL)
            .setColor("#B22222")
            .setDescription(text);
        this.client.channels.cache.get(this.client.config.support.logs).send(messageOptions);
    }
}