const discord = require("discord.js");

module.exports = {
    name: "ban",
    run: async (client, message, args) => {
        const config = require("../../configs/config.json");
        const channel = client.channels.cache.get(config.log_channel);

        const member = message.mentions.members.first();
        if(!message.member.hasPermission("BAN_MEMBERS")) {
            return message.reply(`You don't have the right permission to do this!`)
          }
        if(!message.guild.me.hasPermission("BAN_MEMBERS")) {
            return message.reply(`I do not have the right permissions to kick!`)
        }
        if(!member) {
            return message.reply(`Please mention the person who you want to kick`);
         }
        if(!args[1]){
            return message.reply("Please give a reason");
        }
        if(member.id === message.author.id) {
            return message.reply(`Kicking yourself is not an option`);
        }
        let kick = new discord.MessageEmbed()

        .setTitle("Ban")
        .setDescription(`Banned ${member} (${member.id}) \n Banned by ${message.author.username} \n **Reason:** ${args[1]}`)
        .setColor("#ff2050")
        .setTimestamp()
        message.channel.send(kick)
        member.ban(member);


        if(!config.log_channel) {
            console.log("no log channel given in the config.json")
        }
        let kickLog = new discord.MessageEmbed()

        .setTitle("Log: Ban")
        .setDescription(`Banned ${member} (${member.id}) \n Banned by ${message.author.username} \n **Reason:** ${args[1]}`)
        .setColor("#ff2050")
        .setTimestamp()
        channel.send(kickLog)
    }
}