const aoijs = require("aoi.js");
const bid = process.env.bid;
const key = process.env.key;


const bot = new aoijs.AoiClient({
  token: process.env.Token,
  prefix: "&",
  intents: ["GUILDS", "GUILD_MESSAGES"],
  mobilePlatform: true,
});

//status
bot.status({
  text: "Watch it",
  type: "STREAMING",
  url: "https://www.youtube.com/c/",
});
//Events
bot.onMessage();

//Command Example (ping)
const loader = new aoijs.LoadCommands(bot);
loader.load(bot.cmd, "./commands/");

const { Panel } = require("@akarui/aoi.panel")

const panel = new Panel({
  username: process.env.Name,//username for logging in
  password: process.env.pass,//password for logging in
  secret: "aoijs",//session secret
  port: 3000,//port on which website is hosted, Not required! Default 3000
  bot: bot,//your aoi.js client
  mainFile: "index.js",//Main file where code is running.Not required, default taken from package.json
  commands: "./commands/"// folder name in which all the edit needing files are there
})
panel.loadPanel()//Load The Panel

panel.onError()//Will detect errors, and send it to aoi.panel's error page




//Chat bot main command
bot.command({
  name: "$alwaysExecute",
  category: "Command Support",
  code: `
  $reply[$messageID;yes]
  $httpRequest[http://api.brainshop.ai/get?bid=${bid}&key=${key}&uid=$authorId&msg=$message;GET;;cnt]
  $botTyping
  $cooldown[2s;{newEmbed:{description:\:_\: Don't send messages to fast, you can break me by doing it}{color:RED}}]

  $onlyIf[$checkContains[$message;@everyone;@here;:  :]==false;{newEmbed:{description:\:_\: I don't disturb people!}{color:#ff0000}}]

  $onlyForChannels[$getServerVar[chatbotChannel];]

  $onlyIf[$getServerVar[chatbotChannel]!=;]
  $suppressErrors
  `,
});
bot.variables({
  money: 0,
  chatbotChannel: "",
});

