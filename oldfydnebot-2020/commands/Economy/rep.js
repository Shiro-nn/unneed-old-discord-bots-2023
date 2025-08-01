const Command = require("../../base/Command.js"),
Discord = require("discord.js");

class Rep extends Command {

    constructor (client) {
        super(client, {
            name: "репутация",
            description: (language) => language.get("REP_DESCRIPTION"),
            usage: (language) => language.get("REP_USAGE"),
            examples: (language) => language.get("REP_EXAMPLES"),
            dirname: __dirname,
            enabled: true,
            guildOnly: true,
            aliases: [ "реп","rep", "reputation" ],
            memberPermissions: [],
            botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            ownerOnly: false,
            cooldown: 3000
        });
    }

    async run (message, args, data) {

        // if the member is already in the cooldown db
        let isInCooldown = (data.userData.cooldowns || { rep: 0 }).rep;
        if(isInCooldown){
            /*if the timestamp recorded in the database indicating 
            when the member will be able to execute the order again 
            is greater than the current date, display an error message */
            if(isInCooldown > Date.now()){
                return message.channel.send(message.language.get("REP_ERR_COOLDOWN", message.language.convertMs(isInCooldown - Date.now())));
            }
        }

        let user = await this.client.resolveUser(args[0]);
        if(!user){
            return message.channel.send(message.language.get("ERR_INVALID_MEMBER"));
        }
        if(user.bot){
            return message.channel.send(message.language.get("ERR_BOT_USER"));
        }
        if(user.id === message.author.id){
            return message.channel.send(message.language.get("REP_ERR_YOURSELF"));
        }

        // Records in the database the time when the member will be able to execute the command again (in 12 hours)
        let toWait = Date.now() + 21600000;
        data.userData.cooldowns = {};
        data.userData.cooldowns.rep = toWait;
        data.userData.markModified("cooldowns");
        data.userData.save();
        
        let userData = await this.client.findOrCreateUser({ id: user.id });
        userData.rep++;
        if(!userData.achievements.rep.achieved){
            userData.achievements.rep.progress.now = (userData.rep > userData.achievements.rep.progress.total ? userData.achievements.rep.progress.total : userData.rep);
            if(userData.achievements.rep.progress.now >= userData.achievements.rep.progress.total){
                userData.achievements.rep.achieved = true;
                message.channel.send({ files: [ { name: "unlocked.png", attachment: "./assets/img/achievements/achievement_unlocked6.png"}]});
            }
            userData.markModified("achievements.rep");
        }
        await userData.save();

        message.channel.send(message.language.get("REP_SUCCESS", user.username));

    }

}

module.exports = Rep;