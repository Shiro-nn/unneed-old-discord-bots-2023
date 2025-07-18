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
		const embed = new Discord.MessageEmbed().setColor(data.guild.color).setImage('https://cdn.fydne.xyz/bot/waiting.gif');
		let _msg = await message.channel.send({embeds: [embed]})
        const guildsCount = await this.client.guilds.cache.size;
        const usersCount = await this.client.users.cache.size;
        embed
            .setColor(data.guild.color)
            .setAuthor("Qurre", message.client.user.displayAvatarURL(), config.dashboard.baseURL)
            .addField('📊 Статистика', `Серверов: ${guildsCount}\nЮзеров: ${usersCount}`, true)
            .addField('⚙️ Версия', `Discord: ${Discord.version}\nNode.JS: ${process.version}`, true)
            .addField("\u200B", "\u200B")
            .setImage('');
        {
            const title = `<:online:674656375619452949> Shard #1`;
            const cpu = await GetCpu();
            embed.addField(title, `${this.client.guilds.cache.size} серверов\n${this.client.users.cache.size} юзеров\n${Math.round(this.client.ws.ping)} ms\n${Math.round((process.memoryUsage().heapUsed / 1024 / 1024))}mb ram\n${cpu.toFixed(2)}% cpu`, true);
        }
        {
            const title = `<:dnd:674656051328712704> Shard #2`;
            embed.addField(title, `0 серверов\n0 юзеров\n0 ms\n0mb ram\n0% cpu`, true);
        }
        _msg.edit({embeds: [embed]}).catch();
        function GetCpu(){
            return new Promise(resolve => {
                cpuStat.usagePercent(async function (err, percent, seconds) {
                    resolve(percent);
                });
            })
        }
    }
}
module.exports = stats;