const Discord = require("discord.js");
const bot = new Discord.Client();
const { MessageEmbed } = require("discord.js");

const config = require("../config.json");
const utils = require("../Utils/Utils.js");

const footer = config.Footer;
const embedColor = config.EmbedColor;

module.exports = {
    kick: function(msg, args) {
        if (!msg.member.hasPermission("KICK_MEMBERS")) return;
        if (args.length === 0 | args.length === 1) {
            msg.channel.send(new MessageEmbed()
            .setTitle("**Incorrect Usage!**")
            .setDescription("```css\n^kick <member> <reason>\n```")
            .setFooter(footer)
            .setColor(embedColor));
            msg.delete(msg);
        } else {
            const member = msg.mentions.members.first();
            if (member == null) {
                msg.channel.send(new MessageEmbed()
                .setTitle("**Kick**")
                .setDescription("(:x:) User must be a mention.")
                .setFooter(footer)
                .setColor(embedColor));
                msg.delete(msg);
            } else {
                if (args[0].toLowerCase() === "@everyone" || args[0].toLowerCase() === "@here") {
                    msg.channel.send(new MessageEmbed()
                    .setTitle("**Kick**")
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
                    rsFinal = rsFinal.replace("<", "");
                    rsFinal = rsFinal.replace("@", "");
                    rsFinal = rsFinal.replace("!", "");
                    rsFinal = rsFinal.replace(">", "");
                    try {
                        member.send(new MessageEmbed()
                        .setTitle("**Kick**")
                        .setDescription(`**You have been kicked from ${msg.guild.name}!**\n**You were kicked for:** ${rsFinal}`)
                        .setFooter(footer)
                        .setColor(embedColor));
                    } catch (e) {
                        console.log(`[yoBot]: Couldn't send kick message to the user ${member.user.name}`);
                    }
                    msg.delete(msg);
                    msg.channel.send(new MessageEmbed()
                    .setTitle("**Kick**")
                    .setDescription(`(:white_check_mark:) ${member} has been kicked for **${rsFinal}**.`)
                    .setFooter(footer)
                    .setColor(embedColor));
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