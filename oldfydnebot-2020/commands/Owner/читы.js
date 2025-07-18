const Command = require("../../base/Command.js"),
Discord = require("discord.js");

class cheats extends Command {

    constructor (client) {
        super(client, {
            name: "читы",
            description: (language) => language.get("cheats_DESCRIPTION"),
            usage: (language) => language.get("cheats_USAGE"),
            examples: (language) => language.get("cheats_EXAMPLES"),
            dirname: __dirname,
            enabled: true,
            guildOnly: false,
            aliases: [ "cheats" ],
            memberPermissions: [],
            botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            ownerOnly: true,
            cooldown: 5000
        });
    }

    async run (message, args, data) {

        data.memberData.workStreak = (data.memberData.workStreak || 0) + 1;
        await data.memberData.save();

        let embed = new Discord.MessageEmbed()
            .setFooter(message.language.get("WORK_FOOTER"), message.author.displayAvatarURL())
            .setColor(data.config.embed.color);
        let won = args[0];

        data.memberData.money = won;
        data.memberData.money = won;
        data.memberData.save();
        data.userData.rep = won;
        data.userData.save();
        let messageOptions = { embed };
        if(!data.userData.achievements.work.achieved){
            data.userData.achievements.work.progress.now += 1;
            if(data.userData.achievements.work.progress.now === data.userData.achievements.work.progress.total){
                messageOptions.files = [
                    {
                        name: "unlocked.png",
                        attachment: "./assets/img/achievements/achievement_unlocked1.png"
                    }
                ];
                data.userData.achievements.work.achieved = true;
            }
            data.userData.markModified("achievements.work");
            data.userData.save();
        }

        // Send the embed in the current channel
        message.channel.send(messageOptions);

    }

}

module.exports = cheats;