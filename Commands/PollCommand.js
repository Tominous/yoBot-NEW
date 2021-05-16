const Utils = require("../Utils/Utils");

module.exports = {
    Execute: function(msg, args) {
        if (!msg.member.hasPermission("MANAGE_MESSAGES")) return;

        msg.delete(msg);

        if (args.length < 3) {
            Utils.sendMessage(msg, "Incorrect Usage!", "```yaml\n^poll <choice1> <choice2> <message>\n```");
            return;
        } 
        
        const choice1 = args[0];
        const choice2 = args[1];

        var message = "";
        for (var i = 2; i < args.length; i++) {
            if (message.length === 0) {
                message = args[i];
            } else {
                message = message + " " + args[i];
            }
        }

        Utils.sendMessage(msg, "Poll:", `${message}\n**Vote :white_check_mark: for ${choice1}**\n**Vote :x: for ${choice2}**`);

        setTimeout(() => {
            msg.channel.lastMessage.react("✅");
        }, 500);

        setTimeout(() => {
            msg.channel.lastMessage.react("❌");
        }, 500);
    }
}