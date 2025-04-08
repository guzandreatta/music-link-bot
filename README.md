# 🎧 Music Link Bot for Slack

Este bot escucha mensajes en el canal `#club-music` y responde en thread con los links equivalentes en Spotify, Apple Music y YouTube Music, usando la API de [song.link](https://song.link).

## 🚀 ¿Qué hace?

- Detecta links de música compartidos (Spotify, Apple Music o YouTube Music).
- Obtiene versiones equivalentes en las otras plataformas.
- Responde automáticamente en un thread con los otros links.

## 🛠 Instalación

```bash
npm install
```

### Variables de entorno

Creá un archivo `.env` con estas variables:

```bash
SLACK_BOT_TOKEN=tu_token_de_bot
SLACK_SIGNING_SECRET=tu_signing_secret
SLACK_APP_TOKEN=tu_app_token
ODESLI_API_KEY=tu_api_key_de_songlink (opcional)
MUSIC_CHANNEL_ID=CCTRB6KB2
```

## ▶️ Correr el bot

```bash
npm run dev
```

## 📁 Estructura del proyecto

```
/music-link-bot
├── index.js
├── .env
├── .gitignore
├── package.json
├── slack/
│   └── events.js
├── services/
│   └── odesli.js
└── utils/
    └── parseLink.js
```

## 🧪 Ejemplo de uso

Si alguien comparte:

```
https://open.spotify.com/track/123abc
```

El bot responde en el thread:

```
🔁 Apple Music: https://music.apple.com/track_xyz
🔁 YouTube Music: https://music.youtube.com/watch?v=abc123
```

---

Hecho con 💚 por Gumo ✨
