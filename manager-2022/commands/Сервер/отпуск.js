const Command = require("../../base/Command.js");
const Discord = require("discord.js");

class event extends Command {

    constructor (client) {
        super(client, {
            name: "отпуск",
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
            if(message.channel.id != "1312845967501824102") return;
            const role = message.guild.roles.cache.get('1315394026194862231');
            const logChannel = message.guild.channels.cache.get('1312841141539836134');
            const member = await message.guild.members.fetch(args[1]);
            if(!member) return;
            if(args[0] == "выдать") {
                const embed = new Discord.MessageEmbed()
                .setDescription(`${member} ушел в отпуск`)
                .setColor(`#57c1ff`)
                logChannel.send(embed);
                member.roles.add(role);
                let w = await message.channel.send(embed);
                setTimeout(()=> w.delete(), 5000);
                member.send(embed);
            } else if(args[0] == "снять") {
                const embed = new Discord.MessageEmbed()
                .setDescription(`${member} вышел из отпуска`)
                .setColor(`#001aff`)
                logChannel.send(embed);
                member.roles.remove(role);
                let w = await message.channel.send(embed);
                setTimeout(()=> w.delete(), 5000);
                member.send(embed);
            }
        }catch(e){
            let msg = `Произошла ошибка.\nКоманда: отпуск\nКод ошибки:\n${e}`
            client.guilds.cache.get('616697847261298688').channels.cache.get('1160927665117724722').send(msg);
        }
    }
}
module.exports = event;