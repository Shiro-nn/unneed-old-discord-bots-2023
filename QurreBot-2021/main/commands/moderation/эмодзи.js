const Command = require("../../base/Command.js");
class emoji extends Command {
    constructor (client) {
        super(client, {
            name: "эмодзи",
            dirname: __dirname,
            enabled: true,
            guildOnly: true,
            aliases: [ "emoji" ],
            memberPermissions: [ "MANAGE_GUILD" ],
            botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS", "MANAGE_GUILD" ],
            nsfw: false,
            ownerOnly: false,
            cooldown: 0
        });
    }
    async run (message, args, data) {
        let url = args[0];
        if(!url) return message.channel.send('<:thinking:781966946379104297>, и какой же мне эмодзи добавлять?');
        let name = args[1];
        if(!name) return message.channel.send('<:thinking:781966946379104297>, и какое же мне название эмодзи указать?');
        message.guild.emojis.create(url, name).then((emote) => {
            message.channel.send(`Эмодзи \`${emote.name}\` успешно добавлен. ID: \`${emote.toString()}\``);
        }).catch(() => message.channel.send('URL к изображению недействителен или у вас больше нет места для эмодзи, либо изображение весит больше 256кб.'));
    }
}
module.exports = emoji;