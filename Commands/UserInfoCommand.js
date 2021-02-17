const Discord = require("discord.js");

const config = require("../config.json");
const utils = require("../Utils/Utils.js");

module.exports = {
    userinfo: function(msg, args) {
        if (args.length === 0) {
            const accountCreatedDate = msg.author.createdAt;
            const username = msg.author.username;
            const tag = msg.author.tag;
            const serverJoinDate = msg.guild.members.cache.get(msg.author.id).joinedAt;
            msg.delete(msg);
            utils.sendMessage(msg, "User Info:", `**Account Created:** ${accountCreatedDate}\n**Name:** ${username}\n**Tag:** ${tag}\n**Joined Server:** ${serverJoinDate}`);
        } else if (args.length === 1) {
            const member = msg.mentions.members.first();
            if (member != null) {
                const accountCreatedDate = member.user.createdAt;
                const username = member.user.username;
                const tag = member.user.tag;
                const serverJoinDate = msg.guild.members.cache.get(member.id).joinedAt;
                msg.delete(msg);
                utils.sendMessage(msg, `**${username}'s User Info:**`, `**Account Created:** ${accountCreatedDate}\n**Name:** ${username}\n**Tag:** ${tag}\n**Joined Server:** ${serverJoinDate}`);
            } else {
                msg.delete(msg);
                utils.sendMessage(msg, "Incorrect Usage!", "```css\n^user [member]\n```");
            }
        } else {
            msg.delete(msg);
            utils.sendMessage(msg, "Incorrect Usage!", "```css\n^user [member]\n```");
        }
    }
}