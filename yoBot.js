const Discord = require("discord.js");
const bot = new Discord.Client();
const { MessageEmbed } = require("discord.js");

const config = require("../yoBotNew/config.json");
const utils = require("../yoBotNew/Utils/Utils.js");

const actionlisteners = require("../yoBotNew/Listeners/ActionListeners.js");
const botjoinlistener = require("../yoBotNew/Listeners/BotJoinListener.js");

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
const tempban = require("../yoBotNew/Commands/TempbanCommand.js");
const { channeldelete } = require("../yoBotNew/Listeners/ActionListeners.js");

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
    bot.user.setActivity("https://github.com/Yochran/vCores", {type: "WATCHING"});
    let enableChannel = bot.channels.cache.get(config.EnableChannel);
    enableChannel.send(new MessageEmbed().setTitle("**yoBot**").setDescription("yoBot v2.0 by Yochran has enabled into " + guildsAmt + " servers").setFooter(footer).setColor(embedColor));
    console.log("[yoBot]: yoBot v2.0 by Yochran has successfully loaded.\n[yoBot]: Loading commands...");
    console.log("[yoBot]: Commands have loaded.");
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
        case "tempban":
            tempban.tempban(msg, args);
            break;
    }
})

// Logging actions

bot.on("guildMemberAdd", (member) => {
    actionlisteners.memberjoin(member);
})
bot.on("guildMemberRemove", (msg) => {
    actionlisteners.memberleave(msg);
})
bot.on("roleCreate", (role) => {
    actionlisteners.rolecreate(role);
})
bot.on("roleDelete", (role) => {
    actionlisteners.roledelete(role);
})
bot.on("messageDelete", (msg) => {
    actionlisteners.msgdelete(msg);
})

// Bot Join Listener
bot.on("guildMemberAdd", (member) => {
    if (member.user.id === bot.user.id) {
        botjoinlistener.botjoinlistener(member);
    }
})

bot.login(config.Token);