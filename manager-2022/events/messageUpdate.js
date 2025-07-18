module.exports = class {
    constructor(client) {
        this.client = client;
    }
    async run(oldMessage, newMessage) {
        this.client.emit('allmsg', newMessage);
    }
};