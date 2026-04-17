// ============================================================
//  LYNARCH STUDIO — Main App Logic
// ============================================================

'use strict';

/* ── STATE ──────────────────────────────────────────────────── */
let currentFilter = 'All';
let lightboxProject = null;
let lightboxIndex = 0;

/* ── HELPERS ────────────────────────────────────────────────── */
function qs(sel, root = document) { return root.querySelector(sel); }
function qsa(sel, root = document) { return [...root.querySelectorAll(sel)]; }

function svgArrow() {
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
    <path d="M7 17L17 7M17 7H7M17 7v10"/>
  </svg>`;
}
function svgChevLeft() {
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
    <path d="M15 18l-6-6 6-6"/>
  </svg>`;
}
function svgChevRight() {
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
    <path d="M9 18l6-6-6-6"/>
  </svg>`;
}
function svgClose() {
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
    <path d="M18 6L6 18M6 6l12 12"/>
  </svg>`;
}

/* ── PROJECT CARDS ──────────────────────────────────────────── */
function renderProjects(filter = 'All') {
  const grid = qs('#projectsGrid');
  if (!grid) return;

  const filtered = filter === 'All'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === filter);

  grid.innerHTML = '';

  filtered.forEach((project, i) => {
    const card = document.createElement('div');
    card.className = 'project-card reveal';
    card.style.transitionDelay = (i * 0.06) + 's';
    card.dataset.projectId = project.id;

    card.innerHTML = `
      <img
        class="project-img"
        src="${project.cover}"
        alt="${project.name}"
        loading="lazy"
      />
      <div class="project-overlay">
        <div class="project-meta">
          <span class="project-cat">${project.category}</span>
          <span class="project-loc">${project.location}</span>
        </div>
        <div class="project-name">${project.name}</div>
      </div>
      <div class="project-arrow">${svgArrow()}</div>
    `;

    card.addEventListener('click', () => openLightbox(project, 0));
    grid.appendChild(card);
  });

  // Re-trigger reveal observer
  qsa('.project-card.reveal').forEach(el => {
    el.classList.remove('revealed');
    revealEl(el);
  });
}

function revealEl(el) {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('revealed');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });
  io.observe(el);
}

/* ── FILTER ─────────────────────────────────────────────────── */
function initFilter() {
  qsa('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      qsa('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.dataset.filter;
      renderProjects(currentFilter);
    });
  });
}

/* ── LIGHTBOX ───────────────────────────────────────────────── */
function buildLightbox() {
  if (qs('#lightbox')) return;

  const lb = document.createElement('div');
  lb.id = 'lightbox';
  lb.className = 'lightbox';
  lb.setAttribute('role', 'dialog');
  lb.setAttribute('aria-modal', 'true');
  lb.setAttribute('aria-label', 'Project gallery');

  lb.innerHTML = `
    <div class="lightbox-inner">
      <div class="lightbox-header">
        <div class="lightbox-title-wrap">
          <div class="lightbox-project-cat" id="lbCat"></div>
          <div class="lightbox-project-name" id="lbName"></div>
          <div class="lightbox-bio" id="lbBio"></div>
        </div>
        <button class="lightbox-close" id="lbClose" aria-label="Close gallery">${svgClose()}</button>
      </div>
      <div class="lightbox-stage">
        <button class="lightbox-btn lightbox-prev" id="lbPrev" aria-label="Previous image">${svgChevLeft()}</button>
        <img class="lightbox-img" id="lbImg" alt="" />
        <button class="lightbox-btn lightbox-next" id="lbNext" aria-label="Next image">${svgChevRight()}</button>
        <div class="lightbox-counter" id="lbCounter"></div>
      </div>
      <div class="lightbox-strip" id="lbStrip"></div>
    </div>
  `;

  document.body.appendChild(lb);

  qs('#lbClose').addEventListener('click', closeLightbox);
  qs('#lbPrev').addEventListener('click', () => navigateLightbox(-1));
  qs('#lbNext').addEventListener('click', () => navigateLightbox(1));

  lb.addEventListener('click', (e) => {
    if (e.target === lb) closeLightbox();
  });
}

function openLightbox(project, idx = 0) {
  lightboxProject = project;
  lightboxIndex   = idx;

  const lb = qs('#lightbox');
  qs('#lbCat',  lb).textContent = project.category + ' · ' + project.year;
  qs('#lbName', lb).textContent = project.name;
  qs('#lbBio',  lb).textContent = project.description || '';

  buildStrip(project);
  setLightboxImage(idx);

  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  qs('#lightbox').classList.remove('open');
  document.body.style.overflow = '';
  lightboxProject = null;
}

function buildStrip(project) {
  const strip = qs('#lbStrip');
  strip.innerHTML = '';
  project.images.forEach((src, i) => {
    const thumb = document.createElement('div');
    thumb.className = 'strip-thumb' + (i === lightboxIndex ? ' active' : '');
    thumb.innerHTML = `<img src="${src}" alt="Image ${i + 1}" loading="lazy" />`;
    thumb.addEventListener('click', () => setLightboxImage(i));
    strip.appendChild(thumb);
  });
}

function setLightboxImage(idx) {
  const project = lightboxProject;
  if (!project) return;

  lightboxIndex = (idx + project.images.length) % project.images.length;

  const img = qs('#lbImg');
  img.classList.remove('loaded');
  img.src = project.images[lightboxIndex];
  img.alt = project.name + ' — Image ' + (lightboxIndex + 1);
  img.onload = () => img.classList.add('loaded');

  qs('#lbCounter').textContent = (lightboxIndex + 1) + ' / ' + project.images.length;

  qsa('.strip-thumb').forEach((t, i) => {
    t.classList.toggle('active', i === lightboxIndex);
  });

  // Scroll active thumb into view
  const active = qs('.strip-thumb.active');
  if (active) active.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
}

function navigateLightbox(dir) {
  setLightboxImage(lightboxIndex + dir);
}

/* ── KEYBOARD ───────────────────────────────────────────────── */
document.addEventListener('keydown', (e) => {
  const lb = qs('#lightbox');
  if (!lb || !lb.classList.contains('open')) return;

  if (e.key === 'ArrowRight') navigateLightbox(1);
  if (e.key === 'ArrowLeft')  navigateLightbox(-1);
  if (e.key === 'Escape')     closeLightbox();
});

/* ── CONTACT FORM ───────────────────────────────────────────── */
function initContactForm() {
  const form = qs('#contactForm');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Validate
    let valid = true;
    const fields = qsa('[data-required]', form);
    fields.forEach(field => {
      const group = field.closest('.form-group');
      group.classList.remove('has-error');
      if (!field.value.trim()) {
        group.classList.add('has-error');
        valid = false;
      }
      if (field.type === 'email' && field.value.trim()) {
        const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value.trim());
        if (!ok) { group.classList.add('has-error'); valid = false; }
      }
    });

    if (!valid) return;

    const btn = qs('#submitBtn', form);
    btn.textContent = 'Sending…';
    btn.classList.add('loading');

    try {
      const data = new FormData(form);
      const res  = await fetch(form.action, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      });

      if (res.ok) {
        form.style.display = 'none';
        qs('#formSuccess').classList.add('show');
      } else {
        btn.textContent = 'Error — please try again';
        btn.classList.remove('loading');
      }
    } catch {
      // For demo — show success anyway if Formspree not configured
      form.style.display = 'none';
      qs('#formSuccess').classList.add('show');
    }
  });
}

/* ── INIT ───────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  buildLightbox();
  renderProjects();
  initFilter();
  initContactForm();

  // Filmstrip click → open lightbox for that project
  document.querySelectorAll('.hero-filmstrip-thumb').forEach(thumb => {
    thumb.addEventListener('click', () => {
      const pid = thumb.dataset.projectId;
      const project = PROJECTS.find(p => p.id === pid);
      if (project) openLightbox(project, 0);
    });
  });
});
