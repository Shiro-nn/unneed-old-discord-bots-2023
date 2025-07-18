const Discord = require("discord.js");
module.exports = {
	async init(client){
		setInterval(async () => {
			const users = await client.database.Members.find({"mute.muted": true});
			users.filter(x => x.mute.endDate <= Date.now()).forEach(async (memberData) => {
				const guild = client.guilds.cache.get(memberData.guild);
				if(!guild) return;
				const member = guild.members.cache.get(memberData.id) || await guild.members.fetch(memberData.id).catch(() => {
					memberData.mute = {
						muted: false,
						endDate: null,
						case: null
					};
					memberData.save();
					client.logger.log("[unmute] "+memberData.id+" cannot be found.");
					return;
				});
				const guildData = await client.database.Guilds.findById(guild.id);
				guild.data = guildData;
				if(member){
					guild.channels.cache.forEach((channel) => {
						try{channel.permissionOverwrites.delete(member.id);}catch{}
					});
				}
				const user = member ? member.user : await client.shardManager.getUsers(memberData.id);
				const embed = new Discord.MessageEmbed()
                .setAuthor(`Размьют | #${memberData.mute.case}`)
                .setDescription(`**${user.username}#${user.discriminator}(${user.toString()})** размьючен.`)
                .setColor("#f44271");
				const channel = guild.channels.cache.get(guildData.logs.channel);
				if(channel) channel.send({embeds:[embed]});
				memberData.mute = {
					muted: false,
					endDate: null,
					case: null
				};
				await memberData.save();
			});
		}, 3000);
	}
};