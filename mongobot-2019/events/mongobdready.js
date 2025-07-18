const Discord = require("../dis.js");

module.exports = class {

    constructor(client) {
        this.client = client;
    }

    async run() {//reactcheck
        let client = this.client;
        const BotData = await client.findOrCreateBot();
        BotData.reactmessage.forEach(async (closereact) => {
            client.emit('reactcheck', closereact.id.did, closereact.id.cid, closereact.id.gid, closereact.id.mu, closereact.id.chn, closereact.id.ri);
        });
    }
};