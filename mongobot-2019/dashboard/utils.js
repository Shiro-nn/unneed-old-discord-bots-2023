const Discord = require("../dis.js");

/**
 * Fetch guild informations
 * @param {string} guildID The ID of the guild to fetch
 * @param {object} client The discord client instance
 * @param {array} guilds The user guilds
 */
async function fetchGuild(guildID, client, guilds){
    let guild = client.guilds.get(guildID);
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
async function fetchUser(userData, client, query){
    if(userData.guilds){
        userData.guilds.forEach((guild) => {
            let perms = new Discord.Permissions(guild.permissions);
            if(perms.has("MANAGE_GUILD")){
                guild.admin = true;
            }
            guild.settingsUrl = (client.guilds.get(guild.id) ? `/manage/${guild.id}/` : `https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=-1&guild_id=${guild.id}`);
            guild.settingsmsg = (client.guilds.get(guild.id) ? `Настроить` : `Пригласить`);
            guild.statsUrl = (client.guilds.get(guild.id) ? `/stats/${guild.id}/` : `https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=-1&guild_id=${guild.id}`);
            guild.iconURL = (guild.icon ? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.gif?size=128` : "/discord.png");
            guild.displayed = (query ? guild.name.toLowerCase().includes(query.toLowerCase()) : true);
        });
        userData.displayedGuilds = userData.guilds.filter((g) => g.displayed && g.admin);
        if(userData.displayedGuilds.length < 1){
            delete userData.displayedGuilds;
        }
    }
    let userInfos = { ...userData };
    return userInfos;
}

/**
 * Get the leaderboard for money, level and reputation
 * @param {object} client The Discord client instance
 * @param {number} amount The amount of members to displays in each category (optional)
 * @param {array} leaderboard An array of user data
 * @returns {object}
 */
async function getLeaderboard(client, amount, leaderboard){
    let leaderboards = {
        level: sortArrayOfObjects("level", leaderboard)
    };
    if(amount){
        for(let cat in leaderboards){
            let e = leaderboards[cat];
            if(e.length > amount){
                e.length = amount;
            }
        }
    }
    let stats = {
        level: await fetchUsers(leaderboards.level, client)
    };
    return stats;
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

module.exports = { fetchUser, fetchUsers, getLeaderboard, fetchGuild };