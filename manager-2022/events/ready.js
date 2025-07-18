module.exports = class {
    constructor (client) {
        this.client = client;
    }
    async run () {
        let client = this.client;
        client.emit('fydnestata');
        client.emit('react');
        setInterval(() => client.user.setActivity('https://scpsl.shop', { url: 'https://twitch.tv/0', type: 'STREAMING' }), 60000);
        client.user.setActivity('https://scpsl.shop', { url: 'https://twitch.tv/0', type: 'STREAMING' });
    }
}