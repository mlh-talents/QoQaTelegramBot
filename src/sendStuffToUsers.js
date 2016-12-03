'use strict';

var sender = {
  registerCronJob: function() {
    var self = this;
    var CronJob = require('cron').CronJob;
    // for testing: all minute
    new CronJob('0 1 * * * *', function() {
    //new CronJob('0 1 0 * * *', function() {
      console.log("time to send the newest stuff to the users!");
      self.sendMessagesToUsers();
    }, null, true, 'America/Los_Angeles');
  },
  sendMessagesToUsers: function() {
    var users = require("./users");
    users.getUsers().find({},{},function(err, docs) {
      docs.forEach(function(user) {
        console.log("sending to user " + user._id);
        var webscraper = require("./web_scraper.js");
        webscraper.scrapeThisShit("de");
      })
    });
  }
};
module.exports = sender;
