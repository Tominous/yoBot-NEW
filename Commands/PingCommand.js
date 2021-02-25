const Discord = require("discord.js");
const bot = new Discord.Client();

const { MessageEmbed } = require("discord.js");

const config = require("../config.json");
const Utils = require("../Utils/Utils");

module.exports = {
    ping: function(msg) {
        msg.channel.send(new MessageEmbed()
        .setTitle("**Ping**")
        .setDescription("Pinging...")
        .setFooter("https://github.com/Yochran", "https://avatars.githubusercontent.com/u/71285258?s=400&u=cc5aee06e85b4ca705b1b989d4b974e5b3346870&v=4")
        .setColor(config.EmbedColor)
        .setAuthor(msg.author.username, msg.author.displayAvatarURL())
        .setTimestamp()).then((sent) => {
            msg.delete(msg);
            const ping = Math.floor(Math.round(sent.createdTimestamp - msg.createdTimestamp));
            setTimeout(() => {
                msg.channel.lastMessage.delete(msg.channel.lastMessage);
                Utils.sendMessage(msg, "Pong!", `**Your ping is:** ${ping}.`);
            }, 100);
        });
    }
}