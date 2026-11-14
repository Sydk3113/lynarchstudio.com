const projects = window.projects;
const featureProjects = ['prestige-bella', 'hobarts-school', 'villa-abu', 'studio-dvour']
  .map(id => projects.find(project => project.id === id));
const hero = document.querySelector('.hero');
const featureImage = document.querySelector('#feature-image');
const featureTitle = document.querySelector('#feature-title');
const featureTabs = document.querySelector('#feature-tabs');
const grid = document.querySelector('#projects');
const filters = document.querySelector('.filters');
const gallery = document.querySelector('#gallery');
const photo = document.querySelector('#gallery-photo');
const thumbs = document.querySelector('#gallery-thumbs');
let featured = featureProjects[0];
let activeProject;
let activeImage;

function imageFor(project, index = 0) {
  const image = new Image();
  image.src = project.images[index];
  image.alt = '';
  image.loading = 'lazy';
  return image;
}

function showFeatured(project) {
  featured = project;
  featureTitle.textContent = project.name;
  document.querySelector('#feature-type').textContent = project.scope + ' · ' + project.location;
  featureImage.src = project.images[0];
  featureTabs.querySelectorAll('button').forEach(button => {
    button.setAttribute('aria-pressed', String(button.dataset.project === project.id));
  });
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
    featureImage.getAnimations().forEach(animation => animation.cancel());
    featureImage.animate([{opacity:.35},{opacity:1}], {duration:380, easing:'ease-out'});
  }
}

featureProjects.forEach(project => {
  const button = document.createElement('button');
  button.type = 'button';
  button.dataset.project = project.id;
  button.setAttribute('aria-label', 'Feature ' + project.name);
  button.title = project.name;
  button.append(imageFor(project));
  button.addEventListener('click', () => showFeatured(project));
  featureTabs.append(button);
});
showFeatured(featured);
document.querySelector('#feature-open').addEventListener('click', () => openProject(featured));

if (matchMedia('(pointer: fine) and (prefers-reduced-motion: no-preference)').matches) {
  hero.addEventListener('pointermove', event => {
    const bounds = hero.getBoundingClientRect();
    hero.style.setProperty('--offset-x', ((event.clientX - bounds.left) / bounds.width - .5) * -25 + 'px');
    hero.style.setProperty('--offset-y', ((event.clientY - bounds.top) / bounds.height - .5) * -18 + 'px');
  });
  hero.addEventListener('pointerleave', () => {
    hero.style.removeProperty('--offset-x');
    hero.style.removeProperty('--offset-y');
  });
}

function renderProjects(filter) {
  const matches = projects.filter(project => filter === 'all' || project.type === filter);
  grid.replaceChildren(...matches.map(project => {
    const button = document.createElement('button');
    button.className = 'project';
    button.type = 'button';
    const cover = document.createElement('span');
    cover.className = 'project-cover';
    cover.append(imageFor(project));
    const title = document.createElement('span');
    title.className = 'project-title';
    title.textContent = project.name;
    const meta = document.createElement('span');
    meta.className = 'project-meta';
    meta.textContent = project.scope + ' · ' + project.location;
    button.append(cover, title, meta);
    button.addEventListener('click', () => openProject(project));
    return button;
  }));
  document.querySelector('#project-count').textContent = matches.length + ' projects';
}

function showImage(index) {
  const total = activeProject.images.length;
  activeImage = (index + total) % total;
  photo.src = activeProject.images[activeImage];
  photo.alt = activeProject.name + ' · Image ' + (activeImage + 1);
  document.querySelector('#gallery-count').textContent = (activeImage + 1) + ' / ' + total;
  Array.from(thumbs.children).forEach((button, position) => {
    button.setAttribute('aria-pressed', String(position === activeImage));
  });
}

function openProject(project) {
  activeProject = project;
  document.querySelector('#gallery-title').textContent = project.name;
  document.querySelector('#gallery-meta').textContent = project.scope + ' · ' + project.location;
  document.querySelector('#gallery-description').textContent = project.description;
  thumbs.replaceChildren(...project.images.map((_, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.setAttribute('aria-label', 'View image ' + (index + 1));
    button.append(imageFor(project, index));
    button.addEventListener('click', () => showImage(index));
    return button;
  }));
  showImage(0);
  gallery.showModal();
  gallery.scrollTop = 0;
}

filters.addEventListener('click', event => {
  const selected = event.target.closest('button[data-filter]');
  if (!selected) return;
  filters.querySelectorAll('button').forEach(button => {
    button.setAttribute('aria-pressed', String(button === selected));
  });
  renderProjects(selected.dataset.filter);
});

document.querySelector('#close-gallery').addEventListener('click', () => gallery.close());
document.querySelector('#prev-photo').addEventListener('click', () => showImage(activeImage - 1));
document.querySelector('#next-photo').addEventListener('click', () => showImage(activeImage + 1));
gallery.addEventListener('keydown', event => {
  if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
  event.preventDefault();
  showImage(activeImage + (event.key === 'ArrowLeft' ? -1 : 1));
});

const enquiry = document.querySelector('#enquiry');
enquiry.addEventListener('submit', event => {
  event.preventDefault();
  const scope = document.querySelector('#scope').value;
  const location = document.querySelector('#location').value.trim();
  const brief = document.querySelector('#brief').value.trim();
  const subject = 'Project enquiry · ' + scope;
  const body = 'Service: ' + scope + '\nLocation: ' + location + '\n\n' + brief;
  window.location.href = 'mailto:info@lynarchstudio.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
});

renderProjects('all');
