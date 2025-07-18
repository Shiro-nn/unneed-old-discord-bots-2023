const Command = require("../../base/Command.js");
const Discord = require("discord.js");
const { canModifyQueue } = require("../../helpers/util");
class skip extends Command {
    constructor (client) {
        super(client, {
            name: "скип",
            dirname: __dirname,
            enabled: true,
            guildOnly: true,
            aliases: [ "skip" ],
            memberPermissions: [],
            botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            ownerOnly: false,
            cooldown: 0
        });
    }
    async run (message, args, data) {
        message.delete().catch();
        const queue = message.client.distube.getQueue(message);
        if(!queue){
            const embed = new Discord.MessageEmbed().setDescription(`\\💢 | Очереди нет.`).setColor(data.guild.color);
            let m = await message.reply(embed).catch();
            setTimeout(() => m.delete().catch(), 5000);
            return;
        }
        if(!canModifyQueue(message.member)) return;
        await message.client.distube.skip(message);
        const embed = new Discord.MessageEmbed().setDescription(`\\⏭ | ${message.author} пропустил трек`).setColor(data.guild.color);
        let m = await queue.initMessage.channel.send(embed).catch();
        setTimeout(() => m.delete().catch(), 5000);
    }
}
module.exports = skip;