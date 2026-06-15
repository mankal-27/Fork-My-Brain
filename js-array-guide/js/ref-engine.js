// Shared reference engine — paste into each reference.html <script> block

function safeText(s) {
  const d = document.createElement('div');
  d.textContent = String(s ?? '');
  return d.innerHTML;
}

let activeCat = 'all', openSet = new Set();

function renderRef() {
  const q = document.getElementById('q').value.toLowerCase();
  const filtered = METHODS.filter(m => {
    const cm = activeCat === 'all' || m.cat === activeCat;
    const qm = !q || m.name.toLowerCase().includes(q) ||
      m.summary.toLowerCase().includes(q) || m.desc.toLowerCase().includes(q);
    return cm && qm;
  });
  document.getElementById('count').textContent =
    `${filtered.length} method${filtered.length !== 1 ? 's' : ''}`;
  document.getElementById('list').innerHTML = filtered.map(m => {
    const open = openSet.has(m.name);
    const esc = m.code.replace(/</g,'&lt;').replace(/>/g,'&gt;');
    return `<div class="method-card">
      <div class="method-header" data-name="${safeText(m.name)}">
        <span class="method-name">${safeText(m.name)}</span>
        <span class="method-badge ${BADGE[m.cat] || 'other'}">${safeText(m.cat)}</span>
        <span class="method-summary">${safeText(m.summary)}</span>
        <span class="method-chevron${open ? ' open' : ''}">▾</span>
      </div>
      ${open ? `<div class="method-body">
        <p class="method-desc">${safeText(m.desc)}</p>
        <div class="method-example">${esc}</div>
        <p class="method-tip">💡 ${safeText(m.tip)}</p>
      </div>` : ''}
    </div>`;
  }).join('');
}

function toggleMethod(name) {
  if (openSet.has(name)) openSet.delete(name); else openSet.add(name);
  renderRef();
}

// Filter pills — built dynamically
function buildFilters(cats) {
  const el = document.getElementById('filters');
  cats.forEach(c => {
    const btn = document.createElement('button');
    btn.className = 'ref-pill' + (c.key === 'all' ? ' active' : '');
    btn.textContent = c.label;
    btn.dataset.cat = c.key;
    el.appendChild(btn);
  });
}

// Event delegation — single listener on document
document.addEventListener('click', function(e) {
  const header = e.target.closest('.method-header[data-name]');
  if (header) { toggleMethod(header.dataset.name); return; }
  const pill = e.target.closest('.ref-pill[data-cat]');
  if (pill) {
    activeCat = pill.dataset.cat;
    document.querySelectorAll('.ref-pill').forEach(p => p.classList.remove('active'));
    pill.classList.add('active');
    renderRef();
  }
});
