const Discord = require("discord.js");
const bot = new Discord.Client();

const config = require("../config.json");

const { MessageEmbed } = require("discord.js");
const Utils = require("../Utils/Utils");

module.exports = {
    announce: function(msg, args) {
        if (!msg.member.hasPermission("MANAGE_MESSAGES")) return;
        if (args.length < 1) {
            msg.delete(msg);
            Utils.sendMessage(msg, "Incorrect Usage!", "```css\n^announce <message>```")
        } else {
            msg.delete(msg);
            
            let message = "";
            for (const word in args) {
                message = message + args[word] + " ";
            }

            const embed = new MessageEmbed()
            .setTitle("**Announcement**")
            .setAuthor(msg.author.username, msg.author.displayAvatarURL())
            .setDescription(message)
            .setFooter("https://github.com/Yochran", "https://avatars.githubusercontent.com/u/71285258?s=460&u=cc5aee06e85b4ca705b1b989d4b974e5b3346870&v=4")
            .setColor(config.EmbedColor)
            .setTimestamp();

            msg.channel.send(embed);
        }
    }
}