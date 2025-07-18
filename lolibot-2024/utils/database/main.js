import mongoose from "mongoose";

export const users = mongoose.model("accounts", new mongoose.Schema({
    id: { type: Number, default: 0 },
    user: { type: String, default: '' },
    name: { type: String, default: '' },
    steam: { type: String, default: '' },
    discord: { type: String, default: '' },
}))