const mongoose = require("mongoose"),
Schema = mongoose.Schema,
config = require("../config.js");
module.exports = mongoose.model("accounts", new Schema({
    id: { type: Number, default: 0 },
    user: { type: String, default: '' },
    name: { type: String, default: '' },
    steam: { type: String, default: '' },
    discord: { type: String, default: '' },
    achievements: { type: Array, default: [] },
}));