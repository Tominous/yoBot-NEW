const Discord = require("discord.js");
const bot = new Discord.Client();
const { MessageEmbed } = require("discord.js");

const config = require("../config.json");
const utils = require("../Utils/Utils.js");

module.exports = {
    unmute: function(msg, args) {
        if (!msg.member.hasPermission("MUTE_MEMBERS")) return;
        if (args.length != 1) {
            msg.delete(msg);
            utils.sendMessage(msg, "Incorrect Usage!", "```css\n^unmute <member>\n```");
        } else {
            const member = msg.mentions.members.first();
            if (member == null) {
                msg.delete(msg);
                utils.sendMessage(msg, "Unmute", "(:x:) User must be a mention.");
            } else {
                if (args[0].toLowerCase() === "@everyone" || args[0].toLowerCase() === "@here") {
                    utils.sendMessage(msg, "Unmute", "(:x) User cannot be that mention.");
                    msg.delete(msg);
                } else {
                    let muteRole = msg.guild.roles.cache.find(r => r.name.toLowerCase() === "muted");
                    if (!member.roles.cache.find(r => r.name.toLowerCase() === "muted")) {
                        msg.delete(msg);
                        utils.sendMessage(msg, "Unmute", "(:x:) User is not muted!");
                        return;
                    } else {
                        msg.delete(msg);
                        member.roles.remove(muteRole);
                        const name = member.user.username;
                        const date = new Date();
                        utils.logpunishment(msg, name, "Unmute", "N/A", "N/A", date);
                        utils.sendMessage(msg, "Unmute", `(:white_check_mark:) ${member} has been unmuted.`);
                        try {
                            member.send(new MessageEmbed()
                            .setTitle("**Unmute**")
                            .setDescription(`**You have been unmuted in ${msg.guild.name}!**`)
                            .setAuthor(msg.author.username, msg.author.displayAvatarURL())
                            .setFooter("https://github.com/Yochran", "https://avatars.githubusercontent.com/u/71285258?s=460&u=cc5aee06e85b4ca705b1b989d4b974e5b3346870&v=4")
                            .setColor(config.EmbedColor)
                            .setTimestamp());
                        } catch (e) {
                            utils.loginconsole(`Couldn't send unmute message to the user ${member.user.name}`);
                        }
                        const logmsg = `[${msg.guild.name}], ${msg.author.username} has unmuted ${member.user.username}`
                        utils.loginconsole(logmsg);
                    }
                }
            }
        }
    }
}