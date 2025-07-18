import {EmbedBuilder, GuildMember, PartialGuildMember} from "discord.js";
import config from "../config.js";

/**
 * @param oldMember {GuildMember | PartialGuildMember}
 * @param newMember {GuildMember}
 */
export default async(oldMember, newMember) => {
    const newBoost = newMember.premiumSinceTimestamp > 0;
    const oldBoost = oldMember.premiumSinceTimestamp > 0;

    if (newBoost === oldBoost) {
        return;
    }

    await
        newMember.client.channels.cache.get(config.nitroChannel).send({
            embeds: [
                new EmbedBuilder()
                    .setColor([244, 127, 255])
                    .setDescription(newBoost ?
                        `<:nitro:1321208605911023697> ${newMember.user} бустит сервер!` :
                        `☹️ ${newMember.user} больше не бустит сервер \:(`
                    )
            ]
        })
}