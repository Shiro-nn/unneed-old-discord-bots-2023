const mongoose = require("mongoose"),
Schema = mongoose.Schema;
module.exports = mongoose.model("stats", new Schema({
    steam: { type: String, default: '' },
    discord: { type: String, default: '' },
    ips: { type: Array, default: [] },
    money: { type: Number, default: 0 },
    lvl: { type: Number, default: 1 },
    xp: { type: Number, default: 0 },
    to: { type: Number, default: 750 }
}));