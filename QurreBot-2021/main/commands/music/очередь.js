const Command = require("../../base/Command.js");
const Discord = require("discord.js");
class queue extends Command {
    constructor (client) {
        super(client, {
            name: "очередь",
            dirname: __dirname,
            enabled: true,
            guildOnly: true,
            aliases: [ "queue" ],
            memberPermissions: [],
            botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS", "ADD_REACTIONS", "MANAGE_MESSAGES" ],
            nsfw: false,
            ownerOnly: false,
            cooldown: 0
        });
    }
    async run (message, args, data) {
        message.delete().catch();
        let messageOptions = {};
        const serverQueue = message.client.distube.getQueue(message);
        if(!serverQueue){
            messageOptions.embed = new Discord.MessageEmbed().setDescription(`\\❌ | На этом сервере ничего не играет`).setColor(data.guild.color);
            let m = await message.channel.send(messageOptions).catch();
            setTimeout(() => m.delete().catch(), 5000);
            return;
        }
        try{
            let currentPage = 0;
            const embeds = generateQueueEmbed(message, serverQueue.songs, data);
            messageOptions.embed = embeds[currentPage];
            const queueEmbed = await message.channel.send(`**Текущая страница - ${currentPage + 1}/${embeds.length}**`, messageOptions);
            await queueEmbed.react("⬅️");
            await queueEmbed.react("⏹");
            await queueEmbed.react("➡️");
            const filter = (reaction, user) => ["⬅️", "⏹", "➡️"].includes(reaction.emoji.name) && message.author.id === user.id;
            const collector = queueEmbed.createReactionCollector(filter, { time: 60000 });
            collector.on("collect", async (reaction, user) => {
                try{
                    if(reaction.emoji.name === "➡️"){
                        if(currentPage < embeds.length - 1){
                            currentPage++;
                            messageOptions.embed = embeds[currentPage];
                            queueEmbed.edit(`**Текущая страница - ${currentPage + 1}/${embeds.length}**`, messageOptions);
                        }
                    }else if(reaction.emoji.name === "⬅️"){
                        if(currentPage !== 0){
                            --currentPage;
                            messageOptions.embed = embeds[currentPage];
                            queueEmbed.edit(`**Текущая страница - ${currentPage + 1}/${embeds.length}**`, messageOptions);
                        }
                    }else{
                        collector.stop();
                        reaction.message.reactions.removeAll();
                    }
                    await reaction.users.remove(message.author.id);
                }catch{
                    messageOptions.embed = new Discord.MessageEmbed().setDescription(`\\❌ | **Нужны права - [ADD_REACTIONS, MANAGE_MESSAGES]!**`).setColor(data.guild.color);
                    let m = await message.channel.send(messageOptions).catch();
                    setTimeout(() => {
                        m.delete().catch();
                    }, 5000);
                    return;
                }
            });
        }catch{
            messageOptions.embed = new Discord.MessageEmbed().setDescription(`\\❌ | **Нужны права - [ADD_REACTIONS, MANAGE_MESSAGES]!**`).setColor(data.guild.color);
            let m = await message.channel.send(messageOptions).catch();
            setTimeout(() => m.delete().catch(), 5000);
            return;
        }
    }
};
function generateQueueEmbed(message, queue, data) {
    const embeds = [];
    let k = 10;
    for(let i = 0; i < queue.length; i += 10){
        const current = queue.slice(i, k);
        let j = i;
        k += 10;
        const info = current.map((track) => `${++j} - [${track.name}](${track.url})`).join("\n");
        const embed = new Discord.MessageEmbed()
        .setTitle("Очередь песен\n")
        .setThumbnail(message.guild.iconURL())
        .setColor(data.guild.color)
        .setDescription(`**Текущая песня - [${queue[0].name}](${queue[0].url})**\n\n${info}`)
        .setTimestamp();
        embeds.push(embed);
    }
    return embeds;
}
module.exports = queue;