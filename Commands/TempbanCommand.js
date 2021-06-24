const { MessageEmbed } = require("discord.js");

const config = require("../config.json");
const Utils = require("../Utils/Utils.js");

module.exports = {
    Execute: function(msg, args) {
        if (!msg.member.hasPermission("BAN_MEMBERS")) return;

        msg.delete(msg);

        if (args.length < 2) {
            Utils.sendMessage(msg, "Incorrect Usage!", "```yaml\n^tempban <member> <time> <reason>\n```");
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

        const time = Utils.parseTime(args[1].toLowerCase());
        const timeStr = Utils.getTimeStr(time * 1000);

        var reason = "";
        for (var i = 2; i < args.length; i++) {
            if (reason.length === 0) {
                reason = args[i];
            } else {
                reason = reason + " " + args[i];
            }
        }

        Utils.sendMessage(msg, "Temp-Ban", `(:white_check_mark:) ${member} has been banned for **${reason}**. (${timeStr})`);

        try {
            const embed = new MessageEmbed()
            .setTitle("**Temp-Ban**")
            .setAuthor(msg.author.username, msg.author.displayAvatarURL())
            .setDescription(`**You have been temp-banned in ${msg.guild.name} for ${timeStr}!**\n**You were banned for:** ${reason}`)
            .setFooter("https://github.com/Yochran", "https://avatars.githubusercontent.com/u/71285258?v=4")
            .setTimestamp()
            .setColor(config.EmbedColor);

            member.send(embed);
        } catch (err) {
            Utils.logMessage(`Couldn't send kick message to the user ${member.user.name}`);
        }

        setTimeout(() => {
            msg.guild.members.ban(member, {days: null, reason: reason}).then(() => {
                Utils.logMessage(`[${msg.guild.name}], ${msg.author.username} has temp-banned ${member.user.username}`);
            });
        }, 1000);
        
        setTimeout(async() => {
            try {
                msg.guild.members.unban(member);
            } catch (err) {
                Utils.logMessage(`Couldn't unbam ${member.user.tag} from ${msg.guild.name}, as they are not banned. (They were unbanned manually)`);
            }
        }, time * 1000);

        Utils.logPunishment(msg, member, "Temp-Ban", reason, timeStr, new Date());
    }
}