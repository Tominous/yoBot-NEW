const { MessageEmbed } = require("discord.js");

const config = require("../config.json");
const Utils = require("../Utils/Utils.js");

module.exports = {
    Execute: function(msg, args) {
        if (!msg.member.hasPermission("MUTE_MEMBERS")) return;

        msg.delete(msg);

        if (args.length != 1) {
            Utils.sendMessage(msg, "Incorrect Usage!", "```yaml\n^unmute <member>\n```");
            return;
        }

        const member = msg.mentions.members.first();
            
        if (!member) {
            Utils.sendMessage(msg, "Unmute", "(:x:) Invalid user (Must be a mention).");
            return;
        }

        if (args[0].toLowerCase() === "@everyone" || args[0].toLowerCase() === "@here") {
            Utils.sendMessage(msg, "Unmute", "(:x) User cannot be that mention.");
            return;
        }

        var muteRole = msg.guild.roles.cache.find(r => r.name.toLowerCase() === "muted");

        if (!member.roles.cache.find(r => r.name.toLowerCase() === "muted")) {
            Utils.sendMessage(msg, "Unmute", "(:x:) User is not muted!");
            return;
        }
        
        Utils.sendMessage(msg, "Unmute", `(:white_check_mark:) ${member} has been unmuted.`);
        member.roles.remove(muteRole);

        try {
            const embed = new MessageEmbed()
            .setTitle("**Unmute**")
            .setDescription(`**You have been unmuted in ${msg.guild.name}!**`)
            .setAuthor(msg.author.username, msg.author.displayAvatarURL())
            .setFooter("https://github.com/Yochran", "https://avatars.githubusercontent.com/u/71285258?v=4")
            .setColor(config.EmbedColor)
            .setTimestamp();

            member.send(embed);
        } catch (err) {
            Utils.logMessage(`Couldn't send unmute message to the user ${member.user.name}`);
        }

        Utils.logPunishment(msg, member, "Unmute", "N/A", "N/A", new Date());
        Utils.logMessage(`[${msg.guild.name}], ${msg.author.username} has unmuted ${member.user.username}`);
    }
}