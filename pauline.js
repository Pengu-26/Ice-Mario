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
                      "https://youtu.be/sNpN5nNeoAI\n" +
                      "You're welcome!😉" 
        msg.channel.send(message);
    } else if (msg.content === "p!wishmeluck") {
        var message = "Good luck!🍀😉"
        msg.channel.send(message);
    } else if (msg.content === "p!herewego") {
        var message = "*Off the rails!*"
        msg.channel.send(message);
    } else if (msg.content == "p!sendselfie") {
        msg.channel.send("Here is my favorite selfie of my me and my BFFs! 😁", {files: ["./37B03969-6402-4273-8AEA-A9187512EB2E.jpeg"]}) 
    } else if (msg.content == "p!ferrari") {
        msg.channel.send("I'm not flexing or anything, but here's a picture of my red Ferrari! 😌", {files: ["./78ADCEA8-9C5F-4123-9E2F-4CF43D336902.jpeg"]})
    } else if (msg.content == "p!partytime") {
        partytime(msg)
    } else if (msg.content == "p!regular") {
        regular(msg)
    } else if (msg.content == "p!timeleft") {
        msg.channel.send("Time left: " + time_left() + "s");
    } else if (msg.content == "p!pengu") {
        msg.channel.send("To appreciate one of my creators, I sent a picture of his favorite animal. 🥰", {files: ["./120BF099-A5EA-4F32-8A7B-80828A9ADE99.jpeg"]})
    } else if (msg.content == "p!jimmy") {
        msg.channel.send("To appreciate one of my creators, I sent a picture of his favorite Mario Kart Tour driver! ☺️", {files: ["./F9D61245-E93C-4D18-A518-0A26A84BAE78.jpeg"]})
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
              "`p!musicvideo` makes Pauline send a music video of her song, Jump Up, Super Star!\n" +
              "`p!wishmeluck` makes Pauline wish you good luck!\n" +
              "`p!herewego` makes Pauline respond with *Off the rails!*\n" +
              "`p!sendselfie` makes Pauline send her favorite selfie taken with 3 friends!\n" +
              "`p!Ferrari` makes Pauline send a picture of her Ferrari!\n" +
              "`p!partytime` and `p!regular` let's Pauline switch between her outfits!\n" +
              "`p!Pengu` makes Pauline send a picture of Pengu's favorite animal!\n" +
              "`p!jimmy` makes Pauline send a picture of Jimmy's favorite MKT driver!\n" +
              "Ping `@Pauline`, and she will respond with *🎵PAAAUUULLIIINNEEE🎵*\n"

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

