'use strict';

console.log("QoQa Telegram Bot Server");
console.log("########################\n\n");

const TeleBot = require('telebot');
const fs = require('fs');
const i18n = require('./i18n.js');

// load token from file
var token = fs.readFileSync('telegram_token.secret').toString().replace(/\n$/, '');
console.log('------ Secret Token: [' + token + "]");
const bot = new TeleBot(token);
const users = require('./users.js');

var keyboard = require("./keyboard.js");
keyboard.activateKeyboardCommands(bot);

console.log("------ Start cronjob to regulary notify the users");
var sender = require("./sendStuffToUsers");
sender.registerCronJob(bot);

bot.on('/start', msg => {
  let fromId = msg.from.id;
  let firstName = msg.from.first_name;
  let lastName = msg.from.last_name;
  let username = msg.from.username;
  let reply = msg.message_id;
  console.log(" => welcome user [" + fromId + "] " + firstName + " " + lastName + " (" + username + ")");
  users.addUser(fromId);
  i18n.getTextForUser(fromId, 'welcome', function(value) {
    return bot.sendMessage(fromId, value + `${ firstName }!`, { reply });
  });

});

bot.on('/getqoqa', msg => {
  let fromId = msg.from.id;
  console.log(" => respond /getqoqa to " + fromId);
  var webscraper = require("./web_scraper.js");
  users.getUsers().find({_id:fromId},{}, function(err, users) {
    if (err) {
      console.error("error while getting user " + fromId);
    }
    else {
      users.forEach(function(user) {
        console.log("user: " + user);
        sender.sendToUser(user, bot);
      });
    }
  })
});

bot.on('/subscribeqoqa', msg => {
  let fromId = msg.from.id;
  let username = msg.from.username;
  console.log(" * registrating user " + fromId + " User: " + username);
  users.setUserAbo(fromId, 1);
  i18n.getTextForUser(fromId, 'subscribeqoqa', function(value) {
    return bot.sendMessage(fromId, value);
  });
});

bot.on('/unsubscribeqoqa', msg => {
  let fromId = msg.from.id;
  let username = msg.from.username;
  console.log(" * unregistrating user " + fromId + " User: " + username);
  users.setUserAbo(fromId, 0);
  i18n.getTextForUser(fromId, 'unsubscribeqoqa', function(value) {
    return bot.sendMessage(fromId, value);
  });
});

bot.on('/setgerman', msg => {
  let fromId = msg.from.id;
  console.log(" => set language to DE for user " + fromId);
  users.setUserLanguage(fromId, 'de');
  return bot.sendMessage(fromId, "Sprache geändert auf Deutsch");
});

bot.on('/setfrench', msg => {
  let fromId = msg.from.id;
  console.log(" => set language to FR for user " + fromId);
  users.setUserLanguage(fromId, 'fr');
  return bot.sendMessage(fromId, "Langue changé en francais");
});

bot.on('/help', msg => {
  let fromId = msg.from.id;
  let username = msg.from.username;
  console.log(" => send help to " + fromId + " User: " + username);
  var helpmessage = "QoQa Bot (unofficial!)\n" + fs.readFileSync('src/botcommands.txt').toString();
  return bot.sendMessage(fromId, helpmessage);
});

bot.connect();
console.log("------ Bot is running...")
