const Discord = require("discord.js");
const bot = new Discord.Client();
const { MessageEmbed } = require("discord.js");

const config = require("../config.json");
const utils = require("../Utils/Utils.js");

const footer = config.Footer;
const embedColor = config.EmbedColor;

module.exports = {
    say: function(msg, args) {
        if (args.length === 0) {
            msg.channel.send(new MessageEmbed().setTitle("**Incorrect Usage!**").setDescription("```css\n^say <message>\n```\n(Requested By: <@" + msg.author.id + ">)").setFooter(footer).setColor(embedColor));
        } else {
            var message = "";
            for (const word in args) {
                message = message + args[word] + " ";
            }
            msg.delete(msg);
            msg.channel.send(new MessageEmbed().setTitle("**yoBot Says:**").setDescription(`${message}`).setFooter(footer).setColor(embedColor));
            const logmsg = `[${msg.guild.name}], ${msg.author.username} has run the ^say command. (${message})`
            utils.loginconsole(logmsg);
        }
    }
}