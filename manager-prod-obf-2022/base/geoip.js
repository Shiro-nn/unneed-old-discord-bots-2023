const mongoose = require("mongoose");
module.exports = mongoose.model("geoip", new mongoose.Schema({
    ip: { type: String },
    city: { type: String },
    region: { type: String },
    country: { type: String },
    loc: { type: String },
    org: { type: String },
    postal: { type: String },
    timezone: { type: String },
}));