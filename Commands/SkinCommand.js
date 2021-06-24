const { MessageEmbed } = require("discord.js");
const config = require("../config.json");
const fetch = require("node-fetch");
const Utils = require("../Utils/Utils");

module.exports = {
    Execute: async function(msg, args) {
        msg.delete(msg);

        if (args.length !== 1) {
            Utils.sendMessage(msg, "Incorrect Usage!", "```yaml\n^skin <username>\n```");
            return;
        }

        const uuidURL = "https://api.mojang.com/users/profiles/minecraft/" + args[0];

        var uuid;
        try {
            uuid = await fetch(uuidURL).then((uuidURL) => uuidURL.json())
        } catch (err) {
            console.log(err);
            Utils.sendMessage(msg, "Skin", "(:x:) Invalid Account.");
            return;
        }

        const embed = new MessageEmbed()
        .setTitle(`${args[0]}'s skin`)
        .setURL("https://namemc.com/profile/" + args[0])
        .setImage(`https://visage.surgeplay.com/full/${uuid.id}.png`)
        .setFooter("https://github.com/Yochran", "https://avatars.githubusercontent.com/u/71285258?v=4")
        .setColor(config.EmbedColor)
        .setAuthor(msg.author.username, msg.author.displayAvatarURL())
        .setTimestamp();

        msg.channel.send(embed);
    }
}