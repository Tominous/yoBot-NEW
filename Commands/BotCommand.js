const Discord = require("discord.js");
const bot = new Discord.Client();
const { MessageEmbed } = require("discord.js");

const config = require("../config.json");

const footer = config.Footer;
const embedColor = config.EmbedColor;

module.exports = {
    bot: function(msg) {
        msg.delete(msg);
        msg.channel.send(new MessageEmbed()
        .setTitle("**yoBot**")
        .setDescription("**Bot Author:** Yochran\n**Bot Version:** 2.0\n\n**__Stats for nerds__:**\n\n**Language:** JavaScript (Node.JS/Discord.JS)\n**IDE Coded In:** Visual Studio Code\n\n(Requested By: <@" + msg.author.id + ">)")
        .setFooter(footer)
        .setColor(embedColor));
    }
}