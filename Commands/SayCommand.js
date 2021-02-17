const Discord = require("discord.js");
const bot = new Discord.Client();
const { MessageEmbed } = require("discord.js");

const config = require("../config.json");
const utils = require("../Utils/Utils.js");

module.exports = {
    say: function(msg, args) {
        if (args.length === 0) {
            utils.sendMessage(msg, "Incorrect Usage!", "```css\n^say <message>\n```");
            msg.delete(msg);
        } else {
            var message = "";
            for (const word in args) {
                message = message + args[word] + " ";
            }
            msg.delete(msg);
            utils.sendMessage(msg, "yoBot Says:", message)
            const logmsg = `[${msg.guild.name}], ${msg.author.username} has said through the bot: "${message}"`
            utils.loginconsole(logmsg);
        }
    }
}