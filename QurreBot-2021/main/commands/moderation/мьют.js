const Command = require("../../base/Command.js");
const Discord = require("discord.js");
const ms = require("ms");
class mute extends Command {
    constructor (client) {
        super(client, {
            name: "мьют",
            dirname: __dirname,
            enabled: true,
            guildOnly: true,
            aliases: [ "mute", "мут" ],
			memberPermissions: [ "MANAGE_MESSAGES" ],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS", "MANAGE_CHANNELS" ],
            nsfw: false,
            ownerOnly: false,
            cooldown: 0
        });
    }
    async run (message, args, data) {
		const member = await this.client.resolveMember(args[0], message.guild);
		if(!member) return message.reply("пожалуйста, укажите действительного юзера.");
		if(member.id === message.author.id) return message.reply("гений, зачем себя мьютить, если можно просто не писать сообщения?");

		const memberPosition = member.roles.highest.position;
		const moderationPosition = message.member.roles.highest.position;
		if(moderationPosition < memberPosition) return message.reply("он по иерархии выше тебя, ты не можешь его замьютить.");

		const time = args[1];
		if(!time || isNaN(ms(time))) return message.reply("криво указано время.\nВозможные аргументы: `s`/`m`/`h`/`d`");

		let reason = args.slice(2).join(" ");
        if(!reason) reason = "Причина не указана";

		message.guild.channels.cache.forEach((channel) => {
			channel.updateOverwrite(member.id, {
				SEND_MESSAGES: false,
				ADD_REACTIONS: false,
				CONNECT: false
			}).catch(() => {});
		});
        await member.send(`Вы были замьючены **${message.author.username}#${message.author.discriminator}** на сервере **${message.guild.name}** на **${time}**.\nПричина: **${reason}** `).catch((err) => {});
        message.channel.send(`**${member.user.username}#${member.user.discriminator}** был замьючен админом **${message.author.username}#${message.author.discriminator}** на **${time}**. Причина: **${reason}**`);

		data.guild.mutes++;

        let memberData = await this.client.database.Members.findOne({id: member.user.id, guild: message.guild.id});
        if (!memberData) {
            let _md = await this.client.database.Members({id: member.user.id, guild: message.guild.id })
            await _md.save();
            memberData = await this.client.database.Members.findOne({id: member.user.id, guild: message.guild.id});
        }
		memberData.mute.muted = true;
		memberData.mute.endDate = Date.now()+ms(time);
		memberData.mute.case = data.guild.mutes;
		memberData.markModified("mute");
		await memberData.save();

		await data.guild.save();

		this.client.mutedUsers.set(`${member.id}${message.guild.id}`, memberData);

		if(data.guild.logs.channel !== ''){
			const channel = message.guild.channels.cache.get(data.guild.logs.channel);
			if(!channel) return;
			const embed = new Discord.MessageEmbed()
            .setAuthor(`Мьют | #${data.guild.mutes}`)
            .addField("Юзер", `\`${member.user.username}#${member.user.discriminator}\` (${member.user.toString()})`, true)
            .addField("Модератор", `\`${message.author.username}#${message.author.discriminator}\` (${message.author.toString()})`, true)
            .addField("Причина", reason, true)
            .addField("Длительность", time, true)
            .addField("Истекает", new Date(Date.now()+ms(time)), true)
            .setColor("#f44271");
			channel.send(embed);
		}
    }
}
module.exports = mute;