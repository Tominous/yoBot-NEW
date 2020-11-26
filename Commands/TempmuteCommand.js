const Discord = require("discord.js");
const bot = new Discord.Client();
const { MessageEmbed } = require("discord.js");

const config = require("../config.json");
const utils = require("../Utils/Utils.js");

const footer = config.Footer;
const embedColor = config.EmbedColor;

module.exports = {
    tempmute: function(msg, args) {
        if (!msg.member.hasPermission("MUTE_MEMBERS")) return;
        if (args.length === 0 || args.length === 1) {
            msg.channel.send(new MessageEmbed()
            .setTitle("**Incorrect Usage!**")
            .setDescription("```css\n^tempmute <member> <time> <reason>\n```")
            .setFooter(footer)
            .setColor(embedColor))
            msg.delete(msg);;
        } else {
            const member = msg.mentions.members.first();
            if (member == null) {
                msg.channel.send(new MessageEmbed()
                .setTitle("**Incorrect Usage!**")
                .setDescription("```css\n^tempmute <member> <time> <reason>\n```")
                .setFooter(footer)
                .setColor(embedColor));
                msg.delete(msg);
            } else {
                if (args[0] === "@everyone" || args[0] === "@here") {
                    msg.channel.send(new MessageEmbed()
                    .setTitle("**Incorrect Usage!**")
                    .setDescription("```css\n^tempmute <member> <time> <reason>\n```")
                    .setFooter(footer)
                    .setColor(embedColor)); 
                    msg.delete(msg);
                } else {
                    let timeArg = args[1];
                    let time = 0;
                    time = parseTime(args[1].toLowerCase());
                    let mutedLength = getTimeFromMS(time * 1000);
                    var reason = "";
                    for (const word in args) {
                        reason = reason + args[word] + " ";
                    }
                    var rsFinal = reason.replace("" + member, "");
                    rsFinal = rsFinal.replace("<", "");
                    rsFinal = rsFinal.replace("@", "");
                    rsFinal = rsFinal.replace("!", "");
                    rsFinal = rsFinal.replace(">", "");
                    rsFinal = rsFinal.replace("" + timeArg, "");
                    let muteRole = msg.guild.roles.cache.find(r => r.name.toLowerCase() === "muted");
                    if (!muteRole) {
                        try {
                            muteRole = msg.guild.roles.create({
                                data: {
                                    name: "muted"
                                }
                            })
                            let overrideRole = msg.guild.roles.cache.find(r => r.name.toLowerCase() === "muted");
                            msg.guild.channels.cache.forEach(async channel => {
                                await channel.updateOverwrite(overrideRole, {
                                    SEND_MESSAGES: false,
                                    SPEAK: false,
                                    ADD_REACTIONS: false
                                })
                            })
                        } catch (e) {
                            msg.channel.send(new MessageEmbed()
                            .setTitle("**Mute**")
                            .setDescription("(:x:) Muted role couldn't be created. Ensure that I have administrator permissions.")
                            .setFooter(footer)
                            .setColor(embedColor));
                            msg.delete(msg);
                            return;
                        }
                    }
                    msg.delete(msg);
                    msg.channel.send(new MessageEmbed()
                    .setTitle("**Mute**")
                    .setDescription(`(:white_check_mark:) ${member} has been muted for **${rsFinal}**. (${mutedLength})`)
                    .setFooter(footer)
                    .setColor(embedColor));
                    member.send(new MessageEmbed()
                    .setTitle("**Mute**")
                    .setDescription(`**You have been muted in ${msg.guild.name} for ${mutedLength}!**\n**You were muted for:** ${rsFinal}`)
                    .setFooter(footer)
                    .setColor(embedColor));
                    member.roles.add(muteRole);
                    setTimeout( async() => {
                        member.roles.remove(muteRole);
                    }, time * 1000);
                    const date = new Date();
                    const name = member.user.username;
                    utils.logpunishment(msg, name, "Mute", rsFinal, mutedLength, date);
                }
            }
        }
    }
}

function parseTime(time) {
    time.toLowerCase()
    if (time.includes("w")) {
        if (!parseInt(time.split("w")[0])) return undefined
        const num = time.split("w")[0]
        return num * (86400 * 7)
    } else if (time.includes("d")) {
        if (!parseInt(time.split("d")[0])) return undefined
        const num = time.split("d")[0]
        return num * 86400
    } else if (time.includes("h")) {
        if (!parseInt(time.split("h")[0])) return undefined
        const num = time.split("h")[0]
        return num * 3600
    } else if (time.includes("m")) {
        if (!parseInt(time.split("m")[0])) return undefined
        const num = time.split("m")[0]
        return num * 60
    } else if (time.includes("s")) {
        if (!parseInt(time.split("s")[0])) return undefined
        const num = time.split("s")[0]
        return num
    } else {
        return 3600
    }
}

function getTimeFromMS(ms) {
    const days = Math.floor(ms / (24 * 60 * 60 * 1000))
    const daysms = ms % (24 * 60 * 60 * 1000)
    const hours = Math.floor((daysms) / (60*60*1000))
    const hoursms = ms % (60 * 60 * 1000)
    const minutes = Math.floor((hoursms) / (60 * 1000))
    const minutesms = ms % (60 * 1000)
    const seconds = Math.floor((minutesms) / (1000))
    let time = ""
    if (days > 0) {
        let a = " days"
        if (days == 1) {
            a = " day"
        }
        time = days + a
    }
    if (hours > 0) {
        let a = " hours"
        if (hours == 1) {
            a = " hour"
        }
        if (time == "") {
            time = hours + a
        } else {
            time = `${time} ${hours}${a}`
        }
    }
    if (minutes > 0) {
        let a = " minutes"
        if (minutes == 1) {
            a = " minute"
        }
        if (time == "") {
            time = minutes + a
        } else {
            time = `${time} ${minutes}${a}`
        }
    }
    if (seconds > 0) {
        let a = " seconds"
        if (seconds == 1) {
            a = " second"
        }
        if (time == "") {
            time = seconds + a
        } else {
            time = `${time} ${seconds}${a}`
        }
    }
    return time
}