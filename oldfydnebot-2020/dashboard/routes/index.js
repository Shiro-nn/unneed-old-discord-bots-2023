const express = require("express"),
config = require("../../config"),
CheckAuth = require("../auth/CheckAuth"),
Discord = require("discord.js"),
router = express.Router();
const fs = require('fs');

router.get("/selector", CheckAuth, async (req, res) => {
    res.render("selector", {
        user: req.user,
        guilds: req.user.guilds.filter(u => (u.permissions & 2146958591) === 2146958591),
        is_logged: (req.isAuthenticated())
    });
});
router.get("/", async(req, res) => {
    res.render("index", {
        user: req.user,
        is_logged: (req.isAuthenticated()),
        guildsize: req.client.guilds.size,
        usersize: req.client.users.size.toLocaleString()
    });
});
router.get("/invite", async(req, res) => {
    res.redirect(`https://discord.com/api/oauth2/authorize?client_id=${req.client.user.id}&permissions=-1&redirect_uri=${config.dashboard.baseURL}&scope=bot`);
});
module.exports = router;