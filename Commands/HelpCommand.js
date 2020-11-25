const Discord = require("discord.js");
const bot = new Discord.Client();
const { MessageEmbed } = require("discord.js");

const config = require("../config.json");

const footer = config.Footer;
const embedColor = config.EmbedColor;

module.exports = {
    help: function(msg) {
        msg.delete(msg);
        msg.channel.send(new MessageEmbed().setTitle("**yoBot Help:**").setDescription("```yaml\nCommands:\n- bot\n- userinfo\n- serverinfo\n- say\n- bonk\n```\n(Requested By: <@" + msg.author.id + ">)").setFooter(footer).setColor(embedColor));
    }
}