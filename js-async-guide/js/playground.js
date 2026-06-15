let activeScenario = 0;

function safeText(str) {
  const d = document.createElement('div');
  d.textContent = String(str ?? '');
  return d.innerHTML;
}

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
    <button class="pg-nav-btn${i === activeScenario ? ' active' : ''}" data-idx="${i}">
      <span class="pg-nav-icon">${s.icon}</span>
      <span>${safeText(s.label)}</span>
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

const STATE_COLORS = {
  pending:   { bg: 'rgba(245,166,35,0.12)',  border: 'rgba(245,166,35,0.4)',  text: '#f5a623' },
  fulfilled: { bg: 'rgba(34,201,138,0.12)',  border: 'rgba(34,201,138,0.4)', text: '#22c98a' },
  rejected:  { bg: 'rgba(240,84,84,0.12)',   border: 'rgba(240,84,84,0.4)',  text: '#f05454' },
  value:     { bg: 'rgba(124,111,247,0.12)', border: 'rgba(124,111,247,0.4)',text: '#b0aaff' },
  error:     { bg: 'rgba(240,84,84,0.12)',   border: 'rgba(240,84,84,0.4)',  text: '#f05454' },
};

const STATE_ICON = {
  pending: '⏳', fulfilled: '✅', rejected: '❌', value: '💡', error: '🚨'
};

function renderNode(node, animate) {
  const c = STATE_COLORS[node.state] || STATE_COLORS.value;
  return `
    <div class="async-node${animate ? ' pop-in' : ''}" style="
      background:${c.bg};border:0.5px solid ${c.border};
      border-radius:var(--radius-lg);padding:12px 16px;
      display:inline-flex;flex-direction:column;gap:3px;
      min-width:160px;max-width:220px;
    ">
      <span style="font-size:11px;color:${c.text};font-family:var(--mono)">${STATE_ICON[node.state]} ${node.state}</span>
      <span style="font-size:13px;font-weight:500;color:var(--text);font-family:var(--mono)">${safeText(node.label)}</span>
      ${node.sub ? `<span style="font-size:11px;color:var(--text2)">${safeText(node.sub)}</span>` : ''}
    </div>`;
}

function renderArrow(arrow) {
  return `
    <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;padding:0 4px">
      ${arrow.label ? `<span style="font-size:10px;color:var(--text3);font-family:var(--mono);white-space:nowrap">${safeText(arrow.label)}</span>` : ''}
      <span style="color:var(--text3);font-size:18px;line-height:1">→</span>
    </div>`;
}

function syntaxHL(code) {
  return code
    .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
    .replace(/\/\/.*/g, m => `<span class="c-comment">${m}</span>`)
    .replace(/\b(async|await|const|let|var|return|throw|new|try|catch|finally|function|if|else)\b/g, m => `<span class="ck">${m}</span>`)
    .replace(/\b(Promise|fetch|resolve|reject|then|catch|finally|all|allSettled|race|any|withResolvers|try)\b(?=[.(])/g, m => `<span class="cm">${m}</span>`)
    .replace(/'([^']*)'/g, m => `<span class="cs">${m}</span>`)
    .replace(/`([^`]*)`/g, m => `<span class="cs">${m}</span>`)
    .replace(/\b(\d+)\b/g, m => `<span class="cn">${m}</span>`);
}

function renderScene(animate) {
  const sc = SCENARIOS[activeScenario];
  const step = sc.steps[activeStep];
  const total = sc.steps.length;
  const progress = ((activeStep + 1) / total) * 100;

  // Build the node/arrow flow diagram
  const nodeMap = {};
  step.nodes.forEach(n => { nodeMap[n.id] = n; });

  // Figure out chains of arrows
  let diagramHTML = '';
  if (step.nodes.length <= 3 && step.arrows.length > 0) {
    // Linear flow — show inline
    diagramHTML = `<div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;padding:4px 0">`;
    const visited = new Set();
    // Start from nodes with no incoming arrows
    const hasIncoming = new Set(step.arrows.map(a => a.to));
    const roots = step.nodes.filter(n => !hasIncoming.has(n.id));
    if (roots.length === 0) roots.push(step.nodes[0]);

    // Simple linear chain render
    step.nodes.forEach((node, i) => {
      diagramHTML += renderNode(node, animate);
      const outArrow = step.arrows.find(a => a.from === node.id);
      if (outArrow && i < step.nodes.length - 1) {
        diagramHTML += renderArrow(outArrow);
      }
    });
    diagramHTML += `</div>`;
  } else if (step.nodes.length > 0) {
    // Fan-in / fan-out — two rows
    const lastNode = step.nodes[step.nodes.length - 1];
    const hasIncoming = new Set(step.arrows.map(a => a.to));
    const inputNodes = step.nodes.filter(n => n.id !== lastNode.id);
    const isFanIn = step.arrows.some(a => a.to === lastNode.id) && inputNodes.length > 1;

    if (isFanIn) {
      // Show inputs in a column, then arrow, then result
      diagramHTML = `
        <div style="display:flex;align-items:center;gap:16px;flex-wrap:wrap">
          <div style="display:flex;flex-direction:column;gap:8px">
            ${inputNodes.map(n => renderNode(n, animate)).join('')}
          </div>
          <div style="display:flex;flex-direction:column;align-items:center;gap:4px">
            <span style="color:var(--text3);font-size:22px">→</span>
          </div>
          ${renderNode(lastNode, animate)}
        </div>`;
    } else {
      // Fan-out — one root, multiple outputs
      const rootNode = step.nodes[0];
      const outputNodes = step.nodes.slice(1);
      diagramHTML = `
        <div style="display:flex;align-items:center;gap:16px;flex-wrap:wrap">
          ${renderNode(rootNode, animate)}
          ${outputNodes.length > 0 ? `
            <span style="color:var(--text3);font-size:22px">→</span>
            <div style="display:flex;flex-direction:column;gap:8px">
              ${outputNodes.map(n => renderNode(n, animate)).join('')}
            </div>
          ` : ''}
        </div>`;
    }
  }

  document.getElementById('pg-main').innerHTML = `
    <div class="pg-scene-header">
      <div class="pg-scene-title">${sc.icon} ${safeText(sc.title)}</div>
      <div class="pg-scene-sub">${safeText(sc.sub)}</div>
    </div>

    <div class="progress-bar">
      <div class="progress-fill" style="width:${progress}%"></div>
    </div>

    <div class="code-win" style="margin-bottom:1rem">
      <div class="code-bar">
        <span class="dot dot-r"></span><span class="dot dot-a"></span><span class="dot dot-g"></span>
        <span class="code-fname">example.js</span>
      </div>
      <pre class="code-pre">${syntaxHL(step.code)}</pre>
    </div>

    <div class="stage" style="min-height:130px">
      ${diagramHTML || `<span style="font-size:13px;color:var(--text3)">Loading diagram...</span>`}
    </div>

    <div class="explanation">${safeText(step.explain)}</div>
    <div class="result-output">// ${safeText(step.result)}</div>

    <div class="step-controls">
      <button class="step-btn" data-action="prev" ${activeStep === 0 ? 'disabled' : ''}>← Prev</button>
      <button class="step-btn" data-action="next" ${activeStep === total - 1 ? 'disabled' : ''}>Next →</button>
      <span class="step-pill">${activeStep + 1} / ${total}</span>
      <span class="step-name">${safeText(step.label)}</span>
    </div>
  `;
}

function nextStep() {
  const sc = SCENARIOS[activeScenario];
  if (activeStep < sc.steps.length - 1) { activeStep++; renderScene(true); }
}
function prevStep() {
  if (activeStep > 0) { activeStep--; renderScene(false); }
}

document.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight') nextStep();
  if (e.key === 'ArrowLeft') prevStep();
});


document.getElementById('pg-main').addEventListener('click', function(e) {
  const btn = e.target.closest('[data-action]');
  if (btn) {
    if (btn.dataset.action === 'next') nextStep();
    if (btn.dataset.action === 'prev') prevStep();
  }
});

document.getElementById('pg-nav').addEventListener('click', function(e) {
  const btn = e.target.closest('[data-idx]');
  if (btn) selectScenario(Number(btn.dataset.idx));
});

activeScenario = getScenarioFromURL();
buildNav();
renderScene(false);
