const $ = (selector) => document.querySelector(selector);
const esc = (value = '') => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const safeURL = value => /^(https?:\/\/|mailto:)/i.test(value || '') ? esc(value) : '';
const date = value => value ? new Date(value + 'T12:00:00').toLocaleDateString(language === 'zh' ? 'zh-CN' : 'en-GB', {day:'numeric',month:'short',year:'numeric'}) : '';
const link = (url, label) => safeURL(url) ? `<a class="text-link" href="${safeURL(url)}" target="_blank" rel="noopener noreferrer">${esc(label)} ↗</a>` : '';
const empty = text => `<div class="empty-state">${text}</div>`;
const heading = (eyebrow, title, subtitle) => `<section class="page-heading"><p class="eyebrow">${eyebrow}</p><h1>${title}</h1><p>${subtitle}</p></section>`;
const imageCard = (item, target, large = false) => `<a class="image-card ${large ? 'hero-card' : ''}" href="#${target}"><img src="${esc(item.image)}" alt="" ${large ? 'fetchpriority="high"' : 'loading="lazy"'}><div class="image-shade"></div><div class="card-content"><div class="card-meta"><span>${esc(item.category)}</span>${item.date ? `<time datetime="${esc(item.date)}">${date(item.date)}</time>` : ''}</div><h${large ? '1' : '3'}>${esc(item.title)}</h${large ? '1' : '3'}>${large ? `<p>${esc(item.text)}</p>` : ''}</div><span class="card-arrow" aria-hidden="true">↗</span></a>`;
function peopleGroups() { return [
  {title:'Lab Director', label:'Lab Director', members:LAB.director},
  {title:'Principal Investigators', label:'Principal Investigator', members:LAB.pis},
  {title:'Postdoctoral Researchers / Research Fellows', label:'Postdoctoral Researchers / Research Fellows', members:LAB.fellows}
]; }
function memberCards(members) { return '<div class="pi-grid">' + members.map(p => `<article class="pi-card"><a class="portrait-link" href="#people/${esc(p.id)}" aria-label="View ${esc(p.name)}’s profile">${p.photo ? `<img class="portrait ${esc(p.photoClass || '')}" src="${esc(p.photo)}" alt="Portrait of ${esc(p.name)}">` : '<div class="portrait placeholder">PI photo<br><small>To be added</small></div>'}</a><div><p class="eyebrow">${esc(p.role)}</p><h3><a href="#people/${esc(p.id)}">${esc(p.name)}</a></h3>${p.bio ? `<p>${esc(p.bio)}</p>` : ''}<a class="text-link" href="#people/${esc(p.id)}">View profile →</a></div></article>`).join('') + '</div>'; }
function memberList(title, members) { return `<section><h2 class="subheading">${esc(title)}</h2>${members.length ? `<div class="student-grid">${members.map(s=>`<article><h3>${esc(s.name)}</h3>${s.degree ? `<p class="blue">${esc(s.degree)}</p>` : ''}${s.topic ? `<p>${esc(s.topic)}</p>` : ''}</article>`).join('')}</div>` : empty('Member list to be added.')}</section>`; }
const pages = {
  home: () => `<section class="home-overview"><p>${esc(LAB.tagline)}</p><a href="#about">Meet the lab ↗</a></section>${imageCard(LAB.headline, LAB.headline.target, true)}<section class="news-section"><div class="section-heading"><div><p class="eyebrow">FROM THE LAB</p><h2>News & highlights</h2></div><span class="muted">Research, people, and progress</span></div><div class="news-grid">${LAB.news.map((item, i) => imageCard(item, `news/${i}`)).join('')}</div><p class="preview-note">Website preview · Illustrative artwork and sample news will be replaced with lab photographs and updates.</p></section>`,
  about: () => `${heading('ABOUT CDIFLAB', 'Curiosity, with a flight plan.', esc(LAB.about))}<div class="research-grid">${LAB.research.map((r,i) => `<article class="research-item"><span class="number">0${i+1}</span><h2>${esc(r.title)}</h2><p>${esc(r.text)}</p></article>`).join('')}</div><div class="callout"><h2>People behind the research</h2><a class="button" href="#people">Meet our group ↗</a></div>`,
  people: () => heading('OUR GROUP', 'People', 'Faculty, researchers, students, and alumni of CDIFLab.') + peopleGroups().map(g => `<section><h2 class="subheading">${esc(g.title)}</h2>${memberCards(g.members)}</section>`).join('') + memberList('Postgraduate Students', LAB.students) + memberList('Undergraduate Students', LAB.undergraduates) + memberList('Alumni', LAB.alumni),
  publications: () => `${heading('RESEARCH OUTPUT', 'Publications', 'Journal articles and conference papers, organised by year.')}${LAB.publications.length ? [...new Set(LAB.publications.map(p=>p.year))].sort((a,b)=>b-a).map(y=>`<section class="publication-year"><h2>${esc(y)}</h2><div>${LAB.publications.filter(p=>p.year===y).map(p=>`<article class="paper"><h3>${esc(p.title)}</h3><p>${esc(p.authors)}</p><p><em>${esc(p.venue)}</em></p><div class="paper-links">${link(p.url,'Paper')}${link(p.code,'Code')}</div></article>`).join('')}</div></section>`).join('') : empty('The publication list is being prepared. Verified citations and paper links will appear here.')}`,
  projects: () => `${heading('IDEAS IN FLIGHT', 'Featured projects', 'Research questions and the engineering that brings them into the air.')}<div class="filters" aria-label="Filter projects">${['All','Research','Engineering'].map((f,i)=>`<button data-filter="${f}" aria-pressed="${i===0}">${f}</button>`).join('')}</div><div class="project-grid">${LAB.projects.map(p=>`<article class="project" data-type="${esc(p.type)}"><img src="${esc(p.image)}" alt="" loading="lazy"><div><p class="eyebrow">${esc(p.type)}${p.sample?' · SAMPLE PROJECT':''}</p><h2>${esc(p.title)}</h2><p>${esc(p.description)}</p>${link(p.url,'Explore project')}</div></article>`).join('')}</div>`,
  resources: () => `${heading('OPEN RESEARCH', 'Codes & datasets', 'Software, datasets, and reproducible tools from our research.')}<div class="resource-list">${LAB.resources.length ? LAB.resources.map(r=>`<article class="resource"><p class="eyebrow">${esc(r.type)}</p><h2>${esc(r.title)}</h2><p>${esc(r.description)}</p><p>${esc(r.license)}</p>${link(r.url,'View resource')}</article>`).join('') : empty('Public repositories and datasets will be listed here as they become available.')}</div>`,
  jobs: () => `${heading('JOIN CDIFLAB', 'Build what flies next.', 'Opportunities to contribute to intelligent aerial robotics.')}${LAB.jobs.length ? LAB.jobs.map(j=>`<article class="resource"><h2>${esc(j.title)}</h2><p>${esc(j.description)}</p>${link(j.url,'Application details')}</article>`).join('') : empty('Recruitment details have not yet been posted. Please check back for confirmed positions and application instructions.')}<a class="button" href="#contact">Contact the lab ↗</a>`,
  contact: () => `${heading('GET IN TOUCH', 'Contact', 'Cross-Domain Intelligent Flight Lab')}<div class="contact-grid"><div><p class="eyebrow">FIND US</p><h2>${esc(LAB.university)}</h2><p>${esc(LAB.contact.address)}</p><p class="muted">${esc(LAB.contact.details)}</p></div><div><p class="eyebrow">EMAIL</p>${LAB.contact.email ? `<a class="contact-email" href="mailto:${esc(LAB.contact.email)}">${esc(LAB.contact.email)}</a>` : '<p>Lab email to be added.</p>'}<p class="eyebrow social-heading">FOLLOW OUR WORK</p>${socialMarkup()}</div></div>`
};
function socialMarkup() { return ['github','youtube'].map(key => LAB.social[key] && safeURL(LAB.social[key]) ? link(LAB.social[key],key==='github'?'GitHub':'YouTube') : `<span class="social-pending">${key==='github'?'GitHub':'YouTube'} <small>Coming soon</small></span>`).join(''); }
function profilePage(p) {
  return `<article class="profile-page"><a class="text-link" href="#people">← All people</a><div class="profile-layout"><img class="portrait ${esc(p.photoClass || '')}" src="${esc(p.photo)}" alt="Portrait of ${esc(p.name)}"><div><p class="eyebrow">${esc(peopleGroups().find(g => g.members.includes(p)).label)}</p><h1>${esc(p.name)}</h1><p class="profile-role">${esc(p.role)}</p><p>${esc(LAB.name)}<br>${esc(LAB.university)}</p>${p.bio ? `<section><h2>Biography</h2><p>${esc(p.bio)}</p></section>` : ''}${link(p.url,'University profile')}</div></div></article>`;
}
function render() {
  const route = location.hash.slice(1) || 'home';
  const profileMatch = /^people\/([a-z0-9-]+)$/.exec(route);
  const person = profileMatch && peopleGroups().flatMap(g => g.members).find(p => p.id === profileMatch[1]);
  const match = /^news\/(\d+)$/.exec(route);
  const item = match && LAB.news[Number(match[1])];
  $('#main').innerHTML = person ? profilePage(person) : item ? `<article class="news-detail"><a class="text-link" href="#home">← All highlights</a>${heading(esc(item.category),esc(item.title),date(item.date))}<img src="${esc(item.image)}" alt="Illustrative artwork"><p class="article-text">${esc(item.text)}</p></article>` : pages[route] ? pages[route]() : `${heading('PAGE NOT FOUND','Let’s get you back on course.','This page does not exist.')}<a class="button" href="#home">Return home</a>`;
  document.title = `${translate(person ? person.name : item ? item.title : ({home:LAB.shortName,about:'About',people:'People',publications:'Publications',projects:'Featured projects',resources:'Codes & datasets',jobs:'Jobs',contact:'Contact'}[route] || 'Page not found'))} · ${translate(LAB.name)}`;
  document.querySelectorAll('nav > a, .home-link').forEach(a => { if (a.hash === `#${person ? 'people' : route}`) a.setAttribute('aria-current','page'); else a.removeAttribute('aria-current'); });
  $('.menu-toggle').setAttribute('aria-expanded','false');
  $('#navigation').classList.remove('is-open');
  $('.follow').open = false;
  document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
    document.querySelectorAll('[data-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
    document.querySelectorAll('[data-type]').forEach(p=>p.hidden=button.dataset.filter!=='All' && p.dataset.type!==button.dataset.filter);
  }));
  localizePage();
  window.scrollTo(0,0);
}
$('#social-links').innerHTML = socialMarkup();
$('#year').textContent = new Date().getFullYear();
$('.skip-link').addEventListener('click', e => { e.preventDefault(); $('#main').focus(); $('#main').scrollIntoView(); });
$('.menu-toggle').addEventListener('click', () => { const open = $('.menu-toggle').getAttribute('aria-expanded')!=='true'; $('.menu-toggle').setAttribute('aria-expanded',String(open)); $('#navigation').classList.toggle('is-open',open); });
document.addEventListener('keydown', e => { if(e.key==='Escape') { $('.follow').open=false; $('#navigation').classList.remove('is-open'); $('.menu-toggle').setAttribute('aria-expanded','false'); } });
document.addEventListener('click', e=>{ if(!e.target.closest('.follow')) $('.follow').open=false; });
document.querySelectorAll('[data-language]').forEach(button => button.addEventListener('click', () => {
  if (language === button.dataset.language) return;
  const scrollPosition = window.scrollY;
  const activeFilter = document.querySelector('[data-filter][aria-pressed="true"]')?.dataset.filter;
  language = button.dataset.language;
  try { localStorage.setItem('cdiflab-language', language); } catch (_) {}
  render();
  if (activeFilter) document.querySelector(`[data-filter="${activeFilter}"]`)?.click();
  window.scrollTo(0, scrollPosition);
}));
window.addEventListener('hashchange',()=>{render();$('#main').focus({preventScroll:true});});
render();
