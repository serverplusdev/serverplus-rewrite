class MessageManager {
    constructor(client) {
        this.client = client
    }
    
    async send(data, channel, timeout = null){
        const client = this.client
        if(!(['text', 'dm', 'news'].includes(channel.type))) throw new Error("Channel is not a Text-Based channel.")
        // if(!data.content || !data.embed) throw new Error("A message needs content or an embed.")

        const message = await channel.send(data)

        if(data.reaction) await message.react(data.reaction.toLowerCase() !== "x" ? data.reaction : "❌")

        if(timeout != null) return message.delete({timeout: timeout})


        return message;
    }

    async delete(message){
        if(!message || message == null) throw new Error("Invalid message.")

        await message.delete()
    }
}

module.exports = MessageManager