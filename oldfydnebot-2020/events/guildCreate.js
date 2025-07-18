const Discord = require("discord.js");

module.exports = class {

    constructor (client) {
      this.client = client;
    }
    
    async run (guild) {

        if(this.client.config.proMode){
            if((!this.client.config.proUsers.includes(guild.ownerID) || this.guilds.filter((g) => g.ownerID === guild.ownerID) > 1) && guild.ownerID !== this.client.config.owner.id){
                this.client.logger.log(guild.ownerID+" попытался пригласить fydne на свой сервер.");
                return guild.leave();
            }
        }
        
        guild = await guild.fetch();

        let messageOptions = {};

        let userData = await this.client.findOrCreateUser({ id: guild.ownerID });
        if(!userData.achievements.invite.achieved){
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

        let thanksEmbed = new Discord.MessageEmbed()
            .setAuthor("Спасибо, что добавили меня в свою гильдию!")
            .setDescription("Чтобы узнать больше обо мне, введите `"+this.client.config.prefix+"хелп` и посмотрите на команды администрирования!\nЧтобы изменить язык, введите `"+this.client.config.prefix+"язык [язык]`.\nIf you speak English, then use `"+this.client.config.prefix+"setlang english` to change the bot language")
            .setColor(this.client.config.embed.color)
            .setFooter(this.client.config.embed.footer)
            .setTimestamp();
        messageOptions.embed = thanksEmbed;

        guild.owner.send(messageOptions).catch((err) => {});

        let text = "Бота добавили на сервер **"+guild.name+"**, там **"+guild.members.filter((m) => !m.user.bot).size+"** человек (и "+guild.members.filter((m) => m.user.bot).size+" ботов)";

        // Sends log embed in the logs channel
        let logsEmbed = new Discord.MessageEmbed()
            .setAuthor(guild.name, guild.iconURL())
            .setColor("#32CD32")
            .setDescription(text);
        this.client.channels.get(this.client.config.support.logs).send(logsEmbed);
    }
}  