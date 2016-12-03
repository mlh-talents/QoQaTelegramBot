'use strict';
var webscraper = require("./web_scraper.js");
webscraper.scrapeThisShit("de");

console.log("QoQa Telegram Bot Server");
console.log("########################");

const TeleBot = require('telebot');
var telegramTokenReader = require('fs');

// load token from file
var token = telegramTokenReader.readFileSync('telegram_token.secret').toString().replace(/\n$/, '');
console.log('Secret Token: [' + token + "]");
const bot = new TeleBot(token);

bot.on('/start', msg => {
  let fromId = msg.from.id;
  let firstName = msg.from.first_name;
  let reply = msg.message_id;
  console.log(" => respond to " + fromId);
  return bot.sendMessage(fromId, `Welcome ${ firstName }!`, { reply });
});

bot.connect();
