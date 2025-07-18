const Command = require("../../base/Command.js");
const Discord = require("discord.js");
const dbData = require("../../base/patrols");

class event extends Command {

    constructor (client) {
        super(client, {
            name: "патруль",
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
            message.delete();
            if(args.length == 0) return;
            if(message.channel.id != "1190088048608813076") return;
            switch (args[0]) {
                case "выдать": {
                    const member = await message.guild.members.fetch(args.join('').replace(/<@!/g, '').replace(/<@/g, '').replace(/>/g, '').replace(args[0], ''));
                    if (!member) {
                        const embed = new Discord.MessageEmbed()
                        .setDescription(`${args.join('')} не найден ||Вводите его id, а не ник||`)
                        .setColor('#ff0000')
                        let w = await message.channel.send(embed);
                        setTimeout(()=> w.delete(), 5000);
                        return;
                    }

                    const userdata = await client.findAccount({ discord: member.user.id });
                    if (!userdata) {
                        const embed = new Discord.MessageEmbed()
                        .setDescription(`${args.join('')} не найден в бд (Не привязан дискорд к сайту)`)
                        .setColor('#ff0000')
                        let w = await message.channel.send(embed);
                        setTimeout(()=> w.delete(), 5000);
                        return;
                    }

                    let ptr = await dbData.findOne({id: userdata.id});

                    if(!ptr) {
                        ptr = new dbData({id: userdata.id});
                    } else if(ptr.soldier || ptr.verified) {
                        const embed = new Discord.MessageEmbed()
                        .setDescription(`${member} уже является патрулем`)
                        .setColor('#ff0000')
                        let w = await message.channel.send(embed);
                        setTimeout(()=> w.delete(), 5000);
                        return;
                    }

                    ptr.soldier = true;
                    await ptr.save();

                    let messageOptions = {};
                    messageOptions.embed = new Discord.MessageEmbed()
                    .setDescription(`${member} принят в патруль`)
                    .setColor('#00ff95');

                    let w = await message.channel.send(messageOptions);
                    setTimeout(() => w.delete(), 5000);

                    member.roles.add(['1193669353204371507']);

                    messageOptions.embed = new Discord.MessageEmbed().setDescription('Вы приняты в патруль').setColor('#00ff95');
                    member.send(messageOptions);

                    break;
                }
                
                case "уволить": {
                    const _uid = args.join('').replace(/<@!/g, '').replace(/<@/g, '').replace(/>/g, '').replace(args[0], '');

                    const member = await message.guild.members.fetch(_uid);

                    const userdata = await client.findAccount({ discord: (member == null ? _uid : member.user.id) });
                    if (!userdata) {
                        const embed = new Discord.MessageEmbed()
                        .setDescription(`${args.join('')} не найден в бд (Не привязан дискорд) ||Вводите его id, а не ник||`)
                        .setColor('#ff0000')
                        let w = await message.channel.send(embed);
                        setTimeout(()=> w.delete(), 5000);
                        return;
                    }

                    await dbData.deleteMany({id: userdata.id});

                    const embed1 = new Discord.MessageEmbed()
                    .setDescription(`${member ?? _uid} уволен из патруля`)
                    .setFooter(`Исполнил: ${message.author.tag} | ${message.author.id}`)
                    .setColor('#ff4400');

                    message.guild.channels.cache.get('1190842917552668762').send({embed: embed1});

                    let w = await message.channel.send({embed: embed1});
                    setTimeout(() => w.delete(), 5000);

                    if(member) {
                        member.roles.remove(['1193669353204371507']);
                        const embed2 = new Discord.MessageEmbed().setDescription('Вы уволены из патруля').setColor('#ff4400');
                        member.send({embed: embed2});
                    }

                    break;
                }

                case "повысить": {
                    if(message.member.user.id != '1193199454262677597' && 
                    !message.member.roles.cache.get('1038181570604974180') &&  // комитет
                    !message.member.roles.cache.get('1190080333366960138') && // глава овб
                    !message.member.roles.cache.get('1256071447562948648')) { // обучение патруля
                        const embed = new Discord.MessageEmbed()
                        .setDescription("Недостаточно доступа")
                        .setColor('#ff0000')
                        let w = await message.channel.send(embed);
                        setTimeout(()=> w.delete(), 5000);
                        return;
                    }

                    const member = await message.guild.members.fetch(args.join('').replace(/<@!/g, '').replace(/<@/g, '').replace(/>/g, '').replace(args[0], ''));
                    if (!member) {
                        const embed = new Discord.MessageEmbed()
                        .setDescription(`${args.join('')} не найден ||Вводите его id, а не ник||`)
                        .setColor('#ff0000')
                        let w = await message.channel.send(embed);
                        setTimeout(()=> w.delete(), 5000);
                        return;
                    }

                    const userdata = await client.findAccount({ discord: member.user.id });
                    if (!userdata) {
                        const embed = new Discord.MessageEmbed()
                        .setDescription(`${member} не найден в бд (Не привязан дискорд к сайту)`)
                        .setColor('#ff0000')
                        let w = await message.channel.send(embed);
                        setTimeout(()=> w.delete(), 5000);
                        return;
                    }

                    const ptr = await dbData.findOne({id: userdata.id});

                    if (!ptr) {
                        const embed = new Discord.MessageEmbed()
                        .setDescription(`${member} не является патрулем`)
                        .setColor('#ff0000')
                        let w = await message.channel.send(embed);
                        setTimeout(()=> w.delete(), 5000);
                        return;
                    }

                    if (!ptr.soldier) {
                        const embed = new Discord.MessageEmbed()
                        .setDescription(`${member} не является рядовым патрулем`)
                        .setColor('#ff0000')
                        let w = await message.channel.send(embed);
                        setTimeout(()=> w.delete(), 5000);
                        return;
                    }

                    if (ptr.verified) {
                        const embed = new Discord.MessageEmbed()
                        .setDescription(`${member} уже является проверенным патрулем`)
                        .setColor('#ff0000')
                        let w = await message.channel.send(embed);
                        setTimeout(()=> w.delete(), 5000);
                        return;
                    }

                    ptr.verified = true;
                    await ptr.save();
                    
                    const embed1 = new Discord.MessageEmbed()
                    .setDescription(`${member} повышен до проверенного патруля`)
                    .setFooter(`Исполнил: ${message.author.tag} | ${message.author.id}`)
                    .setColor('#14609b');

                    let w = await message.channel.send({embed: embed1});
                    setTimeout(() => w.delete(), 5000);

                    message.guild.channels.cache.get('1190842917552668762').send({embed: embed1});

                    const embed2 = new Discord.MessageEmbed().setDescription('Вы повышены до проверенного патруля').setColor('#14609b');
                    member.send({embed: embed2});

                    break;
                }
            
                default: {
                    const embed = new Discord.MessageEmbed()
                    .setDescription("Неверный аргумент команды патруля: \""+ args[0].toLowerCase() +"\"")
                    .setColor('#ff0000')
                    let w = await message.channel.send(embed);
                    setTimeout(()=> w.delete(), 5000);
                    break;
                }
            }
        }catch(e){
            let msg = `Произошла ошибка.\nКоманда: патруль\nКод ошибки:\n${e}`
            client.guilds.cache.get('616697847261298688').channels.cache.get('1160927665117724722').send(msg);
        }
    }
}
module.exports = event;