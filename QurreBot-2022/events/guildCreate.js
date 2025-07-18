const Discord = require("discord.js");
module.exports = class {
    constructor (client) {
      this.client = client;
    }
    async run (guild) {
        let server = await this.client.database.Guilds.findById(guild.id)
        if (!server) {
            server = new this.client.database.Guilds({_id: guild.id})
            await server.save()
        }
        setTimeout(() => {
            const embed = new Discord.MessageEmbed()
            .setAuthor(guild.name, guild.iconURL())
            .setColor("#32CD32")
            .setDescription(`Бота добавили на сервер **${guild.name}**, там **${guild.memberCount}** юзеров.`);
            this.channels.cache.get(this.client.config.support.logs)?.send({embeds: [embed]});
        }, 0);

        let sendthx = false;
        const embd = new Discord.MessageEmbed()
            .setAuthor("Спасибо, что добавили меня в свою гильдию!")
            .setDescription(`Чтобы узнать больше обо мне, введите \`${this.client.config.prefix}хелп\`.\n[Сайт по настройке бота](${this.client.config.dashboard.baseURL})`)
            .setColor(this.client.config.embed.color)
            .setImage("https://cdn.fydne.xyz/bot/logo-qurre.gif")
            .setTimestamp();
        var refreshIntervalId = setInterval(() => {
            if(!sendthx){
                if(guild.owner !== undefined && guild.owner !== null){
                    sendthx = true;
                    guild.owner?.send({embeds: [embd]}).catch((err) => {});
                    clearInterval(refreshIntervalId);
                }
            }
        }, 1000);
    }
}