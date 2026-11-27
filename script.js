const $ = s => document.querySelector(s);
const esc = s => s.replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const grid = $("#grid"), lb = $("#lb");
let list = [], idx = 0, filter = "Tout";

/* Textes issus de data.js */
$(".logo img").src = SITE.avatar;
/* Favicon rond (avatar rogné en cercle + fin contour cacao) */
const fav = document.querySelector("link[rel=icon]");
fav.href = SITE.avatar;                      // repli : avatar carré si le rognage échoue
const fi = new Image(); fi.crossOrigin = "anonymous";
fi.onload = () => { try {
  const S = 64, c = document.createElement("canvas"); c.width = c.height = S;
  const x = c.getContext("2d");
  x.beginPath(); x.arc(S / 2, S / 2, S / 2 - 2, 0, Math.PI * 2);
  x.save(); x.clip(); x.drawImage(fi, 0, 0, S, S); x.restore();
  x.lineWidth = 3; x.strokeStyle = "#2B1A12"; x.stroke();
  fav.type = "image/png"; fav.href = c.toDataURL("image/png");
} catch (e) {} };
fi.src = SITE.avatar;
$("#price").textContent = $("#price2").textContent = SITE.price + "€";
$("#dc").textContent = "@" + SITE.discord;
$("#yr").textContent = new Date().getFullYear();
{ /* « depuis +X ans » calculé depuis SITE.since */
  const [Y, M, D] = SITE.since.split("-").map(Number), now = new Date();
  let y = now.getFullYear() - Y;
  if (now < new Date(now.getFullYear(), M - 1, D)) y--;
  $("#since").textContent = y >= 2 ? `depuis +${y} ans` : y === 1 ? "depuis +1 an" : `depuis ${Y}`;
}
$("#marq").textContent = ("MINIATURES YOUTUBE ✦ " + SITE.name.toUpperCase() + " ✦ ").repeat(10);

const imgSrc = f => SITE.imgBase + encodeURIComponent(f);
let shown = 0;
const card = (m, i, d) => `<li class="card" style="--i:${d}"><button data-i="${i}" aria-label="Agrandir : ${esc(m.title)}">
    <span class="n">N°${String(i + 1).padStart(2, "0")}</span>${m.tag ? `<span class="tg">${esc(m.tag)}</span>` : ""}
    <img src="${imgSrc(m.file)}" data-f="${esc(m.file)}" alt="${esc(m.title)}" loading="lazy">
    <span class="cap"><b>${esc(m.title)}</b><i>par ${esc(m.creator)}</i></span></button></li>`;
function render(more) {
  if (!more) { list = MINIATURES.filter(m => filter === "Tout" || m.creator === filter); shown = 0; grid.innerHTML = ""; }
  const next = Math.min(list.length, shown + (SITE.perPage || 9));
  grid.insertAdjacentHTML("beforeend", list.slice(shown, next).map((m, k) => card(m, shown + k, k)).join(""));
  shown = next;
  const left = list.length - shown;
  $("#more").hidden = !left; $("#more").textContent = `Voir plus (+${left})`;
  $("#count").textContent = list.length;
}
$("#more").onclick = () => render(true);
grid.addEventListener("error", e => { if (e.target.tagName === "IMG") e.target.closest("li")?.classList.add("broken"); }, true);   // image absente → carte « introuvable »
grid.addEventListener("click", e => { const b = e.target.closest("button[data-i]"); if (b) show(+b.dataset.i); });

/* Filtres par créateur (auto) */
const chips = $("#chips");
["Tout", ...new Set(MINIATURES.map(m => m.creator))].forEach(c => {
  const b = document.createElement("button");
  b.textContent = c; b.setAttribute("aria-pressed", c === filter);
  b.onclick = () => { filter = c; chips.querySelectorAll("button").forEach(x => x.setAttribute("aria-pressed", x === b)); render(); };
  chips.append(b);
});

/* Lightbox */
const lbi = lb.querySelector("img");
function show(i) {
  idx = (i + list.length) % list.length;
  const m = list[idx];
  lbi.src = imgSrc(m.file);
  lbi.alt = m.title;
  lb.querySelector("p b").textContent = m.title;
  lb.querySelector("p small").textContent = "par " + m.creator + (m.tag ? " · " + m.tag : "");
  if (!lb.open) lb.showModal();
}
lb.addEventListener("click", e => {
  const a = e.target.closest("[data-a]")?.dataset.a;
  if (a === "close" || e.target === lb) lb.close();
  if (a === "prev") show(idx - 1);
  if (a === "next") show(idx + 1);
});
addEventListener("keydown", e => { if (!lb.open) return; if (e.key === "ArrowLeft") show(idx - 1); if (e.key === "ArrowRight") show(idx + 1); });
let x0; lb.addEventListener("touchstart", e => x0 = e.touches[0].clientX, {passive:true});
lb.addEventListener("touchend", e => { const d = e.changedTouches[0].clientX - x0; if (Math.abs(d) > 50) show(idx + (d < 0 ? 1 : -1)); });

/* Toast + copie du Discord */
function toast(t) { const el = $("#toast"); el.textContent = t; el.classList.add("on"); clearTimeout(toast.t); toast.t = setTimeout(() => el.classList.remove("on"), 2200); }
$("#copy").onclick = () => navigator.clipboard.writeText(SITE.discord).then(() => toast("Pseudo copié ✓ Ajoute moi sur Discord"), () => toast("Discord : " + SITE.discord));

/* Avis clients */
$("#avis").hidden = !REVIEWS.length;
$("#reviews").innerHTML = REVIEWS.map(r => `<li class="review">${r.extra ? `<span class="sticker">${esc(r.extra)}</span>` : ""}<blockquote>${esc(r.text)}</blockquote><cite>${r.avatar ? `<img class="av" src="${esc(r.avatar)}" alt="" width="52" height="52" loading="lazy" referrerpolicy="no-referrer" onerror="this.remove()">` : ""}<span><b>${esc(r.author)}</b>${r.from ? `<small>${esc(r.from)}</small>` : ""}</span></cite></li>`).join("");

/* Avis : défilement latéral + flèches (visibles seulement si ça déborde) */
const rv = $("#reviews"), ra = $("#rarrows");
function rvUpdate() {
  ra.hidden = !(rv.scrollWidth > rv.clientWidth + 4);
  ra.children[0].disabled = rv.scrollLeft <= 2;
  ra.children[1].disabled = rv.scrollLeft + rv.clientWidth >= rv.scrollWidth - 2;
}
ra.onclick = e => { const b = e.target.closest("button"); if (b) rv.scrollBy({ left: +b.dataset.d * rv.clientWidth * .8, behavior: "smooth" }); };
rv.addEventListener("scroll", rvUpdate, { passive: true });
addEventListener("resize", rvUpdate);
rvUpdate();

/* Compteur de vues : monte de 0 à SITE.views quand il apparaît à l'écran (une seule fois) */
{
  const el = $("#views"), v = SITE.views;
  const [u, s] = v >= 1e6 ? [1e6, "M"] : v >= 1e3 ? [1e3, "K"] : [1, ""];
  const t = Math.round(v / u * 10) / 10, dec = Number.isInteger(t) ? 0 : 1;
  const fmt = n => n.toFixed(dec).replace(".", ",") + s;
  el.textContent = fmt(t);
  $(".views").setAttribute("aria-label", "+" + fmt(t) + " vues générées");
  if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
    el.textContent = fmt(0);
    new IntersectionObserver((es, ob) => es.forEach(e => {
      if (!e.isIntersecting) return;
      ob.disconnect();
      const t0 = performance.now() + 350, D = 1800;
      const tick = now => {
        const p = Math.max(0, Math.min((now - t0) / D, 1));
        el.textContent = fmt(t * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }), { threshold: .5 }).observe(el);
  }
}

render();

/* Menu burger (mobile) */
const bar = $(".bar"), bt = $(".burger");
const setMenu = o => { bar.classList.toggle("open", o); bt.setAttribute("aria-expanded", o); bt.setAttribute("aria-label", o ? "Fermer le menu" : "Ouvrir le menu"); };
bt.onclick = () => setMenu(!bar.classList.contains("open"));
$("#menu").addEventListener("click", e => { if (e.target.closest("a")) setMenu(false); });
document.addEventListener("click", e => { if (!bar.contains(e.target)) setMenu(false); });
addEventListener("keydown", e => { if (e.key === "Escape") setMenu(false); });