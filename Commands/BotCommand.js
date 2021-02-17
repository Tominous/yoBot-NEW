const Discord = require("discord.js");
const bot = new Discord.Client();

const config = require("../config.json");
const utils = require("../Utils/Utils.js");

module.exports = {
    bot: function(msg) {
        msg.delete(msg);
        utils.sendMessage(msg, "yoBot", 
        "**Bot Author:** Yochran\n**Bot Version:** 2.0\n\n**__Stats for nerds__:**\n\n**Language:** JavaScript (Node.JS/Discord.JS)\n**IDE Coded In:** Visual Studio Code");
    }
}