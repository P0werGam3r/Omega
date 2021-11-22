const discord = require("discord.js");

module.exports = {
    
	name: 'message',
	execute(message, client) {
        const config = require("../configs/config.json");

        const active = new Map();

        var prefix = config.prefix;
        var messageArray = message.content.split(" ");
        var command = messageArray[0];
        let args = messageArray.slice(1);
    
    
      if (message.author.bot) return;
      if (message.channel.type === "dm") return;
      if (message.content.charAt(0) != prefix) {
        return;
      }
    
      let commandfile = client.commands.get(command.slice(prefix.length));
      var options = {
        active: active
      }
    
      if (commandfile) commandfile.run(client, message, args, options); 
	},
};