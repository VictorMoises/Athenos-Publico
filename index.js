console.log("Conectando...")
const Discord = require('discord.js');
const client = new Discord.Client({
    autoReconnect: true,
    max_message_cache: 0
});
const Cleverbot = require("cleverbot-node");
const moment = require('moment');
moment.locale('pt-BR');   
const config = require('./config.json');
var database = require("./database.js");
var nicknames = require('nicknames');
const fs = require('fs');
const clbot = new Cleverbot;

clbot.configure({botapi: process.env.cleverapi});

client.on('guildMemberAdd', member => {

    database.Guilds.findOne({
        "_id": member.guild.id
    }, function(erro, documento) {

        if (documento) {

            if (documento.welcome) {

                var bemvindo = documento.welcomemsg
                client.guilds.get(member.guild.id).channels.get(documento.welcomechannel).sendMessage(bemvindo.replace(/{member}/g, `<@${member.id}>`).replace(/{guild}/g, `${member.guild.name}`).replace(/{name}/g, `${member.username}`));

            } else {}

            if (documento.autorole) {

                var cargo = documento.autoroleid
                client.guilds.get(member.guild.id).members.get(member.user.id).addRole(client.guilds.get(member.guild.id).roles.get(cargo));

            } else {}

        } else {}

    })
})

client.on('guildMemberRemove', member => {

    database.Guilds.findOne({
        "_id": member.guild.id
    }, function(erro, documento) {

        if (documento) {

            if (documento.byebye) {

                var bbbyebye = documento.byebyemsg
                client.guilds.get(member.guild.id).channels.get(documento.byebyechannel).sendMessage(bbbyebye.replace(/{member}/g, `<@${member.id}>`).replace(/{guild}/g, `${member.guild.name}`).replace(/{name}/g, `${member.username}`));

            } else {}

        } else {}

    })
})

client.on('guildDelete', guild => {

    database.Guilds.deleteOne({
        "_id": guild.id
    }, function(erro, documento) {})

})

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

    const servidores = string
    var statusIDO = ["idle", "dnd", "online"]

    console.log(`Conectado !`)
    setTimeout(function() {
        console.log(`                   ---== ATHENOS ==---                 \n\Servers: (${client.users.size}):\n\n${servidores}`);
    }, 2000)
    client.user.setGame(`Athenos - ${client.users.size} membros em ${client.guilds.size} guilds com ${client.channels.size} canais.`, "https://www.twitch.tv/zmarciogod")
    client.user.setStatus(statusIDO[Math.round(Math.random() * statusIDO.length - 1)]);
    client.guilds.get("399756948951662592").channels.get("402601119320244236").sendMessage("**:warning: Dynos reiniciados.**");
    setInterval(() => {
        client.user.setGame(`Athenos - ${client.users.size} membros em ${client.guilds.size} guilds com ${client.channels.size} canais.`, "https://www.twitch.tv/zmarciogod")
        client.user.setStatus(statusIDO[Math.round(Math.random() * statusIDO.length - 1)]);
    }, 1 * 60 * 1000)
    
});

client.login(token)

client.on("message", (message) => {

    if(message.content.includes("<@421759842382774272>")){
        message.reply("**Use p!help para saber meus comandos. :smile:**");
    }

});