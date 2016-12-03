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
const users = require('./users.js');

bot.on('/start', msg => {
  let fromId = msg.from.id;
  let firstName = msg.from.first_name;
  let reply = msg.message_id;
  console.log(" => respond to " + fromId);
  users.addUser(fromId);
  return bot.sendMessage(fromId, `Welcome ${ firstName }!`, { reply });
});

bot.on('/getqoqa', msg => {
  let fromId = msg.from.id;
  let firstname = msg.from.first_name;
  console.log(" => respond /getqoqa to " + fromId + " User:" + firstname);
  // TODO: send correct offer
  return bot.sendMessage(fromId, "Angebot heute: www.qoqa.ch");
});

bot.on('/subscribeqoqa', msg => {
  let fromId = msg.from.id;
  let firstname = msg.from.first_name;
  console.log(" * registrating user " + fromId + " User:" + firstname);
  users.setUserAbo(fromId, 1);
  return bot.sendMessage(fromId, "Abo aktiviert");
});

bot.on('/unsubscribeqoqa', msg => {
  let fromId = msg.from.id;
  let firstname = msg.from.first_name;
  console.log(" * unregistrating user " + fromId + " User:" + firstname);
  users.setUserAbo(fromId, 0);
  return bot.sendMessage(fromId, "Abo deaktiviert");
});

bot.on('/setgerman', msg => {
  let fromId = msg.from.id;
  console.log(" => set language to DE for user " + fromId);
  user.setUserLanguage(fromId, 'de');
  return bot.sendMessage(fromId, "Sprache geändert auf Deutsch");
});

bot.on('/setfrench', msg => {
  let fromId = msg.from.id;
  console.log(" => set language to FR for user " + fromId);
  user.setUserLanguage(fromId, 'fr');
  return bot.sendMessage(fromId, "Sprache geändert auf Französisch");
});

bot.on('/help', msg => {
  let fromId = msg.from.id;
  let firstname = msg.from.first_name;
  console.log(" => send help to " + fromId + " User:" + firstname);
  return bot.sendMessage(fromId, "/getqoqa für aktuelles Angebot\n/getdaily sendet jeden Tag das Angebot\n/stopdaily deaktiviert das Abo");
});

bot.connect();
