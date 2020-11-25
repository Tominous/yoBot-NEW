const Discord = require("discord.js");
const bot = new Discord.Client();
const { MessageEmbed } = require("discord.js");

const config = require("../config.json");

const footer = config.Footer;
const embedColor = config.EmbedColor;

module.exports = {
    bonk: function(msg, args) {
        if (args.length !== 1) {
            msg.delete(msg);
            msg.channel.send(new MessageEmbed().setTitle("**Incorrect Usage!**").setDescription("```css\n^bonk <member>\n```\n(Requested By: <@" + msg.author.id + ">)").setFooter(footer).setColor(embedColor));
        } else {
            if (args[0].toLowerCase() === "@everyone" || args[0].toLowerCase === "@here") {
                msg.delete(msg);
                msg.channel.send(new MessageEmbed().setTitle("**Error:**").setDescription("You can't bonk everyone, silly!\n(Requested By: <@" + msg.author.id + ">)").setFooter(footer).setColor(embedColor));
            } else {
                const member = msg.mentions.members.first();
                if (member != null) {
                    msg.delete(msg);
                    msg.channel.send(new MessageEmbed().setTitle("**Bonk:**").setDescription(`<@${msg.author.id}> has bonked ${member} over the head.\n \n(Requested By: <@${msg.author.id}>)`).setFooter(footer).setColor(embedColor));
                    member.send(new MessageEmbed().setTitle("**Bonk:**").setDescription(`**You have been bonked by <@${msg.author.id}>!**\n**You were bonked in:** ${msg.guild.name}`)
                    .setFooter(footer).setColor(embedColor));
                } else {
                    msg.channel.send(new MessageEmbed().setTitle("**Incorrect Usage!**").setDescription("```css\n^bonk <member>\n```\n(Requested By: <@" + msg.author.id + ">)").setFooter(footer).setColor(embedColor));
                }
            }
        }
    }
}