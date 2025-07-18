const express = require("express"),
config = require("../../config"),
CheckAuth = require("../auth/CheckAuth"),
utils = require("../utils"),
Discord = require("../../dis.js"),
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
    BotData = await req.client.findOrCreateBot();
    res.render("index", {
        user: req.user,
        is_logged: (req.isAuthenticated()),
        guildsize: req.client.guilds.size,
        ticketsopen: BotData.ticketsopen,
        hentaisend: BotData.hentaisend,
        usersize: req.client.users.size.toLocaleString()
    });
});
router.get("/tickets", async(req, res) => {
	const axios = require('axios');
	axios.get(req.query.load)
	.then(function (response) {
		res.render("load", {_html: response.data});
	}).catch();
});
router.get("/invite", async(req, res) => {
    res.redirect("https://discord.com/api/oauth2/authorize?client_id=626106847451152399&permissions=-1&redirect_uri=https%3A%2F%2Fbot.fydne.xyz&scope=bot");
});
router.get("/manage", CheckAuth, async(req, res) => {
    res.redirect("/selector");
});
router.get("/manage/:serverID", CheckAuth, async(req, res) => {

    // Check if the user has the permissions to edit this guild
    let guild = req.client.guilds.get(req.params.serverID);
    if(!guild || !req.userInfos.displayedGuilds || !req.userInfos.displayedGuilds.find((g) => g.id === req.params.serverID)){
        return res.redirect(`https://discord.com/oauth2/authorize?client_id=${req.client.user.id}&scope=bot&permissions=-1&guild_id=${req.params.serverID}`);
    }
    const guildData = await req.client.findOrCreateGuild({ id: guild.id });
    let guildInfos = await utils.fetchGuild(guild.id, req.client, req.user.guilds);

    res.render("manager/stats", {
        is_logged: (req.isAuthenticated()),
        membersize: guild.members.size,
        botsize: guild.members.filter(member => member.user.bot).size,
        textchannelsize: guild.channels.filter(channel => channel.type == 'text').size,
        catchannelsize: guild.channels.filter(channel => channel.type == "category").size,
        guild: guildInfos,
        guildData: guildData,
        user: req.userInfos,
        bot: req.client,
        currentURL: `${req.client.config.dashboard.baseURL}${req.originalUrl}`
    });

});
router.get("/manage/:serverID/configs", CheckAuth, async(req, res) => {

    // Check if the user has the permissions to edit this guild
    let guild = req.client.guilds.get(req.params.serverID);
    if(!guild || !req.userInfos.displayedGuilds || !req.userInfos.displayedGuilds.find((g) => g.id === req.params.serverID)){
        return res.redirect(`https://discord.com/oauth2/authorize?client_id=${req.client.user.id}&scope=bot&permissions=-1&guild_id=${req.params.serverID}`);
    }
    const guildData = await req.client.findOrCreateGuild({ id: guild.id });
    let guildInfos = await utils.fetchGuild(guild.id, req.client, req.user.guilds);

    res.render("manager/configs", {
        is_logged: (req.isAuthenticated()),
        membersize: guild.members.size,
        botsize: guild.members.filter(member => member.user.bot).size,
        textchannelsize: guild.channels.filter(channel => channel.type == 'text').size,
        catchannelsize: guild.channels.filter(channel => channel.type == "category").size,
        guild: guildInfos,
        guildData: guildData,
        user: req.userInfos,
        bot: req.client,
        currentURL: `${req.client.config.dashboard.baseURL}${req.originalUrl}`
    });

});
router.get("/manage/:serverID/anime-configs", CheckAuth, async(req, res) => {

    // Check if the user has the permissions to edit this guild
    let guild = req.client.guilds.get(req.params.serverID);
    if(!guild || !req.userInfos.displayedGuilds || !req.userInfos.displayedGuilds.find((g) => g.id === req.params.serverID)){
        return res.redirect(`https://discord.com/oauth2/authorize?client_id=${req.client.user.id}&scope=bot&permissions=-1&guild_id=${req.params.serverID}`);
    }
    const guildData = await req.client.findOrCreateGuild({ id: guild.id });
    let guildInfos = await utils.fetchGuild(guild.id, req.client, req.user.guilds);

    res.render("manager/anime", {
        is_logged: (req.isAuthenticated()),
        membersize: guild.members.size,
        botsize: guild.members.filter(member => member.user.bot).size,
        textchannelsize: guild.channels.filter(channel => channel.type == 'text').size,
        catchannelsize: guild.channels.filter(channel => channel.type == "category").size,
        guild: guildInfos,
        guildData: guildData,
        user: req.userInfos,
        bot: req.client,
        currentURL: `${req.client.config.dashboard.baseURL}${req.originalUrl}`
    });

});
router.get("/manage/:serverID/ticket-configs", CheckAuth, async(req, res) => {

    // Check if the user has the permissions to edit this guild
    let guild = req.client.guilds.get(req.params.serverID);
    if(!guild || !req.userInfos.displayedGuilds || !req.userInfos.displayedGuilds.find((g) => g.id === req.params.serverID)){
        return res.redirect(`https://discord.com/oauth2/authorize?client_id=${req.client.user.id}&scope=bot&permissions=-1&guild_id=${req.params.serverID}`);
    }
    const guildData = await req.client.findOrCreateGuild({ id: guild.id });
    let guildInfos = await utils.fetchGuild(guild.id, req.client, req.user.guilds);

    res.render("manager/ticket", {
        is_logged: (req.isAuthenticated()),
        membersize: guild.members.size,
        botsize: guild.members.filter(member => member.user.bot).size,
        textchannelsize: guild.channels.filter(channel => channel.type == 'text').size,
        catchannelsize: guild.channels.filter(channel => channel.type == "category").size,
        guild: guildInfos,
        guildData: guildData,
        user: req.userInfos,
        bot: req.client,
        currentURL: `${req.client.config.dashboard.baseURL}${req.originalUrl}`
    });

});




router.post("/manage/:serverID/configs", CheckAuth, async(req, res) => {

    // Check if the user has the permissions to edit this guild
    let guild = req.client.guilds.get(req.params.serverID);
    if(!guild || !req.userInfos.displayedGuilds || !req.userInfos.displayedGuilds.find((g) => g.id === req.params.serverID)){
        return res.redirect(`https://discord.com/oauth2/authorize?client_id=${req.client.user.id}&scope=bot&permissions=-1&guild_id=${req.params.serverID}`);
    }
    
    let guildData = await req.client.guildsData.findOne({id:guild.id});
    let data = req.body;
    if(data.levelon === 'on'){
        if(!guildData.level){
            guildData.level = true;
            await guildData.save();
        }
    } else {
        if(guildData.level){
            guildData.level = false;
            await guildData.save();
        }
    }
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
    if(data.role === "Выключена"){
        let autorole = {
            enabled: false,
            role: null
        };
        guildData.plugins.autorole = autorole;
        guildData.markModified("plugins.autorole");
        await guildData.save();
    } else if(data.role === "Выключить"){
        let autorole = {
            enabled: false,
            role: null
        };
        guildData.plugins.autorole = autorole;
        guildData.markModified("plugins.autorole");
        await guildData.save();
    } else {
        let autorole = {
            enabled: true,
            role: guild.roles.find((r) => "@"+r.name === data.role).id
        };
        guildData.plugins.autorole = autorole;
        guildData.markModified("plugins.autorole");
        await guildData.save();
    }

    if(data.suggestions === 'Канал не выбран'){
        guildData.channellogs = '';
    } else if(data.suggestions === 'Выключить') {
        guildData.channellogs = '';
    } else {
        guildData.channellogs = guild.channels.find((ch) => "#"+ch.name === data.suggestions).id;
    }
    await guildData.save();
    res.redirect(303, "/manage/"+guild.id+"/configs");
});
router.post("/manage/:serverID/anime-configs", CheckAuth, async(req, res) => {

    // Check if the user has the permissions to edit this guild
    let guild = req.client.guilds.get(req.params.serverID);
    if(!guild || !req.userInfos.displayedGuilds || !req.userInfos.displayedGuilds.find((g) => g.id === req.params.serverID)){
        return res.redirect(`https://discord.com/oauth2/authorize?client_id=${req.client.user.id}&scope=bot&permissions=-1&guild_id=${req.params.serverID}`);
    }
    const BotData = await req.client.findOrCreateBot();
    let guildData = await req.client.guildsData.findOne({id:guild.id});
    let data = req.body;
    if(data.hentaion === 'on'){
        if(!guildData.plugins.hentai.enabled){
            guildData.plugins.hentai.enabled = true;
            guildData.markModified("plugins.hentai");
            await guildData.save();
        }
    } else {
        if(guildData.plugins.hentai.enabled){
            guildData.plugins.hentai.enabled = false;
            guildData.markModified("plugins.hentai");
            await guildData.save();
        }
    }

    if(data.autohentaion === 'on'){
        if(!guildData.autohentai){
            BotData.autohenaiguilds++;
        }
        guildData.autohentai = true;
        await guildData.save();
        await BotData.save();
    } else {
        BotData.autohenaiguilds--;
        guildData.autohentai = false;
        await guildData.save();
        await BotData.save();
    }

    if(data.suggestions === 'Канал не выбран'){
        guildData.autohentaichannel = null;
        await guildData.save();
    } else if(data.suggestions === 'Выключить') {
        BotData.autohenaiguilds--;
        guildData.autohentaichannel = null;
        await guildData.save();
        await BotData.save();
    } else {
        guildData.autohentaichannel = guild.channels.find((ch) => "#"+ch.name === data.suggestions).id;
        await guildData.save();
    }

    if(parseInt(data.intervalh) === 0){
        await guildData.save();
    } else {
        guildData.autohentaitime = parseInt(data.intervalh);
        await guildData.save();
        if(guildData.autohentai)
        req.client.emit('hentaichekguild', guild.id);
    }

    await guildData.save();
    res.redirect(303, "/manage/"+guild.id+"/anime-configs");
});
router.post("/manage/:serverID/ticket-configs", CheckAuth, async (req, res) => {
    let guild = req.client.guilds.get(req.params.serverID);
    if (!guild || !req.userInfos.displayedGuilds || !req.userInfos.displayedGuilds.find((g) => g.id === req.params.serverID)) {
        return res.redirect(`https://discord.com/oauth2/authorize?client_id=${req.client.user.id}&scope=bot&permissions=-1&guild_id=${req.params.serverID}`);
    }
    const BotData = await req.client.findOrCreateBot();
    let guildData = await req.client.guildsData.findOne({ id: guild.id });
    let data = req.body;
    if (data.whits === 'msbd') {
        if (data.id === '1') {
            guildData.ticketmessage1send0 = data.name1;
            guildData.ticketmessage2send0 = data.name2;
            guildData.ticketmessage3send0 = data.name3;
            if (data.msg3on === 'true') guildData.ticketmessage3enable0 = true;
            if (data.msg2on === 'true') guildData.ticketmessage2enable0 = true;
            if (data.msg1on === 'true') guildData.ticketmessage1enable0 = true;
            if (data.msg3on === 'false') guildData.ticketmessage3enable0 = false;
            if (data.msg2on === 'false') guildData.ticketmessage2enable0 = false;
            if (data.msg1on === 'false') guildData.ticketmessage1enable0 = false;
            await guildData.save();
        } else if (data.id === '2') {
            guildData.ticketmessage1send1 = data.name1;
            guildData.ticketmessage2send1 = data.name2;
            guildData.ticketmessage3send1 = data.name3;
            if (data.msg3on === 'true') guildData.ticketmessage3enable1 = true;
            if (data.msg2on === 'true') guildData.ticketmessage2enable1 = true;
            if (data.msg1on === 'true') guildData.ticketmessage1enable1 = true;
            if (data.msg3on === 'false') guildData.ticketmessage3enable1 = false;
            if (data.msg2on === 'false') guildData.ticketmessage2enable1 = false;
            if (data.msg1on === 'false') guildData.ticketmessage1enable1 = false;
            await guildData.save();
        } else if (data.id === '3') {
            guildData.ticketmessage1send2 = data.name1;
            guildData.ticketmessage2send2 = data.name2;
            guildData.ticketmessage3send2 = data.name3;
            if (data.msg3on === 'true') guildData.ticketmessage3enable2 = true;
            if (data.msg2on === 'true') guildData.ticketmessage2enable2 = true;
            if (data.msg1on === 'true') guildData.ticketmessage1enable2 = true;
            if (data.msg3on === 'false') guildData.ticketmessage3enable2 = false;
            if (data.msg2on === 'false') guildData.ticketmessage2enable2 = false;
            if (data.msg1on === 'false') guildData.ticketmessage1enable2 = false;
            await guildData.save();
        } else if (data.id === '4') {
            guildData.ticketmessage1send3 = data.name1;
            guildData.ticketmessage2send3 = data.name2;
            guildData.ticketmessage3send3 = data.name3;
            if (data.msg3on === 'true') guildData.ticketmessage3enable3 = true;
            if (data.msg2on === 'true') guildData.ticketmessage2enable3 = true;
            if (data.msg1on === 'true') guildData.ticketmessage1enable3 = true;
            if (data.msg3on === 'false') guildData.ticketmessage3enable3 = false;
            if (data.msg2on === 'false') guildData.ticketmessage2enable3 = false;
            if (data.msg1on === 'false') guildData.ticketmessage1enable3 = false;
            await guildData.save();
        } else if (data.id === '5') {
            guildData.ticketmessage1send4 = data.name1;
            guildData.ticketmessage2send4 = data.name2;
            guildData.ticketmessage3send4 = data.name3;
            if (data.msg3on === 'true') guildData.ticketmessage3enable4 = true;
            if (data.msg2on === 'true') guildData.ticketmessage2enable4 = true;
            if (data.msg1on === 'true') guildData.ticketmessage1enable4 = true;
            if (data.msg3on === 'false') guildData.ticketmessage3enable4 = false;
            if (data.msg2on === 'false') guildData.ticketmessage2enable4 = false;
            if (data.msg1on === 'false') guildData.ticketmessage1enable4 = false;
            await guildData.save();
        } else if (data.id === '6') {
            guildData.ticketmessage1send5 = data.name1;
            guildData.ticketmessage2send5 = data.name2;
            guildData.ticketmessage3send5 = data.name3;
            if (data.msg3on === 'true') guildData.ticketmessage3enable5 = true;
            if (data.msg2on === 'true') guildData.ticketmessage2enable5 = true;
            if (data.msg1on === 'true') guildData.ticketmessage1enable5 = true;
            if (data.msg3on === 'true') guildData.ticketmessage3enable5 = true;
            if (data.msg2on === 'true') guildData.ticketmessage2enable5 = true;
            if (data.msg1on === 'true') guildData.ticketmessage1enable5 = true;
            if (data.msg3on === 'false') guildData.ticketmessage3enable5 = false;
            if (data.msg2on === 'false') guildData.ticketmessage2enable5 = false;
            if (data.msg1on === 'false') guildData.ticketmessage1enable5 = false;
            await guildData.save();
        } else if (data.id === '7') {
            guildData.ticketmessage1send6 = data.name1;
            guildData.ticketmessage2send6 = data.name2;
            guildData.ticketmessage3send6 = data.name3;
            if (data.msg3on === 'true') guildData.ticketmessage3enable6 = true;
            if (data.msg2on === 'true') guildData.ticketmessage2enable6 = true;
            if (data.msg1on === 'true') guildData.ticketmessage1enable6 = true;
            if (data.msg3on === 'false') guildData.ticketmessage3enable6 = false;
            if (data.msg2on === 'false') guildData.ticketmessage2enable6 = false;
            if (data.msg1on === 'false') guildData.ticketmessage1enable6 = false;
            await guildData.save();
        } else if (data.id === '8') {
            guildData.ticketmessage1send7 = data.name1;
            guildData.ticketmessage2send7 = data.name2;
            guildData.ticketmessage3send7 = data.name3;
            if (data.msg3on === 'true') guildData.ticketmessage3enable7 = true;
            if (data.msg2on === 'true') guildData.ticketmessage2enable7 = true;
            if (data.msg1on === 'true') guildData.ticketmessage1enable7 = true;
            if (data.msg3on === 'false') guildData.ticketmessage3enable7 = false;
            if (data.msg2on === 'false') guildData.ticketmessage2enable7 = false;
            if (data.msg1on === 'false') guildData.ticketmessage1enable7 = false;
            await guildData.save();
        } else if (data.id === '9') {
            guildData.ticketmessage1send8 = data.name1;
            guildData.ticketmessage2send8 = data.name2;
            guildData.ticketmessage3send8 = data.name3;
            if (data.msg3on === 'true') guildData.ticketmessage3enable8 = true;
            if (data.msg2on === 'true') guildData.ticketmessage2enable8 = true;
            if (data.msg1on === 'true') guildData.ticketmessage1enable8 = true;
            if (data.msg3on === 'false') guildData.ticketmessage3enable8 = false;
            if (data.msg2on === 'false') guildData.ticketmessage2enable8 = false;
            if (data.msg1on === 'false') guildData.ticketmessage1enable8 = false;
            await guildData.save();
        } else if (data.id === '10') {
            guildData.ticketmessage1send9 = data.name1;
            guildData.ticketmessage2send9 = data.name2;
            guildData.ticketmessage3send9 = data.name3;
            if (data.msg3on === 'true') guildData.ticketmessage3enable9 = true;
            if (data.msg2on === 'true') guildData.ticketmessage2enable9 = true;
            if (data.msg1on === 'true') guildData.ticketmessage1enable9 = true;
            if (data.msg3on === 'false') guildData.ticketmessage3enable9 = false;
            if (data.msg2on === 'false') guildData.ticketmessage2enable9 = false;
            if (data.msg1on === 'false') guildData.ticketmessage1enable9 = false;
            await guildData.save();
        }
        await guildData.save();
    }
    if (data.whits === 'spdt') {
        if (data.id === '1') {
            guildData.ticketclosemsg0 = data.name;
            guildData.ticketchannelperms0 = guild.roles.find((r) => "@" + r.name === data.role).id;
            if (data.onlyadminon === 'on') {
                guildData.ticketcloseonlyadmin0 = false;
            } else if (data.onlyadminon === 'off') {
                guildData.ticketcloseonlyadmin0 = true;
            }
        } else if (data.id === '2') {
            guildData.ticketclosemsg1 = data.name;
            guildData.ticketchannelperms1 = guild.roles.find((r) => "@" + r.name === data.role).id;
            if (data.onlyadminon === 'on') {
                guildData.ticketcloseonlyadmin1 = false;
            } else if (data.onlyadminon === 'off') {
                guildData.ticketcloseonlyadmin1 = true;
            }
        } else if (data.id === '3') {
            guildData.ticketclosemsg2 = data.name;
            guildData.ticketchannelperms2 = guild.roles.find((r) => "@" + r.name === data.role).id;
            if (data.onlyadminon === 'on') {
                guildData.ticketcloseonlyadmin2 = false;
            } else if (data.onlyadminon === 'off') {
                guildData.ticketcloseonlyadmin2 = true;
            }
        } else if (data.id === '4') {
            guildData.ticketclosemsg3 = data.name;
            guildData.ticketchannelperms3 = guild.roles.find((r) => "@" + r.name === data.role).id;
            if (data.onlyadminon === 'on') {
                guildData.ticketcloseonlyadmin3 = false;
            } else if (data.onlyadminon === 'off') {
                guildData.ticketcloseonlyadmin3 = true;
            }
        } else if (data.id === '5') {
            guildData.ticketclosemsg4 = data.name;
            guildData.ticketchannelperms4 = guild.roles.find((r) => "@" + r.name === data.role).id;
            if (data.onlyadminon === 'on') {
                guildData.ticketcloseonlyadmin4 = false;
            } else if (data.onlyadminon === 'off') {
                guildData.ticketcloseonlyadmin4 = true;
            }
        } else if (data.id === '6') {
            guildData.ticketclosemsg5 = data.name;
            guildData.ticketchannelperms5 = guild.roles.find((r) => "@" + r.name === data.role).id;
            if (data.onlyadminon === 'on') {
                guildData.ticketcloseonlyadmin5 = false;
            } else if (data.onlyadminon === 'off') {
                guildData.ticketcloseonlyadmin5 = true;
            }
        } else if (data.id === '7') {
            guildData.ticketclosemsg6 = data.name;
            guildData.ticketchannelperms6 = guild.roles.find((r) => "@" + r.name === data.role).id;
            if (data.onlyadminon === 'on') {
                guildData.ticketcloseonlyadmin6 = false;
            } else if (data.onlyadminon === 'off') {
                guildData.ticketcloseonlyadmin6 = true;
            }
        } else if (data.id === '8') {
            guildData.ticketclosemsg7 = data.name;
            guildData.ticketchannelperms7 = guild.roles.find((r) => "@" + r.name === data.role).id;
            if (data.onlyadminon === 'on') {
                guildData.ticketcloseonlyadmin7 = false;
            } else if (data.onlyadminon === 'off') {
                guildData.ticketcloseonlyadmin7 = true;
            }
        } else if (data.id === '9') {
            guildData.ticketclosemsg8 = data.name;
            guildData.ticketchannelperms8 = guild.roles.find((r) => "@" + r.name === data.role).id;
            if (data.onlyadminon === 'on') {
                guildData.ticketcloseonlyadmin8 = false;
            } else if (data.onlyadminon === 'off') {
                guildData.ticketcloseonlyadmin8 = true;
            }
        } else if (data.id === '10') {
            guildData.ticketclosemsg9 = data.name;
            guildData.ticketchannelperms9 = guild.roles.find((r) => "@" + r.name === data.role).id;
            if (data.onlyadminon === 'on') {
                guildData.ticketcloseonlyadmin9 = false;
            } else if (data.onlyadminon === 'off') {
                guildData.ticketcloseonlyadmin9 = true;
            }
        }
        await guildData.save();
    }
    if (data.whits === 'gset') {
        if (data.id === '1') {
            if (data.emoji !== '') guildData.ticketreact0 = data.emoji;
            guildData.ticketmsg0 = data.name
        } else if (data.id === '2') {
            if (data.emoji !== '') guildData.ticketreact1 = data.emoji;
            guildData.ticketmsg1 = data.name
        } else if (data.id === '3') {
            if (data.emoji !== '') guildData.ticketreact2 = data.emoji;
            guildData.ticketmsg2 = data.name
        } else if (data.id === '4') {
            if (data.emoji !== '') guildData.ticketreact3 = data.emoji;
            guildData.ticketmsg3 = data.name
        } else if (data.id === '5') {
            if (data.emoji !== '') guildData.ticketreact4 = data.emoji;
            guildData.ticketmsg4 = data.name
        } else if (data.id === '6') {
            if (data.emoji !== '') guildData.ticketreact5 = data.emoji;
            guildData.ticketmsg5 = data.name
        } else if (data.id === '7') {
            if (data.emoji !== '') guildData.ticketreact6 = data.emoji;
            guildData.ticketmsg6 = data.name
        } else if (data.id === '8') {
            if (data.emoji !== '') guildData.ticketreact7 = data.emoji;
            guildData.ticketmsg7 = data.name
        } else if (data.id === '9') {
            if (data.emoji !== '') guildData.ticketreact8 = data.emoji;
            guildData.ticketmsg8 = data.name
        } else if (data.id === '10') {
            if (data.emoji !== '') guildData.ticketreact9 = data.emoji;
            guildData.ticketmsg9 = data.name
        }
        await guildData.save();
    }
    if (data.its === 'rename') {
        if (data.renamef === '1') {
            guildData.ticketchannelname0 = data.name;
        } else if (data.renamef === '2') {
            guildData.ticketchannelname1 = data.name;
        } else if (data.renamef === '3') {
            guildData.ticketchannelname2 = data.name;
        } else if (data.renamef === '4') {
            guildData.ticketchannelname3 = data.name;
        } else if (data.renamef === '5') {
            guildData.ticketchannelname4 = data.name;
        } else if (data.renamef === '6') {
            guildData.ticketchannelname5 = data.name;
        } else if (data.renamef === '7') {
            guildData.ticketchannelname6 = data.name;
        } else if (data.renamef === '8') {
            guildData.ticketchannelname7 = data.name;
        } else if (data.renamef === '9') {
            guildData.ticketchannelname8 = data.name;
        } else if (data.renamef === '10') {
            guildData.ticketchannelname9 = data.name;
        }
        await guildData.save();
    }
    if (data.section === 'create') {
        if (!guildData.ticketenable0) {
            guildData.ticketenable0 = true;
            guildData.ticketchannelname0 = data.name;
            guildData.ticketchannelperms0 = guild.roles.find((r) => "@" + r.name === data.role).id;
            guildData.ticketreact0 = data.emoji;
            if (data.category === 'Не выбрано') {
                guildData.ticketcategoryon0 = false;
            }
            if (data.category !== 'Не выбрано') {
                guildData.ticketcategoryon0 = true;
                guildData.ticketcategory0 = guild.channels.find((ch) => ch.type == "category" && ch.name === data.category).id;
            }
        } else if (!guildData.ticketenable1) {
            guildData.ticketenable1 = true;
            guildData.ticketchannelname1 = data.name;
            guildData.ticketchannelperms1 = guild.roles.find((r) => "@" + r.name === data.role).id;
            guildData.ticketreact1 = data.emoji;
            if (data.category === 'Не выбрано') {
                guildData.ticketcategoryon1 = false;
            }
            if (data.category !== 'Не выбрано') {
                guildData.ticketcategoryon1 = true;
                guildData.ticketcategory1 = guild.channels.find((ch) => ch.type == "category" && ch.name === data.category).id;
            }
        } else if (!guildData.ticketenable2) {
            guildData.ticketenable2 = true;
            guildData.ticketchannelname2 = data.name;
            guildData.ticketchannelperms2 = guild.roles.find((r) => "@" + r.name === data.role).id;
            guildData.ticketreact2 = data.emoji;
            if (data.category === 'Не выбрано') {
                guildData.ticketcategoryon2 = false;
            }
            if (data.category !== 'Не выбрано') {
                guildData.ticketcategoryon2 = true;
                guildData.ticketcategory2 = guild.channels.find((ch) => ch.type == "category" && ch.name === data.category).id;
            }
        } else if (!guildData.ticketenable3) {
            guildData.ticketenable3 = true;
            guildData.ticketchannelname3 = data.name;
            guildData.ticketchannelperms3 = guild.roles.find((r) => "@" + r.name === data.role).id;
            guildData.ticketreact3 = data.emoji;
            if (data.category === 'Не выбрано') {
                guildData.ticketcategoryon3 = false;
            }
            if (data.category !== 'Не выбрано') {
                guildData.ticketcategoryon3 = true;
                guildData.ticketcategory3 = guild.channels.find((ch) => ch.type == "category" && ch.name === data.category).id;
            }
        } else if (!guildData.ticketenable4) {
            guildData.ticketenable4 = true;
            guildData.ticketchannelname4 = data.name;
            guildData.ticketchannelperms4 = guild.roles.find((r) => "@" + r.name === data.role).id;
            guildData.ticketreact4 = data.emoji;
            if (data.category === 'Не выбрано') {
                guildData.ticketcategoryon4 = false;
            }
            if (data.category !== 'Не выбрано') {
                guildData.ticketcategoryon4 = true;
                guildData.ticketcategory4 = guild.channels.find((ch) => ch.type == "category" && ch.name === data.category).id;
            }
        } else if (!guildData.ticketenable5) {
            guildData.ticketenable5 = true;
            guildData.ticketchannelname5 = data.name;
            guildData.ticketchannelperms5 = guild.roles.find((r) => "@" + r.name === data.role).id;
            guildData.ticketreact5 = data.emoji;
            if (data.category === 'Не выбрано') {
                guildData.ticketcategoryon5 = false;
            }
            if (data.category !== 'Не выбрано') {
                guildData.ticketcategoryon5 = true;
                guildData.ticketcategory5 = guild.channels.find((ch) => ch.type == "category" && ch.name === data.category).id;
            }
        } else if (!guildData.ticketenable6) {
            guildData.ticketenable6 = true;
            guildData.ticketchannelname6 = data.name;
            guildData.ticketchannelperms6 = guild.roles.find((r) => "@" + r.name === data.role).id;
            guildData.ticketreact6 = data.emoji;
            if (data.category === 'Не выбрано') {
                guildData.ticketcategoryon6 = false;
            }
            if (data.category !== 'Не выбрано') {
                guildData.ticketcategoryon6 = true;
                guildData.ticketcategory6 = guild.channels.find((ch) => ch.type == "category" && ch.name === data.category).id;
            }
        } else if (!guildData.ticketenable7) {
            guildData.ticketenable7 = true;
            guildData.ticketchannelname7 = data.name;
            guildData.ticketchannelperms7 = guild.roles.find((r) => "@" + r.name === data.role).id;
            guildData.ticketreact7 = data.emoji;
            if (data.category === 'Не выбрано') {
                guildData.ticketcategoryon7 = false;
            }
            if (data.category !== 'Не выбрано') {
                guildData.ticketcategoryon7 = true;
                guildData.ticketcategory7 = guild.channels.find((ch) => ch.type == "category" && ch.name === data.category).id;
            }
        } else if (!guildData.ticketenable8) {
            guildData.ticketenable8 = true;
            guildData.ticketchannelname8 = data.name;
            guildData.ticketchannelperms8 = guild.roles.find((r) => "@" + r.name === data.role).id;
            guildData.ticketreact8 = data.emoji;
            if (data.category === 'Не выбрано') {
                guildData.ticketcategoryon8 = false;
            }
            if (data.category !== 'Не выбрано') {
                guildData.ticketcategoryon8 = true;
                guildData.ticketcategory8 = guild.channels.find((ch) => ch.type == "category" && ch.name === data.category).id;
            }
        } else if (!guildData.ticketenable9) {
            guildData.ticketenable9 = true;
            guildData.ticketchannelname9 = data.name;
            guildData.ticketchannelperms9 = guild.roles.find((r) => "@" + r.name === data.role).id;
            guildData.ticketreact9 = data.emoji;
            if (data.category === 'Не выбрано') {
                guildData.ticketcategoryon9 = false;
            }
            if (data.category !== 'Не выбрано') {
                guildData.ticketcategoryon9 = true;
                guildData.ticketcategory9 = guild.channels.find((ch) => ch.type == "category" && ch.name === data.category).id;
            }
        }
        await guildData.ticketsenable++;
        await guildData.save();
        req.client.logger.log(`Создан ${guildData.ticketsenable}-ый тикет в ${guild.name}`, 'debug')
    };
    if (data.form_id === 'send_ticket_form') {
        if (data.pid === '0') {
            const msg = new Discord.RichEmbed()
                .setAuthor(guild.name, `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`, 'https://bot.fydne.xyz')
                .setTitle(guildData.ticketchannelname0)
                .setColor(guildData.color)
                .setDescription(guildData.ticketmsg0)
            guildData.ticketchannel0 = guild.channels.find((ch) => "#" + ch.name === data.channels).id;
            const channel = guild.channels.get(guildData.ticketchannel0);
            let m = await channel.send(msg);
            m.react(guildData.ticketreact0);
            guildData.ticketmessage0 = m.id;
            guildData.save();
            req.client.emit('ticketenable0', guild);
        } else if (data.pid === '1') {
            const msg = new Discord.RichEmbed()
                .setAuthor(guild.name, `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`, 'https://bot.fydne.xyz')
                .setTitle(guildData.ticketchannelname1)
                .setColor(guildData.color)
                .setDescription(guildData.ticketmsg1)
            guildData.ticketchannel1 = guild.channels.find((ch) => "#" + ch.name === data.channels).id;
            const channel = guild.channels.get(guildData.ticketchannel1);
            let m = await channel.send(msg);
            m.react(guildData.ticketreact1);
            guildData.ticketmessage1 = m.id;
            guildData.save();
            req.client.emit('ticketenable1', guild);
        } else if (data.pid === '2') {
            const msg = new Discord.RichEmbed()
                .setAuthor(guild.name, `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`, 'https://bot.fydne.xyz')
                .setTitle(guildData.ticketchannelname2)
                .setColor(guildData.color)
                .setDescription(guildData.ticketmsg2)
            guildData.ticketchannel2 = guild.channels.find((ch) => "#" + ch.name === data.channels).id;
            const channel = guild.channels.get(guildData.ticketchannel2);
            let m = await channel.send(msg);
            m.react(guildData.ticketreact2);
            guildData.ticketmessage2 = m.id;
            guildData.save();
            req.client.emit('ticketenable2', guild);
        } else if (data.pid === '3') {
            const msg = new Discord.RichEmbed()
                .setAuthor(guild.name, `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`, 'https://bot.fydne.xyz')
                .setTitle(guildData.ticketchannelname3)
                .setColor(guildData.color)
                .setDescription(guildData.ticketmsg3)
            guildData.ticketchannel3 = guild.channels.find((ch) => "#" + ch.name === data.channels).id;
            const channel = guild.channels.get(guildData.ticketchannel3);
            let m = await channel.send(msg);
            m.react(guildData.ticketreact3);
            guildData.ticketmessage3 = m.id;
            guildData.save();
            req.client.emit('ticketenable3', guild);
        } else if (data.pid === '4') {
            const msg = new Discord.RichEmbed()
                .setAuthor(guild.name, `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`, 'https://bot.fydne.xyz')
                .setTitle(guildData.ticketchannelname4)
                .setColor(guildData.color)
                .setDescription(guildData.ticketmsg4)
            guildData.ticketchannel4 = guild.channels.find((ch) => "#" + ch.name === data.channels).id;
            const channel = guild.channels.get(guildData.ticketchannel4);
            let m = await channel.send(msg);
            m.react(guildData.ticketreact4);
            guildData.ticketmessage4 = m.id;
            guildData.save();
            req.client.emit('ticketenable4', guild);
        } else if (data.pid === '5') {
            const msg = new Discord.RichEmbed()
                .setAuthor(guild.name, `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`, 'https://bot.fydne.xyz')
                .setTitle(guildData.ticketchannelname5)
                .setColor(guildData.color)
                .setDescription(guildData.ticketmsg5)
            guildData.ticketchannel5 = guild.channels.find((ch) => "#" + ch.name === data.channels).id;
            const channel = guild.channels.get(guildData.ticketchannel5);
            let m = await channel.send(msg);
            m.react(guildData.ticketreact5);
            guildData.ticketmessage5 = m.id;
            guildData.save();
            req.client.emit('ticketenable5', guild);
        } else if (data.pid === '6') {
            const msg = new Discord.RichEmbed()
                .setAuthor(guild.name, `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`, 'https://bot.fydne.xyz')
                .setTitle(guildData.ticketchannelname6)
                .setColor(guildData.color)
                .setDescription(guildData.ticketmsg6)
            guildData.ticketchannel6 = guild.channels.find((ch) => "#" + ch.name === data.channels).id;
            const channel = guild.channels.get(guildData.ticketchannel6);
            let m = await channel.send(msg);
            m.react(guildData.ticketreact6);
            guildData.ticketmessage6 = m.id;
            guildData.save();
            req.client.emit('ticketenable6', guild);
        } else if (data.pid === '7') {
            const msg = new Discord.RichEmbed()
                .setAuthor(guild.name, `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`, 'https://bot.fydne.xyz')
                .setTitle(guildData.ticketchannelname7)
                .setColor(guildData.color)
                .setDescription(guildData.ticketmsg7)
            guildData.ticketchannel7 = guild.channels.find((ch) => "#" + ch.name === data.channels).id;
            const channel = guild.channels.get(guildData.ticketchannel7);
            let m = await channel.send(msg);
            m.react(guildData.ticketreact7);
            guildData.ticketmessage7 = m.id;
            guildData.save();
            req.client.emit('ticketenable7', guild);
        } else if (data.pid === '8') {
            const msg = new Discord.RichEmbed()
                .setAuthor(guild.name, `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`, 'https://bot.fydne.xyz')
                .setTitle(guildData.ticketchannelname8)
                .setColor(guildData.color)
                .setDescription(guildData.ticketmsg8)
            guildData.ticketchannel8 = guild.channels.find((ch) => "#" + ch.name === data.channels).id;
            const channel = guild.channels.get(guildData.ticketchannel8);
            let m = await channel.send(msg);
            m.react(guildData.ticketreact8);
            guildData.ticketmessage8 = m.id;
            guildData.save();
            req.client.emit('ticketenable8', guild);
        } else if (data.pid === '9') {
            const msg = new Discord.RichEmbed()
                .setAuthor(guild.name, `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`, 'https://bot.fydne.xyz')
                .setTitle(guildData.ticketchannelname9)
                .setColor(guildData.color)
                .setDescription(guildData.ticketmsg9)
            guildData.ticketchannel9 = guild.channels.find((ch) => "#" + ch.name === data.channels).id;
            const channel = guild.channels.get(guildData.ticketchannel9);
            let m = await channel.send(msg);
            m.react(guildData.ticketreact9);
            guildData.ticketmessage9 = m.id;
            guildData.save();
            req.client.emit('ticketenable9', guild);
        }
    }
    if (data.deletef) {
        if (data.deletef === '1') {
            guildData.ticketenable0 = false;
            guildData.ticketopen0 = 0;
            guildData.ticketchannel0 = '';
            guildData.ticketmessage0 = '';
            guildData.ticketreact0 = '671334152418623489';
            guildData.ticketcategoryon0 = false;
            guildData.ticketcategory0 = '';
            guildData.ticketchannelname0 = 'Тикет';
            guildData.ticketchannelperms0 = '';
            guildData.ticketmessage1enable0 = true;
            guildData.ticketmessage1send0 = '<@&721471705150914653>, пользователь создал новый тикет.';
            guildData.ticketmessage2enable0 = true;
            guildData.ticketmessage2send0 = '__**Вот твой канал, {member}**__';
            guildData.ticketmessage3enable0 = true;
            guildData.ticketmessage3send0 = 'embed';
            guildData.ticketclosemsg0 = 'Для закрытия тикета, нажмите на 🔒\n**Закрыть может только администратор**';
            guildData.ticketsenable--;
            guildData.save();
        }
        if (data.deletef === '2') {
            guildData.ticketenable1 = false;
            guildData.ticketopen1 = 0;
            guildData.ticketchannel1 = '';
            guildData.ticketmessage1 = '';
            guildData.ticketreact1 = '671334152418623489';
            guildData.ticketcategoryon1 = false;
            guildData.ticketcategory1 = '';
            guildData.ticketchannelname1 = 'Тикет';
            guildData.ticketchannelperms1 = '';
            guildData.ticketmessage1enable1 = true;
            guildData.ticketmessage1send1 = '<@&721471705150914653>, пользователь создал новый тикет.';
            guildData.ticketmessage2enable1 = true;
            guildData.ticketmessage2send1 = '__**Вот твой канал, {member}**__';
            guildData.ticketmessage3enable1 = true;
            guildData.ticketmessage3send1 = 'embed';
            guildData.ticketclosemsg1 = 'Для закрытия тикета, нажмите на 🔒\n**Закрыть может только администратор**';
            guildData.ticketsenable--;
            guildData.save();
        }
        if (data.deletef === '3') {
            guildData.ticketenable2 = false;
            guildData.ticketopen2 = 0;
            guildData.ticketchannel2 = '';
            guildData.ticketmessage2 = '';
            guildData.ticketreact2 = '671334152418623489';
            guildData.ticketcategoryon2 = false;
            guildData.ticketcategory2 = '';
            guildData.ticketchannelname2 = 'Тикет';
            guildData.ticketchannelperms2 = '';
            guildData.ticketmessage1enable2 = true;
            guildData.ticketmessage1send2 = '<@&721471705150914653>, пользователь создал новый тикет.';
            guildData.ticketmessage2enable2 = true;
            guildData.ticketmessage2send2 = '__**Вот твой канал, {member}**__';
            guildData.ticketmessage3enable2 = true;
            guildData.ticketmessage3send2 = 'embed';
            guildData.ticketclosemsg2 = 'Для закрытия тикета, нажмите на 🔒\n**Закрыть может только администратор**';
            guildData.ticketsenable--;
            guildData.save();
        }
        if (data.deletef === '4') {
            guildData.ticketenable3 = false;
            guildData.ticketopen3 = 0;
            guildData.ticketchannel3 = '';
            guildData.ticketmessage3 = '';
            guildData.ticketreact3 = '671334152418623489';
            guildData.ticketcategoryon3 = false;
            guildData.ticketcategory3 = '';
            guildData.ticketchannelname3 = 'Тикет';
            guildData.ticketchannelperms3 = '';
            guildData.ticketmessage1enable3 = true;
            guildData.ticketmessage1send3 = '<@&721471705150914653>, пользователь создал новый тикет.';
            guildData.ticketmessage2enable3 = true;
            guildData.ticketmessage2send3 = '__**Вот твой канал, {member}**__';
            guildData.ticketmessage3enable3 = true;
            guildData.ticketmessage3send3 = 'embed';
            guildData.ticketclosemsg3 = 'Для закрытия тикета, нажмите на 🔒\n**Закрыть может только администратор**';
            guildData.ticketsenable--;
            guildData.save();
        }
        if (data.deletef === '5') {
            guildData.ticketenable4 = false;
            guildData.ticketopen4 = 0;
            guildData.ticketchannel4 = '';
            guildData.ticketmessage4 = '';
            guildData.ticketreact4 = '671334152418623489';
            guildData.ticketcategoryon4 = false;
            guildData.ticketcategory4 = '';
            guildData.ticketchannelname4 = 'Тикет';
            guildData.ticketchannelperms4 = '';
            guildData.ticketmessage1enable4 = true;
            guildData.ticketmessage1send4 = '<@&721471705150914653>, пользователь создал новый тикет.';
            guildData.ticketmessage2enable4 = true;
            guildData.ticketmessage2send4 = '__**Вот твой канал, {member}**__';
            guildData.ticketmessage3enable4 = true;
            guildData.ticketmessage3send4 = 'embed';
            guildData.ticketclosemsg4 = 'Для закрытия тикета, нажмите на 🔒\n**Закрыть может только администратор**';
            guildData.ticketsenable--;
            guildData.save();
        }
        if (data.deletef === '6') {
            guildData.ticketenable5 = false;
            guildData.ticketopen5 = 0;
            guildData.ticketchannel5 = '';
            guildData.ticketmessage5 = '';
            guildData.ticketreact5 = '671334152418623489';
            guildData.ticketcategoryon5 = false;
            guildData.ticketcategory5 = '';
            guildData.ticketchannelname5 = 'Тикет';
            guildData.ticketchannelperms5 = '';
            guildData.ticketmessage1enable5 = true;
            guildData.ticketmessage1send5 = '<@&721471705150914653>, пользователь создал новый тикет.';
            guildData.ticketmessage2enable5 = true;
            guildData.ticketmessage2send5 = '__**Вот твой канал, {member}**__';
            guildData.ticketmessage3enable5 = true;
            guildData.ticketmessage3send5 = 'embed';
            guildData.ticketclosemsg5 = 'Для закрытия тикета, нажмите на 🔒\n**Закрыть может только администратор**';
            guildData.ticketsenable--;
            guildData.save();
        }
        if (data.deletef === '7') {
            guildData.ticketenable6 = false;
            guildData.ticketopen6 = 0;
            guildData.ticketchannel6 = '';
            guildData.ticketmessage6 = '';
            guildData.ticketreact6 = '671334152418623489';
            guildData.ticketcategoryon6 = false;
            guildData.ticketcategory6 = '';
            guildData.ticketchannelname6 = 'Тикет';
            guildData.ticketchannelperms6 = '';
            guildData.ticketmessage1enable6 = true;
            guildData.ticketmessage1send6 = '<@&721471705150914653>, пользователь создал новый тикет.';
            guildData.ticketmessage2enable6 = true;
            guildData.ticketmessage2send6 = '__**Вот твой канал, {member}**__';
            guildData.ticketmessage3enable6 = true;
            guildData.ticketmessage3send6 = 'embed';
            guildData.ticketclosemsg6 = 'Для закрытия тикета, нажмите на 🔒\n**Закрыть может только администратор**';
            guildData.ticketsenable--;
            guildData.save();
        }
        if (data.deletef === '8') {
            guildData.ticketenable7 = false;
            guildData.ticketopen7 = 0;
            guildData.ticketchannel7 = '';
            guildData.ticketmessage7 = '';
            guildData.ticketreact7 = '671334152418623489';
            guildData.ticketcategoryon7 = false;
            guildData.ticketcategory7 = '';
            guildData.ticketchannelname7 = 'Тикет';
            guildData.ticketchannelperms7 = '';
            guildData.ticketmessage1enable7 = true;
            guildData.ticketmessage1send7 = '<@&721471705150914653>, пользователь создал новый тикет.';
            guildData.ticketmessage2enable7 = true;
            guildData.ticketmessage2send7 = '__**Вот твой канал, {member}**__';
            guildData.ticketmessage3enable7 = true;
            guildData.ticketmessage3send7 = 'embed';
            guildData.ticketclosemsg7 = 'Для закрытия тикета, нажмите на 🔒\n**Закрыть может только администратор**';
            guildData.ticketsenable--;
            guildData.save();
        }
        if (data.deletef === '9') {
            guildData.ticketenable8 = false;
            guildData.ticketopen8 = 0;
            guildData.ticketchannel8 = '';
            guildData.ticketmessage8 = '';
            guildData.ticketreact8 = '671334152418623489';
            guildData.ticketcategoryon8 = false;
            guildData.ticketcategory8 = '';
            guildData.ticketchannelname8 = 'Тикет';
            guildData.ticketchannelperms8 = '';
            guildData.ticketmessage1enable8 = true;
            guildData.ticketmessage1send8 = '<@&721471705150914653>, пользователь создал новый тикет.';
            guildData.ticketmessage2enable8 = true;
            guildData.ticketmessage2send8 = '__**Вот твой канал, {member}**__';
            guildData.ticketmessage3enable8 = true;
            guildData.ticketmessage3send8 = 'embed';
            guildData.ticketclosemsg8 = 'Для закрытия тикета, нажмите на 🔒\n**Закрыть может только администратор**';
            guildData.ticketsenable--;
            guildData.save();
        }
        if (data.deletef === '10') {
            guildData.ticketenable9 = false;
            guildData.ticketopen9 = 0;
            guildData.ticketchannel9 = '';
            guildData.ticketmessage9 = '';
            guildData.ticketreact9 = '671334152418623489';
            guildData.ticketcategoryon9 = false;
            guildData.ticketcategory9 = '';
            guildData.ticketchannelname9 = 'Тикет';
            guildData.ticketchannelperms9 = '';
            guildData.ticketmessage1enable9 = true;
            guildData.ticketmessage1send9 = '<@&721471705150914653>, пользователь создал новый тикет.';
            guildData.ticketmessage2enable9 = true;
            guildData.ticketmessage2send9 = '__**Вот твой канал, {member}**__';
            guildData.ticketmessage3enable9 = true;
            guildData.ticketmessage3send9 = 'embed';
            guildData.ticketclosemsg9 = 'Для закрытия тикета, нажмите на 🔒\n**Закрыть может только администратор**';
            guildData.ticketsenable--;
            guildData.save();
        }
        setTimeout(redir, 500);
        async function redir() {
            res.redirect("/manage/" + guild.id + "/ticket-configs");
        }
    }
    res.redirect(303, "/manage/" + guild.id + "/ticket-configs");


});
module.exports = router;