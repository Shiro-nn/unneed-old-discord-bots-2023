const DsData = require("../base/discords");
const axios = require('axios');
const cdn_host = 'https://cdn.scpsl.store';
module.exports = class {
    constructor(client) {
        this.client = client;
    }
    async run(oldMember, newMember) {
        try{
            const link =  newMember.user.displayAvatarURL({ format: 'png', dynamic: true });
            const name = link.split('.')[link.split('.').length - 1];
            const cdn_link = `${cdn_host}/avatar/discord/${newMember.user.id}/${newMember.user.avatar}.${name}`;
            let data = await DsData.findOne({id: newMember.user.id});
            if(data === null || data === undefined) {
                data = new DsData({id: newMember.user.id});
            }
            if(data.user !== newMember.user.username ||
            data.discriminator !== newMember.user.discriminator ||
            data.avatar !== cdn_link){
                axios.post(`${cdn_host}/upload/link`, {}, {
                    params: {
                        link: link,
                        name: `${newMember.user.avatar}.${name}`,
                        dir: `avatar/discord/${newMember.user.id}`
                    }
                });
                data.user = newMember.user.username;
                data.discriminator = newMember.user.discriminator;
                data.avatar = cdn_link;
                await data.save();
            }
        }catch(e){
            let msg = `Произошла ошибка в обновлении бд.\nИвент: guildMemberUpdate\nМодуль: Another\nКод ошибки:\n${e}`;
            this.client.guilds.cache.get('616697847261298688').channels.cache.get('809399907211280414').send(msg);
        }
    }
};