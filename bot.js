const { Collection, Client, Discord } = require('discord.js');
const fs = require('fs');
const client = new Client({
    disableEveryone: true
});
const config = require('./config.json');
const prefix = config.bot.prefix;
const token = config.bot.token;

client.commands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync("./commands/");
["handler"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
}); 

client.on('ready', () => {
    console.log(`${client.user.username} ✅`)
});
// hello guys welcome to a new coding tutorial, this time I got a new command handler for you guys :) github link in description bye!
client.on('message', async message =>{
    if(message.author.bot) return;
    if(!message.content.startsWith(prefix)) return;
    if(!message.guild) return;
    if(!message.member) message.member = await message.guild.fetchMember(message);
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if(cmd.length == 0 ) return;
    let command = client.commands.get(cmd)
    if(!command) command = client.commands.get(client.aliases.get(cmd));
    if(command) command.run(client, message, args) 
});

client.login(token)