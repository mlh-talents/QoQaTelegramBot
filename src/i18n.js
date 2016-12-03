'use strict';
const users = require("./users.js");

const deValues = {
  welcome: "Willkommen beim QoQa Bot, ",
  subscribeqoqa: "Abo aktiviert",
  unsubscribeqoqa: "Abo deaktiviert"
};
const frValues = {
  welcome: "Bienvenue sur QoQa Bot, ",
  subscribeqoqa: "abonnement activé",
  unsubscribeqoqa: "abonnement désactivé"
};


module.exports = {
  getTextForUser: function(userId, key, callback) {
    users.getUsers().find({_id:userId},{}, function(err, users) {
      if (err) {
        console.error("error while getting user " + userId);
      }
      else {
        users.forEach(function(user) {
          if (user.lang == 'fr') {
            callback(frValues[key]);
          }
          else {
            // default de
            callback(deValues[key]);
          }
        });
      }
    })
  }
}
