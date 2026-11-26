/* =========================================================
   Nomena Sahaza — Portfolio
   Renders every section from window.PORTFOLIO_DATA,
   then wires up 3D tilt, dock, scroll reveal and project sheet.
   ========================================================= */

const DATA = window.PORTFOLIO_DATA;
const DETAILS = window.PROJECT_DETAILS || [];
const ME = DATA.identity;
const CV_PATH = "cv/ATS-Sahaza_20261125_092821_0000.pdf";

const GRADIENTS = [
  ["#ffd8cb", "#ff9a86"],
  ["#dcd8ff", "#8277ff"],
  ["#cdf1e3", "#4cc9a2"],
  ["#ffe9b5", "#f6bc45"],
  ["#d8e9ff", "#63acff"],
  ["#ffd9ef", "#f077c1"],
  ["#e5ebd9", "#a3bb72"],
  ["#e8ddff", "#ad8ffb"],
];

const $ = (sel, root = document) => root.querySelector(sel);

const escapeHtml = (value) =>
  String(value ?? "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }[char]));

const iconTag = (src, name) => {
  if (src) {
    return `<img src="${escapeHtml(src)}" alt="" loading="lazy" decoding="async">`;
  }
  const initials = String(name || "?").slice(0, 2).toUpperCase();
  return `<span class="skill__fallback" aria-hidden="true">${escapeHtml(initials)}</span>`;
};

const shortName = (title) => title.split("(")[0].trim();

const SECTOR_LABELS = {
  web: "Web",
  mobile: "Mobile",
  desktop: "Desktop",
  ai: "IA",
  devops: "DevOps",
  "system and network": "Systèmes & réseaux",
};

const externalLink = (url) => url.startsWith("http") ? url : `https://${url}`;

const ARROW_SVG = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14m0 0-6-6m6 6-6 6"/></svg>';

/* ---------------------------------------------------------
   Hero
   --------------------------------------------------------- */
const HERO_TECHS = [
  { name: "TypeScript", icon: "icons/typescript-svgrepo-com.svg" },
  { name: "React", icon: "icons/react-svgrepo-com.svg" },
  { name: "Next.js", icon: "icons/nextjs-fill-svgrepo-com.svg" },
  { name: "Python", icon: "icons/python-svgrepo-com.svg" },
  { name: "FastAPI", icon: "icons/fastapi-svgrepo-com.svg" },
  { name: "Docker", icon: "icons/docker-icon-svgrepo-com.svg" },
  { name: "Tailwind CSS", icon: "icons/tailwind-svgrepo-com.svg" },
  { name: "Symfony", icon: "icons/symfony-svgrepo-com.svg" },
  { name: "Node.js", icon: "icons/nodejs01-svgrepo-com.svg" },
];

function renderHero() {
  const firstName = escapeHtml(ME.first_name || ME.username.split(" ")[0]);
  const lastName = escapeHtml(ME.last_name || ME.username.split(" ")[1] || "");

  const techs = HERO_TECHS.map((tech) => `
    <li>
      <a class="hero__tech" href="#skills" aria-label="${escapeHtml(tech.name)}" title="${escapeHtml(tech.name)}">
        ${iconTag(tech.icon, tech.name)}
      </a>
    </li>`).join("");

  $("#hero").innerHTML = `
    <div class="hero__visual">
      <div class="photo-card" data-tilt="14">
        <div class="photo-card__img">
          <img src="images/image.png" alt="Portrait de ${escapeHtml(ME.username)}" width="450" height="450">
        </div>
      </div>
    </div>

    <div class="hero__copy">
      <span class="hero__badge">5+ ans d'expérience</span>

      <h1 class="display">${firstName} <em>${lastName}</em></h1>

      <p class="hero__role">${escapeHtml(ME.job_title)} <span>·</span> ${escapeHtml(ME.city)}, ${escapeHtml(ME.country)}</p>
      <p class="hero__bio">${escapeHtml(ME.bio)}</p>

      <a class="hero__note" href="#journey">Mon parcours complet${ARROW_SVG}</a>

      <div class="hero__actions">
        <a class="btn btn--primary" href="#projects">Voir mes projets${ARROW_SVG}</a>
        <a class="btn btn--ghost" href="#contact">Me contacter</a>
      </div>

      <ul class="hero__techs" aria-label="Stack principale">${techs}</ul>
    </div>
  `;
}

/* ---------------------------------------------------------
   About
   --------------------------------------------------------- */
function renderAbout() {
  const rows = [
    { ico: "📍", label: "Localisation", value: `${ME.address} · ${ME.city}` },
    { ico: "✉️", label: "Email", value: `<a href="mailto:${escapeHtml(ME.email)}">${escapeHtml(ME.email)}</a>` },
    { ico: "☎️", label: "Téléphone", value: `<a href="tel:${escapeHtml(ME.phone_number)}">${escapeHtml(ME.phone_number)}</a>` },
    { ico: "🎂", label: "Naissance", value: escapeHtml(ME.birthdate) },
  ].map((row) => `
    <div class="info-row">
      <span class="info-row__ico" aria-hidden="true">${row.ico}</span>
      <div><small>${row.label}</small><strong>${row.value}</strong></div>
    </div>`).join("");

  const sectors = (ME.sectors || [])
    .map((sector) => `<span>${escapeHtml(SECTOR_LABELS[sector] || sector)}</span>`).join("");

  const hobbies = (DATA.hobbies || [])
    .map((hobby) => `<li>${escapeHtml(hobby)}</li>`).join("");

  $("#about").innerHTML = `
    <div class="section-head reveal">
      <div>
        <span class="kicker">À propos</span>
        <h2>Un développeur curieux, du front au serveur.</h2>
      </div>
      <p>Je conçois des produits web et mobiles complets, avec une attention particulière à la performance et à la clarté de l'expérience.</p>
    </div>

    <div class="about glass reveal">
      <div class="about__text">
        <p>${escapeHtml(ME.bio)}</p>
        <p>Mon parcours couvre l'ensemble de la chaîne : interfaces React et Next.js, API Symfony, FastAPI et NestJS, applications mobiles React Native, desktop Tauri/Electron, jusqu'au déploiement Docker et à l'administration de serveurs Linux.</p>
        <p>J'utilise l'IA au quotidien pour automatiser ce qui est répétitif et concentrer le temps sur ce qui compte : des produits solides, lisibles et agréables à utiliser.</p>

        <div class="sectors">${sectors}</div>

        <p class="tags-title">En dehors du code</p>
        <ul class="hobby-list">${hobbies}</ul>
      </div>

      <div class="about__side">${rows}</div>
    </div>
  `;
}

/* ---------------------------------------------------------
   Projects
   --------------------------------------------------------- */
function projectCard(project) {
  const index = DATA.notable_projects.indexOf(project);
  const [g1, g2] = GRADIENTS[index % GRADIENTS.length];
  const tech = project.technologies.slice(0, 4)
    .map((t) => `<span>${escapeHtml(t)}</span>`).join("");

  return `
    <button type="button" class="project reveal"
            data-project="${project.id}" data-tilt="7" style="--g1:${g1};--g2:${g2}">
      <div class="project__art${project.image ? " project__art--media" : ""}">
        <span class="project__index">${String(index + 1).padStart(2, "0")}</span>
        ${project.image
          ? `<img src="${escapeHtml(project.image)}" alt="Aperçu de ${escapeHtml(project.title)}" loading="lazy" decoding="async">`
          : `<span class="project__glyph">${escapeHtml(shortName(project.title))}</span>`}
        <span class="project__open" aria-hidden="true">↗</span>
      </div>
      <div class="project__body">
        <h3>${escapeHtml(project.title)}</h3>
        <p>${escapeHtml(project.description)}</p>
        <div class="project__tech">${tech}</div>
      </div>
    </button>`;
}

// Masqué pour le moment : passer à true pour réafficher la liste et le bouton.
const SHOW_EXTRA_PROJECTS = false;

function renderProjects() {
  const projects = DATA.notable_projects;
  const featured = projects.filter((project) => project.display);
  const others = projects.filter((project) => !project.display);
  const extraShown = others.length > 0 && SHOW_EXTRA_PROJECTS;
  const countLabel = (n) => `${n} élément${n > 1 ? "s" : ""}`;

  $("#projects").innerHTML = `
    <div class="section-head reveal">
      <div>
        <span class="kicker">Sélection</span>
        <h2>Projets vedettes</h2>
      </div>
      <p>${escapeHtml(DATA.remark || "")}</p>
    </div>

    <div class="projects-shell glass reveal">
      <div class="window-bar">
        <span class="lights"><span class="l-red"></span><span class="l-yellow"></span><span class="l-green"></span></span>
        <span class="window-bar__title">Projets — ${countLabel(featured.length)}</span>
      </div>

      <div class="projects-grid">${featured.map(projectCard).join("")}</div>
    
      ${extraShown ? `
      <div class="projects-grid projects-grid--extra" id="projects-extra" hidden>
        ${others.map(projectCard).join("")}
      </div>
      <div class="projects-foot">
        <button type="button" class="btn btn--ghost btn--sm" id="toggle-projects"
                aria-expanded="false" aria-controls="projects-extra">
          <span id="toggle-projects-label">Voir d'autres projets</span>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
        </button>
      </div>` : ""}
    </div>
  `;
}

function updateProjectsCount() {
  const title = $(".window-bar__title");
  if (!title) return;
  const visible = document.querySelectorAll("#projects .projects-grid:not([hidden]) .project").length;
  title.textContent = `Projets — ${visible} élément${visible > 1 ? "s" : ""}`;
}

function initProjectsToggle() {
  const button = $("#toggle-projects");
  const extra = $("#projects-extra");
  if (!button || !extra) return;

  const label = $("#toggle-projects-label");

  button.addEventListener("click", () => {
    const open = extra.hidden;
    extra.hidden = !open;
    button.setAttribute("aria-expanded", String(open));
    button.classList.toggle("is-open", open);
    label.textContent = open ? "Réduire la liste" : "Voir d'autres projets";
    updateProjectsCount();

    if (open) {
      extra.querySelectorAll(".project").forEach((card, i) => {
        setTimeout(() => card.classList.add("in"), 50 + i * 50);
      });
    } else {
      extra.querySelectorAll(".project").forEach((card) => card.classList.remove("in"));
      $("#projects").scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
}

/* ---------------------------------------------------------
   Skills
   --------------------------------------------------------- */
function renderSkills() {
  const cards = Object.values(DATA.skills).map((group) => {
    const items = group.items.map((item) => `
      <span class="skill">${iconTag(item.icon, item.name)}${escapeHtml(item.name)}</span>
    `).join("");

    return `
      <article class="skill-card reveal">
        <div class="skill-card__head">
          <h3>${escapeHtml(group.title)}</h3>
          <span class="skill-card__count">${String(group.items.length).padStart(2, "0")}</span>
        </div>
        <div class="skill-list">${items}</div>
      </article>`;
  }).join("");

  $("#skills").innerHTML = `
    <div class="section-head reveal">
      <div>
        <span class="kicker">Boîte à outils</span>
        <h2>Compétences & technologies</h2>
      </div>
      <p>Des outils éprouvés en production, choisis selon le besoin du projet et non par effet de mode.</p>
    </div>
    <div class="skills-grid">${cards}</div>
  `;
}

/* ---------------------------------------------------------
   Journey (expérience + formation + langues)
   --------------------------------------------------------- */
function renderJourney() {
  const experience = DATA.experience.map((job) => `
    <div class="tl-item reveal">
      <div class="tl-card">
        <div class="tl-card__top">
          <div>
            <h4>${escapeHtml(job.job_title)}</h4>
            <span class="tl-card__company">${escapeHtml(job.company)}</span>
            <div class="tl-card__type">${escapeHtml(job.work_type)}</div>
          </div>
          <span class="tl-card__period">${escapeHtml(job.period)}</span>
        </div>
        ${job.highlights?.length
          ? `<ul class="tl-card__list">${job.highlights.map((h) => `<li>${escapeHtml(h)}</li>`).join("")}</ul>`
          : `<p>${escapeHtml(job.description || "")}</p>`}
        <div class="tl-card__tech">
          ${job.technologies.map((t) => `<span>${escapeHtml(t)}</span>`).join("")}
        </div>
      </div>
    </div>`).join("");

  const education = DATA.education.map((edu) => `
    <article class="edu-card reveal">
      <span class="edu-year">${escapeHtml(edu.period || edu.year)}</span>
      <h4>${escapeHtml(edu.program || edu.degree)}</h4>
      <p>${escapeHtml(edu.institution)}</p>
    </article>`).join("");

  const langIcons = ["icons/madagascar-svgrepo-com.svg", "icons/france-svgrepo-com.svg", "icons/English_language.svg"];
  const languages = DATA.languages.map((lang, i) => `
    <li>${iconTag(langIcons[i], lang)} ${escapeHtml(lang)}</li>`).join("");

  $("#journey").innerHTML = `
    <div class="section-head reveal">
      <div>
        <span class="kicker">Parcours</span>
        <h2>Expérience, formation & langues</h2>
      </div>
      <p>Cinq années passées à livrer des projets clients, en remote comme en équipe sur site.</p>
    </div>

    <div class="journey">
      <div>
        <h3 class="block-title">Expérience professionnelle</h3>
        <div class="timeline">${experience}</div>
      </div>

      <div>
        <h3 class="block-title">Formation</h3>
        <div class="edu-list">${education}</div>

        <h3 class="block-title block-title--spaced">Langues</h3>
        <ul class="lang-list">${languages}</ul>
      </div>
    </div>
  `;
}

/* ---------------------------------------------------------
   Contact
   --------------------------------------------------------- */
function renderContact() {
  const socials = ME.links.map((link) => (
    `<a class="social" href="${escapeHtml(link.url)}" target="_blank" rel="noopener noreferrer"
        aria-label="${escapeHtml(link.name)}" title="${escapeHtml(link.name)}">
       ${iconTag(link.icon, link.name)}
     </a>`
  )).join("");

  $("#contact").innerHTML = `
    <div class="contact-card reveal">
      <div>
        <span class="kicker">Contact</span>
        <h2>Un projet à construire&nbsp;?<br><em>Parlons-en.</em></h2>
        <p class="contact-intro">Disponible pour des missions freelance, CDD ou CDI, du développement produit ou un renfort d'équipe. Réponse sous 24 h.</p>

        <div class="contact-actions">
          <a class="btn btn--primary" href="mailto:${escapeHtml(ME.email)}?subject=Projet%20—%20portfolio">Écrire un email${ARROW_SVG}</a>
          <a class="btn btn--ghost" href="https://wa.me/261349191563" target="_blank" rel="noopener noreferrer">WhatsApp</a>
        </div>

        <div class="socials">${socials}</div>
      </div>

      <div class="contact-list">
        <a class="contact-row" href="mailto:${escapeHtml(ME.email)}">
          <span class="contact-row__ico">${iconTag("icons/gmail-svgrepo-com.svg", "Mail")}</span>
          <span><small>Email</small><strong>${escapeHtml(ME.email)}</strong></span>
        </a>
        <a class="contact-row" href="tel:${escapeHtml(ME.phone_number)}">
          <span class="contact-row__ico">${iconTag("icons/phone-svgrepo-com.svg", "Tél")}</span>
          <span><small>Téléphone</small><strong>${escapeHtml(ME.phone_number)}</strong></span>
        </a>
        <button type="button" class="contact-row" id="copy-email" data-email="${escapeHtml(ME.email)}">
          <span class="contact-row__ico">${iconTag("icons/post-office-mark-svgrepo-com.svg", "Copier")}</span>
          <span><small>Copier l'adresse</small><strong id="copy-label">Cliquer pour copier</strong></span>
        </button>
        <a class="contact-row" href="${escapeHtml(CV_PATH)}" download>
          <span class="contact-row__ico">${iconTag("icons/download-svgrepo-com.svg", "CV")}</span>
          <span><small>Document</small><strong>Télécharger le CV (PDF)</strong></span>
        </a>
      </div>
    </div>
  `;
}

/* ---------------------------------------------------------
   Dock
   --------------------------------------------------------- */
const DOCK_ITEMS = [
  { id: "hero", label: "Accueil", icon: '<path d="M3 10.5 12 3l9 7.5"/><path d="M5.5 9.5V21h13V9.5"/>' },
  { id: "about", label: "À propos", icon: '<circle cx="12" cy="8" r="3.6"/><path d="M4.5 20c1.3-3.6 4-5.4 7.5-5.4S18.2 16.4 19.5 20"/>' },
  { id: "skills", label: "Compétences", icon: '<path d="m8.5 8.5-4 3.5 4 3.5"/><path d="m15.5 8.5 4 3.5-4 3.5"/><path d="m13 5-2 14"/>' },
  { id: "projects", label: "Projets", icon: '<path d="M3 7.5A1.5 1.5 0 0 1 4.5 6h4l2 2.5h9A1.5 1.5 0 0 1 21 10v8.5A1.5 1.5 0 0 1 19.5 20h-15A1.5 1.5 0 0 1 3 18.5Z"/>' },
  { id: "journey", label: "Parcours", icon: '<rect x="3" y="7.5" width="18" height="12" rx="2"/><path d="M9 7.5V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1.5"/><path d="M3 12.5h18"/>' },
  { id: "contact", label: "Contact", icon: '<rect x="3" y="5.5" width="18" height="13" rx="2.5"/><path d="m4 7.5 8 5.5 8-5.5"/>' },
];

function renderDock() {
  $(".dock").innerHTML = DOCK_ITEMS.map((item) => `
    <a class="dock__item" href="#${item.id}" data-section="${item.id}" data-label="${item.label}" aria-label="${item.label}">
      <svg viewBox="0 0 24 24" aria-hidden="true">${item.icon}</svg>
    </a>`).join("");
}

/* ---------------------------------------------------------
   Project sheet
   --------------------------------------------------------- */
function openProject(id) {
  const sheet = $("#sheet");
  const panel = $("#sheet-panel");
  const project = DATA.notable_projects.find((p) => p.id === id);
  if (!project) return;

  const detail = DETAILS.find((d) => d.id === id);
  const index = DATA.notable_projects.indexOf(project);
  const [g1, g2] = GRADIENTS[index % GRADIENTS.length];
  const description = detail?.description || project.description;
  const mainTech = detail?.technologies?.main || project.technologies;
  const otherTech = detail?.technologies?.others || [];
  const languages = detail?.languages_used || project.languages_used || [];

  panel.innerHTML = `
    <div class="sheet__hero${project.image ? " sheet__hero--media" : ""}" style="--g1:${g1};--g2:${g2}">
      <button type="button" class="sheet__close" data-close aria-label="Fermer">✕</button>
      ${project.image
        ? `<img src="${escapeHtml(project.image)}" alt="Aperçu de ${escapeHtml(project.title)}">`
        : `<span class="project__glyph">${escapeHtml(shortName(project.title))}</span>`}
    </div>
    <div class="sheet__body">
      <h3 id="sheet-title">${escapeHtml(project.title)}</h3>
      <div class="sheet__cats">${project.categories.map((c) => `<span>${escapeHtml(c)}</span>`).join("")}</div>
      <p>${escapeHtml(description)}</p>

      <div class="sheet__section">
        <h4>Stack principale</h4>
        <div class="sheet__tech">
          ${mainTech.map((t) => `<span class="tech-main">${escapeHtml(t)}</span>`).join("")}
          ${otherTech.map((t) => `<span>${escapeHtml(t)}</span>`).join("")}
        </div>
      </div>

      ${languages.length ? `
      <div class="sheet__section">
        <h4>Langages</h4>
        <div class="sheet__tech">${languages.map((l) => `<span>${escapeHtml(l)}</span>`).join("")}</div>
      </div>` : ""}

      ${project.url ? `
      <div class="sheet__section">
        <a class="btn btn--ghost btn--sm" href="${escapeHtml(externalLink(project.url))}" target="_blank" rel="noopener noreferrer">
          Visiter le site ↗
        </a>
      </div>` : ""}
    </div>
  `;

  sheet.hidden = false;
  document.body.style.overflow = "hidden";
  $(".sheet__close", panel)?.focus();
}

function closeSheet() {
  $("#sheet").hidden = true;
  document.body.style.overflow = "";
}

/* ---------------------------------------------------------
   Interactions
   --------------------------------------------------------- */
function initTilt() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (window.matchMedia("(hover: none)").matches) return;

  document.querySelectorAll("[data-tilt]").forEach((card) => {
    const strength = Number(card.dataset.tilt) || 8;

    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width - 0.5;
      const py = (event.clientY - rect.top) / rect.height - 0.5;
      card.style.setProperty("--ry", `${(px * strength).toFixed(2)}deg`);
      card.style.setProperty("--rx", `${(-py * strength).toFixed(2)}deg`);
    });

    card.addEventListener("pointerleave", () => {
      card.style.removeProperty("--rx");
      card.style.removeProperty("--ry");
    });
  });
}

const THEME_KEY = "pf-theme";
const themeMeta = document.querySelector('meta[name="theme-color"]');

function applyTheme(theme, persist) {
  const root = document.documentElement;
  const isDark = theme === "dark";

  root.dataset.theme = isDark ? "dark" : "light";
  root.style.colorScheme = isDark ? "dark" : "light";
  if (themeMeta) themeMeta.content = isDark ? "#090a10" : "#f2f0ec";

  const button = $("#theme-toggle");
  if (button) {
    const next = isDark ? "clair" : "sombre";
    button.setAttribute("aria-pressed", String(isDark));
    button.setAttribute("aria-label", `Activer le mode ${next}`);
    button.title = `Mode ${next}`;
  }

  if (!persist) return;
  try { localStorage.setItem(THEME_KEY, isDark ? "dark" : "light"); } catch {}
}

const currentTheme = () => document.documentElement.dataset.theme === "dark" ? "dark" : "light";

const storedTheme = () => {
  try { return localStorage.getItem(THEME_KEY); } catch { return null; }
};

function initTheme() {
  applyTheme(currentTheme(), false);

  $("#theme-toggle")?.addEventListener("click", () => {
    applyTheme(currentTheme() === "dark" ? "light" : "dark", true);
  });

  // Tant qu'aucun choix n'est enregistré, on suit la préférence système en direct.
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (event) => {
    if (!storedTheme()) applyTheme(event.matches ? "dark" : "light", false);
  });
}

function initReveal() {
  const targets = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    targets.forEach((el) => el.classList.add("in"));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("in");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

  targets.forEach((el) => observer.observe(el));
}

function initDock() {
  const links = [...document.querySelectorAll(".dock__item")];
  const sections = DOCK_ITEMS
    .map((item) => document.getElementById(item.id))
    .filter(Boolean);

  if (!("IntersectionObserver" in window)) return;

  const spy = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      links.forEach((link) => {
        link.classList.toggle("is-active", link.dataset.section === entry.target.id);
      });
    });
  }, { threshold: 0, rootMargin: "-45% 0px -45% 0px" });

  sections.forEach((section) => spy.observe(section));
}

function initPointerGlow() {
  const glow = $(".cursor-glow");
  if (!glow || window.matchMedia("(hover: none)").matches) return;

  let raf = 0;
  let x = window.innerWidth / 2;
  let y = window.innerHeight / 2;

  window.addEventListener("pointermove", (event) => {
    x = event.clientX;
    y = event.clientY;
    document.body.classList.add("has-pointer");
    if (raf) return;
    raf = requestAnimationFrame(() => {
      glow.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      raf = 0;
    });
  }, { passive: true });
}

function initCopyEmail() {
  const button = $("#copy-email");
  if (!button) return;

  button.addEventListener("click", async () => {
    const email = button.dataset.email;
    const label = $("#copy-label");
    try {
      await navigator.clipboard.writeText(email);
      label.textContent = "Adresse copiée ✓";
    } catch {
      label.textContent = email;
    }
    setTimeout(() => { label.textContent = "Cliquer pour copier"; }, 2200);
  });
}

function initSheet() {
  document.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-project]");
    if (trigger) openProject(Number(trigger.dataset.project));
    if (event.target.closest("[data-close]")) closeSheet();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeSheet();
  });
}

/* ---------------------------------------------------------
   Boot
   --------------------------------------------------------- */
function boot() {
  document.title = `${ME.username} — ${ME.job_title}`;

  const cvLink = $("#cv-link");
  if (cvLink) cvLink.href = CV_PATH;

  const footer = $("#footer-text");
  if (footer) {
    footer.textContent = `© ${new Date().getFullYear()} ${ME.username} · Disponible pour des missions freelance, CDD, CDI.`;
  }

  renderHero();
  renderAbout();
  renderSkills();
  renderProjects();
  renderJourney();
  renderContact();
  renderDock();

  initProjectsToggle();
  initTheme();
  initSheet();
  initCopyEmail();
  initTilt();
  initReveal();
  initDock();
  initPointerGlow();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot);
} else {
  boot();
}
