const siteHeader = document.querySelector('#site-header');
const siteFooter = document.querySelector('#site-footer');
const motionQuery = matchMedia('(prefers-reduced-motion: reduce)');
const siteRoot = document.body.dataset.siteRoot || '';
const contactPage = document.body.dataset.page === 'contact';
const homeLink = document.body.dataset.page === 'home' ? '' : siteRoot + 'index.html';
siteHeader.innerHTML = `
<header class="site-header">
 <a class="brand" data-opening-home href="${siteRoot}index.html?opening=1" aria-label="Lynarch Studio home"><img src="${siteRoot}brand.svg" alt="Lynarch Studio" width="1104" height="480"></a>
 <p class="header-location">Architecture & interiors<br>Chennai, India</p>
 <nav class="header-links" aria-label="Primary"><a href="${siteRoot}work.html">Work</a><a href="${homeLink}#studio">Studio</a><a href="${siteRoot}design-guide/">Design Guide</a><a href="${siteRoot}contact.html">Contact</a></nav>
 <button type="button" class="header-cta" data-enquiry aria-haspopup="dialog">Start a Project</button>
 <button type="button" class="menu-toggle" aria-label="Open menu" aria-haspopup="dialog"><span>Menu</span><span class="menu-icon" aria-hidden="true"></span></button>
</header><div class="page-progress" aria-hidden="true"></div>`;
siteFooter.innerHTML = `
<footer class="site-footer section-pad${contactPage ? ' contact-footer' : ''}" id="contact">
${contactPage ? '' : `
 <div class="footer-top"><p class="eyebrow">Project enquiries</p><p>A plot, a floor plan, or a room<br>that needs rethinking.</p></div>
 <button class="contact-heading" data-enquiry><span>Tell us what<br><em>you’re building.</em></span><span class="contact-arrow arrow-ne" aria-hidden="true"></span></button>
 <div class="footer-grid">
  <a class="footer-brand" href="${siteRoot}index.html"><img src="${siteRoot}brand.svg" alt="Lynarch Studio" width="1104" height="480"></a>
  <div><p class="eyebrow">Find us</p><address>Second Floor, SIET Admin Building<br>54 KB Dasan Road, Teynampet<br>Chennai 600018</address></div>
  <div><p class="eyebrow">Say hello</p><a href="mailto:info@lynarchstudio.com">info@lynarchstudio.com</a><br><a href="https://wa.me/message/IURUFXEX5SCUP1" target="_blank" rel="noopener noreferrer">Chat on WhatsApp <span class="arrow-ne" aria-hidden="true"></span></a><br><a href="tel:+919941437908">+91 99414 37908</a><br><a href="tel:+919789093726">+91 97890 93726</a></div>
 </div>
`}
 <div class="footer-base"><span>© ${new Date().getFullYear()} Lynarch Studio</span><a href="https://www.instagram.com/lynarch.studio/" target="_blank" rel="noopener noreferrer">Instagram <span class="arrow-ne" aria-hidden="true"></span></a><a href="https://www.linkedin.com/company/lynarch-studio" target="_blank" rel="noopener noreferrer">LinkedIn <span class="arrow-ne" aria-hidden="true"></span></a>${contactPage ? '' : `<a href="https://wa.me/message/IURUFXEX5SCUP1" target="_blank" rel="noopener noreferrer">WhatsApp <span class="arrow-ne" aria-hidden="true"></span></a><a href="#top" data-top>Back to top ↑</a>`}</div>
</footer>`;
document.body.insertAdjacentHTML('beforeend', `
<dialog class="menu-dialog" aria-label="Site menu">
 <div class="menu-heading"><a class="brand" data-opening-home href="${siteRoot}index.html?opening=1"><img src="${siteRoot}brand.svg" alt="Lynarch Studio" width="1104" height="480"></a><button class="menu-close" aria-label="Close menu">Close <span aria-hidden="true">×</span></button></div>
 <div class="menu-layout">
  <nav class="menu-nav" aria-label="Explore Lynarch">
   <a href="${siteRoot}work.html" data-menu-photo="${siteRoot}media/hobarts-school/2.jpg"><span>Our work</span><span class="arrow-ne" aria-hidden="true"></span></a>
   <a href="${homeLink}#studio" data-menu-photo="${siteRoot}media/studio-dvour/13.jpg"><span>The studio</span><span class="arrow-ne" aria-hidden="true"></span></a>
   <a href="${homeLink}#approach" data-menu-photo="${siteRoot}media/casa-aurum/cover.jpg"><span>Our approach</span><span class="arrow-ne" aria-hidden="true"></span></a>
   <a href="${siteRoot}design-guide/" data-menu-photo="${siteRoot}media/study-center/cover-small.jpg" data-preview-caption="Study Center · Concept rendering"><span>Design Guide</span><span class="arrow-ne" aria-hidden="true"></span></a>
   <a href="${siteRoot}contact.html" data-menu-photo="${siteRoot}media/studio-dvour/3.jpg"><span>Contact</span><span class="arrow-ne" aria-hidden="true"></span></a>
  </nav>
  <div class="menu-preview"><img src="${siteRoot}media/hobarts-school/2-small.jpg" alt="" loading="lazy"><p hidden></p></div>
 </div><div class="menu-bottom"><span>Chennai, India</span><a href="mailto:info@lynarchstudio.com">info@lynarchstudio.com</a></div>
</dialog>
<dialog class="enquiry-dialog" aria-labelledby="enquiry-heading">
 <button class="enquiry-close round-button" aria-label="Close enquiry">×</button>
 <p class="eyebrow">A new beginning</p><h2 id="enquiry-heading">Tell us about<br><em>your space.</em></h2>
 <form id="enquiry-form" action="https://formspree.io/f/mkoqngyy" method="POST">
  <fieldset id="brief-step-one"><legend>What are you planning?</legend>
   <div class="choice-group"><label><input type="radio" name="space" value="A home" required><span>A home</span></label><label><input type="radio" name="space" value="A workspace"><span>A workspace</span></label><label><input type="radio" name="space" value="Retail or hospitality"><span>Retail or hospitality</span></label><label><input type="radio" name="space" value="Something else"><span>Something else</span></label></div>
   <label class="field-label" for="brief-service">How can we help?</label><select id="brief-service" name="service" required><option value="">Choose a service</option><option>Architecture</option><option>Interior design</option><option>Design and turnkey execution</option><option>I’d like your advice</option></select>
   <button class="solid-button" id="brief-continue" type="button">Continue <span>→</span></button>
  </fieldset>
  <fieldset id="brief-step-two" hidden disabled><legend>A few details</legend>
   <div class="form-row"><div><label class="field-label" for="brief-name">Your name</label><input id="brief-name" name="name" autocomplete="name" required></div><div><label class="field-label" for="brief-location">Project location</label><input id="brief-location" name="location" autocomplete="address-level2" required></div></div>
   <div class="form-row"><div><label class="field-label" for="brief-email">Your email</label><input id="brief-email" name="email" type="email" autocomplete="email" required></div><div><label class="field-label" for="brief-phone">Phone (optional)</label><input id="brief-phone" name="phone" type="tel" autocomplete="tel"></div></div>
   <label class="field-label" for="brief-message">What do you have in mind?</label><textarea id="brief-message" name="message" rows="3" required placeholder="The space, your ideas, and any timing you have in mind…"></textarea>
   <p class="form-note">Your enquiry is sent securely through Formspree to our studio.</p>
   <div class="form-actions"><button id="brief-back" class="text-link" type="button">← Back</button><button class="solid-button" type="submit">Send enquiry <span class="arrow-ne" aria-hidden="true"></span></button></div>
   <p id="brief-status" role="status"></p><a id="brief-mail-link" hidden>Send by email instead <span class="arrow-ne" aria-hidden="true"></span></a>
  </fieldset>
 </form>
</dialog><div class="transition-screen" aria-hidden="true"><div class="opening-identity"><img class="opening-mark" src="${siteRoot}monogram.webp" alt=""><img class="opening-wordmark" src="${siteRoot}brand.svg" alt=""></div></div>`);
document.querySelectorAll('.header-links a, .menu-nav a').forEach(link => {
 const destination = new URL(link.href);
 const currentPath = location.pathname.replace(/index\.html$/, '');
 if (!destination.hash && destination.pathname === currentPath) link.setAttribute('aria-current', 'page');
 if (document.body.dataset.page === 'guide' && destination.pathname === new URL(siteRoot + 'design-guide/', location.href).pathname) {
  link.setAttribute('aria-current', currentPath === destination.pathname ? 'page' : 'location');
 }
});
const menu = document.querySelector('.menu-dialog');
const enquiry = document.querySelector('.enquiry-dialog');
document.querySelector('.menu-toggle').addEventListener('click', () => menu.showModal());
document.querySelector('.menu-close').addEventListener('click', () => menu.close());
document.querySelector('.enquiry-close').addEventListener('click', () => enquiry.close());
document.querySelectorAll('[data-enquiry]').forEach(button => {
 button.addEventListener('click', () => { if (menu.open) menu.close(); enquiry.showModal(); });
});
const menuImage = menu.querySelector('.menu-preview img');
const menuCaption = menu.querySelector('.menu-preview p');
document.querySelectorAll('[data-menu-photo]').forEach(item => {
 const update = () => {
  menuImage.src = item.dataset.menuPhoto;
  menuCaption.textContent = item.dataset.previewCaption || "";
  menuCaption.hidden = !item.dataset.previewCaption;
  if (!motionQuery.matches) menuImage.animate([{opacity:.5,transform:'scale(1.04)'},{opacity:1,transform:'scale(1)'}],{duration:420,easing:'ease-out'});
 };
 item.addEventListener('pointerenter', update);
 item.addEventListener('focus', update);
});
document.querySelectorAll('[data-top]').forEach(link => link.addEventListener('click', event => {
 event.preventDefault(); window.scrollTo({top:0,behavior:motionQuery.matches?'instant':'smooth'});
}));
menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => menu.close()));
const stepOne = document.querySelector('#brief-step-one');
const stepTwo = document.querySelector('#brief-step-two');
const enquiryForm = document.querySelector('#enquiry-form');
document.querySelector('#brief-continue').addEventListener('click', () => {
 if (!enquiryForm.reportValidity()) return;
 stepOne.hidden = true; stepTwo.disabled = false; stepTwo.hidden = false;
 document.querySelector('#brief-name').focus();
});
document.querySelector('#brief-back').addEventListener('click', () => {
 stepTwo.hidden = true; stepTwo.disabled = true; stepOne.hidden = false;
 document.querySelector('#brief-continue').focus();
});
enquiryForm.addEventListener('submit', async event => {
 event.preventDefault();
 if (!stepOne.hidden) { document.querySelector('#brief-continue').click(); return; }
 if (enquiryForm.dataset.sending === 'true' || !enquiryForm.reportValidity()) return;
 const data = new FormData(enquiryForm);
 data.set('project_type', data.get('space'));
 data.set('_subject', 'Lynarch Studio enquiry — ' + data.get('space'));
 const button = enquiryForm.querySelector('[type="submit"]');
 const status = document.querySelector('#brief-status');
 const fallback = document.querySelector('#brief-mail-link');
 const body = ['Hello Lynarch Studio,', '', 'Name: '+data.get('name'), 'Email: '+data.get('email'), 'Phone: '+(data.get('phone')||'Not provided'), 'Space: '+data.get('space'), 'Service: '+data.get('service'), 'Location: '+data.get('location'), '', data.get('message')].join('\n');
 fallback.href = 'mailto:info@lynarchstudio.com?subject='+encodeURIComponent(data.get('_subject'))+'&body='+encodeURIComponent(body);
 fallback.hidden = true;
 enquiryForm.dataset.sending = 'true';
 button.disabled = true; button.textContent = 'Sending…';
 document.querySelector('#brief-back').disabled = true;
 status.textContent = 'Sending your enquiry…';
 const controller = new AbortController();
 const timeout = setTimeout(() => controller.abort(), 20000);
 try {
  const response = await fetch(enquiryForm.action, {method:'POST', body:data, headers:{Accept:'application/json'}, signal:controller.signal});
  if (!response.ok) throw new Error('Submission failed');
  enquiryForm.reset();
  stepTwo.hidden = true; stepTwo.disabled = true; stepOne.hidden = false;
  status.textContent = 'Thank you. Your enquiry has been submitted to Lynarch Studio.';
  enquiryForm.append(status);
  status.tabIndex = -1; status.focus();
 } catch {
  status.textContent = 'We couldn’t confirm your submission. Your details are still here. You can try again or send them by email.';
  fallback.hidden = false;
 } finally {
  clearTimeout(timeout); enquiryForm.dataset.sending = 'false';
  button.disabled = false; button.innerHTML = 'Send enquiry <span class="arrow-ne" aria-hidden="true"></span>';
  document.querySelector('#brief-back').disabled = false;
 }
});
const revealObserver = new IntersectionObserver(entries => {
 entries.forEach(entry => {
  if (!entry.isIntersecting) return;
  entry.target.classList.add('visible'); revealObserver.unobserve(entry.target);
 });
}, {threshold:.1});
window.observeReveals = () => document.querySelectorAll('.reveal:not(.visible)').forEach(element => revealObserver.observe(element));
document.body.classList.add('enhanced');
window.observeReveals();
let scrollFrame;
function updateScroll() {
 scrollFrame = null;
 const y = window.scrollY;
 document.querySelector('.site-header').classList.toggle('scrolled',y>50);
 const max = document.documentElement.scrollHeight - innerHeight;
 document.querySelector('.page-progress').style.transform = 'scaleX('+(max>0?y/max:0)+')';
 if (motionQuery.matches) return;
 const hero = document.querySelector('.hero-images');
 if (hero && y < innerHeight*1.4) hero.style.transform = 'translateY('+y*.22+'px)';
 const detail = document.querySelector('.detail-story');
 if (detail) {
  const bounds = detail.getBoundingClientRect();
  if (bounds.top < innerHeight && bounds.bottom > 0) detail.style.setProperty('--parallax',(bounds.top/innerHeight)*-60+'px');
 }
}
addEventListener('scroll',()=>{if(!scrollFrame) scrollFrame=requestAnimationFrame(updateScroll);},{passive:true});
addEventListener('resize',updateScroll);
updateScroll();
let navigationTimer;
document.addEventListener('click', event => {
 const link = event.target.closest('a');
 if (!link || event.defaultPrevented || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || link.target || link.download || motionQuery.matches) return;
 if (link.hasAttribute('data-opening-home')) {
  if (document.body.dataset.page === 'home') {
   event.preventDefault();
   window.scrollTo({top:0, behavior:'instant'});
   history.replaceState(history.state, '', location.pathname + location.search);
   const root = document.documentElement;
   root.classList.remove('show-studio-opening');
   void root.offsetWidth;
   root.classList.add('show-studio-opening');
  }
  return;
 }
 const destination = new URL(link.href,location.href);
 const samePage = destination.pathname === location.pathname && destination.search === location.search;
 const studioAnchor = samePage && destination.hash === '#studio' && link.closest('.header-links, .menu-nav');
 if (destination.origin !== location.origin || (samePage && !studioAnchor)) return;
 event.preventDefault();
 if (navigationTimer) return;
 document.body.classList.add('leaving');
 navigationTimer=setTimeout(()=>{
  navigationTimer=null;
  location.assign(destination.href);
  if (samePage) document.body.classList.remove('leaving');
 },1000);
});
addEventListener('pageshow',()=>{clearTimeout(navigationTimer);navigationTimer=null;document.body.classList.remove('leaving');});
window.projectHref = project => 'project.html?id='+encodeURIComponent(project.id);
window.imageSources = src => {
 const meta=window.projectMedia[src];
 return src.replace('.jpg','-small.jpg')+' '+meta.smallWidth+'w, '+src+' '+meta.width+'w';
};
window.projectPicture = (project, sizes='(max-width: 680px) 90vw, 55vw') => {
 const image = document.createElement('img');
 image.srcset = window.imageSources(project.cover);
 image.sizes = sizes; image.alt = project.shortName + ' — ' + project.category.toLowerCase();
 const dimensions = window.projectMedia[project.cover];
 image.width = dimensions.width;
 image.height = dimensions.height;
 image.decoding = 'async';
 image.loading = 'lazy';
 image.src = project.cover; image.style.objectPosition = project.position;
 return image;
};
window.enableCardDepth = container => {
 if (!matchMedia('(pointer:fine) and (prefers-reduced-motion:no-preference)').matches) return;
 container.querySelectorAll('.depth-card').forEach(card => {
  card.addEventListener('pointermove',event=>{
   const box=card.getBoundingClientRect();
   const x=(event.clientX-box.left)/box.width-.5;
   const y=(event.clientY-box.top)/box.height-.5;
   card.style.setProperty('--rotate-x',(-y*3)+'deg');card.style.setProperty('--rotate-y',(x*4)+'deg');
  });
  card.addEventListener('pointerleave',()=>{card.style.removeProperty('--rotate-x');card.style.removeProperty('--rotate-y');});
 });
};

window.projectMetadata = (project, className = 'project-meta') => {
 const list = document.createElement('dl');
 list.className = className;
 const fields = [
  ['Built area', project.builtArea],
  ['Scope', project.scope],
  ['Location', project.location === project.name ? null : project.location],
  ['Year', project.year],
  ['Status', project.status === 'Ongoing on site' ? project.status : null]
 ];
 for (const [label, value] of fields) {
  if (value == null || String(value).trim() === '') continue;
  const item = document.createElement('div');
  const term = document.createElement('dt');
  const detail = document.createElement('dd');
  term.textContent = label;
  detail.textContent = value;
  item.append(term, detail);
  list.append(item);
 }
 return list;
};
