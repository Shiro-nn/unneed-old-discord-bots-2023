const Discord = require("discord.js");

module.exports = class {

    constructor(client) {
        this.client = client;
    }

    async run() {
        try{
            let client = this.client;
            const server = client.guilds.cache.get('616697847261298688');
            const channelz = server.channels.cache.get('673122211011493918');
            const reactmssags = await channelz.messages.fetch('809410074387677255');
            setInterval(() => {
                function getDateParse(date) {
                    let int = Math.floor(date.getTime() / 1000);
                    return '<t:'+int+':D>\n(<t:'+int+':R>)';
                }
                let verifLevels = ["Отсутствует", "Минимальная", "Средняя", "(╯°□°）╯︵  ┻━┻", "┻━┻ミヽ(ಠ益ಠ)ノ彡┻━┻"];
                let ver = function(__){
                    let _ = 0;
                    if(__ == "LOW") _ = 1;
                    else if(__ == "MEDIUM") _ = 2;
                    else if(__ == "HIGH") _ = 3;
                    else if(__ == "VERY_HIGH") _ = 4;
                    return _;
                }
                let stata = {};
                stata.embed = new Discord.MessageEmbed()
                    .setColor('#ff0000')
                    .setAuthor(server.name, `https://cdn.scpsl.shop/scpsl/img/etc/fydne.png`, `https://scpsl.shop`)
                    .setImage(`https://cdn.discordapp.com/splashes/${server.id}/${server.splash}.jpg?size=4096`)
                    .addField(`<:tagwindow:674653493503590424> Название`, server.name, true)
                    .addField(`<:calendar:674652483921903626> Создан`, getDateParse(server.createdAt), true)
                    .addField(`<:group:674653361991319593> Участников`, `${server.memberCount}`, true)
                    .addField(`<:nomicrophone:674654470013190175> AFK канал`, server.afkChannel || `отсутствует`, true)
                    .addField(`<:idverified:674654639634776106> ID`, server.id, true)
                    .addField(`<:crown:674651844957569025> Создатель`, `дед инсайд`, true) // <@!${server.ownerID}>
                    .addField(`<:nitro:674655772453634048> Nitro Boosts`, `${server.premiumTier || 0} уровень | ${server.premiumSubscriptionCount || 0} бустов`, true)
                    .addField("<:admincom:674657061186830357> Уровень верификации", verifLevels[ver(server.verificationLevel)], true)
                    .addField(":united_nations: Регион", '<:ruempire:1161711826640326706> Россия', true)
                    .addField(`<:filledchat:674654363171422217> Каналов`, `${server.channels.cache.filter((ch) => ch.type === "voice").size} голосовых | ${server.channels.cache.filter((ch) => ch.type === "text").size} текстовых | ${server.channels.cache.filter((ch) => ch.type === "category").size} категорий`, true)
                    .setTimestamp()
                reactmssags.edit(stata)
            }, 30000);
        }catch(e){
            let msg = `Произошла ошибка.\nИвент: fydnestata\nКод ошибки:\n${e}`;
            this.client.guilds.cache.get('616697847261298688').channels.cache.get('1160927665117724722').send(msg);
        }
    }
};