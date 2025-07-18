import {Client, Events} from "discord.js";
import ready from "./ready.js";
import nitroBoost from "./nitroBoost.js";

/**
 * @param client {Client}
 */
export default (client) => {
    client.on(Events.ClientReady, ready);
    client.on(Events.GuildMemberUpdate, nitroBoost);
}