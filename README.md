# An [OpenWeatherMap](https://openweathermap.org/api) bot for Slack in NodeJS 
This is a bot for delivering real-time weather information from OpenWeatherMap built on Slack's NodeJS SDK using:
- [Web](https://api.slack.com/web) API
- [Real Time Messaging (RTM)](https://api.slack.com/rtm) API
- [Events](https://api.slack.com/events-api) API
- [Node Slack SDK](https://github.com/slackapi/node-slack-sdk)

## Requirements
### Set up the Slack bot-user
Slack requires you to add a bot configuration to your workspace. 
Go to **_your-workspace-name_**.slack.com/apps/A0F7YS25R-bots and add a new configuration.
Alternatively, you can:
- going to your workspace settings at **_your-workspace-name_**.slack.com/**apps/manage**
- searching for the 'Bots' app and adding a new configuration to your workspace

![alt text](https://i.imgur.com/QuwB4M1.gif "Search and add")

**NOTE**: Keep your bot-token handy and secret for later- it is necessary for connecting to the Slack client

### NodeJS & npm
You will want to grab the latest NodeJS/npm ([here's a tutorial for Ubuntu](https://tecadmin.net/install-latest-nodejs-npm-on-ubuntu/)).
After installation and verifying you have the latest version, you can create a new folder, clone the repository, and run your `npm install` to grab the dependencies.

### OWM API Key
Head to OpenWeatherMap and sign up for current weather data: https://openweathermap.org/appid
Keep the key handy as we will need it when setting up our enviornment variables
