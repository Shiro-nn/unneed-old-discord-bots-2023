module.exports = class {
    constructor(client) {
        this.client = client;
    }
    async run(interaction) {
        if (!interaction.isButton()) return;
        if(interaction.customId == 'TicketBottom') this.client.emit('Ticket', interaction);
        else if(interaction.customId == 'CloseTicketBottom') this.client.emit('ReactCheck', interaction);
        else if(interaction.customId == 'CloseTicketSubmitBottom') this.client.emit('TicketClosing', interaction);
    }
};