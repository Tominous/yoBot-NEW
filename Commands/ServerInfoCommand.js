const Utils = require("../Utils/Utils.js");

module.exports = {
    Execute: function(msg) {        
        msg.delete(msg);

        let members = 0;
        msg.guild.members.cache.forEach((member) => {
            members++;
        });

        const createdAt = `${msg.guild.createdAt.getMonth()}/${msg.guild.createdAt.getDay()}/${msg.guild.createdAt.getFullYear()}`

        Utils.sendMessage(msg, "Server Info", `**Created:** ${createdAt}\n**Owner:** <@${msg.guild.ownerID}>\n**Members:** ${members}`);
    }
}