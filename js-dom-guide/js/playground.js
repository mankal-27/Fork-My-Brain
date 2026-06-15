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
    .replace(/\/\/.*/g, m => `<span class="cc">${m}</span>`)
    .replace(/\b(const|let|var|return|function|if|else|new|true|false|null)\b/g, m => `<span class="ck">${m}</span>`)
    .replace(/\b(querySelector|querySelectorAll|getElementById|getElementsByClassName|getElementsByTagName|addEventListener|removeEventListener|createElement|appendChild|removeChild|insertAdjacentHTML|insertAdjacentElement|replaceWith|replaceChildren|remove|setAttribute|getAttribute|removeAttribute|hasAttribute|classList|textContent|innerHTML|style|contains|toggle|add|remove|replace|closest|matches|dataset|forEach)\b/g, m => `<span class="cm">${m}</span>`)
    .replace(/'([^']*)'/g, m => `<span class="cs">${m}</span>`)
    .replace(/`([^`]*)`/g, m => `<span class="cs">${m}</span>`)
    .replace(/\b(\d+)\b/g, m => `<span class="cn">${m}</span>`);
}

function renderScene(animate) {
  const sc = SCENARIOS[activeScenario];
  const step = sc.steps[activeStep];
  const total = sc.steps.length;
  const pct = ((activeStep + 1) / total * 100).toFixed(1);

  const previewHTML = step.preview ? `
    <div class="dom-preview">
      <div class="dom-preview-bar">
        <div class="dom-dots"><span></span><span></span><span></span></div>
        <div class="dom-url">127.0.0.1:5500 / preview</div>
      </div>
      <div class="dom-preview-body">${step.preview.html}</div>
    </div>` : '';

  document.getElementById('pg-main').innerHTML = `
    <div class="pg-scene-header">
      <div class="pg-scene-title">${sc.icon} ${safeText(sc.title)}</div>
      <div class="pg-scene-sub">${safeText(sc.sub)}</div>
    </div>
    <div class="progress-bar"><div class="progress-fill" style="width:${pct}%"></div></div>

    <div class="dom-layout">
      <div class="dom-code-side">
        <div class="dom-side-label">JavaScript</div>
        <div class="code-block">${hl(step.code)}</div>
      </div>
      ${previewHTML ? `<div class="dom-preview-side">
        <div class="dom-side-label">Browser preview</div>
        ${previewHTML}
      </div>` : ''}
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

document.addEventListener('click', function(e) {
  const nb = e.target.closest('[data-idx]');
  if (nb) { selectScenario(Number(nb.dataset.idx)); return; }
  const sb = e.target.closest('[data-action]');
  if (sb && !sb.disabled) {
    if (sb.dataset.action === 'next') nextStep();
    if (sb.dataset.action === 'prev') prevStep();
  }
});
document.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight') nextStep();
  if (e.key === 'ArrowLeft') prevStep();
});

activeScenario = getScenarioFromURL();
buildNav();
renderScene(false);
