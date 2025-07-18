const Discord = require("discord.js");
const { MessageActionRow, MessageButton, MessageEmbed, Intents } = require('discord.js');
const fydne = require("./base/fydne"),
client = new fydne({
	allowedMentions: {parse: ['users', 'roles'], repliedUser: true},
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS]
});
const init = async () => {
    client.loadEvents("./events");
    client.login(client.config.token);
};
init();/*
client.on('interactionCreate', interaction => {
	if (!interaction.isButton()) return;
	console.log(interaction);
    interaction.reply({ content: 'Hello!', ephemeral: true });
});
client.on('messageCreate', async interaction => {
    if(interaction.author.bot)return;
    const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('primary')
                .setLabel('Открыть тикет')
                .setEmoji('909019422868512788')
                .setStyle('PRIMARY'),
        );

    const embed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Some title')
        .setURL('https://discord.js.org')
        .setDescription('Some description here');

    await interaction.reply({embeds: [embed], components: [row]});
});*/
client.on("disconnect", () => client.logger.log("Bot is disconnecting...", "warn"))
    .on("reconnecting", () => client.logger.log("Bot reconnecting...", "log"))
    .on("error", (e) => client.logger.log(e, "error"))
    .on("warn", (info) => client.logger.log(info, "warn"));

process.on("unhandledRejection", (err) => console.error(err));
process.on("uncaughtException", (err) => console.error(err));