const Discord = require("discord.js");
const bot = new Discord.Client();
const { MessageEmbed } = require("discord.js");

const config = require("../config.json");
const utils = require("../Utils/Utils.js");

module.exports = {
    ban: function(msg, args) {
        if (!msg.member.hasPermission("BAN_MEMBERS")) return;
        if (args.length === 0 | args.length === 1) {
            msg.delete(msg);
            utils.sendMessage(msg, "Incorrect Usage!", "```css\n^ban <member> <reason>\n```");
        } else {
            const member = msg.mentions.members.first();
            if (member == null) {
                msg.delete(msg);
                utils.sendMessage(msg, "Ban", "(:x:) User must be a mention.");
            } else {
                if (args[0].toLowerCase() === "@everyone" || args[0].toLowerCase() === "@here") {
                    msg.delete(msg);
                    utils.sendMessage(msg, "Ban", "(:x:) User cannot be that mention.");
                } else {
                    if (msg.guild.owner.id === member.user.id || member.hasPermission("ADMINISTRATOR")) {
                        msg.delete(msg);
                        utils.sendMessage(msg, "Ban", "(:x:) You cannot ban this user.");
                    } else {
                        var reason = "";
                        for (const word in args) {
                            reason = reason + args[word] + " ";
                        }
                        var rsFinal = reason.replace("" + member, "");
                        rsFinal = rsFinal.replace("<", "");
                        rsFinal = rsFinal.replace("@", "");
                        rsFinal = rsFinal.replace("!", "");
                        rsFinal = rsFinal.replace(">", "");
                        try {
                            member.send(new MessageEmbed()
                            .setTitle("**Ban**")
                            .setAuthor(msg.author.username, msg.author.displayAvatarURL())
                            .setDescription(`**You have been banned from ${msg.guild.name}!**\n**You were banned for:** ${rsFinal}`)
                            .setFooter("https://github.com/Yochran", "https://avatars.githubusercontent.com/u/71285258?s=460&u=cc5aee06e85b4ca705b1b989d4b974e5b3346870&v=4")
                            .setColor(config.EmbedColor)
                            .setTimestamp());
                        } catch (e) {
                            utils.loginconsole(`Couldn't send ban message to the user ${member.user.name}`);
                        }
                        msg.delete(msg);
                        utils.sendMessage(msg, "Ban", `(:white_check_mark:) ${member} has been banned for **${rsFinal}**.`)
                        msg.guild.members.ban(member, {
                            days: null,
                            reason: rsFinal
                        }).then(() => {
                            const logmsg = `[${msg.guild.name}], ${msg.author.username} has perm-banned ${msg.author.username}`
                            utils.loginconsole(logmsg);
                        })
                        const date = new Date();
                        const name = member.user.username;
                        utils.logpunishment(msg, name, "Ban", rsFinal, "Permanent", date);
                    }
                }
            }
        }
    }
}