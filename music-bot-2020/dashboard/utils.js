const Discord = require("discord.js");

/**
 * Fetch guild informations
 * @param {string} guildID The ID of the guild to fetch
 * @param {object} client The discord client instance
 * @param {array} guilds The user guilds
 */
async function fetchGuild(guildID, client, guilds){
    const results = await client.shard.broadcastEval(`
    let guild = this.guilds.cache.get('${guildID}');
    if(guild){
        if(guild.name) {
            let toReturn = guild.toJSON();
            toReturn.channels = guild.channels.cache.toJSON();
            toReturn.roles = guild.roles.cache.map((r) => {
                return {
                    name: r.name,
                    hexColor: r.hexColor,
                    id: r.id
                };
            });
            toReturn;
        }
    }
    `);
    const guild = results.find((g) => g);
    let conf = await client.findOrCreateGuild({id:guild.id});
    return { ...guild, ...conf.toJSON(), ...guilds.find((g) => g.id === guild.id) };
}

/**
 * Fetch user informations (stats, guilds, etc...)
 * @param {object} userData The oauth2 user informations
 * @param {object} client The discord client instance
 * @param {string} query The optional query for guilds
 * @returns {object} The user informations
 */
async function fetchUser(userData, client, query, req){
    let leng = 0;
    if(userData.guilds){
        userData.guilds.forEach(async(guild) => {
            const results = await client.shard.broadcastEval(` let guild = this.guilds.cache.get('${guild.id}'); `);
            const found = results.find((g) => g);
            let perms = new Discord.Permissions(guild.permissions);
            if(perms.has("MANAGE_GUILD")){
                guild.admin = true;
            }
            guild.settingsUrl = (found ? `/manage/${guild.id}/` : `https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=-1&guild_id=${guild.id}`);
            guild.settingsmsg = (found ? `Настроить` : `Пригласить`);
            guild.iconURL = (guild.icon ? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.gif?size=128` : "/discord.png");
            guild.displayed = (query ? guild.name.toLowerCase().includes(query.toLowerCase()) : true);
            leng++;
        });
    }
    let userInfos = { ...userData };
    req.userInfos = userInfos;
    return userInfos;
}

async function render(userData, client, query, req, res){
    let leng = 0;
    if(userData.guilds){
        userData.guilds.forEach(async(guild) => {
            let perms = new Discord.Permissions(guild.permissions);
            if(perms.has("MANAGE_GUILD")){
                guild.admin = true;
            }
            const results = await client.shard.broadcastEval(`
            let guild = this.guilds.cache.get('${guild.id}');
            if(guild){
                if(guild.name) {
                    let toReturn = guild.toJSON();
                    toReturn.channels = guild.channels.cache.toJSON();
                    toReturn.roles = guild.roles.cache.map((r) => {
                        return {
                            name: r.name,
                            hexColor: r.hexColor,
                            id: r.id
                        };
                    });
                    toReturn;
                }
            }
            `);
            const found = results.find((g) => g);
            guild.settingsUrl = (found ? `/manage/${guild.id}/` : `https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=-1&guild_id=${guild.id}`);
            guild.settingsmsg = (found ? `Настроить` : `Пригласить`);
            guild.iconURL = (guild.icon ? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.gif?size=128` : "/discord.png");
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
                    is_logged: (req.isAuthenticated())
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