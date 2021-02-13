const Discord = require("discord.js");
const bot = new Discord.Client();
const { MessageEmbed } = require("discord.js");

const config = require("../config.json");
const utils = require("../Utils/Utils.js");

const footer = config.Footer;
const embedColor = config.EmbedColor;

module.exports = {
    purge: function(msg, args) {
        if (!msg.member.hasPermission("MANAGE_MESSAGES")) return;
        if (args.length !== 1) {
            msg.delete(msg);
            msg.channel.send(new MessageEmbed()
            .setTitle("**Incorrect Usage!**")
            .setDescription("```css\n^purge <amount>```\n(Requested By: <@" + msg.author.id + ">)")
            .setFooter(footer)
            .setColor(embedColor));
        } else {
            const amount = args[0];
            msg.delete(msg);
            msg.channel.bulkDelete(amount);
            setTimeout(() => {
                msg.channel.send(new MessageEmbed()
            .setTitle("**Incorrect Usage!**")
            .setDescription(`(:white_check_mark:) **${amount}** messages successfully purged.`)
            .setFooter(footer)
            .setColor(embedColor));
            }, 100)
            const date = new Date();
            const name = msg.author.username;
            utils.logpunishment(msg, name, "Purge", "N/A", "N/A", date);
        }
    }
}