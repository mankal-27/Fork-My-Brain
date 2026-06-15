const SCENARIOS = [
  {
    id: 'queue',
    icon: '☕',
    label: 'Coffee shop queue',
    title: 'Coffee shop queue',
    sub: 'Customers joining and leaving — push(), pop(), shift(), unshift()',
    steps: [
      {
        label: 'Opening time — queue is empty',
        code: 'const queue = [];',
        result: 'queue = []',
        explain: 'The shop opens. No customers yet — our array is empty.',
        items: [],
        highlight: [],
        newItems: []
      },
      {
        label: 'Three customers arrive',
        code: "queue.push('Priya', 'Rahul', 'Meena');\n// returns 3 (new length)",
        result: "queue = ['Priya', 'Rahul', 'Meena']",
        explain: '.push() adds elements to the END of the array. Customers join the back of the queue. Returns the new array length.',
        items: [
          { n: 'Priya', s: '#1' },
          { n: 'Rahul', s: '#2' },
          { n: 'Meena', s: '#3' }
        ],
        highlight: ['Priya', 'Rahul', 'Meena'],
        newItems: ['Priya', 'Rahul', 'Meena']
      },
      {
        label: 'VIP customer jumps to the front',
        code: "queue.unshift('Arjun');\n// returns 4 (new length)",
        result: "queue = ['Arjun', 'Priya', 'Rahul', 'Meena']",
        explain: '.unshift() adds to the FRONT. Arjun skips the queue! Everyone else shifts back by one index.',
        items: [
          { n: 'Arjun', s: 'VIP' },
          { n: 'Priya', s: '#2' },
          { n: 'Rahul', s: '#3' },
          { n: 'Meena', s: '#4' }
        ],
        highlight: ['Arjun'],
        newItems: ['Arjun']
      },
      {
        label: 'Barista serves the first customer',
        code: "const served = queue.shift();\n// served = 'Arjun'",
        result: "served = 'Arjun'  |  queue = ['Priya', 'Rahul', 'Meena']",
        explain: '.shift() removes the FIRST element and returns it. Arjun gets served — everyone else moves forward.',
        items: [
          { n: 'Priya', s: '#1' },
          { n: 'Rahul', s: '#2' },
          { n: 'Meena', s: '#3' }
        ],
        highlight: [],
        newItems: []
      },
      {
        label: 'Last customer leaves (too long a wait)',
        code: "const left = queue.pop();\n// left = 'Meena'",
        result: "left = 'Meena'  |  queue = ['Priya', 'Rahul']",
        explain: '.pop() removes the LAST element and returns it. Meena got tired of waiting and left.',
        items: [
          { n: 'Priya', s: '#1' },
          { n: 'Rahul', s: '#2' }
        ],
        highlight: [],
        newItems: []
      }
    ]
  },
  {
    id: 'cart',
    icon: '🛒',
    label: 'Shopping cart',
    title: 'E-commerce shopping cart',
    sub: 'Filtering, transforming and totalling — filter(), map(), reduce()',
    steps: [
      {
        label: 'Cart has 4 items',
        code: "const cart = [\n  { name: 'Shoes',  price: 2499 },\n  { name: 'T-Shirt', price: 799 },\n  { name: 'Hat',    price: 399 },\n  { name: 'Socks',  price: 149 },\n];",
        result: '4 items in cart',
        explain: 'A customer has 4 items in their cart — a mix of prices.',
        items: [
          { n: 'Shoes', s: '₹2,499' },
          { n: 'T-Shirt', s: '₹799' },
          { n: 'Hat', s: '₹399' },
          { n: 'Socks', s: '₹149' }
        ],
        highlight: [],
        newItems: []
      },
      {
        label: 'Filter items under ₹500 (budget mode)',
        code: "const budget = cart.filter(item => item.price < 500);\n// Original cart is NOT changed",
        result: "budget = [Hat ₹399, Socks ₹149]",
        explain: '.filter() returns a NEW array — only elements where the callback returns true are kept. Shoes and T-Shirt are excluded. The original cart is unchanged.',
        items: [
          { n: 'Shoes', s: '₹2,499', dim: true },
          { n: 'T-Shirt', s: '₹799', dim: true },
          { n: 'Hat', s: '₹399' },
          { n: 'Socks', s: '₹149' }
        ],
        highlight: ['Hat', 'Socks'],
        newItems: [],
        resultItems: [{ n: 'Hat', s: '₹399' }, { n: 'Socks', s: '₹149' }]
      },
      {
        label: 'Apply 10% sale discount with map()',
        code: "const discounted = cart.map(item => ({\n  ...item,\n  price: Math.round(item.price * 0.9)\n}));\n// Returns a brand-new array",
        result: 'Every price reduced by 10%',
        explain: '.map() transforms EVERY element and returns a new array of the SAME length. Perfect for applying a discount to all items. Original cart is still unchanged.',
        items: [
          { n: 'Shoes', s: '₹2,249' },
          { n: 'T-Shirt', s: '₹719' },
          { n: 'Hat', s: '₹359' },
          { n: 'Socks', s: '₹134' }
        ],
        highlight: ['Shoes', 'T-Shirt', 'Hat', 'Socks'],
        newItems: []
      },
      {
        label: 'Calculate total with reduce()',
        code: "const total = cart.reduce((sum, item) => {\n  return sum + item.price;\n}, 0);\n// → 3846",
        result: 'total = ₹3,846',
        explain: '.reduce() accumulates ALL values into a SINGLE result. It starts with 0, then adds each price one by one: 0 → 2499 → 3298 → 3697 → 3846.',
        items: [
          { n: 'Shoes', s: '₹2,499' },
          { n: 'T-Shirt', s: '₹799' },
          { n: 'Hat', s: '₹399' },
          { n: 'Socks', s: '₹149' }
        ],
        highlight: ['Shoes', 'T-Shirt', 'Hat', 'Socks'],
        newItems: [],
        totalBadge: 'Total: ₹3,846'
      }
    ]
  },
  {
    id: 'playlist',
    icon: '🎵',
    label: 'Music playlist',
    title: 'Music playlist manager',
    sub: 'Sorting, finding and navigating — sort(), reverse(), find(), at()',
    steps: [
      {
        label: 'Your playlist — 5 songs loaded',
        code: "const playlist = [\n  { title: 'Kesariya',   plays: 12000 },\n  { title: 'Calm Down',  plays: 8000  },\n  { title: 'Levitating', plays: 15000 },\n  { title: 'Blinding',   plays: 21000 },\n  { title: 'Shape of U', plays: 9000  },\n];",
        result: '5 songs ready',
        explain: 'A playlist with 5 songs and their play counts. They are in random order right now.',
        items: [
          { n: 'Kesariya', s: '12k plays' },
          { n: 'Calm Down', s: '8k plays' },
          { n: 'Levitating', s: '15k plays' },
          { n: 'Blinding', s: '21k plays' },
          { n: 'Shape of U', s: '9k plays' }
        ],
        highlight: [],
        newItems: []
      },
      {
        label: 'Sort by most played (descending)',
        code: "playlist.sort((a, b) => b.plays - a.plays);\n// ⚠️  MUTATES the original array",
        result: 'Blinding → Levitating → Kesariya → Shape of U → Calm Down',
        explain: '.sort() reorders IN-PLACE. The comparator (b - a) gives descending order. If result is negative, a comes first; positive, b comes first. The original array is changed.',
        items: [
          { n: 'Blinding', s: '21k' },
          { n: 'Levitating', s: '15k' },
          { n: 'Kesariya', s: '12k' },
          { n: 'Shape of U', s: '9k' },
          { n: 'Calm Down', s: '8k' }
        ],
        highlight: ['Blinding', 'Levitating'],
        newItems: []
      },
      {
        label: 'Reverse to get least played first',
        code: "playlist.reverse();\n// ⚠️  Also MUTATES in-place\n// Use .toReversed() for a safe copy",
        result: 'Calm Down → Shape of U → Kesariya → Levitating → Blinding',
        explain: '.reverse() flips the order IN-PLACE. Now least-played songs are at the front — great for discovering forgotten tracks.',
        items: [
          { n: 'Calm Down', s: '8k' },
          { n: 'Shape of U', s: '9k' },
          { n: 'Kesariya', s: '12k' },
          { n: 'Levitating', s: '15k' },
          { n: 'Blinding', s: '21k' }
        ],
        highlight: ['Calm Down', 'Shape of U'],
        newItems: []
      },
      {
        label: 'Find a specific song',
        code: "const song = playlist.find(s => s.title === 'Kesariya');\n// Returns the OBJECT, not just true/false",
        result: "song = { title: 'Kesariya', plays: 12000 }",
        explain: ".find() returns the FIRST element where the callback returns true. It stops searching immediately when found — great for looking up records by ID or name.",
        items: [
          { n: 'Calm Down', s: '8k', dim: true },
          { n: 'Shape of U', s: '9k', dim: true },
          { n: 'Kesariya', s: '12k' },
          { n: 'Levitating', s: '15k', dim: true },
          { n: 'Blinding', s: '21k', dim: true }
        ],
        highlight: ['Kesariya'],
        newItems: []
      },
      {
        label: 'Get the last song with .at(-1)',
        code: "const last = playlist.at(-1);\n// Much cleaner than: playlist[playlist.length - 1]",
        result: "last = { title: 'Blinding', plays: 21000 }",
        explain: ".at() accepts negative indices that count from the END. -1 = last, -2 = second to last, and so on. Much more readable than the old length-1 trick.",
        items: [
          { n: 'Calm Down', s: '8k', dim: true },
          { n: 'Shape of U', s: '9k', dim: true },
          { n: 'Kesariya', s: '12k', dim: true },
          { n: 'Levitating', s: '15k', dim: true },
          { n: 'Blinding', s: '21k' }
        ],
        highlight: ['Blinding'],
        newItems: []
      }
    ]
  },
  {
    id: 'students',
    icon: '📚',
    label: 'Student grades',
    title: 'Student grade report',
    sub: 'Checking, searching and flattening — every(), some(), includes(), flat()',
    steps: [
      {
        label: 'Class results are in — 7 students',
        code: 'const grades = [88, 92, 45, 76, 55, 98, 67];',
        result: '7 students graded',
        explain: 'The class results have arrived — a mixed bag of scores from 45 to 98.',
        items: [
          { n: '88' }, { n: '92' }, { n: '45' }, { n: '76' },
          { n: '55' }, { n: '98' }, { n: '67' }
        ],
        highlight: [],
        newItems: []
      },
      {
        label: 'Did EVERYONE pass? (pass mark = 50)',
        code: "const allPassed = grades.every(g => g >= 50);\n// Short-circuits — stops at first failure",
        result: 'allPassed = false  (45 failed)',
        explain: '.every() checks ALL elements. It finds 45 at index 2 and immediately returns false — no need to check the rest. Like asking "is this true for every single one?"',
        items: [
          { n: '88' }, { n: '92' }, { n: '45', fail: true }, { n: '76' },
          { n: '55' }, { n: '98' }, { n: '67' }
        ],
        highlight: ['45'],
        newItems: []
      },
      {
        label: 'Did ANYONE score above 90?',
        code: "const hasToppers = grades.some(g => g >= 90);\n// Short-circuits — stops at first match",
        result: 'hasToppers = true  (92 at index 1 found!)',
        explain: '.some() stops at the FIRST match. Checks 88 (no), then 92 (yes!) — immediately returns true. Like asking "does at least one qualify?"',
        items: [
          { n: '88', dim: true }, { n: '92' }, { n: '45', dim: true }, { n: '76', dim: true },
          { n: '55', dim: true }, { n: '98' }, { n: '67', dim: true }
        ],
        highlight: ['92', '98'],
        newItems: []
      },
      {
        label: 'Is the score 76 in the results?',
        code: "grades.includes(76);\n// → true\ngrades.includes(100);\n// → false",
        result: 'true — 76 is in the array',
        explain: '.includes() is the simplest way to check existence. It uses SameValueZero equality — cleaner than checking indexOf() !== -1. Also correctly finds NaN, unlike indexOf.',
        items: [
          { n: '88', dim: true }, { n: '92', dim: true }, { n: '45', dim: true }, { n: '76' },
          { n: '55', dim: true }, { n: '98', dim: true }, { n: '67', dim: true }
        ],
        highlight: ['76'],
        newItems: []
      },
      {
        label: 'Flatten two classes into one list',
        code: "const classA = [88, 92, 45];\nconst classB = [76, 55, 98];\nconst all = [classA, classB].flat();\n// Merges nested arrays one level deep",
        result: 'all = [88, 92, 45, 76, 55, 98]',
        explain: '.flat() merges nested arrays into one. Without it you would have [[88,92,45],[76,55,98]]. Use flat(Infinity) to flatten any depth.',
        items: [
          { n: '88', s: 'A' }, { n: '92', s: 'A' }, { n: '45', s: 'A' },
          { n: '76', s: 'B' }, { n: '55', s: 'B' }, { n: '98', s: 'B' }
        ],
        highlight: ['88', '92', '45', '76', '55', '98'],
        newItems: ['88', '92', '45', '76', '55', '98']
      }
    ]
  },
  {
    id: 'delivery',
    icon: '🛵',
    label: 'Food delivery',
    title: 'Food delivery orders',
    sub: 'Adding, removing and merging — splice(), slice(), indexOf(), concat()',
    steps: [
      {
        label: '5 orders waiting in the kitchen',
        code: "const orders = ['Burger','Pizza','Dosa','Biryani','Pasta'];",
        result: '5 orders pending',
        explain: 'The kitchen queue has 5 orders to prepare in sequence.',
        items: [
          { n: 'Burger', s: '#1' }, { n: 'Pizza', s: '#2' }, { n: 'Dosa', s: '#3' },
          { n: 'Biryani', s: '#4' }, { n: 'Pasta', s: '#5' }
        ],
        highlight: [],
        newItems: []
      },
      {
        label: 'Customer cancels Pizza',
        code: "const idx = orders.indexOf('Pizza'); // → 1\norders.splice(idx, 1);\n// Remove 1 element at index 1",
        result: "orders = ['Burger','Dosa','Biryani','Pasta']",
        explain: '.indexOf() finds where Pizza is (index 1). Then .splice(1, 1) removes exactly 1 element at that position. Elements after it shift forward.',
        items: [
          { n: 'Burger', s: '#1' }, { n: 'Dosa', s: '#2' },
          { n: 'Biryani', s: '#3' }, { n: 'Pasta', s: '#4' }
        ],
        highlight: [],
        newItems: []
      },
      {
        label: 'Insert an urgent order at position 2',
        code: "orders.splice(1, 0, 'Urgent Thali');\n// splice(start, deleteCount=0, newItem)",
        result: "orders = ['Burger','Urgent Thali','Dosa','Biryani','Pasta']",
        explain: '.splice(1, 0, item) inserts WITHOUT removing anything — deleteCount is 0. The Urgent Thali jumps to second place.',
        items: [
          { n: 'Burger', s: '#1' }, { n: 'Thali', s: 'URGENT' }, { n: 'Dosa', s: '#3' },
          { n: 'Biryani', s: '#4' }, { n: 'Pasta', s: '#5' }
        ],
        highlight: ['Thali'],
        newItems: ['Thali']
      },
      {
        label: 'Preview the next 2 orders (non-destructive)',
        code: "const preview = orders.slice(0, 2);\n// Does NOT remove items from orders",
        result: "preview = ['Burger', 'Urgent Thali']",
        explain: '.slice() is NON-DESTRUCTIVE — it copies a portion without touching the original. The orders queue stays intact. Think of it as a window into the array.',
        items: [
          { n: 'Burger', s: '#1' }, { n: 'Thali', s: 'URGENT' }, { n: 'Dosa', s: '#3', dim: true },
          { n: 'Biryani', s: '#4', dim: true }, { n: 'Pasta', s: '#5', dim: true }
        ],
        highlight: ['Burger', 'Thali'],
        newItems: [],
        resultItems: [{ n: 'Burger', s: '#1' }, { n: 'Thali', s: 'URGENT' }]
      },
      {
        label: 'Merge yesterday\'s backlog with today',
        code: "const yesterday = ['Idli', 'Chai'];\nconst today = ['Burger', 'Thali'];\nconst allOrders = yesterday.concat(today);\n// Neither original array is modified",
        result: "allOrders = ['Idli','Chai','Burger','Thali']",
        explain: '.concat() creates a BRAND NEW merged array. Both original arrays remain unchanged — great for combining lists safely.',
        items: [
          { n: 'Idli', s: 'backlog' }, { n: 'Chai', s: 'backlog' },
          { n: 'Burger', s: 'today' }, { n: 'Thali', s: 'today' }
        ],
        highlight: ['Idli', 'Chai', 'Burger', 'Thali'],
        newItems: []
      }
    ]
  }
];
