const Command = require("../../base/Command.js");
const Discord = require("discord.js");
const adminsData = require("../../base/admins");

class byubyu extends Command {

    constructor (client) {
        super(client, {
            name: "уволить",
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
            if(message.channel.id === '747879895316824104'){
                message.delete();
                var reason = "";
                args.forEach(element => {
                    if(element !== args[0]){
                        reason += element;
                        reason += " ";
                    }
                });
                var uid = args[0].replace(/<@!/g, '').replace(/<@/g, '').replace(/>/g, '');
                let member = await message.guild.members.fetch(uid);
                if(member == null){
                    const embed = new Discord.MessageEmbed()
                    .setDescription(`${args.join('')} не найден ||Вводите его id, а не ник||`)
                    .setColor('#ff0000')
                    let w = await message.channel.send(embed);
                    setTimeout(()=> w.delete(), 5000);
                    return;
                }
                const udata = await client.findAccount({ discord: member.user.id });
                const userdata = await client.findAccount({ discord: member.user.id });
                if(userdata == null){
                    const embed = new Discord.MessageEmbed()
                    .setDescription(`${args.join('')} не найден в бд (Не привязан дискорд) ||Вводите его id, а не ник||`)
                    .setColor('#ff0000')
                    let w = await message.channel.send(embed);
                    setTimeout(()=> w.delete(), 5000);
                    return;
                }
                const adm = await adminsData.findOne({id: userdata.id});
                if(adm == null || adm == undefined) return;
                udata.achievements.filter(x => x == 'staff').forEach(achievement => udata.achievements.pull(achievement));
                await udata.save();
                const emb1 = new Discord.MessageEmbed()
                .setDescription(`Поздравляю:tada:\nВы уволены ${client.config.agree}\nПричина: ${reason}`)
                .setColor('#ff0000')
                .setFooter(`Исполнил: ${message.author.tag} | ${message.author.id}`)
                .setImage('https://cdn.discordapp.com/attachments/740639900512026654/1185909950854209546/image.png');
                if(adm.sl.trainee){
                    member.send({embed:emb1});
                    member.roles.remove(['699234064699490306', '722023017680732200', '700277524713701377', '700973416626520127', '701083916253265951', '759748514707668993', '1045047365016485998', '1170367104210456736', '1170367172351111218', '1170367289523183707', '1170367561360216246']);
                } else if(adm.sl.helper){
                    member.send({embed:emb1});
                    member.roles.remove(['623870779972517918', '722023017680732200', '700277524713701377', '700973416626520127', '701083916253265951', '759748514707668993', '1045047365016485998', '1170367104210456736', '1170367172351111218', '1170367289523183707', '1170367561360216246']);
                } else if(adm.sl.mainhelper){
                    member.send({embed:emb1});
                    member.roles.remove(['699234416572104844', '722023017680732200', '700277524713701377', '700973416626520127', '701083916253265951', '759748514707668993', '1045047365016485998', '1170367104210456736', '1170367172351111218', '1170367289523183707', '1170367561360216246']);
                } else if(adm.sl.admin){
                    member.send({embed:emb1});
                    member.roles.remove(['699260201722970153', '722023017680732200', '700277524713701377', '700973416626520127', '701083916253265951', '759748514707668993', '1045047365016485998', '1170367104210456736', '1170367172351111218', '1170367289523183707', '1170367561360216246']);
                } else if(adm.sl.mainadmin){
                    member.send({embed:emb1});
                    member.roles.remove(['653908539781152768', '722023017680732200', '700277524713701377', '700973416626520127', '701083916253265951', '759748514707668993', '1045047365016485998', '1170367104210456736', '1170367172351111218', '1170367289523183707', '1170367561360216246']);
                }
                adm.sabbatical = false;
                adm.sl.trainee = false;
                adm.sl.helper = false;
                adm.sl.mainhelper = false;
                adm.sl.admin = false;
                adm.sl.mainadmin = false;
                adm.sl.control = false;
                adm.sl.bans = 0;
                adm.sl.kicks = 0;
                adm.sl.time = 0;
                adm.sl.slaves = 0;
                adm.sl.warnings = 0;
                adm.markModified('sl');
                
                adm.control = false;
                adm.owner = false;

                await adm.save();
                const emb2 = new Discord.MessageEmbed()
                .setDescription(`${member} уволен ${client.config.agree}\nПричина: ${reason}`)
                .setColor('#ff0000')
                message.guild.channels.cache.get('745653433180356609').send({embed:emb2});
                let w = await message.channel.send({embed:emb2});
                setTimeout(function(){
                    w.delete();
                }, 5000);
            }
        }catch(e){
            let msg = `Произошла ошибка.\nКоманда: уволить\nКод ошибки:\n${e}`;
            client.guilds.cache.get('616697847261298688').channels.cache.get('1160927665117724722').send(msg);
        }
    }
}
module.exports = byubyu;