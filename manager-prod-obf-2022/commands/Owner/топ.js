const Command = require("../../base/Command.js");
const Discord = require("discord.js");
const statsData = require("../../base/stats");
const geoipData = require("../../base/geoip");

class search extends Command {

    constructor (client) {
        super(client, {
            name: "топ",
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
                if(args[0] == 'money' || args[0] == 'мани' || args[0] == 'баланс'){
                    let str = '';
                    let _data = await statsData.find();
                    _data = sortArrayOfObjects("money", _data);
                    function sortArrayOfObjects(key, arr){
                        let array = arr.slice(0);
                        return array.sort((a, b) => {
                            return b[key] - a[key];
                        });
                    }
                    for (let i = 0; i < 10; i++) {
                        const element = _data[i];
                        let userid = `${element.steam}@steam`;
                        if(userid == '@steam') userid = `${element.discord}@discord`;
                        str+=`${userid}: ${element.money} монет - ${element.lvl}lvl, ${element.xp}/${element.to}xp\n`;
                    }
                    const embed = new Discord.MessageEmbed().setColor('#ff0000')
                    .setAuthor(".ru", 'https://cdn..ru/scpsl/img/etc/fydne.png', 'https://.ru')
                    .setDescription(str);
                    message.channel.send(embed);
                }
                else if(args[0] == 'lvl' || args[0] == 'level' || args[0] == 'лвл' || args[0] == 'левел' || args[0] == 'уровень'){
                    let str = '';
                    let _data = await statsData.find();
                    _data = sortArrayOfObjects("lvl", _data);
                    function sortArrayOfObjects(key, arr){
                        let array = arr.slice(0);
                        return array.sort((a, b) => {
                            return b[key] - a[key];
                        });
                    }
                    for (let i = 0; i < 10; i++) {
                        const element = _data[i];
                        let userid = `${element.steam}@steam`;
                        if(userid == '@steam') userid = `${element.discord}@discord`;
                        str+=`${userid}: ${element.money} монет - ${element.lvl}lvl, ${element.xp}/${element.to}xp\n`;
                    }
                    const embed = new Discord.MessageEmbed().setColor('#ff0000')
                    .setAuthor(".ru", 'https://cdn..ru/scpsl/img/etc/fydne.png', 'https://.ru')
                    .setDescription(str);
                    message.channel.send(embed);
                }
                else if(args[0] == 'оборот'){
                    let _data = await statsData.find();
                    let total = 0;
                    for (let i = 0; i < _data.length; i++) total+=_data[i].money;
                    const embed = new Discord.MessageEmbed().setColor('#ff0000')
                    .setAuthor(".ru", 'https://cdn..ru/scpsl/img/etc/fydne.png', 'https://.ru')
                    .setDescription(`Монет в обороте - ${total}`);
                    message.channel.send(embed);
                }
                else if(args[0] == 'города'){
                    let _sdata = await statsData.find();
                    _sdata = _sdata.filter(x => x.ips.length > 0);
                    let ips = [];
                    for (let i = 0; i < _sdata.length; i++) {
                        const _el = _sdata[i];
                        if(_el.ips.length > 0){
                            const _ip = _el.ips[_el.ips.length-1];
                            if(_ip != null && ips.filter(x => x == _ip).length == 0) ips.push(_ip);
                        }
                    }
                    const _data = await geoipData.find();
                    let cities = [];
                    console.log(ips.length)
                    for (let i = 0; i < ips.length; i++) {
                        const _el = _data.find(x => x == ips[i]);
                        if(_el == undefined || _el == null) {/*console.log(ips[i]);*/}
                        else{
                            if(cities.filter(x => x.city == _el.city).length == 0) cities.push({city:_el.city, count:0});
                            cities.find(x => x.city == _el.city).count++;
                        }
                    }
                    cities = sortArrayOfObjects("count", cities);
                    cities = cities.filter(x => x.count > 1);
                    function sortArrayOfObjects(key, arr){
                        let array = arr.slice(0);
                        return array.sort((a, b) => {
                            return b[key] - a[key];
                        });
                    }
                    var str = 'Игроки играют из:\n';
                    cities.forEach(el => {
                        str += `${el.city} - ${el.count}\n`
                    });
                    console.log(str);
                    const embed = new Discord.MessageEmbed().setColor('#ff0000')
                    .setAuthor(".ru", 'https://cdn..ru/scpsl/img/etc/fydne.png', 'https://.ru')
                    .setDescription(str);
                    message.channel.send(embed);
                }
            }
        }catch(e){
            let msg = `Произошла ошибка.\nКоманда: топ\nКод ошибки:\n${e}`;
            client.guilds.cache.get('616697847261298688').channels.cache.get('1160927665117724722').send(msg);
        }
    }
}
module.exports = search;