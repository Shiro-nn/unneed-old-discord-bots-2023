const { ShardingManager } = require("discord.js");
const config = require("./config");
const manager = new ShardingManager("./fydne.js", {
    token: config.token,
    totalShards: config.shardCount,
    shardArgs: [ ...process.argv, ...[ '--sharded' ] ]
});
manager.on('shardCreate', shard => require("./helpers/logger").log(`Shard #${shard.id} has started.`, "ready"));

manager.spawn();