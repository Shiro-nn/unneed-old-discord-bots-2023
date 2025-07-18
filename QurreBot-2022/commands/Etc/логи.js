const Command = require("../../base/Command.js");
const Discord = require("discord.js");
const { exec } = require("child_process");
const { token } = require("../../config");
const config = require("../../config");
const axios = require('axios');
const guid=function(){return'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'.replace(/[xy]/g,function(c){var r=Math.random()*16|0,v=c=='x'?r:r&0x3|0x8;return v.toString(16);});}
class Logs extends Command {
    constructor (client) {
        super(client, {
            name: "логи",
            dirname: __dirname,
            enabled: true,
            guildOnly: false,
            aliases: ["logs"],
            memberPermissions: [],
            botPermissions: [],
            nsfw: false,
            ownerOnly: true,
            cooldown: 3000
        });
    }

    async run (message, args) {
        const hash = guid();
        const logs_msg = await message.channel.send({embeds:[new Discord.MessageEmbed().setColor('#ff0000').setDescription('Сохранение логов <a:hourglass:909131354913005650>')]});
        exec(`${config.dotnet} ${config.directory}/DiscordChatExporter.CLI/DiscordChatExporter.Cli.dll export -t `+
        `"${token}" -b -c ${message.channel.id} -f HtmlDark -o "${config.root_directory}/tickets/${hash}/index.html"`, async (error) => ChangeMessage(error));
        function ChangeMessage(error){
            if(error) logs_msg.edit({embeds:[new Discord.MessageEmbed().setColor('#ff0000').setDescription('<:errorv1:674651259424473088> Произошла ошибка при сохранении логов.')]});
            else logs_msg.edit({embeds:[new Discord.MessageEmbed().setColor('#15ff00').setDescription(`[Логи сохранены](https://bot.fydne.xyz/tickets/${hash}) <:agree:760107426065416242>`)]});
        }
    }

}

module.exports = Logs;