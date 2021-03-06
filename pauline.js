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
var ON_OFF = 1;           // 1 = on, 0 = off

/********************************
    Message response commands
 ********************************/

bot.on('message', msg => {
    // important, disable DMs because they send messages differently than to a channel
    if (msg.channel.type == "dm") {
        dm(msg)
        return
    }
    if (on_off(msg) == 1) {return} // ignore all commands if bot is off

    // Commands
    else if (msg.content == "sg!commands" || msg.content == "sg!command") {
         commands(msg)
    } else if (msg.content.startsWith("!sg")) {
        sgsay(msg)
    } else if (msg.content === "sg!unmasked") {
        var message = "Never."
        msg.channel.send(message);
    } else if (msg.content === "sg!shyguykart") {
        msg.channel.send("Shy Guy Kart is awesome! He is my #1 fan! 😁", {files: ["./4CE63FBF-4179-46B5-B3F2-2389BEA93B63.jpeg"]})
    } else if (msg.content === "sg!fat") {
        msg.channel.send("I'm stuffed! 😫", {files: ["./3B07E559-6108-41BB-9C91-52C767CECD06.jpeg"]})
    } else if (msg.content === "sg!gold") {
        switch_avatar(msg, "I am now **gold** Shy Guy! 👑", "./8CC68885-3F9D-4CED-865E-76190DF1B72A.png")
    } else if (msg.content === "sg!normal") {
        switch_avatar(msg, "I am now **normal** Shy Guy!", "./D0367FBB-15F1-4C42-B118-0C91E3AC5375.png")
    } else if (msg.content === "sg!chef") {
        switch_avatar(msg, "I am now **chef** Shy Guy!", "./940161A1-6A1B-4294-8378-EC8BF0B4B444.png")
    } else if (msg.content === "sg!black") {
        switch_avatar(msg, "I am now **black** Shy Guy!", "./62102316-9C81-4BEB-A2D2-620832881B6D.png")
    } else if (msg.content === "sg!pink") {
        switch_avatar(msg, "I am now **pink** Shy Guy!", "./9B3BB9F5-4289-41D9-AEC4-3E25A31BF97A.png")

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
              "`!sg <msg>` makes Shy Guy say message in <msg>.\n" +
              "`sg!unmasked` tells Shy Guy to show his face.\n" +
              "`sg!shyguykart` makes Shy Guy send a good picture.\n" +
              "`sg!fat` sends a picture of fat Shy Guy.\n" +
              "`sg!gold`, `sg!normal`, `sg!chef`, `sg!black`, and `sg!pink` let's you switch between Shy Guy's outfits. Each one of these can only be used once every 15 minutes." 

              msg.channel.send(message)
}
function sgsay(msg) {
    message = msg.content
    if (message.substr(0, 6) == "sg!say") {
      message = message.substr(7, message.length)  // use only text after the im!say command
    } else {
      message = message.substr(3, message.length)  // use only text after the !im command
    }

    // prevent bot from replying to other bots
    if (msg.author.bot) {return}

    // respond after deleting the message
    msg.delete({timeout: 200})
        .then(msg => { 
            msg.channel.send(message);
        })
        .catch(console.log("Say command failed"));
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
function switch_avatar(msg, to_print, fname) {
    if (can_switch()) {
        msg.channel.send(to_print, {files: [fname]})
        bot.user.setAvatar(fname).catch((e) => {msg.channel.send(e)});
        LAST_TIME_STAMP = Date.now();
    } 
    else {
        msg.channel.send("I can be changed in " + Math.ceil((900000 - (Date.now() - LAST_TIME_STAMP)) / 60000) + " minutes 😊")
    } 
}
function on_off(msg) {
    //    user:     |  server owner    |       jimmy         |        pengu       |        walker       |
    const id_list = [msg.guild.ownerID, "660521636482514944", "734214960984490013", "335603474156748811"];
    var msg_sender = msg.author.id; 
    var m = msg.content;

    // only do this if statement if msg.content is on/off AND is from a dev
    if ((m == "sg!on" || m == "sg!off") && id_list.indexOf(msg_sender) >= 0) {
        // turn off if it is on
        if (ON_OFF == 1) {
            ON_OFF = 0;
            bot.user.setPresence({status: 'dnd'});
            msg.channel.send("I am now **OFF**")
            .then(message => {
                setTimeout(function() {
                    message.delete();
                }, 5000);
            })

        } 
        else {
            ON_OFF = 1;
            bot.user.setPresence({status: 'online'});
            msg.channel.send("I am now **ON**")
            .then(message => {
                setTimeout(function() {
                    message.delete();
                }, 5000);
            })
        }
        return 1; 
    }
    // everything else, just check if bot is on or off
    else {
        if (ON_OFF == 1) {
            return 0
        } else {
            return 1
        }
    }
}
