const Discord = require("discord.js");
const bot = new Discord.Client();

const config = require("../yoBot/config.json");
const Utils = require("../yoBot/Utils/Utils.js");

const HelpCommand = require("../yoBot/Commands/HelpCommand.js");
const BotCommand = require("../yoBot/Commands/BotCommand.js");
const UserInfoCommand = require("../yoBot/Commands/UserInfoCommand.js");
const ServerInfoCommand = require("../yoBot/Commands/ServerInfoCommand.js");
const SayCommand = require("../yoBot/Commands/SayCommand.js");
const BonkCommand = require("../yoBot/Commands/BonkCommand.js");
const WarnCommand = require("../yoBot/Commands/WarnCommand.js");
const MuteCommand = require("../yoBot/Commands/MuteCommand.js");
const UnmuteCommand = require("../yoBot/Commands/UnmuteCommand.js");
const KickCommand = require("../yoBot/Commands/KickCommand.js");
const BanCommand = require("../yoBot/Commands/BanCommand.js");
const TempmuteCommand = require("../yoBot/Commands/TempmuteCommand.js");
const TempbanCommand = require("../yoBot/Commands/TempbanCommand.js");
const AvatarCommand = require("./Commands/AvatarCommand.js");
const PollCommand = require("../yoBot/Commands/PollCommand.js");
const PurgeCommand = require("./Commands/PurgeCommand.js");
const PingCommand = require("./Commands/PingCommand.js");
const AnnounceCommand = require("./Commands/AnnounceCommand");
const SetPunishmentsChannel = require("./Commands/SetPunishmentsChannel");
const GiveawayCommand = require("./Commands/GiveawayCommand");
const MinecraftCommand = require("./Commands/MinecraftCommand");
const SkinCommand = require("./Commands/SkinCommand");
const ZachCommand = require("./Commands/ZachCommand");

bot.once("ready", () => {
    Utils.logMessage("yoBot v2.0 by Yochran is loading...");

    bot.user.setStatus("dnd");

    bot.user.setActivity("The Gospel.", {type: "LISTENING"});

    setInterval(() => {
        bot.user.setActivity("The Gospel.", {type: "LISTENING"});
    }, 5000 * 60);

    Utils.logMessage("yoBot v2.0 by Yochran has successfully loaded.");
})

bot.on("message", (msg) => {
    if (msg.author.bot) return;

    if (!msg.guild) {
        Utils.logMessage(`Received new DM from ${msg.author.tag}: "${msg.content}"`);
        return;
    }

    if (msg.content.startsWith(config.Prefix)) {
        const args = msg.content.slice(1).trim().split(" ");
        const command = args.shift().toLowerCase();
    
        switch (command) {
            case "help":
                HelpCommand.Execute(msg);
                break;
            case "bot":
                BotCommand.Execute(msg);
                break;
            case "userinfo":
            case "user":
                UserInfoCommand.Execute(msg, args);
                break;
            case "serverinfo":
            case "server":
                ServerInfoCommand.Execute(msg);
                break;
            case "say":
                SayCommand.Execute(msg, args);
                break;
            case "bonk":
                BonkCommand.Execute(msg, args);
                break;
            case "warn":
                WarnCommand.Execute(msg, args);
                break;
            case "mute":
                MuteCommand.Execute(msg, args);
                break;
            case "unmute":
                UnmuteCommand.Execute(msg, args);
                break;
            case "kick":
                KickCommand.Execute(msg, args);
                break;
            case "ban":
                BanCommand.Execute(msg, args);
                break;
            case "tempmute":
                TempmuteCommand.Execute(msg, args);
                break;
            case "tempban":
                TempbanCommand.Execute(msg, args);
                break;
            case "av":
            case "avatar":
                AvatarCommand.Execute(msg, args);
                break;
            case "poll":
                PollCommand.Execute(msg, args);
                break;
            case "clear":
            case "purge":
                PurgeCommand.Execute(msg, args);
                break;
            case "ping":
                PingCommand.Execute(msg);
                break;
            case "announce":
                AnnounceCommand.Execute(msg, args);
                break;
            case "setpunishments":
            case "spc":
            case "setpunishmentschannel":
                SetPunishmentsChannel.Execute(msg);
                break;
            case "giveaway":
                GiveawayCommand.Execute(msg, args);
                break;
            case "mc":
            case "minecraft":
                MinecraftCommand.Execute(msg, args);
                break;
            case "skin":
                SkinCommand.Execute(msg, args);
                break;
            case "zach":
            case "badzach":
            case "senix":
                ZachCommand.Execute(msg, args);
                break;
        }
    
        if (config.Commands.includes(command)) {
            Utils.logMessage(`[${msg.guild.name}], ${msg.author.username} has run a command. (${command})`);
        }
    } else {
        if (!msg.mentions.members.first() || msg.mentions.members.first().id !== bot.user.id) return;

        const content = msg.content.replace("<@!758874553388236830> ", "");

        if (content.toLowerCase().includes("what are you") || content.toLowerCase().includes("who are you")) {
            msg.channel.send("I am yoBot, Yochran's personal servant, and your servant too.");
            return;
        }

        if (content.toLowerCase().includes("what do you do") || content.toLowerCase().includes("what do u do")) {
            msg.channel.send("Run `^help` to see the my guide.");
            return;
        }

        if (content.toLowerCase().includes("source code") || content.toLowerCase().includes("src") || content.toLowerCase().includes("code")) {
            msg.channel.send("View it here: https://github.com/Yochran/yoBot-NEW");
            return;
        }

        if (content.toLowerCase().includes("fuck you") ||content.toLowerCase().includes("fuck u") || content.toLowerCase().includes("i hate you") || content.toLowerCase().includes("i hate u")) {
            msg.channel.send(":(");
            return;
        }
    }
});

bot.on("messageReactionAdd", (reaction, member) => {
    GiveawayCommand.ReactListener(reaction, member);
})

bot.login(config.Token);