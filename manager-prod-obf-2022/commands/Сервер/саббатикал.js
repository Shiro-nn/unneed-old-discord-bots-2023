const Command = require("../../base/Command.js");
const Discord = require("discord.js");
const adminsData = require("../../base/admins");

class event extends Command {

    constructor (client) {
        super(client, {
            name: "саббатикал",
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
            if(message.channel.id != "1331708778919493794") return;
            const role = message.guild.roles.cache.get('1045047365016485998');
            const logChannel = message.guild.channels.cache.get('745653433180356609');
            const member = await message.guild.members.fetch(args[1]);
            if(!member) return;

            const userdata = await client.findAccount({discord: member.user.id});
            if(userdata == null){
                const embed = new Discord.MessageEmbed()
                .setDescription(`${args.join('')} не найден в бд (Не привязан дискорд) ||Вводите его id, а не ник||`)
                .setColor('#ff0000')
                let w = await message.channel.send(embed);
                setTimeout(()=> w.delete(), 5000);
                return;
            }

            const adm = await adminsData.findOne({id: userdata.id});
            if(adm == null || adm == undefined) return;

            if(args[0] == "выдать") {
                adm.sabbatical = true;
                await adm.save();
                const embed = new Discord.MessageEmbed()
                .setDescription(`${member} взял саббатикал`)
                .setColor(`#12d45a`)
                logChannel.send(embed);
                member.roles.add(role);
                let w = await message.channel.send(embed);
                setTimeout(()=> w.delete(), 5000);
                member.send(embed);
            } else if(args[0] == "снять") {
                adm.sabbatical = false;
                await adm.save();
                const embed = new Discord.MessageEmbed()
                .setDescription(`${member} вышел из саббатикала`)
                .setColor(`#12d4b6`)
                logChannel.send(embed);
                member.roles.remove(role);
                let w = await message.channel.send(embed);
                setTimeout(()=> w.delete(), 5000);
                member.send(embed);
            }
        }catch(e){
            let msg = `Произошла ошибка.\nКоманда: саббатикал\nКод ошибки:\n${e}`
            client.guilds.cache.get('616697847261298688').channels.cache.get('1160927665117724722').send(msg);
        }
    }
}
module.exports = event;
