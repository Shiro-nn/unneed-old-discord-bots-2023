const Discord = require("discord.js");
module.exports = class {
    constructor (client) {
        this.client = client;
    }
    async run (member) {
        try{
            let client = this.client;
            let guild = member.guild;
            let guildDB = await client.database.Guilds.findById(guild.id)
            if(!guildDB) return;
            const embed = new Discord.MessageEmbed()
            .setColor("#16ff00")
            .setAuthor("Новый участник »  " + member.user.username + "#" + member.user.discriminator, member.user.displayAvatarURL({ format: 'png', dynamic: true }))
            .setDescription(`Участник ${member} присоединился к серверу`)
            .setFooter(`Id участника: ${member.id}`)
            .setTimestamp();
            const ch =  guild.channels.cache.get(guildDB.logs.channel);
            if(ch) await ch.send({embeds: [embed]});
        }catch(e){
            let msg = `Произошла ошибка.\nИвент: guildMemberAdd\nКод ошибки:\n${e}`;
            this.client.channels.cache.get(this.client.config.errors_channel).send(msg);;
        }
    }
};