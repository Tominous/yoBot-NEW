const Discord = require("discord.js");
const bot = new Discord.Client();

const { MessageEmbed } = require("discord.js");

const config = require("../config.json");
const Utils = require("../Utils/Utils");

module.exports = {
    ping: function(msg) {
        msg.delete(msg);
        Utils.sendMessage(msg, "Ping", "Pinging...").then((sent) => {
            const ping = Math.floor(Math.round(sent.createdTimestamp - msg.createdTimestamp));
            setTimeout(() => {
                msg.channel.lastMessage.delete(msg.channel.lastMessage);
                Utils.sendMessage(msg, "Pong!", `**Your ping is:** ${ping}.`);
            }, 100);
        });
    }
}