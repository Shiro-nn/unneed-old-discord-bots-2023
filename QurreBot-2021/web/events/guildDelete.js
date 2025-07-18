module.exports = class {
  constructor (client) {
    this.client = client;
  }
  async run (guild) {
    await this.client.database.TicketLogs.deleteMany({guild: guild.id});
  }
}