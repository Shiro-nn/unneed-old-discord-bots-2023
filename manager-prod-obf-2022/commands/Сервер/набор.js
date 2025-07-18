const Command = require("../../base/Command.js");
const Discord = require("discord.js");
const config = require("../../config.js");
const adminsData = require("../../base/admins");

class adminsetn extends Command {

    constructor (client) {
        super(client, {
            name: "набор",
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
                if(args[0] == "принят" || args[0] == "принять"){
                    let messageOptions = {};
                    let member = await message.guild.members.fetch(args.join('').replace(/<@!/g, '').replace(/<@/g, '').replace(/>/g, '').replace(args[0], ''));
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
                    let adm = await adminsData.findOne({id: userdata.id});
                    if(adm == null || adm == undefined) adm = new adminsData({id: userdata.id})
                    member.roles.add(['699234064699490306', '722023017680732200']);
                    messageOptions.embed = new Discord.MessageEmbed().setDescription(`Поздравляю:tada:\nВы приняты на стажировку ${client.config.agree}`).setColor('#9bff00');
                    member.send(messageOptions).catch();
                    adm.sl.trainee = true;
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
                    adm.control = false;
                    adm.owner = false;
                    adm.markModified('sl');
                    await adm.save();
                    if(userdata.achievements.filter(x => x == 'staff').length < 1){
                        userdata.achievements.push('staff');
                        await userdata.save();
                    }
                    try{
                        const _stats = await client.findAccount({ discord: message.author.id });
                        if(_stats != null && _stats != undefined){
                            const _stats2 = await adminsData.findOne({id: _stats.id});
                            if(_stats2 != null && _stats2 != undefined){
                                _stats2.sl.slaves++;
                                _stats2.markModified('sl');
                                _stats2.save();
                            }
                        }
                    }catch{}
                    messageOptions.embed = new Discord.MessageEmbed()
                    .setDescription(`${member} принят на стажировку`)
                    .setColor('#9bff00')
                    message.guild.channels.cache.get('745653433180356609').send(messageOptions);
                    let w = await message.channel.send(messageOptions);
                    setTimeout(()=> w.delete(), 5000);
                }
                else if(args[0] == "начать"){
                    let member = await message.guild.members.fetch(args.join('').replace(/<@!/g, '').replace(/<@/g, '').replace(/>/g, '').replace(args[0], '').replace(' ', ''));
                    if(member == null){
                        const embed = new Discord.MessageEmbed()
                        .setDescription(`${args.join('')} не найден. ||Вводите его id, а не ник||`)
                        .setColor('#ff0000')
                        let w = await message.channel.send(embed);
                        setTimeout(()=> w.delete(), 5000);
                        return;
                    }
                    message.guild.channels.create(`Набор Администрации`, {
                        type: 'voice'
                    }).then(async c => {
                        c.setParent('725659462177652767');
                        c.createOverwrite(message.guild.roles.everyone, {
                            VIEW_CHANNEL: false,
                            CONNECT: false
                        })
                        c.createOverwrite(member.id, {
                            VIEW_CHANNEL: true,
                            CONNECT: true
                        })
                        c.createOverwrite('721471705150914653', {
                            VIEW_CHANNEL: true,
                            CONNECT: true
                        })
                    });
                    let messageOptions = {};
                    messageOptions.embed = new Discord.MessageEmbed().setDescription(`Успешно`).setColor('#15ff00');
                    let w = await message.channel.send(messageOptions);
                    setTimeout(function(){
                        w.delete();
                    }, 5000);
                }
                else if(args[0] == "закончить"){
                    let deleted = false;
                    message.guild.channels.cache.forEach((channel) => {
                        if(channel.parentID === '725659462177652767' && channel.type == 'voice' && channel.id == args[1]){
                            channel.delete();
                            deleted = true;
                        }
                    });
                    let messageOptions = {};
                    messageOptions.embed = new Discord.MessageEmbed().setDescription(deleted ? `Успешно` : 'Канал не найден').setColor('#15ff00');
                    let w = await message.channel.send(messageOptions);
                    setTimeout(function(){
                        w.delete();
                    }, 5000);
                }
                else if(args[0] == "нанять"){
                    if(message.author.id === config.owner.id || message.member.roles.cache.get('972241512802947102') || message.member.roles.cache.get('1180777506060640256') || message.member.roles.cache.get('1038181570604974180')){ // глава набора | старший набор | комитет этики
                        if(args.join(' ') !== ''){
                            let member = await message.guild.members.fetch(args.join('').replace(/<@!/g, '').replace(/<@/g, '').replace(/>/g, '').replace(args[0], ''));
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
                            let adm = await adminsData.findOne({id: userdata.id});
                            if(adm == null || adm == undefined) adm = new adminsData({id: userdata.id});
                            await member.roles.add('721471705150914653');
                            adm.sl.selection = true;
                            adm.markModified('sl');
                            await adm.save();
                            let messageOptions = {};
                            messageOptions.embed = new Discord.MessageEmbed()
                            .setDescription(`${member} принят в <@&721471705150914653>`)
                            .setColor('#ffb500')
                            message.guild.channels.cache.get('745653433180356609').send(messageOptions);
                            let w = await message.channel.send(messageOptions);
                            setTimeout(function(){
                                w.delete();
                            }, 5000);
                            messageOptions.embed = new Discord.MessageEmbed().setDescription(`Теперь, вы являетесь <@&721471705150914653> ${client.config.agree}\n<#1014465446369574963> & <#1073739274958147626>\n<#763380151386898462>`).setColor('#ffb500');
                            member.send(messageOptions);
                        }
                    }
                }
                else if(args[0] == "снять"){
                    if(message.author.id === config.owner.id || message.member.roles.cache.get('972241512802947102') || message.member.roles.cache.get('1180777506060640256') || message.member.roles.cache.get('1038181570604974180')){
                        if(args.join(' ') !== ''){
                            let member = await message.guild.members.fetch(args.join('').replace(/<@!/g, '').replace(/<@/g, '').replace(/>/g, '').replace(args[0], ''));
                            if(member == null){
                                const embed = new Discord.MessageEmbed()
                                .setDescription(`${args.join('')} не найден. ||Вводите его id, а не ник||`)
                                .setColor('#ff0000')
                                let w = await message.channel.send(embed);
                                setTimeout(()=> w.delete(), 5000);
                                return;
                            }
                            const userdata = await client.findAccount({ discord: member.user.id });
                            if(userdata == null){
                                const embed = new Discord.MessageEmbed()
                                .setDescription(`${args.join('')} не найден в бд. (Не привязан дискорд) ||Вводите его id, а не ник||`)
                                .setColor('#ff0000')
                                let w = await message.channel.send(embed);
                                setTimeout(()=> w.delete(), 5000);
                                return;
                            }
                            await member.roles.remove('721471705150914653');

                            const adm = await adminsData.findOne({id: userdata.id});
                            if(adm != null && adm != undefined){
                                adm.sl.selection = false;
                                adm.markModified('sl');
                                await adm.save();
                            }

                            let messageOptions = {};
                            messageOptions.embed = new Discord.MessageEmbed()
                            .setDescription(`${member} уволен из <@&721471705150914653>`)
                            .setColor('#ffb500')
                            message.guild.channels.cache.get('745653433180356609').send(messageOptions);
                            let w = await message.channel.send(messageOptions);
                            setTimeout(function(){
                                w.delete();
                            }, 5000);
                            messageOptions.embed = new Discord.MessageEmbed().setDescription(`Более вы не являетесь <@&721471705150914653> ${client.config.agree}`).setColor('#ffb500');
                            member.send(messageOptions);
                        }
                    }
                }
            }
        }catch(e){
            let msg = `Произошла ошибка.\nКоманда: набор\nКод ошибки:\n${e}`
            client.guilds.cache.get('616697847261298688').channels.cache.get('1160927665117724722').send(msg);
        }
    }
}
module.exports = adminsetn;