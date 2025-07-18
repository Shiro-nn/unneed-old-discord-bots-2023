const Discord = require("../dis.js");
module.exports = class {
    constructor(client) {
        this.client = client;
    }

    async run(oldMessage, newMessage) {
        this.client.emit('message', newMessage);
    }
};
