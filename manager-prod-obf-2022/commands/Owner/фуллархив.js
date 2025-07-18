const Command = require("../../base/Command.js");
const { WebhookClient } = require("discord.js");

/**
 * Команда «фуллархив» – версия для **discord.js v12**
 *
 * 1. Читает все сообщения указанного текстового канала.
 * 2. Отправляет каждое сообщение в переданный веб‑хук.
 * 3. Проверяет, что Discord действительно вернул объект нового сообщения
 *    (`Message.id`). Если нет – считаем, что отправка не удалась.
 * 4. В конце выводит отчёт о количестве доставленных / недоставленных сообщений.
 */
class event extends Command {

    constructor (client) {
        super(client, {
            name: "фуллархив",
            dirname: __dirname,
            enabled: true,
            guildOnly: true,
            memberPermissions: [],
            botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            ownerOnly: false,
            cooldown: 0
        });
    }

    /**
     * @param {import("discord.js").Message} message
     * @param {string[]} args [0] – id канала‑источника, [1] – URL веб‑хука
     * @param {import("discord.js").Client} client
     */
    async run(message, args, client) {
        try {
            // 0) Разрешён только owner‑id
            if (message.member.user.id !== "1193199454262677597") return;
            if (args.length < 2) return message.reply("Нужны два аргумента: <канал> <вебхук>");

            /* ---------- подготовка ---------- */
            const srcChannel = client.channels.cache.get(args[0]);
            if (!srcChannel || srcChannel.type !== "text")
                return message.reply("Канал не найден или не текстовый");

            // Парсим URL веб‑хука → id + token
            const match = args[1].match(
                /https?:\/\/discord(?:app)?\.com\/api\/webhooks\/([0-9]+)\/([A-Za-z0-9_-]+)/
            );
            if (!match) return message.reply("Некорректный URL веб‑хука");
            const [, hookId, hookToken] = match;
            const hook = new WebhookClient(hookId, hookToken);

            /* ---------- читаем все сообщения ---------- */
            const msgs = await fetchAllMessages(srcChannel, 100);
            const failed = [];

            /* ---------- отправляем ---------- */
            for (const m of msgs) {
                // базовый контент + временная метка
                const contentLine = m.content || "";
                const footerLine = `\n-# <t:${Math.floor(m.createdTimestamp / 1000)}:F>`;
                const content = contentLine + footerLine;

                // конвертируем embeds → raw JSON (иначе v12 иногда ругается)
                const embeds = m.embeds?.length ? m.embeds.map(e => e.toJSON()) : undefined;

                try {
                    const sent = await hook.send(content, {
                        username: m.author.username,
                        avatarURL: m.author.displayAvatarURL(),
                        embeds,
                        allowedMentions: { parse: [] }, // не упоминать @everyone и т.д.
                    });

                    // ―― Валидация ――
                    if (!sent || !sent.id) throw new Error("API не вернул ID");
                } catch (err) {
                    console.warn(`Не доставлено сообщение ${m.id}:`, err.message);
                    failed.push(m.id);
                }
            }

            /* ---------- отчёт ---------- */
            await message.channel.send(
                `✅ Готово! Доставлено ${msgs.length - failed.length}/${msgs.length}.` +
                (failed.length ? ` Недоставленные: ${failed.slice(0, 5).join(", ")}${
                    failed.length > 5 ? " …" : ""
                }` : "")
            );
        } catch (e) {
            const log = `Произошла ошибка.\nКоманда: фуллархив (v12)\n${e.stack || e}`;
            client.guilds.cache
                .get("616697847261298688")
                ?.channels.cache.get("1160927665117724722")
                ?.send(log);
        }
    }
}

module.exports = event;

/**
 * Получить ВСЕ сообщения канала (discord.js@12)
 * @param {TextChannel} channel  – объект канала
 * @param {number}      limit    – макс. сообщений за раз (1-100), оставьте 100
 * @returns {Promise<Message[]>} – массив Message по возрастанию времени
 */
async function fetchAllMessages(channel, limit = 100) {
    let all = [];
    let lastID = null;

    while (true) {
        console.log('search:', all.length)
        const options = { limit };
        if (lastID) options.before = lastID;      // каждая следующая страница – «до» последнего сообщения

        const messages = await channel.messages.fetch(options);
        if (messages.size === 0) break;           // всё, дальше пусто

        all.push(...messages.array());            // в v12 .array() возвращает массив
        lastID = messages.last().id;              // запоминаем ID самого старого в пачке
    }

    return all.reverse();                       // теперь отсортированы от старых к новым
}
