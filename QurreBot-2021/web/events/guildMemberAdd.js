const Discord = require("discord.js");
module.exports = class {
    constructor (client) {
        this.client = client;
    }
    async run (member) {
        try{
            let client = this.client;
            let guild = member.guild;
            let memberDB = await client.database.Members.findOne({id: member.id, guild: guild.id});
            if(!memberDB) return;
            if(memberDB.mute.muted && memberDB.mute.endDate > Date.now()){
                guild.channels.cache.forEach((channel) => {
                    channel.permissionOverwrites.edit(member.id, {
                        CONNECT: false,
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false,
                        CREATE_PUBLIC_THREADS: false,
                        CREATE_PRIVATE_THREADS: false,
                        SEND_MESSAGES_IN_THREADS: false
                    }).catch(() => {});
                });
            }
        }catch(e){
            let msg = `Произошла ошибка.\nИвент: guildMemberAdd\nКод ошибки:\n${e}`;
            this.client.channels.cache.get(this.client.config.errors_channel).send(msg);;
        }
    }
};