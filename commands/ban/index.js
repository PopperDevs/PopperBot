const { permissionType, guildPermissionType, commandType } = require('../../lib/permissions');
const { getUser, getRole } = require('../../lib/utils');

function isManageable(member, author) {
  return (
    member !== member.guild.owner
    && author.roles.highest.comparePositionTo(member.roles.highest) > 0
    && (
      author === member.guild.owner
      || !member.permissions.has(guildPermissionType.BAN_MEMBERS)
    )
  );
}

module.exports = {
  name: 'ban',
  type: commandType.mod.name,
  permissions: permissionType.mod,
  guildPermissions: [guildPermissionType.BAN_MEMBERS],
  template: 'ban <@User/@Role> [reason]',
  async handler({ client, message, args }) {
    if (!message.guild) {
      message.channel.send('This command can only be used in a guild.');
      return;
    }
    if (args.length > 0) {
      if (await getUser(message, args[0])) {
        const member = await message.guild.members.fetch(await getUser(message, args[0]));
        if (!isManageable(member, message.member)) {
          message.reply('you are not allowed to ban this member.');
        } else {
          const mutedMember = await member.ban(`Banned by ${client.user.tag}${args.length > 1 ? ` for the following reason : ${args.slice(1).join(' ')}` : ''}.`);
          message.channel.send(`Member ${mutedMember} got banned${args.length > 1 ? ` for the following reason : ${args.slice(1).join(' ')}` : ''}.`);
        }
      } else if (await getRole(message, args[0])) {
        const role = await getRole(message, args[0]);
        if (message.author !== role.guild.owner
          && message.member.roles.highest.comparePositionTo(role) < 1) {
          message.reply('you are not allowed to ban the members with this role.');
        } else {
          role.members.forEach(async (member) => {
            await member.ban(`Banned by ${client.user.tag}${args.length > 1 ? ` for the following reason : ${args.slice(1).join(' ')}` : ''}.`);
          });
          message.channel.send(`All the members with the role ${role} got banned${args.length > 1 ? ` for the following reason : ${args.slice(1).join(' ')}` : ''}.`);
        }
      }
    } else {
      message.channel.send(`You need to specify at least a @User or a @Role. Correct usage of this command : \`${process.env.PREFIX}${this.template}\``);
    }
  },
};
