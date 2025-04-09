const extractMusicLink = (text) => {
  const cleaned = text.replace(/[<>]/g, '').replace(/\n/g, ' ').trim();
  const regex = /(https?:\/\/(open\.spotify\.com|music\.apple\.com|music\.youtube\.com|www\.youtube\.com|youtu\.be)[^\s]*)/;
  const match = cleaned.match(regex);
  return match ? match[1] : null;
};

const identifyPlatform = (url) => {
  if (url.includes("open.spotify.com")) return "spotify";
  if (url.includes("music.apple.com")) return "appleMusic";
  if (url.includes("music.youtube.com") || url.includes("youtube.com") || url.includes("youtu.be")) return "youtubeMusic";
  return null;
};

module.exports = { extractMusicLink, identifyPlatform };
