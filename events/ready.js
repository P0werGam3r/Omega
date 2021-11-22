const moment = require("moment");


module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		
        const config = require("../configs/config.json");

        
        client.user.setActivity(`${config.activity}`, { type: `${config.activity_type}` });
        console.log(`-- ${moment().utc().format('MMMM Do')}, ${moment().utc().format('hh:mm a')} --`);
        console.log('')
        console.log(`${client.user.username} is online.`);
        console.log('Made by: P0werGam3r and MikeDeveloperElectroDevelopment2021')
        console.log(`Dashboard launched on port ${config.port} - ${config.baseUrl}${config.port === 80 ? '' : ':' + config.port}`);
        console.log('')
        console.log('------------------------------')
	},
};