const Cleverbot = require("cleverbot-node");
const clbot = new Cleverbot;
clbot.configure({botapi: "CC7zh62uug3jf70cJzB_IkC5QzA"});

exports.run = (client, message, args) => {

    if(!client.guilds.get("399756948951662592").members.get(message.guild.owner.id)) return message.reply("**Meus comandos só funcionarão se o dono do servidor estiver em meu server. Use p!info para pegar o invite.**");

    clbot.write(message.content, (response) => {
        message.channel.startTyping();
        setTimeout(() => {
          message.channel.sendMessage(response.output).catch(console.error);
          message.channel.stopTyping();
        }, Math.random() * (1 - 3) + 1 * 1000);
      });

}