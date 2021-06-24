const { MessageEmbed } = require("discord.js");

const config = require("../config.json");
const Utils = require("../Utils/Utils.js");

module.exports = {
    Execute: function(msg, args) {
        if (!msg.member.hasPermission("KICK_MEMBERS")) return;

        msg.delete(msg);

        if (args.length < 2) {
            Utils.sendMessage(msg, "Incorrect Usage!", "```yaml\n^kick <member> <reason>\n```");
            return;
        }

        const member = msg.mentions.members.first();

        if (!member) {
            Utils.sendMessage(msg, "Kick", "(:x:) Invalid User (Must be a mention).");
            return;
        }

        if (args[0].toLowerCase() === "@everyone" || args[0].toLowerCase() === "@here") {
            Utils.sendMessage(msg, "Kick", "(:x:) User cannot be that mention.");
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

        Utils.sendMessage(msg, "Kick", `(:white_check_mark:) ${member} has been kicked for **${reason}**.`);

        try {
            const embed = new MessageEmbed()
            .setTitle("**Kick**")
            .setAuthor(msg.author.username, msg.author.displayAvatarURL())
            .setDescription(`**You have been kicked from ${msg.guild.name}!**\n**You were kicked for:** ${reason}`)
            .setFooter("https://github.com/Yochran", "https://avatars.githubusercontent.com/u/71285258?v=4")
            .setColor(config.EmbedColor)
            .setTimestamp();

            member.send(embed);
        } catch (err) {
            Utils.logMessage(`Couldn't send kick message to the user ${member.user.name}`);
        }

        member.kick(reason).then(() => {
            Utils.logMessage(`[${msg.guild.name}], ${msg.author.username} has kicked ${member.user.username}`);
        });
        
        Utils.logPunishment(msg, member, "Kick", reason, "N/A", new Date());
    }
}