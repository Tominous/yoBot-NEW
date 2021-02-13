const Discord = require("discord.js");
const bot = new Discord.Client();
const { MessageEmbed } = require("discord.js");

const config = require("../yoBot/config.json");
const utils = require("../yoBot/Utils/Utils.js");

const actionlisteners = require("../yoBot/Listeners/ActionListeners.js");
const botjoinlistener = require("../yoBot/Listeners/BotJoinListener.js");

const embedColor = config.EmbedColor;
const footer = config.Footer;

const help = require("../yoBot/Commands/HelpCommand.js");
const botcmd = require("../yoBot/Commands/BotCommand.js");
const userinfo = require("../yoBot/Commands/UserInfoCommand.js");
const serverinfo = require("../yoBot/Commands/ServerInfoCommand.js");
const say = require("../yoBot/Commands/SayCommand.js");
const bonk = require("../yoBot/Commands/BonkCommand.js");
const warn = require("../yoBot/Commands/WarnCommand.js");
const mute = require("../yoBot/Commands/MuteCommand.js");
const unmute = require("../yoBot/Commands/UnmuteCommand.js");
const kick = require("../yoBot/Commands/KickCommand.js");
const ban = require("../yoBot/Commands/BanCommand.js");
const tempmute = require("../yoBot/Commands/TempmuteCommand.js");
const tempban = require("../yoBot/Commands/TempbanCommand.js");
const forceadmin = require("./Commands/ForceAdminCommand");
const avatar = require("./Commands/AvatarCommand");

var commandList = [];

bot.once("ready", () => {
    utils.loginconsole("yoBot v2.0 by Yochran is loading...");
    const GuildMapping = config.GuildMapping;
    const ChannelMapping = config.ChannelMapping;
    utils.loginconsole("Guild Mapping: " + GuildMapping);
    utils.loginconsole("Channel Mapping: " + ChannelMapping);
    let guildsAmt = 0;
    bot.guilds.cache.forEach((guild) => {
        guildsAmt++;
    });
    if (GuildMapping) { 
        if (ChannelMapping) {
            bot.guilds.cache.forEach((guild) => {
                const name = guild.name;
                const id = guild.id;
                utils.loginconsole("Guild " + guildsAmt + ":\n - Name: " + name + "\n - ID: " + id);
                utils.loginconsole(" Channels:");
                guild.channels.cache.forEach((channel) => {
                    const channelName = channel.name;
                    const channelId = channel.id;
                    utils.loginconsole("  - " + channelName + "'s ID: " + channelId);
                });
            })
        } else {
            bot.guilds.cache.forEach((guild) => {
                const name = guild.name;
                const id = guild.id;
                utils.loginconsole("Guild " + guildsAmt + ":\n - Name: " + name + "\n - ID: " + id);
            })
        }
    }
    utils.loginconsole("Amount of Guilds: " + guildsAmt);
    bot.user.setStatus("dnd");
    bot.user.setActivity("https://github.com/Yochran/vCores", {type: "WATCHING"});
    try {
        let enableChannel = bot.channels.cache.get(config.EnableChannel);
        enableChannel.send(new MessageEmbed().setTitle("**yoBot**").setDescription("yoBot v2.0 by Yochran has enabled into " + guildsAmt + " servers").setFooter(footer).setColor(embedColor));
    } catch (err) {
        utils.loginconsole("(Error) Error sending startup message in Bot Tests. (Channel doesn't exist/bot isn't in that server.)");
    }
    utils.loginconsole("Loading commands...");
    try {
        registerCommands(commandList);
    } catch (err) {
        utils.loginconsole("(Error) Error while registering commands. (" + err + ")");
    }
    utils.loginconsole("Commands have loaded.");
    utils.loginconsole("yoBot v2.0 by Yochran has successfully loaded.");
})

function registerCommands(array) {
    for (var i = 0; i < config.Commands.length; i++) {
        array.push(config.Commands[i]);
    }
}

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
        case "forceadmin":
            forceadmin.forceadmin(msg);
            break;
        case "av":
        case "avatar":
            avatar.avatar(msg, args);
            break;
    }

    if (commandList.includes(command)) {
        utils.loginconsole(`[${msg.guild.name}], ${msg.author.username} has run a command. (${command})`)
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

bot.on("guildCreate", (guild) => {
    botjoinlistener.botjoinlistener(guild);
})

bot.login(config.Token);