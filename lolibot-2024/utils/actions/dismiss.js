import {getIdByDiscord} from "../database.js";
import {
    chancery as mrpDB,
    patrol as nrDB,
} from "../database/admins.js";

/**
 * Увольняет из всех отделов
 * @param discord {String} discord id
 */
export const all = async(discord) => {
    const id = await getIdByDiscord(discord);
    await mrpDB.deleteMany({id: id});
    await nrDB.deleteMany({id: id});
    // hrp
}

/**
 * Увольняет из канцелярии
 * @param discord {String} discord id
 */
export const chancery = async (discord) => {
    const id = await getIdByDiscord(discord);
    await mrpDB.deleteMany({id: id});
}

/**
 * Увольняет из патруля
 * @param discord {String} discord id
 */
export const patrol = async (discord) => {
    const id = await getIdByDiscord(discord);
    await nrDB.deleteMany({id: id});
}