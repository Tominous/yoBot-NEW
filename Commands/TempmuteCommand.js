const { MessageEmbed } = require("discord.js");

const config = require("../config.json");
const Utils = require("../Utils/Utils.js");

module.exports = {
    Execute: function(msg, args) {
        if (!msg.member.hasPermission("MUTE_MEMBERS")) return;

        msg.delete(msg);

        if (args.length < 2) {
            Utils.sendMessage(msg, "Incorrect Usage!", "```css\n^tempmute <member> <time> <reason>\n```");
            return;
        }
        
        const member = msg.mentions.members.first();

        if (!member) {
            Utils.sendMessage(msg, "Mute", "(:x:) Invalid user (Must be a mention).");
            return;
        }

        if (args[0].toLowerCase() === "@everyone" || args[0].toLowerCase() === "@here") {
            utils.sendMessage(msg, "Mute", "(:x:) User cannot be that mention.");
            return;
        }

        var time = Utils.parseTime(args[1].toLowerCase());
        var timeStr = Utils.getTimeStr(time * 1000);

        var reason = "";
        for (var i = 2; i < args.length; i++) {
            if (reason.length === 0) {
                reason = args[i];
            } else {
                reason = reason + " " + args[i];
            }
        }

        var muteRole = msg.guild.roles.cache.find(r => r.name.toLowerCase() === "muted");

        if (!muteRole) {
            try {
                muteRole = msg.guild.roles.create({data: {name: "muted"}});

                msg.guild.channels.cache.forEach(async channel => {
                    await channel.updateOverwrite(muteRole, {
                        SEND_MESSAGES: false,
                        SPEAK: false,
                        ADD_REACTIONS: false
                    });
                });
            } catch (e) {
                Utils.sendMessage(msg, "Mute", "(:x:) Muted role couldn't be created. Ensure that I have administrator permissions.");
            }
        }

        Utils.sendMessage(msg, "Mute", `(:white_check_mark:) ${member} has been muted for **${reason}**. (${timeStr})`);
        member.roles.add(muteRole);

        try {
            const embed = new MessageEmbed()
            .setTitle("**Mute**")
            .setAuthor(msg.author.username, msg.author.displayAvatarURL())
            .setDescription(`**You have been muted in ${msg.guild.name} for ${timeStr}!**\n**You were muted for:** ${reason}`)
            .setFooter("https://github.com/Yochran", "https://avatars.githubusercontent.com/u/71285258?s=460&u=cc5aee06e85b4ca705b1b989d4b974e5b3346870&v=4")
            .setColor(config.EmbedColor)
            .setTimestamp();

            member.send(embed);
        } catch (err) {
            Utils.logMessage(`Couldn't send temp-mute message to the user ${member.user.name}`);
        }

        setTimeout(async() => {
            member.roles.remove(muteRole);
        }, time * 1000);

        Utils.logPunishment(msg, member, "Temp-Mute", reason, timeStr, new Date());
        Utils.logMessage(`[${msg.guild.name}], ${msg.author.username} has temp-muted ${member.user.username}`);
    }
}