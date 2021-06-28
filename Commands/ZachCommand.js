const Utils = require("../Utils/Utils");

module.exports = {
    Execute: function(msg, args) {
        if (msg.guild.name.toLowerCase() !== "champons domain") return;

        if (msg.author.id === "375428524208685056") return;

        msg.delete(msg);

        if (args.length != 1) {
            Utils.sendMessage(msg, "Incorrect Usage!", "```yaml\n^zach <amount>\n```");
            return;
        }

        const amount = args[0];

        if (amount > 5000 || amount < 3) {
            Utils.sendMessage(msg, "Invalid Amount!", "(:x:) Invalid zach amount. (Must be greater than 3, lower than 5000.)");
            return;
        }

        msg.channel.messages.fetch({
            limit: 100
        }).then((messages) => { 
            const zachMessages = [];
            messages.filter(m => m.author.id === "375428524208685056").forEach(message => zachMessages.push(message))
            msg.channel.bulkDelete(zachMessages).then(() => {
                Utils.sendMessage(msg, "Zach", `(:white_check_mark:) ${args[0]} messages deleted from zach`);
            });
        })
    }
}