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
  addUser: function(userId, language) {
    var user = {
     _id: userId,
     lang: language
    };
    database.insert(user, function(err, newdoc){
      if (err) {
        console.error("error while saving user :(");
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
