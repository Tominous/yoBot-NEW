const Discord = require("discord.js");
const bot = new Discord.Client();
const { MessageEmbed } = require("discord.js");

const config = require("../yoBotNew/config.json");

const embedColor = config.EmbedColor;
const footer = config.Footer;

const help = require("../yoBotNew/Commands/HelpCommand.js");
const botcmd = require("../yoBotNew/Commands/BotCommand.js");
const userinfo = require("../yoBotNew/Commands/UserInfoCommand.js");
const serverinfo = require("../yoBotNew/Commands/ServerInfoCommand.js");
const say = require("../yoBotNew/Commands/SayCommand.js");
const bonk = require("../yoBotNew/Commands/BonkCommand.js");
const warn = require("../yoBotNew/Commands/WarnCommand.js");
const mute = require("../yoBotNew/Commands/MuteCommand.js");
const unmute = require("../yoBotNew/Commands/UnmuteCommand.js");
const kick = require("../yoBotNew/Commands/KickCommand.js");
const ban = require("../yoBotNew/Commands/BanCommand.js");
const tempmute = require("../yoBotNew/Commands/TempmuteCommand.js");

bot.once("ready", () => {
    console.log("[yoBot]: yoBot v2.0 by Yochran is loading...");
    const GuildMapping = config.GuildMapping;
    const ChannelMapping = config.ChannelMapping;
    console.log("[yoBot]: Guild Mapping: " + GuildMapping + "\n[yoBot]: Channel Mapping: " + ChannelMapping);
    let guildsAmt = 0;
    bot.guilds.cache.forEach((guild) => {
        guildsAmt++;
    });
    if (GuildMapping == "TRUE") { 
          
        if (ChannelMapping == "TRUE") {
            bot.guilds.cache.forEach((guild) => {
                const name = guild.name;
                const id = guild.id;
                console.log("Guild " + guildsAmt + ":\n - Name: " + name + "\n - ID: " + id);
                console.log(" Channels:");
                guild.channels.cache.forEach((channel) => {
                    const channelName = channel.name;
                    const channelId = channel.id;
                    console.log("  - " + channelName + "'s ID: " + channelId);
                });
            })
        } else if (ChannelMapping == "FALSE") {
            bot.guilds.cache.forEach((guild) => {
                const name = guild.name;
                const id = guild.id;
                console.log("Guild " + guildsAmt + ":\n - Name: " + name + "\n - ID: " + id);
            })
        } else {
            console.log("[yoBot]: Error in config.json: Invalid Boolean Value. (ChannelMapping)");
        }
    } else if (GuildMapping == "FALSE") {
    } else {
        console.log("[yoBot]: Error in config.json: Invalid Boolean Value. (GuildMapping)");
    }
    console.log("[yoBot]: Amount of Guilds: " + guildsAmt);
    bot.user.setStatus("dnd");
    bot.user.setActivity("Bot is under construction!", {type: "WATCHING"});
    let enableChannel = bot.channels.cache.get(config.EnableChannel);
    enableChannel.send(new MessageEmbed().setTitle("**yoBot**").setDescription("yoBot v2.0 by Yochran has enabled into " + guildsAmt + " servers").setFooter(footer).setColor(embedColor));
    console.log("[yoBot]: yoBot v2.0 by Yochran has successfully loaded.\n[yoBot] Loading commands...");
})

bot.on("message", (msg) => {
    if (!msg.content.startsWith(config.Prefix) || msg.author.bot) return;

    const args = msg.content.slice(1).trim().split(" ");
    const command = args.shift().toLowerCase();

    switch (command) {
        case "help":
            help.help(msg);
            break;
        case "bot":
            botcmd.bot(msg);
            break;
        case "userinfo":
        case "user":
            userinfo.userinfo(msg, args);
            break;
        case "serverinfo":
        case "server":
            serverinfo.serverinfo(msg);
            break;
        case "say":
            say.say(msg, args);
            break;
        case "bonk":
            bonk.bonk(msg, args);
            break;
        case "warn":
            warn.warn(msg, args);
            break;
        case "mute":
            mute.mute(msg, args);
            break;
        case "unmute":
            unmute.unmute(msg, args);
            break;
        case "kick":
            kick.kick(msg, args);
            break;
        case "ban":
            ban.ban(msg, args);
            break;
        case "tempmute":
            tempmute.tempmute(msg, args);
            break;
    }
})

function convertTime(ms) {
    const days = Math.floor(ms / (24 * 60 * 60 * 1000))
    const daysms = ms % (24 * 60 * 60 * 1000)
    const hours = Math.floor((daysms) / (60*60*1000))
    const hoursms = ms % (60 * 60 * 1000)
    const minutes = Math.floor((hoursms) / (60 * 1000))
    const minutesms = ms % (60 * 1000)
    const sec = Math.floor((minutesms) / (1000))
    let time = ""
    if (days > 0) {
        time = time + days + "d "
    }
    if (hours > 0) {
        time = time + hours + "h "
    }
    if (minutes > 0) {
        time = time + minutes + "m "
    }
    if (sec > 0) {
        time = time + sec + "s"
    }
    return time
}

bot.login(config.Token);