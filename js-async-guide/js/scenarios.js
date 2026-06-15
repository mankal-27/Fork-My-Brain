const SCENARIOS = [
  {
    id: 'lifecycle',
    icon: '🔄',
    label: 'Promise lifecycle',
    title: 'Promise lifecycle',
    sub: 'How a Promise moves through states — new Promise(), .then(), .catch(), .finally()',
    steps: [
      {
        label: 'A Promise starts as PENDING',
        code: 'const fetchUser = new Promise((resolve, reject) => {\n  // async work happening...\n});',
        result: 'Promise { <pending> }',
        explain: 'Every Promise starts in the PENDING state — it\'s working but hasn\'t finished yet. The executor function runs immediately and synchronously. Two callbacks are handed to it: resolve() and reject().',
        nodes: [
          { id: 'p', label: 'Promise', sub: 'pending', state: 'pending' }
        ],
        arrows: []
      },
      {
        label: 'resolve() → FULFILLED',
        code: 'const fetchUser = new Promise((resolve, reject) => {\n  setTimeout(() => {\n    resolve({ id: 1, name: "Mankal" });\n  }, 1000);\n});',
        result: 'Promise { <fulfilled>: { id: 1, name: "Mankal" } }',
        explain: 'Calling resolve(value) moves the Promise to FULFILLED state with that value. The Promise is now settled — its state can never change again. The value is passed to any .then() handlers.',
        nodes: [
          { id: 'p', label: 'Promise', sub: 'fulfilled ✓', state: 'fulfilled' },
          { id: 'v', label: '{ id:1, name:"Mankal" }', sub: 'resolved value', state: 'value' }
        ],
        arrows: [{ from: 'p', to: 'v', label: 'resolve()' }]
      },
      {
        label: 'reject() → REJECTED',
        code: 'const fetchUser = new Promise((resolve, reject) => {\n  setTimeout(() => {\n    reject(new Error("Network error"));\n  }, 1000);\n});',
        result: 'Promise { <rejected>: Error: Network error }',
        explain: 'Calling reject(reason) moves the Promise to REJECTED state with an error reason. Also settled — final state. The reason is passed to .catch() handlers.',
        nodes: [
          { id: 'p', label: 'Promise', sub: 'rejected ✗', state: 'rejected' },
          { id: 'e', label: 'Error("Network error")', sub: 'rejection reason', state: 'error' }
        ],
        arrows: [{ from: 'p', to: 'e', label: 'reject()' }]
      },
      {
        label: '.then() handles success',
        code: 'fetchUser\n  .then(user => {\n    console.log(user.name); // "Mankal"\n    return user.id;         // passed to next .then()\n  })\n  .then(id => console.log(id)); // 1',
        result: '"Mankal" → 1 (chained)',
        explain: '.then(onFulfilled) runs when the Promise resolves. It returns a NEW Promise — so you can chain .then() calls. Whatever you return becomes the resolved value of the next .then().',
        nodes: [
          { id: 'p1', label: 'fetchUser', sub: 'fulfilled', state: 'fulfilled' },
          { id: 'p2', label: '.then(user)', sub: 'returns user.id', state: 'fulfilled' },
          { id: 'p3', label: '.then(id)', sub: 'logs 1', state: 'fulfilled' }
        ],
        arrows: [
          { from: 'p1', to: 'p2', label: '.then()' },
          { from: 'p2', to: 'p3', label: '.then()' }
        ]
      },
      {
        label: '.catch() handles errors',
        code: 'fetchUser\n  .then(user => user.profile)  // might fail!\n  .catch(err => {\n    console.error(err.message); // "Network error"\n    return null;                // recovery value\n  })\n  .then(data => console.log(data)); // null',
        result: '"Network error" caught — recovered with null',
        explain: '.catch(onRejected) catches any rejection in the chain above it. After catch(), the chain continues as fulfilled with whatever catch() returns — so you can recover gracefully.',
        nodes: [
          { id: 'p1', label: 'fetchUser', sub: 'rejected', state: 'rejected' },
          { id: 'p2', label: '.catch(err)', sub: 'returns null', state: 'fulfilled' },
          { id: 'p3', label: '.then(data)', sub: 'data = null', state: 'fulfilled' }
        ],
        arrows: [
          { from: 'p1', to: 'p2', label: '.catch()' },
          { from: 'p2', to: 'p3', label: '.then()' }
        ]
      },
      {
        label: '.finally() always runs',
        code: 'fetchUser\n  .then(user => showUser(user))\n  .catch(err => showError(err))\n  .finally(() => {\n    hideSpinner(); // always runs!\n  });',
        result: 'hideSpinner() called whether success or failure',
        explain: '.finally() runs regardless of whether the Promise fulfilled or rejected — perfect for cleanup like hiding a loading spinner. It receives no value and passes through the original result unchanged.',
        nodes: [
          { id: 'p1', label: 'fetchUser', sub: 'fulfilled OR rejected', state: 'pending' },
          { id: 'p2', label: '.then() / .catch()', sub: 'handles result', state: 'fulfilled' },
          { id: 'p3', label: '.finally()', sub: 'always runs ✓', state: 'value' }
        ],
        arrows: [
          { from: 'p1', to: 'p2', label: 'either way' },
          { from: 'p2', to: 'p3', label: '.finally()' }
        ]
      }
    ]
  },
  {
    id: 'async',
    icon: '⚡',
    label: 'async / await',
    title: 'async / await',
    sub: 'Writing async code that reads like sync — async, await, try/catch',
    steps: [
      {
        label: 'async function always returns a Promise',
        code: 'async function getUser() {\n  return { id: 1, name: "Mankal" };\n}\n\n// Same as:\nfunction getUser() {\n  return Promise.resolve({ id: 1, name: "Mankal" });\n}',
        result: 'getUser() → Promise { <fulfilled> }',
        explain: 'The async keyword makes any function return a Promise automatically. If you return a plain value, it gets wrapped in Promise.resolve(). If you throw, it gets wrapped in Promise.reject().',
        nodes: [
          { id: 'fn', label: 'async function', sub: 'always returns Promise', state: 'value' },
          { id: 'p',  label: 'Promise { fulfilled }', sub: '{ id:1, name:"Mankal" }', state: 'fulfilled' }
        ],
        arrows: [{ from: 'fn', to: 'p', label: 'auto-wraps' }]
      },
      {
        label: 'await pauses until the Promise settles',
        code: 'async function loadPage() {\n  console.log("1. start");\n\n  const user = await fetchUser();  // ⏸ pauses here\n  console.log("2. got user:", user.name);\n\n  const posts = await fetchPosts(user.id); // ⏸ pauses\n  console.log("3. got posts:", posts.length);\n}\n// Output: 1. start → 2. got user → 3. got posts',
        result: 'Code reads top-to-bottom like synchronous code',
        explain: 'await pauses the async function until the Promise settles, then returns its value. Only the async function is paused — the rest of the JS event loop keeps running. No callback nesting!',
        nodes: [
          { id: 's1', label: '1. start', sub: 'runs immediately', state: 'fulfilled' },
          { id: 's2', label: 'await fetchUser()', sub: '⏸ paused...', state: 'pending' },
          { id: 's3', label: '2. got user', sub: 'resumes after resolve', state: 'fulfilled' },
          { id: 's4', label: 'await fetchPosts()', sub: '⏸ paused...', state: 'pending' },
          { id: 's5', label: '3. got posts', sub: 'resumes after resolve', state: 'fulfilled' }
        ],
        arrows: [
          { from: 's1', to: 's2', label: '' },
          { from: 's2', to: 's3', label: 'resolved ✓' },
          { from: 's3', to: 's4', label: '' },
          { from: 's4', to: 's5', label: 'resolved ✓' }
        ]
      },
      {
        label: 'try/catch replaces .catch()',
        code: 'async function loadUser(id) {\n  try {\n    const user = await fetchUser(id);\n    return user;\n  } catch (err) {\n    console.error("Failed:", err.message);\n    return null; // graceful fallback\n  } finally {\n    hideSpinner();\n  }\n}',
        result: 'Errors caught just like synchronous code',
        explain: 'With async/await you can use regular try/catch instead of .catch(). This is one of the biggest wins — error handling looks and behaves exactly like synchronous error handling.',
        nodes: [
          { id: 'try', label: 'try { await ... }', sub: 'happy path', state: 'fulfilled' },
          { id: 'catch', label: 'catch (err)', sub: 'if rejected', state: 'rejected' },
          { id: 'fin', label: 'finally', sub: 'always runs', state: 'value' }
        ],
        arrows: [
          { from: 'try', to: 'fin', label: 'success' },
          { from: 'catch', to: 'fin', label: 'error' }
        ]
      },
      {
        label: 'Sequential vs Parallel awaits',
        code: '// ❌ SLOW — sequential (2000ms total)\nasync function slow() {\n  const user  = await fetchUser();  // 1000ms\n  const posts = await fetchPosts(); // 1000ms\n}\n\n// ✅ FAST — parallel (1000ms total)\nasync function fast() {\n  const [user, posts] = await Promise.all([\n    fetchUser(),\n    fetchPosts()\n  ]);\n}',
        result: 'Parallel cuts total time in half!',
        explain: 'Awaiting sequentially means each request waits for the previous to finish. When requests are independent, kick them all off first with Promise.all(), then await the combined result. Cuts total time dramatically.',
        nodes: [
          { id: 'slow', label: 'Sequential', sub: '1000ms + 1000ms = 2s', state: 'rejected' },
          { id: 'fast', label: 'Promise.all()', sub: 'max(1000ms, 1000ms) = 1s', state: 'fulfilled' }
        ],
        arrows: [{ from: 'slow', to: 'fast', label: 'use this instead' }]
      }
    ]
  },
  {
    id: 'concurrency',
    icon: '🚦',
    label: 'Promise concurrency',
    title: 'Promise concurrency methods',
    sub: 'Running multiple promises — Promise.all(), .allSettled(), .race(), .any()',
    steps: [
      {
        label: 'Three API calls running in parallel',
        code: 'const p1 = fetchUser(1);    // resolves in 300ms\nconst p2 = fetchPosts();    // resolves in 500ms\nconst p3 = fetchSettings(); // resolves in 200ms',
        result: '3 promises running simultaneously',
        explain: 'When you have multiple independent async operations, you can start them all at once and wait for them together. The four Promise concurrency methods handle this in different ways.',
        nodes: [
          { id: 'p1', label: 'fetchUser()', sub: '300ms', state: 'pending' },
          { id: 'p2', label: 'fetchPosts()', sub: '500ms', state: 'pending' },
          { id: 'p3', label: 'fetchSettings()', sub: '200ms', state: 'pending' }
        ],
        arrows: []
      },
      {
        label: 'Promise.all() — all must succeed',
        code: 'const [user, posts, settings] = await Promise.all([\n  fetchUser(1),\n  fetchPosts(),\n  fetchSettings()\n]);\n// Resolves in 500ms (slowest one)\n// If ANY fails → immediately rejects',
        result: 'Fulfilled after 500ms with all 3 results',
        explain: 'Promise.all() waits for ALL promises to fulfill. Returns an array of results in the SAME ORDER as input (not completion order). If ANY single promise rejects, the whole thing rejects immediately — fail-fast.',
        nodes: [
          { id: 'p1', label: 'fetchUser()', sub: '✓ 300ms', state: 'fulfilled' },
          { id: 'p2', label: 'fetchPosts()', sub: '✓ 500ms', state: 'fulfilled' },
          { id: 'p3', label: 'fetchSettings()', sub: '✓ 200ms', state: 'fulfilled' },
          { id: 'all', label: 'Promise.all()', sub: '✓ 500ms [user,posts,settings]', state: 'fulfilled' }
        ],
        arrows: [
          { from: 'p1', to: 'all', label: '' },
          { from: 'p2', to: 'all', label: '' },
          { from: 'p3', to: 'all', label: '' }
        ]
      },
      {
        label: 'Promise.allSettled() — waits for all, never rejects',
        code: 'const results = await Promise.allSettled([\n  fetchUser(1),    // resolves\n  fetchPosts(),    // REJECTS\n  fetchSettings()  // resolves\n]);\n// [\n//   { status: "fulfilled", value: user },\n//   { status: "rejected",  reason: Error },\n//   { status: "fulfilled", value: settings }\n// ]',
        result: 'Always fulfills — you inspect each result',
        explain: 'Promise.allSettled() waits for ALL promises to settle — fulfilled OR rejected. It NEVER rejects itself. You get a status object for each: { status, value } or { status, reason }. Perfect when failures are acceptable.',
        nodes: [
          { id: 'p1', label: 'fetchUser()', sub: '✓ fulfilled', state: 'fulfilled' },
          { id: 'p2', label: 'fetchPosts()', sub: '✗ rejected', state: 'rejected' },
          { id: 'p3', label: 'fetchSettings()', sub: '✓ fulfilled', state: 'fulfilled' },
          { id: 'all', label: 'Promise.allSettled()', sub: '✓ always fulfills', state: 'value' }
        ],
        arrows: [
          { from: 'p1', to: 'all', label: '' },
          { from: 'p2', to: 'all', label: '' },
          { from: 'p3', to: 'all', label: '' }
        ]
      },
      {
        label: 'Promise.race() — first to settle wins',
        code: 'const result = await Promise.race([\n  fetchUser(1),     // 300ms\n  fetchPosts(),     // 500ms\n  timeout(1000)     // rejects after 1s\n]);\n// → user (300ms — first to settle)',
        result: 'fetchUser wins — resolves in 300ms',
        explain: 'Promise.race() resolves or rejects with the FIRST promise that settles, ignoring the rest. Classic use: pair a real request with a timeout promise that rejects after N ms.',
        nodes: [
          { id: 'p1', label: 'fetchUser()', sub: '300ms 🏆 WINS', state: 'fulfilled' },
          { id: 'p2', label: 'fetchPosts()', sub: '500ms — ignored', state: 'pending' },
          { id: 'p3', label: 'timeout(1000)', sub: '1000ms — ignored', state: 'pending' },
          { id: 'r', label: 'Promise.race()', sub: 'user result @ 300ms', state: 'fulfilled' }
        ],
        arrows: [
          { from: 'p1', to: 'r', label: 'first!' },
          { from: 'p2', to: 'r', label: '' },
          { from: 'p3', to: 'r', label: '' }
        ]
      },
      {
        label: 'Promise.any() — first SUCCESS wins',
        code: 'const result = await Promise.any([\n  fetchFromServer1(), // REJECTS\n  fetchFromServer2(), // resolves in 400ms\n  fetchFromServer3()  // resolves in 600ms\n]);\n// → result from server2 (ignores rejection)\n// Only rejects if ALL reject → AggregateError',
        result: 'server2 wins — rejection from server1 ignored',
        explain: 'Promise.any() is like race() but ignores rejections — it only cares about the first FULFILLMENT. Only rejects if ALL promises reject, throwing an AggregateError. Great for trying multiple fallback sources.',
        nodes: [
          { id: 'p1', label: 'server1', sub: '✗ rejected — skipped', state: 'rejected' },
          { id: 'p2', label: 'server2', sub: '✓ 400ms 🏆 WINS', state: 'fulfilled' },
          { id: 'p3', label: 'server3', sub: '✓ 600ms — ignored', state: 'pending' },
          { id: 'r', label: 'Promise.any()', sub: 'server2 result @ 400ms', state: 'fulfilled' }
        ],
        arrows: [
          { from: 'p1', to: 'r', label: 'skip' },
          { from: 'p2', to: 'r', label: 'first win!' },
          { from: 'p3', to: 'r', label: '' }
        ]
      }
    ]
  },
  {
    id: 'fetch',
    icon: '🌐',
    label: 'Real API calls',
    title: 'Real API calls with fetch()',
    sub: 'Fetching data from an API — fetch(), .json(), error handling, async/await',
    steps: [
      {
        label: 'fetch() returns a Promise immediately',
        code: 'const promise = fetch("https://api.github.com/users/mankal-27");\nconsole.log(promise); // Promise { <pending> }\n// fetch() does NOT block — returns immediately',
        result: 'Promise { <pending> } — request is in flight',
        explain: 'fetch() fires the HTTP request and IMMEDIATELY returns a pending Promise. Your code continues running. When the response arrives, the Promise resolves with a Response object.',
        nodes: [
          { id: 'f', label: 'fetch(url)', sub: 'fires HTTP request', state: 'value' },
          { id: 'p', label: 'Promise { pending }', sub: 'returned instantly', state: 'pending' },
          { id: 'n', label: '🌐 Network', sub: 'request in flight...', state: 'pending' }
        ],
        arrows: [
          { from: 'f', to: 'p', label: 'returns' },
          { from: 'f', to: 'n', label: 'sends' }
        ]
      },
      {
        label: 'Two awaits — response then body',
        code: 'async function getUser(username) {\n  // 1st await: wait for HTTP response headers\n  const response = await fetch(\n    `https://api.github.com/users/${username}`\n  );\n\n  // 2nd await: wait for body to stream in\n  const user = await response.json();\n  return user;\n}',
        result: 'Two awaits needed — response, then body',
        explain: 'fetch() needs TWO awaits: first for the Response (when headers arrive), then again for the body (.json(), .text(), .blob()). The body is streamed separately — that\'s why it\'s async too.',
        nodes: [
          { id: 'r', label: 'Response object', sub: 'headers arrived', state: 'fulfilled' },
          { id: 'j', label: '.json()', sub: 'body streaming...', state: 'pending' },
          { id: 'd', label: '{ login, name, ... }', sub: 'parsed JSON data', state: 'fulfilled' }
        ],
        arrows: [
          { from: 'r', to: 'j', label: 'await' },
          { from: 'j', to: 'd', label: 'await' }
        ]
      },
      {
        label: 'Always check response.ok!',
        code: 'async function getUser(username) {\n  const response = await fetch(\n    `https://api.github.com/users/${username}`\n  );\n\n  // ⚠️ fetch() only rejects on NETWORK errors\n  // 404, 500 etc still "resolve"!\n  if (!response.ok) {\n    throw new Error(`HTTP ${response.status}`);\n  }\n\n  return response.json();\n}',
        result: 'response.ok is false for 4xx/5xx — throw manually',
        explain: 'fetch() only rejects on actual network failures (no internet, DNS error). A 404 or 500 response RESOLVES — you have to check response.ok (true for 200-299) and throw manually if it\'s false.',
        nodes: [
          { id: 'ok', label: 'response.ok = true', sub: '200–299 status', state: 'fulfilled' },
          { id: 'err', label: 'response.ok = false', sub: '404 / 500 / etc', state: 'rejected' }
        ],
        arrows: [
          { from: 'ok', to: 'err', label: 'must check manually!' }
        ]
      },
      {
        label: 'Full production-ready pattern',
        code: 'async function getGithubUser(username) {\n  try {\n    const res = await fetch(\n      `https://api.github.com/users/${username}`\n    );\n\n    if (!res.ok) throw new Error(`${res.status}`);\n\n    const user = await res.json();\n    return user;\n\n  } catch (err) {\n    console.error("Fetch failed:", err.message);\n    return null;\n  }\n}',
        result: 'Clean, safe, production-ready fetch pattern',
        explain: 'The full pattern: async function + await fetch() + response.ok check + await .json() + try/catch for everything. This handles network errors, HTTP errors, and JSON parse errors in one clean block.',
        nodes: [
          { id: 'try', label: 'try block', sub: 'fetch → check ok → parse', state: 'fulfilled' },
          { id: 'catch', label: 'catch block', sub: 'network / HTTP / parse errors', state: 'rejected' },
          { id: 'ret', label: 'return user / null', sub: 'always returns something', state: 'value' }
        ],
        arrows: [
          { from: 'try', to: 'ret', label: 'success' },
          { from: 'catch', to: 'ret', label: 'fallback' }
        ]
      }
    ]
  },
  {
    id: 'patterns',
    icon: '🧩',
    label: 'Async patterns',
    title: 'Real async patterns',
    sub: 'Common patterns you\'ll use every day — chaining, Promise.resolve/reject, Promise.withResolvers()',
    steps: [
      {
        label: 'Promise chaining — transform the data',
        code: 'fetch("/api/user/1")\n  .then(res  => res.json())        // parse body\n  .then(user => user.company_id)   // pluck field\n  .then(id   => fetch(`/api/companies/${id}`)) // new request\n  .then(res  => res.json())        // parse again\n  .then(company => console.log(company.name))\n  .catch(err => console.error(err));',
        result: 'Each .then() transforms and passes forward',
        explain: 'Promise chains let you transform data step by step. Each .then() receives the previous return value. A .then() that returns a Promise automatically waits for it before calling the next .then().',
        nodes: [
          { id: 'f1', label: 'fetch("/api/user")', sub: 'Response', state: 'fulfilled' },
          { id: 't1', label: '.then(res.json())', sub: 'user object', state: 'fulfilled' },
          { id: 't2', label: '.then(user.company_id)', sub: 'id: 42', state: 'fulfilled' },
          { id: 't3', label: '.then(fetch(company))', sub: 'company data', state: 'fulfilled' }
        ],
        arrows: [
          { from: 'f1', to: 't1', label: '' },
          { from: 't1', to: 't2', label: '' },
          { from: 't2', to: 't3', label: '' }
        ]
      },
      {
        label: 'Promise.resolve() and Promise.reject()',
        code: '// Wrap a value in a resolved Promise:\nPromise.resolve(42).then(v => console.log(v)); // 42\n\n// Useful for consistent async interfaces:\nfunction getCache(key) {\n  const cached = cache.get(key);\n  if (cached) return Promise.resolve(cached); // sync but Promise-shaped\n  return fetchFromAPI(key); // real async\n}\n\n// Reject immediately:\nPromise.reject(new Error("bad")).catch(e => console.error(e));',
        result: 'Wrap sync values to match async interfaces',
        explain: 'Promise.resolve(value) creates an already-fulfilled Promise. Use it to make synchronous values fit into async interfaces (like returning cached data from a function that normally returns a Promise).',
        nodes: [
          { id: 'r', label: 'Promise.resolve(42)', sub: 'immediately fulfilled', state: 'fulfilled' },
          { id: 'rj', label: 'Promise.reject(err)', sub: 'immediately rejected', state: 'rejected' }
        ],
        arrows: []
      },
      {
        label: 'Promise.withResolvers() — ES2024',
        code: '// Old way — resolve/reject escape from constructor:\nlet resolve, reject;\nconst promise = new Promise((res, rej) => {\n  resolve = res; reject = rej;\n});\n\n// ✅ New way (ES2024):\nconst { promise, resolve, reject } = Promise.withResolvers();\n\n// Now resolve/reject are in scope without hacks:\neventEmitter.on("data", resolve);\neventEmitter.on("error", reject);',
        result: 'Clean access to resolve/reject outside constructor',
        explain: 'Promise.withResolvers() returns { promise, resolve, reject } — giving you the resolve/reject functions outside the constructor without the old "let resolve; new Promise(res => resolve = res)" hack.',
        nodes: [
          { id: 'wr', label: 'Promise.withResolvers()', sub: 'ES2024', state: 'value' },
          { id: 'p',  label: 'promise', sub: 'pending', state: 'pending' },
          { id: 'rs', label: 'resolve()', sub: 'call to fulfill', state: 'fulfilled' },
          { id: 'rj', label: 'reject()', sub: 'call to reject', state: 'rejected' }
        ],
        arrows: [
          { from: 'wr', to: 'p',  label: '' },
          { from: 'wr', to: 'rs', label: '' },
          { from: 'wr', to: 'rj', label: '' }
        ]
      },
      {
        label: 'Promise.try() — ES2025',
        code: '// Problem: you don\'t know if a function is sync or async\nfunction maybeAsync(x) {\n  if (x > 0) return x * 2;          // sync\n  return fetch("/api/default");       // async\n}\n\n// Old way — messy:\nPromise.resolve().then(() => maybeAsync(x));\n\n// ✅ New way (ES2025):\nPromise.try(() => maybeAsync(x))\n  .then(result => console.log(result))\n  .catch(err  => console.error(err));',
        result: 'Wraps sync or async uniformly — errors always caught',
        explain: 'Promise.try() wraps any function call in a Promise — whether it returns synchronously, throws, or returns a Promise. Errors from sync throws are caught too, unlike .then(() => syncFn()).',
        nodes: [
          { id: 'fn', label: 'maybeAsync(x)', sub: 'sync OR async', state: 'value' },
          { id: 'pt', label: 'Promise.try(fn)', sub: 'always a Promise', state: 'fulfilled' }
        ],
        arrows: [{ from: 'fn', to: 'pt', label: 'wraps uniformly' }]
      }
    ]
  }
];
