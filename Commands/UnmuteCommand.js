const Discord = require("discord.js");
const bot = new Discord.Client();
const { MessageEmbed } = require("discord.js");

const config = require("../config.json");
const utils = require("../Utils/Utils.js");

const footer = config.Footer;
const embedColor = config.EmbedColor;

module.exports = {
    unmute: function(msg, args) {
        if (!msg.member.hasPermission("MUTE_MEMBERS")) return;
        if (args.length != 1) {
            msg.channel.send(new MessageEmbed()
            .setTitle("**Incorrect Usage!**")
            .setDescription("```css\n^unmute <member>\n```")
            .setFooter(footer)
            .setColor(embedColor));
            msg.delete(msg);
        } else {
            const member = msg.mentions.members.first();
            if (member == null) {
                msg.channel.send(new MessageEmbed()
                .setTitle("**Unmute**")
                .setDescription("(:x:) User must be a mention.")
                .setFooter(footer)
                .setColor(embedColor));
                msg.delete(msg);
            } else {
                if (args[0].toLowerCase() === "@everyone" || args[0].toLowerCase() === "@here") {
                    msg.channel.send(new MessageEmbed()
                    .setTitle("**Unmute**")
                    .setDescription("(:x:) User cannot be those mentions.")
                    .setFooter(footer)
                    .setColor(embedColor));
                    msg.delete(msg);
                } else {
                    let muteRole = msg.guild.roles.cache.find(r => r.name.toLowerCase() === "muted");
                    if (!member.roles.cache.find(r => r.name.toLowerCase() === "muted")) {
                        msg.channel.send(new MessageEmbed()
                        .setTitle("**Unmute**")
                        .setDescription("(:x:) User is not muted!")
                        .setFooter(footer)
                        .setColor(embedColor));
                        msg.delete(msg);
                        return;
                    } else {
                        msg.delete(msg);
                        member.roles.remove(muteRole);
                        msg.channel.send(new MessageEmbed()
                        .setTitle("**Unmute**")
                        .setDescription(`(:white_check_mark:) ${member} has been unmuted.`)
                        .setFooter(footer)
                        .setColor(embedColor));
                        member.send(new MessageEmbed()
                        .setTitle("**Unmute**")
                        .setDescription(`**You have been unmuted in ${msg.guild.name}!**`)
                        .setFooter(footer)
                        .setColor(embedColor));
                        const logmsg = `[${msg.guild.name}], ${msg.author.username} has unmuted ${member.user.username}`
                        utils.loginconsole(logmsg);
                    }
                }
            }
        }
    }
}