require("dotenv").config();
const express = require("express");
const keepAlive = express();
keepAlive.get("/", (req, res) => res.send("Music Link Bot is alive!"));
keepAlive.listen(3000, () => console.log("🟢 Express server is running on port 3000"));

const { App } = require("@slack/bolt");
const { handleMusicLink } = require("./slack/events");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN,
});

app.message(async ({ message, client }) => {
  console.log("Mensaje recibido:", message);

  if (['bot_message', 'message_deleted'].includes(message.subtype)) return;
  if (message.subtype === 'message_changed' && !message.message?.text) return;

  await handleMusicLink(message, client);
});

(async () => {
  await app.start();
  console.log("⚡️ Bolt app is running!");
})();
