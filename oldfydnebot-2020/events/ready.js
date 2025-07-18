const Discord = require("discord.js"),
giveaways = require("discord-giveaways");

module.exports = class {

    constructor (client) {
        this.client = client;
    }

    async run () {
        let client = this.client;
        /* DiscordBots.org STATS */
        // let discordbotsorg = require("../helpers/discordbots.org.js");
        // discordbotsorg.init(client);

        /* UNMUTE USERS */
        let checkUnmutes = require("../helpers/checkUnmutes.js");
        checkUnmutes.init(client);

        /* SEND REMIND */
        //let checkReminders = require("../helpers/checkReminders.js");
        //checkReminders.init(client);

        // Start the dashboard
        if(client.config.dashboard.enabled){
            client.dashboard.load(client);
        }

        // Start update of giveaways
        let giveawaysOptions = { updateCountdownEvery: 15000, ignoreIfHasPermission: [ "ADMINISTRATOR" ], storage: require("path").resolve()+"/giveaways.json" };
        giveaways.launch(client, giveawaysOptions);

        // Update the game every 20s
        const status = require("../config.js").status,
        version = require("../package.json").version;
        let i = 0;
        setInterval(function(){
            let toDisplay = status[parseInt(i, 10)].name.replace("{serversCount}", client.guilds.size)+" | v"+version;
            client.user.setActivity(toDisplay, {type: status[parseInt(i, 10)].type});
            if(status[parseInt(i+1, 10)]) i++
            else i = 0;
        }, 20000); // Every 20 seconds
    }
}  