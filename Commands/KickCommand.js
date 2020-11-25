const Discord = require("discord.js");
const bot = new Discord.Client();
const { MessageEmbed } = require("discord.js");

const config = require("../config.json");

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
                .setTitle("**Incorrect Usage!**")
                .setDescription("```css\n^kick <member> <reason>\n```")
                .setFooter(footer)
                .setColor(embedColor));
                msg.delete(msg);
            } else {
                if (args[0] === "@everyone" || args[0] === "@here") {
                    msg.channel.send(new MessageEmbed()
                .setTitle("**Incorrect Usage!**")
                .setDescription("```css\n^kick <member> <reason>\n```")
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
                    member.send(new MessageEmbed()
                    .setTitle("**Kick**")
                    .setDescription(`**You have been kicked from ${msg.guild.name}!**\n**You were kicked for:** ${rsFinal}`)
                    .setFooter(footer)
                    .setColor(embedColor));
                    msg.delete(msg);
                    msg.channel.send(new MessageEmbed()
                    .setTitle("**Kick**")
                    .setDescription(`(:white_check_mark:) ${member} has been kicked for **${rsFinal}**.`)
                    .setFooter(footer)
                    .setColor(embedColor));
                    member.kick(rsFinal).then(() => {
                        console.log(`${member} has been kicked fron ${msg.guild.name}`);
                    });
                }
            }
        }
    }
}