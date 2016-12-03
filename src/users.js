'use strict';

var Datastore = require("nedb");
var database = new Datastore({filename: 'users.db'});
database.loadDatabase(function(err) {
  if (err) {
    console.error("Cannot load user database!!!");
  }
  else {
    console.log("User database loaded successfull");
  }
});

var users =  {
  getUsers: function() {
    return database;
  },

  setUserLanguage(userId, language) {
    console.info("Update User language");
    database.update({_id:userId},{$set:{lang:language}},{},function(err,numReplaced) {
      if (err) {
        console.error("Failed to set new language of [" + userId + "]");
      }
      else {
        console.info("Successfully set new language of [" + userId + "]");
      }
    });
  },

  setUserAbo(userId, abo) {
    console.info("Update User Abo to " + abo);
    database.update({_id:userId},{$set:{abo:abo}},{}, function(err,numReplaced) {
      if (err) {
        console.error("Failed to set new abo of [" + userId + "]");
      }
      else {
        console.info("Successfully set new abo of [" + userId + "]");
      }
    });
  },

  addUser: function(userId) {
    var user = {
     _id: userId,
     lang: 'de', // default lang de
     abo: 0
    };
    database.insert(user, function(err, newdoc){
      if (err) {
        console.error("error while creating user " + userId + ", maybe it already exists...");
      }
      else {
        console.info("user [" + userId + "] saved into db");
      }
    });
  },

  removeUser: function(userId){
    database.remove({_id:userId},{},function(err,numRemoved){
      if (err) {
        console.error("error while removing user " + userId);
      }
      else {
        console.info("user [" + userId + "] removed from database");
      }
    })
  }
};
module.exports = users;
