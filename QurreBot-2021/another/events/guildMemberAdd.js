const DsData = require("../base/discords");
const axios = require('axios');
const cdn_host = 'https://cdn.scpsl.store';
module.exports = class {
    constructor(client) {
        this.client = client;
    }
    async run (member) {
        try{
            const link =  member.user.displayAvatarURL({ format: 'png', dynamic: true });
            const name = link.split('.')[link.split('.').length - 1];
            const cdn_link = `${cdn_host}/avatar/discord/${member.user.id}/${member.user.avatar}.${name}`;
            let data = await DsData.findOne({id: member.user.id});
            if(data === null || data === undefined) {
                data = new DsData({id: member.user.id});
            }
            if(data.user !== member.user.username ||
            data.discriminator !== member.user.discriminator ||
            data.avatar !== cdn_link){
                axios.post(`${cdn_host}/upload/link`, {}, {
                    params: {
                        link: link,
                        name: `${member.user.avatar}.${name}`,
                        dir: `avatar/discord/${member.user.id}`
                    }
                });
                data.user = member.user.username;
                data.discriminator = member.user.discriminator;
                data.avatar = cdn_link;
                await data.save();
            }
        }catch(e){
            let msg = `Произошла ошибка в обновлении бд.\nИвент: guildMemberAdd\nМодуль: Another\nКод ошибки:\n${e}`;
            this.client.guilds.cache.get('616697847261298688').channels.cache.get('809399907211280414').send(msg);
        }
    }
};