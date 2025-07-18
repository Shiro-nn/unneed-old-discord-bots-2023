module.exports = class {
    constructor(client) {
        this.client = client;
    }

    async run(member) {
        try {
            if (member.guild.id !== '1312826666325905538') { // логи
                return;
            }
            const mainGuild = this.client.guilds.cache.get(this.client.config.guildid);
            const mainMember = await mainGuild.members.fetch(member.user.id);

            // патруль, амс, отдел безопасности, стражи hrp
            if (!mainMember.roles.cache.find(role => role.id === '1193669353204371507' || role.id === '722023017680732200' || role.id === '1251650981532401694' || role.id === '1303510679210430484')) {
                return;
            }

            member.roles.add(['1312829203422646472']);
        } catch (e) {
            let msg = `Произошла ошибка.\nИвент: guildMemberAdd\nКод ошибки:\n${e}`;
            this.client.guilds.cache.get('616697847261298688').channels.cache.get('1160927665117724722').send(msg);
        }
    }
}