const Discord = require("discord.js");
module.exports = class {
  constructor (client) {
    this.client = client;
  }
  async run (guild) {
    await this.client.database.TicketLogs.deleteMany({guild: guild.id});
    await this.client.database.Guilds.findByIdAndDelete(guild.id)
    const embed = new Discord.MessageEmbed()
    .setAuthor(guild.name, guild.iconURL())
    .setColor("#B22222")
    .setDescription(`Бота удалили с сервера **${guild.name}**, там **${guild.memberCount}** юзеров.`);
    this.channels.cache.get(this.client.config.support.logs)?.send({embeds: [embed]});
  }
}