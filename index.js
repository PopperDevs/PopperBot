const Discord = require('discord.js');
require('dotenv').config();

const { log } = require('./lib/log');
const { getCommands } = require('./commands');
const { hasPermission } = require('./lib/utils');
const { unAuthorizedCommand } = require('./lib/responseHandler');

const client = new Discord.Client();

getCommands();

client.on('ready', () => {
  log.emit(
    'log',
    `${client.user.tag} is ready with access to ${client.users.cache.size} user${client.users.cache.size > 1
      ? 's'
      : ''} and ${client.guilds.cache.size} guild${client.guilds.cache.size > 1
      ? 's'
      : ''}.`,
  );
});

client.on('message', (message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith(process.env.PREFIX)) return;

  const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/g);
  const commandName = args.shift().toLowerCase();
  const command = getCommands().get(commandName);
  if (!command) return;
  if (hasPermission({ author: message.author, member: message.member }, command)) {
    command.handler({
      Discord,
      client,
      message,
      args,
    });
  } else {
    unAuthorizedCommand(Discord, message, command);
  }
});

client.login(process.env.TOKEN);
