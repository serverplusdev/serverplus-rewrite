const { MessageEmbed } = require("discord.js")

class Embed {
    constructor() {
        this.colors = require("../config").Colors
        this.translateColors = {
            "red": this.colors.Red,
            "green": this.colors.Green,
            "blue": this.colors.Blue,
            "yellow": this.colors.Yellow,
        }
    }
    
    async Error(data) {
        if(!data || data == null) throw new Error("No embed data provided.")
        if(!data.description) throw new Error("An embed must have a description.")
        if(data.color != "red" && data.color) console.log("Custom color is not used in an Error embed.")
        console.log(data)
        return new MessageEmbed().setColor(this.translateColors['red']).setTitle("An error occurred").setDescription(data.description)
    }
}

module.exports = Embed