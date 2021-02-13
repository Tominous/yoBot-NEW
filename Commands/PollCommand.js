const Discord = require("discord.js");
const bot = new Discord.Client();

const config = require("../config.json");

const footer = config.Footer;
const embedColor = config.EmbedColor;

const { MessageEmbed } = require("discord.js");

module.exports = {
    poll: function(msg, args) {
        let pollChannel = msg.guild.channels.cache.find(c => c.name.toLowerCase() === "polls");
        if (msg.channel.id === pollChannel.id) {
            if (args.length < 3) {
                msg.channel.send(new MessageEmbed()
                .setTitle("**Incorrect Usage!**")
                .setDescription("```css\n^poll <choice1> <choice2> <message>```\n(Requested By: <@" + msg.author.id + ">)")
                .setFooter(footer)
                .setColor(embedColor));
                msg.delete(msg);
            } else {
                const choice1 = args[0];
                const choice2 = args[1];
                var message = "";
                for (var i = 2; i < args.length; i++) {
                    if (message.length === 0) {
                        message = args[i];
                    } else {
                        message = message + " " + args[i];
                    }
                }

                msg.delete(msg);

                msg.channel.send(new MessageEmbed()
                .setTitle("**Poll:**")
                .setDescription(`${message}\n**Vote :white_check_mark: for ${choice1}**\n**Vote :x: for ${choice2}**`)
                .setFooter(footer)
                .setColor(embedColor));

                setTimeout(() => {
                    msg.channel.lastMessage.react("✅");
                }, 500);

                setTimeout(() => {
                    msg.channel.lastMessage.react("❌");
                }, 500);
            }
        } 
    }
}