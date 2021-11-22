const discord = require("discord.js");

module.exports = {
    name: "unban",
    run: async (client, message, args) => {
        const config = require("../configs/config.json");
        const channel = client.channels.cache.get(config.log_channel);

        
        if(!message.member.hasPermission("BAN_MEMBERS")) {
            return message.reply(`You don't have the right permission to do this!`)
          }
        if(!message.guild.me.hasPermission("BAN_MEMBERS")) {
            return message.reply(`I do not have the right permissions to kick!`)
        }
        if(!args[0]) {
            return message.reply(`Please give the id of the person to unban`);
         }
        let kick = new discord.MessageEmbed()

        .setTitle("unban")
        .setDescription(`Unbanned <@${args[0]}> \n Banned by ${message.author.username}`)
        .setColor("#34dc00")
        .setTimestamp()
        message.channel.send(kick)
        message.guild.members.unban(args[0]);


        if(!config.log_channel) {
            console.log("no log channel given in the config.json")
        }
        let kickLog = new discord.MessageEmbed()

        .setTitle("Log: Unban")
        .setDescription(`Unbanned ${args[0]} \n Unbanned by ${message.author.username}`)
        .setColor("#34dc00")
        .setTimestamp()
        channel.send(kickLog)
    }
}