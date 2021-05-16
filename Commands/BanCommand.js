const { MessageEmbed } = require("discord.js");

const config = require("../config.json");
const Utils = require("../Utils/Utils.js");

module.exports = {
    Execute: function(msg, args) {
        if (!msg.member.hasPermission("BAN_MEMBERS")) return;

        msg.delete(msg);

        if (args.length < 2) {
            Utils.sendMessage(msg, "Incorrect Usage!", "```yaml\n^ban <member> <reason>\n```");
            return;
        }
            
        const member = msg.mentions.members.first();

        if (!member) {
            Utils.sendMessage(msg, "Ban", "(:x:) Invalid User (Must ping them).");
            return;
        }

        if (args[0].toLowerCase() === "@everyone" || args[0].toLowerCase() === "@here") {
            Utils.sendMessage(msg, "Ban", "(:x:) User cannot be that mention.");
            return;
        }

        if (msg.guild.owner.id === member.user.id || member.hasPermission("ADMINISTRATOR")) {
            Utils.sendMessage(msg, "Ban", "(:x:) You cannot ban this user.");
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

        Utils.sendMessage(msg, "Ban", `(:white_check_mark:) ${member} has been banned for **${reason}**.`);

        try {
            const embed = new MessageEmbed()
            .setTitle("**Ban**")
            .setAuthor(msg.author.username, msg.author.displayAvatarURL())
            .setDescription(`**You have been banned from ${msg.guild.name}!**\n**You were banned for:** ${reason}`)
            .setFooter("https://github.com/Yochran", "https://avatars.githubusercontent.com/u/71285258?s=460&u=cc5aee06e85b4ca705b1b989d4b974e5b3346870&v=4")
            .setColor(config.EmbedColor)
            .setTimestamp();

            member.send(embed);
        } catch (err) {
            Utils.logMessage(`Couldn't send ban message to the user ${member.user.name}`);
        }

        setTimeout(() => {
            msg.guild.members.ban(member, {days: null, reason: reason}).then(() => {
                Utils.logMessage(`[${msg.guild.name}], ${msg.author.username} has perm-banned ${msg.author.username}`);
            });
    
        }, 1000);
        
        Utils.logPunishment(msg, member, "Ban", reason, "Permanent", new Date());
    }
}