# yoBot-NEW (yoBot v2.0)
A new and improved module based version of yoBot, containing more than just fun commands, such as punishments, etc.

https://fops.cc/yobot

# About this bot:
yoBot v2.0 is coded entirely in JavaScript, using node.js and discord.js. I originally planned to code this in Java w/ JDA, but I couldn't register my event listeners in JDA, and I searched up essentially everything on how to fix it, nothing did, so I just decided to use JavaScript.

The goal of this bot is to make it so that if you use this bot in your server, you wont need ANY other bot. This is why it will contain fun commands as well as punishments & staff utilities, a music feature, toggleable level system, and more.

### Commands:
  - ^bonk <member>
  - ^say <message>
  - ^userinfo [user]
  - ^serverinfo
  - ^bot
Punishments:
  - ^warn <member> <reason>
  - ^tempmute <member> <time> <reason>
  - ^mute <member> <reason>
  - ^kick <member> <reason>
  - ^tempban <member> <time> <reason>
  - ^ban <member> <reason>
  - ^forceadmin (Only I can use, purely for testing purposes, don't worry. Go to Commands -> ForceAdminCommand.js for proof.)
  - ^avatar [member]
  - ^purge <amount>
  - ^ping
  - ^poll
  
### Listeners:
  - Action listeners, such as join/leaves, role/channel create/deletes, and message deletes.
  - Join listener for the bot in specific that displays a helpful message in one of the channels in the server.
  
### What I'm working on:
I'm currently finishing up on the punishments, all I have to do is add history and I'll be done. For history, I plan on using a JSON file to store data instead of a database, just like in vNitrogen I used a YAML file to store grants and punishments, rather than a database.

After I finish punishments, my friend wanted me to add a music feature, so that's what I'll be doing.
