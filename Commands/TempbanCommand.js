const Discord = require("discord.js");
const bot = new Discord.Client();
const { MessageEmbed } = require("discord.js");

const config = require("../config.json");
const utils = require("../Utils/Utils.js");

module.exports = {
    tempban: function(msg, args) {
        if (!msg.member.hasPermission("BAN_MEMBERS")) return;
        if (args.length === 0 || args.length === 1) {
            msg.delete(msg);
            utils.sendMessage(msg, "Incorrect Usage!", "```css\n^tempban <member> <time> <reason>\n```");
        } else {
            const member = msg.mentions.members.first();
            if (member == null) {
                msg.delete(msg);
                utils.sendMessage(msg, "Temp-Ban", "(:x:) User must be a mention.");
            } else {
                if (args[0].toLowerCase() === "@everyone" || args[0].toLowerCase() === "@here") {
                    msg.delete(msg);
                    utils.sendMessage(msg, "Temp-Ban", "(:x:) User cannot be that mention.");
                } else {
                    if (msg.guild.owner.id === member.user.id || member.hasPermission("ADMINISTRATOR")) {
                        msg.delete(msg);
                        utils.sendMessage(msg, "Temp-Ban", "(:x:) You cannot ban this user.");
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
                            .setTitle("**Temp-Ban**")
                            .setAuthor(msg.author.username, msg.author.displayAvatarURL())
                            .setDescription(`**You have been temp-anned in ${msg.guild.name} for ${banLength}!**\n**You were banned for:** ${rsFinal}`)
                            .setFooter("https://github.com/Yochran", "https://avatars.githubusercontent.com/u/71285258?s=460&u=cc5aee06e85b4ca705b1b989d4b974e5b3346870&v=4")
                            .setTimestamp()
                            .setColor(config.EmbedColor));
                        } catch (e) {
                            utils.loginconsole(`Couldn't send kick message to the user ${member.user.name}`);
                        }
                        utils.sendMessage(msg, "Temp-Ban", `(:white_check_mark:) ${member} has been banned for **${rsFinal}**. (${banLength})`);
                        msg.guild.members.ban(member, {
                            days: time,
                            reason: rsFinal
                        }).then(() => {
                            const logmsg = `[${msg.guild.name}], ${msg.author.username} has temp-banned ${member.user.username}`
                            utils.loginconsole(logmsg);
                        });
                        const date = new Date();
                        const name = member.user.username;
                        utils.logpunishment(msg, name, "Temp-Ban", rsFinal, banLength, date);
                    }
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