/* ==========================================================================
   AURA Sound Labs — Product & Configuration Database
   ========================================================================== */

   const USD_BENCHMARK = 83.0;

   const PRODUCTS = [
     {
       id: 'pulse-360',
       name: 'AURA Pulse 360',
       category: 'studio',
       tagline: 'Omnidirectional spatial sound with dual balanced radiators.',
       description: 'Engineered with a 360° cylindrical acoustic array. Houses two 2.5-inch neodymium woofers and twin silk dome tweeters driven by an internal 65W DSP amplifier.',
       priceINR: 14999,
       regularINR: 17999,
       rating: 4.9,
       reviews: 418,
       badge: '65W RMS',
       finishes: [
         { name: 'Obsidian Black', color: '#111827', img: '/AURA Pulse 360 — Cylindrical 360° speaker.jpg' },
         { name: 'Glacier Silver', color: '#cbd5e1', img: '/AURA Pulse 360 — Cylindrical 360° speaker Glacier Silver.jpg' },
         { name: 'Nordic Forest', color: '#273b33', img: '/AURA Pulse 360 — Cylindrical 360° speaker Nordic Forest.jpeg' }
       ],
       specs: {
         'Acoustic Output': '65W RMS Peak Bi-Amp',
         'Battery Stamina': '30 Hours (9,600 mAh)',
         'Water Resistance': 'IP67 Submersible',
         'Dimensions': '210 mm × 98 mm',
         'Weight': '940 g',
         'Bluetooth Version': 'v5.3 Low Energy + LDAC'
       }
     },
     {
       id: 'mini-pocket',
       name: 'AURA Mini Pocket',
       category: 'portable',
       tagline: 'Pocket-sized ultra-lightweight travel acoustics.',
       description: 'Milled from a single block of anodized aluminum. Delivers room-filling acoustic volume with an integrated carabiner anchor and 16 hours of continuous playback.',
       priceINR: 5999,
       regularINR: 7499,
       rating: 4.8,
       reviews: 295,
       badge: '25W RMS',
       finishes: [
         { name: 'Graphite Grey', color: '#1e293b', img: '/AURA Mini Pocket — Small portable speaker.jpeg' },
         { name: 'Desert Sand', color: '#d4b996', img: '/AURA Mini Pocket — Small portable speaker Desert Sand.png' }
       ],
       specs: {
         'Acoustic Output': '25W RMS Single Driver',
         'Battery Stamina': '16 Hours (3,200 mAh)',
         'Water Resistance': 'IP67 Dust & Waterproof',
         'Dimensions': '110 mm × 85 mm',
         'Weight': '360 g',
         'Bluetooth Version': 'v5.3 Low Latency'
       }
     },
     {
       id: 'stage-max',
       name: 'AURA Stage Max',
       category: 'power',
       tagline: '120W Bi-amplified outdoor festival & event speaker.',
       description: 'Built for large gatherings and outdoor performance. Features dual 5.25-inch long-throw woofers, dual compression horns, and multi-speaker party linking.',
       priceINR: 27999,
       regularINR: 32999,
       rating: 5.0,
       reviews: 142,
       badge: '120W RMS',
       finishes: [
         { name: 'Matte Stealth', color: '#0f172a', img: '/AURA Stage Max — Large partyoutdoor speaker.jpg' }
       ],
       specs: {
         'Acoustic Output': '120W RMS Continuous',
         'Battery Stamina': '40 Hours (20,000 mAh)',
         'Water Resistance': 'IPX5 Splashproof',
         'Dimensions': '380 mm × 180 mm',
         'Weight': '3,800 g',
         'Bluetooth Version': 'v5.3 Multi-Pair'
       }
     },
     {
       id: 'studio-bar',
       name: 'AURA Studio Bar',
       category: 'studio',
       tagline: 'Architectural desktop Hi-Fi soundbar with HDMI eARC.',
       description: 'Engineered for creator workstations and luxury entertainment desks. Seamlessly switches between ultra-low-latency Bluetooth 5.3 and optical digital inputs.',
       priceINR: 19999,
       regularINR: 23999,
       rating: 4.9,
       reviews: 210,
       badge: '80W Spatial',
       finishes: [
         { name: 'Space Silver', color: '#94a3b8', img: '/AURA Studio Bar — Desktop soundbar.jpg' },
         { name: 'Obsidian Shadow', color: '#090d16', img: '/AURA Studio Bar — Desktop soundbar Obsidian Shadow .jpg' }
       ],
       specs: {
         'Acoustic Output': '80W 4-Channel Spatial',
         'Battery Stamina': '18 Hours or AC Direct',
         'Water Resistance': 'Indoor Acoustic Shield',
         'Dimensions': '560 mm × 70 mm',
         'Weight': '1,650 g',
         'Bluetooth Version': 'v5.3 + Optical + eARC'
       }
     },
     {
       id: 'aura-sphere',
       name: 'AURA Sphere',
       category: 'studio',
       tagline: 'Levitation-inspired 360° omnidirectional spatial sound system.',
       description: 'The world\'s first levitation-inspired speaker with neural acoustic calibration. Features a toroidal diffuser that radiates true spherical waves adapted to your room in real time.',
       priceINR: 28999,
       regularINR: 34999,
       rating: 4.96,
       reviews: 2400,
       badge: '360° Spatial',
       finishes: [
         { name: 'Matte Obsidian', color: '#0d1117', img: '/AURA Sphere ⭐ — Roundlevitating speaker (FLAGSHIP).jpeg' },
         { name: 'Starlight Titanium', color: '#cbd5e1', img: '/AURA Sphere ⭐ — Roundlevitating speaker (FLAGSHIP) Starlight Titanium.jpg' },
         { name: 'Cosmic Aurora', color: '#7e22ce', img: '/AURA Sphere ⭐ — Roundlevitating speaker (FLAGSHIP) Cosmic Aurora.jpeg' }
       ],
       specs: {
         'Acoustic Output': '48Hz–24kHz, 105dB Peak',
         'Battery Stamina': '48 Hours (Fast MagDock)',
         'Water Resistance': 'IPX4 Splashproof',
         'Dimensions': 'Ø 180 mm × 180 mm',
         'Weight': '1,200 g',
         'Bluetooth Version': 'LDAC + aptX Lossless + Wi-Fi 7'
       }
     },
     {
       id: 'aura-desktop',
       name: 'AURA Desktop Pro',
       category: 'studio',
       tagline: 'Near-field reference monitors for critical listening.',
       description: 'Active bi-amplified near-field monitors tuned for mastering suites and mixing studios. Features Kevlar woofers and ribbon tweeters with XLR and TRS inputs.',
       priceINR: 34999,
       regularINR: 39999,
       rating: 4.9,
       reviews: 87,
       badge: '100W Bi-Amp',
       finishes: [
         { name: 'Studio Black', color: '#0a0a0a', img: '/AURA Desktop Pro — Near-field studio monitors.jpeg' }
       ],
       specs: {
         'Acoustic Output': '100W RMS (50W × 2)',
         'Battery Stamina': 'AC Powered Only',
         'Water Resistance': 'Indoor',
         'Dimensions': '220 mm × 160 mm × 180 mm',
         'Weight': '2,400 g (each)',
         'Inputs': 'XLR + TRS + RCA'
       }
     },
     {
       id: 'aura-trail',
       name: 'AURA Trail Mini',
       category: 'portable',
       tagline: 'Rugged ultra-portable with carabiner mount.',
       description: 'IP68-rated ultra-portable speaker with a shock-absorbing silicone cage. Weighs just 280g with a 20-hour battery and built-in carabiner clip.',
       priceINR: 3999,
       regularINR: 4999,
       rating: 4.7,
       reviews: 512,
       badge: '15W RMS',
       finishes: [
         { name: 'Lava Orange', color: '#ea580c', img: '/AURA Trail Mini — Rugged ultra-portable Lava Orange.png' },
         { name: 'Glacier Blue', color: '#0ea5e9', img: '/AURA Trail Mini — Rugged ultra-portable Glacier Blue.jpg' },
         { name: 'Forest Green', color: '#166534', img: '/AURA Trail Mini — Rugged ultra-portable Forest Green.png' }
       ],
       specs: {
         'Acoustic Output': '15W RMS Single Driver',
         'Battery Stamina': '20 Hours (2,500 mAh)',
         'Water Resistance': 'IP68 Dust & Waterproof',
         'Dimensions': '95 mm × 75 mm',
         'Weight': '280 g',
         'Bluetooth Version': 'v5.3'
       }
     },
     {
       id: 'aura-cinema',
       name: 'AURA Cinema Bar',
       category: 'power',
       tagline: '7.1.2 Dolby Atmos soundbar with wireless subwoofer.',
       description: 'A full home-theater system in a single bar. Features 9 discrete drivers, upward-firing Atmos height channels, and a wireless 8-inch subwoofer.',
       priceINR: 45999,
       regularINR: 54999,
       rating: 4.85,
       reviews: 178,
       badge: '7.1.2 Atmos',
       finishes: [
         { name: 'Matte Black', color: '#0f172a', img: '/AURA Cinema Bar — Dolby Atmos soundbar + subwoofer.png' }
       ],
       specs: {
         'Acoustic Output': '320W Total System',
         'Battery Stamina': 'AC Powered Only',
         'Water Resistance': 'Indoor',
         'Dimensions': '1,050 mm × 65 mm',
         'Weight': '3,200 g + Subwoofer',
         'Inputs': 'HDMI eARC + Optical + BT 5.3'
       }
     }
   ];
   
   const CATEGORIES = {
     all: 'All Models',
     portable: 'Ultra-Portable',
     studio: 'Studio & Spatial',
     power: 'High-Power Outdoor'
   };
   
   const DELIVERY_RATES = {
     standard:  { name: 'Standard Ground Express (3–5 Days)', feeINR: 0,   feeUSD: 0  },
     priority:  { name: 'Air Priority Dispatch (Next-Day)',   feeINR: 499, feeUSD: 6  },
     hyperlocal:{ name: 'Hyper-Local Express (Within 4 Hours)', feeINR: 799, feeUSD: 10 }
   };
   
   // Export to global scope (classic script)
   window.PRODUCTS = PRODUCTS;
   window.CATEGORIES = CATEGORIES;
   window.DELIVERY_RATES = DELIVERY_RATES;
   window.USD_BENCHMARK = USD_BENCHMARK;