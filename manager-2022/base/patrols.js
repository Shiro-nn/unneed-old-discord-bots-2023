const mongoose = require("mongoose");
module.exports = mongoose.model("patrols", new mongoose.Schema({
    id: { type: Number },
    soldier: { type: Boolean, default: false },
    verified: { type: Boolean, default: false },
}));