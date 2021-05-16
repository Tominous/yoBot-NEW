const MCNames = require("mc-names");
const Utils = require("../Utils/Utils.js");

module.exports = {
    Execute: async function(msg, args) {
        msg.delete(msg);

        if (args.length !== 1) {
            Utils.sendMessage(msg, "Invalid Usage!", "```yaml\n^minecraft <username>\n```");
            return;
        }

        const username = args[0];
        const history = await MCNames.getNameHistory(username);

        if (!history) {
            Utils.sendMessage(msg, "Minecraft", "(:x:) Invalid Account.");
            return;
        }

        const playerHead = `https://mc-heads.net/avatar/${history.uuid}/256`;
        const names = history.toPages(30, "$username - `$date`");

        Utils.sendMessage(msg, `${username}'s Name History`, names.get(1).join("\n"));
    }
}