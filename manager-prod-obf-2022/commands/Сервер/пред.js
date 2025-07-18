const Command = require("../../base/Command.js");
const Discord = require("discord.js");
const adminsData = require("../../base/admins");

class warn extends Command {

    constructor (client) {
        super(client, {
            name: "пред",
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
            if(message.channel.id === '747879895316824104' || message.channel.id === '1142490402058944603'){ // #управление || #выдача-предов
                message.delete();
                if(
                    message.member.user.id != '1193199454262677597' && // idk who
                    !message.member.roles.cache.get('815583334284787754') &&  // admin control
                    !message.member.roles.cache.get('1170322661071655033') && // glava otryada
                    !message.member.roles.cache.get('653908539781152768') && // main admin
                    !message.member.roles.cache.get('1214388966124691546') && // sled comitet
                    !message.member.roles.cache.get('1038181570604974180') // first control
                    ) return;
                if(args[0] === 'снять'){
                    let member = await message.guild.members.fetch(args[1].replace(/<@!/g, '').replace(/<@/g, '').replace(/>/g, ''));
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
                    let messageOptions = {};
                    messageOptions.embed = new Discord.MessageEmbed()
                    .setDescription(`У ${member} снят пред ${client.config.agree}`)
                    .setColor('#15ff00')
                    let dmembed = {};
                    dmembed.embed = new Discord.MessageEmbed().setDescription(`Поздравляю:tada:\nУ вас снят пред(${adm.sl.warnings}) ${client.config.agree}`).setColor('#15ff00');
                    if(adm.sl.warnings == 1){
                        adm.sl.warnings--;
                        if(adm.slhrp.warnings === 0) member.roles.remove('700277524713701377');
                        member.send(dmembed);
                        message.guild.channels.cache.get('745653433180356609').send(messageOptions);
                        let w = await message.channel.send(messageOptions);
                        setTimeout(function(){
                            w.delete();
                        }, 5000);
                    }
                    else if(adm.sl.warnings == 2){
                        adm.sl.warnings--;
                        if(adm.slhrp.warnings < 2) member.roles.remove('700973416626520127');
                        member.send(dmembed);
                        message.guild.channels.cache.get('745653433180356609').send(messageOptions);
                        let w = await message.channel.send(messageOptions);
                        setTimeout(function(){
                            w.delete();
                        }, 5000);
                    }
                    else if(adm.sl.warnings == 3){
                        adm.sl.warnings--;
                        if(adm.slhrp.warnings < 3) member.roles.remove('701083916253265951');
                        member.send(dmembed);
                        message.guild.channels.cache.get('745653433180356609').send(messageOptions);
                        let w = await message.channel.send(messageOptions);
                        setTimeout(function(){
                            w.delete();
                        }, 5000);
                    }
                    adm.markModified('sl');
                    await adm.save();
                }else{
                    var reason = "";
                    args.forEach(element => {
                        if(element !== args[0]){
                            reason += element;
                            reason += " ";
                        }
                    });
                    let member = await message.guild.members.fetch(args[0].replace(/<@!/g, '').replace(/<@/g, '').replace(/>/g, ''));
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
                        .setDescription(`${args.join('')} не найден (Не привязан дискорд) ||Вводите его id, а не ник||`)
                        .setColor('#ff0000')
                        let w = await message.channel.send(embed);
                        setTimeout(()=> w.delete(), 5000);
                        return;
                    }
                    const adm = await adminsData.findOne({id: userdata.id});
                    if(adm == null || adm == undefined) return;
                    if(adm.sl.warnings === 0){
                        adm.sl.warnings++;
                        member.roles.add('700277524713701377');
                        let dmembed = {};
                        dmembed.embed = new Discord.MessageEmbed().setDescription(`Поздравляю:tada:\nВам выдан пред(${adm.sl.warnings}) ${client.config.agree}\nПричина: ${reason}`).setColor('#ff0000');
                        member.send(dmembed);
                    }
                    else if(adm.sl.warnings === 1){
                        adm.sl.warnings++;
                        member.roles.add('700973416626520127');
                        let dmembed = {};
                        dmembed.embed = new Discord.MessageEmbed().setDescription(`Поздравляю:tada:\nВам выдан пред(${adm.sl.warnings}) ${client.config.agree}\nПричина: ${reason}`).setColor('#ff0000');
                        member.send(dmembed);
                    }
                    else if(adm.sl.warnings === 2){
                        adm.sl.warnings++;
                        member.roles.add('701083916253265951');
                        let dmembed = {};
                        dmembed.embed = new Discord.MessageEmbed().setDescription(`Поздравляю:tada:\nВам выдан пред(${adm.sl.warnings}) ${client.config.agree}\nПричина: ${reason}`).setColor('#ff0000');
                        member.send(dmembed);
                    }
                    else if(adm.sl.warnings === 3){
                        await message.channel.send(`*уволить <@!${member.user.id}> 4 преда(${reason})`);
                        return;
                    }
                    adm.markModified('sl');
                    await adm.save();
                    let messageOptions = {};
                    messageOptions.embed = new Discord.MessageEmbed()
                    .setDescription(`${member} выдан пред ${client.config.agree}\nПричина: ${reason}`)
                    .setColor('#ff0000')
                    await message.guild.channels.cache.get('745653433180356609').send(messageOptions);
                    let w = await message.channel.send(messageOptions);
                    setTimeout(function(){
                        w.delete();
                    }, 5000);
                }
            }
        }catch(e){
            let msg = `Произошла ошибка.\nКоманда: пред\nКод ошибки:\n${e}`;
            client.guilds.cache.get('616697847261298688').channels.cache.get('1160927665117724722').send(msg);
        }
    }
}
module.exports = warn;