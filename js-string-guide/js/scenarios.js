const SCENARIOS = [
  {
    id: 'form',
    icon: '📋',
    label: 'Form validation',
    title: 'Form validation',
    sub: 'Cleaning and validating user input — trim(), includes(), startsWith(), endsWith(), length',
    steps: [
      {
        label: 'Raw input from a signup form',
        code: 'const email    = "  Mankal@Fork.DEV  ";\nconst username = "  mankal_27  ";\nconst password = "abc";',
        result: 'Raw input received — needs cleaning & validation',
        explain: 'Users never type perfectly. Inputs often have extra spaces, wrong case, or missing characters. String methods let us clean and validate before processing.',
        items: [
          { n: '"  Mankal@Fork.DEV  "', s: 'email · raw' },
          { n: '"  mankal_27  "',       s: 'username · raw' },
          { n: '"abc"',                 s: 'password · raw' }
        ],
        highlight: [], newItems: []
      },
      {
        label: 'Remove whitespace with .trim()',
        code: 'const cleanEmail = email.trim();\n// "Mankal@Fork.DEV"\n\nconst cleanUser  = username.trim();\n// "mankal_27"',
        result: 'Whitespace removed from both ends',
        explain: '.trim() removes all leading and trailing whitespace — spaces, tabs, newlines. It does NOT touch whitespace in the middle. .trimStart() and .trimEnd() do one side only.',
        items: [
          { n: '"Mankal@Fork.DEV"', s: 'email · trimmed' },
          { n: '"mankal_27"',       s: 'username · trimmed' }
        ],
        highlight: ['"Mankal@Fork.DEV"', '"mankal_27"'], newItems: ['"Mankal@Fork.DEV"', '"mankal_27"']
      },
      {
        label: 'Check email has "@" with .includes()',
        code: 'cleanEmail.includes("@");   // true ✓\ncleanEmail.includes(".com"); // false\n"noatsign".includes("@");    // false ✗',
        result: 'includes("@") → true',
        explain: '.includes() returns true if the substring exists ANYWHERE in the string. Case-sensitive. Perfect for a quick existence check without needing a regex.',
        items: [
          { n: '"Mankal@Fork.DEV"', s: 'has "@" → ✓' }
        ],
        highlight: ['"Mankal@Fork.DEV"'], newItems: []
      },
      {
        label: 'Validate email domain with .endsWith()',
        code: 'const lower = cleanEmail.toLowerCase();\n// "mankal@fork.dev"\n\nlower.endsWith(".dev");  // true ✓\nlower.endsWith(".com");  // false',
        result: 'endsWith(".dev") → true',
        explain: '.endsWith() checks the tail of the string. We first .toLowerCase() so it\'s case-insensitive. Combine startsWith() + endsWith() to validate both ends of a string.',
        items: [
          { n: '"mankal@fork.dev"', s: 'ends with .dev → ✓' }
        ],
        highlight: ['"mankal@fork.dev"'], newItems: ['"mankal@fork.dev"']
      },
      {
        label: 'Check password length with .length',
        code: 'password.length;         // 3\npassword.length >= 8;    // false ✗\n\n"StrongPass1!".length;   // 12\n"StrongPass1!".length >= 8; // true ✓',
        result: '"abc".length → 3 → too short!',
        explain: '.length is a property (not a method — no parentheses!). It returns the number of UTF-16 code units. Essential for min/max character validation on passwords and usernames.',
        items: [
          { n: '"abc"', s: 'length: 3 → ✗ too short', fail: true },
          { n: '"StrongPass1!"', s: 'length: 12 → ✓ valid' }
        ],
        highlight: ['"StrongPass1!"'], newItems: []
      }
    ]
  },
  {
    id: 'chat',
    icon: '💬',
    label: 'Chat messages',
    title: 'Chat app messages',
    sub: 'Formatting and searching chat text — toUpperCase(), replace(), split(), indexOf(), repeat()',
    steps: [
      {
        label: 'A chat message arrives',
        code: 'const msg = "hey everyone!! check out fork-my-brain 🚀🚀";',
        result: 'Raw message received',
        explain: 'A message comes in from a user. We need to render it, moderate it, search it, and display typing indicators — all using String methods.',
        items: [
          { n: '"hey everyone!! check out fork-my-brain 🚀🚀"', s: 'incoming message' }
        ],
        highlight: [], newItems: []
      },
      {
        label: 'Detect SHOUTING with .toUpperCase()',
        code: 'const upper = msg.toUpperCase();\n// "HEY EVERYONE!! CHECK OUT FORK-MY-BRAIN 🚀🚀"\n\nconst isAllCaps = msg === upper;\n// false — mixed case, not shouting',
        result: 'isAllCaps = false — user is not shouting',
        explain: '.toUpperCase() returns a new uppercase string — the original is unchanged. Compare original === uppercased to detect if someone is typing in ALL CAPS.',
        items: [
          { n: '"HEY EVERYONE!! CHECK OUT FORK-MY-BRAIN 🚀🚀"', s: 'uppercased' }
        ],
        highlight: ['"HEY EVERYONE!! CHECK OUT FORK-MY-BRAIN 🚀🚀"'], newItems: ['"HEY EVERYONE!! CHECK OUT FORK-MY-BRAIN 🚀🚀"']
      },
      {
        label: 'Censor a banned word with .replace()',
        code: 'const clean = msg.replace("fork-my-brain", "***");\n// "hey everyone!! check out *** 🚀🚀"\n\n// Replace ALL occurrences:\nmsg.replaceAll("🚀", "✨");\n// "hey everyone!! check out fork-my-brain ✨✨"',
        result: '"hey everyone!! check out *** 🚀🚀"',
        explain: '.replace() swaps the FIRST match. .replaceAll() swaps every match. Both accept strings or regex. Returning a new string — the original msg never changes.',
        items: [
          { n: '"hey everyone!! check out *** 🚀🚀"', s: 'censored' }
        ],
        highlight: ['"hey everyone!! check out *** 🚀🚀"'], newItems: ['"hey everyone!! check out *** 🚀🚀"']
      },
      {
        label: 'Split message into words with .split()',
        code: 'const words = msg.split(" ");\n// ["hey","everyone!!","check","out","fork-my-brain","🚀🚀"]\n\nwords.length; // 6 words\n\n// Split by letter:\n"hi".split(""); // ["h","i"]',
        result: '6 words extracted as an array',
        explain: '.split(separator) breaks a string into an array at every separator. The separator is removed. Split by "" to get individual characters. The opposite of Array .join().',
        items: [
          { n: '"hey"',           s: '[0]' },
          { n: '"everyone!!"',    s: '[1]' },
          { n: '"check"',         s: '[2]' },
          { n: '"out"',           s: '[3]' },
          { n: '"fork-my-brain"', s: '[4]' },
          { n: '"🚀🚀"',          s: '[5]' }
        ],
        highlight: ['"hey"', '"everyone!!"', '"check"', '"out"', '"fork-my-brain"', '"🚀🚀"'],
        newItems: ['"hey"', '"everyone!!"', '"check"', '"out"', '"fork-my-brain"', '"🚀🚀"']
      },
      {
        label: 'Typing indicator with .repeat()',
        code: '// Show typing dots based on elapsed time\nconst dots = ".".repeat(3);  // "..."\n\n// Build a divider line\n"─".repeat(40); // "────────────────────────────────────────"\n\n// Pad or frame text\n"*".repeat(20); // "********************"',
        result: '"..." — typing indicator built',
        explain: '.repeat(n) returns the string repeated n times. Great for generating separators, loading indicators, or any repeated pattern without a loop.',
        items: [
          { n: '"..."', s: '.repeat(3)' },
          { n: '"────────────"', s: '.repeat(40)' }
        ],
        highlight: ['"..."', '"────────────"'], newItems: ['"..."', '"────────────"']
      }
    ]
  },
  {
    id: 'slug',
    icon: '🔗',
    label: 'URL slug builder',
    title: 'URL slug builder',
    sub: 'Turning blog titles into clean URL slugs — toLowerCase(), replace(), replaceAll(), trim()',
    steps: [
      {
        label: 'A blog post title to publish',
        code: 'const title = "  Hello World! Learn JS in 2025 🚀  ";',
        result: 'Raw title — needs to become a URL slug',
        explain: 'A URL slug must be lowercase, no special chars, spaces replaced by hyphens, no trailing/leading hyphens. We\'ll build it step by step using chained String methods.',
        items: [{ n: '"  Hello World! Learn JS in 2025 🚀  "', s: 'raw title' }],
        highlight: [], newItems: []
      },
      {
        label: 'Step 1 — .trim() the edges',
        code: 'const step1 = title.trim();\n// "Hello World! Learn JS in 2025 🚀"',
        result: '"Hello World! Learn JS in 2025 🚀"',
        explain: 'First remove all leading and trailing whitespace — otherwise our slug will start or end with a hyphen after replacing spaces.',
        items: [{ n: '"Hello World! Learn JS in 2025 🚀"', s: 'trimmed' }],
        highlight: ['"Hello World! Learn JS in 2025 🚀"'],
        newItems: ['"Hello World! Learn JS in 2025 🚀"']
      },
      {
        label: 'Step 2 — .toLowerCase() everything',
        code: 'const step2 = step1.toLowerCase();\n// "hello world! learn js in 2025 🚀"',
        result: '"hello world! learn js in 2025 🚀"',
        explain: '.toLowerCase() converts every character to lowercase. URLs are case-sensitive in most servers — using lowercase avoids duplicate URLs like /Hello vs /hello.',
        items: [{ n: '"hello world! learn js in 2025 🚀"', s: 'lowercased' }],
        highlight: ['"hello world! learn js in 2025 🚀"'],
        newItems: ['"hello world! learn js in 2025 🚀"']
      },
      {
        label: 'Step 3 — .replace() special chars with regex',
        code: '// Remove anything that is NOT a-z, 0-9, or space\nconst step3 = step2.replace(/[^a-z0-9\\s]+/g, "");\n// "hello world learn js in 2025 "',
        result: '"hello world learn js in 2025 "',
        explain: '.replace() with a regex /g flag replaces ALL matches. [^a-z0-9\\s] means "any character NOT a letter, digit, or space" — this strips emojis, punctuation, symbols.',
        items: [{ n: '"hello world learn js in 2025 "', s: 'stripped' }],
        highlight: ['"hello world learn js in 2025 "'],
        newItems: ['"hello world learn js in 2025 "']
      },
      {
        label: 'Step 4 — .replaceAll() spaces → hyphens',
        code: 'const step4 = step3.trim().replaceAll(" ", "-");\n// "hello-world-learn-js-in-2025"\n\n// Final slug:\nconsole.log(step4); // "hello-world-learn-js-in-2025"',
        result: '"hello-world-learn-js-in-2025" ✓',
        explain: '.replaceAll() replaces EVERY occurrence of the first argument. Here we replace every space with a hyphen to get the final URL-safe slug. We .trim() again to catch any trailing space before replacing.',
        items: [{ n: '"hello-world-learn-js-in-2025"', s: 'final slug ✓' }],
        highlight: ['"hello-world-learn-js-in-2025"'],
        newItems: ['"hello-world-learn-js-in-2025"']
      }
    ]
  },
  {
    id: 'receipt',
    icon: '🧾',
    label: 'Receipt formatter',
    title: 'Receipt formatter',
    sub: 'Padding and aligning text — padStart(), padEnd(), slice(), repeat()',
    steps: [
      {
        label: 'Items to print on a receipt',
        code: 'const items = [\n  { name: "Burger",  price: "₹249" },\n  { name: "Coke",    price: "₹60" },\n  { name: "Fries",   price: "₹120" },\n  { name: "Ice Cream", price: "₹89" },\n];',
        result: '4 items — need to align them neatly',
        explain: 'A receipt needs everything perfectly aligned — item names left-aligned, prices right-aligned, all on a fixed-width "paper". String padding methods make this easy.',
        items: [
          { n: 'Burger', s: '₹249' }, { n: 'Coke', s: '₹60' },
          { n: 'Fries', s: '₹120' }, { n: 'Ice Cream', s: '₹89' }
        ],
        highlight: [], newItems: []
      },
      {
        label: 'Truncate long names with .slice()',
        code: '// Limit name to 12 chars so receipt stays narrow\nconst name = "Ice Cream Sundae Special";\nconst short = name.slice(0, 12);\n// "Ice Cream Su"\n\n// Negative index — get last 4 chars\n"₹1,299".slice(-4); // "299"',
        result: '"Ice Cream Su" — truncated to 12 chars',
        explain: '.slice(start, end) extracts a substring. end is exclusive. Negative indices count from the end. Does NOT modify the original string.',
        items: [
          { n: '"Ice Cream Su"', s: '.slice(0,12)' },
          { n: '"299"', s: '.slice(-3)' }
        ],
        highlight: ['"Ice Cream Su"', '"299"'], newItems: ['"Ice Cream Su"', '"299"']
      },
      {
        label: 'Left-align names with .padEnd()',
        code: '// Pad name to 15 chars so prices line up\n"Burger".padEnd(15, ".");   // "Burger........." \n"Coke".padEnd(15, ".");     // "Coke..........." \n"Ice Cream".padEnd(15, "."); // "Ice Cream......"',
        result: 'Names padded to 15 chars on the right',
        explain: '.padEnd(targetLength, padString) adds padding to the RIGHT until the string reaches targetLength. The pad string repeats — great for dot leaders on receipts.',
        items: [
          { n: '"Burger........."', s: 'padEnd(15,".")' },
          { n: '"Coke..........."', s: 'padEnd(15,".")' },
          { n: '"Ice Cream......"', s: 'padEnd(15,".")' }
        ],
        highlight: ['"Burger........."', '"Coke..........."', '"Ice Cream......"'],
        newItems: ['"Burger........."', '"Coke..........."', '"Ice Cream......"']
      },
      {
        label: 'Right-align prices with .padStart()',
        code: '// Pad price to 6 chars so digits line up\n"₹249".padStart(6);   // "  ₹249"\n"₹60".padStart(6);    // "   ₹60"\n"₹1,299".padStart(6); // "₹1,299"',
        result: 'Prices right-aligned to 6 chars',
        explain: '.padStart(targetLength, padString) adds padding to the LEFT. Default pad is a space. This right-aligns numbers — the same trick spreadsheets use for currency columns.',
        items: [
          { n: '"  ₹249"', s: 'padStart(6)' },
          { n: '"   ₹60"', s: 'padStart(6)' },
          { n: '"₹1,299"', s: 'padStart(6)' }
        ],
        highlight: ['"  ₹249"', '"   ₹60"', '"₹1,299"'], newItems: ['"  ₹249"', '"   ₹60"', '"₹1,299"']
      },
      {
        label: 'Draw the divider with .repeat()',
        code: 'const line = "─".repeat(22);\n// "──────────────────────"\n\n// Full formatted receipt line:\n`${"Burger".padEnd(15,".")}${"₹249".padStart(6)}`\n// "Burger.........  ₹249"',
        result: '"Burger.........  ₹249" — perfectly aligned!',
        explain: '.repeat(n) builds the separator line in one expression. Combining padEnd + padStart + repeat gives a properly formatted monospace receipt with zero manual spacing.',
        items: [
          { n: '"──────────────────────"', s: '.repeat(22)' },
          { n: '"Burger.........  ₹249"', s: 'full line' },
          { n: '"Coke...........   ₹60"', s: 'full line' }
        ],
        highlight: ['"Burger.........  ₹249"', '"Coke...........   ₹60"'],
        newItems: ['"──────────────────────"', '"Burger.........  ₹249"', '"Coke...........   ₹60"']
      }
    ]
  },
  {
    id: 'search',
    icon: '🔍',
    label: 'Search & highlight',
    title: 'Search & highlight text',
    sub: 'Finding and extracting text — indexOf(), lastIndexOf(), substring(), match(), at()',
    steps: [
      {
        label: 'A blog article to search through',
        code: 'const article = "JavaScript is fun. Learn JavaScript today. JavaScript rocks!";',
        result: '62 character article loaded',
        explain: 'We want to find all occurrences of a keyword, extract context around it, and get character positions — exactly what search engines and editors do.',
        items: [{ n: '"JavaScript is fun. Learn JavaScript today. JavaScript rocks!"', s: '62 chars' }],
        highlight: [], newItems: []
      },
      {
        label: 'Find first occurrence with .indexOf()',
        code: 'article.indexOf("JavaScript");\n// 0  ← starts at index 0\n\narticle.indexOf("JavaScript", 5);\n// 25 ← search starting from index 5\n\narticle.indexOf("Python");\n// -1 ← not found',
        result: 'First "JavaScript" found at index 0',
        explain: '.indexOf() returns the index of the FIRST match, or -1 if not found. The optional second argument is where to start searching — useful for finding the next occurrence.',
        items: [
          { n: 'index: 0',  s: 'first match' },
          { n: 'index: 25', s: 'second match (start:5)' },
          { n: '-1',        s: '"Python" → not found', fail: true }
        ],
        highlight: ['index: 0', 'index: 25'], newItems: []
      },
      {
        label: 'Find last occurrence with .lastIndexOf()',
        code: 'article.lastIndexOf("JavaScript");\n// 43 ← last "JavaScript" is at index 43\n\n// Count all occurrences manually:\nlet count = 0, pos = 0;\nwhile ((pos = article.indexOf("JavaScript", pos)) !== -1) {\n  count++; pos++;\n}\n// count = 3',
        result: 'Last "JavaScript" at index 43, total: 3 matches',
        explain: '.lastIndexOf() searches from right to left. Combined with indexOf() in a loop, you can count all occurrences of any substring — the manual version of matchAll().',
        items: [
          { n: 'index: 43', s: 'last match' },
          { n: '3 total',   s: 'occurrences' }
        ],
        highlight: ['index: 43', '3 total'], newItems: ['index: 43', '3 total']
      },
      {
        label: 'Extract a snippet with .substring()',
        code: '// Get text around the first match (index 0)\nconst start = Math.max(0, 0 - 10);\nconst end   = Math.min(article.length, 0 + 20);\n\narticle.substring(start, end);\n// "JavaScript is fun. L"',
        result: '"JavaScript is fun. L" — context extracted',
        explain: '.substring(start, end) extracts characters between two indices (end exclusive). Unlike .slice(), it swaps arguments if start > end rather than returning "". Good for safe snippets.',
        items: [
          { n: '"JavaScript is fun. L"', s: 'substring(0, 20)' }
        ],
        highlight: ['"JavaScript is fun. L"'], newItems: ['"JavaScript is fun. L"']
      },
      {
        label: 'Find ALL matches with .match()',
        code: '// With /g flag — returns array of all matches\nconst matches = article.match(/JavaScript/g);\n// ["JavaScript", "JavaScript", "JavaScript"]\n\nmatches.length; // 3\n\n// With capture groups:\narticle.match(/(JavaScript)\\s(\\w+)/)?.[0];\n// "JavaScript is"',
        result: '["JavaScript","JavaScript","JavaScript"] — 3 matches',
        explain: '.match() with the /g (global) regex flag returns ALL matches as an array, or null if none found. Without /g, it returns the first match plus capture groups. Use .matchAll() for all matches WITH groups.',
        items: [
          { n: '"JavaScript"', s: 'match[0]' },
          { n: '"JavaScript"', s: 'match[1]' },
          { n: '"JavaScript"', s: 'match[2]' }
        ],
        highlight: ['"JavaScript"'], newItems: ['"JavaScript"', '"JavaScript"', '"JavaScript"']
      }
    ]
  }
];
