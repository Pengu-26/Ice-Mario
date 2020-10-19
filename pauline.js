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
    } else if (msg.content === "p!wishmeluck") {
        var message = "Good luck, the stars will always shine down on you."
        msg.channel.send(message);
 
    } else if (msg.content == "p!sendselfie") {
        msg.channel.send("Here is my favorite selfie of my me and my BFFs! 😁", {files: ["./37B03969-6402-4273-8AEA-A9187512EB2E.jpeg"]}) 
   
    } else if (msg.content == "p!pengu") {
        msg.channel.send("To appreciate one of my creators, I sent a picture of his favorite animal. 🥰", {files: ["./120BF099-A5EA-4F32-8A7B-80828A9ADE99.jpeg"]})
    } else if (msg.content == "p!jimmy") {
        msg.channel.send("To appreciate one of my creators, I sent a picture of his favorite Mario Kart Tour driver! ☺️", {files: ["./F9D61245-E93C-4D18-A518-0A26A84BAE78.webp"]})
    } 

    // responses
    else if (msg.content.includes("<@Rosalina#1252>")) {  // someone pings Pauline
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
             
             
              "`r!wishmeluck` makes Rosalina wish you good luck!\n" +
             
              "`p!sendselfie` makes Pauline send her favorite selfie taken with 3 friends!\n" +
             
             
              "`p!Pengu` makes Pauline send a picture of Pengu's favorite animal!\n" +
              "`p!jimmy` makes Pauline send a picture of Jimmy's favorite MKT driver!\n" +
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
    if (user == "Pauline#4516") {return}
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
function partytime(msg) {
    if (can_switch()) {
        msg.channel.send("I am now in my party outfit! 🥳", {files: ["./665532E9-00F1-42C1-A734-EBC7242FE2EB.jpeg"]})
        bot.user.setAvatar("./665532E9-00F1-42C1-A734-EBC7242FE2EB.jpeg")
        LAST_TIME_STAMP = Date.now();
    } 
    else {
        msg.channel.send("I can be changed in " + Math.ceil((900000 - (Date.now() - LAST_TIME_STAMP)) / 60000) + " minutes 😊")
    } 
}
function regular(msg) {
    if (can_switch()) {
        msg.channel.send("I am now in my regular outfit! 🙂", {files: ["./DE563177-1FBA-465B-B009-49295277DC74.jpeg"]})
        bot.user.setAvatar("./DE563177-1FBA-465B-B009-49295277DC74.jpeg")
        LAST_TIME_STAMP = Date.now();
    }
    else {
        msg.channel.send("I can be changed in " + Math.ceil((900000 - (Date.now() - LAST_TIME_STAMP)) / 60000) + " minutes 😊")
    } 
}

