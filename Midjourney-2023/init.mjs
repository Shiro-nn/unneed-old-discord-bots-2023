import { Client, GatewayIntentBits, Partials, ActivityType, SlashCommandBuilder, Collection, REST, Routes, EmbedBuilder } from 'discord.js';

import midjourney from "midjourney-client";

(async() => {
    const client = new Client({
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.MessageContent
        ],
        partials: [Partials.Channel]
    });

    client.on('ready', async() => {
        console.log('Ready');
        client.user.setPresence({activities: [{ name: 'на изображения', type: ActivityType.Watching }]});

        const commands = [];
        client.commands = new Collection();
        const commandImg = {
            data: new SlashCommandBuilder()
                .setName('image')
                .addStringOption(option => option.setName('desc').setDescription('Описание желаемого изображения').setRequired(true))
                .setDescription('Создает изображение'),
            async execute(interaction) {
                const desc = interaction.options.getString('desc');
                interaction.deferReply();
                const res = await midjourney(desc);
                const img = res[0];
                const _embed = new EmbedBuilder()
	            .setColor('#ff0000')
	            .setDescription('Контекст изображения:\n' + desc)
	            .setImage(img)
                interaction.editReply({embeds: [_embed]});
            }
        };
        commands.push(commandImg.data.toJSON())
        client.commands.set('image', commandImg);
        const rest = new REST({ version: '10' }).setToken(client.token);
        await rest.put(
            Routes.applicationCommands(client.user.id), {
                body: commands
            },
        );
    });

    client.on('interactionCreate', async interaction => {
        if(!interaction.isChatInputCommand()) return;
        const command = client.commands.get(interaction.commandName);
        if(!command) return;
        try{
            await command.execute(interaction);
        }catch{
            try{await interaction.reply({content: 'Произошла ошибка при исполнении команды', ephemeral: true});}catch{}
        }
    });

    client.login('');
})()