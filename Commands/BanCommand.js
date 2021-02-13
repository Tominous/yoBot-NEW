const Discord = require("discord.js");
const bot = new Discord.Client();
const { MessageEmbed } = require("discord.js");

const config = require("../config.json");
const utils = require("../Utils/Utils.js");

const footer = config.Footer;
const embedColor = config.EmbedColor;

module.exports = {
    ban: function(msg, args) {
        if (!msg.member.hasPermission("BAN_MEMBERS")) return;
        if (args.length === 0 | args.length === 1) {
            msg.channel.send(new MessageEmbed()
            .setTitle("**Incorrect Usage!**")
            .setDescription("```css\n^ban <member> <reason>\n```")
            .setFooter(footer)
            .setColor(embedColor));
            msg.delete(msg);
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
                    if (msg.guild.owner.id === member.user.id || member.hasPermission("ADMINISTRATOR")) {
                        msg.channel.send(new MessageEmbed()
                        .setTitle("**Ban**")
                        .setDescription("(:x:) You cannot ban this user.")
                        .setFooter(footer)
                        .setColor(embedColor));
                        msg.delete(msg);
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
                            .setDescription(`**You have been banned from ${msg.guild.name}!**\n**You were banned for:** ${rsFinal}`)
                            .setFooter(footer)
                            .setColor(embedColor));
                        } catch (e) {
                            utils.loginconsole(`Couldn't send ban message to the user ${member.user.name}`);
                        }
                        msg.delete(msg);
                        msg.channel.send(new MessageEmbed()
                        .setTitle("**Ban**")
                        .setDescription(`(:white_check_mark:) ${member} has been banned for **${rsFinal}**.`)
                        .setFooter(footer)
                        .setColor(embedColor));
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