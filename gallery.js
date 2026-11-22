/*
  GALERIE — MODIFICATION SIMPLE
  Pour ajouter une miniature : duplique un objet ci-dessous et renseigne
  filename (nom exact dans Portfolio/Miniatures), title, creator et description.
  Tu peux aussi utiliser category: "youtube". Aucun changement HTML nécessaire.
*/
const SITE = "https://chocolatenpoudre.github.io/Portfolio/Miniatures/";
const projects = [
  { filename: "Minia-1-NA.png", title: "T'es sûr d'avoir compris Chainsaw Man — Reze Arc ?", creator: "No’Agrume", description: "Composition & narration visuelle", category: "youtube" },
  { filename: "Minia-1-McYakoub.png", title: "Stray : le jour où l'humanité a disparu…", creator: "McYakoub", description: "Ambiance & storytelling", category: "youtube" },
  { filename: "Minia-2-FW.png", title: "Comment écrire une bonne histoire ?", creator: "FireWriting", description: "Composition éditoriale", category: "youtube" },
  { filename: "Minia-2-2-3-Tony.png", title: "Pourquoi la Chine ne se qualifie jamais pour la Coupe du Monde ?", creator: "Tony Coiffeuille", description: "Design & hiérarchie", category: "youtube" },
  { filename: "Minia-1-Berou.png", title: "Comment Hollow Knight a survécu autant de temps ?", creator: "Berou", description: "Univers gaming", category: "youtube" },
  { filename: "Minia-2-Berou.png", title: "La déesse qui a détruit son propre monde", creator: "Berou", description: "Univers gaming", category: "youtube" }
];

const gallery = document.querySelector("#gallery");
const count = document.querySelector("#project-count");
const filters = [...document.querySelectorAll(".filter")];
const lightbox = document.querySelector("#lightbox");
const lightboxImage = document.querySelector("#lightbox-image");
const lightboxCaption = document.querySelector("#lightbox-caption");
const toast = document.querySelector("#toast");
let visibleProjects = projects;
let currentIndex = 0;
let toastTimer;

const imageUrl = project => SITE + encodeURIComponent(project.filename).replaceAll("%2F", "/");
const pad = number => String(number).padStart(2, "0");

function renderGallery(filter = "all") {
  visibleProjects = projects.filter(project => filter === "all" || project.category === filter);
  count.textContent = pad(visibleProjects.length);
  gallery.innerHTML = visibleProjects.map((project, index) => `
    <article class="project-card ${index % 3 === 1 ? "project-card-offset" : ""}">
      <button class="project-open" type="button" data-index="${index}" aria-label="Voir la miniature : ${escapeHtml(project.title)}">
        <span class="project-image-wrap"><img src="${imageUrl(project)}" alt="${escapeHtml(project.title)}" loading="lazy"><span class="project-view">AGRANDIR ↗</span><span class="project-number">${pad(index + 1)}</span></span>
        <span class="project-meta"><span><strong>${escapeHtml(project.title)}</strong><small>${escapeHtml(project.creator)}</small></span><span class="project-arrow">↗</span></span>
      </button>
    </article>`).join("");
  gallery.querySelectorAll(".project-open").forEach(button => button.addEventListener("click", () => openLightbox(Number(button.dataset.index))));
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[char]);
}

function openLightbox(index) {
  currentIndex = index;
  const project = visibleProjects[currentIndex];
  lightboxImage.src = imageUrl(project);
  lightboxImage.alt = project.title;
  lightboxCaption.textContent = `${project.title} — ${project.creator}`;
  lightbox.hidden = false;
  document.body.classList.add("modal-open");
  document.querySelector("#lightbox-close").focus();
}
function closeLightbox() {
  lightbox.hidden = true;
  document.body.classList.remove("modal-open");
}
function stepLightbox(direction) {
  currentIndex = (currentIndex + direction + visibleProjects.length) % visibleProjects.length;
  openLightbox(currentIndex);
}
function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2400);
}

filters.forEach(button => button.addEventListener("click", () => {
  filters.forEach(item => { const active = item === button; item.classList.toggle("active", active); item.setAttribute("aria-pressed", String(active)); });
  renderGallery(button.dataset.filter);
}));
document.querySelector("#lightbox-close").addEventListener("click", closeLightbox);
document.querySelector("#lightbox-prev").addEventListener("click", () => stepLightbox(-1));
document.querySelector("#lightbox-next").addEventListener("click", () => stepLightbox(1));
lightbox.addEventListener("click", event => { if (event.target === lightbox) closeLightbox(); });
document.addEventListener("keydown", event => {
  if (lightbox.hidden) return;
  if (event.key === "Escape") closeLightbox();
  if (event.key === "ArrowLeft") stepLightbox(-1);
  if (event.key === "ArrowRight") stepLightbox(1);
});
document.querySelector("#copy-discord").addEventListener("click", async event => {
  const value = event.currentTarget.dataset.copy;
  try { await navigator.clipboard.writeText(value); showToast("Pseudo Discord copié : " + value); }
  catch { showToast("Pseudo Discord : " + value); }
});
renderGallery();
