#!/usr/bin/env node
/**
 * FRUBON — static site builder.
 * Reads src/data/site.json and writes the full site to the repo root.
 * Zero dependencies: node src/build.js
 */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const DATA = JSON.parse(fs.readFileSync(path.join(__dirname, 'data/site.json'), 'utf8'));
const { brand, groups, categories, gallery } = DATA;

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const catsIn = gid => categories.filter(c => c.group === gid);
const groupOf = gid => groups.find(g => g.id === gid);
const byId = id => categories.find(c => c.id === id);

/* ---------- icons ---------- */
const I = {
  arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  caret: '<svg class="caret" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>',
  milk: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2h8M9 2v3.2L6.2 10A4 4 0 0 0 6 11.5V20a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-8.5a4 4 0 0 0-.2-1.5L15 5.2V2"/><path d="M6.5 13h11"/></svg>',
  leaf: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20c0-8 6-14 16-14 0 10-6 15-13 15H4z"/><path d="M4 20c4-4 7-6 11-7.5"/></svg>',
  flask: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 2v6.5L4.2 17A3 3 0 0 0 6.8 21.5h10.4A3 3 0 0 0 19.8 17L15 8.5V2"/><path d="M8 2h8M6.6 14h10.8"/></svg>',
  heart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20.8 5.6a5 5 0 0 0-7.1 0L12 7.3l-1.7-1.7a5 5 0 1 0-7.1 7.1L12 21.5l8.8-8.8a5 5 0 0 0 0-7.1z"/></svg>',
  spark: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.5l2.2 5.8 5.8 2.2-5.8 2.2L12 18.5l-2.2-5.8L4 10.5l5.8-2.2z"/></svg>',
  pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s7-6.2 7-11.5A7 7 0 0 0 5 10.5C5 15.8 12 22 12 22z"/><circle cx="12" cy="10.5" r="2.6"/></svg>',
  fb: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H8v3h2v7h3v-7h3l1-3h-4v-2c0-.6.4-1 1-1z"/></svg>',
  ig: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="3.6"/><circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none"/></svg>',
  tw: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 5.9c-.7.3-1.5.5-2.4.6.9-.5 1.5-1.3 1.8-2.3-.8.5-1.7.8-2.6 1a4.1 4.1 0 0 0-7 3.7A11.7 11.7 0 0 1 3.4 4.6a4.1 4.1 0 0 0 1.3 5.5c-.7 0-1.3-.2-1.9-.5a4.1 4.1 0 0 0 3.3 4 4.2 4.2 0 0 1-1.9.1 4.1 4.1 0 0 0 3.8 2.9A8.3 8.3 0 0 1 2 18.3a11.7 11.7 0 0 0 6.3 1.8c7.5 0 11.7-6.3 11.7-11.8v-.5c.8-.6 1.5-1.3 2-2z"/></svg>',
  li: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6.9 8.5H3.6V21h3.3V8.5zM5.3 3a1.9 1.9 0 1 0 0 3.9 1.9 1.9 0 0 0 0-3.9zM21 13.9c0-3.4-1.8-5-4.2-5-1.9 0-2.8 1.1-3.3 1.8V8.5H10.2V21h3.3v-6.9c0-1.5.8-2.3 1.9-2.3s1.8.7 1.8 2.3V21H21v-7.1z"/></svg>',
};

/* ---------- shell ---------- */
function layout(o) {
  const d = o.depth || 0;
  const p = d ? '../'.repeat(d) : '';
  const u = h => (h.startsWith('http') || h.startsWith('#')) ? h : p + h;
  const cur = o.nav || '';

  const prodMenu = groups.map(g =>
    `<div class="menu-group">${esc(g.name)}</div>` +
    catsIn(g.id).map(c => `<a href="${u('products/' + c.id + '.html')}">${esc(c.name)}</a>`).join('')
  ).join('');

  const nav = `
      <nav class="nav" id="nav">
        <div class="has-menu">
          <button aria-expanded="false">FruStory ${I.caret}</button>
          <div class="menu">
            <a href="${u('about.html')}">About Us</a>
            <a href="${u('infrastructure.html')}">Infrastructure</a>
            <a href="${u('csr.html')}">CSR</a>
          </div>
        </div>
        <div class="has-menu">
          <button aria-expanded="false">Products ${I.caret}</button>
          <div class="menu menu--cols">${prodMenu}</div>
        </div>
        <div class="has-menu">
          <button aria-expanded="false">FruBuzz ${I.caret}</button>
          <div class="menu">
            <a href="${u('promotions.html')}">Promotions</a>
            <a href="${u('events.html')}">Events</a>
            <a href="${u('vlogs.html')}">Food Vlogs</a>
          </div>
        </div>
        <a href="${u('presence.html')}"${cur === 'presence' ? ' class="is-current"' : ''}>Our Presence</a>
        <a href="${u('factory-tour.html')}"${cur === 'factory' ? ' class="is-current"' : ''}>Factory Tour</a>
        <a href="${u('contact.html')}" class="btn btn--primary nav-cta">Say Hello</a>
      </nav>`;

  const footCats = groups.map(g =>
    `<li><a href="${u('products.html')}#${g.id}">${esc(g.name)}</a></li>`).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(o.title)}</title>
<meta name="description" content="${esc(o.desc)}">
<meta name="theme-color" content="#ACD03A">
<meta property="og:title" content="${esc(o.title)}">
<meta property="og:description" content="${esc(o.desc)}">
<meta property="og:type" content="website">
<meta property="og:image" content="${u(o.ogImage || 'assets/img/ui/logo.png')}">
<link rel="icon" href="${u('assets/img/ui/logo.png')}">
<link rel="preload" href="${u('assets/fonts/fredoka-var-latin.woff2')}" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="${u('assets/fonts/dm-sans-var-latin.woff2')}" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="${u('assets/css/fonts.css')}">
<link rel="stylesheet" href="${u('assets/css/frubon.css')}">
</head>
<body${o.accent ? ` data-accent="${o.accent}"` : ''}>

<div class="scroll-bar" aria-hidden="true"></div>

<header class="site-head">
  <div class="wrap--wide">
    <a class="brandmark" href="${u('index.html')}" aria-label="FRUBON — home">
      <img src="${u(brand.logo)}" alt="FRUBON" width="180" height="42">
    </a>
    <button class="burger" aria-label="Menu" aria-controls="nav" aria-expanded="false"><span></span></button>
    ${nav}
    <div class="nav-scrim" aria-hidden="true"></div>
  </div>
</header>

<main>
${o.body}
</main>

<footer class="site-foot">
  <div class="wrap">
    <div class="foot-grid">
      <div class="foot-brand">
        <img src="${u(brand.logo)}" alt="FRUBON">
        <p>${esc(brand.tagline)}. Ice cream, bakery and dairy made in ${esc(brand.city)} — a ${esc(brand.parent)} brand.</p>
        <div class="socials">
          <a href="${brand.social.facebook}" aria-label="Facebook" rel="noopener" target="_blank">${I.fb}</a>
          <a href="${brand.social.instagram}" aria-label="Instagram" rel="noopener" target="_blank">${I.ig}</a>
          <a href="${brand.social.twitter}" aria-label="Twitter" rel="noopener" target="_blank">${I.tw}</a>
          <a href="${brand.social.linkedin}" aria-label="LinkedIn" rel="noopener" target="_blank">${I.li}</a>
        </div>
      </div>
      <div>
        <h4>FruStory</h4>
        <ul>
          <li><a href="${u('about.html')}">About Us</a></li>
          <li><a href="${u('infrastructure.html')}">Infrastructure</a></li>
          <li><a href="${u('csr.html')}">CSR</a></li>
          <li><a href="${u('factory-tour.html')}">Factory Tour</a></li>
          <li><a href="${u('careers.html')}">Join Us</a></li>
        </ul>
      </div>
      <div>
        <h4>Products</h4>
        <ul>${footCats}<li><a href="${u('products.html')}">All ${categories.length} ranges</a></li></ul>
      </div>
      <div>
        <h4>Connect</h4>
        <ul>
          <li><a href="${u('presence.html')}">Our Presence</a></li>
          <li><a href="${u('promotions.html')}">Promotions</a></li>
          <li><a href="${u('events.html')}">Events</a></li>
          <li><a href="${u('vlogs.html')}">Food Vlogs</a></li>
          <li><a href="${u('faq.html')}">FAQ</a></li>
          <li><a href="${u('contact.html')}">Say Hello</a></li>
          <li style="margin-top:1rem"><a href="tel:${brand.phoneHref}"><strong>${esc(brand.phone)}</strong></a></li>
          <li><a href="mailto:${brand.email}">${esc(brand.email)}</a></li>
        </ul>
      </div>
    </div>
    <div class="foot-base">
      <span>© ${new Date().getFullYear()} FRUBON is a registered trademark of ${esc(brand.parent).replace(/\.$/, '')}. All rights reserved.</span>
      <span><a href="${brand.parentSite}" target="_blank" rel="noopener">devmilkfoods.com</a> · ${esc(brand.address)}</span>
    </div>
  </div>
</footer>

<div class="lb" role="dialog" aria-modal="true" aria-label="Image viewer">
  <button class="lb__x" aria-label="Close">×</button>
  <div style="text-align:center">
    <img src="" alt="">
    <div class="lb__cap"></div>
  </div>
</div>

<script src="${u('assets/js/frubon.js')}"></script>
</body>
</html>`;
}

/* ---------- fragments ---------- */
const pagehead = (o) => `
<section class="pagehead">
  <span class="blob" style="width:420px;height:420px;background:${o.blob || 'var(--fru-green)'};top:-180px;right:-90px"></span>
  <span class="blob" style="width:320px;height:320px;background:var(--bon-orange);bottom:-200px;left:-110px;opacity:.35"></span>
  <div class="wrap pagehead__inner" data-reveal>
    <div class="crumbs"><a href="${o.p}index.html">Home</a> ${o.crumb ? ' / ' + o.crumb : ''}</div>
    <span class="eyebrow">${esc(o.eyebrow)}</span>
    <h1>${o.h1}</h1>
    ${o.lede ? `<p class="lede">${o.lede}</p>` : ''}
  </div>
</section>`;

const band = (p, o) => `
<section class="pad-s"><div class="wrap">
  <div class="band" data-reveal>
    <h2>${o.h}</h2>
    <p>${o.p}</p>
    <div class="band__cta">
      <a class="btn btn--light" href="${p}${o.href}">${o.cta} ${I.arrow}</a>
      ${o.href2 ? `<a class="btn btn--light" href="${p}${o.href2}">${o.cta2} ${I.arrow}</a>` : ''}
    </div>
  </div>
</div></section>`;

const galleryBlock = (imgs, p, caption) => `
<div class="gal">
  ${imgs.map((src, i) => `<figure data-reveal="${i * 60}" data-zoom="${p}${src}" data-caption="${esc(caption || '')}" tabindex="0" role="button" aria-label="Enlarge image">
    <img src="${p}${src}" alt="${esc(caption || 'FRUBON')}" loading="lazy">
  </figure>`).join('')}
</div>`;

const catCard = (c, p, i) => {
  const g = groupOf(c.group);
  const first = c.products[0];
  const hero = first ? first.image : brand.logo;
  const cut = !!(first && first.cutout);
  return `<a class="card cat-card" data-accent="${g.accent}" href="${p}products/${c.id}.html" data-reveal="${i * 50}">
    <div class="card__media"><img${cut ? ' class="is-cutout"' : ''} src="${p}${hero}" alt="${esc(c.name)}" loading="lazy"></div>
    <div class="card__body">
      <span class="count">${esc(g.name)}</span>
      <h3>${esc(c.name)}</h3>
      <p>${esc(c.label)} · ${c.products.length} ${c.products.length === 1 ? 'variant' : 'variants'}</p>
    </div>
  </a>`;
};

/* ---------- writer ---------- */
let count = 0;
function write(rel, html) {
  const out = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, html);
  count++;
}

module.exports = { DATA, brand, groups, categories, gallery, esc, catsIn, groupOf, byId, I, layout, pagehead, band, galleryBlock, catCard, write, get count() { return count; } };

if (require.main === module) require('./pages.js')(module.exports);
