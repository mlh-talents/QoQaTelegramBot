'use strict';

const TeleBot = require('telebot');
var telegramTokenReader = require('fs');

// load token from file
var token = telegramTokenReader.readFileSync('telegram_token.secret').toString().replace(/\n$/, '');
console.log('token: ' + token);
const bot = new TeleBot(token);

bot.on('text', msg => {
  let fromId = msg.from.id;
  let firstName = msg.from.first_name;
  let reply = msg.message_id;
  return bot.sendMessage(fromId, `Welcome, ${ firstName }!`, { reply });
});

bot.connect();
