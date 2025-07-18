module.exports = class {
    constructor (client) {
        this.client = client;
    }
    async run (message) {
        let client = this.client;
        client.emit('allmsg', message);
        if(message.author.bot && message.author.id !== client.user.id){
            return;
        }
        if (message.channel.id == '699803475038437513') {
            await message.react('760107426065416242');
            await message.react('742945862560382987');
            return;
        }
        if(message.channel.id === '1312838865186455634'){
            const udata = await client.findAccount({ discord: message.author.id });
            if(udata == null || udata == undefined) return;
            const adm = await adminsData.findOne({id: udata.id});
            if(adm == null || adm == undefined) return;
            adm.sl.punishments++;
            adm.markModified('sl');
            adm.save();
        }
    }
};