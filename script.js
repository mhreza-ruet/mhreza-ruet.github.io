// Theme + projects loader + small UX niceties
(function(){
  const root = document.documentElement;
  const btn = document.getElementById('themeToggle');
  const saved = localStorage.getItem('theme');
  if(saved) root.className = saved;
  btn?.addEventListener('click', () => {
    const next = root.classList.contains('light') ? '' : 'light';
    root.className = next;
    if(next) localStorage.setItem('theme', 'light'); else localStorage.removeItem('theme');
  });
  document.getElementById('year').textContent = new Date().getFullYear();

  fetch('projects.json', { cache: 'no-store' })
    .then(r => r.json())
    .then(items => {
      const grid = document.getElementById('projectGrid');
      if(!grid) return;
      const frag = document.createDocumentFragment();
      items.forEach(p => {
        const card = document.createElement('article');
        card.className = 'card';
        card.innerHTML = `
          <img src="${p.image || 'assets/placeholder.svg'}" alt="${p.title} thumbnail">
          <div class="title">${p.title}</div>
          <div class="desc">${p.description}</div>
          <div class="tags">${(p.tags||[]).map(t=>`<span class="tag">${t}</span>`).join(' ')}</div>
          <div class="links">
            ${p.demo ? `<a href="${p.demo}">Demo</a>` : ''}
            ${p.code ? `<a href="${p.code}">Code</a>` : ''}
            ${p.paper ? `<a href="${p.paper}">Paper</a>` : ''}
          </div>
        `;
        frag.appendChild(card);
      });
      grid.appendChild(frag);
    })
    .catch(()=>{});

  const lifeCards = document.querySelectorAll('.life-card:not(.life-card--empty)');
  if(lifeCards.length){
    const overlay = document.createElement('div');
    overlay.className = 'lightbox';
    overlay.innerHTML = `
      <div class="lightbox__inner">
        <button class="lightbox__close" type="button"><span>Close</span></button>
        <img alt="" />
      </div>
    `;
    document.body.appendChild(overlay);
    const overlayImg = overlay.querySelector('img');
    const closeBtn = overlay.querySelector('.lightbox__close');

    const close = () => {
      overlay.classList.remove('is-open');
      document.body.classList.remove('lightbox-open');
      overlayImg.removeAttribute('src');
    };

    const open = (src, alt) => {
      overlayImg.src = src;
      overlayImg.alt = alt;
      overlay.classList.add('is-open');
      document.body.classList.add('lightbox-open');
    };

    lifeCards.forEach(card => {
      card.setAttribute('tabindex', '0');
      card.addEventListener('click', () => {
        const src = card.dataset.full || card.querySelector('img')?.src;
        if(!src) return;
        const alt = card.dataset.alt || card.querySelector('img')?.alt || '';
        open(src, alt);
      });
      card.addEventListener('keydown', evt => {
        if(evt.key === 'Enter' || evt.key === ' '){
          evt.preventDefault();
          card.click();
        }
      });
    });

    closeBtn.addEventListener('click', close);
    overlay.addEventListener('click', evt => {
      if(evt.target === overlay) close();
    });
    document.addEventListener('keydown', evt => {
      if(evt.key === 'Escape' && overlay.classList.contains('is-open')) close();
    });
  }
})();
