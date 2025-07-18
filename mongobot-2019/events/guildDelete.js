const Discord = require("../dis.js");

module.exports = class {

    constructor(client) {
        this.client = client;
    }

    async run(guild) {

        let text = `Бота удалили с сервера **${guild.name}**, там **${guild.memberCount}** юзеров`;

        // Sends log embed in the logs channel
        let embed = new Discord.RichEmbed()
            .setAuthor(guild.name, guild.iconURL)
            .setColor("#B22222")
            .setDescription(text);
        this.client.channels.get(this.client.config.support.logs).send(embed);
    }
}