exports.run = (client, message, args)  => {

    let reason = args.slice(0).join(' ');

  if(!client.guilds.get("399756948951662592").members.get(message.guild.owner.id)) return message.reply("**Meus comandos só funcionarão se o dono do servidor estiver em meu server. Use p!info para pegar o invite.**");

  if (message.author.bot) return message.reply("**Bots não podem usar esse comando!**")
  if (!message.member.hasPermission(["MANAGE_MESSAGES"])) return message.reply("**Você não tem permissão para limpar o chat!**");
  if (reason.length < 1) return message.reply('**Diga a quantidade de mensagens que devo apagar!**');
  message.channel.bulkDelete(`${parseInt(args[0]) > 99 ? parseInt(args[0]) : parseInt(args[0]) + 1}`)
    setTimeout(function() {
        message.channel.sendMessage(`**:wastebasket: Removido ${parseInt(args[0]) > 99 ? parseInt(args[0]) : parseInt(args[0]) + 1} mensagens por <@${message.author.id}> !**`).then((value) => {
            setTimeout(() => {
                value.delete();
            }, 5000);
        });
    }, 2000)
}
