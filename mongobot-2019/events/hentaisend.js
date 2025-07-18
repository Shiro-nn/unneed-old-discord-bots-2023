module.exports = class {

    constructor(client) {
        this.client = client;
    }

    async run() {
        let client = this.client;
        let _id = 0;
        client.guilds.forEach(async (guild) => {
            let int = (_id+1) * 1000;
            _id++;
            var length = Math.ceil((Math.log(int)/Math.log(2))/8);
            if(length > 32){
                client.logger.log(`${length} byte`, "warn");
                int = 0;
            }
            setTimeout(async() => {
                const guildData = await client.findOrCreateGuild({ id: guild.id });
                if (guildData.autohentai) {
                    client.emit('hentaisendguild', guild.id);
                }
            }, int);
        });
    }
};