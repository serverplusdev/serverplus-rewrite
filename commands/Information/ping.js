const Command = require("../../structures/Command");
const Embed = require("../../structures/Embed")

class Ping extends Command {
    constructor(client) {
        super(client, {
            name        :   "ping",
            aliases     :   ['latency'],
            ownerOnly   :   true
        })
        this.MessageManager = new (require("../../managers/MessageManager"))(client)
        this.Embed = new Embed()
    }

    async run(message) {
        

        const MessageManager = this.MessageManager;
        
        MessageManager.delete(message)
        let m = await MessageManager.send(
          {
            content: `${message.author}, ${this.client.ws.ping}ms`,
            reaction: 'x'
          },
          message.channel,
          5000
        )
    }
}

module.exports = Ping