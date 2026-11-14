const collection = document.querySelector('#project-grid');
let activeFilter='All';
let activeView='grid';
function renderCollection(){
 const matching=window.projects.filter(project=>activeFilter==='All'||project.category===activeFilter);
 collection.replaceChildren(...matching.map(project=>{
  const card=document.createElement('a');card.href=window.projectHref(project);card.className='archive-card depth-card';
  const media=document.createElement('span');media.className='archive-image';media.append(window.projectPicture(project,'(max-width: 680px) 94vw, 47vw'));
  const name=document.createElement('h2');name.textContent=project.shortName;
  const meta=document.createElement('p');meta.textContent=project.category+' · '+project.location;
  const arrow=document.createElement('span');arrow.className='archive-arrow';arrow.textContent='↗';arrow.setAttribute('aria-hidden','true');
  card.append(media,name,meta,arrow);return card;
 }));
 document.querySelector('#project-count').textContent=matching.length+' '+(matching.length===1?'project':'projects');
 collection.classList.toggle('index-view',activeView==='list');window.enableCardDepth(collection);
 if(!motionQuery.matches) collection.animate([{opacity:.3,transform:'translateY(12px)'},{opacity:1,transform:'translateY(0)'}],{duration:380,easing:'ease-out'});
}
document.querySelectorAll('[data-filter]').forEach(button=>{
 button.addEventListener('click',()=>{
  activeFilter=button.dataset.filter;
  document.querySelectorAll('[data-filter]').forEach(item=>item.setAttribute('aria-pressed',String(item===button)));
  renderCollection();
 });
});
document.querySelectorAll('[data-view]').forEach(button=>{
 button.addEventListener('click',()=>{
  activeView=button.dataset.view;
  document.querySelectorAll('[data-view]').forEach(item=>item.setAttribute('aria-pressed',String(item===button)));
  renderCollection();
 });
});
renderCollection();
