
module.exports = {

  activateKeyboardCommands: function(bot) {
    // Buttons
    bot.on('/showkeyboard', msg => {

      let markup = bot.keyboard([
        [bot.button.text = "/getqoqa"],
        [bot.button.text = '/subscribeqoqa', bot.button.text = '/unsubscribeqoqa'],
        [bot.button.text = '/setgerman', bot.button.text = '/setfrench']
      ], { resize: true });

      return bot.sendMessage(msg.from.id, 'Keyboard shown. To hide use /hidekeyboard', { markup });
    });

    // Hide keyboard
    bot.on('/hidekeyboard', msg => {
      return bot.sendMessage(msg.from.id, 'Keyboard hidden. To show use /showkeyboard', { markup: 'hide' });
    });
  }
}
