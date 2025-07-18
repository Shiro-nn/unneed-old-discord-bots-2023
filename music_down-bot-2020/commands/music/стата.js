const Command = require("../../base/Command.js");
const Discord = require("discord.js");
const config = require("../../config");

class help extends Command {

    constructor (client) {
        super(client, {
            name: "стата",
            dirname: __dirname,
            enabled: true,
            guildOnly: true,
            aliases: [ "stats" ],
            memberPermissions: [],
            botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            ownerOnly: false,
            cooldown: 0
        });
    }
    async run (message, args, data) {
        message.delete().catch();
        const guildsCounts = await this.client.shard.fetchClientValues("guilds.cache.size");
        const guildsCount = guildsCounts.reduce((p, count) => p + count);
        const usersCounts = await this.client.shard.fetchClientValues("users.cache.size");
        const usersCount = usersCounts.reduce((p, count) => p + count);
        
        const results = await this.client.shard.broadcastEval(() => {
            return [
                Math.round((process.memoryUsage().heapUsed / 1024 / 1024)),
                this.guilds.cache.size,
                this.users.cache.size,
                this.shard.ids[0],
                Math.round(this.ws.ping)
            ];
        });

        const embed = new Discord.MessageEmbed()
            .setColor(data.config.embed.color)
            .setAuthor("fydne", message.client.user.displayAvatarURL(), config.dashboard.baseURL)
            .addField('📊 Статистика', `Серверов: ${guildsCount}\nЮзеров: ${usersCount}`, true)
            .addField('⚙️ Версия', `Discord: ${Discord.version}\nNode.JS: ${process.version}`, true)
            .addField("\u200B", "\u200B");
        results.forEach((shard) => {
            const title = `<:online:674656375619452949> Shard #${shard[3]+1}${this.client.shard.ids.includes(shard[3]) ? "(текущий)" : ""}`
            embed.addField(title, `${shard[1]} серверов\n${shard[2]} юзеров\n${shard[4]}ms\n${shard[0]}mb ram`, true);
        });

        let messageOptions = {};
        messageOptions.embed = embed;

        message.channel.send(messageOptions).catch();
    }
}
module.exports = help;