const MCNames = require("mc-names");
const { MessageEmbed } = require("discord.js");
const config = require("../config.json");
const Utils = require("../Utils/Utils.js");

module.exports = {
    Execute: async function(msg, args) {
        msg.delete(msg);

        if (args.length !== 1) {
            Utils.sendMessage(msg, "Incorrect Usage!", "```yaml\n^minecraft <username>\n```");
            return;
        }

        const history = await MCNames.getNameHistory(args[0]);

        if (!history) {
            Utils.sendMessage(msg, "Minecraft", "(:x:) Invalid Account.");
            return;
        }

        const names = history.toPages(30, "$username - `$date`");

        const embed = new MessageEmbed()
        .setTitle(`${args[0]}'s Name History`)
        .setDescription(names.get(1).join("\n"))
        .setURL("https://namemc.com/profile/" + args[0])
        .setThumbnail(`https://mc-heads.net/avatar/${history.uuid}/256`)
        .setFooter("https://github.com/Yochran", "https://avatars.githubusercontent.com/u/71285258?v=4")
        .setColor(config.EmbedColor)
        .setAuthor(msg.author.username, msg.author.displayAvatarURL())
        .setTimestamp();

        msg.channel.send(embed);
    }
}