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
  getActiveUsers: function() {

  },
  addUser: function(userId, language) {
    var user = {
     id: userId,
     lang: language
    };
    database.insert(user, function(err, newdoc){
      if (err) {
        console.error("error while saving user :(");
      }
      else {
        console.info("user [" + newdoc.id + "] saved into db");
      }
    }) ;
  }
};
module.exports = users;
