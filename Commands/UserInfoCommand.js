const Utils = require("../Utils/Utils.js");

module.exports = {
    Execute: function(msg, args) {
        msg.delete(msg);

        if (args.length > 1) {
            Utils.sendMessage(msg, "**Incorrect Usage!**", "```^userinfo [member]```");
            return;
        }

        if (args.length === 0) {
            const accountCreatedDate = `${msg.author.createdAt.getMonth()}/${msg.author.createdAt.getDay()}/${msg.author.createdAt.getFullYear()}`;
            const serverJoinDate = `${msg.guild.members.cache.get(msg.author.id).joinedAt.getMonth()}/${msg.guild.members.cache.get(msg.author.id).joinedAt.getDay()}/${msg.guild.members.cache.get(msg.author.id).joinedAt.getFullYear()}`;

            Utils.sendMessage(msg, "**User Info:**", `**Account Created:** ${accountCreatedDate}\n**Name:** ${msg.author.username}\n**Tag:** ${msg.author.tag}\n**Joined Server:** ${serverJoinDate}`);
        } else if (args.length === 1) {
            const member = msg.mentions.members.first();

            if (!member) {
                Utils.sendMessage(msg, "**User Info:**", "(:x:) Invalid User (Must be a mention).");
                return;
            }
            
            const accountCreatedDate = `${member.user.createdAt.getMonth()}/${member.user.createdAt.getDay()}/${member.user.createdAt.getFullYear()}`;
            const serverJoinDate = `${msg.guild.members.cache.get(member.id).joinedAt.getMonth()}/${msg.guild.members.cache.get(member.id).joinedAt.getDay()}/${msg.guild.members.cache.get(member.id).joinedAt.getFullYear()}`;

            Utils.sendMessage(msg, `**${username}'s User Info:**`, `**Account Created:** ${accountCreatedDate}\n**Name:** ${member.user.username}\n**Tag:** ${member.user.tag}\n**Joined Server:** ${serverJoinDate}`);
        }
    }
}