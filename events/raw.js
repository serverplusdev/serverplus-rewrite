class Raw {
    constructor(client) {
        this.client = client
        this.enable = true
    }

    run(d){
        this.client.manager.updateVoiceState(d);
    }
}

module.exports = Raw