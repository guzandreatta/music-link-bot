const axios = require("axios");

const getSmartLinks = async (originalUrl) => {
  const apiKey = process.env.ODESLI_API_KEY;
  const response = await axios.get("https://api.song.link/v1-alpha.1/links", {
    params: { url: originalUrl, userCountry: "AR" },
    headers: apiKey ? { "Authorization": `Bearer ${apiKey}` } : {},
  });

  const linksByPlatform = response.data.linksByPlatform;
  return {
    spotify: linksByPlatform.spotify?.url,
    appleMusic: linksByPlatform.appleMusic?.url,
    youtubeMusic: linksByPlatform.youtubeMusic?.url,
  };
};

module.exports = { getSmartLinks };