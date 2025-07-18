const express = require("express"),
config = require("../../config.js"),
router = express.Router(),
passport = require("passport");

router.get("/login", passport.authenticate("discord", { failureRedirect: config.dashboard.baseURL }), async function(req, res) {
    res.redirect("/");
});
router.get("/logout", async function(req, res) {
    await req.logout();
    res.redirect('/');
});

module.exports = router;