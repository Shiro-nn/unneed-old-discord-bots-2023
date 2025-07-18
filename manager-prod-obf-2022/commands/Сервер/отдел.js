const Command = require("../../base/Command.js");
const Discord = require("discord.js");

class command extends Command {

    constructor (client) {
        super(client, {
            name: "отдел",
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
            if(message.channel.id === '1183417565528207461'){
                message.delete();

                if(args.length == 0){
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

                switch (args[0].toLowerCase()) {
                    case 'нанять':
                        member.roles.add(['1170379006168805477']);

                        const emb = new Discord.MessageEmbed()
                        .setAuthor(member.user.username, member.user.displayAvatarURL({ format: 'png', dynamic: true }))
                        .setTitle('Принят в отдел')
                        .setColor('#dbb800')
                        .setDescription(`<@${member.user.id}> был принят в отдел Обучения`)
                        .setFooter(`Старшина: ${message.author.tag} | ${message.author.id}`)
                        .setTimestamp();
                        
                        message.guild.channels.cache.get('1185908917042171935').send({embed:emb});

                        const emb2 = new Discord.MessageEmbed()
                        .setDescription(`${member} был принят в отдел Обучения`)
                        .setColor('#dbb800')
                        message.guild.channels.cache.get('745653433180356609').send({embed:emb2});
                        let w = await message.channel.send({embed:emb2});
                        setTimeout(() => w.delete(), 5000);

                        const emb3 = new Discord.MessageEmbed()
                        .setDescription(`Вас приняли в отдел Обучения`)
                        .setColor('#dbb800');
                        member.send({embed:emb3});
                        break;

                    case 'снять': {
                        member.roles.remove(['1170379006168805477']);
    
                        const emb = new Discord.MessageEmbed()
                        .setAuthor(member.user.username, member.user.displayAvatarURL({ format: 'png', dynamic: true }))
                        .setTitle('Уволен из отдела')
                        .setColor('#ce2200')
                        .setDescription(`<@${member.user.id}> был уволен из отдела Обучения`)
                        .setFooter(`Старшина: ${message.author.tag} | ${message.author.id}`)
                        .setTimestamp();

                        message.guild.channels.cache.get('1185908917042171935').send({embed:emb});

                        const emb2 = new Discord.MessageEmbed()
                        .setDescription(`${member} был уволен из отдела Обучения`)
                        .setColor('#ce2200')
                        message.guild.channels.cache.get('745653433180356609').send({embed:emb2});
                        let w = await message.channel.send({embed:emb2});
                        setTimeout(() => w.delete(), 5000);

                        const emb3 = new Discord.MessageEmbed()
                        .setDescription(`Вас уволили из отдела Обучения`)
                        .setColor('#ce2200');
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