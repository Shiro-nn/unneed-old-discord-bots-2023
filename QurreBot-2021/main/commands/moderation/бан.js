const Command = require("../../base/Command.js");
const Discord = require("discord.js");
class ban extends Command {
    constructor (client) {
        super(client, {
            name: "бан",
            dirname: __dirname,
            enabled: true,
            guildOnly: true,
            aliases: [ "ban" ],
            memberPermissions: [ "BAN_MEMBERS" ],
            botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS", "BAN_MEMBERS" ],
            nsfw: false,
            ownerOnly: false,
            cooldown: 0
        });
    }
    async run (message, args, data) {
		const user = await this.client.resolveMember(args[0], message.guild);
        if(!user) return message.reply("пожалуйста, укажите действительного юзера.");
        if(user.id === message.author.id) return message.reply("гений, зачем себя банить, если можно ливнуть?");
		const memberPosition = user.roles.highest.position;
		const moderationPosition = message.member.roles.highest.position;
		if(moderationPosition < memberPosition) return message.reply("он по иерархии выше тебя, ты не можешь его забанить.");
        let banned = await message.guild.fetchBans();
        if(banned.some((m) => m.user.id === user.id)) return message.channel.send(`**${user.username}** уже забанен.`);
        let reason = args.slice(1).join(" ");
        if(!reason) reason = "Причина не указана";
		let member = user;
        if(member && !member.bannable) return message.channel.send('<:thinking:781966946379104297>, он не забанился.');
        await user.send(`Вы были забанены **${message.author.username}#${message.author.discriminator}** на сервере **${message.guild.name}**.\nПричина: **${reason}** `).catch((err) => {});
        message.guild.members.ban(user, {reason}).then(async() => {
            data.guild.bans++;
            await data.guild.save();
            message.channel.send(`**${user.user.username}#${user.user.discriminator}** был забанен админом **${message.author.username}#${message.author.discriminator}**. Причина: **${reason}**`);
            if(data.guild.logs.channel !== ''){
                let channel = message.guild.channels.cache.get(data.guild.logs.channel);
                if(!channel) return;
                let embed = new Discord.MessageEmbed()
                    .setAuthor(`БАН | #${data.guild.bans}`)
                    .addField("Юзер", `\`${user.user.username}#${user.user.discriminator}\` (${user.toString()})`, true)
                    .addField("Модератор", `\`${message.author.username}#${message.author.discriminator}\` (${message.author.toString()})`, true)
                    .addField("Причина", reason, true)
                    .setColor("#e02316");
                channel.send({embed});
            }
        }).catch((e) => {
            message.channel.send('<:thinking:781966946379104297>, он не забанился.');
            let msg = `Произошла ошибка.\nКоманда: бан\nКод ошибки:\n${e}`;
            this.client.shard.broadcastEval(` this.channels.cache.get('809399907211280414').send(\`${msg}\`); `);
        });
    }
}
module.exports = ban;