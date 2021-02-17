const data = require("../data.json");
const fs = require("fs");
const Utils = require("../Utils/Utils");

module.exports = {
    setactionschannel: function(msg) {
        if (!msg.member.hasPermission("MANAGE_MESSAGES")) return;

        msg.delete(msg);
        try {
            const channelID = msg.channel.id;
            const guildID = msg.guild.id;
            const channel = data.Actions.Channel;
    
            channel[guildID] = channelID;
    
            fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
                if (err) {
                    Utils.loginconsole("Error while writing to data.json file. (setactionschannel, SetActionsChannel.js).");
                }
            });
    
            Utils.sendMessage(msg, "Actions Channel", "(:white_check_mark:) Actions channel set to current channel.");
        } catch (err) {
            Utils.sendMessage(msg, "Actions Channel", "(:x:) Error while setting actions channel (Internal).");
        }
    }
}