const mongoose = require("mongoose"),
Schema = mongoose.Schema;
module.exports = mongoose.model("discords", new Schema({
    id: { type: String },
    user: { type: String },
    discriminator: { type: String },
    avatar: { type: String }
}));