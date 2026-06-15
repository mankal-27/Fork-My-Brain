let activeScenario = 0;
let activeStep = 0;

function getScenarioFromURL() {
  const params = new URLSearchParams(window.location.search);
  const s = params.get('s');
  if (s) {
    const idx = SCENARIOS.findIndex(sc => sc.id === s);
    if (idx !== -1) return idx;
  }
  return 0;
}

function buildNav() {
  const nav = document.getElementById('pg-nav');
  nav.innerHTML = SCENARIOS.map((s, i) => `
    <button class="pg-nav-btn${i === activeScenario ? ' active' : ''}" onclick="selectScenario(${i})">
      <span class="pg-nav-icon">${s.icon}</span>
      <span>${s.label}</span>
    </button>
  `).join('');
}

function selectScenario(i) {
  activeScenario = i;
  activeStep = 0;
  buildNav();
  renderScene(false);
  const url = new URL(window.location);
  url.searchParams.set('s', SCENARIOS[i].id);
  window.history.replaceState({}, '', url);
}

function renderItem(item, isNew) {
  const classes = ['item'];
  if (item.dim) classes.push('dim');
  if (item.fail) classes.push('fail');
  const step = SCENARIOS[activeScenario].steps[activeStep];
  const isHighlight = step.highlight && step.highlight.includes(item.n);
  if (isHighlight && !item.dim && !item.fail) classes.push('highlight');
  if (isNew) classes.push('pop-in');
  return `<div class="${classes.join(' ')}">
    <span class="iname">${item.n}</span>
    ${item.s ? `<span class="isub">${item.s}</span>` : ''}
  </div>`;
}

function syntaxHL(code) {
  return code
    .replace(/\/\/.*/g, m => `<span class="c-comment">${m}</span>`)
    .replace(/\b(const|let|var|return|new|function|=&gt;)\b/g, m => `<span class="c-kw">${m}</span>`)
    .replace(/\b(push|pop|shift|unshift|splice|slice|sort|reverse|filter|map|reduce|find|findIndex|at|includes|indexOf|every|some|flat|flatMap|concat|forEach|join|with|toSorted|toReversed)\b(?=\()/g, m => `<span class="c-method">${m}</span>`)
    .replace(/'([^']*)'/g, m => `<span class="c-str">${m}</span>`)
    .replace(/\b(\d+)\b/g, m => `<span class="c-num">${m}</span>`);
}

function renderScene(animate) {
  const sc = SCENARIOS[activeScenario];
  const step = sc.steps[activeStep];
  const total = sc.steps.length;
  const progress = ((activeStep + 1) / total) * 100;

  let itemsHTML = '';
  if (step.items && step.items.length > 0) {
    itemsHTML = step.items.map(item => {
      const isNew = animate && step.newItems && step.newItems.includes(item.n);
      return renderItem(item, isNew);
    }).join('');
  } else {
    itemsHTML = `<span style="font-size:13px;color:var(--text3);font-style:italic;font-family:var(--mono)">[]  // empty array</span>`;
  }

  let resultItemsHTML = '';
  if (step.resultItems && step.resultItems.length > 0) {
    resultItemsHTML = `
      <div class="stage-row" style="margin-top:8px;border-top:0.5px solid var(--border);padding-top:10px">
        <span class="stage-label" style="color:var(--teal)">→ result</span>
        ${step.resultItems.map(item => `<div class="item result"><span class="iname">${item.n}</span>${item.s ? `<span class="isub">${item.s}</span>` : ''}</div>`).join('')}
      </div>`;
  }

  let totalBadgeHTML = '';
  if (step.totalBadge) {
    totalBadgeHTML = `<div class="total-badge">${step.totalBadge}</div>`;
  }

  const escapedCode = step.code.replace(/</g, '&lt;').replace(/>/g, '&gt;');

  document.getElementById('pg-main').innerHTML = `
    <div class="pg-scene-header">
      <div class="pg-scene-title">${sc.icon} ${sc.title}</div>
      <div class="pg-scene-sub">${sc.sub}</div>
    </div>

    <div class="progress-bar">
      <div class="progress-fill" style="width:${progress}%"></div>
    </div>

    <div class="code-block">${syntaxHL(escapedCode)}</div>

    <div class="stage">
      <div class="stage-row">
        <span class="stage-label">array</span>
        ${itemsHTML}
      </div>
      ${resultItemsHTML}
      ${totalBadgeHTML}
    </div>

    <div class="explanation">${step.explain}</div>
    <div class="result-output">// ${step.result}</div>

    <div class="step-controls">
      <button class="step-btn" onclick="prevStep()" ${activeStep === 0 ? 'disabled' : ''}>← Prev</button>
      <button class="step-btn" onclick="nextStep()" ${activeStep === total - 1 ? 'disabled' : ''}>Next →</button>
      <span class="step-pill">${activeStep + 1} / ${total}</span>
      <span class="step-name">${step.label}</span>
    </div>
  `;
}

function nextStep() {
  const sc = SCENARIOS[activeScenario];
  if (activeStep < sc.steps.length - 1) {
    activeStep++;
    renderScene(true);
  }
}

function prevStep() {
  if (activeStep > 0) {
    activeStep--;
    renderScene(false);
  }
}

document.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight') nextStep();
  if (e.key === 'ArrowLeft') prevStep();
});

activeScenario = getScenarioFromURL();
buildNav();
renderScene(false);
