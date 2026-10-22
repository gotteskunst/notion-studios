document.querySelectorAll(".status-uptime-bars").forEach((container) => {
  const days = parseInt(container.dataset.days, 10) || 30;
  const pattern = container.dataset.pattern || "up";

  for (let i = 0; i < days; i++) {
    const bar = document.createElement("div");
    bar.className = "status-uptime-bar up";

    if (pattern === "degraded-1" && i === 18) {
      bar.className = "status-uptime-bar degraded";
    }
    if (pattern === "down-1" && i === 9) {
      bar.className = "status-uptime-bar down";
    }

    container.appendChild(bar);
  }
});

gsap.registerPlugin(ScrollTrigger);

function revealFadeUp(targets, options = {}) {
  return gsap.fromTo(
    targets,
    {
      opacity: 0,
      y: options.y ?? 36,
      filter: "blur(4px)",
    },
    {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration: options.duration ?? 0.75,
      ease: options.ease ?? "power3.out",
      stagger: options.stagger ?? 0,
      delay: options.delay ?? 0,
      scrollTrigger: options.scrollTrigger ?? null,
    },
  );
}

const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });

heroTl
  .fromTo(".logo", { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.6 })
  .fromTo(
    ".navbar",
    { opacity: 0, y: -20, filter: "blur(6px)" },
    { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.65 },
    "-=0.35",
  )
  .fromTo(
    ".discord-box",
    { opacity: 0, y: -20, filter: "blur(6px)" },
    { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.65 },
    "-=0.55",
  )
  .fromTo(
    ".glass-card",
    { opacity: 0, filter: "blur(12px)" },
    { opacity: 1, filter: "blur(37.6px)", duration: 1.1 },
    "-=0.3",
  )
  .fromTo(".bg-image", { opacity: 0 }, { opacity: 1, duration: 1.4 }, "-=1.1")
  .fromTo(
    ".foreground-logo",
    { opacity: 0, filter: "blur(8px)" },
    { opacity: 1, filter: "blur(0px)", duration: 1.0 },
    "-=0.7",
  );

[".work-badge", ".pricing-badge", ".team-badge", ".status-badge"].forEach(
  (sel) => {
    gsap.fromTo(
      sel,
      { opacity: 0, y: 20, filter: "blur(4px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: { trigger: sel, start: "top 88%", once: true },
      },
    );
  },
);

gsap.fromTo(
  ".work-headline, .work-subline",
  { opacity: 0, y: 28, filter: "blur(4px)" },
  {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    duration: 0.7,
    ease: "power3.out",
    stagger: 0.12,
    scrollTrigger: { trigger: ".work-footer", start: "top 85%", once: true },
  },
);

gsap.fromTo(
  ".work-card",
  { opacity: 0, y: 44, filter: "blur(6px)" },
  {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    duration: 0.75,
    ease: "power3.out",
    stagger: 0.14,
    scrollTrigger: { trigger: ".work-cards", start: "top 82%", once: true },
  },
);

gsap.fromTo(
  ".pricing-headline, .pricing-subline",
  { opacity: 0, y: 28, filter: "blur(4px)" },
  {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    duration: 0.7,
    ease: "power3.out",
    stagger: 0.12,
    scrollTrigger: { trigger: ".pricing-header", start: "top 85%", once: true },
  },
);

gsap.fromTo(
  ".pricing-card:not(.featured)",
  { opacity: 0, y: 44, filter: "blur(6px)" },
  {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    duration: 0.75,
    ease: "power3.out",
    stagger: 0.18,
    scrollTrigger: { trigger: ".pricing-cards", start: "top 82%", once: true },
  },
);
gsap.fromTo(
  ".pricing-card.featured",
  { opacity: 0, y: 56, filter: "blur(8px)" },
  {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    duration: 0.85,
    ease: "power3.out",
    delay: 0.15,
    scrollTrigger: { trigger: ".pricing-cards", start: "top 82%", once: true },
  },
);

gsap.fromTo(
  ".team-headline, .team-subline",
  { opacity: 0, y: 28, filter: "blur(4px)" },
  {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    duration: 0.7,
    ease: "power3.out",
    stagger: 0.12,
    scrollTrigger: { trigger: ".team-header", start: "top 85%", once: true },
  },
);

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
    scrollTrigger: { trigger: ".team-cards", start: "top 82%", once: true },
  },
);

gsap.fromTo(
  ".status-headline, .status-subline",
  { opacity: 0, y: 28, filter: "blur(4px)" },
  {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    duration: 0.7,
    ease: "power3.out",
    stagger: 0.12,
    scrollTrigger: { trigger: ".status-header", start: "top 85%", once: true },
  },
);

gsap.fromTo(
  ".status-card",
  { opacity: 0, y: 44, filter: "blur(6px)" },
  {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    duration: 0.75,
    ease: "power3.out",
    stagger: 0.13,
    scrollTrigger: { trigger: ".status-cards", start: "top 82%", once: true },
  },
);

document.querySelectorAll(".status-card").forEach((card) => {
  const bars = card.querySelectorAll(".status-uptime-bar");
  ScrollTrigger.create({
    trigger: card,
    start: "top 78%",
    once: true,
    onEnter: () => {
      gsap.fromTo(
        bars,
        { scaleY: 0, opacity: 0, transformOrigin: "bottom center" },
        {
          scaleY: 1,
          opacity: 1,
          duration: 0.35,
          ease: "power2.out",
          stagger: 0.018,
          delay: 0.3,
        },
      );
      const fill = card.querySelector(".status-progress-fill");
      if (fill) {
        const target = fill.style.width;
        fill.style.width = "0%";
        gsap.to(fill, {
          width: target,
          duration: 1.1,
          ease: "power2.out",
          delay: 0.5,
        });
      }
    },
  });
});

gsap.fromTo(
  ".footer-brand, .footer-column",
  { opacity: 0, y: 28 },
  {
    opacity: 1,
    y: 0,
    duration: 0.7,
    ease: "power3.out",
    stagger: 0.1,
    scrollTrigger: { trigger: ".footer", start: "top 90%", once: true },
  },
);

const sections = document.querySelectorAll("section[id]");
const navItems = document.querySelectorAll(".nav-item");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navItems.forEach((item) => item.classList.remove("active"));
        const active = document.querySelector(
          `.nav-item[href="#${entry.target.id}"]`,
        );
        if (active) active.classList.add("active");
      }
    });
  },
  { threshold: 0.35 },
);

sections.forEach((sec) => observer.observe(sec));

navItems.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    const targetId = link.getAttribute("href").slice(1);
    const target = document.getElementById(targetId);
    if (!target) return;

    const currentY = window.scrollY;
    const targetY = target.getBoundingClientRect().top + currentY;
    const distance = Math.abs(targetY - currentY);

    const duration = Math.min(2.2, Math.max(0.6, distance / 1800));

    gsap.to(window, {
      scrollTo: { y: targetY, autoKill: false },
      duration: duration,
      ease: "power2.inOut",
    });
  });
});

document.addEventListener("visibilitychange", () => {
  if (!document.hidden) {
    gsap.fromTo(
      "body",
      { opacity: 0.4, filter: "blur(3px)" },
      { opacity: 1, filter: "blur(0px)", duration: 0.55, ease: "power2.out" },
    );
  }
});

ScrollTrigger.create({
  start: "top -80",
  end: 99999,
  onUpdate: (self) => {
    const navbar = document.querySelector(".navbar");
    if (self.progress > 0) {
      navbar.style.background = "rgba(255,255,255,0.06)";
      navbar.style.borderColor = "rgba(255,255,255,0.11)";
    } else {
      navbar.style.background = "rgba(255,255,255,0.04)";
      navbar.style.borderColor = "rgba(255,255,255,0.08)";
    }
  },
});

document.querySelectorAll(".pricing-btn.featured-btn").forEach((btn) => {
  btn.addEventListener("mouseenter", () => {
    gsap.to(btn, { boxShadow: "0 0 24px rgba(202,255,0,0.35)", duration: 0.3 });
  });
  btn.addEventListener("mouseleave", () => {
    gsap.to(btn, { boxShadow: "0 0 0px rgba(202,255,0,0)", duration: 0.4 });
  });
});

gsap.to(".status-dot", {
  boxShadow: "0 0 12px rgba(46,213,115,0.9)",
  repeat: -1,
  yoyo: true,
  duration: 1.6,
  ease: "sine.inOut",
  stagger: { each: 0.4, from: "random" },
});

const lenis = new Lenis({
  duration: 1.4,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
});

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);
