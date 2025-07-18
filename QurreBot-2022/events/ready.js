module.exports = class {
    constructor (client) {
        this.client = client;
    }
    async run () {
        let client = this.client;
        client.dashboard.load(client);
        const status = require("../config.js").status;
        setTimeout(async() => {
            let i = 0;
            while(true){
                if(i > status.length || status[i] == undefined) i = 0;
                client.user.setActivity(status[i].name, { type: status[i].type })
                client.user.setPresence({status: "dnd"})
                i++;
                await new Promise(r => setTimeout(r, 20000));
            }
        }, 0);
        client.user.setStatus('dnd');
        this.client.logger.log(`Bot launched`, 'debug');
    }
}