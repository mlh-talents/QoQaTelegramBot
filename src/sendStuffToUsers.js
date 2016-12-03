'use strict';

var sender = {
  registerCronJob: function(bot) {
    var CronJob = require('cron').CronJob;
    // for testing: all minute
    new CronJob('*/1 * * * *', function() {
    //new CronJob('0 1 0 * * *', function() {
      console.log("time to send the newest stuff to the users!");
      sender.sendMessagesToUsers(bot);
    }, null, true, 'America/Los_Angeles');
  },
  sendMessagesToUsers: function(bot) {
    var users = require("./users");
    users.getUsers().find({abo:1},{},function(err, docs) {
      docs.forEach(function(user) {
        sender.sendToUser(user, bot);
      })
    });
  },
  sendToUser: function(user, bot) {
    console.log("sending to user " + user._id);
    var webscraper = require("./web_scraper.js");
    webscraper.scrapeThisShit(user.lang, function(data) {
      console.log("send image");
      bot.sendPhoto(user._id, data.image, {caption: data.title});
    });
  }
};
module.exports = sender;
