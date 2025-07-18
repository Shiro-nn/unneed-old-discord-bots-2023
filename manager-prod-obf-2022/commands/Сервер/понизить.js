const Command = require("../../base/Command.js");
const Discord = require("discord.js");
const adminsData = require("../../base/admins");

class nostonk extends Command {

    constructor (client) {
        super(client, {
            name: "понизить",
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
                if(message.member.user.id != '1193199454262677597' && 
                !message.member.roles.cache.get('1038181570604974180') && 
                !message.member.roles.cache.get('815583334284787754') && 
                !message.member.roles.cache.get('1079432168125767881') && 
                !message.member.roles.cache.get('653908539781152768')) return;
                let member = await message.guild.members.fetch(args.join('').replace(/<@!/g, '').replace(/<@/g, '').replace(/>/g, ''));
                if(member == null){
                    const embed = new Discord.MessageEmbed()
                    .setDescription(`${args.join('')} не найден ||Вводите его id, а не ник||`)
                    .setColor('#ff0000')
                    let w = await message.channel.send(embed);
                    setTimeout(()=> w.delete(), 5000);
                    return;
                }
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
                let isadm = false;
                if(adm.sl.helper){
                    adm.sl.helper = false;
                    adm.sl.trainee = true;
                    adm.markModified('sl');
                    await adm.save();
                    isadm = true;
                    member.roles.remove('623870779972517918');
                    member.roles.add('699234064699490306');

                    const embed = new Discord.MessageEmbed().setDescription(`Поздравляю:tada:\nВы понижены, ваша новая роль: Стажер ${client.config.agree}`).setColor('#9bff00');
                    member.send(embed);
                } else if(adm.sl.mainhelper){
                    adm.sl.mainhelper = false;
                    adm.sl.helper = true;
                    adm.markModified('sl');
                    await adm.save();
                    isadm = true;
                    member.roles.remove('699234416572104844');
                    member.roles.add('623870779972517918');

                    const embed = new Discord.MessageEmbed().setDescription(`Поздравляю:tada:\nВы понижены, ваша новая роль: Хелпер ${client.config.agree}`).setColor('#00ffff');
                    member.send(embed);
                } else if(adm.sl.admin){
                    adm.sl.admin = false;
                    adm.sl.mainhelper = true;
                    adm.markModified('sl');
                    await adm.save();
                    isadm = true;
                    member.roles.remove('699260201722970153');
                    member.roles.add('699234416572104844');

                    const embed = new Discord.MessageEmbed().setDescription(`Поздравляю:tada:\nВы понижены, ваша новая роль: Главный Хелпер ${client.config.agree}`).setColor('#0089c7');
                    member.send(embed);
                } else if(adm.sl.mainadmin){
                    adm.sl.mainadmin = false;
                    adm.sl.admin = true;
                    adm.markModified('sl');
                    await adm.save();
                    isadm = true;
                    member.roles.remove('653908539781152768');
                    member.roles.add('699260201722970153');

                    const embed = new Discord.MessageEmbed().setDescription(`Поздравляю:tada:\nВы понижены, ваша новая роль: Админ ${client.config.agree}`).setColor('#fdffbb');
                    member.send({embed});
                }
                if(isadm){
                    if(userdata.achievements.filter(x => x == 'staff').length < 1){
                        userdata.achievements.push('staff');
                        await userdata.save();
                    }
                }
                const emb = new Discord.MessageEmbed()
                .setDescription(`${member} понижен ${client.config.agree}`)
                .setColor('#ff0000')
                message.guild.channels.cache.get('745653433180356609').send({embed:emb});
                let w = await message.channel.send({embed:emb});
                setTimeout(() => w.delete(), 5000);
            }
        }catch(e){
            let msg = `Произошла ошибка.\nКоманда: понизить\nКод ошибки:\n${e}`;
            client.guilds.cache.get('616697847261298688').channels.cache.get('1160927665117724722').send(msg);
        }
    }
}
module.exports = nostonk;