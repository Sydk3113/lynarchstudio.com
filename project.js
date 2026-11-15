const projectId = new URLSearchParams(location.search).get('id');
const project = window.projects.find(item => item.id === projectId);
const content = document.querySelector('#project-content');

if (!project) {
  document.body.classList.add('project-missing');
  content.innerHTML = '<section class="missing-project section-pad"><p class="eyebrow">Lynarch Studio</p><h1>Find your<br>next perspective.</h1><p>This project link is unavailable.</p><a class="text-link" href="work.html">Explore all projects <span class="arrow-ne" aria-hidden="true"></span></a></section>';
} else {
  document.title = project.shortName + ' — Lynarch Studio';
  document.querySelector('meta[name="description"]').content = project.intro;
  const coverIndex = project.images.indexOf(project.cover);
  const viewerImages = coverIndex < 0 ? [...project.images, project.cover] : project.images;
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
  label.textContent = project.category;
  const heading = document.createElement('h1');
  heading.textContent = project.shortName;
  const link = document.createElement('a');
  link.className = 'project-scroll';
  link.href = '#project-overview';
  link.innerHTML = 'Explore the project <span class="circle-arrow" aria-hidden="true">↓</span>';
  const viewCover = document.createElement('button');
  viewCover.type = 'button';
  viewCover.className = 'text-link project-cover-view';
  viewCover.setAttribute('aria-haspopup', 'dialog');
  viewCover.innerHTML = 'View full image <span class="arrow-ne" aria-hidden="true"></span>';
  viewCover.addEventListener('click', () => openImage(coverIndex < 0 ? viewerImages.length - 1 : coverIndex));
  caption.append(label, heading, window.projectMetadata(project, 'project-meta project-hero-meta'), viewCover, link);
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

  if (project.id === 'casa-aurum') {
    const film = document.createElement('section');
    film.className = 'project-film section-pad';
    film.id = 'project-film';
    film.setAttribute('aria-labelledby', 'project-film-title');
    film.innerHTML = `
      <div>
        <p class="eyebrow">Casa Aurum</p>
        <h2 id="project-film-title">Made for<br><em>everyday life.</em></h2>
        <p>A morning ritual. A place for everything. Step inside the kitchen at Casa Aurum.</p>
        <p class="film-duration">A short film · 24 seconds · Sound available</p>
      </div>
      <video controls playsinline preload="none" width="1080" height="1152"
        poster="media/casa-aurum/kitchen-framed-poster.jpg"
        aria-label="Casa Aurum kitchen film">
        <source src="media/casa-aurum/kitchen-film-framed.mp4" type="video/mp4">
        <a href="media/casa-aurum/kitchen-film-framed.mp4">Watch the kitchen film</a>
      </video>`;
    content.append(film);
  }

  const artifacts = project.artifacts ?? [];
  if (artifacts.length) {
    const process = document.createElement('section');
    process.className = 'process-artifacts section-pad';
    process.setAttribute('aria-labelledby', 'process-artifacts-title');
    const title = document.createElement('h2');
    title.id = 'process-artifacts-title';
    title.textContent = 'Process & Details';
    const grid = document.createElement('div');
    grid.className = 'artifact-grid';
    for (const artifact of artifacts) {
      const figure = document.createElement('figure');
      const image = document.createElement('img');
      image.alt = artifact.alt;
      image.width = artifact.width;
      image.height = artifact.height;
      image.loading = 'lazy';
      image.decoding = 'async';
      image.sizes = '(max-width: 680px) 90vw, 44vw';
      if (artifact.srcset) image.srcset = artifact.srcset;
      image.src = artifact.src;
      const caption = document.createElement('figcaption');
      caption.textContent = artifact.caption;
      figure.append(image, caption);
      grid.append(figure);
    }
    process.append(title, grid);
    content.append(process);
  }

  const gallery = document.createElement('section');
  gallery.id = 'project-gallery';
  gallery.className = 'story-gallery section-pad';
  gallery.setAttribute('aria-label', project.shortName + ' image gallery');
  let row;
  project.images.forEach((src, index) => {
    if (index % 2 === 0) {
      const pair = project.images.slice(index, index + 2);
      const ratios = pair.map(path => {
        const {width, height} = window.projectMedia[path];
        return width / height;
      });
      row = document.createElement('div');
      row.className = 'story-row';
      row.style.setProperty('--photo-columns', ratios.map(ratio => `minmax(0, ${ratio}fr)`).join(' '));
      row.style.setProperty('--row-ratio', ratios.reduce((sum, ratio) => sum + ratio, 0));
      gallery.append(row);
    }
    const figure = document.createElement('figure');
    figure.className = 'story-image reveal';
    const button = document.createElement('button');
    button.type = 'button';
    button.setAttribute('aria-label', 'Enlarge ' + project.shortName + ' image ' + (index + 1));
    const picture = document.createElement('img');
    picture.srcset = window.imageSources(src);
    picture.width = window.projectMedia[src].width;
    picture.height = window.projectMedia[src].height;
    picture.sizes = 'auto, 92vw';
    picture.loading = 'lazy';
    picture.decoding = 'async';
    picture.src = src;
    picture.alt = project.shortName + ' · ' + project.category.toLowerCase() + ' view ' + (index + 1);
    const expand = document.createElement('span');
    expand.className = 'expand-image';
    expand.classList.add('arrow-ne');
    expand.setAttribute('aria-hidden', 'true');
    button.append(picture, expand);
    button.addEventListener('click', () => openImage(index));
    figure.append(button);
    row.append(figure);
  });
  content.append(gallery);

  if (project.executionPhotos?.length) {
    const section = document.createElement('section');
    section.className = 'execution-section section-pad';
    const details = document.createElement('details');
    const summary = document.createElement('summary');
    summary.textContent = 'Execution photos · ' + project.executionPhotos.length;
    const grid = document.createElement('div');
    grid.className = 'artifact-grid execution-grid';
    details.append(summary, grid);
    // Insert the images on first expansion, so closed galleries use no photo data.
    details.addEventListener('toggle', () => {
      if (!details.open || grid.childElementCount) return;
      for (const photo of project.executionPhotos) {
        const figure = document.createElement('figure');
        const image = document.createElement('img');
        image.alt = photo.caption;
        image.loading = 'lazy';
        image.decoding = 'async';
        image.src = photo.src;
        const caption = document.createElement('figcaption');
        caption.textContent = photo.caption;
        figure.append(image, caption);
        grid.append(figure);
      }
    });
    section.append(details);
    content.append(section);
  }
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
  arrow.classList.add('arrow-ne');
  arrow.setAttribute('aria-hidden', 'true');
  nextCopy.append(nextTitle, arrow);
  nextLink.append(nextCopy);
  content.append(nextLink);

  const lightbox = document.querySelector('#lightbox');
  let imageIndex = 0;
  function showImage(index) {
    imageIndex = (index + viewerImages.length) % viewerImages.length;
    document.querySelector('#lightbox-image').src = viewerImages[imageIndex];
    document.querySelector('#lightbox-image').alt = project.shortName + ' image ' + (imageIndex + 1);
    document.querySelector('#lightbox-count').textContent = (imageIndex + 1) + ' / ' + viewerImages.length;
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
