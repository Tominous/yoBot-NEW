const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");

const config = require("../config.json");

const footer = config.Footer;
const embedColor = config.EmbedColor;

module.exports = {
    logpunishment: function(msg, member, type, reason, duration, date) {
        let logChannel = msg.guild.channels.cache.find(c => c.name.toLowerCase() === "punishments");
        if (logChannel != null) {
            logChannel.send(new MessageEmbed()
            .setTitle(`**${member}**`)
            .setDescription(`**Type:** ${type}\n**Reason:** ${reason}\n**Duration:** ${duration}\n**Date:** ${date}`)
            .setFooter(footer)
            .setColor(embedColor));
        } else {
            return;
        }
    },

    logaction: function(guild, member, type, date, details) {
        let logChannel = guild.channels.cache.find(c => c.name.toLowerCase() === "actions");
        if (logChannel != null) {
            logChannel.send(new MessageEmbed()
            .setTitle(`**${member}**`)
            .setDescription(`**Type:** ${type}\n**Date:** ${date}\n**Details:** ${details}`)
            .setFooter(footer)
            .setColor(embedColor));
        } else {
            return;
        }
    },

    loginconsole: function(logmsg) {
        console.log("[yoBot]: " + logmsg);
    }
}