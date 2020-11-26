const Discord = require("discord.js");
const bot = new Discord.Client();
const { MessageEmbed } = require("discord.js");

const config = require("../config.json");

const footer = config.Footer;
const embedColor = config.EmbedColor;

module.exports = {
    botjoinlistener: function(member) {
        const guild = member.guild;
        const loopNumber = 0;
        guild.channels.cache.forEach((channel) => {
            loopNumber++;
            if (loopNumber = 1) {
                channel.send(new MessageEmbed()
                .setTitle("**Thank you for using yoBot!**")
                .setDescription("**For bot help, type `^help`.\n  \nFor punishment logging, create a channel called `punishments`.\n \nFor action logging, create a channel called `actions`/\n \nIn future releases, Yochran plans to add the ability to select a custom name.\n\n**Enjoy this bot!**")
                .setFooter(footer)
                .setColor(embedColor));
            } else {
                return;
            }
        })
    }
}