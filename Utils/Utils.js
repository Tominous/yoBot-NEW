const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");

const config = require("../config.json");

const footer = config.Footer;
const embedColor = config.EmbedColor;

const fs = require("fs");

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

        const month = new Date().getMonth();
        const day = new Date().getDay();
        const year = new Date().getFullYear();

        const minute = new Date().getMinutes();
        const hour = new Date().getHours();

        const time = month + "/" + day + "/" + year + ", " + hour + ":" + minute;

        try {
            const currentLogs = fs.readFileSync("logs.txt");
            const logs = currentLogs + "(" + time + ") [yoBot]: " + logmsg + "\n"; 

            fs.writeFileSync("logs.txt", logs, (err) => {
                if (err) {
                    console.log("[yoBot]: (Error) Error while writing to logs file. (Make sure name of file is 'logs.txt'.");
                }
            });
        } catch (err) {
            console.log("[yoBot]: (Error) Error reading logs file. Creating one for you now...");
            fs.writeFileSync("logs.txt", "-- Logs: --\n", (err) => {
                if (err) {
                    console.log("[yoBot]: (Error) Error while writing to logs file. (Make sure name of file is 'logs.txt'.");
                }
            });
        }
    }
}