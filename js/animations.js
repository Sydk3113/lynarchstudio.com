// ============================================================
//  LYNARCH STUDIO — Animations
// ============================================================

'use strict';

/* ── SCROLL REVEAL ──────────────────────────────────────────── */
function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('revealed');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  els.forEach(el => io.observe(el));
}

/* ── CUSTOM CURSOR ──────────────────────────────────────────── */
function initCursor() {
  const dot  = document.querySelector('.cursor');
  const ring = document.querySelector('.cursor-ring');
  if (!dot || !ring) return;

  let mx = 0, my = 0;
  let rx = 0, ry = 0;
  let raf;

  document.addEventListener('mousemove', (e) => {
    mx = e.clientX;
    my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';
  });

  function tickRing() {
    rx += (mx - rx) * 0.14;
    ry += (my - ry) * 0.14;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    raf = requestAnimationFrame(tickRing);
  }
  tickRing();

  const hoverEls = document.querySelectorAll('a, button, .project-card, .filter-btn, .strip-thumb');
  hoverEls.forEach(el => {
    el.addEventListener('mouseenter', () => { dot.classList.add('expanded'); ring.classList.add('expanded'); });
    el.addEventListener('mouseleave', () => { dot.classList.remove('expanded'); ring.classList.remove('expanded'); });
  });
}

/* ── NAVBAR SCROLL ──────────────────────────────────────────── */
function initNavScroll() {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    nav.classList.toggle('scrolled', y > 60);
    lastScroll = y;
  }, { passive: true });
}

/* ── MOBILE NAV ─────────────────────────────────────────────── */
function initMobileNav() {
  const btn    = document.querySelector('.nav-hamburger');
  const mobile = document.querySelector('.nav-mobile');
  if (!btn || !mobile) return;

  btn.addEventListener('click', () => {
    const open = mobile.classList.toggle('open');
    btn.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  mobile.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      mobile.classList.remove('open');
      btn.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

/* ── ACTIVE NAV LINK ────────────────────────────────────────── */
function initActiveNav() {
  const links    = document.querySelectorAll('.nav-link[data-section]');
  const sections = [];

  links.forEach(l => {
    const id = l.dataset.section;
    const el = document.getElementById(id);
    if (el) sections.push({ el, link: l });
  });

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      sections.forEach(s => {
        if (s.el === e.target) s.link.classList.toggle('active', e.isIntersecting);
      });
    });
  }, { threshold: 0.35 });

  sections.forEach(s => io.observe(s.el));
}

/* ── LOADER ─────────────────────────────────────────────────── */
function initLoader() {
  const loader = document.querySelector('.loader');
  if (!loader) return;

  window.addEventListener('load', () => {
    setTimeout(() => loader.classList.add('hide'), 600);
  });

  // Fallback
  setTimeout(() => loader.classList.add('hide'), 3000);
}

/* ── COUNTER ANIMATION ──────────────────────────────────────── */
function initCounters() {
  const nums = document.querySelectorAll('.stat-num[data-target]');
  if (!nums.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el     = e.target;
      const target = parseInt(el.dataset.target, 10);
      const suffix = el.dataset.suffix || '';
      const dur    = 1600;
      const start  = performance.now();

      function step(now) {
        const pct = Math.min((now - start) / dur, 1);
        const ease = 1 - Math.pow(1 - pct, 3);
        el.textContent = Math.round(ease * target) + suffix;
        if (pct < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
      io.unobserve(el);
    });
  }, { threshold: 0.5 });

  nums.forEach(n => io.observe(n));
}

/* ── INIT ───────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initReveal();
  initCursor();
  initNavScroll();
  initMobileNav();
  initActiveNav();
  initCounters();
});
