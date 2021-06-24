const Discord = require("discord.js");
const bot = new Discord.Client();

const { MessageEmbed } = require("discord.js");

const config = require("../config.json");
const Utils = require("../Utils/Utils");

module.exports = {
    Execute: function(msg) {
        msg.delete(msg);

        const embed = new MessageEmbed()
        .setTitle("**Ping**")
        .setDescription("Pinging...")
        .setFooter("https://github.com/Yochran", "https://avatars.githubusercontent.com/u/71285258?v=4")
        .setColor(config.EmbedColor)
        .setAuthor(msg.author.username, msg.author.displayAvatarURL())
        .setTimestamp();

        msg.channel.send(embed).then((sent) => {
            const ping = Math.floor(Math.round(sent.createdTimestamp - msg.createdTimestamp));
            setTimeout(() => {
                msg.channel.lastMessage.delete(msg.channel.lastMessage);
                Utils.sendMessage(msg, "Pong!", `**Your ping is:** ${ping}.`);
            }, 100);
        });
    }
}