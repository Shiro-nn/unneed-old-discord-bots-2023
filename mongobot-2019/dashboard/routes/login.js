const express = require("express"),
config = require("../../config.js"),
router = express.Router(),
CheckAuth = require("../auth/CheckAuth"),
passport = require("passport"),
Discord = require("../../dis.js");
const fs = require('fs');
// Gets login page
router.get("/login", passport.authenticate("discord", { failureRedirect: config.dashboard.failureURL }), async function (req, res) {
    if (!req.user.id || !req.user.guilds) {
        res.redirect("/");
    }
    let logsChannel = req.client.channels.get(config.dashboard.logs);
    let usersData = await req.client.functions.getUsersData(req.client, [req.user]);
    let userData = usersData[0];
    if (!userData.logged && logsChannel) {
        let embed = new Discord.RichEmbed()
            .setAuthor(req.user.username, `https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}`)
            .setColor("#DA70D6")
            .setDescription(`${req.user.username}#${req.user.discriminator} впервые подключен к [сайту](https://bot.fydne.xyz)! :tada:`);
        logsChannel.send(embed);
        userData.logged = true;
        userData.save();
        const BotData = await req.client.findOrCreateBot();
        BotData.loginusers++;
        BotData.save();
    }
    res.redirect("/");
});

module.exports = router;