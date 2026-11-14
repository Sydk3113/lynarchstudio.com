const projectId = new URLSearchParams(location.search).get('id');
const project = window.projects.find(item => item.id === projectId);
const content = document.querySelector('#project-content');

if (!project) {
  document.body.classList.add('project-missing');
  content.innerHTML = '<section class="missing-project section-pad"><p class="eyebrow">Lynarch Studio</p><h1>Find your<br>next perspective.</h1><p>This project link is unavailable.</p><a class="text-link" href="work.html">Explore all projects ↗</a></section>';
} else {
  document.title = project.shortName + ' — Lynarch Studio';
  document.querySelector('meta[name="description"]').content = project.intro;
  const next = window.projects[(window.projects.indexOf(project) + 1) % window.projects.length];
  const hero = document.createElement('section');
  hero.className = 'project-hero';
  const image = window.projectPicture(project, '100vw');
  image.loading = 'eager';
  image.fetchPriority = 'high';
  hero.append(image);
  const heroOverlay = document.createElement('div');
  heroOverlay.className = 'project-hero-overlay';
  const caption = document.createElement('div');
  caption.className = 'project-hero-caption section-pad';
  const label = document.createElement('p');
  label.className = 'eyebrow';
  label.textContent = project.category + ' · ' + project.location;
  const heading = document.createElement('h1');
  heading.textContent = project.shortName;
  const link = document.createElement('a');
  link.className = 'project-scroll';
  link.href = '#project-overview';
  link.innerHTML = 'Explore the project <span class="circle-arrow" aria-hidden="true">↓</span>';
  caption.append(label, heading, link);
  hero.append(heroOverlay, caption);
  content.append(hero);

  const overview = document.createElement('section');
  overview.className = 'project-overview section-pad';
  overview.id = 'project-overview';
  const info = document.createElement('div');
  info.className = 'project-facts reveal';
  const back = document.createElement('a');
  back.className = 'text-link';
  back.href = 'work.html';
  back.textContent = '← All projects';
  info.append(back);
  const dl = document.createElement('dl');
  [['Location', project.location], ['Discipline', project.category], ['Project', project.status]].forEach(([term, value]) => {
    const group = document.createElement('div');
    const dt = document.createElement('dt');
    dt.textContent = term;
    const dd = document.createElement('dd');
    dd.textContent = value;
    group.append(dt, dd);
    dl.append(group);
  });
  info.append(dl);
  const narrative = document.createElement('div');
  narrative.className = 'project-narrative reveal';
  const title = document.createElement('h2');
  title.textContent = project.title;
  const intro = document.createElement('p');
  intro.className = 'project-intro';
  intro.textContent = project.intro;
  narrative.append(title, intro);
  if (project.body) {
    const story = document.createElement('h3');
    story.textContent = project.story;
    const body = document.createElement('p');
    body.textContent = project.body;
    narrative.append(story, body);
  }
  if (project.credit) {
    const credit = document.createElement('p');
    credit.className = 'project-credit';
    credit.textContent = project.credit;
    narrative.append(credit);
  }
  overview.append(info, narrative);
  content.append(overview);

  const gallery = document.createElement('section');
  gallery.className = 'story-gallery section-pad';
  gallery.setAttribute('aria-label', project.shortName + ' image gallery');
  project.images.forEach((src, index) => {
    const figure = document.createElement('figure');
    figure.className = 'story-image reveal';
    const button = document.createElement('button');
    button.type = 'button';
    button.setAttribute('aria-label', 'Enlarge ' + project.shortName + ' image ' + (index + 1));
    const picture = document.createElement('img');
    picture.src = src;
    picture.srcset = window.imageSources(src);
    picture.width = window.projectMedia[src].width;
    picture.height = window.projectMedia[src].height;
    picture.sizes = index % 3 === 0 ? '92vw' : '(max-width: 680px) 92vw, 45vw';
    picture.loading = 'lazy';
    picture.alt = project.shortName + ' · ' + project.category.toLowerCase() + ' view ' + (index + 1);
    const expand = document.createElement('span');
    expand.className = 'expand-image';
    expand.textContent = '↗';
    expand.setAttribute('aria-hidden', 'true');
    button.append(picture, expand);
    button.addEventListener('click', () => openImage(index));
    figure.append(button);
    gallery.append(figure);
  });
  content.append(gallery);
  const nextLink = document.createElement('a');
  nextLink.className = 'next-project';
  nextLink.href = window.projectHref(next);
  nextLink.append(window.projectPicture(next, '100vw'));
  const nextCopy = document.createElement('div');
  nextCopy.innerHTML = '<p class="eyebrow">Explore another space</p>';
  const nextTitle = document.createElement('h2');
  nextTitle.textContent = next.shortName;
  const arrow = document.createElement('span');
  arrow.className = 'circle-arrow';
  arrow.textContent = '↗';
  arrow.setAttribute('aria-hidden', 'true');
  nextCopy.append(nextTitle, arrow);
  nextLink.append(nextCopy);
  content.append(nextLink);

  const lightbox = document.querySelector('#lightbox');
  let imageIndex = 0;
  function showImage(index) {
    imageIndex = (index + project.images.length) % project.images.length;
    document.querySelector('#lightbox-image').src = project.images[imageIndex];
    document.querySelector('#lightbox-image').alt = project.shortName + ' image ' + (imageIndex + 1);
    document.querySelector('#lightbox-count').textContent = (imageIndex + 1) + ' / ' + project.images.length;
  }
  function openImage(index) {
    document.querySelector('#lightbox-title').textContent = project.shortName;
    showImage(index);
    lightbox.showModal();
  }
  document.querySelector('#lightbox-close').addEventListener('click', () => lightbox.close());
  document.querySelector('#lightbox-prev').addEventListener('click', () => showImage(imageIndex - 1));
  document.querySelector('#lightbox-next').addEventListener('click', () => showImage(imageIndex + 1));
  lightbox.addEventListener('keydown', event => {
    if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
    event.preventDefault();
    showImage(imageIndex + (event.key === 'ArrowRight' ? 1 : -1));
  });
  let touchStart;
  lightbox.addEventListener('touchstart', event => {
    touchStart = event.changedTouches[0].clientX;
  }, { passive: true });
  lightbox.addEventListener('touchend', event => {
    const distance = event.changedTouches[0].clientX - touchStart;
    if (Math.abs(distance) > 60) showImage(imageIndex + (distance < 0 ? 1 : -1));
  }, { passive: true });
  window.observeReveals();
}
