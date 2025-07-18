const Command = require("../../base/Command.js"),
Discord = require("../../dis.js");
const config = require("../../config");
const { exec } = require("child_process");

class ticket_close extends Command {

    constructor(client) {
        super(client, {
            name: "логи",
            dirname: __dirname,
            enabled: true,
            guildOnly: true,
            aliases: [],
            memberPermissions: [],
            botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
            nsfw: false,
            ownerOnly: false,
            cooldown: 0
        });
    }
    async run(message, args, data) {
        data.bot.reactmessage.forEach(async (closereact) => {
            if (closereact.id.cid === message.channel.id) {
                let cid = closereact.id.cid;
                message.delete();
                let guildData = data.guild;
                const closembed = new Discord.RichEmbed().setColor(guildData.color).setDescription(guildData.ticketsave)
                let f = await message.channel.send(closembed);
                exec(`dotnet ${config.hehe}/DiscordChatExporter.CLI/DiscordChatExporter.Cli.dll export -t "${config.token}" -b -c ${cid} -f HtmlDark -o "${config.hehe}/dashboard/public/tickets/${cid}/index.html"`, async (error, stdout, stderr) => {
                    if (error) {
                        console.log(error)
                        setTimeout(errorsave, 5000);
                        return;
                    }
                    if (stderr) {
                        setTimeout(trysave, 5000);
                        return;
                    }
                    setTimeout(trysave, 5000);
                    return;
                });
                async function errorsave() {
                    const ticketerrorsave = new Discord.RichEmbed().setColor('#ff0000').setDescription(guildData.ticketerrorsave)
                    f.edit(ticketerrorsave);
                    return;
                }
                async function trysave() {
                    const savembed = new Discord.RichEmbed().setColor('#15ff00').setDescription(`${guildData.ticketlogsaved}\n[Логи](https://bot.fydne.xyz/tickets/${cid})`)
                    f.edit(savembed);
                    return;
                }
            }
        });
    }
}
module.exports = ticket_close;