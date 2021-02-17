const Discord = require("discord.js");
const bot = new Discord.Client();

const config = require("../config.json");
const utils = require("../Utils/Utils.js");

function getTime() {
    const month = new Date().getMonth();
    const day = new Date().getDay();
    const year = new Date().getFullYear();

    const minute = new Date().getMinutes();
    const hour = new Date().getHours();

    const time = month + "/" + day + "/" + year + ", " + hour + ":" + minute;

    return time;
}

module.exports = {
    memberjoin: function(member) {
        const guild = member.guild;
        const name = member.user.username;
        const type = "Member Joined"
        const date = getTime();
        const details = "User joined server."
        utils.logaction(guild, name, type, date, details);
    },

    memberleave: function(member) {
        const guild = member.guild;
        const name = member.user.username;
        const type = "Member Leave"
        const date = getTime();
        const details = "User left server."
        utils.logaction(guild, name, type, date, details);
    },

    rolecreate: function(role) {
        const guild = role.guild;
        const name = "Server Roles";
        const type = "Role Created";
        const details = "**Role:** " + role.name;
        const date = getTime();
        utils.logaction(guild, name, type, date, details);
    },

    roledelete: function(role) {
        const guild = role.guild;
        const name = "Server Roles";
        const type = "Role Deleted";
        const details = "**Role:** " + role.name;
        const date = getTime();
        utils.logaction(guild, name, type, date, details);
    },

    msgdelete: function(msg) {
        const name = msg.author.username;
        const type = "Message Deleted";
        const details = "**Content:** " + msg.content;
        const date = getTime();
        utils.logaction(msg.guild, name, type, date, details);
    },

    bulkdelete: function(msg) {
        const guild = msg.guild;
        const name = "Bulk Delete";
        const type = "Mass Delete";
        const details = "**Messages Deleted:** " + msg.size;
        const date = getTime();
        utils.logaction(guild, name, type, date, details);
    }
}