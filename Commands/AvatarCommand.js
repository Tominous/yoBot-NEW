const Discord = require("discord.js");
const bot = new Discord.Client();

const config = require("../config.json");

const footer = config.Footer;
const embedColor = config.EmbedColor;

const { MessageEmbed } = require("discord.js");

module.exports = {
    avatar: function(msg, args) {
        if (args.length === 0) {
            msg.delete(msg);
            msg.channel.send(new MessageEmbed()
            .setTitle(`**Your Avatar**`)
            .setDescription(`**(Image may take a few seconds to load).**\n\n(Requested By: <@${msg.author.id}>)`)
            .setImage(msg.author.displayAvatarURL({ format: 'png', size: 256 }))
            .setFooter(footer)
            .setColor(embedColor));
        } else if (args.length === 1) {
            const member = msg.mentions.members.first();
            if (!member) {
                msg.delete(msg);
                msg.channel.send(new MessageEmbed()
                .setTitle("**Incorrect Usage!**")
                .setDescription("```css\n^avatar [member]```\n(Requested By: <@" + msg.author.id + ">)")
                .setFooter(footer)
                .setColor(embedColor));
            } else {
                msg.delete(msg);
                msg.channel.send(new MessageEmbed()
                .setTitle(`**${member.user.username}'s avatar**`)
                .setDescription(`**(Image may take a few seconds to load).**\n\n(Requested By: <@${msg.author.id}>)`)
                .setImage(member.user.displayAvatarURL({ format: 'png', size: 256 }))
                .setFooter(footer)
                .setColor(embedColor));
            }
        } else {
            msg.delete(msg);
            msg.channel.send(new MessageEmbed()
            .setTitle("**Incorrect Usage!**")
            .setDescription("```css\n^avatar [member]```\n(Requested By: <@" + msg.author.id + ">)")
            .setFooter(footer)
            .setColor(embedColor));
        }
    }
}