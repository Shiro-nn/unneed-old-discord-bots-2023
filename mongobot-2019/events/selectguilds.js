const Discord = require("../dis.js");

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
                client.emit('ticketenable0', guild);
                client.emit('ticketenable1', guild);
                client.emit('ticketenable2', guild);
                client.emit('ticketenable3', guild);
                client.emit('ticketenable4', guild);
                client.emit('ticketenable5', guild);
                client.emit('ticketenable6', guild);
                client.emit('ticketenable7', guild);
                client.emit('ticketenable8', guild);
                client.emit('ticketenable9', guild);
            }, int);
        });
    }
};