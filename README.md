# unneed‑old‑discord‑bots‑2023 🤖🗄️

[![GitHub stars](https://img.shields.io/github/stars/Shiro-nn/unneed-old-discord-bots-2023?style=social)](https://github.com/Shiro-nn/unneed-old-discord-bots-2023/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/Shiro-nn/unneed-old-discord-bots-2023?style=social)](https://github.com/Shiro-nn/unneed-old-discord-bots-2023/network/members)
[![GitHub issues](https://img.shields.io/github/issues/Shiro-nn/unneed-old-discord-bots-2023)](https://github.com/Shiro-nn/unneed-old-discord-bots-2023/issues)
[![GitHub last commit](https://img.shields.io/github/last-commit/Shiro-nn/unneed-old-discord-bots-2023)](https://github.com/Shiro-nn/unneed-old-discord-bots-2023/commits)
[![License: MIT](https://img.shields.io/github/license/Shiro-nn/unneed-old-discord-bots-2023)](LICENSE)
[![Status: Archived](https://img.shields.io/badge/status-archived-lightgrey.svg)](https://github.com/Shiro-nn/unneed-old-discord-bots-2023)

![Repo Stats](https://github-readme-stats.vercel.app/api/pin/?username=Shiro-nn\&repo=unneed-old-discord-bots-2023)

> **unneed‑old‑discord‑bots‑2023** — моя «кладовка» ботов Discord, созданных в 2019‑2024 годах. Они уже не используются и в марте 2025 года были переведены в **архивный режим**. Репозиторий хранится «как есть»: без гарантий актуальности, безопасности и дальнейших обновлений, но может пригодиться как источник примеров.

---

## 📂 Что внутри

| Папка/год               | Технологии / стек                  | Назначение (коротко)                                                                 |
| ----------------------- | ---------------------------------- | ------------------------------------------------------------------------------------ |
| `ChatGPTBot-2023`       | **Node.js** (`discord.js`, OpenAI) | Чат‑бот, пересылающий сообщения в ChatGPT‑API и отвечающий в канал Discord.          |
| `Midjourney-2023`       | **Node.js** (`discord.js`)         | Отправка slash‑команд MidJourney через self‑bot (исследование, не для продакшена).   |
| `QurreBot-2021`         | **Node.js**                        | Русскоязычный «фан‑бот» для SCP\:SL с музыкой и модерацией; старый стек и структура. |
| `QurreBot-2022`         | **Node.js**                        | Переработанная версия QurreBot с dashboard на Express/EJS.                           |
| `manager-2022`          | **Node.js**                        | Панель управления игровыми серверами SCP\:SL (команды, отчёты, патрули, статистика). |
| `manager-prod-obf-2022` | **Node.js (обф.)**                 | Скомпилированная/обфусцированная сборка `manager-2022` для прод‑окружения.           |
| `SCPDiscordLogs-2021`   | **Node.js**                        | Логи сервера SCP\:SL → Discord каналы + экспортер чатов.                             |
| `lolibot-2024`          | **Node.js** (`pnpm`, `discord.js`) | Эксперименты с Nitro‑эвентами и авто‑ответами; использован до смены API правил.      |
| `mongobot-2019`         | **Node.js** + C# экспорт           | Ранний бот с Fortnite/achievement‑генератором; содержит DiscordChatExporter CLI.     |

> ✏️ Некоторые папки включают статические ассеты (Web‑dashboard, шрифты, иконки) — учтите размер при клонировании.

---

## 🚀 Быстрого запуска **нет**

Боты завязаны на устаревшие токены, старые версии Discord API, старые базы MongoDB и не поддерживаются. Запуск возможен только после ручной правки конфигов (`config.js`, `.env`, `package.json`) и обновления зависимостей.

```bash
# пример для ChatGPTBot-2023 (не гарантирован)
git clone https://github.com/Shiro-nn/unneed-old-discord-bots-2023.git
cd unneed-old-discord-bots-2023/ChatGPTBot-2023
npm install   # или pnpm / yarn
node start.js
```

*Ошибки совместимости и deprecated‑endpoint’ы остаются на вашей совести.*

---

## 🗺️ Историческая справка

* **2019 — mongobot**: первый эксперимент с Discord JS v11, поддержка тикетов и «достижений».
* **2021 — линейка Qurre/SCP**: переход на слэш‑команды, интеграция с SCP\:SL‑сервером.
* **2022 — manager‑series**: попытка создать единую админ‑панель; затем обфусцированная production‑сборка.
* **2023 — ChatGPT/Midjourney**: игра с LLM‑API и image prompts.
* **2024 — lolibot**: последний «фановый» бот перед закрытием проекта.
* **Март 2025**: репозиторий объявлен «ненужным» и архивирован.

---

## 🤝 Вклад

PR‑ы принимаются **только** для мелких фиксов (опечатки, сломанный билд). Если хотите развивать проект — форкните нужную папку и работайте в своём репозитории.

---

## ⚖️ Лицензия

Весь код выпущен под лицензией **MIT**. Используйте свободно, но на свой страх и риск — автор не несёт ответственности за последствия.

> Спасибо, что заглянули! Пусть этот код останется напоминанием о золотых временах старого Discord API 😉
