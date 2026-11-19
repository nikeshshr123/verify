/* ROAM content editor: Replace these demo entries with your own adventures.
  To embed a YouTube video, set youtubeId to the 11-character ID from its URL.
  Example: youtube.com/watch?v=XXXXXXXXXXX -> youtubeId: "XXXXXXXXXXX"
  Without an ID, the demo displays a preview and a YouTube discovery link.
  Use your own licensed images and update footer/contact details before publication. */
const films = [
  {id:"nepal-beyond-the-clouds",title:"Nepal, beyond the clouds",place:"NEPAL",category:"Nature",duration:"SAMPLE",date:"01",image:"https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1100&q=85&fit=crop",description:"A love letter to mountain roads, changing skies, and the art of slowing down.",youtubeId:"",search:"Nepal travel cinematic film"},
  {id:"tokyo-after-dark",title:"Tokyo after dark",place:"JAPAN",category:"City",duration:"SAMPLE",date:"02",image:"https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=1100&q=85&fit=crop",description:"Bright lights, quiet alleyways, and the magic of getting a little lost.",youtubeId:"",search:"Tokyo night cinematic travel vlog"},
  {id:"the-long-way-home",title:"The long way home",place:"ICELAND",category:"Nature",duration:"SAMPLE",date:"03",image:"https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1100&q=85&fit=crop",description:"Big landscapes, little roads, and not a single place we needed to be.",youtubeId:"",search:"Iceland cinematic travel film"},
  {id:"postcards-from-italy",title:"Postcards from Italy",place:"ITALY",category:"Slow",duration:"SAMPLE",date:"04",image:"https://images.unsplash.com/photo-1533105079780-92b9be482077?w=1100&q=85&fit=crop",description:"Slow mornings, good coffee, and afternoons that feel like forever.",youtubeId:"",search:"Italy slow travel cinematic vlog"},
  {id:"city-that-never-sleeps",title:"A city that never sleeps",place:"NEW YORK",category:"City",duration:"SAMPLE",date:"05",image:"https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1100&q=85&fit=crop",description:"One day, a thousand stories, and a million ways to see the city.",youtubeId:"",search:"New York travel cinematic video"},
  {id:"a-quieter-kind-of-adventure",title:"A quieter kind of adventure",place:"SWITZERLAND",category:"Slow",duration:"SAMPLE",date:"06",image:"https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1100&q=85&fit=crop",description:"Finding the beautiful in the still moments between destinations.",youtubeId:"",search:"Swiss Alps slow travel cinematic vlog"}
];
const grid=document.querySelector("#film-grid");
const search=document.querySelector("#search");
const filters=document.querySelector("#filters");
const empty=document.querySelector("#empty-state");
let activeFilter="All";
let saved=[];
try{const raw=JSON.parse(localStorage.getItem("roam-saved")||"[]");if(Array.isArray(raw))saved=raw.filter(x=>typeof x==="string")}catch(_){}
const escapeHTML=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
function renderFilms(){
  const q=search.value.trim().toLowerCase();
  const shown=films.filter(f=>(activeFilter==="All"||activeFilter==="Saved"&&saved.includes(f.id)||activeFilter===f.category)&&[f.title,f.place,f.category,f.description].join(" ").toLowerCase().includes(q));
  grid.innerHTML=shown.map(f=>'<article class="film-card"><a href="#watch/'+encodeURIComponent(f.id)+'" class="film-image" aria-label="Open '+escapeHTML(f.title)+'"><img loading="lazy" src="'+escapeHTML(f.image)+'" alt="'+escapeHTML(f.place)+' travel scenery"><span class="film-number">'+escapeHTML(f.date)+' / 06</span><span class="film-play" aria-hidden="true">▶</span><span class="film-length">'+escapeHTML(f.duration)+'</span></a><div class="film-details"><div class="film-kicker">'+escapeHTML(f.place)+' <span aria-hidden="true">/</span> '+escapeHTML(f.category.toUpperCase())+'</div><div class="film-heading"><h3><a href="#watch/'+encodeURIComponent(f.id)+'">'+escapeHTML(f.title)+'</a></h3><button type="button" class="save-btn '+(saved.includes(f.id)?"is-saved":"")+'" data-save="'+escapeHTML(f.id)+'" aria-label="'+(saved.includes(f.id)?"Remove saved":"Save")+' '+escapeHTML(f.title)+'" aria-pressed="'+saved.includes(f.id)+'">'+(saved.includes(f.id)?"♥":"♡")+'</button></div><p class="film-description">'+escapeHTML(f.description)+'</p></div></article>').join("");
  empty.hidden=shown.length!==0;document.querySelector("#results-count").textContent=shown.length+" "+(shown.length===1?"STORY":"STORIES")+" TO DISCOVER";
}
filters.addEventListener("click",e=>{const b=e.target.closest("[data-filter]");if(!b)return;activeFilter=b.dataset.filter;filters.querySelectorAll("button").forEach(x=>{x.classList.toggle("active",x===b);x.setAttribute("aria-pressed",String(x===b))});renderFilms()});
search.addEventListener("input",renderFilms);
grid.addEventListener("click",e=>{const button=e.target.closest("[data-save]");if(!button)return;const id=button.dataset.save;saved=saved.includes(id)?saved.filter(x=>x!==id):[...saved,id];try{localStorage.setItem("roam-saved",JSON.stringify(saved))}catch(_){}renderFilms()});
document.querySelector("#reset-search").addEventListener("click",()=>{search.value="";filters.querySelector('[data-filter="All"]').click()});
const overlay=document.querySelector("#video-modal");const player=document.querySelector("#player-shell");const close=document.querySelector("#modal-close");let previousFocus=null;
function showFilm(id){
 const film=films.find(f=>f.id===id);if(!film){location.hash="#films";return;}
 previousFocus=document.activeElement;
 document.querySelector("#modal-title").textContent=film.title;
 document.querySelector("#modal-kicker").textContent=film.place+" / "+film.category.toUpperCase();
 document.querySelector("#modal-description").textContent=film.description;
 document.querySelector("#modal-credit").textContent=film.youtubeId?"VIDEO EMBEDDED FROM YOUTUBE":"PREVIEW CONTENT — ADD YOUR OWN YOUTUBE VIDEO ID";
 const out=document.querySelector("#external-video");
 const youtubeSearch="https://www.youtube.com/results?search_query="+encodeURIComponent(film.search);
 if(/^[a-zA-Z0-9_-]{11}$/.test(film.youtubeId)){
  const frame=document.createElement("iframe");frame.src="https://www.youtube-nocookie.com/embed/"+film.youtubeId+"?autoplay=1";frame.title=film.title;frame.allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";frame.allowFullscreen=true;frame.referrerPolicy="strict-origin-when-cross-origin";player.replaceChildren(frame);
  out.href="https://www.youtube.com/watch?v="+encodeURIComponent(film.youtubeId);out.textContent="Open on YouTube ↗";out.hidden=false;
 }else{
  player.innerHTML='<div class="video-placeholder" style="background-image:url(&quot;'+escapeHTML(film.image)+'&quot;)"><div class="video-placeholder-content"><span class="preview-label">✳ SAMPLE STORY</span><h3>Your video goes here.</h3><p>This is a demo preview. Add your YouTube video ID in <strong>app.js</strong> to play it directly on this website.</p><a class="btn btn-accent" target="_blank" rel="noopener noreferrer" href="'+escapeHTML(youtubeSearch)+'">Explore travel films on YouTube ↗</a></div></div>';
  out.href=youtubeSearch;out.textContent="Discover videos on YouTube ↗";out.hidden=false;
 }
 overlay.hidden=false;document.body.style.overflow="hidden";close.focus();
}
function closeFilm(){if(overlay.hidden)return;overlay.hidden=true;player.replaceChildren();document.body.style.overflow="";if(location.hash.startsWith("#watch/"))history.replaceState(null,"","#films");previousFocus?.focus?.()}
function route(){const hash=decodeURIComponent(location.hash||"");if(hash.startsWith("#watch/"))showFilm(hash.slice(7));else if(!overlay.hidden)closeFilm()}
close.addEventListener("click",closeFilm);overlay.addEventListener("click",e=>{if(e.target===overlay)closeFilm()});document.addEventListener("keydown",e=>{if(e.key==="Escape")closeFilm();if(e.key==="Tab"&&!overlay.hidden){const focus=Array.from(overlay.querySelectorAll('button,a[href],iframe')).filter(x=>!x.hidden);if(!focus.length)return;const first=focus[0],last=focus[focus.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}});window.addEventListener("hashchange",route);
document.querySelector("#year").textContent=new Date().getFullYear();
const menu=document.querySelector("#menu-toggle"),nav=document.querySelector("#main-nav");menu.addEventListener("click",()=>{const open=nav.classList.toggle("open");menu.setAttribute("aria-expanded",String(open));menu.textContent=open?"✕":"☰"});nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{nav.classList.remove("open");menu.setAttribute("aria-expanded","false");menu.textContent="☰"}));
renderFilms();route();