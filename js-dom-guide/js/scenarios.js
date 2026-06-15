const SCENARIOS = [
  {
    id: 'selecting',
    icon: '🎯',
    label: 'Selecting elements',
    title: 'Selecting elements',
    sub: 'Finding elements in the page — querySelector, querySelectorAll, getElementById, getElementsByClassName',
    steps: [
      {
        label: 'A blog page loaded in the browser',
        code: `// The browser has parsed this HTML into a DOM tree:
// <article id="post">
//   <h1 class="title">Hello World</h1>
//   <p class="body">First paragraph.</p>
//   <p class="body">Second paragraph.</p>
//   <button class="btn">Like</button>
// </article>`,
        explain: 'The browser turns your HTML into a tree of objects (nodes). Every tag becomes an element node you can select and manipulate with JavaScript.',
        result: 'DOM tree ready — 5 elements available',
        preview: {
          html: `<article id="post" style="padding:12px;border:2px solid #b0aaff;border-radius:8px">
  <h1 class="title" style="font-size:16px;color:#b0aaff;margin-bottom:6px">Hello World</h1>
  <p class="body" style="font-size:13px;color:#9090a8;margin-bottom:4px">First paragraph.</p>
  <p class="body" style="font-size:13px;color:#9090a8;margin-bottom:8px">Second paragraph.</p>
  <button class="btn" style="background:#7c6ff7;color:#fff;border:none;padding:6px 14px;border-radius:6px;cursor:pointer;font-size:13px">Like</button>
</article>`,
          highlight: []
        }
      },
      {
        label: 'querySelector() — select by CSS selector',
        code: `// Selects the FIRST matching element
const title = document.querySelector('.title');
// → <h1 class="title">Hello World</h1>

const post = document.querySelector('#post');
// → <article id="post">

const btn = document.querySelector('button');
// → <button class="btn">Like</button>`,
        explain: 'querySelector() accepts any CSS selector — class (.name), ID (#name), tag (div), attribute ([data-x]), or complex selectors. Returns the FIRST match, or null if nothing found.',
        result: 'h1.title selected → <h1 class="title">Hello World</h1>',
        preview: {
          html: `<article id="post" style="padding:12px;border:2px solid #b0aaff;border-radius:8px">
  <h1 class="title" style="font-size:16px;color:#b0aaff;margin-bottom:6px;outline:2px solid #22c98a;outline-offset:3px;border-radius:4px">Hello World ← selected</h1>
  <p class="body" style="font-size:13px;color:#9090a8;margin-bottom:4px">First paragraph.</p>
  <p class="body" style="font-size:13px;color:#9090a8;margin-bottom:8px">Second paragraph.</p>
  <button class="btn" style="background:#7c6ff7;color:#fff;border:none;padding:6px 14px;border-radius:6px;cursor:pointer;font-size:13px">Like</button>
</article>`,
          highlight: ['h1']
        }
      },
      {
        label: 'querySelectorAll() — select ALL matches',
        code: `// Returns a NodeList (array-like) of ALL matches
const paragraphs = document.querySelectorAll('.body');
// → NodeList [<p>, <p>]

paragraphs.length; // 2

// Loop over them
paragraphs.forEach(p => console.log(p.textContent));
// "First paragraph."
// "Second paragraph."`,
        explain: 'querySelectorAll() returns a static NodeList of ALL matching elements. Unlike querySelector(), it never returns null — just an empty NodeList. Use .forEach() or spread [...list] to iterate.',
        result: 'NodeList(2) [p.body, p.body] — both paragraphs selected',
        preview: {
          html: `<article id="post" style="padding:12px;border:2px solid #b0aaff;border-radius:8px">
  <h1 class="title" style="font-size:16px;color:#b0aaff;margin-bottom:6px">Hello World</h1>
  <p class="body" style="font-size:13px;color:#22c98a;margin-bottom:4px;outline:2px solid #22c98a;outline-offset:3px;border-radius:4px">First paragraph. ← selected</p>
  <p class="body" style="font-size:13px;color:#22c98a;margin-bottom:8px;outline:2px solid #22c98a;outline-offset:3px;border-radius:4px">Second paragraph. ← selected</p>
  <button class="btn" style="background:#7c6ff7;color:#fff;border:none;padding:6px 14px;border-radius:6px;cursor:pointer;font-size:13px">Like</button>
</article>`,
          highlight: ['p']
        }
      },
      {
        label: 'getElementById & getElementsByClassName',
        code: `// Fastest selector — by ID (no # prefix)
const post = document.getElementById('post');

// Live HTMLCollection — updates if DOM changes
const bodies = document.getElementsByClassName('body');
// → HTMLCollection [<p>, <p>]

// ⚠️ getElementsByClassName is LIVE
// querySelectorAll is STATIC (snapshot)`,
        explain: 'getElementById() is the fastest DOM selector — browsers index IDs directly. getElementsByClassName() returns a live HTMLCollection that auto-updates when elements are added/removed, unlike the static snapshot from querySelectorAll().',
        result: 'getElementById("post") → the article element',
        preview: {
          html: `<article id="post" style="padding:12px;border:2px solid #22c98a;border-radius:8px;outline:2px solid #22c98a;outline-offset:3px">
  <div style="font-size:10px;color:#22c98a;margin-bottom:6px;font-family:monospace">getElementById("post") → this element</div>
  <h1 class="title" style="font-size:16px;color:#b0aaff;margin-bottom:6px">Hello World</h1>
  <p class="body" style="font-size:13px;color:#9090a8;margin-bottom:4px">First paragraph.</p>
  <p class="body" style="font-size:13px;color:#9090a8;margin-bottom:8px">Second paragraph.</p>
  <button class="btn" style="background:#7c6ff7;color:#fff;border:none;padding:6px 14px;border-radius:6px;cursor:pointer;font-size:13px">Like</button>
</article>`,
        }
      }
    ]
  },
  {
    id: 'modifying',
    icon: '✏️',
    label: 'Modifying elements',
    title: 'Modifying elements',
    sub: 'Changing content, attributes and styles — textContent, innerHTML, setAttribute, style',
    steps: [
      {
        label: 'Starting point — a product card',
        code: `// A product card in the DOM:
// <div id="card">
//   <h2 id="name">Old Product</h2>
//   <p id="price">₹999</p>
//   <img id="thumb" src="old.jpg" alt="product">
//   <div id="badge">Out of stock</div>
// </div>`,
        explain: 'We have a product card. We need to update its content, image, attributes and style dynamically — all without reloading the page.',
        result: 'Product card ready to modify',
        preview: {
          html: `<div id="card" style="padding:12px;border:0.5px solid #333;border-radius:8px;max-width:220px">
  <h2 id="name" style="font-size:15px;color:#ededf5;margin-bottom:4px">Old Product</h2>
  <p id="price" style="font-size:13px;color:#9090a8;margin-bottom:6px">₹999</p>
  <div style="background:#22222d;border-radius:6px;height:60px;display:flex;align-items:center;justify-content:center;color:#50506a;font-size:11px;font-family:monospace;margin-bottom:8px">img src="old.jpg"</div>
  <div id="badge" style="background:#f05454;color:#fff;font-size:11px;padding:3px 8px;border-radius:4px;display:inline-block">Out of stock</div>
</div>`
        }
      },
      {
        label: 'textContent — safe text update',
        code: `const name = document.getElementById('name');
const price = document.getElementById('price');

// textContent — plain text only (safe, no HTML)
name.textContent = 'New Sneakers 🔥';
price.textContent = '₹1,499';

// What's the difference vs innerHTML?
// textContent treats everything as text — safe
// innerHTML parses as HTML — powerful but risky`,
        explain: 'textContent sets or gets the raw text of an element. It treats everything as plain text — so if you set "<b>bold</b>", it literally shows that string, not bold text. Always use textContent for user-supplied content to prevent XSS.',
        result: 'name and price updated safely',
        preview: {
          html: `<div id="card" style="padding:12px;border:0.5px solid #333;border-radius:8px;max-width:220px">
  <h2 id="name" style="font-size:15px;color:#22c98a;margin-bottom:4px;outline:2px solid #22c98a;outline-offset:2px;border-radius:4px">New Sneakers 🔥</h2>
  <p id="price" style="font-size:13px;color:#22c98a;margin-bottom:6px;outline:2px solid #22c98a;outline-offset:2px;border-radius:4px">₹1,499</p>
  <div style="background:#22222d;border-radius:6px;height:60px;display:flex;align-items:center;justify-content:center;color:#50506a;font-size:11px;font-family:monospace;margin-bottom:8px">img src="old.jpg"</div>
  <div id="badge" style="background:#f05454;color:#fff;font-size:11px;padding:3px 8px;border-radius:4px;display:inline-block">Out of stock</div>
</div>`
        }
      },
      {
        label: 'setAttribute — change any HTML attribute',
        code: `const img = document.getElementById('thumb');

// Change src and alt attributes
img.setAttribute('src', 'new-sneakers.jpg');
img.setAttribute('alt', 'New Sneakers');

// Shortcut for common attributes:
img.src = 'new-sneakers.jpg'; // same thing
img.alt = 'New Sneakers';

// Read attributes:
img.getAttribute('src'); // 'new-sneakers.jpg'
img.hasAttribute('alt'); // true
img.removeAttribute('alt'); // removes it`,
        explain: 'setAttribute(name, value) sets any HTML attribute. For common ones like src, href, id, disabled you can use dot notation directly (img.src = ...) — it\'s equivalent and shorter.',
        result: 'img src and alt updated',
        preview: {
          html: `<div id="card" style="padding:12px;border:0.5px solid #333;border-radius:8px;max-width:220px">
  <h2 id="name" style="font-size:15px;color:#22c98a;margin-bottom:4px">New Sneakers 🔥</h2>
  <p id="price" style="font-size:13px;color:#22c98a;margin-bottom:6px">₹1,499</p>
  <div style="background:#1a1a22;border-radius:6px;height:60px;display:flex;align-items:center;justify-content:center;color:#22c98a;font-size:11px;font-family:monospace;margin-bottom:8px;outline:2px solid #22c98a;outline-offset:2px">src="new-sneakers.jpg" ← updated</div>
  <div id="badge" style="background:#f05454;color:#fff;font-size:11px;padding:3px 8px;border-radius:4px;display:inline-block">Out of stock</div>
</div>`
        }
      },
      {
        label: 'style — change CSS directly from JS',
        code: `const badge = document.getElementById('badge');

// Change individual style properties
badge.style.background = '#22c98a';
badge.style.color = '#fff';
badge.textContent = 'In Stock ✓';

// Multiple styles at once with cssText:
badge.style.cssText = 'background:#22c98a;color:#fff;padding:3px 8px';

// ⚠️ Prefer classList.add() for real projects
// Inline styles are hard to override with CSS`,
        explain: 'element.style sets inline CSS properties. Use camelCase (backgroundColor, not background-color). For toggle/state changes, classList is usually cleaner — but style is handy for dynamic values like widths from calculations.',
        result: 'badge updated to green "In Stock ✓"',
        preview: {
          html: `<div id="card" style="padding:12px;border:0.5px solid #333;border-radius:8px;max-width:220px">
  <h2 style="font-size:15px;color:#22c98a;margin-bottom:4px">New Sneakers 🔥</h2>
  <p style="font-size:13px;color:#22c98a;margin-bottom:6px">₹1,499</p>
  <div style="background:#1a1a22;border-radius:6px;height:60px;display:flex;align-items:center;justify-content:center;color:#22c98a;font-size:11px;font-family:monospace;margin-bottom:8px">src="new-sneakers.jpg"</div>
  <div id="badge" style="background:#22c98a;color:#fff;font-size:11px;padding:3px 8px;border-radius:4px;display:inline-block;outline:2px solid #22c98a;outline-offset:3px">In Stock ✓ ← updated</div>
</div>`
        }
      }
    ]
  },
  {
    id: 'classlist',
    icon: '🎨',
    label: 'classList',
    title: 'classList — managing CSS classes',
    sub: 'The cleanest way to change styles — add(), remove(), toggle(), contains(), replace()',
    steps: [
      {
        label: 'A nav menu — classes control everything',
        code: `// <nav>
//   <a class="nav-link active" href="/">Home</a>
//   <a class="nav-link" href="/about">About</a>
//   <a class="nav-link" href="/work">Work</a>
// </nav>
// <div class="sidebar">...</div>

const links = document.querySelectorAll('.nav-link');
const sidebar = document.querySelector('.sidebar');`,
        explain: 'In modern JS, you rarely touch element.style directly. Instead, CSS classes hold all your visual states — active, open, hidden, loading — and classList methods flip them on and off.',
        result: 'Nav and sidebar ready',
        preview: {
          html: `<nav style="display:flex;gap:8px;margin-bottom:10px">
  <a style="font-size:12px;padding:5px 12px;border-radius:6px;background:#7c6ff7;color:#fff;text-decoration:none">Home (active)</a>
  <a style="font-size:12px;padding:5px 12px;border-radius:6px;color:#9090a8;text-decoration:none">About</a>
  <a style="font-size:12px;padding:5px 12px;border-radius:6px;color:#9090a8;text-decoration:none">Work</a>
</nav>
<div style="padding:10px;background:#1a1a22;border-radius:6px;font-size:12px;color:#9090a8;border:0.5px solid #333">sidebar (hidden)</div>`
        }
      },
      {
        label: 'add() and remove()',
        code: `const link = document.querySelector('.nav-link');

// Add a class
link.classList.add('active');
link.classList.add('highlight', 'bold'); // multiple at once

// Remove a class
link.classList.remove('active');
link.classList.remove('highlight', 'bold'); // multiple

// Check the current class string
link.className; // "nav-link"`,
        explain: 'classList.add() adds one or more classes without touching existing ones — unlike className = "..." which replaces everything. classList.remove() removes specific classes, leaving the rest intact.',
        result: '"About" link gets active class added',
        preview: {
          html: `<nav style="display:flex;gap:8px;margin-bottom:10px">
  <a style="font-size:12px;padding:5px 12px;border-radius:6px;color:#9090a8;text-decoration:none">Home</a>
  <a style="font-size:12px;padding:5px 12px;border-radius:6px;background:#7c6ff7;color:#fff;text-decoration:none;outline:2px solid #22c98a;outline-offset:2px">About ← .add("active")</a>
  <a style="font-size:12px;padding:5px 12px;border-radius:6px;color:#9090a8;text-decoration:none">Work</a>
</nav>
<div style="padding:10px;background:#1a1a22;border-radius:6px;font-size:12px;color:#9090a8;border:0.5px solid #333">sidebar</div>`
        }
      },
      {
        label: 'toggle() — flip a class on/off',
        code: `const sidebar = document.querySelector('.sidebar');
const menuBtn = document.querySelector('.menu-btn');

// Toggle opens/closes sidebar on each click
menuBtn.addEventListener('click', () => {
  sidebar.classList.toggle('open');
  // If 'open' is present → removes it
  // If 'open' is absent  → adds it
});

// Force add or remove with second argument:
sidebar.classList.toggle('open', true);  // always add
sidebar.classList.toggle('open', false); // always remove`,
        explain: 'toggle() is perfect for binary states — open/closed, show/hide, dark/light. It flips the class each time. The optional second argument forces it on (true) or off (false) regardless of current state.',
        result: 'Sidebar toggled open ← "open" class added',
        preview: {
          html: `<nav style="display:flex;gap:8px;margin-bottom:10px">
  <a style="font-size:12px;padding:5px 12px;border-radius:6px;background:#7c6ff7;color:#fff;text-decoration:none">Home</a>
  <a style="font-size:12px;padding:5px 12px;border-radius:6px;color:#9090a8;text-decoration:none">About</a>
  <a style="font-size:12px;padding:5px 12px;border-radius:6px;color:#9090a8;text-decoration:none">Work</a>
</nav>
<div style="padding:10px;background:#1a1a22;border-radius:6px;font-size:12px;color:#22c98a;border:2px solid #22c98a;outline:2px solid #22c98a;outline-offset:3px">sidebar.open = true ← .toggle("open") added it</div>`
        }
      },
      {
        label: 'contains() and replace()',
        code: `const link = document.querySelector('.nav-link');

// Check if a class exists → returns boolean
link.classList.contains('active');  // true or false

// Replace one class with another
link.classList.replace('nav-link', 'tab-link');
// Safer than remove + add (atomic)

// Real use — swap themes:
document.body.classList.replace('theme-light', 'theme-dark');`,
        explain: 'contains() is a quick boolean check — great for conditionals. replace() swaps one class for another atomically, which is cleaner and safer than calling remove() + add() separately.',
        result: 'contains("active") → true | replace works atomically',
        preview: {
          html: `<nav style="display:flex;gap:8px;margin-bottom:10px">
  <a style="font-size:12px;padding:5px 12px;border-radius:6px;background:#7c6ff7;color:#fff;text-decoration:none">Home (active)</a>
  <a style="font-size:12px;padding:5px 12px;border-radius:6px;color:#9090a8;text-decoration:none">About</a>
  <a style="font-size:12px;padding:5px 12px;border-radius:6px;color:#9090a8;text-decoration:none">Work</a>
</nav>
<div style="display:flex;gap:8px;margin-top:8px">
  <div style="padding:5px 10px;background:#22c98a;color:#131318;border-radius:4px;font-size:11px;font-family:monospace">.contains("active") → true</div>
  <div style="padding:5px 10px;background:#7c6ff7;color:#fff;border-radius:4px;font-size:11px;font-family:monospace">.replace() → swapped</div>
</div>`
        }
      }
    ]
  },
  {
    id: 'events',
    icon: '🖱️',
    label: 'Events',
    title: 'Event listeners',
    sub: 'Making pages interactive — addEventListener, removeEventListener, event object, delegation',
    steps: [
      {
        label: 'A button — waiting for interaction',
        code: `// <button id="likeBtn">♡ Like</button>
// <div id="counter">0 likes</div>

const btn = document.getElementById('likeBtn');
const counter = document.getElementById('counter');

// Nothing happens yet — no listener attached`,
        explain: 'The DOM is static until you attach event listeners. Events are things the user does (click, type, scroll, hover) or things the browser does (load, resize). addEventListener() connects a function to an event.',
        result: 'Button exists but nothing happens on click yet',
        preview: {
          html: `<div style="display:flex;flex-direction:column;gap:10px;align-items:flex-start">
  <button id="likeBtn" style="background:#22222d;color:#9090a8;border:0.5px solid #333;padding:8px 18px;border-radius:6px;cursor:pointer;font-size:14px">♡ Like</button>
  <div id="counter" style="font-size:13px;color:#50506a;font-family:monospace">0 likes — (no listener yet)</div>
</div>`
        }
      },
      {
        label: 'addEventListener() — attach an event',
        code: `let count = 0;

btn.addEventListener('click', function(event) {
  count++;
  counter.textContent = count + ' likes';
  btn.textContent = '♥ Liked!';
  btn.style.color = '#f05454';
});

// Arrow function version:
btn.addEventListener('click', (e) => {
  console.log(e.target);     // the button element
  console.log(e.type);       // "click"
  console.log(e.timeStamp);  // when it happened
});`,
        explain: 'addEventListener(event, handler) attaches a function that runs when the event fires. The event object (e) contains everything about what happened — what was clicked, where, when, what key was pressed, etc.',
        result: 'Click → count increases, button turns red',
        preview: {
          html: `<div style="display:flex;flex-direction:column;gap:10px;align-items:flex-start">
  <button style="background:#f05454;color:#fff;border:none;padding:8px 18px;border-radius:6px;cursor:pointer;font-size:14px;outline:2px solid #f05454;outline-offset:3px">♥ Liked! ← click fired</button>
  <div style="font-size:13px;color:#22c98a;font-family:monospace">3 likes ← updated by listener</div>
</div>`
        }
      },
      {
        label: 'Event delegation — one listener for many elements',
        code: `// ❌ BAD — 100 listeners for 100 buttons
buttons.forEach(btn => {
  btn.addEventListener('click', handleClick);
});

// ✅ GOOD — 1 listener on the parent
const list = document.querySelector('#todo-list');

list.addEventListener('click', (e) => {
  // e.target is the actual element clicked
  if (e.target.matches('.delete-btn')) {
    e.target.closest('li').remove();
  }
  if (e.target.matches('.done-btn')) {
    e.target.closest('li').classList.toggle('done');
  }
});`,
        explain: 'Events bubble up from child to parent. Delegation puts ONE listener on a parent and uses e.target to check what was actually clicked. It\'s more efficient AND works on elements added to the DOM after the listener is attached.',
        result: 'Single listener handles all todo item clicks',
        preview: {
          html: `<ul id="todo-list" style="list-style:none;display:flex;flex-direction:column;gap:6px;padding:0">
  <li style="display:flex;align-items:center;gap:8px;padding:8px;background:#1a1a22;border-radius:6px;font-size:13px">
    <span style="flex:1;color:#ededf5">Buy groceries</span>
    <button style="background:#22c98a;color:#131318;border:none;padding:3px 8px;border-radius:4px;font-size:11px;cursor:pointer">done</button>
    <button style="background:#f05454;color:#fff;border:none;padding:3px 8px;border-radius:4px;font-size:11px;cursor:pointer">✕</button>
  </li>
  <li style="display:flex;align-items:center;gap:8px;padding:8px;background:#1a1a22;border-radius:6px;font-size:13px">
    <span style="flex:1;color:#ededf5;text-decoration:line-through;opacity:.5">Walk the dog</span>
    <button style="background:#22c98a;color:#131318;border:none;padding:3px 8px;border-radius:4px;font-size:11px;cursor:pointer">done</button>
    <button style="background:#f05454;color:#fff;border:none;padding:3px 8px;border-radius:4px;font-size:11px;cursor:pointer">✕</button>
  </li>
  <div style="font-size:10px;color:#50506a;font-family:monospace;margin-top:4px">↑ ONE listener on ul handles ALL buttons</div>
</ul>`
        }
      },
      {
        label: 'removeEventListener() — clean up',
        code: `// Save reference to the handler function
function handleClick(e) {
  console.log('clicked!');
}

btn.addEventListener('click', handleClick);

// Later — remove it (MUST be same function reference)
btn.removeEventListener('click', handleClick);

// ⚠️ This does NOT work (different function):
btn.removeEventListener('click', () => {});

// Common use: cleanup in React useEffect
useEffect(() => {
  window.addEventListener('resize', onResize);
  return () => window.removeEventListener('resize', onResize);
}, []);`,
        explain: 'removeEventListener() removes a previously added listener. You must pass the exact same function reference — anonymous arrow functions won\'t work for removal. Always clean up listeners on components that unmount to avoid memory leaks.',
        result: 'Listener removed — button no longer responds to clicks',
        preview: {
          html: `<div style="display:flex;flex-direction:column;gap:10px;align-items:flex-start">
  <button style="background:#22222d;color:#50506a;border:0.5px solid #333;padding:8px 18px;border-radius:6px;cursor:not-allowed;font-size:14px;opacity:.6">♡ Like (listener removed)</button>
  <div style="font-size:11px;color:#50506a;font-family:monospace">removeEventListener() called — button is deaf now</div>
</div>`
        }
      }
    ]
  },
  {
    id: 'creating',
    icon: '🏗️',
    label: 'Creating & removing',
    title: 'Creating & removing elements',
    sub: 'Building the DOM dynamically — createElement, appendChild, insertAdjacentHTML, remove()',
    steps: [
      {
        label: 'An empty notification list',
        code: `// <ul id="notif-list"></ul>
// <button id="add-btn">Add notification</button>

const list = document.querySelector('#notif-list');
const btn = document.querySelector('#add-btn');

// List is empty — we'll build it dynamically`,
        explain: 'Instead of hardcoding HTML, you can create elements entirely in JavaScript and inject them into the page. This is how React, Vue, and every modern framework works under the hood.',
        result: 'Empty list ready — will be populated dynamically',
        preview: {
          html: `<div>
  <ul id="notif-list" style="list-style:none;padding:0;min-height:40px;border:0.5px dashed #333;border-radius:6px;padding:8px;margin-bottom:8px">
    <li style="color:#50506a;font-size:12px;font-family:monospace;text-align:center">empty — no notifications yet</li>
  </ul>
  <button style="background:#7c6ff7;color:#fff;border:none;padding:7px 16px;border-radius:6px;cursor:pointer;font-size:13px">+ Add notification</button>
</div>`
        }
      },
      {
        label: 'createElement + appendChild',
        code: `function addNotification(text) {
  // 1. Create the element
  const li = document.createElement('li');

  // 2. Set its content and attributes
  li.textContent = text;
  li.className = 'notif-item';
  li.dataset.id = Date.now();

  // 3. Append it to the DOM
  list.appendChild(li); // adds to the END
}

addNotification('New follower: @mankal_27');
addNotification('Your post got 10 likes!');`,
        explain: 'createElement() creates a new element node in memory (not yet in the DOM). You configure it — set text, classes, data attributes — then appendChild() inserts it as the last child of the parent.',
        result: '2 notification items created and appended',
        preview: {
          html: `<div>
  <ul style="list-style:none;padding:8px;border:0.5px solid #333;border-radius:6px;display:flex;flex-direction:column;gap:5px;margin-bottom:8px">
    <li style="padding:7px 10px;background:#1a1a22;border-radius:5px;font-size:12px;color:#ededf5;display:flex;align-items:center;gap:6px">
      <span style="color:#b0aaff">●</span> New follower: @mankal_27
    </li>
    <li style="padding:7px 10px;background:#1a1a22;border-radius:5px;font-size:12px;color:#ededf5;display:flex;align-items:center;gap:6px;outline:2px solid #22c98a;outline-offset:2px">
      <span style="color:#b0aaff">●</span> Your post got 10 likes! ← just appended
    </li>
  </ul>
  <button style="background:#7c6ff7;color:#fff;border:none;padding:7px 16px;border-radius:6px;cursor:pointer;font-size:13px">+ Add notification</button>
</div>`
        }
      },
      {
        label: 'insertAdjacentHTML — fastest HTML injection',
        code: `// insertAdjacentHTML(position, htmlString)
// Positions:
// 'beforebegin' — before the element itself
// 'afterbegin'  — first child inside element
// 'beforeend'   — last child inside element (like appendChild)
// 'afterend'    — after the element itself

list.insertAdjacentHTML('afterbegin',
  '<li class="notif-item pinned">📌 Pinned: Check your DMs</li>'
);
// Inserts at the TOP of the list

// Also useful:
el.insertAdjacentElement('afterend', otherEl);
el.insertAdjacentText('beforeend', 'plain text');`,
        explain: 'insertAdjacentHTML() is faster than innerHTML += (which re-parses the whole element) and more flexible than appendChild() (4 position options). Use it for injecting HTML strings efficiently.',
        result: 'Pinned notification inserted at the TOP',
        preview: {
          html: `<div>
  <ul style="list-style:none;padding:8px;border:0.5px solid #333;border-radius:6px;display:flex;flex-direction:column;gap:5px;margin-bottom:8px">
    <li style="padding:7px 10px;background:#22222d;border-radius:5px;font-size:12px;color:#f5a623;display:flex;align-items:center;gap:6px;border-left:2px solid #f5a623;outline:2px solid #f5a623;outline-offset:2px">
      📌 Pinned: Check your DMs ← insertAdjacentHTML afterbegin
    </li>
    <li style="padding:7px 10px;background:#1a1a22;border-radius:5px;font-size:12px;color:#ededf5;display:flex;align-items:center;gap:6px">
      <span style="color:#b0aaff">●</span> New follower: @mankal_27
    </li>
    <li style="padding:7px 10px;background:#1a1a22;border-radius:5px;font-size:12px;color:#ededf5;display:flex;align-items:center;gap:6px">
      <span style="color:#b0aaff">●</span> Your post got 10 likes!
    </li>
  </ul>
</div>`
        }
      },
      {
        label: 'remove() and replaceWith()',
        code: `// Remove an element from the DOM
const pinned = list.querySelector('.pinned');
pinned.remove(); // gone!

// Replace an element with another
const oldBtn = document.querySelector('#add-btn');
const newBtn = document.createElement('button');
newBtn.textContent = '✓ All caught up';
newBtn.disabled = true;
oldBtn.replaceWith(newBtn);

// Clear all children at once:
list.replaceChildren(); // empties the list`,
        explain: 'remove() deletes an element from the DOM entirely. replaceWith() swaps it for something else. replaceChildren() is the modern way to clear an element\'s children — faster than setting innerHTML to "".',
        result: 'Pinned item removed, button replaced',
        preview: {
          html: `<div>
  <ul style="list-style:none;padding:8px;border:0.5px solid #333;border-radius:6px;display:flex;flex-direction:column;gap:5px;margin-bottom:8px">
    <li style="padding:7px 10px;background:#1a1a22;border-radius:5px;font-size:12px;color:#ededf5;display:flex;align-items:center;gap:6px">
      <span style="color:#b0aaff">●</span> New follower: @mankal_27
    </li>
    <li style="padding:7px 10px;background:#1a1a22;border-radius:5px;font-size:12px;color:#ededf5;display:flex;align-items:center;gap:6px">
      <span style="color:#b0aaff">●</span> Your post got 10 likes!
    </li>
  </ul>
  <button disabled style="background:#22222d;color:#50506a;border:0.5px solid #333;padding:7px 16px;border-radius:6px;cursor:not-allowed;font-size:13px">✓ All caught up ← replaceWith()</button>
</div>`
        }
      }
    ]
  }
];
