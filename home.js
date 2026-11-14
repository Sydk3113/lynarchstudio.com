const heroProjects = ['studio-dvour','hobarts-school','casa-aurum'].map(id=>window.projects.find(project=>project.id===id));
const heroImages = document.querySelectorAll('.hero-image');
let activeHero = 0;
document.querySelectorAll('[data-slide]').forEach(button => {
 button.addEventListener('click',()=>{
  const index=Number(button.dataset.slide);
  if(index===activeHero) return;
  const project=heroProjects[index];
  const image=heroImages[index];
  if(!image.getAttribute('src')) image.src=image.dataset.src;
  image.classList.add('active');heroImages[activeHero].classList.remove('active');activeHero=index;
  document.querySelector('#hero-project').href=window.projectHref(project);
  document.querySelector('#hero-project-name').textContent=project.shortName;
  document.querySelector('#hero-project-type').textContent=project.scope+' · '+project.location;
  document.querySelectorAll('[data-slide]').forEach(item=>item.setAttribute('aria-pressed',String(item===button)));
 });
});
const selected=['voora-villa','don-bosco-villa','dac-704','studio-dvour','hobarts-school','prestige-bella','casa-aurum'];
const rail=document.querySelector('#work-rail');
selected.forEach(id=>{
 const project=window.projects.find(item=>item.id===id);
 const card=document.createElement('a');
 card.href=window.projectHref(project);card.className='rail-card depth-card';
 const media=document.createElement('span');media.className='rail-image';media.append(window.projectPicture(project));
 const title=document.createElement('h3');title.textContent=project.shortName;
 const meta=document.createElement('p');meta.textContent=project.category+' / '+project.location;
 const arrow=document.createElement('span');arrow.className='card-arrow';arrow.setAttribute('aria-hidden','true');arrow.classList.add('arrow-ne');
 card.append(media,title,meta,arrow);rail.append(card);
});
window.enableCardDepth(rail);
const previous=document.querySelector('#rail-prev');
const next=document.querySelector('#rail-next');
function updateRail(){
 const max=rail.scrollWidth-rail.clientWidth;
 const fraction=max>0?rail.scrollLeft/max:0;
 document.querySelector('#rail-progress').style.transform='translateX('+Math.max(0,Math.min(1,fraction))*200+'%)';
 previous.disabled=rail.scrollLeft<8;next.disabled=rail.scrollLeft>=max-8;
}
function moveRail(direction){
 const card=rail.querySelector('.rail-card');
 rail.scrollBy({left:direction*(card.getBoundingClientRect().width+32),behavior:motionQuery.matches?'instant':'smooth'});
}
previous.addEventListener('click',()=>moveRail(-1));next.addEventListener('click',()=>moveRail(1));
rail.addEventListener('scroll',updateRail,{passive:true});
rail.addEventListener('keydown',event=>{
 if(event.target!==rail || !['ArrowLeft','ArrowRight'].includes(event.key)) return;
 event.preventDefault();moveRail(event.key==='ArrowRight'?1:-1);
});
addEventListener('resize',updateRail);updateRail();
const stages=[
 ['media/hobarts-school/8.jpg','Courtyard in the Hobarts School design','Hobarts School · Courtyard study'],
 ['media/prestige-bella/1.jpg','Bedroom design at Prestige Bella Vista','Prestige Bella Vista · Design visualization'],
 ['media/casa-aurum/cover.jpg','Kitchen at Casa Aurum','Casa Aurum · Material and storage detailing'],
 ['media/studio-dvour/16.jpg','A person working in Studio D’vour','Studio D’vour · Completed interior']
];
const details=document.querySelectorAll('[data-process]');
details.forEach(detail=>{
 detail.addEventListener('toggle',()=>{
  if(!detail.open) return;
  details.forEach(other=>{if(other!==detail) other.open=false;});
  const [src,alt,caption]=stages[Number(detail.dataset.process)];
  const image=document.querySelector('#process-photo');image.src=src;image.alt=alt;
  document.querySelector('#process-caption').textContent=caption;
  if(!motionQuery.matches) image.animate([{opacity:.25,transform:'scale(1.035)'},{opacity:1,transform:'scale(1)'}],{duration:550,easing:'ease-out'});
 });
});
