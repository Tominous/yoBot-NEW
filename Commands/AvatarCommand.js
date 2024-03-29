const { MessageEmbed } = require("discord.js");

const Utils = require("../Utils/Utils");
const config = require("../config.json");

module.exports = {
    Execute: function(msg, args) {
        msg.delete(msg);

        if (args.length > 1) {
            Utils.sendMessage(msg, "Incorrect Usage!", "```yaml\n^avatar [member]\n```");
            return;
        }

        if (args.length === 0) {
            const embed = new MessageEmbed()
            .setTitle(`**Your Avatar**`)
            .setAuthor(msg.author.username, msg.author.displayAvatarURL())
            .setImage(msg.author.displayAvatarURL({ format: 'png', size: 256 }))
            .setFooter("https://github.com/Yochran", "https://avatars.githubusercontent.com/u/71285258?v=4")
            .setColor(config.EmbedColor)
            .setTimestamp();

            msg.channel.send(embed);
        } else if (args.length === 1) {
            const member = msg.mentions.members.first();

            if (!member) {
                msg.delete(msg);
                Utils.sendMessage(msg, "Incorrect Usage!", "```css\n^avatar [member]```");
                return;
            }

            const embed = new MessageEmbed()
            .setTitle(`**${member.user.username}'s avatar**`)
            .setAuthor(msg.author.username, msg.author.displayAvatarURL())
            .setImage(member.user.displayAvatarURL({ format: 'png', size: 256 }))
            .setFooter("https://github.com/Yochran", "https://avatars.githubusercontent.com/u/71285258?v=4")
            .setColor(config.EmbedColor)
            .setTimestamp();

            msg.channel.send(embed);
        }
    }
}