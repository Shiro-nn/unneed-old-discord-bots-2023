const { Client, Collection } = require("discord.js"),
util = require("util"),
path = require("path");

class fydne extends Client {

    constructor (options) {
        super(options);
        this.config = require("../config");
        this.commands = new Collection();
        this.aliases = new Collection();
        this.logger = require("../helpers/logger");
        this.wait = util.promisify(setTimeout);
        this.functions = require("../helpers/functions");
        this.accountsData = require("./accounts");
    }
    loadCommand (commandPath, commandName) {
        try {
            const props = new (require(`${commandPath}${path.sep}${commandName}`))(this);
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
        delete require.cache[require.resolve(`${commandPath}${path.sep}${commandName}.js`)];
        return false;
    }
    async findAccount(param, isLean){
        let accountsData = this.accountsData;
        return new Promise(async function (resolve, reject){
            let accountData = (isLean ? await accountsData.findOne(param).lean() : await accountsData.findOne(param));
            resolve(accountData);
        });
    }
    async findOrCreateAccount(param, isLean){
        let accountsData = this.accountsData;
        return new Promise(async function (resolve, reject){
            let accountData = (isLean ? await accountsData.findOne(param).lean() : await accountsData.findOne(param));
            if(accountData){
                resolve(accountData);
            } else {
                accountData = new accountsData(param);
                await accountData.save();
                resolve(isLean ? accountData.toJSON() : accountData);
            }
        });
    }
}

module.exports = fydne;