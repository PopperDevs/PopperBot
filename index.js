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

client.on('message', (message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith(process.env.PREFIX)) return;

  const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/g);
  const commandName = args.shift().toLowerCase();
  const command = getCommands().get(commandName);
  if (!command) return;

  command.handler({
    Discord,
    client,
    message,
    args,
  });
});

client.login(process.env.TOKEN);
