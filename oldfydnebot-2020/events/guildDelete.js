const Discord = require("discord.js");

module.exports = class {

    constructor (client) {
      this.client = client;
    }
    
    async run (guild) {
        
        let text = "Бота удалили с сервера **"+guild.name+"** там **"+guild.members.filter((m) => !m.user.bot).size+"** человек (и "+guild.members.filter((m) => m.user.bot).size+" ботов)";

        // Sends log embed in the logs channel
        let embed = new Discord.MessageEmbed()
            .setAuthor(guild.name, guild.iconURL())
            .setColor("#B22222")
            .setDescription(text);
        this.client.channels.get(this.client.config.support.logs).send(embed);
    }
}  