'use strict';

console.log("QoQa Telegram Bot Server");
console.log("########################");

console.log("Init cronjob...");
var sender = require("./sendStuffToUsers");
sender.registerCronJob();

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

bot.on('/getqoqa', msg => {
  let fromId = msg.from.id;
  let firstname = msg.from.first_name;
  console.log(" => respond /getqoqa to " + fromId + " User:" + firstname);
  // TODO: send correct offer
  return bot.sendMessage(fromId, "Angebot heute: www.qoqa.ch");
});

bot.on('/getdaily', msg => {
  let fromId = msg.from.id;
  console.log(" * registrating user " + fromId + " User:" + firstname);
  var users = require('./users.js');
  users.addUser(fromId, 'de');
  return bot.sendMessage(fromId, "Abo aktiviert");
});

bot.on('/stopdaily', msg => {
  let fromId = msg.from.id;
  console.log(" * unregistrating user " + fromId + " User:" + firstname);
  var users = require('./users.js');
  users.removeUser(fromId);
  return bot.sendMessage(fromId, "Abo deaktiviert");
});

bot.on('/help', msg => {
  let fromId = msg.from.id;
  console.log(" => send help to " + fromId + " User:" + firstname);
  return bot.sendMessage(fromId, "/getqoqa für aktuelles Angebot\n/getdaily sendet jeden Tag das Angebot\n/stopdaily deaktiviert das Abo");
});

bot.connect();
