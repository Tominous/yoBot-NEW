const Discord = require("discord.js");
const bot = new Discord.Client();
const { MessageEmbed } = require("discord.js");

const config = require("../config.json");

const footer = config.Footer;
const embedColor = config.EmbedColor;

module.exports = {
    bot: function(msg) {
        msg.delete(msg);
        msg.channel.send(new MessageEmbed().setTitle("**yoBot**").setDescription("**Bot Author:** Yochran\n**Bot Version:** 2.0\n \n(Requested By: <@" + msg.author.id + ">)").setFooter(footer).setColor(embedColor));
    }
}