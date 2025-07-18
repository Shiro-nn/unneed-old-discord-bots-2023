const Discord = require("discord.js");
module.exports = class {
    constructor (client) {
        this.client = client;
    }
    async run (oldMember, newMember) {
        const newBoost = newMember.premiumSinceTimestamp > 0;
        const oldBoost = oldMember.premiumSinceTimestamp > 0;

        if (newBoost == oldBoost)
            return;

        let message = `<:nitro:674655772453634048> ${newMember.user} бустит сервер!`;

        if (!newBoost) {
            message = `☹️ ${newMember.user} больше не бустит сервер \:(`;
        }

        const embed = new Discord.MessageEmbed()
        .setColor('#f47fff')
        .setDescription(message);

        await newMember.guild.channels.cache.get('1039571053959192636').send({embed: embed});
    }
}