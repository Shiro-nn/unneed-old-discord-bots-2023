const Command = require("../../base/Command.js");
const Discord = require("discord.js");
let accountsData = require("../../base/accounts");
const adminsData = require("../../base/admins");
class stata extends Command {
    constructor (client) {
        super(client, {
            name: "стата",
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
            if(message.channel.id === '1160928861752676434' || message.channel.id === '1312846507954798643'){
                let embed = new Discord.MessageEmbed().setColor('#ff0000').setAuthor("scpsl.shop", 'https://cdn.scpsl.shop/scpsl/img/etc/fydne.png', 'https://scpsl.shop');
                const doadms = await adminsData.find();
                const adms = doadms.filter(x => x.sl.trainee || x.sl.helper || x.sl.mainhelper || x.sl.admin || x.sl.mainadmin);
                let needed = 0;
                let nlength = 0;
                adms.forEach(function(data){
                    if(data.sabbatical) return;
                    let cf = 4;
                    if(data.sl.helper) cf = 2;
                    else if(data.sl.mainhelper) cf = 1;
                    else if(data.sl.admin) cf = 0.5;
                    else if(data.sl.mainadmin) cf = 0.25;
                    cf /= 4;
                    needed += data.sl.punishments * cf;
                    needed += data.sl.kicks * 1.5 * cf;
                    needed += data.sl.bans * 2 * cf;
                    nlength++;
                });
                let _ids = 0;
                let _ids2 = 0;
                for (let i = 0; i < adms.length; i++) {
                    const adm = adms[i];
                    let _role = '?';
                    if(adm.sl.trainee) _role = 'Стажер';
                    else if(adm.sl.helper) _role = 'Хелпер';
                    else if(adm.sl.mainhelper) _role = 'Гл. Хелпер';
                    else if(adm.sl.admin) _role = 'Админ';
                    else if(adm.sl.mainadmin) _role = 'Гл. Админ';
                    let hl = 0;
                    if(adm.sl.trainee) hl = 7;
                    else if(adm.sl.helper) hl = 7;
                    else if(adm.sl.mainhelper) hl = 6;
                    else if(adm.sl.admin) hl = 5;
                    const _hours = hl == 0 ? 0 : Math.round(4*hl+hl*3/7);
                    let _nabor = '**Нет**';
                    if(adm.sl.selection){_nabor='**Да**'}
                    let _traineeadd = '';
                    if(adm.sl.selection){_traineeadd=`\nПринято стажеров: ${adm.sl.slaves}` }
                    let ucf = 1;
                    if(adm.sl.trainee) ucf = 2;
                    else if(adm.sl.helper) ucf = 2;
                    else if(adm.sl.mainhelper) ucf = 1;
                    else if(adm.sl.mainadmin) ucf = 0;
                    let utotal = Math.round(adm.sl.punishments + (adm.sl.kicks * 1.5) + (adm.sl.bans * 2));
                    if(_ids2 > 5){
                        message.channel.send({embed});
                        _ids2 = 0;
                        embed = new Discord.MessageEmbed().setColor('#ff0000').setAuthor("scpsl.shop", 'https://cdn.scpsl.shop/scpsl/img/etc/fydne.png', 'https://scpsl.shop');
                    }
                    const user = await accountsData.findOne({id:adm.id});
                    if(user != null && user != undefined){
                        embed.addField(user.name == '' ? user.user : user.name, (adm.sabbatical ? `~~${_role}~~\n__**Саббатикал**__\n` : `${_role}\n`)+
                        `[Steam](https://steamcommunity.com/profiles/${user.steam})\n<@!${user.discord}>\nПредов: **${adm.sl.warnings}**\n`+
                        `Часов: **${Math.round((adm.sl.time/60)/60)}/${_hours}**\nНабор: ${_nabor}\nКиков: ${adm.sl.kicks}\nБанов: ${adm.sl.bans}\n`+
                        `Наказаний: ${adm.sl.punishments}${_traineeadd}\n${utotal}/${Math.round(needed/nlength * ucf)} активности\n\n`, true);
                        _ids = _ids + 1;
                        _ids2 = _ids2 + 1;
                    }
                }
                message.channel.send({embed});
            }
        }catch(e){
            let msg = `Произошла ошибка.\nКоманда: стата\nКод ошибки:\n${e}`;
            client.guilds.cache.get('616697847261298688').channels.cache.get('1160927665117724722').send(msg);
        }
    }
}
module.exports = stata;