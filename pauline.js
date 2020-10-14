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
        else if (msg.content == "p!commands" || msg.content == "p!command") {
         commands(msg)
    } else if (msg.content.startsWith("!p")) {
        psay(msg)
    } else if (msg.content == "p!v" || msg.content == "p!version") {
        msg.channel.send("Pauline! version " + VERSION)
    } else if (msg.content === "p!jumpupsuperstar") {
     msg.channel.send("*It's time to jump up in the air!*\n" +
                      "*Jump up don't be scared!*\n" +
                      "*Jump up and your cares will soar away!*\n" +
                      "*And if the dark clouds start to swirl!*\n" +
                      "*Don't fear don't shed a tear, cause' I'll be your one up girl!*")
    } else if (msg.content === "p!musicvideo") {
        var message = "Here you go!\n" +
                      "https://youtu.be/_hALvbHPmSA\n" +
                      "You're welcome!😉" 
        msg.channel.send(message);
    } else if (msg.content === "p!wishmeluck") {
        var message = "Good luck!🍀😉"
        msg.channel.send(message);
    } else if (msg.content === "p!herewego") {
        var message = "*Off the rails!*"
        msg.channel.send(message);
    } else if (msg.content == "p!sendselfie") {
        msg.channel.send("Here is my favorite selfie of my me and my BFFs 😄!", {files: ["./37B03969-6402-4273-8AEA-A9187512EB2E.jpeg"]})
    } 
    // responses
    else if (msg.content.includes("<@765272148876591135>")) {  // someone pings Pauline
        msg.channel.send("🎵PAAAUUULLIIINNEEE🎵")
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
    "p!say <message> or !p <message> to send a message.\n" +
    "Use p!commands to see a list of all the commands currently supported."
    msg.channel.send(message)
}
function commands(msg) {
    message = "Usage: \n" +
              "`!p <msg>`\t\t\tMakes Pauline say message in <msg>\n" +
              "`p!v/version`\tReturns the current version of Pauline\n" +
              "`p!jumpupsuperstar` makes Pauline sing part of her song\n" +
              "`p!musicvideo' makes Pauline send a music video of her song, Jump Up, Super Star!\n" +
              "`p!wishmeluck' makes Pauline wish you good luck!\n" +
              "`p!herewego' makes Pauline respond with *Off the rails!*\n" +
              "`p!sendselfi' makes Pauline send her favorite selfie taken with 3 friends!\n" +
              'Ping @Pauline, and she will respond with "🎵PAAAUUULLIIINNEEE🎵"

              msg.channel.send(message)
}
function psay(msg) {
    message = msg.content
    if (message.substr(0, 6) == "im!say") {
      message = message.substr(7, message.length)  // use only text after the im!say command
    } else {
      message = message.substr(3, message.length)  // use only text after the !im command
    }

    // prevent bot from replying to itself
    user = msg.member.user.tag
    if (user == "Pauline#4516") {return}
    msg.delete()
    msg.channel.send(message);
}

