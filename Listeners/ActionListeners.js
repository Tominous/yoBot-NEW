const Discord = require("discord.js");
const bot = new Discord.Client();

const config = require("../config.json");
const utils = require("../Utils/Utils.js");

module.exports = {
    memberjoin: function(member) {
        const guild = member.guild;
        const name = "**User: " + member.user.username + "**";
        const type = "Member Joined"
        const date = new Date();
        const details = "User joined server."
        utils.logaction(guild, name, type, date, details);
    },

    memberleave: function(member) {
        const guild = member.guild;
        const name = "**User: " + member.user.username + "**";
        const type = "Member Leave"
        const date = new Date();
        const details = "User left server."
        utils.logaction(guild, name, type, date, details);
    },

    rolecreate: function(role) {
        const guild = role.guild;
        const name = "**Roles**";
        const type = "Role Created";
        const details = role.name;
        const date = new Date();
        utils.logaction(guild, name, type, date, details);
    },

    roledelete: function(role) {
        const guild = role.guild;
        const name = "**Roles**";
        const type = "Role Deleted";
        const details = role.name;
        const date = new Date();
        utils.logaction(guild, name, type, date, details);
    },

    msgdelete: function(msg) {
        const name = "**User: " + msg.author.username + "**";
        const type = "Message Deleted";
        const details = msg.content;
        const date = new Date();
        utils.logaction(msg.guild, name, type, date, details);
    }
}