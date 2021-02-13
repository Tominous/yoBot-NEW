const Discord = require("discord.js");
const bot = new Discord.Client();

const { MessageEmbed } = require("discord.js");

const config = require("../config.json");

const footer = config.Footer;
const embedColor = config.EmbedColor;

module.exports = {
    ping: function(msg) {
        msg.channel.send(new MessageEmbed()
        .setTitle("**Ping**")
        .setDescription(`Pinging...`)
        .setFooter(footer)
        .setColor(embedColor)).then((sent) => {
            const ping = Math.floor(Math.round(sent.createdTimestamp - msg.createdTimestamp));
            setTimeout(() => {
                msg.channel.lastMessage.delete(msg.channel.lastMessage);
                msg.channel.send(new MessageEmbed()
                .setTitle("**Pong!**")
                .setDescription(`**Your ping is:** ${ping}.`)
                .setFooter(footer)
                .setColor(embedColor));
            }, 100);
        });
    }
}