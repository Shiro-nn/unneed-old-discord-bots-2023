import {users} from "./database/main.js";

/**
 * Получает ID с сайта по Discord ID.
 * @param discord {String}
 * @return {Promise<number>}
 */
export const getIdByDiscord = async(discord) => {
    const user = await users.findOne({discord: discord}, undefined, undefined);

    if (!user || typeof user['id'] !== 'number') {
        throw new Error("User not found");
    }

    return user['id'];
}