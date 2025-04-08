require("dotenv").config();
const { App } = require("@slack/bolt");
const { handleMusicLink } = require("./slack/events");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN,
});

app.message(async ({ message, client, say }) => {
  if (message.subtype === 'bot_message') return;
  if (message.channel && message.channel !== process.env.MUSIC_CHANNEL_ID) return;
  await handleMusicLink(message, client);
});

(async () => {
  await app.start();
  setInterval(() => {
  console.log("⏳ Keep-alive ping");
}, 1000 * 60 * 4); // cada 4 minutos
  console.log("⚡️ Bolt app is running!");
})();
