const Discord = require("discord.js");
const bot = new Discord.Client();
const { MessageEmbed } = require("discord.js");

const config = require("../config.json");
const utils = require("../Utils/Utils.js");

module.exports = {
    bonk: function(msg, args) {
        if (args.length !== 1) {
            msg.delete(msg);
            utils.sendMessage(msg, "Incorrect Usage!", "```css\n^bonk <member>\n```");
        } else {
            if (args[0].toLowerCase() === "@everyone" || args[0].toLowerCase === "@here") {
                msg.delete(msg);
                utils.sendMessage(msg, "Bonk", "(:x:) User cannot be that mention.");
            } else {
                const member = msg.mentions.members.first();
                if (member != null) {
                    msg.delete(msg);
                    utils.sendMessage(msg, "Bonk", `<@${msg.author.id}> has bonked ${member} over the head.`);
                    try {
                        member.send(new MessageEmbed()
                        .setTitle("**Bonk**")
                        .setAuthor(msg.author.username, msg.author.displayAvatarURL())
                        .setDescription(`**You have been bonked by <@${msg.author.id}>!**\n**You were bonked in:** ${msg.guild.name}`)
                        .setFooter("https://github.com/Yochran", "https://avatars.githubusercontent.com/u/71285258?s=460&u=cc5aee06e85b4ca705b1b989d4b974e5b3346870&v=4")
                        .setColor(config.EmbedColor)
                        .setTimestamp());
                    } catch (e) {
                        utils.loginconsole(`Couldn't send bonk message to the user ${member.user.name}`);
                    }
                    const logmsg = `[${msg.guild.name}], ${msg.author.username} has bonked ${member.user.username}`
                    utils.loginconsole(logmsg);
                } else {
                    msg.delete(msg);
                    utils.sendMessage(msg, "Bonk", "(:x:) User must be a mention.");
                }
            }
        }
    }
}