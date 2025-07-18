const mongoose = require("mongoose"),
Schema = mongoose.Schema;

module.exports = mongoose.model("Bot", new Schema({
    music: { type: Number, default: 0 }
}));
