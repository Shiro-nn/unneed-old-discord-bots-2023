const Command = require("../../base/Command.js");
const Discord = require("discord.js");
const adminsData = require("../../base/admins");

class stonk extends Command {

    constructor (client) {
        super(client, {
            name: "повысить",
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
                if(adm.sl.trainee){
                    adm.sl.trainee = false;
                    adm.sl.helper = true;
                    adm.markModified('sl');
                    await adm.save();
                    member.roles.remove('1312829844202983515');
                    member.roles.add('1312829788234448906');
                    member.roles.add('1312833420736331826'); // отряд

                    let messageOptions = {};
                    messageOptions.embed = new Discord.MessageEmbed().setDescription(`Поздравляю:tada:\nВы повышены, ваша новая роль: Смотритель ${client.config.agree}`).setColor('#00ffff');
                    member.send(messageOptions);
                    isadm = true;
                }else if(adm.sl.helper){
                    adm.sl.helper = false;
                    adm.sl.mainhelper = true;
                    adm.markModified('sl');
                    await adm.save();
                    member.roles.remove('1312829788234448906');
                    member.roles.add('1312829722937266247');

                    let messageOptions = {};
                    messageOptions.embed = new Discord.MessageEmbed().setDescription(`Поздравляю:tada:\nВы повышены, ваша новая роль: Дружинник ${client.config.agree}`).setColor('#0089c7');
                    member.send(messageOptions);
                    isadm = true;
                }else if(adm.sl.mainhelper){
                    adm.sl.mainhelper = false;
                    adm.sl.admin = true;
                    adm.markModified('sl');
                    await adm.save();
                    member.roles.remove('1312829722937266247');
                    member.roles.add('1312829696265814016');

                    let messageOptions = {};
                    messageOptions.embed = new Discord.MessageEmbed().setDescription(`Поздравляю:tada:\nВы повышены, ваша новая роль: Боярин ${client.config.agree}`).setColor('#fdffbb');
                    member.send(messageOptions);
                    isadm = true;
                }else if(adm.sl.admin){
                    adm.sl.admin = false;
                    adm.sl.mainadmin = true;
                    adm.markModified('sl');
                    await adm.save();
                    member.roles.remove('1312829696265814016');
                    member.roles.add('1312829555760959529');

                    let messageOptions = {};
                    messageOptions.embed = new Discord.MessageEmbed().setDescription(`Поздравляю:tada:\nВы повышены, ваша новая роль: Сенат ${client.config.agree}`).setColor('#ff0000');
                    member.send(messageOptions);
                    isadm = true;
                }
                if(isadm){
                    if(userdata.achievements.filter(x => x == 'staff').length < 1){
                        userdata.achievements.push('staff');
                        await userdata.save();
                    }
                }
                let messageOpt = {};
                messageOpt.embed = new Discord.MessageEmbed()
                .setDescription(`${member} повышен ${client.config.agree}`)
                .setColor('#15ff00')
                await message.guild.channels.cache.get('1312841141539836134').send(messageOpt);
                let w = await message.channel.send(messageOpt);
                setTimeout(function(){
                    w.delete();
                }, 5000);
            }
        }catch(e){
            let msg = `Произошла ошибка.\nКоманда: повысить\nКод ошибки:\n${e}`;
            client.guilds.cache.get('616697847261298688').channels.cache.get('1160927665117724722').send(msg);
        }
    }
}
module.exports = stonk;