const { Client, Intents, discord, Collection } = require('discord.js')
const config = require("./configs/config.json");
const moment = require("moment");
const fs = require("fs");


const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
client.commands = new Collection();

client.login(config.token);


fs.readdir("./commands/", (err, files) => {

  if (err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if (jsfile.length <= 0) {
    console.log("[LOG] Can't find the commands map!");
    return;
  }S

  jsfile.forEach((f, i) => {
    let props = require(`./commands/${f}`);
    console.log(`[LOG] ${f} was loaded!`);
    client.commands.set(props.name, props);
  });
});

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
    console.log(`[LOG] ${file} event was loaded`)
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args, client));
	} else {
		client.on(event.name, (...args) => event.execute(...args, client));
	}
}


