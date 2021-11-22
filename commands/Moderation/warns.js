const discord = require("discord.js");
const db = require("quick.db")

module.exports = {
    name: "warns",
    run: async (client, message, args) => {
        const config = require("../configs/config.json");
        const channel = client.channels.cache.get(config.log_channel);

        const member = message.mentions.members.first();
  
        if(!message.member.hasPermission("KICK_MEMBERS")) {
            return message.reply(`You don't have the right permission to do this!`)
          }
        if(!message.guild.me.hasPermission("KICK_MEMBERS")) {
            return message.reply(`I do not have the right permissions to see warns!`)
        }
        if(!member) {
            return message.reply(`Pls mention someone to see their warns`);
         }

  
          let warnings = db.get(`warnings_${message.guild.id}_${member.id}`)

          if(warnings === null) {
           warnings = 0 
          }
        
          let warn = new discord.MessageEmbed()


          .setDescription(`Warns: **${warnings}**`)
          .setColor(config.color_normal)


         message.channel.send(warn);
        
    }
}