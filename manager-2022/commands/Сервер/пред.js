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
            if(message.channel.id === '1312845967501824102'){ // #управление
                message.delete();
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
                        if(adm.slhrp.warnings === 0) member.roles.remove('1315394151197577268');
                        member.send(dmembed);
                        message.guild.channels.cache.get('1312841141539836134').send(messageOptions);
                        let w = await message.channel.send(messageOptions);
                        setTimeout(function(){
                            w.delete();
                        }, 5000);
                    }
                    else if(adm.sl.warnings == 2){
                        adm.sl.warnings--;
                        if(adm.slhrp.warnings < 2) member.roles.remove('1315394165433176147');
                        member.send(dmembed);
                        message.guild.channels.cache.get('1312841141539836134').send(messageOptions);
                        let w = await message.channel.send(messageOptions);
                        setTimeout(function(){
                            w.delete();
                        }, 5000);
                    }
                    else if(adm.sl.warnings == 3){
                        adm.sl.warnings--;
                        if(adm.slhrp.warnings < 3) member.roles.remove('1315394179827896410');
                        member.send(dmembed);
                        message.guild.channels.cache.get('1312841141539836134').send(messageOptions);
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
                        member.roles.add('1315394151197577268');
                        let dmembed = {};
                        dmembed.embed = new Discord.MessageEmbed().setDescription(`Поздравляю:tada:\nВам выдан пред(${adm.sl.warnings}) ${client.config.agree}\nПричина: ${reason}`).setColor('#ff0000');
                        member.send(dmembed);
                    }
                    else if(adm.sl.warnings === 1){
                        adm.sl.warnings++;
                        member.roles.add('1315394165433176147');
                        let dmembed = {};
                        dmembed.embed = new Discord.MessageEmbed().setDescription(`Поздравляю:tada:\nВам выдан пред(${adm.sl.warnings}) ${client.config.agree}\nПричина: ${reason}`).setColor('#ff0000');
                        member.send(dmembed);
                    }
                    else if(adm.sl.warnings === 2){
                        adm.sl.warnings++;
                        member.roles.add('1315394179827896410');
                        let dmembed = {};
                        dmembed.embed = new Discord.MessageEmbed().setDescription(`Поздравляю:tada:\nВам выдан пред(${adm.sl.warnings}) ${client.config.agree}\nПричина: ${reason}`).setColor('#ff0000');
                        member.send(dmembed);
                    }
                    else if(adm.sl.warnings === 3){
                        let w2 = await message.channel.send('нельзя выдать 4 преда');
                        setTimeout(function(){
                            w2.delete();
                        }, 5000);
                        return;
                    }
                    adm.markModified('sl');
                    await adm.save();
                    let messageOptions = {};
                    messageOptions.embed = new Discord.MessageEmbed()
                    .setDescription(`${member} выдан пред ${client.config.agree}\nПричина: ${reason}`)
                    .setColor('#ff0000')
                    await message.guild.channels.cache.get('1312841141539836134').send(messageOptions);
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