const { MessageEmbed } = require("discord.js");

const config = require("../config.json");
const Utils = require("../Utils/Utils.js");

module.exports = {
    Execute: function(msg, args) {
        msg.delete(msg);

        if (args.length !== 1) {
            Utils.sendMessage(msg, "Incorrect Usage!", "```yaml\n^bonk <member>\n```");
            return;
        }

        if (args[0].toLowerCase() === "@everyone" || args[0].toLowerCase === "@here") {
            Utils.sendMessage(msg, "Bonk", "(:x:) User cannot be that mention.");
            return;
        }

        const member = msg.mentions.members.first();

        if (member == null) {
            Utils.sendMessage(msg, "Bonk", "(:x:) Invalid User (Must be a mention).");
            return;
        }

        Utils.sendMessage(msg, "Bonk", `<@${msg.author.id}> has bonked ${member} over the head.`);

        try {
            const embed = new MessageEmbed()
            .setTitle("**Bonk**")
            .setAuthor(msg.author.username, msg.author.displayAvatarURL())
            .setDescription(`**You have been bonked by <@${msg.author.id}>!**\n**You were bonked in:** ${msg.guild.name}`)
            .setFooter("https://github.com/Yochran", "https://avatars.githubusercontent.com/u/71285258?v=4")
            .setColor(config.EmbedColor)
            .setTimestamp();

            member.send(embed);
        } catch (e) {
            Utils.logMessage(`Couldn't send bonk message to the user ${member.user.name}`);
        }
    }
}