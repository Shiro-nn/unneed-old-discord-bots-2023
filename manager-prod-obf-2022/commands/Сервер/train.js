const Command = require("../../base/Command.js");
const Discord = require("discord.js");
const adminsData = require("../../base/admins");

class command extends Command {

    constructor (client) {
        super(client, {
            name: "обучение",
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
            if(message.channel.id === '763380151386898462'){
                message.delete();

                if(args.length == 0){
                    return;
                }

                let member = await message.guild.members.fetch(args[0].replace(/<@!/g, '').replace(/<@/g, '').replace(/>/g, ''));
                if(member == null){
                    const embed = new Discord.MessageEmbed()
                    .setDescription(`${args[0]} не найден ||Вводите его id, а не ник||`)
                    .setColor('#ff0000')
                    let w = await message.channel.send(embed);
                    setTimeout(()=> w.delete(), 5000);
                    return;
                }

                const userdata = await client.findAccount({ discord: member.user.id });
                if(userdata == null){
                    const embed = new Discord.MessageEmbed()
                    .setDescription(`${args[0]} не найден в бд (Не привязан дискорд)`)
                    .setColor('#ff0000')
                    let w = await message.channel.send(embed);
                    setTimeout(()=> w.delete(), 5000);
                    return;
                }

                let reason = args.slice(1).join(' ');

                const emb = new Discord.MessageEmbed()
                .setAuthor(member.user.username, member.user.displayAvatarURL({ format: 'png', dynamic: true }))
                .setTitle('Заявка на обучение стажера')
                .setColor('#09a7c5')
                .setDescription(`## Стажер:\n<@${member.user.id}>\n## Характеристика:\n${reason}\n`+
                `### Steam: [клик](https://steamcommunity.com/profiles/${userdata.steam})`)
                .setFooter(`Набор: ${message.author.tag} | ${message.author.id}`)
                .setTimestamp();
                
                message.guild.channels.cache.get('1185908917042171935').send('<@&1170379006168805477>', {embed:emb});
            }
            if(message.channel.id === '1168806404610596864'){
                message.delete();

                if(args.length == 0){
                    return;
                }
                
                if(message.member.user.id != '1193199454262677597' && 
                !message.member.roles.cache.get('1168990102450602048') && 
                !message.member.roles.cache.get('1183415462189605065') && 
                !message.member.roles.cache.get('1170379006168805477')){
                    const embed = new Discord.MessageEmbed()
                    .setDescription('Вы не обучающий')
                    .setColor('#ff0000')
                    let w = await message.channel.send(embed);
                    setTimeout(()=> w.delete(), 5000);
                    return;
                }

                let member = await message.guild.members.fetch(args[1].replace(/<@!/g, '').replace(/<@/g, '').replace(/>/g, ''));
                if(member == null){
                    const embed = new Discord.MessageEmbed()
                    .setDescription(`${args[1]} не найден ||Вводите его id, а не ник||`)
                    .setColor('#ff0000')
                    let w = await message.channel.send(embed);
                    setTimeout(()=> w.delete(), 5000);
                    return;
                }

                const userdata = await client.findAccount({ discord: member.user.id });
                if(userdata == null){
                    const embed = new Discord.MessageEmbed()
                    .setDescription(`${args[1]} не найден в бд (Не привязан дискорд)`)
                    .setColor('#ff0000')
                    let w = await message.channel.send(embed);
                    setTimeout(()=> w.delete(), 5000);
                    return;
                }

                const adm = await adminsData.findOne({id: userdata.id});
                if(adm == null || adm == undefined) {
                    const embed = new Discord.MessageEmbed()
                    .setDescription(`${args[1]} не найден в бд админов`)
                    .setColor('#ff0000')
                    let w = await message.channel.send(embed);
                    setTimeout(()=> w.delete(), 5000);
                    return;
                }

                if(!adm.sl.trainee){
                    const embed = new Discord.MessageEmbed()
                    .setDescription(`${args[1]} не является стажером`)
                    .setColor('#ff0000')
                    let w = await message.channel.send(embed);
                    setTimeout(()=> w.delete(), 5000);
                    return;
                }

                let reason = args.slice(2).join(' ');

                switch (args[0].toLowerCase()) {
                    case 'провалено':
                        adm.sabbatical = false;
                        adm.sl.trainee = false;
                        adm.markModified('sl');
                        await adm.save();
                        member.roles.remove(['699234064699490306', '722023017680732200', '700277524713701377', '700973416626520127', '701083916253265951', '759748514707668993', '1045047365016485998']);

                        const emb = new Discord.MessageEmbed()
                        .setAuthor(member.user.username, member.user.displayAvatarURL({ format: 'png', dynamic: true }))
                        .setTitle('Стажировка провалена')
                        .setColor('#c50909')
                        .setDescription(`<@${member.user.id}> не прошел стажировку и был уволен.\nПричина: ${reason}`)
                        .setFooter(`Куратор: ${message.author.tag} | ${message.author.id}`)
                        .setTimestamp();
                        
                        message.guild.channels.cache.get('1185908917042171935').send({embed:emb});

                        const emb2 = new Discord.MessageEmbed()
                        .setDescription(`${member} провалил стажировку и был уволен\nПричина: ${reason}`)
                        .setColor('#c50909')
                        message.guild.channels.cache.get('745653433180356609').send({embed:emb2});
                        let w = await message.channel.send({embed:emb2});
                        setTimeout(() => w.delete(), 5000);

                        const emb3 = new Discord.MessageEmbed()
                        .setDescription(`Вы провалили стажировку и были уволены\nПричина: ${reason}`)
                        .setColor('#c50909')
                        .setImage('https://cdn.discordapp.com/attachments/740639900512026654/1185909950854209546/image.png');
                        member.send({embed:emb3});
                        break;

                    case 'пройдено': {
                        adm.sl.trainee = false;
                        adm.sl.helper = true;
                        adm.markModified('sl');
                        await adm.save();
                        await member.roles.remove(['699234064699490306']);
                        await member.roles.add(['623870779972517918', '1170367561360216246']);
    
                        const emb = new Discord.MessageEmbed()
                        .setAuthor(member.user.username, member.user.displayAvatarURL({ format: 'png', dynamic: true }))
                        .setTitle('Стажировка пройдена')
                        .setColor('#00be0f')
                        .setDescription(`<@${member.user.id}> прошел стажировку и был повышен до Хелпера.\nПричина: ${reason}`)
                        .setFooter(`Куратор: ${message.author.tag} | ${message.author.id}`)
                        .setTimestamp();

                        message.guild.channels.cache.get('1185908917042171935').send({embed:emb});

                        const emb2 = new Discord.MessageEmbed()
                        .setDescription(`${member} прошел стажировку`)
                        .setColor('#00be0f')
                        message.guild.channels.cache.get('745653433180356609').send({embed:emb2});
                        let w = await message.channel.send({embed:emb2});
                        setTimeout(() => w.delete(), 5000);

                        const emb3 = new Discord.MessageEmbed()
                        .setDescription(`Вы прошли стажировку и были повышены до Хелпера.`)
                        .setColor('#00be0f');
                        member.send({embed:emb3});
                        break;
                    }
                    case 'взять': {
                        const emb = new Discord.MessageEmbed()
                        .setAuthor(member.user.username, member.user.displayAvatarURL({ format: 'png', dynamic: true }))
                        .setTitle('Назначен куратор')
                        .setColor('#ad00ff')
                        .setDescription(`Стажеру <@${member.user.id}> назначен куратор <@${message.author.id}>`)
                        .setFooter(`Куратор: ${message.author.tag} | ${message.author.id}`)
                        .setTimestamp();

                        message.guild.channels.cache.get('1185908917042171935').send({embed:emb});

                        const emb2 = new Discord.MessageEmbed()
                        .setDescription(`Стажеру <@${member.user.id}> назначен куратор <@${message.author.id}>`)
                        .setColor('#ad00ff')
                        message.guild.channels.cache.get('1185939025547247726').send({embed:emb2});
                        let w = await message.channel.send({embed:emb2});
                        setTimeout(() => w.delete(), 5000);

                        const emb3 = new Discord.MessageEmbed()
                        .setTitle('Назначен куратор')
                        .setColor('#ad00ff')
                        .setDescription(`Вам назначен куратор для прохождения стажировки.\nКуратор: <@${message.author.id}>`)
                        member.send({embed:emb3});
                        break;
                    }

                    default:
                        const embed = new Discord.MessageEmbed()
                        .setDescription(`\`${args[0]}\` - неизвестный аргумент`)
                        .setColor('#ff0000')
                        const del_lat = await message.channel.send(embed);
                        setTimeout(()=> del_lat.delete(), 5000);
                        break;
                }
            }
        }catch(e){
            let msg = `Произошла ошибка.\nКоманда: обучение\nКод ошибки:\n${e}`
            client.guilds.cache.get('616697847261298688').channels.cache.get('1160927665117724722').send(msg);
        }
    }
}

module.exports = command;