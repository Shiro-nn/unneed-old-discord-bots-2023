const { Client } = require("discord.js"),
util = require("util"),
fs = require("fs"),
readdir = util.promisify(fs.readdir),
path = require("path");
const EventHandler = require("./EventHandlers");
class fydne extends Client {
    constructor (options) {
        super(options);
		this.config = require("../config");
		this.events = new EventHandler(this);
    }
	loadEvents(_path) {
		readdir(_path, (err, files) => {
			if(err) console.error(`Unable to load Events: ${err}`);
			files.forEach(ev => {
				const event = new (require(`${_path}${path.sep}${ev}`))(this)
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
}

module.exports = fydne;