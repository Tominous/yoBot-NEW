const Discord = require("discord.js");
const bot = new Discord.Client();
const { MessageEmbed } = require("discord.js");

const config = require("../config.json");
const utils = require("../Utils/Utils.js");

const footer = config.Footer;
const embedColor = config.EmbedColor;

module.exports = {
    userinfo: function(msg, args) {
        if (args.length === 0) {
            const accountCreatedDate = msg.author.createdAt;
            const username = msg.author.username;
            const tag = msg.author.tag;
            const serverJoinDate = msg.guild.members.cache.get(msg.author.id).joinedAt;
            msg.delete(msg);
            msg.channel.send(new MessageEmbed().setTitle("**User Info:**")
            .setDescription(`**Account Created:** ${accountCreatedDate}\n**Name:** ${username}\n**Tag:** ${tag}\n**Joined Server:** ${serverJoinDate}\n \n(Requested By: <@${msg.author.id}>)`)
            .setFooter(footer).setColor(embedColor));
        } else if (args.length === 1) {
            const member = msg.mentions.members.first();
            if (member != null) {
                const accountCreatedDate = member.user.createdAt;
                const username = member.user.username;
                const tag = member.user.tag;
                const serverJoinDate = msg.guild.members.cache.get(member.id).joinedAt;
                msg.delete(msg);
                msg.channel.send(new MessageEmbed().setTitle(`**${username}'s User Info:**`)
                .setDescription(`**Account Created:** ${accountCreatedDate}\n**Name:** ${username}\n**Tag:** ${tag}\n**Joined Server:** ${serverJoinDate}\n \n(Requested By: <@${msg.author.id}>)`)
                .setFooter(footer).setColor(embedColor));
                const logmsg = `[${msg.guild.name}], ${msg.author.username} has run the ^userinfo command.`
                utils.loginconsole(logmsg);
            } else {
                msg.delete(msg);
                msg.channel.send(new MessageEmbed().setTitle("**Incorrect Usage!**").setDescription("```css\n^user [member]\n```\n(Requested By: <@" + msg.author.id + ">)").setFooter(footer).setColor(embedColor));
            }
        } else {
            msg.delete(msg);
            msg.channel.send(new MessageEmbed().setTitle("**Incorrect Usage!**").setDescription("```css\n^user [member]\n```\n(Requested By: <@" + msg.author.id + ">)").setFooter(footer).setColor(embedColor));
        }
    }
}