module.exports = class {

    constructor(client) {
        this.client = client;
    }

    async run(guildid) {
        let client = this.client;
        const guildData = await client.findOrCreateGuild({ id: guildid });
        if (guildData.autohentai) {
            client.emit('hentaisendguild', guildid);
        }
    }
};