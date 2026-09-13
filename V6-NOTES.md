# V6 — cahier de style (chantier `v6-risque`)

Journal des motifs visuels testés sur cette branche. Objectif : que chaque
touche « personnalité » validée par Ryan / Dr Kamtchum soit **documentée
une fois** ici, pour pouvoir être **répétée à l'identique** sur d'autres
pages sans repartir de zéro — plutôt que de rester enfouie dans un commit.

`main` (production) reste inchangée tant qu'un motif n'est pas fusionné.
Preview de cette branche : voir le lien donné par Ryan / Vercel → Deployments.

Statut : 🟡 à valider · 🟢 validé, réutilisable · 🔴 rejeté (gardé en note pour mémoire)

---

## 🟡 1. État actif du menu

**Où** : `src/components/site-header.tsx` (desktop + mobile)
**Quoi** : le groupe de nav correspondant à la page en cours passe en texte
rouge + soulignement (`underline decoration-red decoration-2 underline-offset-4`).
**Comment réutiliser** : rien à faire, c'est déjà site-wide (pas propre à une page).
**Portée** : appliqué à tout le site dès ce commit.

---

## 🟡 2. Slots personnalisables sur `PageHeader`

**Où** : `src/components/ui.tsx`, composant `PageHeader`
**Quoi** : `PageHeader` accepte maintenant, en plus de `title`/`intro` (texte
simple, comportement inchangé pour toutes les pages qui ne les utilisent pas) :
- `titleNode?: ReactNode` — remplace `title` si fourni (pour un titre avec
  accent, mot surligné, fioriture…)
- `introNode?: ReactNode` — idem pour `intro`
- `decor?: ReactNode` — élément libre positionné dans l'en-tête (le
  `Container` de `PageHeader` est `relative`), pour un motif décoratif
  (ex. nuage de points).

**Comment réutiliser** : sur une nouvelle page, passer `titleNode`/`introNode`/
`decor` à `<PageHeader>` en gardant `title`/`intro` en version texte simple
(fallback + accessibilité). Voir `actualites/page.tsx` comme exemple.

---

## 🟡 3. Fioriture bleue (3 tirets)

**Où** : `actualites/page.tsx`, composant `Flourish`
**Quoi** : 3 traits diagonaux bleus, opacité dégressive, à côté d'un mot du titre.
**Comment réutiliser** : copier le composant `Flourish` dans `ui.tsx` (ou
`brain-mark.tsx`) s'il est validé sur plusieurs pages, pour ne pas le dupliquer.

---

## 🟡 4. Mot surligné (fond translucide, coins arrondis)

**Où** : `actualites/page.tsx`, dans `titleNode` — span avec
`bg-[color-mix(in_srgb,var(--color-blue)_18%,transparent)] rounded-[10px] px-2`.
**Quoi** : met en avant un mot/groupe de mots dans un titre (ici « Stroke Action »).
**Comment réutiliser** : même recette, changer la couleur (`--color-blue` ou
`--color-red`) et le mot ciblé selon la page.
**Note** : le mot souligné en rouge dans l'intro (« monthly ») réutilise une
recette déjà existante ailleurs sur le site (accent du CTA de l'accueil,
`underline decoration-red decoration-[3px]`) — rien de nouveau à documenter.

---

## 🟡 5. Nuage de points rouges

**Où** : `actualites/page.tsx`, composant `DotCluster`
**Quoi** : 7 points rouges dispersés en haut à droite de l'en-tête, écho du
point rouge du logo / du motif "neurones".
**Comment réutiliser** : copier le composant, ajuster les coordonnées SVG
selon l'espace disponible sur la nouvelle page.

---

## 🟢 6. Icônes de catégorie (au lieu d'émojis)

**Où** : `actualites/page.tsx`, table `CAT_STYLES` — bibliothèque **`lucide-react`**
(ajoutée en dépendance, `npm install lucide-react`).
**Historique** : Ryan voulait des émojis devant les titres d'articles (effet
« vivant »). 1er essai = icônes SVG maison — jugées « trop génériques »
(calendrier plein, ampoule, silhouettes). Remplacées par des icônes Lucide
plus précises et parlantes :
- Campagne → `Megaphone` (mobilisation, plus parlant qu'un calendrier)
- Éducation → `Activity` (courbe de pouls — ancrage santé/cardiovasculaire,
  plus spécifique qu'une ampoule « idée » générique)
- Association → `HeartHandshake` (solidarité/bénévolat, plus chaleureux que
  deux silhouettes)

**Comment réutiliser** : `import { XxxIcon } from "lucide-react"` puis
`<XxxIcon className="h-5 w-5" strokeWidth={1.75} />` (1.75 pour matcher le
poids de trait des icônes maison déjà sur le site, ex. `PdfIcon`). Parcourir
https://lucide.dev/icons pour trouver une icône précise plutôt qu'une icône
générique — c'est le point que Ryan a corrigé ici.
**Ajouter une nouvelle catégorie** : une entrée dans `CAT_STYLES` (icône
Lucide + couleur de fond + couleur de texte).

---

## 🔴 7. Palette de couleurs par catégorie (vert / violet / rose)

**Où** : `actualites/page.tsx`, `CAT_STYLES` (`bg`, `iconBg`, `text`)
**Quoi** : 3 teintes douces (vert `#EAF2EA`/`#3F6B48`, violet `#EDEAF6`/`#5B4E96`,
rose `#F8EAEE`/`#A84360`) pour distinguer Campagne / Éducation / Association.
**⚠️ IMPORTANT** : la charte graphique officielle (`Charte_graphique.pdf`,
validée par le Dr Kamtchum) ne définit que **bleu `#2A9DF4` + rouge `#F42A2A`**.
Ces 3 teintes sont une extension **non validée**, posée uniquement sur cette
page pour l'instant.
**Avant d'étendre à d'autres pages** : faire valider explicitement par le
Dr Kamtchum. Si refusé, remplacer par des teintes de bleu/rouge/neutre
(ex. bleu clair, rouge clair, gris chaud) pour rester dans la charte.

---

## 🔴 8. Gouttes qui tombent le long du bord droit — REJETÉ

Dessiné par Ryan sur Figma, implémenté (rail de 9 gouttes SVG en forme de
larme, `absolute inset-y-0 right-0`, animation `sa-drip` en boucle), puis
**retiré à la demande de Ryan** ("pas beau"). Code + animation CSS enlevés
de `actualites/page.tsx` et `globals.css`. Ne pas reproduire ailleurs.

---

## 🟡 9. Formes qui dérivent lentement en fond (hero de l'accueil)

**Où** :
- `src/app/globals.css` → `@keyframes sa-drift` + classe `.sa-float`
  (va-et-vient via `--dx`/`--dy`/`--dur`/`--delay`, coupé si
  `prefers-reduced-motion: reduce`)
- `src/app/[lang]/page.tsx` → composant `HeroDrift` (3 points), placé dans
  la section HERO (passée en `relative overflow-hidden`)

**Quoi** : Ryan a demandé si des formes animées en arrière-plan pouvaient
apporter de la beauté sur un site d'asso. 1re version (5 points rouges,
jusqu'à 300px, opacité 11-14%) jugée trop envahissante après revue critique
(`/web-design-engineer`, 2026-09-13) : les points passaient derrière le
bloc de texte et les boutons CTA, et cumulés avec la ligne d'alerte rouge
"neurones perdus" + le point rouge final du titre, ça diluait la règle
« rouge = alerte rare ». **Version corrigée** :
- 3 points seulement, taille plafonnée via `clamp(min, vw, max)` (donc
  raisonnable sur mobile, contrairement à des px fixes), opacité 8-10%.
- **gris-bleu très pâle** (`bg-blue-ink`) au lieu de rouge — le rouge reste
  100% dédié à l'alerte et au point final du titre, qui gagnent en force.
- repoussés dans les coins vides : haut-gauche et bas-gauche hors du bloc
  de texte (`left` négatif ou proche de 0%), un dans la zone photo (`left`
  ~84%, en grande partie masqué par la photo elle-même).

**Règle à respecter absolument** : ce motif reste réservé aux **zones
calmes** (hero, bandes de fond, séparateurs), **jamais derrière du texte
ou un bouton**, et **jamais** derrière la grille FAST, les numéros
d'urgence ou toute zone qu'il faut lire vite en situation réelle — la
lisibilité de l'urgence prime toujours sur l'esthétique.

**Comment réutiliser** : copier `HeroDrift`/`HERO_DRIFTS` (`.sa-float` déjà
partagé dans globals.css) ; toujours dimensionner en `clamp()` (jamais en
px fixes) ; positionner uniquement dans les coins/marges vides de la
section cible, jamais sur une zone de lecture ; toujours envelopper la
section dans `relative overflow-hidden` et placer le composant de dérive
en 1ᵉʳ enfant avec `-z-10` pour qu'il reste derrière le texte.

---

## 🟡 10. Cartes teintées pour « Nos piliers » (accueil) + icônes fournies par Ryan

**Où** : `src/app/[lang]/page.tsx`, `PILLAR_STYLES` ; icônes dans `public/icons/`
(`pillar-education.png`, `pillar-research.png`, `pillar-training.png`,
`pillar-support.png` — fournies par Ryan, à l'origine téléchargées dans
`Downloads/`, probablement Flaticon).

**Quoi** : remplace la liste à puces (petit BrainMark + lignes séparées par
des filets) par une **grille de 4 cartes teintées** (1 col mobile, 2 sm,
4 lg), chacune avec l'icône fournie + titre en gras + description —
d'après une référence apportée par Ryan (cartes colorées "Our Impact").

**Palette** : réutilise 2 teintes déjà posées sur Blog/News (violet
Éducation, rose Soutien) + le **bleu de charte existant** pour Recherche
(`#E6F1FB`, pas une couleur nouvelle) + un pêche nouveau pour Formation
(`#FBEEE0`). Devient la **palette de catégories partagée du site** — à
réutiliser telle quelle plutôt que d'inventer une nouvelle teinte à chaque
section (cf. point 7, toujours en attente de validation charte).

**⚠️ Licence des icônes à vérifier** : les fichiers viennent du dossier
Downloads de Ryan, noms de fichiers en français façon Flaticon
(ex. "chapeau-de-remise-de-diplome.png"). Si elles viennent de Flaticon en
compte gratuit, une **attribution est requise** (lien vers flaticon.com en
pied de page ou mentions légales) sauf licence Pro. À confirmer par Ryan
avant lancement public.

**Comment réutiliser** : ajouter une entrée dans `PILLAR_STYLES` (ou une
table équivalente) avec `bg` + chemin d'icône ; garder les 4 teintes déjà
choisies pour toute nouvelle section de ce type plutôt que d'en inventer.

---

## 🟡 11. Annotations manuscrites (HandNote / InkUnderline)

**Où** : `src/components/ink-marks.tsx` (nouveau) ; police `Caveat` chargée
dans `src/app/[lang]/layout.tsx` (`--font-caveat`, jamais utilisée pour du
texte fonctionnel, uniquement décoratif) ; utilisé dans
`src/app/[lang]/education-avc/page.tsx`.

**Quoi** : référence apportée par Ryan (ancienne V3.7, captures d'écran) —
des petites notes en écriture manuscrite, parfois cerclées ("every minute
counts", "preventable"), et des mots mis en évidence en rouge avec un
soulignement "à la main" (tracé SVG légèrement irrégulier, pas une ligne
droite ni le `decoration-red` déjà existant ailleurs sur le site).
- `HandNote` : texte en police Caveat + un tracé SVG cerclé (`variant="circle"`)
  ou en soulignement ondulé (`variant="underline"`) derrière.
- `InkUnderline` : garde la police normale, ajoute juste le trait ondulé
  rouge sous le texte (utilisé pour le mot "FAST" dans le titre de la
  section FAST d'Éducation AVC).
- Appliqué : note "every second counts"/"chaque seconde compte" à côté du
  titre FAST (reprend la phrase déjà utilisée sur l'accueil, rien
  d'inventé) ; note "preventable"/"évitable" sur la carte "80%" des
  chiffres clés (fond bleu foncé → utiliser `var(--color-red)`, pas
  `--color-red-ink`, pour le contraste).

**Comment réutiliser** : importer `HandNote`/`InkUnderline` ; toujours
`hidden sm:inline-block` (annotation en trop sur mobile étroit) ; jamais
sur une zone d'urgence/FAST à lire vite (même règle que le motif 9) ;
varier circle/underline pour ne pas répéter deux fois le même tracé sur
une page.

---

## 🟡 12. Cartes de programmes teintées et translucides (Nos actions)

**Où** : `src/app/[lang]/nos-actions/page.tsx`, table `PROGRAM_STYLES`.

**Quoi** : référence apportée par Ryan (ancienne V3.7) — chaque programme
avait une couleur + une icône, encadré. Remis au goût du jour : **fonds
translucides** (`color-mix(in srgb, <teinte> ~30-38%, transparent)`,
contrairement aux cartes "Nos piliers" du point 10 qui sont en teinte
pleine/opaque) pour que le papier du site reste visible en transparence,
plus un badge icône rond + le numéro du programme dans la teinte du
programme, plus le petit repère de puce (`bg-red` générique) recoloré
dans la teinte du programme au lieu du rouge (le rouge reste réservé à
l'alerte, cf. motif 9).

**Palette** : les 5 teintes déjà utilisées ailleurs sur le site — violet
et rose (Blog/News), bleu de charte (Nos piliers), pêche (Nos piliers),
vert (Blog/News) pour le 5e programme. Aucune couleur nouvelle inventée.
Icônes lucide-react : Megaphone (Éducation publique), Microscope
(Recherche scientifique), GraduationCap (Formation professionnelle),
HeartHandshake (Soutien aux patients), Users (Engagement).

**Comment réutiliser** : ajouter une entrée à `PROGRAM_STYLES` (`bg`
en `color-mix()`, `iconBg` en teinte pleine claire, `text` en teinte
profonde, `Icon` lucide) ; garder l'ordre synchronisé avec `w.programs`.

---

## 🟡 13. Apparition "grossissement + scintillement" sur les grilles de cartes

**Où** : `src/components/reveal.tsx` (composant `Reveal`, IntersectionObserver,
même famille que `CountUp`/`SecondsBand`) + `.sa-reveal`/`.sa-reveal-in`
dans `globals.css`. Appliqué sur les cartes "Nos piliers" (accueil) et
les cartes de programmes (Nos actions).

**Quoi** : Ryan s'attendait à un effet à l'arrivée sur les cartes teintées
("il n'y a pas d'effet grossissement et scintillance, je m'attends à
plus"). Chaque carte, quand elle entre dans le viewport, grossit (scale
0.86 → 1 + fondu) puis un reflet balaie la carte une fois (le
"scintillement"). Décalage en cascade via `delay={i * 90}` (piliers) /
`delay={i * 80}` (programmes).

**Comment réutiliser** : envelopper chaque carte d'une grille dans
`<Reveal delay={i * 90}>...</Reveal>` (garder les classes visuelles de la
carte sur `Reveal` via `className`, ou sur l'élément enfant si la carte a
déjà un style inline comme les cartes de programmes). Coupé si
`prefers-reduced-motion`.

---

## 🟡 14. Surlignage + soulignement + fioriture étendus à tout le site

**Où** : `src/components/ink-marks.tsx` (`highlightWord`, `underlineWord`,
`Flourish`, partagés) ; `PageHeader` et `SectionHead` (`src/components/ui.tsx`)
acceptent maintenant des props `highlight`/`underline` qui appliquent la
recette automatiquement (mot surligné translucide + fioriture bleue sur
le titre, mot souligné en rouge sur l'intro) sans avoir à reconstruire un
`titleNode`/`introNode` à la main.

**Quoi** : posé pour la 1re fois sur Blog/News (points 2-4), Ryan a
demandé de l'étendre partout ("applique-le partout stp sur tout le
site"). Fait sur : accueil (hero, Qui sommes-nous, Nos piliers, aperçu
FAST, Chiffres, Ils en parlent), et l'en-tête de chaque page intérieure
(À propos, Éducation AVC, FAQ, Contact, Nous soutenir, Documents clés,
Galerie, Gouvernance, Espace membres, Nos actions). Un mot réel déjà
présent dans le texte est choisi à chaque fois — jamais de texte ajouté.

**Comment réutiliser** : passer `highlight="mot du titre"` et/ou
`underline="mot de l'intro"` à `PageHeader`/`SectionHead`. Si le mot n'est
pas trouvé dans le texte, la fonction renvoie le texte tel quel (pas
d'erreur). Pour un cas plus complexe (fioriture positionnée différemment,
plusieurs surlignages...), reconstruire `titleNode`/`introNode` à la main
comme sur Blog/News et Nos actions (le fallback `highlight`/`underline`
est ignoré dès que `titleNode`/`introNode` est fourni).

---

## 🟡 15. Nos valeurs (À propos) : cartes teintées translucides + icônes

**Où** : `src/app/[lang]/a-propos/page.tsx`, table `VALUE_STYLES`.

**Quoi** : référence apportée par Ryan (cartes colorées type pâtisserie —
icône, titre, texte, sur fond coloré). Remplace la liste à puces (BrainMark
+ lignes séparées par des filets, avec effet de grossissement au survol)
par une **grille de 4 cartes** — même recette que Nos actions (fonds
translucides `color-mix()`, cadre hairline, coins nets, icône ronde),
palette entièrement réutilisée (violet/bleu charte/pêche/rose). Icônes
lucide-react : Heart (Compassion), Flame (Dedication), ShieldCheck
(Integrity), Award (Professionalism). Garde l'effet de grossissement au
survol (icône + titre) et ajoute l'apparition Reveal en cascade (motif 13).

**Comment réutiliser** : même schéma que `PROGRAM_STYLES` (Nos actions) —
ajouter une entrée `{ bg, iconBg, text, Icon }` par carte.

---

## 🐛 Bug corrigé — fioriture inline (motif 14) sur Blog/News

Le titre de Blog/News (`n.titleLead`/`titleMid`/`titleAccent`) construisait
encore sa fioriture à la main (`Flourish` inline juste avant "at Stroke
Action"), donc il n'a pas profité du correctif du motif 14 (fioriture
ancrée au coin du mot surligné) lors du passage précédent — elle
chevauchait "happening". Remplacé par un appel à `highlightWord(...,
{flourish:true})`, comme partout ailleurs. **Si un futur titre est
reconstruit à la main (`titleNode` personnalisé) plutôt que via la prop
`highlight`, penser à repasser par `highlightWord`/`underlineWord` plutôt
que de redessiner la fioriture soi-même.**

---

## 🐛 Bug corrigé — virgule qui saute à la ligne après un mot surligné

`highlightWord()` posait le mot surligné dans un `<span class="inline-block">`.
Un `inline-block` introduit une opportunité de saut de ligne juste après
lui : sur "Four pillars, one conviction.", la virgule qui suit
immédiatement le span se retrouvait seule au début de la ligne suivante
(retour Ryan, capture à l'appui). **Fix : `inline` au lieu de
`inline-block`** — un span inline avec fond + `border-radius` + padding
fonctionne très bien visuellement (effet "surligneur") et ne casse plus
la ponctuation qui suit. `position: relative` reste nécessaire (et
fonctionne) pour ancrer la fioriture en `absolute`.

---

## 🟡 16. Grossissement au survol sur les listes/grilles "plates"

**Où** : `src/app/[lang]/education-avc/page.tsx` (facteurs de risque,
grille FAST, "Le saviez-vous"), `src/app/[lang]/page.tsx` (aperçu FAST,
`Stat`), `src/app/[lang]/nos-actions/page.tsx` (Our Impact).

**Quoi** : Ryan a repéré que plusieurs listes/grilles du site n'avaient
aucun retour au survol ("on dirait juste qu'ils sont mis là comme ça") —
alors que FAQ et Documents clés en ont déjà un. Recette FAQ reprise telle
quelle : `group` sur la ligne/case, `hover:bg-paper-deep` (ou une teinte
de la couleur locale via `color-mix()`), `group-hover:scale-[1.03-1.12]`
sur le texte/chiffre/lettre à l'intérieur (`origin-left`,
`motion-reduce:group-hover:scale-100`).
**Note** : posé aussi sur la grille FAST malgré la règle "pas d'effet
sur les zones d'urgence" (motifs 9/11) — c'est une interaction au survol
volontaire de l'utilisateur, pas une animation ambiante qui gênerait la
lecture rapide en situation réelle ; à surveiller si Ryan préfère
finalement l'en exclure.

**Comment réutiliser** : `group` sur le conteneur de la ligne/case,
`hover:bg-...` + `transition-colors`, et sur l'élément à mettre en avant
`origin-left group-hover:scale-[x] motion-reduce:group-hover:scale-100`.

---

## 🟡 17. "Our Story" (À propos) : mêmes effets que Éducation AVC

**Où** : `src/app/[lang]/a-propos/page.tsx`, section "Notre histoire".

**Quoi** : section repérée par Ryan comme totalement plate (texte brut,
aucun effet) — comparée à la richesse de la section FAST d'Éducation AVC.
Ajouté : soulignement rouge sur "freedom of association"/"liberté
d'association" (texte réel, phrase légale citée), surlignage translucide
sur "preventable"/"évitable" dans le 2e paragraphe, note manuscrite
`HandNote` ("our origin"/"notre origine") à côté de l'encart année de
fondation, et un léger zoom au survol sur la photo (`group-hover:scale-
[1.06]` sur l'`<img>`, conteneur `overflow-hidden`).

---

## À trancher avec Ryan / Dr Kamtchum avant d'aller plus loin
1. Icônes SVG (point 6) vs émojis réels — confirmer.
2. Palette de catégories (point 7) — à valider par le Dr Kamtchum ou à
   ramener dans bleu/rouge.
3. Une fois ces deux points tranchés, choisir la/les prochaine(s) page(s) à
   traiter avec les mêmes motifs (menu actif = déjà site-wide ; le reste au cas
   par cas).
