// Casa Aurum plays inline in its own homepage story, below the studio sections.
(() => {
 const video = document.querySelector('#casa-inline-video');
 const play = document.querySelector('#film-play');
 const sound = document.querySelector('#film-sound');
 const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
 const connection = navigator.connection;
 let visible = false;
 let userPaused = false;
 let userStarted = false;
 if (!video || !play || !sound) return;
 video.muted = true;
 document.querySelector('.film-story-actions').hidden = false;
 const modalOpen = () => Boolean(document.querySelector('dialog[open]'));
 const automatic = () => !reducedMotion.matches && !connection?.saveData;
 function sync() {
  play.textContent = video.paused ? 'Play film' : 'Pause film';
  play.setAttribute('aria-label', `${video.paused ? 'Play' : 'Pause'} Casa Aurum film`);
  sound.setAttribute('aria-pressed', String(!video.muted));
  sound.querySelector('[data-sound-label]').textContent = video.muted ? 'Turn sound on' : 'Mute sound';
 }
 function start() { video.play().catch(sync); }
 function update() {
  if (!visible || document.hidden || modalOpen()) {
   video.pause();
   if (!visible) video.muted = true;
  } else if (!userPaused && (userStarted || automatic())) start();
  else video.pause();
 }
 play.addEventListener('click', () => {
  if (video.paused) { userPaused = false; userStarted = true; start(); }
  else { userPaused = true; video.pause(); }
 });
 sound.addEventListener('click', () => {
  video.muted = !video.muted;
  if (!video.muted && video.paused) {
   userPaused = false; userStarted = true; start();
  }
  sync();
 });
 video.addEventListener('play', () => { userPaused = false; userStarted = true; sync(); });
 video.addEventListener('pause', () => {
  if (visible && !document.hidden && !modalOpen()) userPaused = true;
  sync();
 });
 video.addEventListener('volumechange', sync);
 new IntersectionObserver(entries => {
  visible = entries[0].isIntersecting;
  update();
 }, { threshold: .2 }).observe(video);
 document.addEventListener('visibilitychange', update);
 document.querySelectorAll('dialog').forEach(dialog => {
  new MutationObserver(update).observe(dialog, { attributes: true, attributeFilter: ['open'] });
 });
 reducedMotion.addEventListener('change', () => { userStarted = false; update(); });
 connection?.addEventListener('change', () => { userStarted = false; update(); });
 sync();
})();
