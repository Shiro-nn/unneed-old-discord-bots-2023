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
            if(message.channel.id === '1312845967501824102'){
                message.delete();

                if(message.member.user.id != '1193199454262677597' &&
                    !message.member.roles.cache.get('1312829525062586480') &&  // император
                    !message.member.roles.cache.get('1312829555760959529') && // сенат
                    !message.member.roles.cache.get('1312830469846597725')) { // комитет
                    const embed = new Discord.MessageEmbed()
                        .setDescription("Недостаточно доступа")
                        .setColor('#ff0000')
                    let w = await message.channel.send(embed);
                    setTimeout(()=> w.delete(), 5000);
                    return;
                }

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
                    member.roles.remove('1312829788234448906');
                    member.roles.add('1312829844202983515');

                    const embed = new Discord.MessageEmbed().setDescription(`Поздравляю:tada:\nВы понижены, ваша новая роль: Практикант ${client.config.agree}`).setColor('#9bff00');
                    member.send(embed);
                } else if(adm.sl.mainhelper){
                    adm.sl.mainhelper = false;
                    adm.sl.helper = true;
                    adm.markModified('sl');
                    await adm.save();
                    isadm = true;
                    member.roles.remove('1312829722937266247');
                    member.roles.add('1312829788234448906');

                    const embed = new Discord.MessageEmbed().setDescription(`Поздравляю:tada:\nВы понижены, ваша новая роль: Смотритель ${client.config.agree}`).setColor('#00ffff');
                    member.send(embed);
                } else if(adm.sl.admin){
                    adm.sl.admin = false;
                    adm.sl.mainhelper = true;
                    adm.markModified('sl');
                    await adm.save();
                    isadm = true;
                    member.roles.remove('1312829696265814016');
                    member.roles.add('1312829722937266247');

                    const embed = new Discord.MessageEmbed().setDescription(`Поздравляю:tada:\nВы понижены, ваша новая роль: Дружинник ${client.config.agree}`).setColor('#0089c7');
                    member.send(embed);
                } else if(adm.sl.mainadmin){
                    adm.sl.mainadmin = false;
                    adm.sl.admin = true;
                    adm.markModified('sl');
                    await adm.save();
                    isadm = true;
                    member.roles.remove('1312829555760959529');
                    member.roles.add('1312829696265814016');

                    const embed = new Discord.MessageEmbed().setDescription(`Поздравляю:tada:\nВы понижены, ваша новая роль: Боярин ${client.config.agree}`).setColor('#fdffbb');
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
                message.guild.channels.cache.get('1312841141539836134').send({embed:emb});
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