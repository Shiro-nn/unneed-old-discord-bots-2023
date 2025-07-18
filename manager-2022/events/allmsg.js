module.exports = class {
    constructor (client) {
        this.client = client;
    }

    async run (message) {
        if(/(\b(https?|ftp|file):\/\/(?!(tenor.com))(?!((.+?).tenor.com))(?!(discord.com))(?!((.+?).discord.com))(?!(discordapp.com))(?!((.+?).discordapp.com))(?!((.+?).discordapp.net))(?!((.+?).scpsl.shop))(?!(scpsl.shop))([-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|]))/ig.test(message.content)){
            try{
                if(!message.member.roles.cache.find(role => role.id === '652763954258378752') &&
                !message.channel.permissionsFor(message.member).has("MANAGE_MESSAGES") &&
                (message.channel.id == '798136794402258964' || message.channel.id == '691937847384604712' || message.channel.id == '772065917323968522'
                || message.channel.id == '803223413069709312' || message.channel.id == '796106226450694204' || message.channel.id == '753255961325731950')){
                    message.delete();
                    message.author.send("Ваше сообщение:\n```"+message.content+"```");
                    let _msg_ = await message.channel.send(`${message.author} | Ваше сообщение содержало ссылку, поэтому оно было удалено. Если оно было непреднамеренным, вы можете отредактировать ваше сообщение еще раз, оно было отправлено вам лс.`);
                    setTimeout(() => _msg_.delete().catch(), 10000);
                    return;
                }
            }catch{}
        }
        const data = {};
        if(message.author.bot && message.author.id !== this.client.user.id){
            return;
        }

        let client = this.client;
        data.config = client.config;

        if(message.content.match(new RegExp(`^<@!?${client.user.id}>( |)$`))){
            return message.reply("префикс этого сервера `*`");
        }

        let prefix = client.functions.getPrefix(message, data);
        if(!prefix) return;
        let args = message.content.slice((typeof prefix === "string" ? prefix.length : 0)).trim().split(/ +/g);
        let command = args.shift().toLowerCase();
        let cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));
        if(cmd !== undefined){
            if(cmd.conf.ownerOnly && message.author.id !== client.config.owner.id){
                return message.channel.send(`<:xxx:674648543775948822> | Только ${client.config.owner.name} может использовать эту команду!`);
            }
            try {cmd.run(message, args, client);}catch{}
        }
    }
};