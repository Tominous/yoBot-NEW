const Utils = require("../Utils/Utils.js");

module.exports = {
    Execute: function(msg, args) {
        msg.delete(msg);

        if (args.length < 1) {
            Utils.sendMessage(msg, "Incorrect Usage!", "```css\n^say <message>\n```");
            return;
        }
        
        var message = "";
        for (const word in args) {
            message = message + args[word] + " ";
        }

        Utils.sendMessage(msg, "yoBot Says:", message);
        Utils.logMessage(`[${msg.guild.name}], ${msg.author.username} has said through the bot: "${message}"`);
    }
}