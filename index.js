const Discord = require('discord.js');
require('dotenv').config();

const { log } = require('./lib/log');
const { getCommands } = require('./commands');

const client = new Discord.Client();

getCommands();

client.on('ready', () => {
  log.emit(
    'log',
    `${client.user.tag} is ready with access to ${client.users.cache.size} users and ${client.guilds.cache.size} guilds.`,
  );
});

client.login(process.env.TOKEN);
