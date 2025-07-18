module.exports = class {

    constructor (client) {
        this.client = client;
    }

    async run () {
        let client = this.client;
        const startAt = Date.now();
        const status = require("../config.js").status,
        version = require("../package.json").version;
        let i = 0;
        let shid = this.client.shard.ids[0];
        setInterval(function(){
            let gsh = shid;
            gsh++;
            let toDisplay = `${status[parseInt(i, 10)].name} | Shard: ${gsh} | v${version}`;
            client.user.setActivity(toDisplay, {type: status[parseInt(i, 10)].type, shardID: [shid]});
            if(status[parseInt(i+1, 10)]) i++
            else i = 0;
            client.user.setStatus('dnd', { shardID: [shid] });
        }, 20000);
        client.user.setStatus('dnd');
        this.client.logger.log(`Shard #${shid} launched`, 'debug');
        if (!process.argv.includes("--uncache")) await this.client.wait(1000);
        if (this.client.shard.ids.includes(0)) console.log("=================================================");
        console.log("\x1b[32m%s\x1b[0m", `SHARD [${shid}]`, "\x1b[0m", `Invites fetched in ${Date.now() - startAt} ms.`);
        console.log("=================================================");
        if (this.client.shard.ids.includes(this.client.shard.count-1)){
            this.client.shard.broadcastEval(() => {
                console.log("\x1b[32m%s\x1b[0m", `SHARD [${this.shard.ids[0]}]`, "\x1b[0m", `Serving ${this.users.cache.size} users in ${this.guilds.cache.size} servers.`);
            });
        }
    }
}