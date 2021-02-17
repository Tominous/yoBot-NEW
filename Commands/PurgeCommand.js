const Discord = require("discord.js");
const bot = new Discord.Client();
const { MessageEmbed } = require("discord.js");

const config = require("../config.json");
const utils = require("../Utils/Utils.js");

module.exports = {
    purge: function(msg, args) {
        if (!msg.member.hasPermission("MANAGE_MESSAGES")) return;
        if (args.length !== 1) {
            msg.delete(msg);
            utils.sendMessage(msg, "Incorrect Usage!", "```css\n^purge <amount>```");
        } else {
            const amount = args[0];
            if (amount > 100 || amount < 3) {
                msg.delete(msg);
                utils.sendMessage(msg, "Invalid Amount!", "(:x:) Invalid purge amount. (Must be greater than 3, lower than 100.)");
            } else {
                msg.delete(msg);
                msg.channel.bulkDelete(amount);
                setTimeout(() => {
                    utils.sendMessage(msg, "Purge", `(:white_check_mark:) **${amount}** messages successfully purged.`);
                }, 100);
                const date = new Date();
                const name = msg.author.username;
                utils.logpunishment(msg, name, "Purge", "N/A", "N/A", date);
            }
        }
    }
}