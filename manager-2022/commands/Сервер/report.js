const Command = require("../../base/Command.js");

class command extends Command {

    constructor (client) {
        super(client, {
            name: "репорт",
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
            if(message.channel.id === '1210385334643327017'){

                if (args.length < 3) {
                    message.reply('Должно быть более 3-х аргументов:\n*репорт `UserID` `IP` `Причина`\nЕсли не знаете IP - используйте `0.0.0.0`');
                    return;
                }
                //message.delete();

                const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJndWlsZCI6IjExMTExMTExMTExMTExMTExMSIsImV4cCI6NDg2MzMyNDY2NSwiaXNzIjoiQVBJIn0.0RIqu2yZjRCHJwGUeIXDj9kAAeI52ZDMHtaGHJB8kEw';
                const resp = await fetch('http://212.22.85.131/api/cheaters/report-cheater', {
                    method: 'POST',
                    headers: {
                        'Authorization': token,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        UserId: args[0],
                        IpAddress: args[1],
                        Reason: args.slice(2).join(' '),
                        Evidence: 'подтверждаю.'
                    })
                });
                const auth = await resp.text();
                
                message.reply(auth);
            }
        }catch(e){
            let msg = `Произошла ошибка.\nКоманда: репорт\nКод ошибки:\n${e}`
            client.guilds.cache.get('616697847261298688').channels.cache.get('1160927665117724722').send(msg);
        }
    }
}
module.exports = command;