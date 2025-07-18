module.exports = {
    getPrefix(message, data){
        if(message.channel.type !== "dm"){
            const prefixes = [
                `<@${message.client.user.id}>`,
                data.config.botname,
                data.guild.prefix
            ];
            let prefix = null;
            prefixes.forEach((p) => {
                if(message.content.startsWith(p)){
                    prefix = p;
                }
            });
            return prefix;
        } else {
            return true;
        }
    },
    async supportLink(client){
        return new Promise(async function(resolve, reject) {
            let guild = client.guilds.get(client.config.support.id);
            let member = guild.me;
            let channel = guild.channels.find((ch) => ch.permissionsFor(member.id).has("CREATE_INSTANT_INVITE"));
            if(channel){
                let invite = await channel.createInvite({maxAge :0}).catch((err) => {});
                resolve(invite ? invite.url : null);
            } else {
                resolve("https://fydne.xyz");
            }
        });
    },

    sortByKey(array, key) {
        return array.sort(function(a, b) {
            let x = a[key];
            let y = b[key];
            return ((x < y) ? 1 : ((x > y) ? -1 : 0));
        });
    },

    shuffle(pArray) {
        let array = [];
        pArray.forEach(element => array.push(element));
        let currentIndex = array.length, temporaryValue, randomIndex;
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    },

    randomNum(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
};