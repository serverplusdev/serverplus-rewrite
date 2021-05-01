const Embed = require("../structures/Embed")

class Ready {
    constructor(client) {
        this.enable = true
        this.client = client
    }

    async run() {
        const client = this.client
        
        
        client.manager.init(client.user.id)
        console.log(`Logged in as ${client.user.tag} - Ready, set, go!`)
    }

}

module.exports = Ready