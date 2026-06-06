export const products = [
  {
    id: 1,
    name: 'Lumiq Desk Pro',
    tagline: 'Precision lighting for your workspace.',
    price: 89,
    originalPrice: 119,
    variants: ['Warm White', 'Neutral', 'Cool Daylight'],
    defaultVariant: 'Neutral',
    badge: 'Best Seller',
    features: [
      'Adjustable 2700K–6500K color temperature',
      'Touch dimmer with memory recall',
      'USB-C pass-through charging',
      'Mounts to any monitor up to 35"',
    ],
    description:
      'The Desk Pro brings studio-quality lighting to your everyday setup. Engineered for creators, developers, and anyone who demands perfect light.',
    image: '/images/desk-lamp-pro.jpg', // replace with actual image path
    accentColor: '#F5A623',
  },
  {
    id: 2,
    name: 'Lumiq Ambient',
    tagline: 'Set the mood in any room.',
    price: 49,
    originalPrice: 69,
    variants: ['Warm White', 'Neutral', 'Cool Daylight'],
    defaultVariant: 'Warm White',
    badge: 'New',
    features: [
      'Works with Lumiq App (iOS & Android)',
      '16 million color options',
      'Voice assistant compatible',
      'Pack of 2 smart bulbs',
    ],
    description:
      'Transform any space with intelligent color and brightness. Schedule scenes, sync to music, or let Lumiq learn your routine.',
    image: '/images/ambient-lamp.jpg',
    accentColor: '#7FFFD4',
  },
  {
    id: 3,
    name: 'Lumiq Arc',
    tagline: 'A statement piece that thinks for itself.',
    price: 199,
    originalPrice: 249,
    variants: ['Matte Black', 'Pearl White'],
    defaultVariant: 'Matte Black',
    badge: 'Premium',
    features: [
      'Adaptive ambient sensing',
      'Gesture control support',
      'Built-in Lumiq Hub — controls up to 10 devices',
      'Premium aluminum construction',
    ],
    description:
      'The Arc isn\'t just a floor lamp — it\'s the centerpiece of a smarter home. Its sensor detects your environment and adjusts automatically.',
    image: '/images/arc-lamp-2.jpg',
    accentColor: '#F5A623',
  },
]

export const getProductById = (id) =>
  products.find((p) => p.id === parseInt(id))
