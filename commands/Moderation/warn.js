const discord = require("discord.js");
const db = require("quick.db")

module.exports = {
    name: "warn",
    run: async (client, message, args) => {
        const config = require("../configs/config.json");
        const channel = client.channels.cache.get(config.log_channel);

        const member = message.mentions.members.first();
        const reason = args.slice(1).join(" ")

        if(!message.member.hasPermission("KICK_MEMBERS")) {
            return message.reply(`You don't have the right permission to do this!`)
          }
        if(!message.guild.me.hasPermission("KICK_MEMBERS")) {
            return message.reply(`I do not have the right permissions to warn!`)
        }
        if(!member) {
            return message.reply(`Please mention the person who you want to warn`);
         }
        if(!reason){
            return message.reply("Please give a reason");
        }
        if(member.id === message.author.id) {
            return message.reply(`Waring yourself is not an option`);
        }

        let warnings = db.get(`warnings_${message.guild.id}_${member.id}`)

        if(warnings === 3) {
            return message.channel.send(`${message.mentions.users.first().username} Already have 3 warnings!`)
          }

          let warn = new discord.MessageEmbed()

          .setTitle("Warn")
          .setDescription(`Warned ${member} (${member.id}) \n Warned by ${message.author.username} \n **Reason:** ${reason}`)
          .setColor(config.color_bad)
          .setTimestamp()

          if(warnings === null) {
            db.set(`warnings_${message.guild.id}_${member.id}`, 1)
            await message.channel.send(warn)
         } else if(warnings !== null) {
               db.add(`warnings_${message.guild.id}_${member.id}`, 1)
              await message.channel.send(warn)
             }   
        
       
        if(!config.log_channel) {
            console.log("no log channel given in the config.json")
        }
        let kickLog = new discord.MessageEmbed()

        .setTitle("Log: Warn")
        .setDescription(`Warned ${member} (${member.id}) \n Warned by ${message.author.username} \n **Reason:** ${reason}`)
        .setColor(config.color_bad)
        .setTimestamp()
        channel.send(kickLog)
    }
}