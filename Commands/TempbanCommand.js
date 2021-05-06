const { MessageEmbed } = require("discord.js");

const config = require("../config.json");
const Utils = require("../Utils/Utils.js");

module.exports = {
    Execute: function(msg, args) {
        if (!msg.member.hasPermission("BAN_MEMBERS")) return;

        msg.delete(msg);

        if (args.length < 2) {
            Utils.sendMessage(msg, "Incorrect Usage!", "```css\n^tempban <member> <time> <reason>\n```");
            return;
        }

        const member = msg.mentions.members.first();
        
        if (!member) {
            Utils.sendMessage(msg, "Temp-Ban", "(:x:) Invalid User (Must be a mention).");
            return;
        }

        if (args[0].toLowerCase() === "@everyone" || args[0].toLowerCase() === "@here") {
            Utils.sendMessage(msg, "Temp-Ban", "(:x:) User cannot be that mention.");
            return;
        }

        if (msg.guild.owner.id === member.user.id || member.hasPermission("ADMINISTRATOR")) {
            Utils.sendMessage(msg, "Temp-Ban", "(:x:) You cannot ban this user.");
            return;
        }

        const time = Utils.parseBanTime(args[1].toLowerCase());
        const timeStr = Utils.getBanTime(time);

        var reason = "";
        for (var i = 2; i < args.length; i++) {
            if (reason.length === 0) {
                reason = args[i];
            } else {
                reason = reason + " " + args[i];
            }
        }

        Utils.sendMessage(msg, "Temp-Ban", `(:white_check_mark:) ${member} has been banned for **${reason}**. (${banLength})`);

        try {
            const embed = new MessageEmbed()
            .setTitle("**Temp-Ban**")
            .setAuthor(msg.author.username, msg.author.displayAvatarURL())
            .setDescription(`**You have been temp-anned in ${msg.guild.name} for ${timeStr}!**\n**You were banned for:** ${reason}`)
            .setFooter("https://github.com/Yochran", "https://avatars.githubusercontent.com/u/71285258?s=460&u=cc5aee06e85b4ca705b1b989d4b974e5b3346870&v=4")
            .setTimestamp()
            .setColor(config.EmbedColor);

            member.send(embed);
        } catch (e) {
            Utils.logMessage(`Couldn't send kick message to the user ${member.user.name}`);
        }

        msg.guild.members.ban(member, {days: time,reason: reason}).then(() => {
            Utils.logMessage(`[${msg.guild.name}], ${msg.author.username} has temp-banned ${member.user.username}`);
        });

        Utils.logPunishment(msg, member, "Temp-Ban", reason, timeStr, new Date());
    }
}