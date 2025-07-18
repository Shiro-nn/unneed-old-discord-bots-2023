module.exports = class AntiFlood {
    constructor(client) {
        this.client = client;
        this.users = new Map()
        this.messagesLimit = 5;
        this.reply_send = true;
        this.delete = true;
    }
    test(message, server) {
        if (server.antiflood.enabled) {
            let user = this.users.get(message.author.id);
            if(user){
                this.check(message, server);
                if (message.content !== user.messageContent) return;
                user.messages = user.messages + 1;
            }else{
                this.users.set(message.author.id, {
                    messages: 1,
                    messageContent: message.content
                });
            }
            if(this.delete){
                this.delete = false;
                setTimeout(() => {
                    this.delete = true;
                    this.remove(message.author.id);
                }, 10000);
            }
        }
    }
    async check(message, server) {
        let user = this.users.get(message.author.id)
        if (user) {
            if (user.messages >= server.antiflood.messagesLimit - 1) {
                message.delete().catch();
                user.warned = true;
                if(this.reply_send){
                    this.reply_send = false;
                    let _msg_ = await message.reply('не флуди.');
                    setTimeout(() => {
                        _msg_.delete().catch();
                        this.reply_send = true;
                    }, 3000);
                }
            }
        }
    }
    remove(id) {
        let user = this.users.get(id)
        if (user) {
            this.users.delete(id)
        }
    }
}