const Discord = require('discord.js');
require('dotenv').config();

const { log } = require('./lib/log');

const client = new Discord.Client();
// const prefix = '!';

client.on('ready', () => {
  log.emit(
    'log',
    `${client.user.tag} is ready with access to ${client.users.cache.size} users and ${client.guilds.cache.size} guilds.`,
  );
});

client.login(process.env.TOKEN);
