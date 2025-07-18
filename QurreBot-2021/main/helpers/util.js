const Discord = require("discord.js");
const config = require("../config")
module.exports = {
  canModifyQueue(member) {
    const { channelID } = member.voice;
    const botChannel = member.guild.voice.channelID;
    if (channelID !== botChannel) {
      let messageOptions = {};
      messageOptions.embed = new Discord.MessageEmbed().setColor(config.embed.color).setDescription("Сначала вам нужно подключиться к голосовому каналу");
      member.send(messageOptions).catch();
      return;
    }
    return true;
  }
};