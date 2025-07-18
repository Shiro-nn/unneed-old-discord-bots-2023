Discord = require("discord.js");
module.exports = class {

    constructor (client) {
        this.client = client;
    }

    async run (member) {
    
        member.guild.fetch().then(async (guild) => {

            let guildData = await this.client.findOrCreateGuild({ id: guild.id });

            let memberData = await this.client.findOrCreateMember({ id: member.id, guildID: guild.id });
            if(memberData.mute.muted && memberData.mute.endDate > Date.now()){
                guild.channels.forEach((channel) => {
                    channel.updateOverwrite(member.id, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false,
                        CONNECT: false
                    }).catch((err) => {});
                });
            }

            // Check if the autorole is enabled
            if(guildData.plugins.autorole.enabled){
                member.roles.add(guildData.plugins.autorole.role).catch((err) => {});
            }
    
            // Check if welcome message is enabled
            if(guildData.plugins.welcome.enabled){
                let channel = member.guild.channels.get(guildData.plugins.welcome.channel);
                if(channel){
                    let message = guildData.plugins.welcome.message
                    .replace(/{user}/g, member)
                    .replace(/{server}/g, guild.name)
                    .replace(/{membercount}/g, guild.memberCount);
                    if(guildData.plugins.welcome.withImage){
                        const canvas = require("../discord-canvas"),
                        welcomeCanvas = new canvas.Welcome();
                        let options = { format: "png", size: 512 };
                        let image = await welcomeCanvas
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
                        .setColor("avatar", "#03A9F4")
                        .setBackground("./assets/img/greetings_background.png")
                        .toAttachment();
                      
                        let attachment = new Discord.MessageAttachment(image.toBuffer(), "welcome-image.png");
                        channel.send(message, attachment);
                    } else {
                        channel.send(message);
                    }
                }
            }

        });
    }

};