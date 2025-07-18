const express = require("express"),
config = require("../../config"),
CheckAuth = require("../auth/CheckAuth"),
utils = require("../utils"),
router = express.Router();
const Discord = require("discord.js");

router.get("/selector", CheckAuth, async (req, res) => {
    await utils.render(req.user, req.client, req.query.q, req, res);
});
router.get("/", async(req, res) => {
    BotData = await req.client.findOrCreateBot();
    const connectsCounts = await req.client.shard.fetchClientValues("voice.connections.size");
    const connectsCount = connectsCounts.reduce((p, count) => p + count);
    const guildsCounts = await req.client.shard.fetchClientValues("guilds.cache.size");
    const guildsCount = guildsCounts.reduce((p, count) => p + count);
    const usersCounts = await req.client.shard.fetchClientValues("users.cache.size");
    const usersCount = usersCounts.reduce((p, count) => p + count);
    res.render("index", {
        user: req.user,
        is_logged: (req.isAuthenticated()),
        guildsize: guildsCount,
        music: BotData.music,
        connects: connectsCount,
        usersize: usersCount,
        tclient: req.client
    });
});
router.get("/invite", async(req, res) => {
    res.redirect("https://discord.com/api/oauth2/authorize?client_id=657667747487940621&permissions=-1&redirect_uri=https%3A%2F%2Fbot2.fydne.xyz&scope=bot");
});
router.get("/manage", CheckAuth, async(req, res) => {
    res.redirect("/selector");
});
router.get("/manage/:serverID", CheckAuth, async(req, res) => {
    const results = await req.client.shard.broadcastEval(` let guild = this.guilds.cache.get('${req.params.serverID}'); if(guild) guild.toJSON() `);
    const guild = results.find((g) => g);
    if(!guild || !req.userInfos.displayedGuilds || !req.userInfos.displayedGuilds.find((g) => g.id === req.params.serverID)){
        return res.redirect(`https://discord.com/oauth2/authorize?client_id=${req.client.user.id}&scope=bot&permissions=-1&guild_id=${req.params.serverID}`);
    }
    const guildData = await req.client.findOrCreateGuild({ id: guild.id });
    let guildInfos = await utils.fetchGuild(guild.id, req.client, req.user.guilds);
    res.render("manager/configs", {
        is_logged: (req.isAuthenticated()),
        membersize: guild.memberCount,
        textchannelsize: guild.channels.filter(channel => channel.type == 'text').size,
        catchannelsize: guild.channels.filter(channel => channel.type == "category").size,
        guild: guildInfos,
        guildData: guildData,
        user: req.userInfos,
        bot: req.client,
        currentURL: `${req.client.config.dashboard.baseURL}${req.originalUrl}`
    });

});


router.post("/manage/:serverID", CheckAuth, async(req, res) => {
    const results = await req.client.shard.broadcastEval(` let guild = this.guilds.cache.get('${req.params.serverID}'); if(guild) guild.toJSON() `);
    const guild = results.find((g) => g);
    if(!guild || !req.userInfos.displayedGuilds || !req.userInfos.displayedGuilds.find((g) => g.id === req.params.serverID)){
        return res.redirect(`https://discord.com/oauth2/authorize?client_id=${req.client.user.id}&scope=bot&permissions=-1&guild_id=${req.params.serverID}`);
    }
    
    let guildData = await req.client.guildsData.findOne({id:guild.id});
    let data = req.body;
    if(data.prefix){
        if(data.prefix.length > 0 && data.prefix.length < 2000){
            guildData.prefix = data.prefix;
        }
        await guildData.save();
    }
    if(data.favcolor){
        guildData.color = data.favcolor;
        await guildData.save();
    }
    await guildData.save();
    res.redirect(303, "/manage/"+guild.id);
});
module.exports = router;