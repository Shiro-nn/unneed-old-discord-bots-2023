import mongoose from "mongoose";

/**
 * Канцелярия МРП
 */
export const chancery = mongoose.model("admins", new mongoose.Schema({
    id: { type: Number, default: 0 },
    sabbatical: { type: Boolean, default: false },
    control: { type: Boolean, default: false },
    owner: { type: Boolean, default: false },
    sl: {
        type: Object,
        default: {
            trainee: false,
            helper: false,
            mainhelper: false,
            admin: false,
            mainadmin: false,
            selection: false,
            control: false,
            bans: 0,
            kicks: 0,
            punishments: 0,
            time: 0,
            slaves: 0,
            warnings: 0,
        }
    }
}))

/**
 * Патруль NoRules
 */
export const patrol = mongoose.model("patrols", new mongoose.Schema({
    id: { type: Number },
    soldier: { type: Boolean, default: false },
    verified: { type: Boolean, default: false },
}))