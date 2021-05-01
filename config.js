//Requiring the dotenv package will allow us to use the process.env object.
require("dotenv/config")

module.exports = {
  //The bot's owner
  Master: '334392742266535957',

  //The bot's token, username and password! :)
  Token: process.env.TOKEN,

  //The default prefix that the bot listens for :)
  Prefix: '!',

  //Colors!
  Colors: {
    Red: '#ee5858',
    Green: '#75ec96',
    Blue: '#3a4e93',
    Yellow: '#f5db7d',
  },

  //Voice nodes
  Nodes: [
    {
      host: 'localhost',
      password: 'youshallnotpass',
      port: 2333,
    },
  ],
};