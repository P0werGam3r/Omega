const discord = require("discord.js");

module.exports = {
    name: "kick",
    run: async (client, message, args) => {
        const config = require("../configs/config.json");
        const channel = client.channels.cache.get(config.log_channel);

        const member = message.mentions.members.first();
        if(!message.member.hasPermission("KICK_MEMBERS")) {
            return message.reply(`You don't have the right permission to do this!`)
          }
        if(!message.guild.me.hasPermission("KICK_MEMBERS")) {
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

        .setTitle("Kick")
        .setDescription(`kicked ${member} (${member.id}) \n Kicked by ${message.author.username} \n **Reason:** ${args[1]}`)
        .setColor("#ff2050")
        .setTimestamp()
        message.channel.send(kick)
        member.kick(args[1]);


        if(!config.log_channel) {
            console.log("no log channel given in the config.json")
        }
        let kickLog = new discord.MessageEmbed()

        .setTitle("Log: Kick")
        .setDescription(`kicked ${member} (${member.id}) \n Kicked by ${message.author.username} \n **Reason:** ${args[1]}`)
        .setColor("#ff2050")
        .setTimestamp()
        channel.send(kickLog)
    }
}