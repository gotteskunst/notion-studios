require("dotenv").config();

const { Client, GatewayIntentBits, Partials } = require("discord.js");
const express = require("express");
const cors = require("cors");

const BOT_TOKEN = process.env.BOT_TOKEN;
const GUILD_ID = process.env.GUILD_ID;
const PORT = Number(process.env.PORT) || 3001;
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

if (!BOT_TOKEN || !GUILD_ID) {
  console.error("Missing BOT_TOKEN or GUILD_ID. Copy .env.example to .env and fill it in.");
  process.exit(1);
}

const ROLES = {};
if (process.env.FOUNDER_ROLE_ID) {
  ROLES[process.env.FOUNDER_ROLE_ID] = "Founder";
}
if (process.env.CO_FOUNDER_ROLE_ID) {
  ROLES[process.env.CO_FOUNDER_ROLE_ID] = "Co-Founder";
}

const STATUS_MAP = {
  online: { label: "Online", color: "#2ED573" },
  idle: { label: "Idle", color: "#FFB020" },
  dnd: { label: "Do Not Disturb", color: "#F23F43" },
  offline: { label: "Offline", color: "#747F8D" },
};

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildPresences,
  ],
  partials: [Partials.GuildMember],
});

let teamCache = [];
let lastCacheTime = 0;
const CACHE_TTL = 5 * 60 * 1000;

async function buildTeamCache() {
  try {
    const guild = client.guilds.cache.get(GUILD_ID);
    if (!guild) {
      console.error("Guild not found.");
      return;
    }

    console.log("Building team cache...");

    await guild.members.fetch({ withPresences: true });
    console.log(`${guild.members.cache.size} members cached`);

    const team = [];

    for (const [roleId, roleLabel] of Object.entries(ROLES)) {
      const role = guild.roles.cache.get(roleId);
      if (!role) {
        console.warn(`Role ${roleId} not found`);
        continue;
      }

      console.log(`Role "${role.name}" has ${role.members.size} members`);

      for (const [, member] of role.members) {
        const user = member.user;

        const statusKey = member.presence?.status ?? "offline";
        const statusInfo = STATUS_MAP[statusKey] ?? STATUS_MAP.offline;

        const avatar = user.displayAvatarURL({ size: 256, dynamic: true });

        let banner = null;
        try {
          const fetched = await client.users.fetch(user.id, { force: true });
          banner = fetched.bannerURL({ size: 1024, dynamic: true }) ?? null;
        } catch {}

        console.log(
          `  ${user.username} | ${statusKey} | banner: ${banner ? "yes" : "no"}`,
        );

        team.push({
          id: user.id,
          username: user.username,
          globalName: user.globalName ?? user.username,
          avatar,
          banner,
          role: roleLabel,
          status: statusKey,
          statusLabel: statusInfo.label,
          statusColor: statusInfo.color,
        });
      }
    }

    const order = ["Founder", "Co-Founder"];
    team.sort((a, b) => order.indexOf(a.role) - order.indexOf(b.role));

    teamCache = team;
    lastCacheTime = Date.now();
    console.log(`Cache ready: ${team.length} members stored\n`);
  } catch (err) {
    console.error("Cache build failed:", err.message);
  }
}

client.on("presenceUpdate", (oldPresence, newPresence) => {
  if (!newPresence?.userId) return;

  const member = teamCache.find((m) => m.id === newPresence.userId);
  if (!member) return;

  const statusKey = newPresence.status ?? "offline";
  const statusInfo = STATUS_MAP[statusKey] ?? STATUS_MAP.offline;

  member.status = statusKey;
  member.statusLabel = statusInfo.label;
  member.statusColor = statusInfo.color;

  console.log(`Status update: ${member.username} -> ${statusKey}`);
});

const app = express();
app.use(cors(ALLOWED_ORIGINS.length ? { origin: ALLOWED_ORIGINS } : undefined));

app.get("/team", async (req, res) => {
  if (Date.now() - lastCacheTime > CACHE_TTL) {
    await buildTeamCache();
  }

  if (!teamCache.length) {
    return res.status(503).json({
      success: false,
      error: "Cache not ready yet, please try again shortly.",
    });
  }

  res.json({ success: true, team: teamCache });
});

app.get("/health", (req, res) =>
  res.json({
    ok: true,
    cached: teamCache.length,
    age: Math.round((Date.now() - lastCacheTime) / 1000) + "s",
  }),
);

app.listen(PORT, () => console.log(`API listening on http://localhost:${PORT}`));

client.once("clientReady", async () => {
  console.log(`Bot logged in as ${client.user.tag}`);
  console.log(
    `Servers: ${client.guilds.cache.map((g) => `${g.name} (${g.id})`).join(", ")}\n`,
  );

  await buildTeamCache();

  setInterval(buildTeamCache, CACHE_TTL);
});

client.login(BOT_TOKEN);
