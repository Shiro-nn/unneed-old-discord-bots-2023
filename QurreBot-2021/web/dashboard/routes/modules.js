const express = require("express"),
config = require("../../config"),
CheckAuth = require("../auth/CheckAuth"),
utils = require("../utils"),
router = express.Router();
const cdn_host = config.dashboard.cdn;
router.get("/manage/:serverID/modules", CheckAuth, async(req, res) => {
    const guild = req.client.guilds.cache.get(req.params.serverID);
    if(!guild || !req.userInfos.displayedGuilds || !req.userInfos.displayedGuilds.find((g) => g.id === req.params.serverID)){
        return res.redirect(`/invite/${req.params.serverID}`);
    }
    const _channels = [];
    {
        let channels = guild.channels.cache;
        channels.filter(ch => ch.type === "GUILD_TEXT").forEach((ch) => _channels.push({"name": ch.name, "id": ch.id}));
    }
    const _roles = [];
    {
        let roles = guild.roles.cache;
        roles.forEach((rl) => _roles.push({"name": rl.name, "id": rl.id}));
    }
    const _all_channels = guild.channels.cache;
    let guildDB = await req.client.database.Guilds.findById(guild.id)
    if(!guildDB) guildDB = await req.client.database.Guilds({_id: guild.id}).save();
    let guildInfos = await utils.fetchGuild(guild.id, req.client, req.user.guilds);
    const log_channel = await req.client.channels.cache.get(guildInfos.logs.channel);
    res.render("manager/modules", {
        is_logged: (req.isAuthenticated()),
        guild: guildInfos,
        guildDB,
        user: req.userInfos,
        bot: req.client,
        cdn_host, log_channel,
        roles: _roles,
        channels: _channels,
        all_channels: _all_channels
    });
});
router.post("/manage/:serverID/modules", CheckAuth, async(req, res) => {
    const guild = req.client.guilds.cache.get(req.params.serverID);
    if(!guild || !req.userInfos.displayedGuilds || !req.userInfos.displayedGuilds.find((g) => g.id === req.params.serverID)){
        return res.redirect(`/invite/${req.params.serverID}`);
    }
    
    let guildDB = await req.client.database.Guilds.findById(guild.id)
    if(!guildDB) guildDB = await req.client.database.Guilds({_id: guild.id}).save();
    let data = req.body;
    if(data.anti_flood == ''){
        if(data.af_enable == 'on') guildDB.antiflood.enabled = true;
        else guildDB.antiflood.enabled = false;
        guildDB.antiflood.messagesLimit = data.af_limit;
        await guildDB.markModified("antiflood");
        await guildDB.save();
    }
    if(data.anti_ads == ''){
        if(data.aa_enable == 'on') guildDB.antiAds.enabled = true;
        else guildDB.antiAds.enabled = false;
        if(data.aa_channels != '') guildDB.antiAds.ignored = JSON.parse(data.aa_channels);
        await guildDB.markModified("antiAds");
        await guildDB.save();
    }
    if(data.anti_links == ''){
        if(data.al_enable == 'on') guildDB.antiLinks.enabled = true;
        else guildDB.antiLinks.enabled = false;
        if(data.al_channels != '') guildDB.antiLinks.ignored = JSON.parse(data.al_channels);
        await guildDB.markModified("antiLinks");
        await guildDB.save();
    }
    if(data.logs_mod == ''){
        if(data.logs === 'Канал не выбран'){
            guildDB.logs.channel = '';
        }else if(data.logs === 'Выключить'){
            guildDB.logs.channel = '';
        }else{
            try{
                const channels = guild.channels.cache.get(data.logs);
                guildDB.logs.channel = channels.id;
            }catch{
                guildDB.logs.channel = '';
            }
        }
        if(data.logs_roles != '') guildDB.logs.ignored = JSON.parse(data.logs_roles);
        await guildDB.markModified("logs");
        await guildDB.save();
    }
    res.redirect(303, `/manage/${guild.id}/modules`);
});
module.exports = router;