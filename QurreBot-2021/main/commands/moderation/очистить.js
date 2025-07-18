const Command = require("../../base/Command.js");
const Discord = require("discord.js");
class clear extends Command {
    constructor (client) {
        super(client, {
            name: "очистить",
            dirname: __dirname,
            enabled: true,
            guildOnly: true,
            aliases: [ "clear" ],
			memberPermissions: [ "MANAGE_MESSAGES" ],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS", "MANAGE_MESSAGES" ],
            nsfw: false,
            ownerOnly: false,
            cooldown: 0
        });
    }
    async run (message, args, data) {
        await message.delete();
        let amount = args[0];
        if(!amount || isNaN(amount) || parseInt(amount) < 1){
            const __msg = await message.channel.send({
                embed: new Discord.MessageEmbed()
                .setDescription('<:thinking:781966946379104297> | Указано неверное значение. Оно должно быть числом')
                .setColor("#ff0000")
            });
            setTimeout(() => __msg.delete(), 4000);
            return;
        }
		const user = message.mentions.users.first();
        let user_str = '';
		if(user) user_str = ` от **${user}**.`;
        const editing_text = `<a:hourglass:909131354913005650> | Удаляется **${amount}** сообщений${user_str}`;
        let _strbar = '<:leftactive:999395517253562418>';
        for (let i = 0; i < 11; i++) _strbar += '<:central:999395787337384058>';
        let embed = new Discord.MessageEmbed()
        .setDescription(`${editing_text} (${0}/${amount})\n${_strbar}`)
        .setColor("#ffae00");
        let toDelete = await message.channel.send({embed});
        let deleted_messages = 0;
        const IntervalBar = setInterval(() => {
            let yesidontknow = '<:central:999395787337384058>';
            const ms_ = filledBar(amount, deleted_messages, 10, '<:central:999395787337384058>', '<:active:999395894824808480>')[0];
            if(!ms_.includes('<:central:999395787337384058>')) yesidontknow = '<:rightactive:999395665396383825>'
            embed.setDescription(`${editing_text} (${deleted_messages}/${amount})\n<:leftactive:999395517253562418>${ms_}${yesidontknow}`)
            try{toDelete.edit({embed});}catch{}
        }, 3000);
        let updating_amount = amount;
        while(updating_amount > 0) {
            let messages = await message.channel.messages.fetch({limit: 100});
            messages = messages.array();
            if(user) messages = messages.filter((m) => m.author.id === user.id);
            if(messages.length > updating_amount) messages.length = parseInt(updating_amount);
            messages = messages.filter(x => !x.pinned && x.id != toDelete.id && parseInt(x.id) < parseInt(toDelete.id));
            const messagesintthis = messages.length;
            await message.channel.bulkDelete(messages);
            deleted_messages += messagesintthis;
            updating_amount -= messagesintthis;
            if(messagesintthis == 0) updating_amount = 0;
        }
        clearInterval(IntervalBar)
        embed = new Discord.MessageEmbed()
        .setDescription(`<a:yes:793602282637230080> | Удалено **${amount}** сообщений${user_str}`)
        .setColor("#00ff19");
        await Edit(toDelete, {embed});
		setTimeout(() => toDelete.delete(), 5000);
        function Edit(message, newdata) {
            return new Promise(resolve => {
                try{message.edit(newdata).then(() => resolve()).catch(() => resolve());}catch{resolve()}
            });
        }
        function filledBar(total, current, size = 40, line = '□', slider = '■') {
            if (!total) throw new Error('Total value is either not provided or invalid');
            if (!current && current !== 0) throw new Error('Current value is either not provided or invalid');
            if (isNaN(total)) throw new Error('Total value is not an integer');
            if (isNaN(current)) throw new Error('Current value is not an integer');
            if (isNaN(size)) throw new Error('Size is not an integer');
            if (current > total) {
                const bar = slider.repeat(size + 2);
                const percentage = (current / total) * 100;
                return [bar, percentage];
            } else {
                const percentage = current / total;
                const progress = Math.round((size * percentage));
                const emptyProgress = size - progress;
                const progressText = slider.repeat(progress);
                const emptyProgressText = line.repeat(emptyProgress);
                const bar = progressText + emptyProgressText;
                const calculated = percentage * 100;
                return [bar, calculated];
            }
        };
    }
}
module.exports = clear;