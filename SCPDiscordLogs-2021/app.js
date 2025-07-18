const appdata = require('appdata-path');
const { black } = require("chalk");
const cfg = require(`${appdata.getAppDataPath("Qurre/Configs/DiscordLogs")}`);
const logger = require("./Modules/Logger");
const Discord = require("discord.js");
const { Server } = require('qurre-socket');
async function Init() {
    for (let i = 0; i < cfg.length; i++) {
        const config = cfg[i];
        if(config.token == '') continue;
        const prefix = config.prefix;
        const client = await login(new Discord.Client(), config.token);
        if(client == null){
            logger.log('An error occurred while enabling one of the bots', 'warn');
            continue;
        }
        try{client.user.setPresence({ activity: { name: `${config.translate.no_server}`, type: 'LISTENING' }, status: 'dnd' }).catch(() => {});}catch{}
        const _server = new Server(config.port, config.host);
        _server.on('connection', (socket) => {
            let verified = false;
            socket.on('send.token', ([token]) => {
                if(config.PluginToken != token) return;
                if(!verified){
                    verified = true;
                    try{client.channels.cache.get(config.logs).send(`[<t:${Math.floor(Date.now() / 1000)}:T>] ${config.translate.connect}`).catch(() => {});}catch{}
                    try{client.user.setPresence({ activity: { name: `0 ${config.translate.player}`, type: 'LISTENING' }, status: 'idle' }).catch(() => {});}catch{}
                    socket.on('ban', ([banned, banner, reason, time]) => {
                        if (config.bklogs == '' || config.bklogs == null || config.bklogs == undefined) return;
                        const ava = client.user.displayAvatarURL();
                        logger.log(`${banned} has been banned by ${banner}. Reason: ${reason}. Until ${time}`, "ban");
                        let embed = new Discord.MessageEmbed()
                        .setAuthor(config.name, ava)
                        .setTitle(config.translate.ban)
                        .setColor("#ff0000")
                        .setDescription(`${config.translate.ban_msg.replaceAll('%banned%', `${banned}`).replaceAll('%banner%', `${banner}`).replaceAll('%reason%', `${reason}`).replaceAll('%to%', `${time}`)}`)
                        .setFooter('© Qurre Team')
                        .setTimestamp();
                        try{client.channels.cache.get(config.bklogs).send(embed).catch(() => {});}catch{}
                    });
                    socket.on('kick', ([kicked, kicker, reason]) => {
                        if (config.bklogs == '' || config.bklogs == null || config.bklogs == undefined) return;
                        const ava = client.user.displayAvatarURL();
                        logger.log(`${kicked} has been kicked by ${kicker}. Reason: ${reason}.`, "kick");
                        let embed = new Discord.MessageEmbed()
                        .setAuthor(config.name, ava)
                        .setTitle(config.translate.kick)
                        .setColor("#ffff00")
                        .setDescription(`${config.translate.kick_msg.replaceAll('%kicked%', `${kicked}`).replaceAll('%kicker%', `${kicker}`).replaceAll('%reason%', `${reason}`)}`)
                        .setFooter('© Qurre Team')
                        .setTimestamp();
                        try{client.channels.cache.get(config.bklogs).send(embed).catch(() => {});}catch{}
                    });
                    socket.on('msg', ([message]) => {
                        if (message == '' || message == null || message == undefined) return;
                        if (config.logs == '' || config.logs == null || config.logs == undefined) return;
                        try{client.channels.cache.get(config.logs).send(message).catch(() => {});}catch{}
                    });
                    socket.on('ra', ([message]) => {
                        if (message == '' || message == null || message == undefined) return;
                        if (config.ralogs == '' || config.ralogs == null || config.ralogs == undefined) return;
                        try{client.channels.cache.get(config.ralogs).send(message).catch(() => {});}catch{}
                    });
                    socket.on('tk', ([message]) => {
                        if (message == '' || message == null || message == undefined) return;
                        if (config.tklogs == '' || config.tklogs == null || config.tklogs == undefined) return;
                        try{client.channels.cache.get(config.tklogs).send(message).catch(() => {});}catch{}
                    });
                    socket.on('players', ([amout]) => {
                        try{
                            if(amout === 0){
                                client.user.setPresence({ activity: { name: `${amout} ${config.translate.players}`, type: 'LISTENING' }, status: 'idle' }).catch(() => {});
                            }else{
                                var pms = config.translate.players;
                                if(amout === 1 || amout === 2 || amout === 3| amout === 4 || amout === 21 || amout === 31){
                                    pms = config.translate.playera;
                                }
                                client.user.setPresence({ activity: { name: `${amout} ${pms}`, type: 'LISTENING' }, status: 'online' }).catch(() => {});
                            }
                        }catch{}
                    });
                    socket.on('channelstatus', ([data]) => {
                        if (config.logs == '' || config.logs == null || config.logs == undefined) return;
                        try{client.channels.cache.get(config.logs).setTopic(data).catch(() => {});}catch{}
                    });
                    socket.on('reply', ([message]) => {
                        if (message == '' || message == null || message == undefined) return;
                        if (config.rasend == '' || config.rasend == null || config.rasend == undefined) return;
                        try{client.channels.cache.get(config.rasend).send(message).catch(() => {});}catch{}
                    });
                    socket.on('disconnect', () => {
                        try{client.channels.cache.get(config.logs).send(`[<t:${Math.floor(Date.now() / 1000)}:T>] ${config.translate.disconnect}`);}catch{}
                        try{client.user.setPresence({ activity: { name: `${config.translate.no_server}`, type: 'LISTENING' }, status: 'dnd' }).catch(() => {});}catch{}
                    });
                }
            });
        });
        await _server.initialize();
        logger.log(`Successfully enabled. Bot: ${black.bgWhite(client.user.username+'#'+client.user.discriminator)}`, "ready");
        client.on('message', async(message) => {
            if(message.channel.id != config.rasend) return;
            if(message.content.indexOf(prefix) == 0){
                const cmq = message.content.slice((typeof prefix === "string" ? prefix.length : 0)).trim().split(/ +/g).join(' ');
                if(cmq == '') return;
                _server.emit('send-to-ra', message.author.username, cmq);
            }
            if(message.content.indexOf(client.user.id) == 0){
                const cmq = message.content.slice((typeof client.user.id === "string" ? client.user.id.length : 0)).trim().split(/ +/g).join(' ');
                if(cmq == '') return;
                _server.emit('send-to-ra', message.author.username, cmq);
            }
        });
        await sleep(2000);
    }
}
Init();
function sleep(ms){return new Promise(resolve => setTimeout(resolve, ms));}
function login(client, token) {
    return new Promise(resolve => {
        let already = false;
        client.on('ready', () => {
            if(already) return;
            resolve(client);
            already = true;
        });
        client.login(token).catch(() => {resolve(null)});
    });
}

process.on("unhandledRejection", (err) => logger.log(err, "error"));
process.on("uncaughtException", (err) => logger.log(err, "error"));


//clear cache from ram every 12 hours
const { exec } = require('child_process');
setInterval(() => exec('sync; echo 1 > /proc/sys/vm/drop_caches'), 1000 * 60 * 60 * 12);