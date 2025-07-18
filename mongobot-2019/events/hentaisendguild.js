const { get } = require('node-superfetch');
module.exports = class {

    constructor(client) {
        this.client = client;
    }

    async run(guildid) {
        let client = this.client;
        const guild = client.guilds.get(guildid);
        const BotData = await client.findOrCreateBot();
        await BotData.hentaisend++;
        await BotData.save();
        const guildData = await client.findOrCreateGuild({ id: guild.id });

        let messageOptions = {};
        //if(!message.channel.nsfw) return message.channel.send(`🚫 | **${message.author.username}**, ${nsfwAns}`)
        try {
            const channel = guild.channels.get(guildData.autohentaichannel);
            const { body } = await get('https://nekobot.xyz/api/image?type=hentai')
            await guildData.hentaimsg++;
            await guildData.save();
            let name = body.message.split('.')[body.message.split('.').length - 1];
            messageOptions.files = [
                {
                    name: "hentai."+name,
                    attachment: body.message
                }
            ]
            channel.send(`Авто хентай`, messageOptions);
            await guildData.save();
            setTimeout(hentaisend, guildData.autohentaitime * 1000 * 60);
        } catch (e) {
            client.logger.log(`Ошибка в авто хентае: ${e.message}`, 'warn')
        }
        async function hentaisend() {
            client.emit('hentaichekguild', guild.id);
        }
    }
};