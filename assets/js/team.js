const API_URL = window.SITE_CONFIG?.teamApiUrl ?? "/api/team";

const STATUS_COLOR = {
  online: "#2ED573",
  idle: "#FFB020",
  dnd: "#F23F43",
  offline: "#747F8D",
};

const ROLE_DESC = {
  Founder:
    "Leads the vision and strategy of Notion Studios while building scalable end-to-end software solutions. Responsible for architecture, frontend & backend systems, and turning ideas into successful products.",
  "Co-Founder":
    "Co-leads the direction of Notion Studios and supports core operations. Drives collaboration, quality assurance, and ensures every project meets the highest standards.",
};

function buildTeamCard(member) {
  const statusColor = STATUS_COLOR[member.status] ?? "#747F8D";
  const desc =
    ROLE_DESC[member.role] ?? "Member of the Notion Studios core team.";

  const bannerHTML = member.banner
    ? `<img src="${member.banner}" alt="" class="team-card-banner" style="object-fit:cover;">`
    : `<div class="team-card-banner" style="background: linear-gradient(135deg,#1a1a1a,#2a2a2a);"></div>`;

  return `
    <div class="team-card">
      ${bannerHTML}
      <div class="team-card-pfp-wrap">
        <img src="${member.avatar}" alt="${member.globalName}" class="team-card-pfp">
        <div class="team-card-status-outer">
          <div class="team-card-status-inner" style="background:${statusColor};"></div>
        </div>
      </div>
      <div class="team-card-info">
        <p class="team-card-role">${member.role}</p>
        <p class="team-card-handle">@${member.username} · ${member.statusLabel}</p>
      </div>
      <p class="team-card-desc">${desc}</p>
      <a href="https://discord.com/users/${member.id}" target="_blank" class="team-card-btn">
        <span>Contact Me</span>
      </a>
    </div>
  `;
}

async function loadTeam() {
  const container = document.querySelector(".team-cards");
  if (!container) return;

  try {
    const res = await fetch(API_URL);
    const data = await res.json();

    if (!data.success || !data.team.length) {
      container.innerHTML =
        '<p style="color:rgba(255,255,255,0.3);text-align:center;">No team members found.</p>';
      return;
    }

    container.innerHTML = data.team.map(buildTeamCard).join("");

    if (typeof gsap !== "undefined") {
      gsap.fromTo(
        ".team-card",
        { opacity: 0, y: 44, filter: "blur(6px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.75,
          ease: "power3.out",
          stagger: 0.13,
        },
      );
    }
  } catch (err) {
    console.error("Failed to load team:", err);
    container.innerHTML =
      '<p style="color:rgba(255,255,255,0.3);text-align:center;">Failed to load team.</p>';
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", loadTeam);
} else {
  loadTeam();
}
