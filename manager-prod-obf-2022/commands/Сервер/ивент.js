const Command = require("../../base/Command.js");
const Discord = require("discord.js");

class event extends Command {

    constructor (client) {
        super(client, {
            name: "ивент",
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
            if(message.channel.id === '654390863861907477'){
                message.delete();
                var reason = "";
                args.forEach(element => {
                    if(element !== args[0]){
                        reason += element;
                        reason += " ";
                    }
                });
                let messageOptions = {};
                messageOptions.embed = new Discord.MessageEmbed()
                .setAuthor('Ивент:')
                .setDescription(`${reason}`)
                .addField('Проводит:', `<@!${message.author.id}>`)
                .addField('Сервер:', `${args[0]}`)
                .setColor('#ff0000');
                message.guild.channels.cache.get('721376508639313920').send("<@&654616522513448960>", messageOptions);
            }
        }catch(e){
            let msg = `Произошла ошибка.\nКоманда: ивент\nКод ошибки:\n${e}`
            client.guilds.cache.get('616697847261298688').channels.cache.get('1160927665117724722').send(msg);
        }
    }
}
module.exports = event;