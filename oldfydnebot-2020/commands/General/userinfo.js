const Command = require("../../base/Command.js"),
Discord = require("discord.js"),
fetch = require("node-fetch");

class Userinfo extends Command {

    constructor (client) {
        super(client, {
            name: "юзер",
            description: (language) => language.get("USERINFO_DESCRIPTION"),
            usage: (language) => language.get("USERINFO_USAGE"),
            examples: (language) => language.get("USERINFO_EXAMPLES"),
            dirname: __dirname,
            enabled: true,
            guildOnly: false,
            aliases: [ "userinfo","ui" ],
            memberPermissions: [],
            botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            ownerOnly: false,
            cooldown: 5000
        });
    }

    async run (message, args, data) {
        
        let displayPresence = true;

        let isID = !isNaN(args[0]);

        var user;
        if(!args[0]){
            user = message.author;
        }
        if(message.mentions.users.first()){
            user = message.mentions.users.first();
        }
        if(isID && !user){
            user = message.client.users.get(args[0]);
            if(!user){
                user = await message.client.users.fetch(args[0], true);
                displayPresence = false;
            }
        }
        
        if(!user){
            return message.channel.send(message.language.get("USERINFO_ERR_ID", args[0]));
        }

        let member = null;
        if(message.guild){
            member = await message.guild.members.fetch(user).catch((err) => {});
        }

        let embed = new Discord.MessageEmbed()
            .setAuthor(user.tag, user.displayAvatarURL())
            .setThumbnail(user.displayAvatarURL())
            .addField(message.language.get("USERINFO_FIELDS")[0], user.username, true)
            .addField(message.language.get("USERINFO_FIELDS")[1], user.discriminator, true)
            .addField(message.language.get("USERINFO_FIELDS")[2], (user.bot ? message.language.get("UTILS").YES : message.language.get("UTILS").NO), true)
            .addField(message.language.get("USERINFO_FIELDS")[4], message.language.printDate(user.createdAt), true)
            .addField(message.language.get("USERINFO_FIELDS")[3], user.displayAvatarURL())
            .setColor(data.config.embed.color)
            .setFooter(data.config.embed.footer);

        if(displayPresence){
            embed.addField(message.language.get("USERINFO_FIELDS")[5], (user.presence.activity ? user.presence.activity.name : message.language.get("USERINFO_NO_GAME")), true)
            .addField(message.language.get("USERINFO_FIELDS")[6], message.language.get("UTILS").STATUS[user.presence.status], true);
        }
            
        if(member){
            embed.addField(message.language.get("USERINFO_FIELDS")[7], (member.roles.highest ? member.roles.highest : message.language.get("USERINFO_NO_ROLE")), true)
            .addField(message.language.get("USERINFO_FIELDS")[8], message.language.printDate(member.joinedAt),true)
            .addField(message.language.get("USERINFO_FIELDS")[11], member.displayHexColor, true)
            .addField(message.language.get("USERINFO_FIELDS")[9], (member.nickname ? member.nickname : message.language.get("USERINFO_NO_NICKNAME")), true)
            .addField(message.language.get("USERINFO_FIELDS")[10], (member.roles.size > 10 ? member.roles.map((r) => r).slice(0, 9).join(", ")+message.language.get("USERINFO_MORE_ROLES", member.roles.size - 10) : (member.roles.size < 1) ? message.language.get("USERINFO_NO_ROLE") : member.roles.map((r) => r).join(", ")));
        }

        if(user.bot && message.client.config.apiKeys.dbl && (message.client.config.apiKeys.dbl !== "")){
            let res = await fetch("https://discordbots.org/api/bots/"+user.id, {
                headers: { "Authorization": message.client.config.apiKeys.dbl }
            });
            let data = await res.json();
            if(!data.error){
                embed.addField(message.language.get("USERINFO_FIELDS")[12], data.shortdesc, true)
                .addField(message.language.get("USERINFO_FIELDS")[13], message.language.get("USERINFO_STATS", data.monthlyPoints || 0, data.server_count || 0, data.shards || [], data.lib || "unknown"), true)
                .addField(message.language.get("USERINFO_FIELDS")[14], message.language.get("USERINFO_LINKS", data.support, data.invite, data.github, data.website), true);
            }
        }

        message.channel.send(embed);
    }

}

module.exports = Userinfo;