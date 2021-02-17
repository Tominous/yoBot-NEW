const data = require("../data.json");
const fs = require("fs");
const Utils = require("../Utils/Utils");

module.exports = {
    setpunishmentschannel: function(msg) {
        if (!msg.member.hasPermission("MANAGE_MESSAGES")) return;

        msg.delete(msg);
        try {
            const channelID = msg.channel.id;
            const guildID = msg.guild.id;
            const channel = data.Punishments.Channel;
    
            channel[guildID] = channelID;
    
            fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
                if (err) {
                    Utils.loginconsole("Error while writing to data.json file. (setpunishmentschannel, SetPunishmentsChannel.js).");
                }
            });
    
            Utils.sendMessage(msg, "Punishments Channel", "(:white_check_mark:) Punishments channel set to current channel.");
        } catch (err) {
            Utils.sendMessage(msg, "Punishments Channel", "(:x:) Error while setting punishments channel (Internal).");
        }
    }
}