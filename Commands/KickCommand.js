const Discord = require("discord.js");
const bot = new Discord.Client();
const { MessageEmbed } = require("discord.js");

const config = require("../config.json");
const utils = require("../Utils/Utils.js");

module.exports = {
    kick: function(msg, args) {
        if (!msg.member.hasPermission("KICK_MEMBERS")) return;
        if (args.length === 0 | args.length === 1) {
            msg.delete(msg);
            utils.sendMessage(msg, "Incorrect Usage!", "```css\n^kick <member> <reason>\n```");
        } else {
            const member = msg.mentions.members.first();
            if (member == null) {
                msg.delete(msg);
                utils.sendMessage(msg, "Kick", "(:x:) User must be a mention.");
            } else {
                if (args[0].toLowerCase() === "@everyone" || args[0].toLowerCase() === "@here") {
                    msg.delete(msg);
                    utils.sendMessage(msg, "Kick", "(:x:) User cannot be that mention.");
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
                        .setTitle("**Kick**")
                        .setAuthor(msg.author.username, msg.author.displayAvatarURL())
                        .setDescription(`**You have been kicked from ${msg.guild.name}!**\n**You were kicked for:** ${rsFinal}`)
                        .setFooter("https://github.com/Yochran", "https://avatars.githubusercontent.com/u/71285258?s=460&u=cc5aee06e85b4ca705b1b989d4b974e5b3346870&v=4")
                        .setColor(config.EmbedColor)
                        .setTimestamp());
                    } catch (e) {
                        utils.loginconsole(`Couldn't send kick message to the user ${member.user.name}`);
                    }
                    msg.delete(msg);
                    utils.sendMessage(msg, "Kick", `(:white_check_mark:) ${member} has been kicked for **${rsFinal}**.`)
                    member.kick(rsFinal).then(() => {
                        const logmsg = `[${msg.guild.name}], ${msg.author.username} has kicked ${member.user.username}`
                        utils.loginconsole(logmsg);
                    });
                    const date = new Date();
                    const name = member.user.username;
                    utils.logpunishment(msg, name, "Kick", rsFinal, "N/A", date);
                }
            }
        }
    }
}