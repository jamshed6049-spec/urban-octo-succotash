/* FRUBON — interactions. No dependencies. */
(function () {
  'use strict';

  /* Sticky header */
  var head = document.querySelector('.site-head');
  if (head) {
    var onScroll = function () { head.classList.toggle('is-stuck', window.scrollY > 24); };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* Mobile nav */
  var burger = document.querySelector('.burger');
  if (burger) {
    burger.addEventListener('click', function () {
      var open = document.body.classList.toggle('menu-open');
      burger.setAttribute('aria-expanded', String(open));
    });
  }
  /* Dropdowns: hover on desktop, tap to expand on mobile */
  document.querySelectorAll('.has-menu > button').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      if (window.innerWidth > 900) return;
      e.preventDefault();
      btn.parentElement.classList.toggle('is-open');
    });
  });
  var closeNav = function () {
    document.body.classList.remove('menu-open');
    if (burger) burger.setAttribute('aria-expanded', 'false');
  };
  document.querySelectorAll('.nav a').forEach(function (a) {
    a.addEventListener('click', closeNav);
  });
  var scrim = document.querySelector('.nav-scrim');
  if (scrim) scrim.addEventListener('click', closeNav);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && document.body.classList.contains('menu-open')) closeNav();
  });

  /* Scroll reveal */
  var targets = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && targets.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target;
        var delay = parseInt(el.getAttribute('data-reveal'), 10) || 0;
        setTimeout(function () { el.classList.add('is-in'); }, delay);
        io.unobserve(el);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    targets.forEach(function (el) { io.observe(el); });
  } else {
    targets.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* Accordion */
  document.querySelectorAll('.acc__q').forEach(function (q) {
    q.addEventListener('click', function () {
      var acc = q.parentElement;
      var body = acc.querySelector('.acc__a');
      var open = acc.classList.toggle('is-open');
      q.setAttribute('aria-expanded', String(open));
      body.style.maxHeight = open ? body.scrollHeight + 'px' : '';
    });
  });

  /* Tabs */
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

  /* Lightbox — any [data-zoom] element with an <img> inside */
  var lb = document.querySelector('.lb');
  if (lb) {
    var lbImg = lb.querySelector('img');
    var lbCap = lb.querySelector('.lb__cap');
    var lastFocus = null;

    var open = function (src, cap) {
      lbImg.src = src; lbCap.textContent = cap || '';
      lb.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      lb.querySelector('.lb__x').focus();
    };
    var close = function () {
      lb.classList.remove('is-open');
      document.body.style.overflow = '';
      if (lastFocus) lastFocus.focus();
    };

    document.querySelectorAll('[data-zoom]').forEach(function (el) {
      el.addEventListener('click', function () {
        lastFocus = el;
        var img = el.querySelector('img');
        open(el.getAttribute('data-zoom') || (img && img.src), el.getAttribute('data-caption'));
      });
      el.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); el.click(); }
      });
    });

    lb.addEventListener('click', function (e) { if (e.target !== lbImg) close(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
  }

  /* Forms — static site, so acknowledge locally instead of pretending to submit */
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
