# Fork My Brain 🧠

> local brain to the global web

An interactive JavaScript learning site. No courses, no paywalls — just animated, real-world examples for every JS concept, growing one module at a time.

🌐 **Live site:** [mankal-27.github.io/Fork-My-Brain](https://mankal-27.github.io/Fork-My-Brain)

---

## Modules

| Module | Status | Methods | Scenarios |
|---|---|---|---|
| Array Methods | ✅ Live | 41 | 5 |
| String Methods | 🔜 Coming soon | 32 | 5 |
| Promises & Async | 📋 Planned | — | — |
| DOM Manipulation | 📋 Planned | — | — |
| Map & Set | 📋 Planned | — | — |
| Object Methods | 📋 Planned | — | — |

---

## Project structure

```
Fork-My-Brain/
├── index.html              ← Hub homepage
├── css/
│   └── shared.css          ← Shared styles (nav, footer, tokens)
├── _config.yml             ← GitHub Pages config
│
├── js-array-guide/         ← Array Methods module (LIVE)
│   ├── index.html          ← Module landing page
│   ├── playground.html     ← Animated step-through scenarios
│   ├── reference.html      ← Searchable full method reference
│   ├── css/style.css
│   └── js/
│       ├── scenarios.js    ← All scenario data
│       └── playground.js   ← Animation logic
│
└── js-string-guide/        ← (template for next module)
    └── ...
```

---

## Adding a new module

1. **Create a folder** — e.g. `js-string-guide/`
2. **Copy the array guide** as a template: `cp -r js-array-guide js-string-guide`
3. **Edit `js/scenarios.js`** — replace the scenario data with your new topic's examples
4. **Add a card** in `index.html` (the hub) pointing to the new module
5. **Push** — GitHub Pages deploys automatically from `main`

No build step. No npm. Pure HTML + CSS + JS.

---

## Deploy

GitHub Pages is enabled from the `main` branch root.

```bash
git add .
git commit -m "add string methods module"
git push origin main
```

---

Built by [@mankal-27](https://github.com/mankal-27)
