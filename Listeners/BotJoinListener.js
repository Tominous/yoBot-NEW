const Discord = require("discord.js");
const bot = new Discord.Client();
const { MessageEmbed } = require("discord.js");

const config = require("../config.json");

module.exports = {
    botjoinlistener: function(guild) {
        let guildChannels = [];
        guild.channels.cache.forEach((channel) => {
            if (channel.type === "text") {
                guildChannels.push(channel.id);
            }
        });
        let sendChannel = guild.channels.cache.get(guildChannels[1]);
        sendChannel.send(new MessageEmbed()
        .setTitle("**Thank you for using yoBot!**")
        .setAuthor("yoBot", bot.user.displayAvatarURL())
        .setDescription("**Starter Commands:**")
        .addFields(
            {name: "Help", value: "**Usage:** `^help`", inline: true},
            {name: "Bot", value: "**Usage:** `^bot`", inline: true},
            {name: "Server", value: "**Usage:** `^serverinfo`", inline: true},
        )
        .setFooter("https://github.com/Yochran", "https://avatars.githubusercontent.com/u/71285258?s=460&u=cc5aee06e85b4ca705b1b989d4b974e5b3346870&v=4")
        .setColor(config.EmbedColor)
        .setTimestamp());
    }
}