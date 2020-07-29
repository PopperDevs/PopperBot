const { permissionType, guildPermissionType, commandType } = require('../../lib/permissions');
const { parseTime, getUser, getRole } = require('../../lib/utils');

async function createMutedRole(guild) {
  let role = guild.roles.cache.find((r) => r.name === 'Muted');
  if (!role) {
    role = await guild.roles.create({
      data: {
        name: 'Muted',
        color: 0,
        permissions: 0,
        mentionable: 0,
      },
    });
  }
  return role;
}

async function setMutedRole(guild) {
  const role = await createMutedRole(guild);
  guild.channels.cache.forEach(async (channel) => {
    await channel.createOverwrite(role, {
      SEND_MESSAGES: false,
      ADD_REACTIONS: false,
    });
  });
  return role;
}

function isManageable(member, author) {
  return (
    member !== member.guild.owner
    && (
      author === member.guild.owner
      || !member.permissions.has(guildPermissionType.MANAGE_MESSAGES)
      || author.roles.highest.comparePositionTo(member.roles.highest) > 0
    )
  );
}

module.exports = {
  name: 'mute',
  aliases: ['silence', 'shut'],
  type: commandType.mod.name,
  permissions: permissionType.mod,
  guildPermissions: [guildPermissionType.MANAGE_MESSAGES],
  template: 'mute <@User/@Role> [duration in minutes] [reason]',
  async handler({ client, message, args }) {
    if (!message.guild) {
      message.channel.send('This command can only be used in a guild.');
    } else if (args.length > 0) {
      const mutedRole = await setMutedRole(message.guild);
      if (await getUser(message, args[0])) {
        const member = await message.guild.members.fetch(await getUser(message, args[0]));
        if (member.roles.cache.has(mutedRole.id)) {
          message.channel.send(`The member ${member} is already muted.`);
        } else if (!isManageable(member, message.member)) {
          message.reply('you are not allowed to mute this member.');
        } else {
          const mutedMember = await member.roles.add(mutedRole, `Muted by ${client.user.tag}${args.length > 1 && parseTime(args[1]) ? ` for about ${parseTime(args[1]).parsed}` : ''}${args.length > (args.length > 1 && parseTime(args[1]) ? 2 : 1) ? ` for the following reason : ${args.slice(parseTime(args[1]) ? 2 : 1).join(' ')}` : ''}.`);
          message.channel.send(`Member ${mutedMember} got muted${args.length > 1 && parseTime(args[1]) ? ` for about ${parseTime(args[1]).parsed}` : ''}${args.length > (args.length > 1 && parseTime(args[1]) ? 2 : 1) ? ` for the following reason : ${args.slice(parseTime(args[1]) ? 2 : 1).join(' ')}` : ''}.`);
          if (args.length > 1 && parseTime(args[1])) {
            setTimeout(() => mutedMember.roles.remove(mutedRole, `Unmuted by ${client.user.tag} after ${parseTime(args[1]).parsed}`), parseTime(args[1]).millis);
          }
        }
      } else if (await getRole(message, args[0])) {
        const role = await getRole(message, args[0]);
        console.log(role);
        if (message.author !== role.guild.owner
          && message.member.roles.highest.comparePositionTo(role) < 1) {
          message.reply('you are not allowed to mute the members with this role.');
        } else {
          role.members.forEach(async (member) => {
            await member.roles.add(mutedRole, `Muted by ${client.user.tag}${args.length > 1 ? ` for about ${parseTime(args[1]).parsed}` : ''}${args.length > 2 ? ` for the following reason : ${args.slice(2).join(' ')}` : ''}.`);
            if (args.length > 1) {
              setTimeout(() => member.roles.remove(mutedRole, `Unmuted by ${client.user.tag} after ${parseTime(args[1]).parsed}`), parseTime(args[1]).millis);
            }
          });
          message.channel.send(`All the members with the role ${role} got muted${args.length > 1 ? ` for about ${parseTime(args[1]).parsed}` : ''}${args.length > 2 ? ` for the following reason : ${args.slice(2).join(' ')}` : ''}.`);
        }
      }
    } else {
      message.channel.send(`You need to specify at least a @User or a @Role. Correct usage of this command : \`${process.env.PREFIX}${this.template}\``);
    }
  },
};
