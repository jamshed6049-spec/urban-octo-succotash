'use strict';
/** FRUBON — page definitions. Invoked by build.js */

const PRESENCE = {
  RAJASTHAN: ['Ajmer', 'Alwar / Bhiwadi / Tijara', 'Bandiqui', 'Bharatpur', 'Bikaner',
    'Churu / Ratangarh / Sujangarh', 'Jaipur / Kotputli / Shahpura', 'Karauli / Hindaun',
    'Ringus', 'Sawai Madhopur / Gangapur'],
  HARYANA: ['Rewari'],
};

const FAQS = [
  ['What does FRUBON mean?',
   'The name Frubon is the amalgamation of two words namely Fru (derived from Fruit) and Bon (means Good in French). The name simply conveys the message that each product in the Frubon portfolio would essentially carry &lsquo;freshness&rsquo; and &lsquo;goodness&rsquo; as two intrinsic values.'],
  ['Does FRUBON manufacture Ice Cream or Frozen Dessert?',
   'FRUBON Ice Cream is made from fresh cream or milk fat unlike frozen dessert which is made from vegetable oil. FRUBON does not manufacture Frozen Dessert.'],
  ['What all products does FRUBON manufacture?',
   'FRUBON brand of products cover Ice Cream, bakery products like Cookies, Rusk etc and dairy products like Curd, Butter Milk, Flavoured milk etc.'],
  ['Do FRUBON products contain egg or animal fat?',
   'FRUBON products are 100% vegetarian products and do not contain eggs or any animal fat.'],
  ['Is Ice Cream good for health?',
   'Ice Cream is a very good source of calcium, certain vitamins and carbohydrates. It is specifically useful for kids and young adults if eaten in moderation.'],
  ['Where can I get FRUBON products?',
   'FRUBON products are available at all leading retail outlets in select cities of Rajasthan. For latest information and deals, please follow us on Facebook.'],
  ['Do you give factory tours?',
   'Yes, we give pre arranged tours to school students, colleges and youth groups. Factory tours are a great way to learn about Ice Cream &amp; bakery manufacturing and also in general about food industry.'],
  ['What all tests are conducted by FRUBON for ensuring quality of its products?',
   'FRUBON carries out a variety of tests on its raw material, semi finished goods and finished good. Raw material means both packaging material and ingredients for manufacturing goods. Microbiological testing is also carried on its products to ensure highest order of product safety.'],
];

const MOMENTS = [
  { src: 'assets/img/doc/788568_26255.jpg', wide: true, alt: 'The bond of flavours — sharing Frubon ice lollies' },
  { src: 'assets/img/doc/311624_7902.jpg', alt: 'Two friends eating Frubon ice pops' },
  { src: 'assets/img/doc/760110_1187457718.png', alt: 'FRUBON — ice cream & dairy products' },
  { src: 'assets/img/doc/948995_19340.jpg', alt: 'Frubon Kesar Pista ice cream cup' },
  { src: 'assets/img/doc/391000_31072.jpg', alt: 'Frubon cones with chocolate and nuts' },
  { src: 'assets/img/doc/605900_1787103809.png', alt: 'Frubon Fru Fresh Chhach' },
  { src: 'assets/img/doc/495854_770270126.png', alt: 'Frubon Fru Fresh Paneer and Dahi' },
];

const EVENTS = [
  { id: 'dandiya-mahotsav', title: 'Dandiya Mahotsav', date: 'October 2017',
    blurb: 'Nine nights of garba, and a Frubon counter in the middle of it. Our team served through the crowd as Jaipur danced — the kind of evening the brand was built for.',
    images: ['assets/img/doc/912467_505784421.jpg', 'assets/img/doc/320235_1804418127.jpg', 'assets/img/doc/177736_13332.jpg'],
    thumb: 'assets/img/doc/549565_1822159868.jpg' },
  { id: 'children-enjoying-moments', title: 'Children Enjoying Moments', date: '2017',
    blurb: 'A room full of children and an unlimited scoop counter. No campaign has ever explained &ldquo;Happiness Served Fresh&rdquo; better than this one afternoon did.',
    images: ['assets/img/doc/627923_1406209556.jpg', 'assets/img/doc/740388_1462992525.jpg'],
    thumb: 'assets/img/doc/848383_1155488650.jpg' },
];

const VISITS = [
  { title: 'ICG Students Visit', date: '24 September 2017', img: 'assets/img/doc/987318_322450012.jpg', more: ['assets/img/doc/790568_702880577.jpg'] },
  { title: "Yi Member's Visit", date: '29 October 2017', img: 'assets/img/doc/526422_1663334321.jpg' },
];

module.exports = function build(B) {
  const { brand, groups, categories, gallery, esc, catsIn, groupOf, I,
          layout, pagehead, band, galleryBlock, catCard, write } = B;

  /* =============== HOME =============== */
  const featured = ['cups', 'frucone', 'matka-kulfi', 'choco-bon', 'frujoy', 'bon-cookies', 'ice-cream-cakes', 'milk']
    .map(id => categories.find(c => c.id === id)).filter(Boolean);

  const pillars = [
    [I.milk, 'Milk twice a day', 'Collected from our own village farmer societies and chilled at source — morning and evening, every day.'],
    [I.leaf, 'Real milk fat. Never vegetable oil.', 'Frubon makes ice cream, not frozen dessert. It is a harder, costlier way to do it. It is the only way we do it.'],
    [I.heart, '100% vegetarian', 'No eggs. No animal fat. Nothing in a Frubon pack that everyone at the table cannot share.'],
    [I.flask, 'Tested at every stage', 'Raw material, semi-finished and finished goods — including microbiological testing on every batch.'],
  ];

  const home = `
<section class="hero">
  <span class="blob" style="width:520px;height:520px;background:var(--fru-green);top:-160px;left:-140px"></span>
  <span class="blob" style="width:460px;height:460px;background:var(--bon-orange);bottom:-200px;right:-120px;opacity:.4"></span>
  <div class="wrap hero__grid">
    <div data-reveal>
      <span class="eyebrow">${esc(brand.city)} · Since 2004</span>
      <h1><span class="l1">Happiness</span><span class="l2">Served Fresh</span></h1>
      <p class="hero__lede"><strong>Fru</strong> from fruit. <strong>Bon</strong> for good. Two words that decide everything we put in a pack — and one promise we have kept across ${categories.length} ranges of ice cream, bakery and dairy.</p>
      <div class="hero__cta">
        <a class="btn btn--primary" href="products.html">Explore the range ${I.arrow}</a>
        <a class="btn btn--ghost" href="about.html">Our story</a>
      </div>
      <div class="hero__proof">
        <div class="proof"><b>60,000</b><span>SQ FT PLANT</span></div>
        <div class="proof"><b>${categories.length}</b><span>PRODUCT RANGES</span></div>
        <div class="proof"><b>${categories.reduce((n, c) => n + c.products.length, 0)}</b><span>VARIANTS</span></div>
        <div class="proof"><b>19</b><span>CITIES &amp; TOWNS</span></div>
      </div>
    </div>
    <div class="hero__art" data-reveal="150">
      <div class="hero__seal">FRU&nbsp;=&nbsp;FRESH<br>BON&nbsp;=&nbsp;GOOD</div>
      <div class="pod pod-a"><img src="assets/img/doc/929334_1024782983.jpg" alt="Frubon mango kulfi bar" width="520" height="500"></div>
      <div class="pod pod-b"><img src="assets/img/doc/867175_11557.jpg" alt="Frubon ice cream" width="420" height="820"></div>
      <div class="pod pod-c"><img src="assets/img/doc/769587_1809299850.jpg" alt="Frubon ice cream cup" width="520" height="500"></div>
    </div>
  </div>
</section>

<div class="ticker" aria-hidden="true"><div class="ticker__row">
  ${Array(2).fill('<span>The bond of flavours</span><span>Made with fresh cream</span><span>100% vegetarian</span><span>Churned in Jaipur</span><span>No frozen dessert, ever</span>').join('')}
</div></div>

<section class="pad">
  <div class="wrap split">
    <div class="split__media" data-reveal><img src="assets/img/doc/slide-3.jpg" alt="Inside the Frubon plant at Mahindra World City, Jaipur"></div>
    <div data-reveal="120">
      <span class="eyebrow">The name</span>
      <h2>Two syllables.<br>One standard.</h2>
      <p class="lede">We live in an age where flavours have crossed their traditional defined boundaries. Flavours now play the role of a social connector — a reason to bond at every occasion.</p>
      <div class="namecard">
        <div class="namebit"><b>FRU</b><span>from <em>Fruit</em> — freshness, held as a non-negotiable</span></div>
        <div class="namebit"><b>BON</b><span>French for <em>Good</em> — goodness, in every single pack</span></div>
      </div>
      <p>At the core of it, Frubon is the celebration of moments and certainly a compliment to <strong>the bond of flavours</strong>.</p>
      <a class="btn btn--ghost" href="about.html">Read the full story ${I.arrow}</a>
    </div>
  </div>
</section>

<section class="pad" style="background:var(--cream-2)">
  <div class="wrap">
    <div class="center" data-reveal style="max-width:760px;margin-inline:auto">
      <span class="eyebrow">The portfolio</span>
      <h2>Four families. ${categories.length} ranges.</h2>
      <p class="lede" style="margin-inline:auto">From the matka kulfi Rajasthan has always known to the cookies and fresh paneer that share our campus.</p>
    </div>
    <div class="grid grid-4" style="margin-top:3rem">
      ${groups.map((g, i) => `<a class="card" data-accent="${g.accent}" href="products.html#${g.id}" data-reveal="${i * 70}">
        <div class="card__body" style="padding:2rem 1.6rem">
          <span class="tag">${catsIn(g.id).length} ranges</span>
          <h3 style="margin-top:.9rem">${esc(g.name)}</h3>
          <p>${g.blurb}</p>
        </div>
      </a>`).join('')}
    </div>
    <div class="grid grid-4" style="margin-top:1.6rem">
      ${featured.map((c, i) => catCard(c, '', i)).join('')}
    </div>
    <div class="center" style="margin-top:2.6rem"><a class="btn btn--primary" href="products.html">See all ${categories.length} ranges ${I.arrow}</a></div>
  </div>
</section>

<section class="pad">
  <div class="wrap">
    <div class="center" data-reveal style="max-width:720px;margin-inline:auto">
      <span class="eyebrow">Why Frubon</span>
      <h2>Value without compromise.<br>Everytime, everywhere.</h2>
    </div>
    <div class="grid grid-4" style="margin-top:3rem">
      ${pillars.map(([icon, h, p], i) => `<div class="pillar" data-accent="${['green','orange','sky','sun'][i]}" data-reveal="${i * 70}">
        <div class="pillar__icon">${icon}</div><h3>${h}</h3><p>${p}</p>
      </div>`).join('')}
    </div>
  </div>
</section>

<section class="pad" style="background:var(--cream-2)">
  <div class="wrap split split--flip">
    <div class="split__media" data-reveal><img src="assets/img/doc/slide-1.jpg" alt="Frubon manufacturing plant"></div>
    <div data-reveal="120">
      <span class="eyebrow">Infrastructure</span>
      <h2>60,000 sq ft at Mahindra World City</h2>
      <p class="lede">One of the most modern dairy, ice cream and bakery plants in Northern India — with recycled water running the gardens and daylight doing the work of the lights.</p>
      <a class="btn btn--ghost" href="infrastructure.html">Inside the plant ${I.arrow}</a>
    </div>
  </div>
</section>

<section class="pad">
  <div class="wrap presence">
    <div data-reveal>
      <span class="eyebrow">Our presence</span>
      <h2>Across Rajasthan,<br>and beyond it.</h2>
      <p class="lede">19 cities and towns across Rajasthan and Haryana — sold through leading retail outlets and our own parlours.</p>
      <a class="btn btn--ghost" href="presence.html">See the map ${I.arrow}</a>
    </div>
    <div class="split__media" data-reveal="120" data-zoom="assets/img/ui/eaddress.jpg" data-caption="FRUBON — our presence across India" tabindex="0" role="button" style="cursor:zoom-in">
      <img src="assets/img/ui/eaddress.jpg" alt="Map of FRUBON presence across Rajasthan and Haryana" style="aspect-ratio:auto;background:#fff">
    </div>
  </div>
</section>

<section class="pad" style="background:var(--cream-2)">
  <div class="wrap">
    <div class="center" data-reveal style="max-width:720px;margin-inline:auto;margin-bottom:2.8rem">
      <span class="eyebrow">The bond of flavours</span>
      <h2>Flavour is a social connector</h2>
      <p class="lede" style="margin-inline:auto">A reason to bond at every occasion. That idea is the whole brand — and it has looked like this since day one.</p>
    </div>
    <div class="mosaic">
      ${MOMENTS.map((m, i) => `<figure${m.wide ? ' class="wide"' : ''} data-reveal="${i * 55}" data-zoom="${m.src}" data-caption="${esc(m.alt)}" tabindex="0" role="button" aria-label="Enlarge image">
        <img src="${m.src}" alt="${esc(m.alt)}" loading="lazy">
      </figure>`).join('')}
    </div>
  </div>
</section>

<section class="pad-s">
  <div class="wrap">
    <div class="center" data-reveal><span class="eyebrow">FruBuzz</span><h2>What&rsquo;s happening</h2></div>
    <div class="grid grid-3" style="margin-top:2.4rem">
      <a class="card" href="promotions.html" data-reveal><div class="card__media"><img src="${gallery.promotions[0]}" alt="Frubon promotions" loading="lazy"></div>
        <div class="card__body"><h3>Promotions</h3><p>Campaigns, launches and the offers running right now.</p></div></a>
      <a class="card" href="events.html" data-reveal="70"><div class="card__media"><img src="${EVENTS[0].images[0]}" alt="Frubon events" loading="lazy"></div>
        <div class="card__body"><h3>Events</h3><p>Where Frubon has been showing up across the state.</p></div></a>
      <a class="card" href="factory-tour.html" data-reveal="140"><div class="card__media"><img src="assets/img/doc/526422_1663334321.jpg" alt="Frubon factory tour" loading="lazy"></div>
        <div class="card__body"><h3>Factory Tour</h3><p>48 hours&rsquo; notice, and all the ice cream you want.</p></div></a>
    </div>
  </div>
</section>

${band('', { h: 'Come taste the bond of flavours', p: 'Book a factory tour, find your nearest stockist, or talk to us about a Frubon franchise.', href: 'contact.html', cta: 'Say hello', href2: 'factory-tour.html', cta2: 'Book a tour' })}
`;

  write('index.html', layout({
    title: 'FRUBON — Happiness Served Fresh | Ice Cream, Bakery & Dairy from Jaipur',
    desc: 'FRUBON is Jaipur’s premium ice cream, bakery and dairy brand from Dev Milk Foods. Real milk fat, 100% vegetarian, churned fresh across 21 ranges.',
    nav: 'home', accent: 'orange', body: home,
    ogImage: 'assets/img/doc/929334_1024782983.jpg',
  }));

  /* =============== ABOUT =============== */
  const about = `
${pagehead({ p: '', crumb: 'FruStory / About Us', eyebrow: 'FruStory', h1: 'A compliment to the<br>bond of flavours',
  lede: 'Frubon is the celebration of moments — and the expansion of a passion to deliver value without any compromise, everytime and everywhere.' })}

<section class="pad-s">
  <div class="wrap split">
    <div class="split__media" data-reveal><img src="assets/img/ui/about-us.jpg" alt="Frubon"></div>
    <div data-reveal="100">
      <span class="eyebrow">The story</span>
      <h2>Why we are called Frubon</h2>
      <p>We live in an age where flavours have crossed their traditional defined boundaries. Flavours now play the role of a social connector or a reason to bond at every occasion or celebration.</p>
      <div class="namecard">
        <div class="namebit"><b>FRU</b><span>derived from <em>Fruit</em></span></div>
        <div class="namebit"><b>BON</b><span>means <em>Good</em> in French</span></div>
      </div>
      <p>The name simply conveys the message that each product in the Frubon portfolio would essentially carry <strong>&lsquo;freshness&rsquo;</strong> and <strong>&lsquo;goodness&rsquo;</strong> as two intrinsic values.</p>
    </div>
  </div>
</section>

<section class="pad" style="background:var(--cream-2)">
  <div class="wrap split split--flip">
    <div class="split__media" data-reveal><img src="assets/img/doc/slide-4.jpg" alt="Dev Milk Foods plant"></div>
    <div data-reveal="100">
      <span class="eyebrow">The parent</span>
      <h2>Dev Milk Foods</h2>
      <p>Dev Milk Foods (DMF) is Rajasthan&rsquo;s leading milk and dairy brand with footprints across length and breadth of the state. Since its inception in <strong>2004</strong>, DMF has successfully diversified its operations outside the domain of milk &amp; dairy products and ventured into the areas of manufacturing, marketing and transportation. The company had pioneered the private dairy business in Rajasthan and is now setting new benchmarks for the industry.</p>
      <p>In its quest to explore new horizons of business and quality excellence, DMF has come up with its world-class Ice Cream &amp; Bakery brand <strong>FruBon</strong>. Each product under the FruBon brand umbrella is a blend of finest and best quality food material. FruBon is DMF&rsquo;s most ambitious project till date that aims at delivering one-of-its-kind flavour experiences for all age groups.</p>
      <p>Spread across 60,000 square feet, FruBon&rsquo;s manufacturing unit is one of the most advanced Dairy, Ice Cream &amp; Bakery setups in Northern India. Outside its regular area of operations, DMF&rsquo;s interests also include Education &amp; Early childhood care and education (ECCE).</p>
    </div>
  </div>
</section>

<section class="pad">
  <div class="wrap grid grid-2">
    <div class="pillar" data-accent="green" data-reveal style="padding:2.6rem">
      <div class="pillar__icon">${I.spark}</div>
      <span class="eyebrow">Our Vision</span>
      <h3 style="font-size:1.6rem">&ldquo;To be the most Innovative &amp; Admired food company of the world.&rdquo;</h3>
    </div>
    <div class="pillar" data-accent="orange" data-reveal="100" style="padding:2.6rem">
      <div class="pillar__icon">${I.heart}</div>
      <span class="eyebrow">Our Mission</span>
      <ul style="padding-left:1.1rem;margin:0;color:var(--muted);font-size:.96rem">
        <li style="margin-bottom:.7rem">To create value for all stake holders of the company including farmers, customers, employees, society &amp; environment.</li>
        <li style="margin-bottom:.7rem">To ensure the best food quality and flavour experience delivery to customers through innovation and superior manufacturing processes.</li>
        <li>To attain sustainable &amp; inclusive growth across regional, national and at the global level.</li>
      </ul>
    </div>
  </div>
</section>

${band('', { h: 'See where it is all made', p: 'A 60,000 sq ft plant at Mahindra World City — and an open invitation to come walk through it.', href: 'infrastructure.html', cta: 'Infrastructure', href2: 'factory-tour.html', cta2: 'Book a tour' })}
`;
  write('about.html', layout({ title: 'About Us — FRUBON | The bond of flavours',
    desc: 'Fru from Fruit, Bon from the French for Good. The story of FRUBON and its parent Dev Milk Foods, Rajasthan’s leading milk and dairy brand since 2004.',
    accent: 'green', body: about }));

  /* =============== INFRASTRUCTURE =============== */
  const infra = `
${pagehead({ p: '', crumb: 'FruStory / Infrastructure', eyebrow: 'Infrastructure', h1: '60,000 sq ft of<br>quiet obsession',
  lede: 'DMF’s state of art manufacturing plant sits at Mahindra World City, Jaipur — the premium business destination of Rajasthan.', blob: 'var(--sky)' })}

<section class="pad-s"><div class="wrap">
  <div class="grid grid-3" style="margin-bottom:3.4rem">
    ${[['60,000 sq ft', 'Single integrated campus'], ['Northern India', 'One of the most modern plants in the region'], ['ETP recycled', 'Water reused for cleaning &amp; gardening']]
      .map(([b, s], i) => `<div class="pillar" data-accent="sky" data-reveal="${i * 70}">
        <h3 style="font-size:1.9rem;margin-bottom:.2em">${b}</h3><p>${s}</p></div>`).join('')}
  </div>
  <div class="split" style="margin-bottom:3.4rem">
    <div data-reveal>
      <span class="eyebrow">The plant</span>
      <h2>Built for the product, and for the planet</h2>
      <p>Spread across an area of over 60,000 sq. ft., the manufacturing plant is one of the most modern plants of Northern India, equipped with the latest testing and manufacturing facilities.</p>
      <p>Special care has been taken for recycling and re-usage of water. The water recycled using ETP is utilized for cleaning &amp; gardening. Provision for ample ventilation and fresh light has been kept to reduce the carbon footprint and dependency on electricity during day time.</p>
      <p><strong>It is our continuous endeavour to create value for one of our most important stake holders — the environment.</strong></p>
    </div>
    <div class="split__media" data-reveal="120"><img src="assets/img/doc/slide-2.jpg" alt="Frubon manufacturing floor"></div>
  </div>
  ${galleryBlock(gallery.infrastructure, '', 'Frubon plant, Mahindra World City')}
</div></section>

${band('', { h: 'Walk the floor yourself', p: 'Give us 48 hours&rsquo; notice and eat all the ice cream you want.', href: 'factory-tour.html', cta: 'Book a factory tour' })}
`;
  write('infrastructure.html', layout({ title: 'Infrastructure — FRUBON | 60,000 sq ft plant, Mahindra World City Jaipur',
    desc: 'One of the most modern dairy, ice cream and bakery plants in Northern India — 60,000 sq ft at Mahindra World City, Jaipur.',
    accent: 'sky', body: infra }));

  /* =============== CSR =============== */
  const csr = `
${pagehead({ p: '', crumb: 'FruStory / CSR', eyebrow: 'CSR', h1: 'Progress is only<br>what you give back',
  lede: 'The company has a firm belief that it is only by giving back to the society that we can make progress.', blob: 'var(--fru-green)' })}

<section class="pad-s"><div class="wrap">
  <div class="split" style="margin-bottom:3.4rem">
    <div data-reveal>
      <span class="eyebrow">In the community</span>
      <h2>Working through partners who already do it well</h2>
      <p>DMF has been working for society through various mediums. DMF&rsquo;s head office is the official drop-off centre for old clothes &amp; donations for the poor for <strong>Goonj</strong> — a Delhi based NGO whose founder Mr. Anshu Gupta was awarded the Magsaysay award.</p>
      <p>The company is also associated with several other NGOs including <strong>Make a Wish</strong>, <strong>Faith Alingan</strong> and <strong>Rays</strong>.</p>
    </div>
    <div class="split__media" data-reveal="120"><img src="${gallery.csr[0]}" alt="Frubon CSR initiative"></div>
  </div>
  <blockquote class="band" data-reveal style="margin-bottom:3.4rem">
    <h2 style="font-size:clamp(1.4rem,3vw,2.2rem);margin:0">&ldquo;It is only by giving back to the society that we can make progress.&rdquo;</h2>
  </blockquote>
  ${galleryBlock(gallery.csr, '', 'Frubon CSR')}
</div></section>
`;
  write('csr.html', layout({ title: 'CSR — FRUBON | Giving back to the society',
    desc: 'Dev Milk Foods works with Goonj, Make a Wish, Faith Alingan and Rays — because it is only by giving back to the society that we make progress.',
    accent: 'green', body: csr }));

  /* =============== PRODUCTS INDEX =============== */
  const prodIndex = `
${pagehead({ p: '', crumb: 'Products', eyebrow: 'The portfolio', h1: '${categories.length} ranges.<br>One standard.'.replace('${categories.length}', categories.length),
  lede: 'Every Frubon range, grouped the way we make them — from the churn hall to the bakery to the dairy dock.' })}

<section class="pad-s"><div class="wrap">
  ${groups.map(g => `
  <div id="${g.id}" style="scroll-margin-top:100px;margin-bottom:4.2rem" data-accent="${g.accent}">
    <div data-reveal style="max-width:720px;margin-bottom:2.2rem">
      <span class="eyebrow">${catsIn(g.id).length} ${catsIn(g.id).length === 1 ? 'range' : 'ranges'}</span>
      <h2>${esc(g.name)}</h2>
      <p class="lede">${g.blurb}</p>
    </div>
    <div class="grid grid-4">${catsIn(g.id).map((c, i) => catCard(c, '', i)).join('')}</div>
  </div>`).join('')}
</div></section>

${band('', { h: 'Looking for a stockist?', p: 'Frubon is sold at leading retail outlets across 19 cities and towns in Rajasthan and Haryana.', href: 'presence.html', cta: 'Our presence', href2: 'contact.html', cta2: 'Franchise enquiry' })}
`;
  write('products.html', layout({ title: `Products — FRUBON | ${categories.length} ranges of ice cream, bakery & dairy`,
    desc: 'Cups, cones, kulfi, family packs, cookies, milk, dahi, chhach and paneer — the complete FRUBON portfolio.',
    accent: 'orange', body: prodIndex }));

  /* =============== CATEGORY PAGES =============== */
  categories.forEach(c => {
    const g = groupOf(c.group);
    const siblings = catsIn(c.group).filter(s => s.id !== c.id);
    const body = `
${pagehead({ p: '../', crumb: `<a href="../products.html">Products</a> / ${esc(c.name)}`, eyebrow: g.name, h1: esc(c.name),
  lede: c.desc, blob: `var(--${g.accent === 'orange' ? 'bon-orange' : g.accent === 'green' ? 'fru-green' : g.accent})` })}

<section class="pad-s"><div class="wrap">
  <div style="display:flex;flex-wrap:wrap;gap:1rem;align-items:baseline;justify-content:space-between;margin-bottom:2rem" data-reveal>
    <h2 style="margin:0">${c.products.length} ${c.products.length === 1 ? 'variant' : 'variants'}</h2>
    <span class="tag">${esc(g.tagline)}</span>
  </div>
  <div class="grid grid-4">
    ${c.products.map((p, i) => `<div class="prod" data-reveal="${i * 55}" data-zoom="../${p.zoom}" data-caption="${esc(c.name)} — ${esc(p.name)}" tabindex="0" role="button" aria-label="Enlarge ${esc(p.name)}">
      <div class="prod__img"><img${p.cutout ? ' class="is-cutout"' : ''} src="../${p.image}" alt="Frubon ${esc(c.name)} ${esc(p.name)}" loading="lazy"></div>
      <h4>${esc(p.name)}</h4>
    </div>`).join('')}
  </div>
</div></section>

<section class="pad-s" style="background:var(--cream-2)"><div class="wrap">
  <div data-reveal style="margin-bottom:2rem"><span class="eyebrow">More from ${esc(g.name)}</span><h2>Keep exploring</h2></div>
  <div class="grid grid-4">${siblings.slice(0, 4).map((s, i) => catCard(s, '../', i)).join('')}</div>
  <div class="center" style="margin-top:2.4rem"><a class="btn btn--primary" href="../products.html">All ${categories.length} ranges ${I.arrow}</a></div>
</div></section>
`;
    write(`products/${c.id}.html`, layout({ depth: 1, accent: g.accent,
      title: `${c.name} — FRUBON | ${c.label}`,
      desc: c.desc.replace(/<[^>]+>/g, '').slice(0, 175),
      ogImage: c.products[0] ? c.products[0].image : brand.logo,
      body }));
  });

  /* =============== PROMOTIONS =============== */
  const promos = `
${pagehead({ p: '', crumb: 'FruBuzz / Promotions', eyebrow: 'FruBuzz', h1: 'Promotions',
  lede: 'Launches, campaigns and the offers running across our parlours and retail partners.', blob: 'var(--berry)' })}
<section class="pad-s"><div class="wrap">
  <div class="stack">
    ${gallery.promotions.map((src, i) => `<figure class="split__media" data-reveal="${i * 80}" data-zoom="${src}" data-caption="Frubon promotion" tabindex="0" role="button" style="margin:0 0 1.6rem;cursor:zoom-in">
      <img src="${src}" alt="Frubon promotion" loading="lazy" style="aspect-ratio:auto">
    </figure>`).join('')}
  </div>
  <div class="split__media center" data-reveal style="margin-top:2rem;background:#fff;padding:2rem">
    <img src="assets/img/doc/872357_160627221.png" alt="Taste the new Fru Cone avatars" style="aspect-ratio:auto">
  </div>
</div></section>
${band('', { h: 'Want Frubon at your event?', p: 'Counters, custom packs and bulk orders — tell us what you are planning.', href: 'contact.html', cta: 'Talk to us' })}
`;
  write('promotions.html', layout({ title: 'Promotions — FRUBON | FruBuzz', accent: 'orange',
    desc: 'The latest FRUBON launches, campaigns and offers across Rajasthan.', body: promos }));

  /* =============== EVENTS =============== */
  const eventsIdx = `
${pagehead({ p: '', crumb: 'FruBuzz / Events', eyebrow: 'FruBuzz', h1: 'Events',
  lede: 'Frubon was built for the moments people gather for. Here is where we have been showing up.', blob: 'var(--berry)' })}
<section class="pad-s"><div class="wrap">
  <div class="grid grid-2">
    ${EVENTS.map((e, i) => `<a class="card" href="events/${e.id}.html" data-reveal="${i * 90}">
      <div class="card__media" style="aspect-ratio:16/10"><img src="${e.thumb}" alt="${esc(e.title)}" loading="lazy"></div>
      <div class="card__body"><span class="tag">${esc(e.date)}</span><h3 style="margin-top:.8rem">${esc(e.title)}</h3><p>${e.blurb}</p></div>
    </a>`).join('')}
  </div>
</div></section>
`;
  write('events.html', layout({ title: 'Events — FRUBON | FruBuzz', accent: 'orange',
    desc: 'Dandiya Mahotsav, children’s events and more — where FRUBON has been showing up across Rajasthan.', body: eventsIdx }));

  EVENTS.forEach(e => {
    const body = `
${pagehead({ p: '../', crumb: `<a href="../events.html">Events</a> / ${esc(e.title)}`, eyebrow: e.date, h1: esc(e.title), lede: e.blurb, blob: 'var(--berry)' })}
<section class="pad-s"><div class="wrap">
  ${galleryBlock(e.images.map(s => s.replace(/^assets\//, 'assets/')), '../', e.title)}
  <div class="center" style="margin-top:2.4rem"><a class="btn btn--primary" href="../events.html">All events ${I.arrow}</a></div>
</div></section>`;
    write(`events/${e.id}.html`, layout({ depth: 1, accent: 'orange', title: `${e.title} — FRUBON Events`,
      desc: e.blurb.replace(/<[^>]+>/g, '').replace(/&[a-z]+;/g, '').slice(0, 175), ogImage: e.images[0], body }));
  });

  /* =============== PRESENCE =============== */
  const presence = `
${pagehead({ p: '', crumb: 'Our Presence', eyebrow: 'Our Presence', h1: 'Across India,<br>starting at home',
  lede: 'Frubon products are available at leading retail outlets across Rajasthan and Haryana, and at our own Frubon Ice Cream Concept parlours.', blob: 'var(--bon-orange)' })}
<section class="pad-s"><div class="wrap presence">
  <div class="statelist" data-reveal>
    ${Object.entries(PRESENCE).map(([state, cities]) => `
      <h3 style="color:${state === 'RAJASTHAN' ? 'var(--bon-orange-deep)' : 'var(--fru-green-deep)'}">${state}</h3>
      <ol>${cities.map(c => `<li>${esc(c)}</li>`).join('')}</ol>`).join('')}
    <a class="btn btn--ghost" href="contact.html">Become a stockist ${I.arrow}</a>
  </div>
  <div class="split__media" data-reveal="120" data-zoom="assets/img/ui/eaddress.jpg" data-caption="FRUBON — our presence across India" tabindex="0" role="button" style="cursor:zoom-in;background:#fff">
    <img src="assets/img/ui/eaddress.jpg" alt="Map showing FRUBON presence across Rajasthan and Haryana" style="aspect-ratio:auto">
  </div>
</div></section>
${band('', { h: 'Not in your city yet?', p: 'We are expanding across North India. Distributor and franchise enquiries are open.', href: 'contact.html', cta: 'Franchise enquiry' })}
`;
  write('presence.html', layout({ title: 'Our Presence — FRUBON | 19 cities across Rajasthan & Haryana', accent: 'orange',
    desc: 'FRUBON is available across Ajmer, Alwar, Bikaner, Jaipur, Bharatpur, Churu, Karauli, Ringus, Sawai Madhopur and Rewari.', body: presence }));

  /* =============== FACTORY TOUR =============== */
  const tour = `
${pagehead({ p: '', crumb: 'Factory Tour', eyebrow: 'Factory Tour', h1: 'Give us 48 hours.<br>Eat all the ice cream you want.',
  lede: 'We give pre-arranged tours to school students, colleges and youth groups — a genuinely good way to learn how ice cream, bakery and dairy actually get made.', blob: 'var(--sky)' })}
<section class="pad-s"><div class="wrap">
  <div class="split" style="margin-bottom:3.4rem">
    <div class="split__media" data-reveal><img src="assets/img/ui/x1.jpg" alt="Frubon factory tour"></div>
    <div data-reveal="100">
      <span class="eyebrow">How it works</span>
      <h2>Book your Frubon Factory Tour</h2>
      <ol style="padding-left:1.2rem;color:var(--ink-2)">
        <li style="margin-bottom:.8rem">Send us your group size and preferred date — at least <strong>48 hours</strong> ahead.</li>
        <li style="margin-bottom:.8rem">We confirm a slot at the Mahindra World City plant, Jaipur.</li>
        <li style="margin-bottom:.8rem">Walk the churn hall, the bakery and the dairy dock with our team.</li>
        <li>Finish in the tasting room. There is no scoop limit.</li>
      </ol>
      <a class="btn btn--primary" href="contact.html">Book your visit ${I.arrow}</a>
      <div class="pillar" data-accent="green" style="margin-top:1.8rem;padding:1.5rem 1.6rem">
        <span class="eyebrow" style="margin-bottom:.6rem">For pre-booking the tour</span>
        <div class="contactbar" style="grid-template-columns:1fr">
          <a href="tel:${brand.phoneHref}">${esc(brand.phone)}</a>
          <a href="mailto:${brand.email}">${esc(brand.email)}</a>
        </div>
      </div>
    </div>
  </div>
  <div data-reveal style="margin-bottom:1.8rem"><span class="eyebrow">Recent visits</span><h2>Who has been through</h2></div>
  <div class="grid grid-3">
    ${VISITS.flatMap(v => [v.img].concat(v.more || []).map((src, k) => ({ src, v, k }))).map((x, i) => `<div class="card" data-reveal="${i * 80}" data-zoom="${x.src}" data-caption="${esc(x.v.title)}" tabindex="0" role="button" style="cursor:zoom-in">
      <div class="card__media" style="aspect-ratio:4/3"><img src="${x.src}" alt="${esc(x.v.title)}" loading="lazy"></div>
      <div class="card__body"><h3 style="font-size:1.2rem">${esc(x.v.title)}${x.k ? ' <span class="muted" style="font-weight:400">· more</span>' : ''}</h3><p>${esc(x.v.date)}</p></div>
    </div>`).join('')}
  </div>
</div></section>
`;
  write('factory-tour.html', layout({ title: 'Factory Tour — FRUBON | Book a visit to our Jaipur plant', accent: 'sky',
    desc: 'Book a Frubon factory tour with 48 hours’ notice. Pre-arranged tours for schools, colleges and youth groups at Mahindra World City, Jaipur.', body: tour }));

  /* =============== CONTACT =============== */
  const TYPES = ['Enquiry', 'Feedback', 'Suggestion', 'Franchisee', 'Complaint'];
  const formFor = t => `
    <form class="grid grid-2" data-demo style="gap:0 1.4rem">
      <div class="field"><label for="${t}-n">Name</label><input id="${t}-n" name="name" required autocomplete="name"></div>
      <div class="field"><label for="${t}-e">Email</label><input id="${t}-e" name="email" type="email" required autocomplete="email"></div>
      <div class="field"><label for="${t}-c">Contact No.</label><input id="${t}-c" name="phone" type="tel" required autocomplete="tel"></div>
      <div class="field"><label for="${t}-ci">City</label><input id="${t}-ci" name="city" required></div>
      <div class="field"><label for="${t}-p">Pin Code</label><input id="${t}-p" name="pin" inputmode="numeric" pattern="[0-9]{6}"></div>
      <div class="field" style="grid-column:1/-1"><label for="${t}-m">Your ${t.toLowerCase()}</label><textarea id="${t}-m" name="message" rows="4"></textarea></div>
      <div style="grid-column:1/-1;display:flex;gap:1rem;align-items:center;flex-wrap:wrap">
        <button class="btn btn--primary" type="submit">Send ${t.toLowerCase()} ${I.arrow}</button>
        <span class="formnote">We read every message that comes in.</span>
      </div>
    </form>`;

  const contact = `
${pagehead({ p: '', crumb: 'Say Hello', eyebrow: 'Say Hello', h1: 'Talk to us',
  lede: 'Enquiries, feedback, suggestions, franchise interest or a complaint — pick the one that fits and we will get back to you.' })}
<section class="pad-s"><div class="wrap grid" style="grid-template-columns:1fr;gap:3rem">
  <div data-tabs data-reveal>
    <div class="tabs" role="tablist">
      ${TYPES.map((t, i) => `<button class="tab ${i === 0 ? 'is-active' : ''}" role="tab" aria-selected="${i === 0}">${t}</button>`).join('')}
    </div>
    ${TYPES.map((t, i) => `<div class="panel ${i === 0 ? 'is-active' : ''}" role="tabpanel">${formFor(t)}</div>`).join('')}
  </div>
  <div class="grid grid-3" data-reveal="120">
    <div class="pillar" data-accent="orange"><div class="pillar__icon">${I.pin}</div><h3 style="font-size:1.15rem">Plant &amp; Office</h3><p>Mahindra World City,<br>Jaipur, Rajasthan, India</p><p style="margin-top:.6rem"><a href="tel:${brand.phoneHref}"><strong>${esc(brand.phone)}</strong></a><br><a href="mailto:${brand.email}">${esc(brand.email)}</a></p></div>
    <div class="pillar" data-accent="green"><div class="pillar__icon">${I.spark}</div><h3 style="font-size:1.15rem">Franchise</h3><p>Use the <strong>Franchisee</strong> tab — we are expanding across North India.</p></div>
    <div class="pillar" data-accent="sky"><div class="pillar__icon">${I.heart}</div><h3 style="font-size:1.15rem">Follow along</h3><p><a href="${brand.social.facebook}" target="_blank" rel="noopener">Facebook</a> · <a href="${brand.social.instagram}" target="_blank" rel="noopener">Instagram</a> · <a href="${brand.social.linkedin}" target="_blank" rel="noopener">LinkedIn</a></p></div>
  </div>
</div></section>
`;
  write('contact.html', layout({ title: 'Say Hello — FRUBON | Contact, feedback & franchise enquiries', accent: 'orange',
    desc: 'Get in touch with FRUBON — enquiries, feedback, suggestions, franchise interest or complaints.', body: contact }));

  /* =============== VLOGS =============== */
  const vlogs = `
${pagehead({ p: '', crumb: 'FruBuzz / Food Vlogs', eyebrow: 'FruBuzz', h1: 'Food Vlogs',
  lede: 'Rajasthan eats, films and shares. Here is Frubon through other people’s cameras.', blob: 'var(--berry)' })}
<section class="pad-s"><div class="wrap">
  <figure class="split__media" data-reveal data-zoom="assets/img/ui/Rajasthan-Blog-Vlog-Web-Tem.jpg" data-caption="Rajasthan Food Vlogs" tabindex="0" role="button" style="margin:0;cursor:zoom-in">
    <img src="assets/img/ui/Rajasthan-Blog-Vlog-Web-Tem.jpg" alt="Rajasthan food vlogs featuring Frubon" style="aspect-ratio:auto">
  </figure>
  <div class="center" style="margin-top:2.6rem" data-reveal="100">
    <p class="lede" style="margin-inline:auto">Tagged us in something? We would love to see it.</p>
    <a class="btn btn--primary" href="${brand.social.instagram}" target="_blank" rel="noopener">Send it on Instagram ${I.arrow}</a>
  </div>
</div></section>
`;
  write('vlogs.html', layout({ title: 'Food Vlogs — FRUBON | FruBuzz', accent: 'orange',
    desc: 'FRUBON through Rajasthan’s food vloggers and bloggers.', body: vlogs }));

  /* =============== FAQ =============== */
  const faq = `
${pagehead({ p: '', crumb: 'FAQ', eyebrow: 'FAQ', h1: 'Questions,<br>answered straight',
  lede: 'The things people ask us most — about the name, the ingredients and how we make what we make.', blob: 'var(--sun)' })}
<section class="pad-s"><div class="wrap" style="max-width:860px">
  ${FAQS.map(([q, a], i) => `<div class="acc" data-reveal="${i * 40}">
    <button class="acc__q" aria-expanded="false">${q}</button>
    <div class="acc__a"><p>${a}</p></div>
  </div>`).join('')}
  <div class="center" style="margin-top:2.6rem"><p class="muted">Still looking for something?</p><a class="btn btn--primary" href="contact.html">Say hello ${I.arrow}</a></div>
</div></section>
`;
  write('faq.html', layout({ title: 'FAQ — FRUBON | Ice cream, not frozen dessert', accent: 'sun',
    desc: 'What does FRUBON mean? Is it ice cream or frozen dessert? Is it vegetarian? Answers to the questions we get most.', body: faq }));

  /* =============== CAREERS =============== */
  const careers = `
${pagehead({ p: '', crumb: 'Join Us', eyebrow: 'Join Us', h1: 'Build the most admired<br>food company in the world',
  lede: 'That is the vision on the wall. If it sounds like your kind of ambition, we should talk.', blob: 'var(--fru-green)' })}
<section class="pad-s"><div class="wrap split">
  <div data-reveal>
    <span class="eyebrow">Why here</span>
    <h2>A Rajasthan brand with national plans</h2>
    <p>Dev Milk Foods pioneered the private dairy business in Rajasthan. Frubon is its most ambitious project yet — a 60,000 sq ft ice cream, bakery and dairy campus with room to grow in manufacturing, quality, supply chain, sales and marketing.</p>
    <p>We hire for the same two values the brand is named after: <strong>freshness</strong> of thinking, and <strong>goodness</strong> in how you work with people.</p>
    <div class="grid grid-2" style="margin-top:2rem">
      <div class="pillar" data-accent="green"><h3 style="font-size:1.1rem">Manufacturing &amp; Quality</h3><p>Plant operations, QA/QC, food technology, maintenance.</p></div>
      <div class="pillar" data-accent="orange"><h3 style="font-size:1.1rem">Sales &amp; Marketing</h3><p>Distribution, parlour ops, brand and trade marketing.</p></div>
    </div>
  </div>
  <div data-reveal="120">
    <div class="pillar" style="padding:2.2rem">
      <h3>Send us your resume</h3>
      <form data-demo>
        <div class="field"><label for="c-n">Name</label><input id="c-n" name="name" required autocomplete="name"></div>
        <div class="field"><label for="c-e">Email</label><input id="c-e" name="email" type="email" required autocomplete="email"></div>
        <div class="field"><label for="c-p">Contact No.</label><input id="c-p" name="phone" type="tel" required autocomplete="tel"></div>
        <div class="field"><label for="c-r">Role you are after</label><input id="c-r" name="role"></div>
        <div class="field"><label for="c-f">Resume</label><input id="c-f" name="resume" type="file" accept=".doc,.docx,.pdf">
          <span class="formnote">Microsoft Word or PDF only.</span></div>
        <button class="btn btn--primary" type="submit" style="width:100%;justify-content:center">Apply ${I.arrow}</button>
        <p class="formnote" style="margin-top:1rem"></p>
      </form>
    </div>
  </div>
</div></section>
`;
  write('careers.html', layout({ title: 'Join Us — FRUBON Careers | Dev Milk Foods, Jaipur', accent: 'green',
    desc: 'Careers at FRUBON and Dev Milk Foods — manufacturing, quality, supply chain, sales and marketing roles in Jaipur, Rajasthan.', body: careers }));

  /* =============== sitemap + robots =============== */
  const SITE = 'https://www.frubon.com';
  const urls = [
    ['index.html', '1.0'], ['products.html', '0.9'], ['about.html', '0.8'],
    ['infrastructure.html', '0.7'], ['csr.html', '0.6'], ['presence.html', '0.7'],
    ['factory-tour.html', '0.7'], ['contact.html', '0.7'], ['promotions.html', '0.6'],
    ['events.html', '0.6'], ['vlogs.html', '0.5'], ['faq.html', '0.6'], ['careers.html', '0.5'],
  ].concat(categories.map(c => [`products/${c.id}.html`, '0.8']))
   .concat(EVENTS.map(e => [`events/${e.id}.html`, '0.4']));
  const today = new Date().toISOString().slice(0, 10);
  write('sitemap.xml',
    '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    urls.map(([u, pr]) => `  <url><loc>${SITE}/${u}</loc><lastmod>${today}</lastmod><priority>${pr}</priority></url>`).join('\n') +
    '\n</urlset>\n');
  write('robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`);

  console.log(`\n  \u2713 ${B.count} files written (${categories.length} categories, ${categories.reduce((n, c) => n + c.products.length, 0)} products)`);
};
