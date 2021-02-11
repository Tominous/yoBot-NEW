const Discord = require("discord.js");
const bot = new Discord.Client();
const { MessageEmbed } = require("discord.js");

const config = require("../config.json");
const utils = require("../Utils/Utils.js");

const footer = config.Footer;
const embedColor = config.EmbedColor;

module.exports = {
    botjoinlistener: function(guild) {
        let guildChannels = [];

        guild.channels.cache.forEach((channel) => {
            if (channel.type === "text") {
                guildChannels.push(channel.id);
            }
        });

        let sendChannel = guild.channels.cache.get(guildChannels[1]);

        sendChannel.send(new MessageEmbed()
        .setTitle("**Thank you for using yoBot!**")
        .setDescription("**For bot help, type `^help`.**\n  \nFor punishment logging, create a channel called `punishments`.\n \nFor action logging, create a channel called `actions`\n \nIn future releases, Yochran plans to add the ability to select a custom name.\n\n**Enjoy this bot!**")
        .setFooter(footer)
        .setColor(embedColor));
    }
}