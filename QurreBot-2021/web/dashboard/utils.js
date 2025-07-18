const Discord = require("discord.js");
async function fetchGuild(guildID, client, guilds){
    const guild = client.guilds.cache.get(guildID);
    if(!guild) return;
    if(!guild.name) return;
    let conf = await client.database.Guilds.findById(guild.id);
    return { ...guild, ...conf.toJSON(), ...guilds.find((g) => g.id === guild.id) };
}
async function fetchUser(userData, client, query, req){
    let leng = 0;
    if(userData.guilds){
        userData.guilds.forEach(async(guild) => {
            const _guild = client.guilds.cache.get(guild.id);
            const perms = new Discord.Permissions(BigInt(guild.permissions));
            if(perms.has("MANAGE_GUILD")){
                guild.admin = true;
            }
            guild.settingsUrl = (_guild ? `/manage/${guild.id}` : `/invite/${guild.id}`);
            guild.settingsmsg = (_guild ? `Настроить` : `Пригласить`);
            guild.displayed = (query ? guild.name.toLowerCase().includes(query.toLowerCase()) : true);
            leng++;
        });
    }
    let userInfos = { ...userData };
    req.userInfos = userInfos;
    return userInfos;
}
async function render(userData, client, query, req, res, cdn_host){
    let leng = 0;
    if(userData.guilds){
        userData.guilds.forEach(async(guild) => {
            const perms = new Discord.Permissions(BigInt(guild.permissions));
            if(perms.has("MANAGE_GUILD")){
                guild.admin = true;
            }
            const _guild = client.guilds.cache.get(guild.id);
            guild.settingsUrl = (_guild ? `/manage/${guild.id}` : `/invite/${guild.id}`);
            guild.settingsmsg = (_guild ? `Настроить` : `Пригласить`);
            guild.displayed = (query ? guild.name.toLowerCase().includes(query.toLowerCase()) : true);
            leng++;
        });
        var myVar = setInterval(() => {
            if(leng >= userData.guilds.length){
                userData.displayedGuilds = userData.guilds.filter((g) => g.displayed && g.admin);
                if(userData.displayedGuilds.length < 1){
                    delete userData.displayedGuilds;
                }
                clearInterval(myVar);
                req.user.displayedGuilds = userData.displayedGuilds;
                res.render("selector", {
                    user: req.user,
                    guilds: req.user.guilds.filter(u => (u.permissions & 2146958591) === 2146958591),
                    is_logged: (req.isAuthenticated()),
                    cdn_host
                });
            }
        }, 1000);
    }
}
async function fetchUsers(array, client) {
    return new Promise((resolve, reject) => {
        let users = [];
        array.filter((e) => e.id).forEach((element) => {
            client.users.fetch(element.id).then((user) => {
                user.username = user.username.replace(/[\W_]+/g," ");
                if(user.username.length > 13){
                    user.username = user.username.substr(0, 10)+"...";
                }
                users.push({ ...{
                    level: element.level
                }, ...user.toJSON() });
            });
        });
        resolve(users);
    });
}
function sortArrayOfObjects(key, arr){
    let array = arr.slice(0);
    return array.sort((a, b) => {
        return b[key] - a[key];
    });
}
module.exports = { fetchUser, fetchUsers, fetchGuild, render };