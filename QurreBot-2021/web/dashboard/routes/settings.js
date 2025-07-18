const express = require("express"),
config = require("../../config"),
CheckAuth = require("../auth/CheckAuth"),
utils = require("../utils"),
router = express.Router();
const cdn_host = config.dashboard.cdn;
router.get("/manage/:serverID", CheckAuth, async(req, res) => {
    const guild = req.client.guilds.cache.get(req.params.serverID);
    if(!guild || !req.userInfos.displayedGuilds || !req.userInfos.displayedGuilds.find((g) => g.id === req.params.serverID)){
        return res.redirect(`/invite/${req.params.serverID}`);
    }
    let guildDB = await req.client.database.Guilds.findById(guild.id)
    if(!guildDB) guildDB = await req.client.database.Guilds({_id: guild.id}).save();
    let guildInfos = await utils.fetchGuild(guild.id, req.client, req.user.guilds);
    res.render("manager/configs", {
        is_logged: (req.isAuthenticated()),
        guild: guildInfos,
        guildDB,
        user: req.userInfos,
        bot: req.client,
        cdn_host
    });
});
router.post("/manage/:serverID", CheckAuth, async(req, res) => {
    const guild = req.client.guilds.cache.get(req.params.serverID);
    if(!guild || !req.userInfos.displayedGuilds || !req.userInfos.displayedGuilds.find((g) => g.id === req.params.serverID)){
        return res.redirect(`/invite/${req.params.serverID}`);
    }
    
    let guildDB = await req.client.database.Guilds.findById(guild.id)
    if(!guildDB) guildDB = await req.client.database.Guilds({_id: guild.id}).save();
    let data = req.body;
    if(data.prefix_){
        if(data.prefix_.length > 0 && data.prefix_.length < 2000){
            guildDB.prefix = data.prefix_;
        }
    }
    if(data.favcolor){
        guildDB.color = data.favcolor;
    }
    await guildDB.save();
    res.redirect(303, "/manage/"+guild.id);
});
module.exports = router;