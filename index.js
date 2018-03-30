console.log("Conectando...")
const Discord = require('discord.js');
const client = new Discord.Client({
    autoReconnect: true,
    max_message_cache: 0
});
const moment = require('moment');
moment.locale('pt-BR');   
const config = require('./config.json');
var database = require("./database.js");
var nicknames = require('nicknames');
const fs = require('fs');


fs.readdir("./eventos/", (err, files) => {
    if (err) return console.error("[ERRO] " + err);
    files.forEach(file => {
        let eventFunction = require(`./eventos/${file}`);
        let eventName = file.split(".")[0];
        client.on(eventName, (...args) => eventFunction.run(client, ...args));
    });
});
client.on("message", message => {
    if (message.author.bot) return;
    if (!message.content.startsWith(config.prefix)) return;

    let command = message.content.split(" ")[0];
    command = command.slice(config.prefix.length);

    let args = message.content.split(" ").slice(1);

    try {
        let commandFile = require(`./comandos/prefix-p!/${command}.js`);
        commandFile.run(client, message, args);
    } catch (err) {
        console.error("[CONSOLE] " + err);
    }

});


client.login(config.token)

fs.readdir("./eventos/", (err, files) => {
    if (err) return console.error("[ERRO] " + err);
    files.forEach(file => {
        let eventFunction = require(`./eventos/${file}`);
        let eventName = file.split(".")[0];
        client.on(eventName, (...args) => eventFunction.run(client, ...args));
    });
});
client.on("message", message => {
    if (message.author.bot) return;
    if (!message.content.startsWith(config.semprefix)) return;

    let command = message.content.split(" ")[0];
    command = command.slice(config.semprefix.length);

    let args = message.content.split(" ").slice(1);

    try {
        let commandFile = require(`./comandos/sem-prefix/${command}.js`);
        commandFile.run(client, message, args);
    } catch (err) {

    }

});


client.login(config.token)


const prefix = "p!";
const token = process.env.token;
const id = "421759842382774272"

const configs = require('./jsons/config.json');

const teste = configs.teste;

client.on("ready", () => {

    let string = ''
    for (var i = 0; i < client.guilds.size; i++) {

        string += "     - " + client.guilds.array()[i].name + " ( " + client.guilds.array()[i].members.size + " users ) ,\n";
    }

    const membrosNomes = string
    var statusIDO = ["idle", "dnd", "online"]
    var jogando = [`Athenos - ${client.users.size - 1} usuários`, `Athenos - ${client.guilds.size} servidores`, `Athenos - Me adicione ao seu servidor: https://discordapp.com/oauth2/authorize?client_id=421759842382774272&scope=bot&permissions=2146958591`, `Athenos - Entre no meu servidor: https://discord.gg/9WUTx4A`, `Athenos - Use p!help para saber meus comandos`]

    console.log(`Conectado !`)
    setTimeout(function() {
        console.log(`                   ---== ATHENOS ==---                 \n\Servers: (${client.users.size}):\n\n${membrosNomes}`);
    }, 2000)
    client.user.setGame(jogando[Math.round(Math.random() * jogando.length - 1)], "https://www.twitch.tv/zmarciogod")
    client.user.setStatus(statusIDO[Math.round(Math.random() * statusIDO.length - 1)]);
    client.guilds.get("426467143245103124").channels.get("426467143245103127").sendMessage("**:warning: Dynos reiniciados.**");
    setInterval(() => {
        client.user.setGame(jogando[Math.round(Math.random() * jogando.length - 1)], "https://www.twitch.tv/zmarciogod")
        client.user.setStatus(statusIDO[Math.round(Math.random() * statusIDO.length - 1)]);
    }, 1 * 60 * 1000)
    
});

client.login(token)

client.on("message", (message) => {



});
