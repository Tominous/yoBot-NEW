const { MessageEmbed } = require("discord.js");

const config = require("../config.json");
const Utils = require("../Utils/Utils.js");

module.exports = {
    Execute: function(msg, args) {
        if (!msg.member.hasPermission("MUTE_MEMBERS")) return;
        
        msg.delete(msg);

        if (args.length < 2) {
            Utils.sendMessage(msg, "Incorrect Usage!", "```yaml\n^mute <member> <reason>\n```");
            return;
        }

        const member = msg.mentions.members.first();

        if (!member) {
            Utils.sendMessage(msg, "Mute", "(:x:) Invalid User (Must be a mention).");
            return;
        }

        if (args[0].toLowerCase() === "@everyone" || args[0].toLowerCase() === "@here") {
            Utils.sendMessage(msg, "Mute", "(:x:) User cannot be that mention.");
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

        Utils.sendMessage(msg, "Mute", `(:white_check_mark:) ${member} has been muted for **${reason}**.`);
        member.roles.add(muteRole);

        try {
            const embed = new MessageEmbed()
            .setTitle("**Mute**")
            .setAuthor(msg.author.username, msg.author.displayAvatarURL())
            .setDescription(`**You have been muted in ${msg.guild.name}!**\n**You were muted for:** ${reason}`)
            .setFooter("https://github.com/Yochran", "https://avatars.githubusercontent.com/u/71285258?v=4")
            .setColor(config.EmbedColor)
            .setTimestamp();

            member.send(embed);
        } catch (err) {
            Utils.logMessage(`Couldn't send mute message to the user ${member.user.name}`);
        }

        Utils.logPunishment(msg, member, "Mute", reason, "Permanent", new Date());
        Utils.logMessage(`[${msg.guild.name}], ${msg.author.username} has muted ${member.user.username}`);
    }
}