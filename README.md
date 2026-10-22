# Notion Studios

Landing page and Discord bot API for Notion Studios.

## Structure

```
.
├── home.html            Landing page
├── assets
│   ├── images           Logos, banners and icons
│   ├── js
│   │   ├── config.js    Site configuration (API URL)
│   │   ├── script.js    Animations, scrolling and navigation
│   │   └── team.js      Loads the team cards from the bot API
│   └── styles
│       └── home.css     Page styles
└── bot
    ├── index.js         Discord bot and Express API
    ├── package.json
    └── .env.example     Environment variable template
```

## Website

Open `home.html` in a browser or serve the project root with any static file server.

The team section loads its data from the URL set in `assets/js/config.js`:

```js
window.SITE_CONFIG = {
  teamApiUrl: "/api/team",
};
```

Set `teamApiUrl` to wherever your bot API is reachable, for example `https://your-domain.com/api/team` or `http://localhost:3001/team` during development. A relative path like `/api/team` works when your web server proxies `/api` to the bot.

Also replace the Discord invite links in `home.html` with your own.

## Bot

Requirements: Node.js 18 or newer.

```bash
cd bot
npm install
cp .env.example .env
npm start
```

Fill in `.env` before starting:

| Variable             | Description                                         |
| -------------------- | --------------------------------------------------- |
| `BOT_TOKEN`          | Discord bot token                                   |
| `GUILD_ID`           | ID of your Discord server                           |
| `FOUNDER_ROLE_ID`    | ID of the role shown as Founder                     |
| `CO_FOUNDER_ROLE_ID` | ID of the role shown as Co-Founder                  |
| `PORT`               | Port of the API (default `3001`)                    |
| `ALLOWED_ORIGINS`    | Comma-separated origins allowed by CORS (all origins if empty) |

The bot needs the **Server Members** and **Presence** privileged intents enabled in the Discord Developer Portal.

### Endpoints

- `GET /team` returns the cached team members with avatar, banner, role and presence status
- `GET /health` returns the cache size and its age

## License

MIT
