const Command = require("../../base/Command.js");
const Discord = require("discord.js");
const adminsData = require("../../base/admins");

class zeroing extends Command {

    constructor (client) {
        super(client, {
            name: "обнуление",
            dirname: __dirname,
            enabled: true,
            guildOnly: true,
            memberPermissions: [],
            botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            ownerOnly: false,
            cooldown: 0
        });
    }
    async run (message, args, client) {
        try{
            if(message.channel.id === '1160928861752676434' || message.channel.id === '747879895316824104'){
                message.delete();
                if(message.member.user.id != '1193199454262677597' &&
                !message.member.roles.cache.get('1038181570604974180') &&
                !message.member.roles.cache.get('815583334284787754') &&
                !message.member.roles.cache.get('1079432168125767881') &&
                !message.member.roles.cache.get('653908539781152768')) return;
                const adms = await adminsData.find();
                adms.forEach(async function(adm) {
                    adm.sl.bans = 0;
                    adm.sl.kicks = 0;
                    adm.sl.punishments = 0;
                    adm.sl.time = 0;

                    adm.slhrp.bans = 0;
                    adm.slhrp.kicks = 0;
                    adm.slhrp.punishments = 0;
                    adm.slhrp.time = 0;

                    adm.markModified('sl');
                    adm.markModified('slhrp');
                    await adm.save();
                });
                let messageOptions = {};
                messageOptions.embed = new Discord.MessageEmbed()
                .setDescription(`Статистика обнулена ${client.config.agree}`)
                .setColor('#15ff00')
                message.guild.channels.cache.get('1312841141539836134').send(messageOptions);
                let w = await message.channel.send(messageOptions);
                setTimeout(function(){
                    w.delete();
                }, 5000);
            }
        }catch(e){
            let msg = `Произошла ошибка.\nКоманда: обнуление\nКод ошибки:\n${e}`;
            client.guilds.cache.get('616697847261298688').channels.cache.get('1160927665117724722').send(msg);
        }
    }
}
module.exports = zeroing;