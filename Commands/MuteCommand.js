const Discord = require("discord.js");
const bot = new Discord.Client();
const { MessageEmbed } = require("discord.js");

const config = require("../config.json");
const utils = require("../Utils/Utils.js");

module.exports = {
    mute: function(msg, args) {
        if (!msg.member.hasPermission("MUTE_MEMBERS")) return;
        if (args.length === 0 | args.length === 1) {
            msg.delete(msg);
            utils.sendMessage(msg, "Incorrect Usage!", "```css\n^mute <member> <reason>\n```");
        } else {
            const member = msg.mentions.members.first();
            if (member == null) {
                msg.delete(msg);
                utils.sendMessage(msg, "Mute", "(:x:) User must be a mention.");
            } else {
                if (args[0].toLowerCase() === "@everyone" || args[0].toLowerCase() === "@here") {
                    msg.delete(msg);
                    utils.sendMessage(msg, "Mute", "(:x:) User cannot be that mention.");
                } else {
                    var reason = "";
                    for (const word in args) {
                        reason = reason + args[word] + " ";
                    }
                    var rsFinal = reason.replace("" + member, "");
                    rsFinal = rsFinal.replace("<", "");
                    rsFinal = rsFinal.replace("@", "");
                    rsFinal = rsFinal.replace("!", "");
                    rsFinal = rsFinal.replace(">", "");
                    let muteRole = msg.guild.roles.cache.find(r => r.name.toLowerCase() === "muted");
                    if (!muteRole) {
                        try {
                            muteRole = msg.guild.roles.create({
                                data: {
                                    name: "muted"
                                }
                            })
                            let overrideRole = msg.guild.roles.cache.find(r => r.name.toLowerCase() === "muted");
                            msg.guild.channels.cache.forEach(async channel => {
                                await channel.updateOverwrite(overrideRole, {
                                    SEND_MESSAGES: false,
                                    SPEAK: false,
                                    ADD_REACTIONS: false
                                })
                            })
                        } catch (e) {
                            msg.delete(msg);
                            utils.sendMessage(msg, "Mute", "(:x:) Muted role couldn't be created. Ensure that I have administrator permissions.");
                        }
                    }
                    msg.delete(msg);
                    utils.sendMessage(msg, "Mute", `(:white_check_mark:) ${member} has been muted for **${rsFinal}**.`);
                    try {
                        member.send(new MessageEmbed()
                        .setTitle("**Mute**")
                        .setAuthor(msg.author.username, msg.author.displayAvatarURL())
                        .setDescription(`**You have been muted in ${msg.guild.name}!**\n**You were muted for:** ${rsFinal}`)
                        .setFooter("https://github.com/Yochran", "https://avatars.githubusercontent.com/u/71285258?s=460&u=cc5aee06e85b4ca705b1b989d4b974e5b3346870&v=4")
                        .setColor(config.EmbedColor)
                        .setTimestamp());
                    } catch (e) {
                        utils.loginconsole(`Couldn't send mute message to the user ${member.user.name}`);
                    }
                    member.roles.add(muteRole);
                    const date = new Date();
                    const name = member.user.username;
                    utils.logpunishment(msg, name, "Mute", rsFinal, "Permanent", date);
                    const logmsg = `[${msg.guild.name}], ${msg.author.username} has muted ${member.user.username}`
                    utils.loginconsole(logmsg);
                }
            }
        }
    }
}