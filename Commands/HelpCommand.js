const Discord = require("discord.js");
const bot = new Discord.Client();

const config = require("../config.json");
const utils = require("../Utils/Utils.js");

module.exports = {
    help: function(msg) {
        const message = "**Prefix:** `" + config.Prefix + "`\n```yaml\nCommands:\n- bot\n- userinfo\n- serverinfo\n- say\n- bonk\n- warn\n- tempmute\n- mute\n- kick\n- tempban\n- ban\n- purge\n- avatar\n- poll\n- ping\n- announce\n- setactionschannel\n- setpunishmentschannel```"
        msg.delete(msg);
        utils.sendMessage(msg, "yoBot Help:", message);
    }
}