const Discord = require("discord.js");
const bot = new Discord.Client();
const { MessageEmbed } = require("discord.js");

const config = require("../config.json");
const utils = require("../Utils/Utils.js");

const footer = config.Footer;
const embedColor = config.EmbedColor;

module.exports = {
    mute: function(msg, args) {
        if (!msg.member.hasPermission("MUTE_MEMBERS")) return;
        if (args.length === 0 | args.length === 1) {
            msg.channel.send(new MessageEmbed()
            .setTitle("**Incorrect Usage!**")
            .setDescription("```css\n^mute <member> <reason>\n```")
            .setFooter(footer)
            .setColor(embedColor));
            msg.delete(msg);
        } else {
            const member = msg.mentions.members.first();
            if (member == null) {
                msg.channel.send(new MessageEmbed()
                .setTitle("**Mute**")
                .setDescription("(:x:) User must be a mention.")
                .setFooter(footer)
                .setColor(embedColor));
                msg.delete(msg);
            } else {
                if (args[0].toLowerCase() === "@everyone" || args[0].toLowerCase() === "@here") {
                    msg.channel.send(new MessageEmbed()
                    .setTitle("**Mute**")
                    .setDescription("(:x:) User cannot be those mentions.")
                    .setFooter(footer)
                    .setColor(embedColor));
                    msg.delete(msg);
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
                            msg.channel.send(new MessageEmbed()
                            .setTitle("**Mute**")
                            .setDescription("(:x:) Muted role couldn't be created. Ensure that I have administrator permissions.")
                            .setFooter(footer)
                            .setColor(embedColor));
                            msg.delete(msg);
                            return;
                        }
                    }
                    msg.delete(msg);
                    msg.channel.send(new MessageEmbed()
                    .setTitle("**Mute**")
                    .setDescription(`(:white_check_mark:) ${member} has been muted for **${rsFinal}**.`)
                    .setFooter(footer)
                    .setColor(embedColor));
                    try {
                        member.send(new MessageEmbed()
                        .setTitle("**Mute**")
                        .setDescription(`**You have been muted in ${msg.guild.name}!**\n**You were muted for:** ${rsFinal}`)
                        .setFooter(footer)
                        .setColor(embedColor));
                    } catch (e) {
                        console.log(`[yoBot]: Couldn't send kick message to the user ${member.user.name}`);
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