const Command = require("../../base/Command.js");
const Discord = require("discord.js");
const statsData = require("../../base/stats");

class general extends Command {

    constructor (client) {
        super(client, {
            name: "общие",
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
            if(message.channel.id === '1160928861752676434'){
                message.delete().catch();
                if(args[0].includes("@steam")){
                    let str = `${args[0]}:\n`;
                    let _data = await statsData.findOne({steam: args[0].replace("@steam", '')});
                    let _Alldata = await statsData.find();
                    for (let i = 0; i < _data.ips.length; i++) {
                        const ip = _data.ips[i];
                        const __data = _Alldata.filter(x => x.ips != null && x.ips.filter(x => x == ip).length > 0 && x.steam != _data.steam);
                        if(__data.length > 0){
                            await require("ipinfo")(ip, 'bc63c70bd43c41').then(cLoc => {
                                str+=`${ip}: ${cLoc.city}, ${cLoc.region}, ${cLoc.country}:\n`;
                            });
                            __data.forEach(dd => {
                                if(dd.discord != '') str+=`${dd.discord}@discord `;
                                if(dd.steam != '') str+=`${dd.steam}@steam`;
                                str+='\n'
                            });
                            str+='\n\n'
                        }
                    }
                    const embed = new Discord.MessageEmbed().setColor('#ff0000')
                    .setAuthor(".ru", 'https://cdn..ru/scpsl/img/etc/fydne.png', 'https://.ru')
                    .setDescription(str);
                    message.channel.send(embed);
                }else if(args[0].includes("@discord")){
                    let str = `${args[0]}:\n`;
                    let _data = await statsData.findOne({discord: args[0].replace("@discord", '')});
                    let _Alldata = await statsData.find();
                    for (let i = 0; i < _data.ips.length; i++) {
                        const ip = _data.ips[i];
                        const __data = _Alldata.filter(x => x.ips != null && x.ips.filter(x => x == ip).length > 0 && x.discord != _data.discord);
                        if(__data.length > 0){
                            await require("ipinfo")(ip, 'bc63c70bd43c41').then(cLoc => {
                                str+=`${ip}: ${cLoc.city}, ${cLoc.region}, ${cLoc.country}:\n`;
                            });
                            __data.forEach(dd => {
                                if(dd.discord != '') str+=`${dd.discord}@discord `;
                                if(dd.steam != '') str+=`${dd.steam}@steam`;
                                str+='\n'
                            });
                            str+='\n\n'
                        }
                    }
                    const embed = new Discord.MessageEmbed().setColor('#ff0000')
                    .setAuthor(".ru", 'https://cdn..ru/scpsl/img/etc/fydne.png', 'https://.ru')
                    .setDescription(str);
                    message.channel.send(embed);
                }else{
                    const embed = new Discord.MessageEmbed().setColor('#ff0000')
                    .setAuthor(".ru", 'https://cdn..ru/scpsl/img/etc/fydne.png', 'https://.ru')
                    .setDescription('??');
                    message.channel.send(embed);
                }
            }
        }catch(e){
            let msg = `Произошла ошибка.\nКоманда: общие\nКод ошибки:\n${e}`;
            client.guilds.cache.get('616697847261298688').channels.cache.get('1160927665117724722').send(msg);
        }
    }
}
module.exports = general;