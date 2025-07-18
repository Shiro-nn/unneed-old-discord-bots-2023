const config = require("../config.js");

const Discord = require("../dis.js"),
xpCooldown = {},
cmdCooldown = {};

module.exports = class {
    constructor (client) {
        this.client = client;
    }

    async run (message) {

        const data = {};
        if(message.guild){
            /*
            if(data.guild.plugins.automod.enabled && !data.guild.plugins.automod.ignored.includes(message.channel.id)){
                if(/(discord\.(gg|io|me|li)\/.+|discordapp\.com\/invite\/.+)/i.test(message.content)){
                    if(!message.channel.permissionsFor(message.member).has("MANAGE_MESSAGES")){
                        message.delete();
                        message.author.send("```"+message.content+"```");
                        return message.channel.send(message.language.get("AUTOMOD_MSG", message));
                    }
                }
            }*/
        }
        // If the messagr author is a bot
        if(message.author.bot){
            return;
        }

        if(this.client.config.proMode && message.guild){
            if((!this.client.config.proUsers.includes(message.guild.ownerID) || this.guilds.filter((g) => g.ownerID === message.guild.ownerID) > 1) && message.guild.ownerID !== this.client.config.owner.id){
                return message.guild.leave();
            }
        }

        let client = this.client;
        data.config = client.config;
    
        if(message.guild){
            // Gets guild data
            let guild = await client.findOrCreateGuild({ id: message.guild.id });
            data.guild = guild;
        }
        
        const BotData = await client.findOrCreateBot();
        data.bot = BotData;

        // Check if the bot was mentionned
        if(message.content.match(new RegExp(`^<@!?${client.user.id}>( |)$`))){
            return message.reply(`префикс этого сервера \`${data.guild.prefix}\``);
        }

        if(message.content === "@someone" && message.guild){
            return client.commands.get("someone").run(message, null, data);
        }

        if(message.guild){
            // Gets the data of the member
            let memberData = await client.findOrCreateMember({ id: message.author.id, guildID: message.guild.id });
            data.memberData = memberData;
            client.emit('adminreactadd', memberData, message);
            client.emit('aroflmsg', message);
        }

        let userData = await client.findOrCreateUser({ id: message.author.id });
        data.userData = userData;

        if(message.guild && data.guild.level){
            await updateXp(message, data);
        }
        let prefix = client.functions.getPrefix(message, data);
        if(!prefix){
            return;
        }
        let args = message.content.slice((typeof prefix === "string" ? prefix.length : 0)).trim().split(/ +/g);
        let command = args.shift().toLowerCase();
        let cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));
        
        if(!message.guild){
            return;
        }
        
        if(message.guild){
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
            }
        }

        if(cmd !== undefined){
            if(cmd.conf.ownerOnly && message.author.id !== client.config.owner.id){
                return message.channel.send(`<:xxx:674648543775948822> | Только ${config.owner.name} может использовать эту команду!`);
            }
        }

        if(cmd !== undefined){
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
    
            if(!data.userData.achievements.firstCommand.achieved){
                data.userData.achievements.firstCommand.progress.now = 1;
                data.userData.achievements.firstCommand.achieved = true;
                data.userData.markModified("achievements.firstCommand");
                await data.userData.save();
                await message.channel.send({ files: [
                    {
                        name: "unlocked.png",
                        attachment: "./assets/img/achievements/achievement_unlocked2.png"
                    }
                ]});
            }
        }

        try {
            if(cmd !== undefined){
                cmd.run(message, args, data, client);
                if(cmd.help.category === "Moderation" && data.guild.autoDeleteModCommands){
                    message.delete();
                }
            }
        } catch(e){
            console.error(e);
            return message.channel.send("<:xxx:674648543775948822> | Произошла ошибка. Повторите попытку через несколько минут.");
        }
    }
};

/**
 * xp
 * This function update userdata by adding xp
*/

async function updateXp(msg, data) {

    // Gets the user informations
    let points = parseInt(data.memberData.exp);
    let level = parseInt(data.memberData.level);

    // if the member is already in the cooldown db
    let isInCooldown = xpCooldown[msg.author.id];
    if (isInCooldown) {
        if (isInCooldown > Date.now()) {
            return;
        }
    }
    // Records in the database the time when the member will be able to win xp again (3min)
    let toWait = Date.now() + 60000;
    xpCooldown[msg.author.id] = toWait;

    // Gets a random number between 10 and 5 
    let won = Math.floor(Math.random() * (Math.floor(10) - Math.ceil(5))) + Math.ceil(5);

    let newXp = parseInt(points + won, 10);

    // calculation how many xp it takes for the next new one
    let neededXp = 5 * (level * level) + 80 * level + 100;

    // check if the member up to the next level
    if (newXp > neededXp) {
        data.memberData.level = parseInt(level + 1, 10);
        var embed = new Discord.RichEmbed()
            .setTitle(msg.author.username)
            .setDescription(`Вы получили **${data.memberData.level}** уровень.`)
            .setColor(data.guild.color)
            .setThumbnail(msg.author.displayAvatarURL);
        let msgLvl = await msg.channel.send(embed);
        data.memberData.exp = parseInt(newXp, 10);
        await data.memberData.save();
        try{
            if(data.bot.reactmessage.filter(x => x.id.cid == message.channel.id).length > 0)
            setTimeout(() => msgLvl.delete(), 5000);
        }catch{}
        return;
    }
    data.memberData.exp = parseInt(newXp, 10);
    await data.memberData.save();
}
