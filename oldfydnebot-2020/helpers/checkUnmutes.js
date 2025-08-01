const Discord = require("discord.js");

/* THIS CHECK IF THERE IS A USER TO UNMUTE */

module.exports = {
    
    /**
     * Starts checking...
     * @param {object} client The Discord Client instance
     */
    init(client){
        setInterval(async () => {
            if(client.membersData === undefined) return;
            let muted = await client.membersData.find({ "mute.muted": true, "mute.endDate": { $lte: Date.now() } });
            muted.forEach(async (memberData) => {
                let guild = client.guilds.get(memberData.guildID);
                if(!guild) return;
                let member = guild.members.get(memberData.id) || await guild.members.fetch(memberData.id).catch((err) => {
                    memberData.mute = {
                        muted: false,
                        endDate: null,
                        case: null
                    };
                    memberData.save();
                    client.logger.log("[unmute] "+memberData.id+" cannot be found.");
                });
                if(!member) return;
                let guildData = await client.findOrCreateGuild({ id: guild.id });
                guild.channels.forEach((channel) => {
                    let permOverwrites = channel.permissionOverwrites.get(member.id);
                    if(permOverwrites) permOverwrites.delete();
                });
                let language = new(require(`../languages/${guildData.language}`));
                let embed = new Discord.MessageEmbed()
                    .setDescription(language.get("UNMUTE_SUCCESS", memberData.id, memberData.mute.case))
                    .setColor("#f44271")
                    .setFooter(guild.client.config.embed.footer);
                let channel = guild.channels.get(guildData.plugins.modlogs);
                if(channel){
                    channel.send(embed);
                }
                memberData.mute = {
                    muted: false,
                    endDate: null,
                    case: null
                };
                memberData.save();
            });
        }, 5000);
    }

};