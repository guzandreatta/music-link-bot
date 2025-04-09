const { getSmartLinks } = require("../services/odesli");
const { extractMusicLink, identifyPlatform } = require("../utils/parseLink");

const handleMusicLink = async (message, client) => {
  const text = message.text || message.message?.text;
if (!text) return;
const url = extractMusicLink(text);
  if (!url) return;

  const platform = identifyPlatform(url);
  if (!platform) return;

  try {
    const links = await getSmartLinks(url);
    const response = [];

    if (platform !== 'spotify' && links.spotify)
      response.push(`🔁 *Spotify*: ${links.spotify}`);
    if (platform !== 'appleMusic' && links.appleMusic)
      response.push(`🔁 *Apple Music*: ${links.appleMusic}`);
    if (platform !== 'youtubeMusic' && links.youtubeMusic)
      response.push(`🔁 *YouTube Music*: ${links.youtubeMusic}`);

    if (response.length > 0) {
      await client.chat.postMessage({
        channel: message.channel,
        thread_ts: message.ts,
        text: response.join("\n"),
      });
    }
  } catch (error) {
    console.error("Error fetching smart links:", error);
  }
};

module.exports = { handleMusicLink };
