module.exports = class {

    constructor(client) {
        this.client = client;
    }

    async run(message) {
        let client = this.client;
        let arq = message.content.slice().trim().split(/ +/g);
        let cmq = arq.shift().toLowerCase();
        if (cmq == `панимаю`) {
            await message.react('721549022615044177');
            if (Math.random() * (100 - 1) + 1 < 7) {
                message.channel.send();
            }
        };
        if (cmq == `бан`) {
            let fydneURL = 'https://media.tenor.com/images/f7318dc4710db6cf50ff17bb488dce5e/tenor.gif';
            let messageOptions = {};
            messageOptions.files = [
                {
                    name: "admin.gif",
                    attachment: fydneURL
                }
            ]
            message.channel.send(messageOptions);
        }
    }
};