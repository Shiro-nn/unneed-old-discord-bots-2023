const Discord = require("discord.js");
module.exports = class {
    constructor(client) {
        this.client = client;
    }
    async run(oldMember, newMember) {
        try{
            let client = this.client;
            let guild = newMember.guild;
            let guildDB = await client.database.Guilds.findById(guild.id)
            if(!guildDB) return;
            if (oldMember.nickname !== newMember.nickname && !newMember.roles.cache.some((r) => guildDB.logs.ignored.includes(r.id))) {
                let old = '';
                let newn = '';
                if (oldMember.nickname !== null) old = `**Старый ник:**\n${oldMember.nickname}\n`;
                if (newMember.nickname !== null) newn = `**Новый ник:**\n${newMember.nickname}`;
                const embed = new Discord.MessageEmbed()
                .setAuthor("Изменен никнейм »  " + oldMember.user.username + "#" + oldMember.user.discriminator, oldMember.user.displayAvatarURL({ format: 'png', dynamic: true }))
                .setColor('#2f3136')
                .setDescription(`${old}${newn}`)
                .setTimestamp();
                const ch =  guild.channels.cache.get(guildDB.logs.channel);
                if(ch) await ch.send(embed);
            }
        }catch(e){
            let msg = `Произошла ошибка.\nИвент: guildMemberUpdate\nКод ошибки:\n${e}`;
            this.client.shard.broadcastEval(` this.channels.cache.get('809399907211280414').send(\`${msg}\`); `);
        }
    }
};