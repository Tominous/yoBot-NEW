const { MessageEmbed } = require("discord.js");

const Utils = require("../Utils/Utils.js");
const config = require("../config.json");

module.exports = {
    Execute: function(msg) {        
        msg.delete(msg);

        var members = 0;
        msg.guild.members.cache.forEach((member) => {
            if (!member.bot) members++;
        });

        const createdAt = `${msg.guild.createdAt.getMonth()}/${msg.guild.createdAt.getDay()}/${msg.guild.createdAt.getFullYear()}`

        const embed = new MessageEmbed()
        .setTitle("Server Info")
        .setDescription(`**Created:** ${createdAt}\n**Owner:** <@${msg.guild.ownerID}>\n**Members:** ${members}\n**Boosters:** ${msg.guild.premiumSubscriptionCount}\n**Region:** ${msg.guild.region.toUpperCase()}`)
        .setColor(config.EmbedColor)
        .setFooter("https://github.com/Yochran", "https://avatars.githubusercontent.com/u/71285258?v=4")
        .setAuthor(msg.author.username, msg.author.displayAvatarURL())
        .setTimestamp()
        .setImage(msg.guild.iconURL());

        msg.channel.send(embed);
    }
}