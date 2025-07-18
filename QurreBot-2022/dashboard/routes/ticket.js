const express = require("express"),
config = require("../../config"),
CheckAuth = require("../auth/CheckAuth"),
utils = require("../utils"),
router = express.Router();
const Discord = require("discord.js");
const cdn_host = config.dashboard.cdn;
router.get("/manage/:serverID/tickets", CheckAuth, async(req, res) => {
    const guild = req.client.guilds.cache.get(req.params.serverID);
    if(!guild || !req.userInfos.displayedGuilds || !req.userInfos.displayedGuilds.find((g) => g.id === req.params.serverID)){
        return res.redirect(`/invite/${req.params.serverID}`);
    }
    const link = 'https://cdn.discordapp.com/emojis/'
    let _roles = '';
    {
        const _data = [];
        let roles = guild.roles.cache;
        roles.sort(function(a, b){
            return b.rawPosition - a.rawPosition;
        }).forEach((rl) => _data.push({"name": rl.name, "id": rl.id}));
        _roles = JSON.stringify(_data);
    }
    const _emojis = [];
    {
        let per2 = guild.emojis.cache;
        per2.forEach((dt) => {
            let format = '.png'
            if(dt.animated) format = '.gif'
            if(!_emojis.filter(x => x.short_names.includes('your_'+dt.name)).length > 0)
            _emojis.push({"name": dt.name, "short_names": ['your_'+dt.name], "keywords": [dt.name], "id": dt.id, "imageUrl": link+dt.id+format});
        });
        let per = req.client.guilds.cache.get('669926289200644136').emojis.cache;
        per.forEach((dt) => {
            let format = '.png'
            if(dt.animated) format = '.gif'
            if(!_emojis.filter(x => x.short_names.includes('custom_'+dt.name)).length > 0)
            _emojis.push({"name": dt.name, "short_names": ['custom_'+dt.name], "keywords": [dt.name], "id": dt.id, "imageUrl": link+dt.id+format});
        });
        let per1 = req.client.guilds.cache.get('648247146445013002').emojis.cache;
        per1.forEach((dt) => {
            let format = '.png'
            if(dt.animated) format = '.gif'
            if(!_emojis.filter(x => x.short_names.includes('custom_'+dt.name)).length > 0)
            _emojis.push({"name": dt.name, "short_names": ['custom_'+dt.name], "keywords": [dt.name], "id": dt.id, "imageUrl": link+dt.id+format});
        });
    }
    const _channelsSend = guild.channels.cache;
    let tickets = await req.client.database.Tickets.find({guild: guild.id})
    let guildDB = await req.client.database.Guilds.findById(guild.id)
    if(!guildDB) guildDB = await req.client.database.Guilds({_id: guild.id}).save();
    let guildInfos = await utils.fetchGuild(guild.id, req.client, req.user.guilds);
    res.render("manager/tickets", {
        is_logged: (req.isAuthenticated()),
        guild: guildInfos,
        guildDB,
        user: req.userInfos,
        bot: req.client,
        cdn_host, tickets,
        roles: _roles,
        channelsSend: _channelsSend,
        emojis: _emojis
    });
});
router.post("/manage/:serverID/tickets", CheckAuth, async(req, res) => {
    const guild = req.client.guilds.cache.get(req.params.serverID);
    if(!guild || !req.userInfos.displayedGuilds || !req.userInfos.displayedGuilds.find((g) => g.id === req.params.serverID)){
        return res.redirect(`/invite/${req.params.serverID}`);
    }
    const _channels = [];
    {
        let channels = guild.channels.cache;
        channels.filter(ch => ch.type === "GUILD_TEXT").forEach((ch) => _channels.push({"name": ch.name, "id": ch.id}));
    }
    
    let guildDB = await req.client.database.Guilds.findById(guild.id)
    if(!guildDB) guildDB = await req.client.database.Guilds({_id: guild.id}).save();
    let data = req.body;
    if(data.form_id == 'send_ticket_form'){
        let TicketDB = await req.client.database.Tickets.findById(data.hash)
        if(!TicketDB) res.redirect(`/manage/${req.params.serverID}/tickets`);
        if(TicketDB.guild != guild.id) res.redirect(`/manage/${req.params.serverID}/tickets`);
        TicketDB.channel = data.channels;
        const msg = new Discord.MessageEmbed()
        .setAuthor(guild.name, guild.iconURL(), 'https://bot.fydne.xyz')
        .setTitle(TicketDB.name)
        .setColor(guildDB.color)
        .setDescription(TicketDB.content)
        const channel = guild.channels.cache.get(TicketDB.channel);
        if(channel){
            if(channel.permissionsFor(guild.me).has('EMBED_LINKS')){
                const doButton = new Discord.MessageButton()
                .setCustomId('TicketBottom')
                .setLabel('Открыть тикет')
                .setStyle('SECONDARY');
                if(/^\d+$/.test(TicketDB.react)){
                    doButton.setEmoji(TicketDB.react);
                }else{
                    doButton.setLabel(`${TicketDB.react} Открыть тикет`);
                }
                const row = new Discord.MessageActionRow().addComponents(doButton);
                const m = await channel.send({embeds: [msg], components: [row]});
                TicketDB.message = m.id;
                TicketDB.enable = true;
                req.client.emit('Ticket', TicketDB);
                await TicketDB.save();
            }
        }
    }
    if(data.section == 'create'){
        let category = guild.channels.cache.get(data.category);
        if(category?.type != "GUILD_CATEGORY") category = null;
        let TicketsDB = await req.client.database.Tickets.find();
        let hash = guid();
        for(;TicketsDB.filter(x => x._id == hash).length > 0;) hash = guid();
        let TicketDB = await req.client.database.Tickets({_id: hash});
        TicketDB.name = data.ticket_name;
        if(data.role != '') TicketDB.roles = JSON.parse(data.role);
        if(data.emoji != '') TicketDB.react = data.emoji;
        TicketDB.guild = guild.id;
        if(category != undefined && category != null) TicketDB.category = category.id;
        await TicketDB.save();
    }
    if(data.its == 'rename'){
        let TicketDB = await req.client.database.Tickets.findById(data.hash)
        if(!TicketDB) res.redirect(`/manage/${req.params.serverID}/tickets`);
        if(TicketDB.guild != guild.id) res.redirect(`/manage/${req.params.serverID}/tickets`);
        TicketDB.name = data.ticket_rename_name;
        await TicketDB.save();
    }
    if(data.its == 'delete'){
        let TicketDB = await req.client.database.Tickets.findById(data.hash)
        if(!TicketDB) res.redirect(`/manage/${req.params.serverID}/tickets`);
        if(TicketDB.guild != guild.id) res.redirect(`/manage/${req.params.serverID}/tickets`);
        await req.client.database.Tickets.findByIdAndDelete(TicketDB._id);
    }
    if(data.its == 'disable'){
        let TicketDB = await req.client.database.Tickets.findById(data.hash)
        if(!TicketDB) res.redirect(`/manage/${req.params.serverID}/tickets`);
        if(TicketDB.guild != guild.id) res.redirect(`/manage/${req.params.serverID}/tickets`);
        TicketDB.enable = false;
        await TicketDB.save();
    }
    if(data.its == 'enable'){
        let TicketDB = await req.client.database.Tickets.findById(data.hash)
        if(!TicketDB) res.redirect(`/manage/${req.params.serverID}/tickets`);
        if(TicketDB.guild != guild.id) res.redirect(`/manage/${req.params.serverID}/tickets`);
        TicketDB.enable = true;
        await TicketDB.save();
    }
    if(data.its == 'edit'){
        let TicketDB = await req.client.database.Tickets.findById(data.hash)
        if(!TicketDB) res.redirect(`/manage/${req.params.serverID}/tickets`);
        if(TicketDB.guild != guild.id) res.redirect(`/manage/${req.params.serverID}/tickets`);
        if(data.emoji != '') TicketDB.react = data.emoji;
        TicketDB.content = data.name;
        TicketDB.message_text = data.ticket_message_standart;
        TicketDB.message_embed = data.ticket_message_embed;
        if(data.only_admin == 'on') TicketDB.only_admin_close = true;
        else TicketDB.only_admin_close = false;
        if(data.role != '') TicketDB.roles = JSON.parse(data.role);
        await TicketDB.save();
    }
    res.redirect(303, `/manage/${req.params.serverID}/tickets`);
});
module.exports = router;
const guid = function(){return 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {var r = Math.random()*16|0,v=c=='x'?r:r&0x3|0x8;return v.toString(16);});}