const Utils = require("../Utils/Utils.js");
const data = require("../data.json");

const fs = require("fs");

var reactMessage;

module.exports = {
    Execute: function(msg, args) {
        if (!msg.member.hasPermission("MANAGE_MESSAGES")) return;

        msg.delete(msg);

        if (args.length < 2) {
            Utils.sendMessage(msg, "Incorrect Usage!", "```yaml\n^giveaway <duration> <prize>\n```");
            return;
        }

        for (const giveaway in data.Giveaways) {
            if (data.Giveaways[giveaway].Active == true) {
                Utils.sendMessage(msg, "Giveaway", "(:x:) Cannot start giveaway (Other giveaway is active).");
                return;
            }
        }

        const time = Utils.parseTime(args[0].toLowerCase());
        const timeStr = Utils.getTimeStr(time * 1000);

        if (time * 1000 < 5000) {
            Utils.sendMessage(msg, "Giveaway", "(:x:) Giveaway duration must be greater than 5 seconds.");
            return;
        }

        var prize = "";
        for (var i = 1; i < args.length; i++) {
            if (prize.length === 0) {
                prize = args[i];
            } else {
                prize = prize + " " + args[i];
            }
        }

        const giveawayID = data.GiveawaysAmount + 1;
        const giveawayData = {
            Active: true,
            Prize: prize,
            Winner: "NOT_SELECTED",
            Entries: []
        }
        data.Giveaways[giveawayID] = giveawayData;
        data.GiveawaysAmount = giveawayID;

        fs.writeFileSync("data.json", JSON.stringify(data, null, 2), (err) => {
            if (err) Utils.logMessage("There was an error while writing to data.json. (GiveawayCommand.js, ln. 54)");
        });

        Utils.sendMessage(msg, "Giveaway:", `**A new giveaway has started!**\n\n__Prize__: ${prize}\n__Duration:__ ${timeStr}`);
        msg.channel.send("React to this message to enter!");

        setTimeout(() => {
            if (msg.channel.lastMessage.content === "React to this message to enter!") {
                msg.channel.lastMessage.react("✅");
                reactMessage = msg.channel.lastMessage;
            }
        }, 500);

        setTimeout(async() => {
            data.Giveaways[giveawayID].Active = false;
            var winner = "None";
            
            if (data.Giveaways[giveawayID].Entries.length < 1) {
                winner = data.Giveaways[giveawayID].Entries[0];
            } else {
                winner = data.Giveaways[giveawayID].Entries[Math.round(Math.random() * data.Giveaways[giveawayID].Entries.length)];
            }

            data.Giveaways[giveawayID].Winner = winner;

            fs.writeFileSync("data.json", JSON.stringify(data, null, 2), (err) => {
                if (err) Utils.logMessage("There was an error while writing to data.json. (yoBot.js, ln. 133)");
            });

            if (winner === "None") {
                Utils.sendMessage(msg, "Giveaway Over!", `**No one entered the giveaway.**`);
                return;
            }

            reactMessage.delete(reactMessage);

            Utils.sendMessage(msg, "Giveaway Over!", `**The giveaway has ended.**\n\n__Winner:__ <@${winner}>\n__Prize:__ ${prize}`);
        }, time * 1000);
    },

    ReactListener: function(reaction, member) {
        if (!reactMessage || reaction.message.id !== reactMessage.id || member.id === "758874553388236830") return;
    
        for (const giveaway in data.Giveaways) {
            if (data.Giveaways[giveaway].Active == true) {
                data.Giveaways[giveaway].Entries.push(member.id);

                fs.writeFileSync("data.json", JSON.stringify(data, null, 2), (err) => {
                    if (err) Utils.logMessage("There was an error while writing to data.json. (yoBot.js, ln. 133)");
                });
            }
        }
    }
}