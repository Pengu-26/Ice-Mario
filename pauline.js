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
        else if (msg.content == "r!commands" || msg.content == "r!command") {
         commands(msg)
    } else if (msg.content.startsWith("!r")) {
        psay(msg)
    } else if (msg.content == "r!v" || msg.content == "r!version") {
        msg.channel.send("Rosalina version " + VERSION)
    } else if (msg.content === "r!wishmeluck") {
        var message = "Good luck, the stars will always shine down on you."
        msg.channel.send(message);
    } else if (msg.content === "r!sing") {
        var message = ":musical_note:Where are you now?:musical_note:"
        msg.channel.send(message);
 
    } else if (msg.content == "r!sendselfie") {
        msg.channel.send("Here is my favorite selfie of my me and my BFFs *(Taken by @Pauline)*! May the stars shine down on them. 😁", {files: ["./37B03969-6402-4273-8AEA-A9187512EB2E.jpeg"]}) 
   
    } else if (msg.content == "r!laptop") {
        msg.channel.send("Here is my Lenovo Ideapad S340. 😁", {files: ["./lenovo-laptop-ideapad-s340-intel-14-02.webp"]}) 
   } else if (msg.content == "r!emojiparty") {
        msg.channel.send("🤩\n" +
                         "🥺\n" +
                         "😊\n" +
                         "🤪\n" +
                         "🥳")
    } else if (msg.content == "r!pengu") {
        msg.channel.send("To appreciate one of my creators, I sent a picture of his favorite animal. May the stars shine down on him. 🥰", {files: ["./120BF099-A5EA-4F32-8A7B-80828A9ADE99.jpeg"]})
    } else if (msg.content == "r!jimmy") {
        msg.channel.send("To appreciate one of my creators, I sent a picture of his favorite Mario Kart Tour driver! May the stars shine down on him. ☺️", {files: ["./F9D61245-E93C-4D18-A518-0A26A84BAE78.webp"]})
    } 

    // responses
    else if (msg.content.includes("<@767805960361869312>")) {  // someone pings Pauline
        msg.channel.send("May the stars shine down on you.")
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
              "`!r <msg>`\t\t\tMakes Rosalina say message in <msg>\n" +
              "`r!v/version`\tReturns the current version of Pauline\n" +
             
              
              "`r!wishmeluck` makes Rosalina wish you good luck!\n" +
             
              "`r!sendselfie` makes Rosalina send her favorite selfie taken with 3 friends!\n" +
              "`r!emojiparty` makes Rosalina send her 5 favorite emojis!\n" +
             
              "`r!Pengu` makes Pauline send a picture of Pengu's favorite animal!\n" +
              "`r!jimmy` makes Pauline send a picture of Jimmy's favorite MKT driver!\n" +
              "`r!sing` makes Rosalina sing her favorite song" +
              "Ping `@Rosalina`, and she will respond with *May the stars shine down on you.*\n"
  

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
    if (user == "@767805960361869312") {return}
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
