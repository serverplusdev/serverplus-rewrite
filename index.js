const { Manager } = require("erela.js");
const ServerPlus = require("./structures/ServerPlus")

const client = new ServerPlus();

client.init()

const nodes = client.config.Nodes;

client.manager = new Manager({
  nodes,
  send: (id, payload) => {
    const guild = client.guilds.cache.get(id);

    if (guild) guild.shard.send(payload);
  },
});

client.manager.on('nodeConnect', (node) => {
    console.log(`Node "${node.options.identifier}" connected.`)
})

client.manager.on('nodeError', (node, error) => {
  console.log(`Node "${node.options.identifier}" encountered an error: ${error.message}.`);
});

