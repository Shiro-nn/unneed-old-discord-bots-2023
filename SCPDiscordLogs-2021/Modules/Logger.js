const { bgBlue, black, green } = require("chalk");

function dateTimePad(value, digits){
  let number = value
  while (number.toString().length < digits) {
    number = "0" + number
  }
  return number;
}

function format(tDate){
  return (dateTimePad(tDate.getDate(), 2) + "." +
  dateTimePad((tDate.getMonth() + 1), 2) + " " +
  dateTimePad(tDate.getHours(), 2) + ":" +
  dateTimePad(tDate.getMinutes(), 2) + ":" +
  dateTimePad(tDate.getSeconds(), 2))
}

module.exports = class Logger {
  static log (content, type = "log") {
    if(content == null || content == undefined) return;
    const date = `[${format(new Date(Date.now()))}]:`;
    switch (type) {
      case "debug": {
        return console.log(`${date} ${green(type.toUpperCase())} ${content} `);
      }
      case "log": {
        return console.log(`${date} ${bgBlue(type.toUpperCase())} ${content} `);
      }
      case "warn": {
        return console.log(`${date} ${black.bgYellow(type.toUpperCase())} ${content} `);
      }
      case "error": {
        return console.log(`${date} ${black.bgRed(type.toUpperCase())} ${content} `);
      }
      case "cmd": {
        return console.log(`${date} ${black.bgWhite(type.toUpperCase())} ${content}`);
      }
      case "ready": {
        return console.log(`${date} ${black.bgGreen(type.toUpperCase())} ${content}`);
      }
      case "kick": {
        return console.log(`${date} ${black.bgYellow(type.toUpperCase())} ${content} `);
      }
      case "ban": {
        return console.log(`${date} ${black.bgRed(type.toUpperCase())} ${content} `);
      }
      default: throw new TypeError("Logger type must be either warn, debug, log, ready, cmd or error.");
    }
  }
};