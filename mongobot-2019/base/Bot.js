const mongoose = require("mongoose"),
Schema = mongoose.Schema,
config = require("../config.js");

module.exports = mongoose.model("Bot", new Schema({
    ticketsopen: { type: Number, default: 0 },
    logsave: { type: Number, default: 0 },
    hentaisend: { type: Number, default: 0 },
    autohenaiguilds: { type: Number, default: 0 },
    reactmessage: { type: Array, default: [] },
    errortickets: { type: Number, default: 0 },
    loginusers: { type: Number, default: 0 },
    searchselfbots: { type: Number, default: 0 }
}));
