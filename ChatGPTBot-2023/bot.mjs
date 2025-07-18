import { createRequire } from "module";
const require = createRequire(import.meta.url);

import { Client, GatewayIntentBits, Partials, ActivityType, SlashCommandBuilder, Collection, REST, Routes, EmbedBuilder } from 'discord.js';

import fs from 'fs';

export default async(chatgpt) => {
    const loadingEmoji = '<a:loading:707642528916176947>';
    const __dirname = process.cwd();
    const client = new Client({
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.DirectMessages,
            GatewayIntentBits.DirectMessageTyping,
            GatewayIntentBits.MessageContent
        ],
        partials: [Partials.Channel]
    });

    client.on('ready', async() => {
        console.log('Ready');
        client.user.setPresence({activities: [{ name: 'за тобой', type: ActivityType.Watching }]});
        client.channels.cache.get('1090014244285730846').send(':question: Бот перезапущен');

        /*
        const commands = [];
        client.commands = new Collection();
        const commandImg = {
            data: new SlashCommandBuilder()
                .setName('image')
                .addStringOption(option => option.setName('desc').setDescription('Описание желаемого изображения').setRequired(true))
                .setDescription('Создает изображение (chat gpt api)'),
            async execute(interaction) {
                return interaction.reply('Отключено, используй <@1090359424708780103>');
                const desc = interaction.options.getString('desc');
                interaction.deferReply();
                const res = await fetch('https://api.openai.com/v1/images/generations', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + chatgpt._apiKey
                    },
                    body: JSON.stringify({
                        prompt: desc,
                        size: '1024x1024'
                    })
                });
                const data = await res.json();
                const img = data.data[0].url;
                const _embed = new EmbedBuilder()
	            .setColor('#ff0000')
	            .setDescription('GPT: Контекст изображения:\n' + desc)
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
        */
    });

    /*
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
    */

    client.on('messageCreate', async(message) => {
        if(message.author.bot) return;
        if(message.content.startsWith('//')) return;
        if(message.channel.id == '1090014244285730846' || message.channel.id == '1090311021056491600'){
            const _msg = message.content.replaceAll(`<@${client.user.id}>`, 'ChatGPT').trim();
            if(_msg.length < 1) return;
            const reply = await message.reply(loadingEmoji);
            let stopped = false;
            let errors = 0;
            let _textEdit = '';
            new Promise(async res => {
                while(!stopped){
                    if(_textEdit.length != 0) await reply.edit(loadingEmoji  + ' ' + _textEdit);
                    await new Promise(res => setTimeout(() => res(), 3000));
                }
                res();
            });
            Retry();
            async function Retry(defid = false) {
                try{
                    const parentMsg = fs.readFileSync(__dirname+'/parentMessage', 'utf8');
                    const res = await chatgpt.sendMessage(_msg, {
                        id: 'chatcmpl-7AyapExuFN9q51GYHnPcyJMEXx1JX',
                        conversationId: 'chatcmpl-7AyapExuFN9q51GYHnPcyJMEXx1JX',
                        parentMessageId: defid ? '6b3d270d-cf65-4592-b9be-bf2e4b78af27' : parentMsg,
                        onProgress: res => _textEdit = res.text
                    });
                    stopped = true;
                    fs.writeFileSync(__dirname+'/parentMessage', res.parentMessageId, {encoding: 'utf8'});
                    await reply.edit(res.text);
                    //const notify = await reply.reply(`${message.author} ^`);
                    //setTimeout(() => notify.delete(), 10000);
                }catch/*(e)*/{
                    //console.log(e.reason);
                    //console.log(JSON.parse(JSON.stringify(e)));
                    errors++;
                    reply.edit(loadingEmoji  + ' x' + (errors + 1))
                    if(errors == 5){
                        Retry(true)
                        return;
                    }
                    if(errors == 6){
                        stopped = true;
                        reply.edit('⚠️ Произошла ошибка при обращении к серверу');
                        return;
                    }
                    setTimeout(() => Retry(), 1000);
                }
            }
        }
        else if(message.content.includes(`<@${client.user.id}>`)){
            const _msg = message.content.replaceAll(`<@${client.user.id}>`, 'ChatGPT').trim();
            if(_msg.length < 1) return message.reply('Тут что-то есть? Сообщение пустое..');
            const reply = await message.reply(loadingEmoji);
            let stopped = false;
            let errors = 0;
            let _textEdit = '';
            new Promise(async res => {
                while(!stopped){
                    if(_textEdit.length != 0) await reply.edit(loadingEmoji  + ' ' + _textEdit);
                    await new Promise(res => setTimeout(() => res(), 3000));
                }
                res();
            });
            Retry();
            async function Retry() {
                try{
                    const res = await chatgpt.sendMessage(_msg, {
                        conversationId: 'fb41735b-4fc6-41e3-a674-48531879d50a',
                        parentMessageId: '6b3d270d-cf65-4592-b9be-bf2e4b78af27',
                        onProgress: res => _textEdit = res.text
                    });
                    stopped = true;
                    await reply.edit(res.text);
                    //const notify = await reply.reply(`${message.author} ^`);
                    //setTimeout(() => notify.delete(), 10000);
                }catch{
                    errors++;
                    reply.edit(loadingEmoji  + ' x' + (errors + 1))
                    if(errors == 5){
                        stopped = true;
                        reply.edit('⚠️ Произошла ошибка при обращении к серверу');
                        return;
                    }
                    setTimeout(() => Retry(), 1000);
                }
            }
            return;
        }
    });

    client.login('');
}