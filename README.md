# FRUBON — website redesign

A redesign of [frubon.com](http://www.frubon.com) for **FRUBON**, the premium ice cream,
bakery and dairy brand of **Dev Milk Foods Pvt. Ltd.**, Jaipur, Rajasthan.

> *Fru* from **Fruit**. *Bon*, French for **Good**.
> Freshness and goodness as two intrinsic values — "Happiness Served Fresh".

Every section, product category and image from the original site is carried over.
Nothing about the brand's positioning was reinterpreted: the name story, the vision
and mission, the CSR and infrastructure copy and the FAQ answers are the brand's own
words, re-set into a modern design system.

---

## Design system

The palette is sampled directly from the FRUBON wordmark, where `FRU` is leaf green
and `BON` is sun orange:

| Token | Value | Role |
|---|---|---|
| `--fru-green` | `#ACD03A` | Freshness — the `FRU` half of the logo |
| `--bon-orange` | `#F8941E` | Goodness — the `BON` half of the logo |
| `--sky` | `#009FE3` | Secondary, carried from the packaging system |
| `--sun` | `#F5C114` | Secondary, bakery |
| `--ink` | `#241F1A` | Warm near-black for type |
| `--cream` | `#FFFCF7` | Page base — warm, never clinical |

Each product family is themed through a single `data-accent` attribute
(`orange`, `green`, `sky`, `sun`), which re-points `--accent`, `--accent-deep` and
`--accent-soft` for everything inside it.

**Type** — [Fredoka](https://fonts.google.com/specimen/Fredoka) for display (its rounded
geometry matches the wordmark) and [DM Sans](https://fonts.google.com/specimen/DM+Sans)
for body. Both are self-hosted variable fonts in `assets/fonts/`, so the site has no
third-party CDN dependency.

## Structure

```
index.html              Home
about.html              FruStory › About Us
infrastructure.html     FruStory › Infrastructure
csr.html                FruStory › CSR
products.html           All 21 ranges, grouped into 4 families
products/<range>.html   21 category pages, 70 products
promotions.html         FruBuzz › Promotions
events.html             FruBuzz › Events
events/<event>.html     2 event galleries
vlogs.html              FruBuzz › Food Vlogs
presence.html           Our Presence
factory-tour.html       Factory Tour
contact.html            Say Hello
faq.html                FAQ
careers.html            Join Us

assets/css/frubon.css   Design system + components
assets/css/fonts.css    Self-hosted @font-face
assets/js/frubon.js     Nav, reveals, accordion, tabs, lightbox (no dependencies)
assets/img/doc/         Product packshots and galleries
assets/img/ui/          Brand and interface imagery

src/data/site.json      Content model — the single source of truth
src/build.js            Static generator (shell, nav, footer, shared fragments)
src/pages.js            Page definitions
```

## Product families

| Family | Ranges |
|---|---|
| **Ice Cream** | Cups, Frujoy, Frublast, Frucone, Frudae, Frupple, Sweet Surprise, Cassata Slice, Ice Cream Cakes |
| **Sticks & Kulfi** | Frulicks, Frufies, Frudolly, Frupop, Choco Bon, Chunky, Matka Kulfi |
| **Bakery** | Bon Cookies |
| **Dairy** | Milk, Dahi, Chhach, Paneer |

All 21 categories from the original site are preserved, regrouped only for navigation.

## Build

No dependencies, no toolchain — Node 14+ is enough.

```bash
npm run build     # regenerate every page from src/data/site.json
npm run serve     # build, then serve at http://localhost:8080
```

The generator writes the HTML into the repository root, so the repo *is* the
deployable site — publish it to any static host as-is.

To change content, edit `src/data/site.json` (products, categories, copy) or
`src/pages.js` (page composition), then rebuild. `sitemap.xml` and `robots.txt`
are generated too.

### A note on `cutout`

Each product in `site.json` carries a `cutout` boolean, set from whether the source
image has a real alpha channel. Only cutouts get a silhouette `drop-shadow` — applied
to an opaque packshot, `drop-shadow` traces the bounding box and prints a visible
rectangle instead.

## Accessibility & quality

Verified across 36 pages × 3 viewports (1440 / 768 / 390):
no JavaScript errors, no failed requests, no broken images, no horizontal overflow,
one `<h1>` per page, and an `alt` attribute on every image. Focus states are visible,
the lightbox and mobile drawer are keyboard- and Escape-operable, and
`prefers-reduced-motion` disables all animation.

## Forms

The enquiry, franchise and careers forms are front-end only — a static site cannot
receive submissions. Each one calls `preventDefault()` and shows a note where a
handler should be wired in. Point them at your CRM or mail endpoint before launch.
