const Discord = require("discord.js");
const bot = new Discord.Client();
const { MessageEmbed } = require("discord.js");

const config = require("../config.json");
const utils = require("../Utils/Utils.js");

module.exports = {
    tempmute: function(msg, args) {
        if (!msg.member.hasPermission("MUTE_MEMBERS")) return;
        if (args.length === 0 || args.length === 1) {
            msg.delete(msg);
            utils.sendMessage(msg, "Incorrect Usage!", "```css\n^tempmute <member> <time> <reason>\n```")
        } else {
            const member = msg.mentions.members.first();
            if (member == null) {
                msg.delete(msg);
                utils.sendMessage(msg, "Mute", "(:x:) User must be a mention.");
            } else {
                if (args[0].toLowerCase() === "@everyone" || args[0].toLowerCase() === "@here") {
                    msg.delete(msg);
                    utils.sendMessage(msg, "Mute", "(:x:) User cannot be that mention.");
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
                            msg.delete(msg);
                            utils.sendMessage(msg, "Mute", "(:x:) Muted role couldn't be created. Ensure that I have administrator permissions.");
                        }
                    }
                    msg.delete(msg);
                    utils.sendMessage(msg, "Mute", `(:white_check_mark:) ${member} has been muted for **${rsFinal}**. (${mutedLength})`);
                    try {
                        member.send(new MessageEmbed()
                        .setTitle("**Mute**")
                        .setAuthor(msg.author.username, msg.author.displayAvatarURL())
                        .setDescription(`**You have been muted in ${msg.guild.name} for ${mutedLength}!**\n**You were muted for:** ${rsFinal}`)
                        .setFooter("https://github.com/Yochran", "https://avatars.githubusercontent.com/u/71285258?s=460&u=cc5aee06e85b4ca705b1b989d4b974e5b3346870&v=4")
                        .setColor(config.EmbedColor)
                        .setTimeout());
                    } catch (e) {
                        utils.loginconsole(`Couldn't send temp-mute message to the user ${member.user.name}`);
                    }
                    member.roles.add(muteRole);
                    setTimeout( async() => {
                        member.roles.remove(muteRole);
                    }, time * 1000);
                    const date = new Date();
                    const name = member.user.username;
                    utils.logpunishment(msg, name, "Temp-Mute", rsFinal, mutedLength, date);
                    const logmsg = `[${msg.guild.name}], ${msg.author.username} has temp-muted ${member.user.username}`
                    utils.loginconsole(logmsg);
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