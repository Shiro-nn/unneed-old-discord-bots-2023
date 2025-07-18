const mongoose = require("mongoose"),
Schema = mongoose.Schema;

module.exports = mongoose.model("guild", new Schema({
    id: { type: String, default: '' },
    roles: { type: Array, default: [] }
}));
