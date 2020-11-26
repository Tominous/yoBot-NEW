const Discord = require("discord.js");
const bot = new Discord.Client();
const { MessageEmbed } = require("discord.js");

const utils = require("../Utils/Utils.js");
const config = require("../config.json");

const footer = config.Footer;
const embedColor = config.EmbedColor;

module.exports = {
    warn: function(msg, args) {
        if (!msg.member.hasPermission("MUTE_MEMBERS")) return;
        if (args.length === 0 | args.length === 1) {
            msg.channel.send(new MessageEmbed()
            .setTitle("**Incorrect Usage!**")
            .setDescription("```css\n^warn <member> <reason>\n```")
            .setFooter(footer)
            .setColor(embedColor));
        } else {
            const member = msg.mentions.members.first();
            if (member == null) {
                msg.channel.send(new MessageEmbed()
                .setTitle("**Warn**")
                .setDescription("(:x:) User must be a mention.")
                .setFooter(footer)
                .setColor(embedColor));
                msg.delete(msg);
            } else {
                if (args[0].toLowerCase() === "@everyone" || args[0].toLowerCase() === "@here") {
                    msg.channel.send(new MessageEmbed()
                    .setTitle("**Warn**")
                    .setDescription("(:x:) User cannot be those mentions.")
                    .setFooter(footer)
                    .setColor(embedColor));
                    msg.delete(msg);
                } else {
                    var reason = "";
                    for (const word in args) {
                        reason = reason + args[word] + " ";
                    }
                    var rsFinal = reason.replace("" + member, "");
                    rsFinal = rsFinal.replace("<@!>", "");
                    msg.delete(msg);
                    msg.channel.send(new MessageEmbed()
                    .setTitle("**Warn**")
                    .setDescription(`(:white_check_mark:) ${member} has been warned for **${rsFinal}**.`)
                    .setFooter(footer)
                    .setColor(embedColor));
                    member.send(new MessageEmbed()
                    .setTitle("**Warn**")
                    .setDescription(`**You have been warned in ${msg.guild.name}!**\n**You were warned for:** ${rsFinal}`)
                    .setFooter(footer)
                    .setColor(embedColor));
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