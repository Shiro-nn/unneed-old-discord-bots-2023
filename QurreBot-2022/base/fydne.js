const { Client, Collection } = require("discord.js"),
util = require("util"),
fs = require("fs"),
readdir = util.promisify(fs.readdir),
path = require("path");
const EventHandler = require("./EventHandlers");

class fydne extends Client {
    constructor (options) {
        super(options);
		this.config = require("../config");
        this.logger = require("../helpers/logger");
        this.wait = util.promisify(setTimeout);
        this.functions = require("../helpers/functions");
		this.database = require("./MongoDB");
		this.commands = new Collection();
		this.aliases = new Collection();
		this.events = new EventHandler(this);
		this.player = new Map();
        this.dashboard = require("../dashboard/app");
    }
	async loadCommands(_path){
        let directories = await readdir(_path);
        directories.forEach(async (dir) => {
            let commands = await readdir(`${_path}${path.sep}${dir}${path.sep}`);
            commands.filter((cmd) => cmd.split(".").pop() === "js").forEach((cmd) => this.loadCommand(`${_path}${path.sep}${dir}`, cmd));
        });
		return this;
	}
    loadCommand(commandPath, commandName){
        try{
            const props = new (require(`.${commandPath}${path.sep}${commandName}`))(this);
            this.logger.log(`Loading Command: ${props.help.name}. 👌`, "log");
            props.conf.location = commandPath;
            if (props.init) props.init(this);
            this.commands.set(props.help.name, props);
            props.conf.aliases.forEach((alias) => {
                this.aliases.set(alias, props.help.name);
            });
            return false;
        }catch(e){this.logger.log(`Unable to load command '${commandName}': ${e}`, "error")}
    }
    async unloadCommand(commandPath, commandName){
        let command;
        if(this.commands.has(commandName)) command = this.commands.get(commandName);
        else if(this.aliases.has(commandName)) command = this.commands.get(this.aliases.get(commandName));
        if(!command)return `The command \`${commandName}\` doesn't seem to exist, nor is it an alias. Try again!`;
        if(command.shutdown) await command.shutdown(this);
        delete require.cache[require.resolve(`.${commandPath}${path.sep}${commandName}.js`)];
        return false;
    }
	loadEvents(_path) {
		readdir(_path, (err, files) => {
			if(err) this.logger.log(`Unable to load Events: ${err}`, "error");
			files.forEach(ev => {
				const event = new (require(`.${_path}${path.sep}${ev}`))(this)
				this.events.add(ev.split(".")[0], event)
			})
		})
		return this;
	}
	reloadEvent(eventPath, eventName) {
		const event = this.events.events.filter(x => x.name == eventName) > 0;
		if(!event) return false;
		const dir = `${eventPath}${path.sep}${eventName}.js`;
		const status = this.events.remove(eventName);
		if(!status) return status;
		delete require.cache[require.resolve(`${dir}`)];
		try{
			const Event = require(`${dir}`);
			const event = new Event(this);
			this.events.add(eventName, event);
			return true;
		}catch(e){return e;}
	}
	async resolveMember(search, guild){
		let member = null;
		if(!search || typeof search !== "string") return;
		if(search.match(/^<@!?(\d+)>$/)){
			const id = search.match(/^<@!?(\d+)>$/)[1];
			member = await guild.members.fetch(id).catch(() => {});
			if(member) return member;
		}
		if(search.match(/^!?(\w+)#(\d+)$/)){
			guild = await guild.fetch();
			member = guild.members.cache.find((m) => m.user.tag === search);
			if(member) return member;
		}
		member = await guild.members.fetch(search).catch(() => {});
		return member;
	}
}

module.exports = fydne;