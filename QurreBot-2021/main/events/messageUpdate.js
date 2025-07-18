const Discord = require("discord.js");
module.exports = class {
    constructor (client) {
        this.client = client;
    }
    async run (oldMessage, newMessage) {
		if(oldMessage.content === newMessage.content) return;
        this.client.emit('message', newMessage);
        try {
            if(oldMessage.author.bot) return;
            let client = this.client;
            let guild = newMessage.guild;
            let guildDB = await client.database.Guilds.findById(guild.id)
            if(!guildDB) return;
            if(!newMessage.member) return;
            if(!newMessage.member.roles.cache.some((r) => guildDB.logs.ignored.includes(r.id))) {
                const embed = new Discord.MessageEmbed()
                .setAuthor("Изменено сообщение »  " + oldMessage.author.username + "#" + oldMessage.author.discriminator, oldMessage.author.displayAvatarURL({ format: 'png', dynamic: true }))
                .setColor('#00acff')
                .setDescription(`**Старое сообщение:**\n${oldMessage.content}\n**Новое сообщение:**\n${newMessage.content}`)
                .setTimestamp();
                const ch =  guild.channels.cache.get(guildDB.logs.channel);
                if(ch) await ch.send(embed);
            }
        }catch(e){
            let msg = `Произошла ошибка.\nИвент: messageUpdate\nКод ошибки:\n${e}`;
            this.client.shard.broadcastEval(` this.channels.cache.get('809399907211280414').send(\`${msg}\`); `);
        }
    }
};