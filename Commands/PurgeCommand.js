const Utils = require("../Utils/Utils.js");

module.exports = {
    Execute: function(msg, args) {
        if (!msg.member.hasPermission("MANAGE_MESSAGES")) return;

        msg.delete(msg);

        if (args.length !== 1) {
            Utils.sendMessage(msg, "Incorrect Usage!", "```css\n^purge <amount>```");
            return;
        }

        const amount = args[0];

        if (amount > 100 || amount < 3) {
            Utils.sendMessage(msg, "Invalid Amount!", "(:x:) Invalid purge amount. (Must be greater than 3, lower than 100.)");
            return;
        }

        msg.channel.bulkDelete(amount);

        setTimeout(() => {
            Utils.sendMessage(msg, "Purge", `(:white_check_mark:) **${amount}** messages successfully purged.`);
        }, 100);

        Utils.logPunishment(msg, msg.member, "Purge", `__Amount:__ ${amount}`, "N/A", new Date());
    }
}