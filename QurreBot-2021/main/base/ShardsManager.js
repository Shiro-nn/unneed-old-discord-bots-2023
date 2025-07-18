module.exports = class ShardsManager {
    constructor(client) {
        this.client = client
    }
    async getFromCollection(collection, id) {
        const data = await this.client.shard.broadcastEval(` this.${collection}.cache.get('${id}'); `)
        return data[0];
    }
    async getSizeCollection(collection) {
        const info = await this.client.shard.fetchClientValues(`${collection}.cache.size`)
        let i = info.reduce((prev, val) => prev + val)
        return i
    }
    async getAllSizeObject(collection) {
        return await this.getSizeCollection(collection)
    }
    async getEmojis(id) {
        return await this.getFromCollection('emojis', id)
    }
    async getUsers(id) {
        return await this.getFromCollection('users', id)
    }
    async getGuilds(id) {
        return await this.getFromCollection('guilds', id);
    }
    async getChannels(id) {
        return await this.getFromCollection('channels', id)
    }
    async killShard(id) {
        return this.client.shard.broadcastEval(`if (this.shard.id === ${id}) { this.destroy() }`)
    }
}