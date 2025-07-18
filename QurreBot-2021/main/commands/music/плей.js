const Command = require("../../base/Command.js");
const Discord = require("discord.js");
class play_com extends Command {
    constructor (client) {
        super(client, {
            name: "плей",
            dirname: __dirname,
            enabled: true,
            guildOnly: true,
            aliases: [ "play" ],
            memberPermissions: [],
            botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            ownerOnly: false,
            cooldown: 1
        });
    }
    async run (message, args, data) {
        message.delete().catch();
        const { channel } = message.member.voice;
        const serverQueue = message.client.queue.get(message.guild.id);
        if (!channel) {
            let m = await message.reply(`зайди в войс`).catch();
            setTimeout(() => m.delete().catch(), 5000);
            return;
        }
        if (serverQueue && channel !== message.guild.me.voice.channel){
            let m = await message.reply(`вы должны быть в том же канале, что и ${message.client.user}`).catch();
            setTimeout(() => m.delete().catch(), 5000);
            return;
        }
        if (!args.length){
            let m = await message.reply(`пример: ${data.guild.prefix}плей <Название | Soundcloud URL>`).catch();
            setTimeout(() => m.delete().catch(), 5000);
            return;
        }
        const permissions = channel.permissionsFor(message.client.user);
        if (!permissions.has("CONNECT")){
            let m = await message.reply("не удается подключиться к голосовому каналу, отсутствуют разрешения");
            setTimeout(() => m.delete().catch(), 5000);
            return;
        }
        if (!permissions.has("SPEAK")){
            let m = await message.reply("Я не могу говорить в этом голосовом канале, убедитесь, что у меня есть соответствующие разрешения");
            setTimeout(() => m.delete().catch(), 5000);
            return;
        }
        const embed = new Discord.MessageEmbed().setDescription(`<a:hourglass:848864540392161290> | Добавление музыки в очередь...`).setColor(data.guild.color);
        const m = await message.channel.send(embed).catch();
        setTimeout(() => m.delete().catch(), 5000);
        await message.client.distube.play(message, args.join(" "));
    }
}
module.exports = play_com;