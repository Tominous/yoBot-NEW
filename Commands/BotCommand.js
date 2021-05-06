const Utils = require("../Utils/Utils.js");

module.exports = {
    Execute: function(msg) {
        msg.delete(msg);

        const description = "**Bot Author:** Yochran\n**Bot Version:** 2.0\n\n**__Stats for nerds__:**\n\n**Language:** JavaScript (Node.JS/Discord.JS)\n**IDE Coded In:** Visual Studio Code";

        Utils.sendMessage(msg, "yoBot", description);
    }
}