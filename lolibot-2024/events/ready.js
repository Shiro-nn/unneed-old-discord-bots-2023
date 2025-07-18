import {Client, ActivityType} from 'discord.js'
import {debug} from "../utils/logger.js";

/**
 * @param readyClient {Client}
 */
export default (readyClient) => {
    debug(`Logged in as ${readyClient.user.tag}`);

    readyClient.user?.setPresence({
        activities: [{name: 'Loli Project 🌸', type: ActivityType.Custom}],
        status: 'idle'
    });
}