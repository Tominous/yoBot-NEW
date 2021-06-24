const { MessageEmbed } = require("discord.js");

const config = require("../config.json");
const data = require("../data.json");

const fs = require("fs");

module.exports = {
    getTime: function() {
        const month = new Date().getMonth();
        const day = new Date().getDay();
        const year = new Date().getFullYear();

        const minute = new Date().getMinutes();
        const hour = new Date().getHours();

        return month + "/" + day + "/" + year + ", " + hour + ":" + minute;
    },

    getDate: function() {
        const fullDate = new Date();

        return `${fullDate.getMonth()}/${fullDate.getDay()}/${fullDate.getFullYear()}`;
    },

    logPunishment: function(msg, member, type, reason, duration, date) {
        date = this.getTime();

        var logChannel;
        if (!data.Punishments.Channel[msg.guild.id]) {
            logChannel = msg.guild.channels.cache.find(c => c.name.toLowerCase() === "punishments");
        } else {
            logChannel = msg.guild.channels.cache.find(c => c.id === data.Punishments.Channel[msg.guild.id]);
        }

        const embed = new MessageEmbed()
        .setTitle(`**${type}**`)
        .setAuthor(msg.author.username, msg.author.displayAvatarURL())
        .addFields(
            {name: "Member", value: `__${member.user.username}__`, inline: true},
            {name: "Member ID:", value: member.id, inline: true},
            {name: "Reason", value: reason, inline: true},
            {name: "Duration", value: duration, inline: true},
            {name: "Date", value: date, inline: true}
        )
        .setFooter("https://github.com/Yochran", "https://avatars.githubusercontent.com/u/71285258?v=4")
        .setColor(config.EmbedColor)
        .setTimestamp();

        if (logChannel) logChannel.send(embed);
    },

    logMessage: function(logmsg) {
        console.log("[yoBot]: " + logmsg);

        try {
            const currentLogs = fs.readFileSync("logs.txt");
            const logs = currentLogs + "(" + this.getTime() + ") [yoBot]: " + logmsg + "\n"; 

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
        .setFooter("https://github.com/Yochran", "https://avatars.githubusercontent.com/u/71285258?v=4")
        .setColor(config.EmbedColor)
        .setAuthor(msg.author.username, msg.author.displayAvatarURL())
        .setTimestamp();

        msg.channel.send(embed);
    },

    parseTime: function(time) {
        time.toLowerCase();

        if (time.includes("w")) {
            if (!parseInt(time.split("w")[0])) return undefined;

            const num = time.split("w")[0];
            
            return num * (86400 * 7);
        } else if (time.includes("d")) {
            if (!parseInt(time.split("d")[0])) return undefined;

            const num = time.split("d")[0];
            
            return num * 86400;
        } else if (time.includes("h")) {
            if (!parseInt(time.split("h")[0])) return undefined;
            
            const num = time.split("h")[0];
            
            return num * 3600;
        } else if (time.includes("m")) {
            if (!parseInt(time.split("m")[0])) return undefined;
            
            const num = time.split("m")[0];
            
            return num * 60;
        } else if (time.includes("s")) {
            if (!parseInt(time.split("s")[0])) return undefined;
            
            const num = time.split("s")[0];
            
            return num;
        } else {
            return 3600;
        }
    },

    getTimeStr: function(ms) {
        const days = Math.floor(ms / (24 * 60 * 60 * 1000));
        const daysms = ms % (24 * 60 * 60 * 1000);
        const hours = Math.floor((daysms) / (60*60*1000));
        const hoursms = ms % (60 * 60 * 1000);
        const minutes = Math.floor((hoursms) / (60 * 1000));
        const minutesms = ms % (60 * 1000);
        const seconds = Math.floor((minutesms) / (1000));

        let time = "";

        if (days > 0) {
            var str = " days";
            if (days == 1) {
                str = " day";
            }
            time = days + str;
        }

        if (hours > 0) {
            var str = " hours";
            if (hours == 1) {
                str = " hour";
            }
            if (time == "") {
                time = hours + str;
            } else {
                time = `${time} ${hours}${str}`;
            }
        }

        if (minutes > 0) {
            var str = " minutes";
            if (minutes == 1) {
                str = " minute";
            }
            if (time == "") {
                time = minutes + str;
            } else {
                time = `${time} ${minutes}${str}`;
            }
        }

        if (seconds > 0) {
            var str = " seconds";
            if (seconds == 1) {
                str = " second";
            }
            if (time == "") {
                time = seconds + str;
            } else {
                time = `${time} ${seconds}${str}`;
            }
        }

        return time;
    }
}