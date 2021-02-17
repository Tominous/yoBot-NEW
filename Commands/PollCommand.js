const Discord = require("discord.js");
const bot = new Discord.Client();

const config = require("../config.json");

const { MessageEmbed } = require("discord.js");
const Utils = require("../Utils/Utils");

module.exports = {
    poll: function(msg, args) {
        let pollChannel = msg.guild.channels.cache.find(c => c.name.toLowerCase() === "polls");
        if (msg.channel.id === pollChannel.id) {
            if (args.length < 3) {
                msg.delete(msg);
                Utils.sendMessage(msg, "Incorrect Usage!", "```css\n^poll <choice1> <choice2> <message>```");
            } else {
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

                msg.delete(msg);
                Utils.sendMessage(msg, "Poll:", `${message}\n**Vote :white_check_mark: for ${choice1}**\n**Vote :x: for ${choice2}**`);

                setTimeout(() => {
                    msg.channel.lastMessage.react("✅");
                }, 500);

                setTimeout(() => {
                    msg.channel.lastMessage.react("❌");
                }, 500);
            }
        } 
    }
}