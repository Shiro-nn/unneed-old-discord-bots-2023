const Discord = require("discord.js");
module.exports = class {
    constructor(client) {
        this.client = client;
    }
    async run(member) {
        try {
            let client = this.client;
            let guild = member.guild;
            const embed = new Discord.MessageEmbed()
            .setColor("#fffa00")
            .setAuthor("Лив с сервера »  " + member.user.username + "#" + member.user.discriminator, member.user.displayAvatarURL({ format: 'png', dynamic: true }))
            .setDescription(`Участник ${member} покинул сервер`)
            .setFooter(`Id участника: ${member.id}`)
            .setTimestamp();
            let guildDB = await client.database.Guilds.findById(guild.id)
            if(!guildDB) return;
            const ch =  guild.channels.cache.get(guildDB.logs.channel);
            if(ch) await ch.send(embed);
        } catch (e){
            let msg = `Произошла ошибка.\nИвент: guildMemberRemove\nКод ошибки:\n${e}`;
            this.client.shard.broadcastEval(` this.channels.cache.get('809399907211280414').send(\`${msg}\`); `);
        }
    }
};