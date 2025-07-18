module.exports = class {
    constructor(client) {
        this.client = client;
    }
    async run(channel) {
        await this.client.database.TicketLogs.deleteMany({channel: channel.id});
    }
};