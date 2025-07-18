var discord = require('discord.js');
var fs = require('fs');
var randomColour = require('randomcolor');
var Config = require('./config.json');
const leeks = require('leeks.js');
const log = require(`leekslazylogger`);

var int = 0;
var rc = 255;
var gc = 0;
var bc = 0;
class Bot {
    constructor(){
        this.servers = require('./servers.json');
        this.discordClient = new discord.Client({sync: true});
        
        this.discordClient.on("ready", () => {this.initialize();});
        
        this.discordClient.on("message", (msg) => {this.processMessage(msg)});

        this.discordClient.on('ready', () => {
            setInterval(() => {
                this.discordClient.user.setActivity(`*др @|*addrole @|${this.discordClient.guilds.size.toLocaleString()} servers`)
                this.discordClient.user.setStatus("idle");
            }, Config.update_delay*1000);
        },
        )
        
        this.discordClient.login(Config.discord_token);
    }
    
    initialize() {
        this.log("Connected to discord.");
        
        setInterval(() => {
            this.randomizeRoleColors();
        }, Config.randomize_delay*100);
    }

    processMessage(msg) {
        if(msg.content.startsWith("*addrole")) {
            for(var role of msg.mentions.roles.array()) {
                msg.reply("Added! " + role + " Now in the list of iridescent roles, you can add more.");
                
                this.addRainbowRole(msg.guild.id, role.id);
            }
        }
    }
    
    processMessage(msg) {
        if(msg.content.startsWith("*др")) {
            for(var role of msg.mentions.roles.array()) {
                msg.reply("Добавил! " + role + " теперь в списке переливающий ролей, можешь добавить ещё.");
                
                this.addRainbowRole(msg.guild.id, role.id);
            }
        }
    }
    
    randomizeRoleColors() {
        for(var server in this.servers) {
            var liveGuild = this.discordClient.guilds.get(server);
            
            if (!liveGuild) {
                continue;
            }
            
            for(var role of this.servers[server]) {
                var liveRole = liveGuild.roles.get(role);
                try{liveRole.setColor(changecolor());}catch{console.log(`err\n${rc},${gc},${bc}(${int}(${changecolor()}))`)}
            }
        }
    }
    
    addRainbowRole(guild, role) {
        if(this.servers[guild] == undefined) {
            this.servers[guild] = [];
        }
        
        for(var existingRole of this.servers[guild]) {
            if(existingRole == role) {
                return "Эта роль уже добавлена.";
            }
        }
        
        this.servers[guild].push(role);
        this.saveServers();
    } 
    
    saveServers() {
        fs.writeFileSync("./servers.json", JSON.stringify(this.servers), "utf8");
        this.log("Saved servers file.");
    }
    
    log(message) {
        console.log("\x1b[32mINFO\x1b[37m - \x1b[0m" + message);
    }
    
    error(message) {
        console.log("\x1b[31mERROR\x1b[37m - \x1b[0m" + message);
    }
}
function changecolor() {
    if(int < 256){
        int+=10;
        gc+=10;
        if(gc > 255) gc = 255;
        return rgbToHex(rc, gc, bc);
    }else if(int < 511){
        int+=10;
        rc-=10;
        if(rc < 0) rc = 0;
        return rgbToHex(rc, gc, bc);
    }else if(int < 766){
        int+=10;
        bc+=10;
        if(bc > 255) bc = 255;
        return rgbToHex(rc, gc, bc);
    }else if(int < 1021){
        int+=10;
        gc-=10;
        if(gc < 0) gc = 0;
        return rgbToHex(rc, gc, bc);
    }else if(int < 1276){
        int+=10;
        rc+=10;
        if(rc > 255) rc = 255;
        return rgbToHex(rc, gc, bc);
    }else if(int < 1531){
        int+=10;
        bc-=10;
        if(bc < 0) bc = 0;
        return rgbToHex(rc, gc, bc);
    }else{
        int = 0;
        rc = 255;
        gc = 0;
        bc = 0;
        return '#00ffff';
    }
}
function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}
function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

var instance = new Bot();
