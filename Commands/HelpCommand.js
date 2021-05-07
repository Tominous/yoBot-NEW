const config = require("../config.json");
const Utils = require("../Utils/Utils.js");

module.exports = {
    Execute: function(msg) {
        msg.delete(msg);

        const message = "**Prefix:** `" + config.Prefix + "`\n```yaml\nCommands:\n- bot\n- userinfo\n- serverinfo\n- say\n- bonk\n- warn\n- tempmute\n- mute\n- kick\n- tempban\n- ban\n- purge\n- avatar\n- poll\n- ping\n- announce\n- setpunishmentschannel\n- giveaway\n- minecraft```"
        
        Utils.sendMessage(msg, "yoBot Help:", message);
    }
}