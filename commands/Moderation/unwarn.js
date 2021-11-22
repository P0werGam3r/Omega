const discord = require("discord.js");
const db = require("quick.db")

module.exports = {
    name: "unwarn",
    run: async (client, message, args) => {
        const config = require("../configs/config.json");
        const channel = client.channels.cache.get(config.log_channel);

        const member = message.mentions.members.first();
  
        if(!message.member.hasPermission("KICK_MEMBERS")) {
            return message.reply(`You don't have the right permission to do this!`)
          }
        if(!message.guild.me.hasPermission("KICK_MEMBERS")) {
            return message.reply(`I do not have the right permissions to unwarn!`)
        }
        if(!member) {
            return message.reply(`Please mention the person who you want to unwarn`);
         }

        if(member.id === message.author.id) {
            return message.reply(`Unwaring yourself is not an option`);
        }

          


          db.delete(`warnings_${message.guild.id}_${member.id}`)
          let warnings = db.get(`warnings_${message.guild.id}_${member.id}`)

          if(warnings === null) {
           warnings = 0 
          }
        
          let warn = new discord.MessageEmbed()

          .setTitle("Unwarn")
          .setDescription(`Unwarned ${member} (${member.id}) \n Unwarned by ${message.author.username} \n Warns: **${warnings}**`)
          .setColor(config.color_good)
          .setTimestamp()

         message.channel.send(warn);
        
       
        if(!config.log_channel) {
            console.log("no log channel given in the config.json")
        }
        let kickLog = new discord.MessageEmbed()

        .setTitle("Log: Unwarn")
        .setDescription(`Unwarned ${member} (${member.id}) \n Unwarned by ${message.author.username} \n Warns left: **${warnings}**`)
        .setColor(config.color_good)
        .setTimestamp()
        channel.send(kickLog)
    }
}