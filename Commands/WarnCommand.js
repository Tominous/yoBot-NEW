const { MessageEmbed } = require("discord.js");

const Utils = require("../Utils/Utils.js");
const config = require("../config.json");

module.exports = {
    Execute: function(msg, args) {
        if (!msg.member.hasPermission("MUTE_MEMBERS")) return;

        msg.delete(msg);

        if (args.length === 0 | args.length === 1) {
            Utils.sendMessage(msg, "Incorrect Usage!", "```yaml\n^warn <member> <reason>\n```");
            return;
        }

        const member = msg.mentions.members.first();

        if (!member) {
            Utils.sendMessage(msg, "Warn", "(:x:) Invalid User (Must be a mention).");
            return;
        }

        if (args[0].toLowerCase() === "@everyone" || args[0].toLowerCase() === "@here") {
            Utils.sendMessage(msg, "Warn", "(:x:) User cannot be that mention.");
            return;
        }

        var reason = "";
        for (var i = 1; i < args.length; i++) {
            if (reason.length === 0) {
                reason = args[i];
            } else {
                reason = reason + " " + args[i];
            }
        }

        Utils.sendMessage(msg, "Warn", `(:white_check_mark:) ${member} has been warned for **${reason}**.`);

        try {
            const embed = new MessageEmbed()
            .setTitle("**Warn**")
            .setDescription(`**You have been warned in ${msg.guild.name}!**\n**You were warned for:** ${reason}`)
            .setAuthor(msg.author.username, msg.author.displayAvatarURL())
            .setFooter("https://github.com/Yochran", "https://avatars.githubusercontent.com/u/71285258?v=4")
            .setColor(config.EmbedColor)
            .setTimestamp();

            member.send(embed);
        } catch (err) {
            Utils.logMessage(`Couldn't send warn message to the user ${member.user.name}`);
        }

        Utils.logPunishment(msg, member, "Warn", reason, "Permanent", new Date());
        Utils.logMessage(`[${msg.guild.name}], ${msg.author.username} has warned ${member.user.username}`);
    }
}