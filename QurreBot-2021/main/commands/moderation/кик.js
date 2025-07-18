const Command = require("../../base/Command.js");
const Discord = require("discord.js");
class kick extends Command {
    constructor (client) {
        super(client, {
            name: "кик",
            dirname: __dirname,
            enabled: true,
            guildOnly: true,
            aliases: [ "kick" ],
            memberPermissions: [ "KICK_MEMBERS" ],
            botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS", "KICK_MEMBERS" ],
            nsfw: false,
            ownerOnly: false,
            cooldown: 0
        });
    }
    async run (message, args, data) {
		const user = await this.client.resolveMember(args[0], message.guild);
        if(!user) return message.reply("пожалуйста, укажите действительного юзера.");
        if(user.id === message.author.id) return message.reply("гений, зачем себя кикать, если можно ливнуть?");
		const memberPosition = user.roles.highest.position;
		const moderationPosition = message.member.roles.highest.position;
		if(moderationPosition < memberPosition) return message.reply("он по иерархии выше тебя, ты не можешь его кикнуть.");
        let reason = args.slice(1).join(" ");
        if(!reason) reason = "Причина не указана";
		let member = user;
        if(member && !member.kickable) return message.channel.send('<:thinking:781966946379104297>, я не могу его кикнуть.');
        await user.send(`Вас кикнул **${message.author.username}#${message.author.discriminator}** с сервера **${message.guild.name}**.\nПричина: **${reason}** `).catch((err) => {});
        member.kick(reason).then(async() => {
            data.guild.kicks++;
            await data.guild.save();
            message.channel.send(`**${user.user.username}#${user.user.discriminator}** был кикнут админом **${message.author.username}#${message.author.discriminator}**. Причина: **${reason}**`);
            if(data.guild.logs.channel !== ''){
                let channel = message.guild.channels.cache.get(data.guild.logs.channel);
                if(!channel) return;
                let embed = new Discord.MessageEmbed()
                    .setAuthor(`Кик | #${data.guild.kicks}`)
                    .addField("Юзер", `\`${user.user.username}#${user.user.discriminator}\` (${user.toString()})`, true)
                    .addField("Модератор", `\`${message.author.username}#${message.author.discriminator}\` (${message.author.toString()})`, true)
                    .addField("Причина", reason, true)
                    .setColor("#e88709");
                channel.send({embed});
            }
        }).catch((e) => {
            message.channel.send('<:thinking:781966946379104297>, я не смог его кикнуть.');
            let msg = `Произошла ошибка.\nКоманда: кик\nКод ошибки:\n${e}`;
            this.client.shard.broadcastEval(` this.channels.cache.get('809399907211280414').send(\`${msg}\`); `);
        });
    }
}
module.exports = kick;