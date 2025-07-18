import util from "node:util";


/**
 * @param text {String}
 */
export function debug(text) {
    console.log(`[${util.styleText('green', 'DEBUG')}] ${text}`);
}

/**
 * @param text {String}
 */
export function log(text) {
    console.log(`[${util.styleText('blue', 'LOG')}] ${text}`);
}

/**
 * @param text {String}
 */
export function warn(text) {
    console.log(`[${util.styleText('yellow', 'WARN')}] ${text}`);
}

/**
 * @param text {String}
 */
export function error(text) {
    console.log(`[${util.styleText('red', 'ERR')}] ${text}`);
}