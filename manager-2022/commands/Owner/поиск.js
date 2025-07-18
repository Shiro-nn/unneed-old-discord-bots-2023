const Command = require("../../base/Command.js");
const Discord = require("discord.js");
const statsData = require("../../base/stats");
const ipinfo = require("ipinfo");
class search extends Command {

    constructor (client) {
        super(client, {
            name: "поиск",
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
                    for (let i = 0; i < _data.ips.length; i++) {
                        const ip = _data.ips[i];
                        await ipinfo(ip, 'bc63c70bd43c41').then(cLoc => {
                            str+=`${ip}: ${cLoc.city}, ${cLoc.region}, ${cLoc.country}\n`;
                        });
                    }
                    const embed = new Discord.MessageEmbed().setColor('#ff0000')
                    .setAuthor("scpsl.shop", 'https://cdn.scpsl.shop/scpsl/img/etc/fydne.png', 'https://scpsl.shop')
                    .setDescription(str);
                    message.channel.send(embed);
                }else if(args[0].includes("@discord")){
                    let str = `${args[0]}:\n`;
                    let _data = await statsData.findOne({discord: args[0].replace("@discord", '')});
                    for (let i = 0; i < _data.ips.length; i++) {
                        const ip = _data.ips[i];
                        await ipinfo(ip, 'bc63c70bd43c41').then(cLoc => {
                            str+=`${ip}: ${cLoc.city}, ${cLoc.region}, ${cLoc.country}\n`;
                        });
                    }
                    const embed = new Discord.MessageEmbed().setColor('#ff0000')
                    .setAuthor("scpsl.shop", 'https://cdn.scpsl.shop/scpsl/img/etc/fydne.png', 'https://scpsl.shop')
                    .setDescription(str);
                    message.channel.send(embed);
                }else{
                    statsData.find({}, async function(err, users) {
                        let str = `${args[0]}:\n`;
                        await ipinfo(args[0], 'bc63c70bd43c41').then(cLoc => {
                            str+=`${cLoc.city}, ${cLoc.region}, ${cLoc.country}\n`;
                        });
                        users.filter(x => x.ips != undefined && x.ips.filter(q => q == args[0]).length > 0).forEach(element => str += `${element.steam}@steam/${element.discord}@discord\n`);
                        const embed = new Discord.MessageEmbed().setColor('#ff0000')
                        .setAuthor("scpsl.shop", 'https://cdn.scpsl.shop/scpsl/img/etc/fydne.png', 'https://scpsl.shop')
                        .setDescription(str);
                        message.channel.send(embed);
                    });
                }
            }
        }catch(e){
            let msg = `Произошла ошибка.\nКоманда: поиск\nКод ошибки:\n${e}`;
            client.guilds.cache.get('616697847261298688').channels.cache.get('1160927665117724722').send(msg);
        }
    }
}
module.exports = search;