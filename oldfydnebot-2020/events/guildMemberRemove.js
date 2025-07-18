Discord = require("discord.js");

module.exports = class {

    constructor (client) {
      this.client = client;
    }
  
    async run (member) {

        member.guild.fetch().then(async (guild) => {

            let guildData = await this.client.findOrCreateGuild({ id: guild.id });

            // Check if goodbye message is enabled
            if(guildData.plugins.goodbye.enabled){
                let channel = guild.channels.get(guildData.plugins.goodbye.channel);
                if(channel){
                    let message = guildData.plugins.goodbye.message
                    .replace(/{user}/g, member.user.tag)
                    .replace(/{server}/g, guild.name)
                    .replace(/{membercount}/g, guild.memberCount);
                    if(guildData.plugins.goodbye.withImage){
                        const canvas = require("../discord-canvas"),
                        goodbyeCanvas = new canvas.Goodbye();
                        let options = { format: "png", size: 512 };
                        let image = await goodbyeCanvas
                        .setUsername(member.user.username)
                        .setDiscriminator(member.user.discriminator)
                        .setNumber(guild.memberCount)
                        .setServer(guild.name)
                        .setAvatar(member.user.displayAvatarURL(options))
                        .setColor("border", "#1d2124")
                        .setColor("username-box", "#8a8a8a")
                        .setColor("discriminator-box", "#8a8a8a")
                        .setColor("message-box", "#8a8a8a")
                        .setColor("title", "#e15500")
                        .setColor("avatar", "#df0909")
                        .setBackground("./assets/img/greetings_background.png")
                        .toAttachment();
                        
                        let attachment = new Discord.MessageAttachment(image.toBuffer(), "goodbye-image.png");
                            channel.send(message, attachment);
                    } else {
                        channel.send(message);
                    }
                }
            }

        });
    }
  };