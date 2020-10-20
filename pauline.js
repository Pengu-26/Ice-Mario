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
var LAST_TIME_STAMP = 0;  // used to make sure setAvatar commands only work every 15 minutes

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
        else if (msg.content == "sg!commands" || msg.content == "sg!command") {
         commands(msg.send.)
    } else if (msg.content.startsWith("!sg")) {
        psay(msg)
    } else if (msg.content == "sg!v" || msg.content == "sg!version") {
        msg.channel.send("Shy Guy version " + VERSION)
    } else if (msg.content === "sg!unmasked") {
        var message = "Never."
        msg.channel.send(message);
    } else if (msg.content === "sg!shyguykart") {
        msg.channel.send("Shy Guy Kart is awesome! He is my #1 fan! 😁", {files: ["./4CE63FBF-4179-46B5-B3F2-2389BEA93B63.jpeg"]})
    } 
   
   

    // responses
    else if (msg.content.includes("<@768204779737579540>")) {  // someone pings Shy Guy
        msg.channel.send("🙈")
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
function phelp(msg) {
    message = "Usage: \n" +
    "sg!say <message> or !p <message> to send a message.\n" +
    "Use sg!commands to see a list of all the commands currently supported."
    msg.channel.send(message)
}
function commands(msg) {
    message = "Usage: \n" +
              "`!sg <msg>`\t\t\tMakes Shy Guy say message in <msg>\n" +
              "`sg!v/version`\tReturns the current version of Pauline\n" +
              "`sg!unmasked` tells Shy Guy to show his face.\n" +
              "`sg!shyguykart` makes Shy Guy send a good picture."
              
              

              msg.channel.send(message)
}
function sgsay(msg) {
    message = msg.content
    if (message.substr(0, 6) == "sg!say") {
      message = message.substr(7, message.length)  // use only text after the im!say command
    } else {
      message = message.substr(3, message.length)  // use only text after the !im command
    }

    // prevent bot from replying to itself
    user = msg.member.user.tag
    if (user == "@768204779737579540") {return}
    msg.delete()
    msg.channel.send(message);
}
function time_left() {
    if (LAST_TIME_STAMP == 0) {
        return 0
    }
    return (900000 - (Date.now() - LAST_TIME_STAMP)) / 1000
}
function can_switch() {
    // Tests the current time to make sure you can use the cahnge avatar command.
    // Can switch every 15 minutes (900000 ms)
    if (Date.now() - LAST_TIME_STAMP > 900000) {
        return 1
    } 
    else {
        return 0
    }
}
