# QoQaTelegramBot
Bot to get the current deals from QoQa daily. Botname: @qoqarobot

## Run the bot locally for debugging
1. Install nodejs
2. Get the telegram token for the bot and safe it in telegram_token.secret
2. Run the following command:
```
  node src/index.js
```

## Run the bot as on productive server
1. Get a nice server (e.g. Amazon AWS EC2 instance)
2. Install nodejs
3. Get repository via git or copy file on the server
4. Get the telegram token for the bot and safe it in telegram_token.secret
5. Install pm2 (if not already installed):
```
  sudo npm install pm2 -g
```

Start the app as service:
```
  pm2 start src/index.js
```

Stop the app service:
```
  pm2 stop index.js
```
