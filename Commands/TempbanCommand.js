const Discord = require("discord.js");
const bot = new Discord.Client();
const { MessageEmbed } = require("discord.js");

const config = require("../config.json");
const utils = require("../Utils/Utils.js");

const footer = config.Footer;
const embedColor = config.EmbedColor;

module.exports = {
    tempban: function(msg, args) {
        if (!msg.member.hasPermission("BAN_MEMBERS")) return;
        if (args.length === 0 || args.length === 1) {
            msg.channel.send(new MessageEmbed()
            .setTitle("**Incorrect Usage!**")
            .setDescription("```css\n^tempban <member> <time> <reason>\n```")
            .setFooter(footer)
            .setColor(embedColor))
            msg.delete(msg);;
        } else {
            const member = msg.mentions.members.first();
            if (member == null) {
                msg.channel.send(new MessageEmbed()
                .setTitle("**Ban**")
                .setDescription("(:x:) User must be a mention.")
                .setFooter(footer)
                .setColor(embedColor));
                msg.delete(msg);
            } else {
                if (args[0].toLowerCase() === "@everyone" || args[0].toLowerCase() === "@here") {
                    msg.channel.send(new MessageEmbed()
                    .setTitle("**Ban**")
                    .setDescription("(:x:) User cannot be those mentions.")
                    .setFooter(footer)
                    .setColor(embedColor));
                    msg.delete(msg);
                } else {
                    let timeArg = args[1];
                    let time = 0;
                    time = parseTime(args[1].toLowerCase());
                    let banLength = getTimeFromArg(time);
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
                    msg.delete(msg);
                    try {
                        member.send(new MessageEmbed()
                        .setTitle("**Ban**")
                        .setDescription(`**You have been banned in ${msg.guild.name} for ${banLength}!**\n**You were banned for:** ${rsFinal}`)
                        .setFooter(footer)
                        .setColor(embedColor));
                    } catch (e) {
                        console.log(`[yoBot]: Couldn't send kick message to the user ${member.user.name}`);
                    }
                    msg.channel.send(new MessageEmbed()
                    .setTitle("**Ban**")
                    .setDescription(`(:white_check_mark:) ${member} has been banned for **${rsFinal}**. (${banLength})`)
                    .setFooter(footer)
                    .setColor(embedColor));
                    msg.guild.members.ban(member, {
                        days: time,
                        reason: rsFinal
                    }).then(() => {
                        const logmsg = `[${msg.guild.name}], ${msg.author.username} has temp-banned ${member.user.username}`
                        utils.loginconsole(logmsg);
                    });
                    const date = new Date();
                    const name = member.user.username;
                    utils.logpunishment(msg, name, "Warn", rsFinal, banLength, date);
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
        return num * 7;
    } else if (time.includes("d")) {
        if (!parseInt(time.split("d")[0])) return undefined
        const num = time.split("d")[0]
        return num;
    } else {
        return 1
    }
}

function getTimeFromArg(time) {
    const days = time;
    let out = ""
    if (days > 0) {
        let a = " days";
        if (days == 1) {
            a = " day";
        }
        out = days + a
    }
    return out
}