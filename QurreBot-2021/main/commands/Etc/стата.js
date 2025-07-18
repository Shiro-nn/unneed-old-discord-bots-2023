const Command = require("../../base/Command.js");
const Discord = require("discord.js");
const config = require("../../config");
let cpuStat = require("cpu-stat");
class stats extends Command {
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
        let _img = "https://cdn.fydne.xyz/bot/waiting.gif";
		const embed = new Discord.MessageEmbed().setColor(data.guild.color).setImage(_img);
		let _msg = await message.channel.send({embed})
        let _id_cpu = 0;
        const guildsCounts = await this.client.shard.fetchClientValues("guilds.cache.size");
        const guildsCount = guildsCounts.reduce((p, count) => p + count);
        const usersCounts = await this.client.shard.fetchClientValues("users.cache.size");
        const usersCount = usersCounts.reduce((p, count) => p + count);
        const _shard = await this.client.shard;
        const results = await _shard.broadcastEval(() => {
            return [
                Math.round((process.memoryUsage().heapUsed / 1024 / 1024)),
                this.guilds.cache.size,
                this.users.cache.size,
                this.shard.ids[0],
                Math.round(this.ws.ping)
            ];
        });
        _img = "";
        embed
            .setColor(data.guild.color)
            .setAuthor("Qurre", message.client.user.displayAvatarURL(), config.dashboard.baseURL)
            .addField('📊 Статистика', `Серверов: ${guildsCount}\nЮзеров: ${usersCount}`, true)
            .addField('⚙️ Версия', `Discord: ${Discord.version}\nNode.JS: ${process.version}`, true)
            .addField("\u200B", "\u200B")
            .setImage(_img);
        results.forEach((shard) => {
            const title = `<:online:674656375619452949> Shard #${shard[3]+1}${_shard.ids.includes(shard[3]) ? "(текущий)" : ""}`;
            cpuStat.usagePercent(async function (err, percent, seconds) {
                embed.addField(title, `${shard[1]} серверов\n${shard[2]} юзеров\n${shard[4]}ms\n${shard[0]}mb ram\n${(percent/results.length).toFixed(2)}% cpu`, true);
                _id_cpu++;
            });
        });
        var _interval = setInterval(() => {
            if(_id_cpu >= results.length){
                _msg.edit({embed}).catch();
                clearInterval(_interval);
            }
        }, 100);
    }
}
module.exports = stats;