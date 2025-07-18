const Command = require("../../base/Command.js");
const { Webhook, MessageBuilder } = require('discord-webhook-node');
const cdn_host = 'https://cdn.scpsl.shop';
const cdn_upload = 'https://cdn-uploader.scpsl.shop';
const axios = require('axios');

class event extends Command {

    constructor (client) {
        super(client, {
            name: "архив",
            dirname: __dirname,
            enabled: true,
            guildOnly: true,
            memberPermissions: [],
            botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            ownerOnly: false,
            cooldown: 0
        });
    }
    async run (message, args, client) {
        try{
            message.delete();
            if(args.length == 0) return;
            if(message.member.user.id != '1193199454262677597' && 
            !message.member.roles.cache.get('1038181570604974180') && 
            !message.member.roles.cache.get('815583334284787754') && 
            !message.member.roles.cache.get('1079432168125767881') && 
            !message.member.roles.cache.get('653908539781152768')) return;
            const msg = await message.channel.messages.fetch(args[0]);
            if(!msg) return;
            const memberEmbed = new MessageBuilder()
            .setText(`<@${msg.author.id}>`)
            .setColor('#ff0000')
            .setDescription(msg.content)
            .setFooter(`${message.author.tag} | ${message.author.id}`)
            .setTimestamp()
            let weburl, file = '';
            if(msg.channel.id == '996434145825787914')
                weburl = 'https://discord.com/api/webhooks/1014324359562809394/xEuXBoncY9TFLOrPWudr_t2LciyQ16RQrDON0S3f2laVSQ_SC9RouLDpthhgV7mBUfD1';
            else if(msg.channel.id == '1045042225710637227')
                weburl = 'https://discord.com/api/webhooks/1045046465661239368/5N4PUx1KC759n7cEhUiCocTw5QEQAU0dNOnGNKzjlLPR90lpix1-o5Cq1qyxOcQlLRFa';
            else if(msg.channel.id == '1014349794879217674')
                weburl = 'https://discord.com/api/webhooks/1014332985580998808/k74PTcvattEhWFjgkYZYOm8RYQEnbCbr2irs6EX5x3zh5gag2KyTNzUFSMA-V_UT-V1I';
            else if(msg.channel.id == '1014275054462320740'){
                weburl = 'https://discord.com/api/webhooks/1014333849976721439/v4rtVbP_FEclyhoiz4MS-FGcVkgtNZCs2ZH8v4kf_redwu1rAGJjYt62kY6LOYoch1Ap';
                if(msg.attachments.some(_ => true)){
                    const _ath = msg.attachments.first();
                    if(_ath == null){
                        message.reply({ content: 'Сообщение должно содержать изображение', ephemeral: true, allowedMentions: { repliedUser: false } });
                        return;
                    }
                    const _dir = `another/${guid()}`;
                    await axios.post(`${cdn_upload}/upload/link`, {}, {
                        params: {
                            link: _ath.url,
                            name: _ath.name,
                            dir: _dir
                        }
                    });
                    file = `${cdn_host}/${_dir}/${_ath.name}`;
                }
            }
            else return console.log('fix iq');
            const hook = new Webhook(weburl);
            hook.setUsername(msg.author.username);
            hook.setAvatar(msg.author.displayAvatarURL());
            if(file != '') memberEmbed.setImage(file);
            hook.send(memberEmbed)
            msg.delete();
        }catch(e){
            let msg = `Произошла ошибка.\nКоманда: архив\nКод ошибки:\n${e}`
            client.guilds.cache.get('616697847261298688').channels.cache.get('1160927665117724722').send(msg);
        }
    }
}
module.exports = event;
const guid = function(){return 'xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {var r = Math.random()*32|0,v=c=='x'?r:r&0x3|0x8;return v.toString(32);});}