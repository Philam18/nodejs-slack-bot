/**
  Usage:
  -place api-key and bot-token inside .env file
  -you can either DM the bot for weather, or invite the bot to a channel

**/
require('dotenv').config();
//SLACK BOT SECRET KEY FOR AUTHENTICATION
const token = process.env.SLACK_BOT_TOKEN;
//IMPORT MODULES FOR SLACK API
const {RtmClient, WebClient, CLIENT_EVENTS, RTM_EVENTS} = require('@slack/client');
//IMPORT MODULE FOR OWM API CALLS
const owm = require('./OWMCaller.js');
//LOGIN DATA CACHE VARIABLE
const appData = {};
//CREATE INSTANCE OF RTM CLIENT
const rtm = new RtmClient(token,{
  dataStore : false,
  useRtmConnect : true
});
//REGEX FOR PUBLIC CHANNEL EVENTS
var BOT_ID_REGEX;
//REGEX FOR DM CHANNEL EVENTS
var BOT_DIRECT_CHANNEL_REGEX = /^D[A-Z0-9]+$/;
//Create a new instance of a Web Client
const web = new WebClient(token);
//STORE BOT CHANNELS
//STORE DEDICATED BOT CHANNEL
var botChannels = [];

/**
----------------------------------------------------------------------------
  RTM.AUTHENTICATED listener to signal successful authentication
----------------------------------------------------------------------------
**/
rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED,(connectData) => {
  //Store the self and team data
  appData.selfId = connectData.self.id;
  appData.selfName = connectData.self.name;
  appData.teamId = connectData.team.id;
  appData.teamName = connectData.team.name;
  BOT_ID_REGEX = new RegExp(`^<@${appData.selfId}>\\s`);
  console.log(`logged in as ${appData.selfName} [${appData.selfId}] on ${appData.teamName} [${appData.teamId}]`);
});

/**
  RTM_CONNECTION_OPENED listener to signal successful connect
**/
rtm.on(CLIENT_EVENTS.RTM.RTM_CONNECTION_OPENED, () => {
  console.log(`Ready to send & receive!`);
  let channelList = web.channels.list();
  channelList.then((response) => {
    console.log("--------------------[Channels]--------------------");
    for(let channel of response.channels){
      if (channel.is_member === true){
        botChannels.push(channel);
        console.log(channel.name);
      }
    }
    console.log("--------------------------------------------------");
    if(!botChannels.length) console.log("Bot-user is not in any channels! Consider adding the bot-user to some channels");
  });
});

/**
----------------------------------------------------------------------------
  RTM_EVENTS listener to receive channel messages
----------------------------------------------------------------------------
**/
rtm.on(RTM_EVENTS.MESSAGE, (message) => {
  // Skip messages that are from a bot or my own user ID
   if ( (message.subtype && message.subtype === 'bot_message') ||
        (!message.subtype && message.user === appData.selfId) ) {
     return;
   }
  // Only accept message events from bot-@mention and direct-messages
  else if(BOT_ID_REGEX.exec(message.text) !== null || BOT_DIRECT_CHANNEL_REGEX.exec(message.channel)){
    //Get cityName from message.text to make OWM API call
    //Remove any @mention text before the message
    var cityName = BOT_ID_REGEX[Symbol.replace](message.text,'');
    owm.getWeather(cityName,(response)=>{
      console.log(response);
      rtm.sendMessage(response, message.channel);
    });
    return;
  }

});

//Start the client!
rtm.start();
