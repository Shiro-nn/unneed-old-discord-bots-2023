module.exports = class {
    constructor (client) {
        this.client = client;
    }
    async run () {
        let client = this.client;
        client.user.setStatus('invisible');
        client.dashboard.load(client);
        require("../helpers/checkUnmutes.js").init(client);
    }
}