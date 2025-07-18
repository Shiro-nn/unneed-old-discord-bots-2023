module.exports = class {
    constructor (client) {
        this.client = client;
    }
    async run () {
        let client = this.client;
        const guild = client.guilds.cache.get('616697847261298688');
        const ch = guild.channels.cache.get('664979536982704151');
        const ver = await ch.messages.fetch('841625878375039008');
        const game = await ch.messages.fetch('841625883600224286');
        const news = await ch.messages.fetch('841625890731196426');
        /*{
            let Discord = require("discord.js");
            const embed = new Discord.MessageEmbed().setColor('#ff0000').setDescription(`:unlock: - Получить роль <@&652763954258378752>\n^Прочитайте правила в <#616699425376567296>`)
            let __ = await ch.send(embed);
            await __.react('🔓')
        }
        {
            let Discord = require("discord.js");
            const embed = new Discord.MessageEmbed().setColor('#ff0000').setDescription(`<:game:761583713380597801> - Получить роль <@&654616522513448960>\n<:nogame:749973480081981480> - Убрать роль <@&654616522513448960>\n^Бот пингует эту роль в ^<#721376508639313920>^`)
            let __ = await ch.send(embed);
            await __.react('761583713380597801')
            await __.react('749973480081981480')
        }
        {
            let Discord = require("discord.js");
            const embed = new Discord.MessageEmbed().setColor('#ff0000').setDescription(`<:news:827511383234445343> - Получить роль news(<@&652602744430919684>)\n<:no_news:827511372148899841> - Убрать роль news(<@&652602744430919684>)\n^Эта роль пингуется в новостях`)
            let __ = await ch.send(embed);
            await __.react('827511383234445343')
            await __.react('827511372148899841')
        }*/
        ver.createReactionCollector((reaction, user) => !user.bot, { time: 0 })
        .on('collect', async reaction => {
            let user = reaction.users.cache.filter(x => !x.bot).last();
            //reaction.users.remove(user);
            if (reaction.emoji.name === '🔓') {
                let member = await guild.members.fetch(user);
                member.roles.add(['652763954258378752']);
            }
        });
        game.createReactionCollector((reaction, user) => !user.bot, { time: 0 })
        .on('collect', async reaction => {
            let user = reaction.users.cache.filter(x => !x.bot).last();
            //reaction.users.remove(user);
            if (reaction.emoji.id === '761583713380597801') {
                let member = await guild.members.fetch(user);
                member.roles.add(['654616522513448960']);
            }
            if (reaction.emoji.id === '749973480081981480') {
                let member = await guild.members.fetch(user);
                member.roles.remove("654616522513448960");
            }
        });
        news.createReactionCollector((reaction, user) => !user.bot, { time: 0 })
        .on('collect', async reaction => {
            let user = reaction.users.cache.filter(x => !x.bot).last();
            //reaction.users.remove(user);
            if (reaction.emoji.id === '827511383234445343') {
                let member = await guild.members.fetch(user);
                member.roles.add(['652602744430919684']);
            }
            if (reaction.emoji.id === '827511372148899841') {
                let member = await guild.members.fetch(user);
                member.roles.remove("652602744430919684");
            }
        });
    }
}