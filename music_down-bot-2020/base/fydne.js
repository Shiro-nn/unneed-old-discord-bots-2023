const { Client, Collection } = require("discord.js"),
util = require("util"),
path = require("path");

class fydne extends Client {

    constructor (options) {
        super(options);
        this.spawned = false;
        this.config = require("../config"); // Load the config file
        this.commands = new Collection(); // Creates new commands collection
        this.aliases = new Collection(); // Creates new command aliases collection
        this.logger = require("../helpers/logger"); // Load the logger file
        this.wait = util.promisify(setTimeout); // client.wait(1000) - Wait 1 second
        this.functions = require("../helpers/functions"); // Load the functions file
    }

    // This function is used to load a command and add it to the collection
    loadCommand (commandPath, commandName) {
        try {
            const props = new (require(`.${commandPath}${path.sep}${commandName}`))(this);
            this.logger.log(`Loading Command: ${props.help.name}. 👌`, "log");
            props.conf.location = commandPath;
            if (props.init){
                props.init(this);
            }
            this.commands.set(props.help.name, props);
            props.conf.aliases.forEach((alias) => {
                this.aliases.set(alias, props.help.name);
            });
            return false;
        } catch (e) {
            this.logger.log(`Unable to load command ${commandName}: ${e}`, "error");
        }
    }

    // This function is used to unload a command (you need to load them again)
    async unloadCommand (commandPath, commandName) {
        let command;
        if(this.commands.has(commandName)) {
            command = this.commands.get(commandName);
        } else if(this.aliases.has(commandName)){
            command = this.commands.get(this.aliases.get(commandName));
        }
        if(!command){
            return `The command \`${commandName}\` doesn't seem to exist, nor is it an alias. Try again!`;
        }
        if(command.shutdown){
            await command.shutdown(this);
        }
        delete require.cache[require.resolve(`.${commandPath}/${commandName}.js`)];
        return false;
    }
}

module.exports = fydne;