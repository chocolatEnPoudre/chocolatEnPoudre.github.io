/* ============================================================
   ✏️  LE SEUL FICHIER À MODIFIER
   Ajouter une minia : copie une ligne dans MINIATURES, change
   file / title / creator. La plus récente en premier.
   Le fichier doit être dans le dossier assets/ du dépôt.
   Mention facultative (ex : minia d'entraînement) : ajoute  tag: "Entraînement"  dans la ligne.
   Les filtres par créateur se mettent à jour tout seuls.
   ============================================================ */
const SITE = {
  name: "chocolatEnPoudre",
  avatar: "https://cdn.discordapp.com/avatars/1215593183925502025/70c3734334bd28e501c61231f53a3e45.png?size=128", // ta photo de profil (logo en haut)
  perPage: 6,                                  // miniatures affichées avant « Voir plus »
  since: "2024-08-01",                         // début de ton activité (AAAA-MM-JJ) : calcule « depuis +X ans »
  price: 15,                                   // € par miniature
  discord: "chocolatEnPoudre",
  imgBase: "assets/",                          // dossier des images (relatif à la racine du dépôt, SANS « / » devant)
  views: 200000,                               // vues générées : le site écrit tout seul « +200K », « +1,2M »…
};

const MINIATURES = [
  { file: "Minia-1-NA.png",       creator: "No'Agrume",       title: "T'es Sûr d'Avoir Compris CHAINSAW MAN Reze arc ?" },
  { file: "Minia-1-McYakoub.png", creator: "McYakoub",        title: "Stray : le jour où l'humanité a DISPARU… mais pas ses ERREURS" },
  { file: "Minia-2-FW.png",       creator: "FireWriting",     title: "Conférence Comment Écrire une Bonne histoire ?" },
  { file: "Minia-2-2-3-Tony.png", creator: "Tony Coiffeuille",title: "Pourquoi la Chine ne se qualifie JAMAIS pour la Coupe du Monde ?" },
  { file: "Minia-1-Tony.png",     creator: "Tony Coiffeuille",title: "Jay Chou : comment une star taïwanaise est devenue le roi de la musique chinoise" },
  { file: "Minia-5-Tony.png",     creator: "Tony Coiffeuille",title: "Est-ce que Mbappé aurait dû s'excuser ? Quelles conséquences ?" },
  { file: "Minia-1-Berou.png",    creator: "Berou",           title: "Comment Hollow Knight a survécu AUTANT de temps ?" },
  { file: "Minia-2-Berou.png",    creator: "Berou",           title: "La Déesse Qui a Détruit Son Propre Monde" },
  { file: "Minia-1-Ichinose.png", creator: "Ichinose102",     title: "Wonder Egg Priority méritait mieux…" },
  { file: "Minia-2-Mathart.png",  creator: "Mathart",         title: "Se faire de l'ARGENT quand on est JEUNE !" },
  { file: "Minia-6-Mathart.png",  creator: "Mathart",         title: "FAIS des ÉTUDES (et voilà pourquoi)" },
  { file: "Minia-1-Steaal.png",   creator: "Steaal",          title: "L’homme retrouvé mort sur une plage… ce papier va vous glacer le sang" },
  { file: "Minia-1-CharlieHaid.png", creator: "Charlie Haid", title: "Ce que le scroll fait vraiment à votre cerveau.", tag: "Entraînement" },
  { file: "Minia-1-CARTEUR.png", creator: "CARTEUR", title: "3 histoires VRAIES (et tragiques) cachées dans nos jeux vidéo ! (Elden Ring, RDR2, Man of Medan)"},
];

/* ============================================================
   💬 AVIS CLIENTS : copie un bloc { ... }, colle-le dans la liste.
   author = qui parle | from = chaîne / équipe (facultatif)
   avatar = lien de sa photo de profil (facultatif)
   text   = le message (\n pour passer à la ligne)
   extra  = petit autocollant en option (ex : "absolute cinema")
   ============================================================ */
const REVIEWS = [
  { author: "Lucas vr", from: "FireWriting", avatar: "https://cdn.discordapp.com/avatars/1333066144369606747/14d796f6d36240662631a42537844b6a.webp?size=128", text: "On aime beaucoup ton travail, c'est vraiment clean et tu as été très rapide.\nOn refera appel à toi\u00a0!" },
  { author: "Berou", avatar: "https://yt3.googleusercontent.com/kxeSzbJ8f2RNMYvFy4uV1m97m19mTl03s4fKHrUiMK-N7Uk-PVIU3iyFRlv7NYhcrv6koe8y=s160-c-k-c0x00ffffff-no-rj", text: "Propre, rapide, tout a été respecté et les retours ont été rapides. Que demander de plus\u00a0?" },
];
