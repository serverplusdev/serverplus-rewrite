const Embed = require('../structures/Embed');

class Message {
  constructor(client) {
    this.enable = true;
    this.client = client;

    this.MessageManager = new (require('../managers/MessageManager'))(client);
    this.Embed = new Embed()
  }

  async run(message) {
    const client = this.client;

    if (message.author.bot || !message.guild || message.system) return;
    if (!message.member && message.guild)
      message.member = await message.guild.members.fetch(message.author);

    //Replace with database later :)
    if (!message.content.startsWith(client.config.Prefix)) return;

    const [cmd, ...args] = message.content
      .slice(client.config.Prefix.length)
      .trim()
      .split(/ +/g);

    const command =
      client.commands.get(cmd.toLowerCase()) ||
      client.commands.get(client.aliases.get(cmd.toLowerCase()));

    if (!command) return;

    if (command.cooldown && command.cooldown.has(message.author.id))
      return (
        message.delete({ timeout: 10000 }) &&
        message
          .reply(command.cooldown.get(message.author.id) / 1000)
          .then((msg) => msg.delete({ timeout: 10000 }))
      );

    if (command.ownerOnly && message.member.id !== client.config.Master) return await this.MessageManager.send(
      {
        embed: await this.Embed.Error({
          description: 'This command is restricted to the bot owner.',
  
        }),
      },
      message.channel,
      5000
    );

    command.run(message, args);

    if (command.cooldown > 0) command.startCooldown(message.author.id);
  }
}

module.exports = Message;
