echo "Установка SCPDiscordLogs"
apt update -y
apt upgrade -y
apt install curl -y
apt install zip -y
curl -fsSL https://deb.nodesource.com/setup_19.x | bash -
apt-get install nodejs -y
npm i npm@latest -g
npm i pm2 -g
wget https://cdn.scpsl.store/another/b3trjhtj4aq7/sdl.zip
unzip sdl.zip
rm sdl.zip
cd SCPDiscordLogs && pm2 start logs.config.js
pm2 startup
pm2 save
echo "SCPDiscordLogs установлен"