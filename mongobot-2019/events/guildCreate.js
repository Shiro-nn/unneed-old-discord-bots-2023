const Discord = require("../dis.js");

module.exports = class {

    constructor(client) {
        this.client = client;
    }

    async run(guild) {
        let messageOptions = {};

        let userData = await this.client.findOrCreateUser({ id: guild.ownerID });
        if (!userData.achievements.invite.achieved) {
            userData.achievements.invite.progress.now += 1;
            userData.achievements.invite.achieved = true;
            messageOptions.files = [
                {
                    name: "unlocked.png",
                    attachment: "./assets/img/achievements/achievement_unlocked7.png"
                }
            ]
            userData.markModified("achievements.invite");
            await userData.save();
        }

        let thanksEmbed = new Discord.RichEmbed()
            .setAuthor("Спасибо, что добавили меня в свою гильдию!")
            .setDescription("Чтобы узнать больше обо мне, введите `" + this.client.config.prefix + "хелп` и посмотрите на команды бота!\n[Сайт по настройке бота](https://bot.fydne.xyz)")
            .setColor(this.client.config.embed.color)
            .setFooter(this.client.config.embed.footer)
            .setTimestamp();
        messageOptions.embed = thanksEmbed;

        guild.owner?.send(messageOptions).catch((err) => { });

        let text = `Бота добавили на сервер **${guild.name}**, там **${guild.memberCount}** юзеров`;

        // Sends log embed in the logs channel
        let logsEmbed = new Discord.RichEmbed()
            .setAuthor(guild.name, guild.iconURL)
            .setColor("#32CD32")
            .setDescription(text);
        this.client.channels.get(this.client.config.support.logs).send(logsEmbed);
    }
}  