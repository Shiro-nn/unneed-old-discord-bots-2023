const config = require("../config.js");
const cmdCooldown = {};
const AntiFloodManager = require("../base/AntiFlood");
module.exports = class {
    constructor (client) {
        this.client = client;
        this.spam = new AntiFloodManager(this.client);
    }
    async run (message) {
        const data = {};
        if(message.author.bot) return;
        if(!message.guild) return;
        let client = this.client;
        data.config = client.config;
        if(message.guild){
            let _guild = await this.client.database.Guilds.findById(message.guild.id)
            if(!_guild) _guild = await this.client.database.Guilds({_id: message.guild.id}).save();
            data.guild = _guild;
        }
        if(data.guild.antiAds.enabled && !data.guild.antiAds.ignored.includes(message.channel.id)){
            if(/(\.(gg|io|me|li)\/.+|discordapp\.com\/invite\/.+)/i.test(message.content)){
                if(!message.channel.permissionsFor(message.member).has("MANAGE_MESSAGES")){
                    message.delete();
                    message.author.send("Ваше сообщение:\n```"+message.content+"```");
                    let _msg_ = await message.channel.send(`${message.author} | Ваше сообщение содержало приглашение Discord, поэтому оно было удалено. Если оно было непреднамеренным, вы можете отредактировать ваше сообщение еще раз, оно было отправлено вам лс.`);
                    setTimeout(() => _msg_.delete().catch(), 10000);
                    return;
                }
            }
        }
        if(data.guild.antiLinks.enabled && !data.guild.antiLinks.ignored.includes(message.channel.id)){
            if(/(\b(https?|ftp|file):\/\/(?!(tenor.com))(?!((.+?).tenor.com))(?!(discord.com))(?!((.+?).discord.com))(?!(discordapp.com))(?!((.+?).discordapp.com))(?!((.+?).discordapp.net))(?!((.+?).scpsl.store))(?!(scpsl.store))([-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|]))/ig.test(message.content)){
                if(!message.channel.permissionsFor(message.member).has("MANAGE_MESSAGES")){
                    try{
                        let TicketLogs = await this.client.database.TicketLogs.find({channel:message.channel.id});
                        if (TicketLogs.length < 1){
                            message.delete();
                            message.author.send("Ваше сообщение:\n```"+message.content+"```");
                            let _msg_ = await message.channel.send(`${message.author} | Ваше сообщение содержало ссылку, поэтому оно было удалено. Если оно было непреднамеренным, вы можете отредактировать ваше сообщение еще раз, оно было отправлено вам лс.`);
                            setTimeout(() => _msg_.delete().catch(), 10000);
                            return;
                        }
                    }catch{
                        message.delete();
                        message.author.send("Ваше сообщение:\n```"+message.content+"```");
                        let _msg_ = await message.channel.send(`${message.author} | Ваше сообщение содержало ссылку, поэтому оно было удалено. Если оно было непреднамеренным, вы можете отредактировать ваше сообщение еще раз, оно было отправлено вам лс.`);
                        setTimeout(() => _msg_.delete().catch(), 10000);
                        return;
                    }
                }
            }
        }
        if(message.guild){
            this.spam.test(message, data.guild)
        }
        if(message.content.match(new RegExp(`^<@!?${client.user.id}>( |)$`))) return message.reply(`префикс этого сервера \`${data.guild.prefix}\``);
        let prefix = client.functions.getPrefix(message, data);
        if(!prefix) return;
        let args = message.content.slice((typeof prefix === "string" ? prefix.length : 0)).trim().split(/ +/g);
        let command = args.shift().toLowerCase();
        let cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));
        let neededPermission = [];
        if(cmd !== undefined){
            if(!cmd.conf.botPermissions.includes("EMBED_LINKS")) cmd.conf.botPermissions.push("EMBED_LINKS");
            cmd.conf.botPermissions.forEach((perm) => {
                if(!message.channel.permissionsFor(message.guild.me).has(perm)){
                    neededPermission.push(perm);
                }
            });
            if(neededPermission.length > 0){
                let msg = await message.reply("смешно..");
                setTimeout(() => msg.delete(), 2000);
                return message.reply(`<:xxx:674648543775948822> | Сначала дай права, а потом поговорим | ${neededPermission.map((p) => `\`${p}\``).join(", ")}`);
            }
            neededPermission = [];
            cmd.conf.memberPermissions.forEach((perm) => {
                if(!message.channel.permissionsFor(message.member).has(perm)){
                    neededPermission.push(perm);
                }
            });
            if(neededPermission.length > 0){
                return message.reply(`<:xxx:674648543775948822> | Сначала возьми права, а потом поговорим | ${neededPermission.map((p) => `\`${p}\``).join(", ")}`);
            }
            if(cmd.conf.ownerOnly && message.author.id !== client.config.owner.id){
                return message.channel.send(`<:xxx:674648543775948822> | Сначала стань ${config.owner.name}, а потом поговорим.`);
            }
            let uCooldown = cmdCooldown[message.author.id];
            if(!uCooldown){
                cmdCooldown[message.author.id] = {};
                uCooldown = cmdCooldown[message.author.id];
            }
            let time = uCooldown[cmd.help.name] || 0;
            if(time && (time > Date.now())){
                return message.channel.send(`<:xxx:674648543775948822> | Вы должны подождать **${Math.ceil((time-Date.now())/1000)}** секунд, чтобы снова использовать команду!`);
            }
            cmdCooldown[message.author.id][cmd.help.name] = Date.now() + cmd.conf.cooldown;
            client.logger.log(`${message.author.username} (${message.author.id}) ran command ${cmd.help.name}`, "cmd");
            try{cmd.run(message, args, data);}
            catch(e)
            {
                message.channel.send("<:xxx:674648543775948822> | Произошла ошибка. Повторите попытку позже.");
                let msg = `Произошла ошибка.\nИвент: message\nКод ошибки:\n${e}`;
                this.client.channels.cache.get(this.client.config.errors_channel).send(msg);
            }
        }
    }
};