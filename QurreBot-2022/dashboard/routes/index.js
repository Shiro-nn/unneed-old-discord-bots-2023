const express = require("express"),
config = require("../../config"),
CheckAuth = require("../auth/CheckAuth"),
utils = require("../utils"),
router = express.Router();
const cdn_host = config.dashboard.cdn;
router.get("/guilds", CheckAuth, async (req, res) => {
    await utils.render(req.user, req.client, req.query.q, req, res, cdn_host);
});
router.get("/", async(req, res) => {
    res.render("index", {
        user: req.user,
        is_logged: (req.isAuthenticated()),
        tclient: req.client,
        cdn_host
    });
});
router.get("/invite", async(req, res) =>
res.redirect(`https://discord.com/api/oauth2/authorize?client_id=${req.client.id}&permissions=8&redirect_uri=${config.dashboard.baseURL}`));
router.get("/invite/:serverID", CheckAuth, async(req, res) =>
res.redirect(`https://discord.com/oauth2/authorize?client_id=${req.client.user.id}&scope=bot&permissions=8&guild_id=${req.params.serverID}`));
router.get("/manage", CheckAuth, async(req, res) => res.redirect("/guilds"));
module.exports = router;