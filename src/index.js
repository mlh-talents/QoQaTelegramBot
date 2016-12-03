'use strict';

console.log("QoQa Telegram Bot Server");
console.log("########################");

console.log("Init cronjob...");
var sender = require("./sendStuffToUsers");
sender.registerCronJob();

const TeleBot = require('telebot');
var fs = require('fs');

// load token from file
var token = fs.readFileSync('telegram_token.secret').toString().replace(/\n$/, '');
console.log('Secret Token: [' + token + "]");
const bot = new TeleBot(token);
const users = require('./users.js');

bot.on('/start', msg => {
  let fromId = msg.from.id;
  let firstName = msg.from.first_name;
  let lastName = msg.from.last_name;
  let username = msg.from.username;
  let reply = msg.message_id;
  console.log(" => welcome user [" + fromId + "] " + firstName + " " + lastName + " (" + username + ")");
  users.addUser(fromId);
  return bot.sendMessage(fromId, `Welcome to the QoQa Bot, ${ firstName }!`, { reply });
});

bot.on('/getqoqa', msg => {
  let fromId = msg.from.id;
  let username = msg.from.username;
  console.log(" => respond /getqoqa to " + fromId + " User: " + username);
  // TODO: send correct offer
  return bot.sendMessage(fromId, "Angebot heute: www.qoqa.ch");
});

bot.on('/subscribeqoqa', msg => {
  let fromId = msg.from.id;
  let username = msg.from.username;
  console.log(" * registrating user " + fromId + " User: " + username);
  users.setUserAbo(fromId, 1);
  return bot.sendMessage(fromId, "Abo aktiviert");
});

bot.on('/unsubscribeqoqa', msg => {
  let fromId = msg.from.id;
  let username = msg.from.username;
  console.log(" * unregistrating user " + fromId + " User: " + username);
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
  let username = msg.from.username;
  console.log(" => send help to " + fromId + " User: " + username);
  var helpmessage = "QoQa Bot (unofficial!)\n" + fs.readFileSync('src/botcommands.txt').toString();
  return bot.sendMessage(fromId, helpmessage);
});

bot.connect();
