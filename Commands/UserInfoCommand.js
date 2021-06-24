const { MessageEmbed } = require("discord.js");

const config = require("../config.json");
const Utils = require("../Utils/Utils.js");

module.exports = {
    Execute: function(msg, args) {
        msg.delete(msg);

        if (args.length > 1) {
            Utils.sendMessage(msg, "**Incorrect Usage!**", "```yaml\n^userinfo [member]\n```");
            return;
        }

        if (args.length === 0) {
            const accountCreatedDate = `${msg.author.createdAt.getMonth()}/${msg.author.createdAt.getDay()}/${msg.author.createdAt.getFullYear()}`;
            const serverJoinDate = `${msg.guild.members.cache.get(msg.author.id).joinedAt.getMonth()}/${msg.guild.members.cache.get(msg.author.id).joinedAt.getDay()}/${msg.guild.members.cache.get(msg.author.id).joinedAt.getFullYear()}`;
            var username = msg.guild.members.cache.find(m => m.user.username === msg.author.username).nickname;
            if (!username) username = msg.author.username;

            var roles = "None";
            msg.member.roles.cache.forEach((role) => {
                if (role.name.includes("@everyone")) return;

                if (roles === "None") {
                    roles = `<@&${role.id}>`;
                } else {
                    roles = roles + ", " + `<@&${role.id}>`;
                }
            });

            const embed = new MessageEmbed()
            .setTitle("User Info")
            .setDescription( `**Account Created:** ${accountCreatedDate}\n**Username:** ${username}\n**Tag:** ${msg.author.tag}\n**Joined Server:** ${serverJoinDate}\n**Roles:** ${roles}`)
            .setColor(config.EmbedColor)
            .setFooter("https://github.com/Yochran", "https://avatars.githubusercontent.com/u/71285258?v=4")
            .setAuthor(msg.author.username, msg.author.displayAvatarURL())
            .setTimestamp()
            .setImage(msg.author.displayAvatarURL());

            msg.channel.send(embed);
        } else if (args.length === 1) {
            const member = msg.mentions.members.first();

            if (!member) {
                Utils.sendMessage(msg, "**User Info:**", "(:x:) Invalid User (Must be a mention).");
                return;
            }
            
            const accountCreatedDate = `${member.user.createdAt.getMonth()}/${member.user.createdAt.getDay()}/${member.user.createdAt.getFullYear()}`;
            const serverJoinDate = `${msg.guild.members.cache.get(member.user.id).joinedAt.getMonth()}/${msg.guild.members.cache.get(member.user.id).joinedAt.getDay()}/${msg.guild.members.cache.get(member.user.id).joinedAt.getFullYear()}`;
            var username = msg.guild.members.cache.find(m => m.user.username === member.user.username).nickname;
            if (!username) username = member.user.username;

            var roles = "None";
            member.roles.cache.forEach((role) => {
                if (role.name.includes("@everyone")) return;

                if (roles === "None") {
                    roles = `<@&${role.id}>`;
                } else {
                    roles = roles + ", " + `<@&${role.id}>`;
                }
            });

            const embed = new MessageEmbed()
            .setTitle(`${member.user.username}'s User Info`)
            .setDescription( `**Account Created:** ${accountCreatedDate}\n**Username:** ${username}\n**Tag:** ${member.user.tag}\n**Joined Server:** ${serverJoinDate}\n**Roles:** ${roles}`)
            .setColor(config.EmbedColor)
            .setFooter("https://github.com/Yochran", "https://avatars.githubusercontent.com/u/71285258?v=4")
            .setAuthor(msg.author.username, msg.author.displayAvatarURL())
            .setTimestamp()
            .setImage(member.user.displayAvatarURL({ format: 'png', size: 128 }));

            msg.channel.send(embed);
        }
    }
}