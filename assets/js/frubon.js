/* ============================================================
   FRUBON — interactions. No dependencies.

   One rAF-throttled scroll loop drives every scroll-linked effect
   (progress bar, parallax, scrollytelling, horizontal rail). Layout
   reads are cached and only recomputed on resize, so scrolling stays
   off the layout path.

   Everything here is an enhancement: with JS disabled or reduced
   motion requested, the page is fully readable and fully navigable.
   ============================================================ */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  var raf = window.requestAnimationFrame || function (f) { return setTimeout(f, 16); };

  /* ---------------- 1. Header ---------------- */
  var head = document.querySelector('.site-head');
  var burger = document.querySelector('.burger');

  function closeNav() {
    document.body.classList.remove('menu-open');
    if (burger) burger.setAttribute('aria-expanded', 'false');
  }
  if (burger) {
    burger.addEventListener('click', function () {
      var open = document.body.classList.toggle('menu-open');
      burger.setAttribute('aria-expanded', String(open));
    });
  }
  document.querySelectorAll('.has-menu > button').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      if (window.innerWidth > 900) return;
      e.preventDefault();
      btn.parentElement.classList.toggle('is-open');
    });
  });
  document.querySelectorAll('.nav a').forEach(function (a) { a.addEventListener('click', closeNav); });
  var scrim = document.querySelector('.nav-scrim');
  if (scrim) scrim.addEventListener('click', closeNav);

  /* ---------------- 2. Scroll engine ---------------- */
  var bar = document.querySelector('.scroll-bar');
  var parallax = [];   // { el, speed, top, h }
  var rails = [];      // { sec, track, top, h, dist }
  var scrollies = [];  // { sec, steps, figs, num, fill, active }
  var darkSections = [].slice.call(document.querySelectorAll('.scrolly, .site-foot'));
  var ticking = false;
  var vh = window.innerHeight;

  /* A rail's height depends on its track width, and setting it shifts
     everything below — so this runs before any position is read. */
  function sizeRails() {
    rails.forEach(function (r) {
      if (window.innerWidth <= 900) { r.sec.style.height = ''; r.dist = 0; return; }
      r.dist = Math.max(0, r.track.scrollWidth - r.sec.clientWidth + 48);
      var want = (r.dist + vh) + 'px';             // 1:1 with vertical scroll
      if (r.sec.style.height !== want) r.sec.style.height = want;
    });
  }

  function measure() {
    vh = window.innerHeight;
    sizeRails();
    var sy = window.pageYOffset;
    parallax.forEach(function (p) {
      var r = p.el.getBoundingClientRect();
      p.top = r.top + sy; p.h = r.height;
    });
    rails.forEach(function (r) {
      var b = r.sec.getBoundingClientRect();
      r.top = b.top + sy; r.h = r.sec.offsetHeight;
    });
    scrollies.forEach(function (s) {
      s.steps.forEach(function (st) {
        var b = st.el.getBoundingClientRect();
        st.top = b.top + sy; st.h = b.height;
      });
    });
  }

  function onFrame() {
    ticking = false;
    var y = window.pageYOffset;

    if (head) {
      head.classList.toggle('is-stuck', y > 24);
      // the header sits over dark sections on some pages — invert it there
      var hb = head.getBoundingClientRect().bottom;
      var onDark = darkSections.some(function (d) {
        var r = d.getBoundingClientRect();
        return r.top <= hb - 8 && r.bottom >= hb;
      });
      head.classList.toggle('is-dark', onDark);
    }

    if (bar) {
      var max = document.documentElement.scrollHeight - vh;
      bar.style.transform = 'scaleX(' + (max > 0 ? Math.min(1, y / max) : 0) + ')';
    }

    parallax.forEach(function (p) {
      // -1..1 across the element's travel through the viewport
      var prog = (y + vh - p.top) / (vh + p.h) * 2 - 1;
      p.el.style.transform = 'translate3d(0,' + (prog * p.speed * 100).toFixed(2) + 'px,0)';
    });

    rails.forEach(function (r) {
      var prog = (y - r.top) / Math.max(1, r.h - vh);
      prog = prog < 0 ? 0 : prog > 1 ? 1 : prog;
      r.track.style.transform = 'translate3d(' + (-prog * r.dist).toFixed(1) + 'px,0,0)';
    });

    scrollies.forEach(function (s) {
      // the step whose midpoint is nearest the viewport's reading line
      var line = y + vh * 0.5, best = 0, bestD = Infinity;
      s.steps.forEach(function (st, i) {
        var d = Math.abs(st.top + st.h / 2 - line);
        if (d < bestD) { bestD = d; best = i; }
      });
      if (best !== s.active) {
        s.active = best;
        s.steps.forEach(function (st, i) { st.el.classList.toggle('is-active', i === best); });
        s.figs.forEach(function (f, i) { f.classList.toggle('is-active', i === best); });
        if (s.num) s.num.textContent = String(best + 1).padStart(2, '0');
        if (s.fill) s.fill.style.transform = 'scaleX(' + ((best + 1) / s.steps.length) + ')';
        if (s.live) s.live.textContent = 'Step ' + (best + 1) + ' of ' + s.steps.length + ': ' + s.steps[best].title;
      }
    });
  }

  function onScroll() {
    if (!ticking) { ticking = true; raf(onFrame); }
  }

  /* ---------------- 3. Collect scroll-linked elements ---------------- */
  if (!reduced.matches) {
    document.querySelectorAll('[data-parallax]').forEach(function (el) {
      parallax.push({ el: el, speed: parseFloat(el.getAttribute('data-parallax')) || 0.1, top: 0, h: 0 });
    });
    document.querySelectorAll('[data-rail]').forEach(function (sec) {
      var track = sec.querySelector('.rail__track');
      if (track) rails.push({ sec: sec, track: track, top: 0, h: 0, dist: 0 });
    });
  }

  document.querySelectorAll('.scrolly').forEach(function (sec) {
    var steps = [].map.call(sec.querySelectorAll('.step'), function (el) {
      return { el: el, top: 0, h: 0, title: (el.querySelector('h3') || {}).textContent || '' };
    });
    var figs = [].slice.call(sec.querySelectorAll('.stage__img'));
    if (!steps.length || !figs.length) return;
    scrollies.push({
      sec: sec, steps: steps, figs: figs, active: -1,
      num: sec.querySelector('.stage__num'),
      fill: sec.querySelector('.stage__fill'),
      live: sec.querySelector('.scrolly__live'),
    });
  });

  /* Cached offsets go stale whenever layout shifts — a lazy image arriving,
     a webfont swapping in, an accordion opening. Re-measure on any of it. */
  var remeasureTimer;
  function remeasure() {
    clearTimeout(remeasureTimer);
    remeasureTimer = setTimeout(function () { measure(); onScroll(); }, 120);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', remeasure);
  window.addEventListener('load', remeasure);
  document.querySelectorAll('img').forEach(function (img) {
    if (!img.complete) img.addEventListener('load', remeasure, { once: true });
  });
  if (window.ResizeObserver) new ResizeObserver(remeasure).observe(document.body);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(remeasure);
  measure(); onFrame();

  /* ---------------- 4. Reveal on enter ---------------- */
  var targets = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && targets.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target;
        setTimeout(function () { el.classList.add('is-in'); },
                   reduced.matches ? 0 : (parseInt(el.getAttribute('data-reveal'), 10) || 0));
        io.unobserve(el);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    targets.forEach(function (el) { io.observe(el); });
  } else {
    targets.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* ---------------- 5. Headline word reveal ---------------- */
  /* Walks text nodes only, so nested markup (<br>, styled spans) survives
     intact — a regex over innerHTML mangles it. */
  function splitWords(root) {
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null, false);
    var texts = [], n;
    while ((n = walker.nextNode())) texts.push(n);
    var i = 0;
    texts.forEach(function (tn) {
      if (!tn.nodeValue.trim()) return;
      var frag = document.createDocumentFragment();
      tn.nodeValue.split(/(\s+)/).forEach(function (part) {
        if (!part) return;
        if (!part.trim()) { frag.appendChild(document.createTextNode(part)); return; }
        var w = document.createElement('span');
        var it = document.createElement('i');
        w.className = 'w';
        it.textContent = part;
        it.style.transitionDelay = (i++ * 55) + 'ms';
        w.appendChild(it);
        frag.appendChild(w);
      });
      tn.parentNode.replaceChild(frag, tn);
    });
  }

  document.querySelectorAll('[data-split]').forEach(function (el) {
    if (reduced.matches) { el.classList.add('is-in'); return; }
    splitWords(el);
    if ('IntersectionObserver' in window) {
      var o = new IntersectionObserver(function (e) {
        if (e[0].isIntersecting) { el.classList.add('is-in'); o.disconnect(); }
      }, { threshold: 0.25 });
      o.observe(el);
    } else el.classList.add('is-in');
  });

  /* ---------------- 6. Counters ---------------- */
  document.querySelectorAll('[data-count]').forEach(function (el) {
    var target = parseFloat(el.getAttribute('data-count'));
    var suffix = el.getAttribute('data-suffix') || '';
    var fmt = function (v) { return Math.round(v).toLocaleString('en-IN') + suffix; };
    if (reduced.matches || !('IntersectionObserver' in window)) { el.textContent = fmt(target); return; }
    el.textContent = fmt(0);
    var o = new IntersectionObserver(function (e) {
      if (!e[0].isIntersecting) return;
      o.disconnect();
      var t0 = performance.now(), dur = 1500;
      (function tick(now) {
        var p = Math.min(1, (now - t0) / dur);
        el.textContent = fmt(target * (1 - Math.pow(1 - p, 3)));   // easeOutCubic
        if (p < 1) raf(tick);
      })(t0);
    }, { threshold: 0.6 });
    o.observe(el);
  });

  /* ---------------- 7. Magnetic buttons ---------------- */
  if (!reduced.matches && matchMedia('(hover:hover)').matches) {
    document.querySelectorAll('[data-magnetic]').forEach(function (el) {
      el.addEventListener('mousemove', function (e) {
        var r = el.getBoundingClientRect();
        var dx = (e.clientX - r.left - r.width / 2) * 0.25;
        var dy = (e.clientY - r.top - r.height / 2) * 0.35;
        el.style.transform = 'translate(' + dx + 'px,' + dy + 'px)';
      });
      el.addEventListener('mouseleave', function () { el.style.transform = ''; });
    });
  }

  /* ---------------- 8. Accordion ---------------- */
  document.querySelectorAll('.acc__q').forEach(function (q) {
    q.addEventListener('click', function () {
      var acc = q.parentElement, body = acc.querySelector('.acc__a');
      var open = acc.classList.toggle('is-open');
      q.setAttribute('aria-expanded', String(open));
      body.style.maxHeight = open ? body.scrollHeight + 'px' : '';
    });
  });

  /* ---------------- 9. Tabs ---------------- */
  document.querySelectorAll('[data-tabs]').forEach(function (group) {
    var tabs = group.querySelectorAll('.tab');
    var panels = group.querySelectorAll('.panel');
    tabs.forEach(function (tab, i) {
      tab.addEventListener('click', function () {
        tabs.forEach(function (t) { t.classList.remove('is-active'); t.setAttribute('aria-selected', 'false'); });
        panels.forEach(function (p) { p.classList.remove('is-active'); });
        tab.classList.add('is-active');
        tab.setAttribute('aria-selected', 'true');
        if (panels[i]) panels[i].classList.add('is-active');
      });
    });
  });

  /* ---------------- 10. Lightbox ---------------- */
  var lb = document.querySelector('.lb');
  if (lb) {
    var lbImg = lb.querySelector('img');
    var lbCap = lb.querySelector('.lb__cap');
    var lastFocus = null;

    var closeLb = function () {
      lb.classList.remove('is-open');
      document.body.style.overflow = '';
      if (lastFocus) lastFocus.focus();
    };
    document.querySelectorAll('[data-zoom]').forEach(function (el) {
      el.addEventListener('click', function () {
        lastFocus = el;
        var img = el.querySelector('img');
        lbImg.src = el.getAttribute('data-zoom') || (img && img.src);
        lbImg.alt = el.getAttribute('data-caption') || '';
        lbCap.textContent = el.getAttribute('data-caption') || '';
        lb.classList.add('is-open');
        document.body.style.overflow = 'hidden';
        lb.querySelector('.lb__x').focus();
      });
      el.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); el.click(); }
      });
    });
    lb.addEventListener('click', function (e) { if (e.target !== lbImg) closeLb(); });
    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      if (lb.classList.contains('is-open')) closeLb();
      else if (document.body.classList.contains('menu-open')) closeNav();
    });
  }

  /* ---------------- 11. Forms ---------------- */
  document.querySelectorAll('form[data-demo]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var note = form.querySelector('.formnote');
      if (note) {
        note.textContent = 'Thanks — connect this form to your CRM or mail handler to start receiving submissions.';
        note.style.color = 'var(--fru-green-deep)';
      }
    });
  });
})();
