const Command = require("../../structures/Command");
const Embed = require("../../structures/Embed");

class Play extends Command {
  constructor(client) {
    super(client, {
      name: 'play',
      aliases: ['p', 'playsong'],
      ownerOnly: false,
    });
    this.MessageManager = new (require('../../managers/MessageManager'))(
      client
    );
    this.Embed = new Embed();
  }

  async run(message, args){
    const MessageManager = this.MessageManager
    MessageManager.delete(message) //Keep them channels clean y'all
      
    if(!message.member.voice.channel) return MessageManager.send(
      {
        embed: await this.Embed.Error({
          description: `You must be in a voice channel to use this command!`,
        }),
      },
      message.channel,
      5000
    );

    if(!args.length) return MessageManager.send(
      {
        embed: await this.Embed.Error({
          description: `Please include a search term or URL.`,
        }),
      },
      message.channel,
      5000
    );

      const search = args.join("");
      let res;

      try {
          res = await this.client.manager.search(search, message.author)

          if(res.loadType === "LOAD_FAILED") throw res.exception
          else if(res.loadType === "PLAYLIST_LOADED") throw { message: "playlist are a nono"}
      } catch(err){
          return console.log(err.message)
      }

      const player = this.client.manager.create({
          guild: message.guild.id,
          voiceChannel: message.member.voice.channel.id,
          textChannel: message.channel.id
      })

      player.connect()
      player.queue.add(res.tracks[0])

      if (!player.playing && !player.paused && !player.queue.size) player.play();

      return message.reply(`enqueuing ${res.tracks[0].title}.`);

  }
}

module.exports = Play