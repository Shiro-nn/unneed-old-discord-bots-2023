const mongoose = require("mongoose"),
Schema = mongoose.Schema;
module.exports = mongoose.model("ra-logs", new Schema({
    type: { type: Number, default: 0 },
    logs: { type: Array, default: [] }
}));