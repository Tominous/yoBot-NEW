const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");

const config = require("../config.json");
const data = require("../data.json");

const fs = require("fs");

module.exports = {
    logpunishment: function(msg, member, type, reason, duration, date) {
        const month = new Date().getMonth();
        const day = new Date().getDay();
        const year = new Date().getFullYear();

        const minute = new Date().getMinutes();
        const hour = new Date().getHours();

        const time = month + "/" + day + "/" + year + ", " + hour + ":" + minute;
        date = time;

        let logChannel;

        if (!data.Punishments.Channel[msg.guild.id]) {
            logChannel = msg.guild.channels.cache.find(c => c.name.toLowerCase() === "punishments");
        } else {
            logChannel = msg.guild.channels.cache.find(c => c.id === data.Punishments.Channel[msg.guild.id]);
        }

        const embed = new MessageEmbed()
        .setTitle(`**${type}**`)
        .setAuthor(member)
        .addFields(
            {name: "Executor", value: msg.author.username, inline: true},
            {name: "Reason", value: reason, inline: true},
            {name: "Duration", value: duration, inline: true},
            {name: "Date", value: date, inline: true}
        )
        .setFooter("https://github.com/Yochran", "https://avatars.githubusercontent.com/u/71285258?s=460&u=cc5aee06e85b4ca705b1b989d4b974e5b3346870&v=4")
        .setColor(config.EmbedColor)
        .setTimestamp();
        if (logChannel) {
            logChannel.send(embed);
        }
    },

    logaction: function(guild, member, type, date, details) {
        let logChannel;

        if (!data.Actions.Channel[guild.id]) {
            logChannel = guild.channels.cache.find(c => c.name.toLowerCase() === "punishments");
        } else {
            logChannel = guild.channels.cache.find(c => c.id === data.Actions.Channel[guild.id]);
        }

        const embed = new MessageEmbed()
        .setTitle(`**${type}**`)
        .setAuthor(member)
        .addFields(
            {name: "Date:", value: date, inline: true},
            {name: "Details:", value: details, inline: true}
        )
        .setFooter("https://github.com/Yochran", "https://avatars.githubusercontent.com/u/71285258?s=460&u=cc5aee06e85b4ca705b1b989d4b974e5b3346870&v=4")
        .setColor(config.EmbedColor)
        .setTimestamp();

        if (logChannel) {
            logChannel.send(embed);
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
    },

    sendMessage: function(msg, title, description) {
        const embed = new MessageEmbed()
        .setTitle(`**${title}**`)
        .setDescription(description)
        .setFooter("https://github.com/Yochran", "https://avatars.githubusercontent.com/u/71285258?s=400&u=cc5aee06e85b4ca705b1b989d4b974e5b3346870&v=4")
        .setColor(config.EmbedColor)
        .setAuthor(msg.author.username, msg.author.displayAvatarURL())
        .setTimestamp();

        msg.channel.send(embed);
    }
}