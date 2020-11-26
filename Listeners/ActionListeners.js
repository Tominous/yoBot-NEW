const Discord = require("discord.js");
const bot = new Discord.Client();

const config = require("../config.json");
const utils = require("../Utils/Utils.js");

module.exports = {
    memberjoin: function(member) {
        const guild = member.guild;
        const name = member.user.username;
        const type = "User Join"
        const date = new Date();
        const details = "User joined server."
        utils.logaction(guild, name, type, date, details);
    },

    memberleave: function(member) {
        const guild = member.guild;
        const name = member.user.username;
        const type = "User Leave"
        const date = new Date();
        const details = "User left server."
        utils.logaction(guild, name, type, date, details);
    },

    rolecreate: function(role) {
        const guild = role.guild;
        const name = "Role";
        const type = "Role Created";
        const details = role.name;
        const date = new Date();
        utils.logaction(guild, name, type, date, details);
    },

    roledelete: function(role) {
        const guild = role.guild;
        const name = "Role";
        const type = "Role Deleted";
        const details = role.name;
        const date = new Date();
        utils.logaction(guild, name, type, date, details);
    },

    msgdelete: function(msg) {
        const name = msg.author.username;
        const type = "Message Deleted";
        const details = msg.content;
        const date = new Date();
        utils.logaction(msg.guild, name, type, date, details);
    },

    
}