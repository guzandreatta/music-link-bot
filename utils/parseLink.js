const extractMusicLink = (text) => {
  const regex = /(https?:\/\/(open\.spotify\.com|music\.apple\.com|music\.youtube\.com)[^\s]*)/;
  const match = text.match(regex);
  return match ? match[1] : null;
};

const identifyPlatform = (url) => {
  if (url.includes("open.spotify.com")) return "spotify";
  if (url.includes("music.apple.com")) return "appleMusic";
  if (url.includes("music.youtube.com")) return "youtubeMusic";
  return null;
};

module.exports = { extractMusicLink, identifyPlatform };