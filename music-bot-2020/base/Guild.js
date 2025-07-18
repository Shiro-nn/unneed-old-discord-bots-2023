const mongoose = require("mongoose"),
Schema = mongoose.Schema,
config = require("../config.js");

module.exports = mongoose.model("Guild", new Schema({
    id: { type: String },
    prefix: { type: String, default: config.prefix },
    color: { type: String, default: config.embed.color }
}));
