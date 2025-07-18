const express = require("express"),
config = require("../../config.js"),
router = express.Router(),
passport = require("passport");

router.get("/login", passport.authenticate("discord", { failureRedirect: config.dashboard.failureURL }), async function(req, res) {
    res.redirect("/");
});

module.exports = router;