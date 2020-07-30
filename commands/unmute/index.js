const { permissionType, guildPermissionType, commandType } = require('../../lib/permissions');
const { getUser, getRole } = require('../../lib/utils');

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
    && author.roles.highest.comparePositionTo(member.roles.highest) > 0
    && (
      author === member.guild.owner
      || !member.permissions.has(guildPermissionType.MANAGE_MESSAGES)
    )
  );
}

module.exports = {
  name: 'unmute',
  aliases: ['demute'],
  type: commandType.mod.name,
  permissions: permissionType.mod,
  guildPermissions: [guildPermissionType.MANAGE_MESSAGES],
  template: 'unmute <@User/@Role>',
  async handler({ client, message, args }) {
    if (!message.guild) {
      message.channel.send('This command can only be used in a guild.');
    } else if (args.length > 0) {
      const mutedRole = await setMutedRole(message.guild);
      if (await getUser(message, args[0])) {
        const member = await message.guild.members.fetch(await getUser(message, args[0]));
        if (!member.roles.cache.has(mutedRole.id)) {
          message.channel.send(`The member ${member} is not muted.`);
        } else if (!isManageable(member, message.member)) {
          message.reply('you are not allowed to unmute this member.');
        } else {
          const unMutedMember = await member.roles.remove(mutedRole, `Unmuted by ${client.user.tag}.`);
          message.channel.send(`Member ${unMutedMember} got unmuted.`);
        }
      } else if (await getRole(message, args[0])) {
        const role = await getRole(message, args[0]);
        if (message.author !== role.guild.owner
          && message.member.roles.highest.comparePositionTo(role) < 1) {
          message.reply('you are not allowed to unmute the members with this role.');
        } else {
          role.members.forEach(async (member) => {
            await member.roles.remove(mutedRole, `Unmuted by ${client.user.tag}.`);
          });
          message.channel.send(`All the members with the role ${role} got unmuted.`);
        }
      }
    } else {
      message.channel.send(`You need to specify a @User or a @Role. Correct usage of this command : \`${process.env.PREFIX}${this.template}\``);
    }
  },
};
