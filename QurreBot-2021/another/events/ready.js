module.exports = class {
    constructor (client) {
        this.client = client;
    }
    async run () {
        let client = this.client;
        client.user.setStatus('invisible');
        return;
        const Discord = require("discord.js");
        const embed = new Discord.MessageEmbed()
        .setAuthor("Вышло важное обновление, касаемое тикетов.")
        .setDescription(`Была изменена логика открытия тикетов.\nДля работы нового модуля, требуется по-новой отправить тикет.\n`
        +`Старый модуль прекратит работу <t:1640995200:d>\n[Dev Log (ссылка-приглашение)](https://discord.gg/jbrzUzhwJf)`)
        .setColor('#00ff19')
        .setTimestamp();
        setTimeout(() => {
            let sended = [];
            client.guilds.cache.forEach(guild => {
                if(!sended.includes(guild.owner.user.id)){
                    console.log(guild.owner.user.username + '#' + guild.owner.user.discriminator);
                    sended.push(guild.owner.user.id)
                    try{guild.owner.send(embed)}catch{};
                }
            });
        }, 5000);
    }
}