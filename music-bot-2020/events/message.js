const config = require("../config.js");
const cmdCooldown = {};
module.exports = class {
    constructor (client) {
        this.client = client;
    }

    async run (message) {
        const data = {};
        if(message.author.bot){
            return;
        }

        let client = this.client;
        data.config = client.config;
    
        if(message.guild){
            let guild = await client.findOrCreateGuild({ id: message.guild.id });
            data.guild = guild;
        }

        if(message.content.match(new RegExp(`^<@!?${client.user.id}>( |)$`))){
            return message.reply(`префикс этого сервера \`${data.guild.prefix}\``);
        }

        let prefix = client.functions.getPrefix(message, data);
        if(!prefix) return;
        let args = message.content.slice((typeof prefix === "string" ? prefix.length : 0)).trim().split(/ +/g);
        let command = args.shift().toLowerCase();
        let cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));
        
        if(!message.guild) return;
        
        let neededPermission = [];
        if(cmd !== undefined){
            if(!cmd.conf.botPermissions.includes("EMBED_LINKS")){
                cmd.conf.botPermissions.push("EMBED_LINKS");
            }
            cmd.conf.botPermissions.forEach((perm) => {
                if(!message.channel.permissionsFor(message.guild.me).has(perm)){
                    neededPermission.push(perm);
                }
            });
            if(neededPermission.length > 0){
                let msg = await message.channel.send("смешно..");
                setTimeout(() => msg.delete(), 2000);
                return message.channel.send(`<:xxx:674648543775948822> | Сначала дай права, а потом поговорим | ${neededPermission.map((p) => `\`${p}\``).join(", ")}`);
            }
            neededPermission = [];
            cmd.conf.memberPermissions.forEach((perm) => {
                if(!message.channel.permissionsFor(message.member).has(perm)){
                    neededPermission.push(perm);
                }
            });
            if(neededPermission.length > 0){
                return message.channel.send(`<:xxx:674648543775948822> | Сначала возьми права, а потом поговорим | ${neededPermission.map((p) => `\`${p}\``).join(", ")}`);
            }
            
            if(cmd.conf.ownerOnly && message.author.id !== client.config.owner.id){
                return message.channel.send(`<:xxx:674648543775948822> | Только ${config.owner.name} может использовать эту команду!`);
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
    
            let log = new this.client.logs({
                commandName: cmd.help.name,
                author: { username: message.author.username, discriminator: message.author.discriminator, id: message.author.id },
                guild: { name: message.guild ? message.guild.name : "dm", id: message.guild ? message.guild.id : "dm" }
            });
            log.save();
            try {
                cmd.run(message, args, data);
            } catch(e){
                console.error(e);
                return message.channel.send("<:xxx:674648543775948822> | Произошла ошибка. Повторите попытку через несколько минут.");
            }
        }
    }
};