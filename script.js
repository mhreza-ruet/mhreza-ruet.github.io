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
})();
