# portfolio-new — chocolatEnPoudre

Refonte statique HTML/CSS/JS, sans framework ni dépendance à installer. Compatible GitHub Pages.

## Prévisualiser

Ouvre `index.html` dans un navigateur. Les miniatures sont chargées depuis le site public existant :
`https://chocolatenpoudre.github.io/Portfolio/Miniatures/`

## Ajouter / modifier une miniature

Ouvre `gallery.js`, puis ajoute un objet dans le tableau `projects` :

```js
{
  filename: "Nom-exact-du-fichier.png",
  title: "Titre de la vidéo",
  creator: "Nom du créateur",
  description: "Courte note (facultative pour l'instant)",
  category: "youtube"
}
```

Le fichier image doit être présent dans `Portfolio/Miniatures/` sur le dépôt publié. Pas besoin de toucher au HTML ou au CSS. Les images sont référencées avec l'URL publique demandée. Pour changer l'ordre, déplace simplement les objets dans `projects`.

## Personnaliser

- Couleurs et polices : variables CSS en haut de `styles.css`.
- Textes de présentation, tarifs éventuels et liens : `index.html`.
- Miniatures et légendes : tableau `projects` dans `gallery.js`.
- Réseaux / contact : bouton Linktree et pseudo Discord dans `index.html`.

## Fonctionnalités

- Responsive mobile / tablette / desktop.
- Galerie alimentée par une seule liste de données.
- Aperçu grand format, navigation clavier (Échap, ←, →), fermeture au clic extérieur.
- Feedback de copie du pseudo Discord via toast.
- Respect de `prefers-reduced-motion`, navigation sémantique et états focus.
- Aucune bibliothèque JS, aucun build, aucun backend.

## Mise en ligne

Copie le contenu de ce dossier à la racine du dépôt GitHub Pages (ou publie ce dossier comme racine du site). Conserve le chemin `Portfolio/Miniatures/` existant pour les images.

## Inventaire des miniatures repris

Les six fichiers ci-dessous sont ceux référencés dans le `Portfolio/index.html` public consulté pendant la refonte. Je n'ai pas pu énumérer le contenu complet du dossier distant `Portfolio/Miniatures/` via l'interface GitHub disponible ici : vérifie les autres fichiers du dossier et ajoute-les dans `gallery.js` selon le modèle ci-dessus.

- `Minia-1-NA.png`
- `Minia-1-McYakoub.png`
- `Minia-2-FW.png`
- `Minia-2-2-3-Tony.png`
- `Minia-1-Berou.png`
- `Minia-2-Berou.png`
