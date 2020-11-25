const Discord = require("discord.js");
const bot = new Discord.Client();
const { MessageEmbed } = require("discord.js");

const config = require("../config.json");

const footer = config.Footer;
const embedColor = config.EmbedColor;

module.exports = {
    serverinfo: function(msg) {
        const createdDate = msg.guild.createdAt;
        const ownerid = msg.guild.ownerID;
        let members = 0;
        msg.guild.members.cache.forEach((member) => {
            members++;
        });
        msg.delete(msg);
        msg.channel.send(new MessageEmbed().setTitle("**Server Info:**").setDescription(`**Created:** ${createdDate}\n**Owner:** <@${ownerid}>\n**Members:** ${members}\n \n(Requested By: <@${msg.author.id}>)`)
        .setFooter(footer).setColor(embedColor));
    }
}