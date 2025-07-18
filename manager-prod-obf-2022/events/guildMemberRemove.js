const Discord = require("discord.js");
const adminsData = require("../base/admins");
module.exports = class {
    constructor (client) {
        this.client = client;
    }
    async run (member) {
        try{
            if(member.guild.id != this.client.config.guildid) return;
            const udata = await this.client.findAccount({ discord: member.user.id });
            if(udata == null || udata == undefined) return;
            const adm = await adminsData.findOne({id: udata.id});
            if(adm == null || adm == undefined) return;
            if(adm.sl.trainee || adm.sl.helper || adm.sl.mainhelper || adm.sl.admin || adm.sl.mainadmin || adm.sl.selection || adm.sl.owner ||
                adm.slhrp.trainee || adm.slhrp.helper || adm.slhrp.mainhelper || adm.slhrp.admin || adm.slhrp.mainadmin || adm.slhrp.selection || adm.slhrp.owner){
                    adm.sl.trainee = false;
                    adm.sl.helper = false;
                    adm.sl.mainhelper = false;
                    adm.sl.admin = false;
                    adm.sl.mainadmin = false;
                    adm.sl.selection = false;
                    adm.sl.control = false;
                    adm.sl.bans = 0;
                    adm.sl.kicks = 0;
                    adm.sl.punishments = 0;
                    adm.sl.time = 0;
                    adm.sl.slaves = 0;
                    adm.sl.warnings = 0;
                    
                    adm.slhrp.trainee = false;
                    adm.slhrp.helper = false;
                    adm.slhrp.mainhelper = false;
                    adm.slhrp.admin = false;
                    adm.slhrp.mainadmin = false;
                    adm.slhrp.selection = false;
                    adm.slhrp.control = false;
                    adm.slhrp.bans = 0;
                    adm.slhrp.kicks = 0;
                    adm.slhrp.punishments = 0;
                    adm.slhrp.time = 0;
                    adm.slhrp.slaves = 0;
                    adm.slhrp.warnings = 0;

                    adm.control = false;
                    adm.owner = false;

                    adm.markModified('sl');
                    adm.markModified('slhrp');
                    await adm.save();

                    udata.achievements.filter(x => x == 'staff').forEach(achievement => udata.achievements.pull(achievement));
                    await udata.save();
                    const embed = new Discord.MessageEmbed()
                    .setDescription(`${member} уволен ${this.client.config.agree}\nПричина: Лив с сервера`)
                    .setColor('#ff0000')
                    member.guild.channels.cache.get('745653433180356609').send(embed);
            }
        }catch(e){
            let msg = `Произошла ошибка.\nИвент: guildMemberRemove\nКод ошибки:\n${e}`;
            this.client.guilds.cache.get('616697847261298688').channels.cache.get('1160927665117724722').send(msg);
        }
    }
};