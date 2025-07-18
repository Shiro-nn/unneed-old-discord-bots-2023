const Command = require("../../base/Command.js");
class ummute extends Command {
    constructor (client) {
        super(client, {
            name: "размьют",
            dirname: __dirname,
            enabled: true,
            guildOnly: true,
            aliases: [ "ummute", "размут" ],
			memberPermissions: [ "MANAGE_MESSAGES" ],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS", "MANAGE_CHANNELS" ],
            nsfw: false,
            ownerOnly: false,
            cooldown: 0
        });
    }
    async run (message, args, data) {
        let member = await this.client.resolveMember(args[0], message.guild);
		if(!member) return message.reply("пожалуйста, укажите действительного юзера.");

        let memberData = await this.client.database.Members.findOne({id: member.user.id, guild: message.guild.id});
        if(!memberData){
            let _md = await this.client.database.Members({id: member.user.id, guild: message.guild.id })
            await _md.save();
            memberData = await this.client.database.Members.findOne({id: member.user.id, guild: message.guild.id});
        }

        if(memberData.mute.muted){
            memberData.mute.endDate = Date.now();
            memberData.markModified("mute");
            await memberData.save();
            message.channel.send(`**${member.user.username}#${member.user.discriminator}** успешно размьючен.`);
            this.client.mutedUsers.delete(`${memberData.id}${memberData.guild}`);
            this.client.mutedUsers.set(`${memberData.id}${memberData.guild}`, memberData);
        }else{
            message.channel.send(`**${member.user.username}#${member.user.discriminator}** не замьючен.`);
        }
    }
}
module.exports = ummute;