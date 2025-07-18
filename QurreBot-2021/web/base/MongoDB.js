const config = require("../config.js");
const mongoose = require("mongoose");
const logger = require("../helpers/logger");
mongoose.connect(config.mongoDB, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    logger.log("Connected to the MongoDB database.", "log");
}).catch((err) => logger.log(`Unable to connect to the Mongodb database. Error: ${err}`, "error"));

const Guild = new mongoose.Schema({
    _id: { type: String },
	prefix: { type: String, default: config.prefix },
    color: { type: String, default: config.embed.color },
    bans: { type: Number, default: 0 },
    kicks: { type: Number, default: 0 },
    mutes: { type: Number, default: 0 },
	logs: {
		type: Object,
		default: {
			channel: '',
			ignored: []
		}
	},
	antiflood: {
		type: Object,
		default: {
			enabled: false,
			messagesLimit: 5
		}
	},
	antiAds: {
		type: Object,
		default: {
			enabled: true,
			ignored: []
		}
	},
	antiLinks: {
		type: Object,
		default: {
			enabled: true,
			ignored: []
		}
	},
})

const Member = new mongoose.Schema({
	id: { type: String },
	guild: { type: String },
	mute: { type: Object, default: {
		muted: false,
		case: null,
		endDate: null
	}},
})

const Ticket = new mongoose.Schema({
	_id: { type: String },
    enable: { type: Boolean, default: false },
    opens: { type: Number, default: 0 },
    guild: { type: String, default: "" },
    channel: { type: String, default: "" },
    message: { type: String, default: "" },
    react: { type: String, default: "909139299876888586" },
    category: { type: String, default: "" },
    name: { type: String, default: "" },
    roles: { type: Array, default: [] },
    only_admin_close: { type: Boolean, default: true },
    content: { type: String, default: "Чтобы открыть тикет, нажмите на кнопку" },
    message_text: { type: String, default: "__**Вот твой канал, {member}**__" },
    message_embed: { type: String, default: "Опишите то, что хотите максимально подробно" }
})

const TicketLog = new mongoose.Schema({
    user: { type: String, default: "" },
    message: { type: String, default: "" },
    channel: { type: String, default: "" },
    guild: { type: String, default: "" },
    name: { type: String, default: "" },
    roles: { type: Array, default: [] },
})

const Bot = new mongoose.Schema({
	_id: { type: String },
})

const Guilds = mongoose.model("Guilds", Guild)
module.exports.Guilds = Guilds
const Members = mongoose.model("Members", Member)
module.exports.Members = Members
const Tickets = mongoose.model("Tickets", Ticket)
module.exports.Tickets = Tickets
const TicketLogs = mongoose.model("TicketOpened", TicketLog)
module.exports.TicketLogs = TicketLogs
const Bots = mongoose.model("Bots", Bot)
module.exports.Bots = Bots