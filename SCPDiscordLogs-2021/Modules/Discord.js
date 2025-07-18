module.exports = class Discord {
    constructor (token) {
        this.token = token;
    }
    async send(channel, content){
        const headers = {
            'User-Agent': 'DiscordBot (https://discord.com, 10)',
            'Content-Type':'application/json',
            'Authorization': 'Bot ' + this.token
        };
        const resp = await fetch(`https://discord.com/api/v9/channels/${channel}/messages`, { headers, body:JSON.stringify({content}), method:'POST' });
        console.log(resp)
    }
}