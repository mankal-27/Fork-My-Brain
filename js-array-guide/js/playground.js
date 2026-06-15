let activeScenario = 0, activeStep = 0;

function safeText(s) {
  const d = document.createElement('div');
  d.textContent = String(s ?? '');
  return d.innerHTML;
}

function getScenarioFromURL() {
  const s = new URLSearchParams(location.search).get('s');
  if (s) { const i = SCENARIOS.findIndex(x => x.id === s); if (i !== -1) return i; }
  return 0;
}

function buildNav() {
  document.getElementById('pg-nav').innerHTML = SCENARIOS.map((s, i) =>
    `<button class="pg-nav-btn${i === activeScenario ? ' active' : ''}" data-idx="${i}">
      <span class="pg-nav-icon">${s.icon}</span>
      <span>${safeText(s.label)}</span>
    </button>`
  ).join('');
}

function selectScenario(i) {
  activeScenario = i; activeStep = 0;
  buildNav(); renderScene(false);
  const u = new URL(location); u.searchParams.set('s', SCENARIOS[i].id);
  history.replaceState({}, '', u);
}

function hl(code) {
  return code
    .replace(/</g,'&lt;').replace(/>/g,'&gt;')
    .replace(/\/\/.*/g, m => `<span class="c-comment">${m}</span>`)
    .replace(/\b(const|let|var|return|new|function|async|await|try|catch|finally|if|else|throw)\b/g,
      m => `<span class="c-kw">${m}</span>`)
    .replace(/\b(push|pop|shift|unshift|splice|slice|sort|reverse|filter|map|reduce|find|findIndex|findLast|findLastIndex|at|includes|indexOf|lastIndexOf|every|some|flat|flatMap|concat|forEach|join|with|toSorted|toReversed|toSpliced|trim|trimStart|trimEnd|toLowerCase|toUpperCase|replace|replaceAll|split|includes|startsWith|endsWith|padStart|padEnd|repeat|slice|substring|charAt|charCodeAt|match|matchAll|search|normalize|localeCompare|Promise|fetch|resolve|reject|all|allSettled|race|any|then|catch|finally)\b(?=[\s(.])/g,
      m => `<span class="c-method">${m}</span>`)
    .replace(/'([^']*)'/g, m => `<span class="c-str">${m}</span>`)
    .replace(/`([^`]*)`/g, m => `<span class="c-str">${m}</span>`)
    .replace(/\b(\d+)\b/g, m => `<span class="c-num">${m}</span>`);
}

function renderItem(item, isNew) {
  const sc = SCENARIOS[activeScenario], step = sc.steps[activeStep];
  const isHL = step.highlight && step.highlight.includes(item.n);
  const cls = ['item',
    item.dim ? 'dim' : '',
    item.fail ? 'fail' : '',
    (isHL && !item.dim && !item.fail) ? 'highlight' : '',
    isNew ? 'pop-in' : ''
  ].filter(Boolean).join(' ');
  return `<div class="${cls}">
    <span class="iname">${safeText(item.n)}</span>
    ${item.s ? `<span class="isub">${safeText(item.s)}</span>` : ''}
  </div>`;
}

function renderScene(animate) {
  const sc = SCENARIOS[activeScenario], step = sc.steps[activeStep];
  const total = sc.steps.length;
  const pct = ((activeStep + 1) / total * 100).toFixed(1);

  let itemsHTML = step.items && step.items.length
    ? step.items.map(item => renderItem(item,
        animate && step.newItems && step.newItems.includes(item.n)
      )).join('')
    : `<span style="font-size:13px;color:var(--text3);font-style:italic;font-family:var(--mono)">[]</span>`;

  let resultHTML = '';
  if (step.resultItems && step.resultItems.length) {
    resultHTML = `<div class="stage-row" style="margin-top:8px;border-top:0.5px solid var(--border);padding-top:10px">
      <span class="stage-label" style="color:var(--teal)">result</span>
      ${step.resultItems.map(it =>
        `<div class="item result"><span class="iname">${safeText(it.n)}</span>${it.s ? `<span class="isub">${safeText(it.s)}</span>` : ''}</div>`
      ).join('')}
    </div>`;
  }
  let badgeHTML = step.totalBadge
    ? `<div class="total-badge">${safeText(step.totalBadge)}</div>` : '';

  document.getElementById('pg-main').innerHTML = `
    <div class="pg-scene-header">
      <div class="pg-scene-title">${sc.icon} ${safeText(sc.title)}</div>
      <div class="pg-scene-sub">${safeText(sc.sub)}</div>
    </div>
    <div class="progress-bar"><div class="progress-fill" style="width:${pct}%"></div></div>
    <div class="code-block">${hl(step.code)}</div>
    <div class="stage">
      <div class="stage-row">
        <span class="stage-label">array</span>
        ${itemsHTML}
      </div>
      ${resultHTML}${badgeHTML}
    </div>
    <div class="explanation">${safeText(step.explain)}</div>
    <div class="result-output">// ${safeText(step.result)}</div>
    <div class="step-controls">
      <button class="step-btn" data-action="prev" ${activeStep === 0 ? 'disabled' : ''}>← Prev</button>
      <button class="step-btn" data-action="next" ${activeStep === total - 1 ? 'disabled' : ''}>Next →</button>
      <span class="step-pill">${activeStep + 1} / ${total}</span>
      <span class="step-name">${safeText(step.label)}</span>
    </div>`;
}

function nextStep() { const sc = SCENARIOS[activeScenario]; if (activeStep < sc.steps.length - 1) { activeStep++; renderScene(true); } }
function prevStep() { if (activeStep > 0) { activeStep--; renderScene(false); } }

// Event delegation — no inline onclick anywhere
document.addEventListener('click', function(e) {
  const navBtn = e.target.closest('[data-idx]');
  if (navBtn) { selectScenario(Number(navBtn.dataset.idx)); return; }
  const stepBtn = e.target.closest('[data-action]');
  if (stepBtn && !stepBtn.disabled) {
    if (stepBtn.dataset.action === 'next') nextStep();
    if (stepBtn.dataset.action === 'prev') prevStep();
  }
});

document.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight') nextStep();
  if (e.key === 'ArrowLeft') prevStep();
});

activeScenario = getScenarioFromURL();
buildNav();
renderScene(false);
