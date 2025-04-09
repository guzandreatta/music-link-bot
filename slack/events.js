const { getSmartLinks } = require("../services/odesli");
const { extractMusicLink, identifyPlatform } = require("../utils/parseLink");

const handleMusicLink = async (message, client) => {
  if (message.bot_id || (!message.text && !message.message?.text)) return;

  const text = message.text || message.message?.text;
  const url = extractMusicLink(text);
  if (!url) return;

  const platform = identifyPlatform(url);
  if (!platform) return;

  // 🎯 Accurate thread_ts logic
  const threadTs =
    message.subtype === "message_changed"
      ? message.message?.ts || message.previous_message?.ts
      : message.ts || message.event_ts;

  if (message.subtype === "message_changed" && !message.previous_message) return;

  try {
    const links = await getSmartLinks(url);
    const response = [];

    if (platform !== "spotify" && links.spotify)
      response.push(`🔁 *Spotify*\n${links.spotify}`);
    if (platform !== "appleMusic" && links.appleMusic)
      response.push(`🔁 *Apple Music*\n${links.appleMusic}`);
    if (platform !== "youtubeMusic" && links.youtubeMusic)
      response.push(`🔁 *YouTube Music*\n${links.youtubeMusic}`);

    if (response.length === 0) return;

    await client.chat.postMessage({
      channel: message.channel,
      thread_ts: threadTs,
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: "*🎶 Links equivalentes:*"
          }
        },
        ...response.map((item) => ({
          type: "section",
          text: {
            type: "mrkdwn",
            text: item
          }
        }))
      ]
    });
  } catch (error) {
    console.error("Error fetching smart links:", error);
  }
};

module.exports = { handleMusicLink };
