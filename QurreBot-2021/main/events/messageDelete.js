const Discord = require("discord.js");
module.exports = class {
    constructor(client) {
        this.client = client;
    }
    async run(message) {
        try {
            let anti_flood = [];
            if(message.author.bot) return;
            if(message.cleanContent === '') return;
            let client = this.client;
            let guild = message.guild;
            let guildDB = await client.database.Guilds.findById(guild.id)
            if(!guildDB) return;
            if(!message.member) return;
            if(!message.member.roles.cache.some((r) => guildDB.logs.ignored.includes(r.id))) {
                if(anti_flood.filter(x => x.user == message.author.id).length > 0){
                    if(Date.now() < new Date(anti_flood.find(x => x.user == message.author.id).date + 30000).getTime()) return;
                    else anti_flood.find(x => x.user == message.author.id).date = Date.now();
                }else{anti_flood.push({user: message.author.id, date: Date.now()})}
                const embed = new Discord.MessageEmbed()
                .setAuthor("ᴍᴇꜱꜱᴀɢᴇ ᴅᴇʟᴇᴛᴇᴅ »  " + message.author.username + "#" + message.author.discriminator, message.author.displayAvatarURL({ format: 'png', dynamic: true }))
                .setColor('#ffbc00')
                .setDescription(`:wastebasket: Сообщение <@${message.author.id}> в <#${message.channel.id}> было удалено.\n`)
                .addField("**Сообщение**", `${message.cleanContent}`)
                const ch =  guild.channels.cache.get(guildDB.logs.channel);
                if(ch) await ch.send(embed);
            }
        }catch(e){
            let msg = `Произошла ошибка.\nИвент: messageDelete\nКод ошибки:\n${e}`;
            this.client.shard.broadcastEval(` this.channels.cache.get('809399907211280414').send(\`${msg}\`); `);
        }
    }
};