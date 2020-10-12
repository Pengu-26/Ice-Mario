// Invite link: <insert link here>

var VERSION = "1.0.0";

/********************************
   Initiation stuff on startup
 ********************************/

require('dotenv').config();
const Discord = require('discord.js');
const bot = new Discord.Client();
const TOKEN = process.env.TOKEN;

bot.login(TOKEN);

bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}! verion ${VERSION}`);
  // bot.user.setPresence({game: {name: `Mario Kart Tour`}, type: "PLAYING"}). // Uncomment this to set the game being played
});

/********************************
        Global variables
 ********************************/


/********************************
    Message response commands
 ********************************/

bot.on('message', msg => {
    // important, disable DMs because they send messages differently than to a channel
    if (msg.channel.type == "dm") {
        dm(msg)
        return
    }

    // Commands
    else if (msg.content == "im!help") {
        imhelp(msg)
    } else if (msg.content == "im!commands" || msg.content == "im!command") {
        commands(msg)
    } else if (msg.content.startsWith('im!say') || msg.content.startsWith("!im")) {
        imsay(msg)
    } else if (msg.content == "im!v" || msg.content == "im!version") {
        msg.channel.send("Ice Mario! version " + VERSION)
    } else if (msg.content === 'im!ping') {
        //msg.reply('pong');  // use this to reply back the command
        msg.channel.send('pong');
    } 

    // responses
    else if (msg.content.includes("<@a large tag number>")) {  // someone pings Ice Mario!
        msg.channel.send("😳")
    } 

});

/********************************
       Response functions
 ********************************/
function dm(msg) {
    message = "Sorry, I can't respond to DMs at the moment :("
    msg.author.send(message).catch(err => console.error(err));
    return
}
function imhelp(msg) {
    message = "Usage: \n" +
    "im!say <message> or !im <message> to send a message.\n" +
    "Use im!commands to see a list of all the commands currently supported."
    msg.channel.send(message)
}
function commands(msg) {
    message = "Usage: \n" +
              "`im!help`\t\t\t\tProvides instructions for how to send messages through Ice Mario!\n" +
              "`im!say <msg>`\tMakes Ice Mario! say message in <msg>\n" +
              "`!im <msg>`\t\t\tMakes Ice Mario! say message in <msg>\n" +
              "`im!v/version`\tReturns the current version of Ice Mario!\n" +
              '`im!ping`\t\t\t\tIce Mario! responds with "pong"\n' +
              "Ping @Ice Mario!, and he will respond with 😳\n\n" +

              "Ice Mario! will also respond to certain keywords!"
    msg.channel.send(message)
}
function imsay(msg) {
    message = msg.content
    if (message.substr(0, 6) == "im!say") {
      message = message.substr(7, message.length)  // use only text after the im!say command
    } else {
      message = message.substr(4, message.length)  // use only text after the !im command
    }

    // prevent bot from replying to itself
    user = msg.member.user.tag
    if (user == "Ice Mario!#9224") {return}
    
    msg.channel.send(message);
}

