// General scripts for search, filter, and download modal
document.addEventListener('DOMContentLoaded', function () {
  // year in footer
  const y = document.getElementById('year');
  if(y) y.textContent = new Date().getFullYear();

  // Search + filter (works on index)
  const searchInput = document.getElementById('searchInput');
  const grid = document.getElementById('cardGrid');
  const filterButtons = document.querySelectorAll('.filters button');

  function filterCards(query='', type='all'){
    if(!grid) return;
    const cards = Array.from(grid.querySelectorAll('.card'));
    cards.forEach(card=>{
      const title = (card.querySelector('h3')?.textContent || '').toLowerCase();
      const desc = (card.querySelector('p')?.textContent || '').toLowerCase();
      const matchesQuery = !query || title.includes(query) || desc.includes(query);
      const matchesType = (type === 'all') || (card.dataset.type === type);
      card.style.display = (matchesQuery && matchesType) ? 'block' : 'none';
    });
  }

  if(searchInput){
    searchInput.addEventListener('input', (e)=> {
      const q = e.target.value.trim().toLowerCase();
      const activeFilter = document.querySelector('.filters button.active')?.dataset.filter || 'all';
      filterCards(q, activeFilter);
    });
  }

  filterButtons.forEach(btn=>{
    btn.addEventListener('click', ()=>{
      filterButtons.forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      const q = searchInput?.value.trim().toLowerCase() || '';
      filterCards(q, btn.dataset.filter);
    })
  });

  // Download modal
  const modal = document.getElementById('downloadModal');
  const modalLink = document.getElementById('modalLink') || document.getElementById('modalLink2') || document.getElementById('modalLink3');
  const modalTitle = document.getElementById('modalTitle') || document.getElementById('modalTitle2') || document.getElementById('modalTitle3');

  function openModal(fileUrl, titleText){
    const m = document.getElementById('downloadModal');
    if(!m) return;
    m.classList.add('show');
    m.querySelector('.big-download').href = fileUrl;
    const t = m.querySelector('h2');
    if(t) t.textContent = titleText || 'Download';
    // start download by opening link in new tab (browser will handle)
    setTimeout(()=> window.open(fileUrl, '_blank', 'noopener'), 600);
  }

  function closeModal(modalEl){
    modalEl.classList.remove('show');
  }

  document.querySelectorAll('.download-btn').forEach(btn=>{
    btn.addEventListener('click', (e)=>{
      const file = btn.dataset.file || '#';
      const title = btn.closest('.card')?.querySelector('h3')?.textContent || 'Download';
      // Find closest modal on page
      const pageModal = btn.closest('body').querySelector('#downloadModal');
      if(pageModal){
        pageModal.classList.add('show');
        pageModal.querySelector('.big-download').href = file;
        pageModal.querySelector('h2').textContent = title;
        // try to open in new tab
        setTimeout(()=> window.open(file, '_blank', 'noopener'), 600);
      } else {
        window.open(file, '_blank', 'noopener');
      }
    });
  });

  // modal close buttons
  document.querySelectorAll('.modal .close-btn').forEach(c=>{
    c.addEventListener('click', ()=>{
      const m = c.closest('.modal');
      if(m) m.classList.remove('show');
    })
  });

  // Click outside modal-content to close
  document.querySelectorAll('.modal').forEach(m=>{
    m.addEventListener('click', (e)=>{
      if(e.target === m) m.classList.remove('show');
    })
  });
});
