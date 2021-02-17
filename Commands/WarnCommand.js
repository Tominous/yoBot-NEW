const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");

const utils = require("../Utils/Utils.js");
const config = require("../config.json");

module.exports = {
    warn: function(msg, args) {
        if (!msg.member.hasPermission("MUTE_MEMBERS")) return;
        if (args.length === 0 | args.length === 1) {
            msg.delete(msg);
            utils.sendMessage(msg, "Incorrect Usage!", "```css\n^warn <member> <reason>\n```");
        } else {
            const member = msg.mentions.members.first();
            if (member == null) {
                msg.delete(msg);
                utils.sendMessage(msg, "Warn", "(:x:) User must be a mention.");
            } else {
                if (args[0].toLowerCase() === "@everyone" || args[0].toLowerCase() === "@here") {
                    msg.delete(msg);
                    utils.sendMessage(msg, "Warn", "(:x:) User cannot be that mention.");
                } else {
                    var reason = "";
                    for (const word in args) {
                        reason = reason + args[word] + " ";
                    }
                    var rsFinal = reason.replace("" + member, "");
                    rsFinal = rsFinal.replace("<@!>", "");
                    msg.delete(msg);
                    utils.sendMessage(msg, "Warn", `(:white_check_mark:) ${member} has been warned for **${rsFinal}**.`)
                    try {
                        member.send(new MessageEmbed()
                        .setTitle("**Warn**")
                        .setDescription(`**You have been warned in ${msg.guild.name}!**\n**You were warned for:** ${rsFinal}`)
                        .setAuthor(msg.author.username, msg.author.displayAvatarURL())
                        .setFooter("https://github.com/Yochran", "https://avatars.githubusercontent.com/u/71285258?s=400&u=cc5aee06e85b4ca705b1b989d4b974e5b3346870&v=4")
                        .setColor(config.EmbedColor)
                        .setTimestamp());
                    } catch (e) {
                        utils.loginconsole(`Couldn't send warn message to the user ${member.user.name}`);
                    }
                    const date = new Date();
                    const name = member.user.username;
                    utils.logpunishment(msg, name, "Warn", rsFinal, "Permanent", date);
                    const logmsg = `[${msg.guild.name}], ${msg.author.username} has warned ${member.user.username}`
                    utils.loginconsole(logmsg);
                }
            }
        }
    }
}