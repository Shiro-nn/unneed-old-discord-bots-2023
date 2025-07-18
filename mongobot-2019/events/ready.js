module.exports = class {

    constructor(client) {
        this.client = client;
    }

    async run() {
        let client = this.client;
        client.emit('helpinfydne');
        const status = require("../config.js").status,
            version = require("../package.json").version;
        let i = 0;
        setInterval(function () {
            let toDisplay = status[parseInt(i, 10)].name.replace("{serversCount}", client.guilds.size) + " | v" + version;
            client.user.setActivity(toDisplay, { type: status[parseInt(i, 10)].type });
            if (status[parseInt(i + 1, 10)]) i++
            else i = 0;
        }, 20000); // Every 20 seconds
        client.user.setStatus('idle');
    }
}