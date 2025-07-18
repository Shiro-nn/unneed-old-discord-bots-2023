const express = require("express"),
router = express.Router();

// Gets login page
router.get("/logout", async function(req, res) {
    await req.logout();
    res.redirect('/');
});

module.exports = router;