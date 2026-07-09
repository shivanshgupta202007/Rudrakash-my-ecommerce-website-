import { Product, Coupon } from './types';

export const CATEGORIES = [
  { id: 'gifts', name: 'Gifts', icon: 'Gift', description: 'Curated premium hampers & bespoke tokens' },
  { id: 'personalized', name: 'Personalized Gifts', icon: 'Sparkles', description: 'Engraved jewelry, custom photo frames & keepsakes' },
  { id: 'clothing', name: 'Clothing', icon: 'Shirt', description: 'Royal silk sarees, premium linen shirts & designer ethnic wear' },
  { id: 'home', name: 'Home Essentials', icon: 'Home', description: 'Luxury bedsheets, scented soy candles & artistic decor' },
  { id: 'kitchen', name: 'Kitchen Items', icon: 'ChefHat', description: 'Pure hammered copper bottles, cast iron cookware & tools' },
  { id: 'electronics', name: 'Electronics', icon: 'Tv', description: 'Smartwatches, portable premium speakers & home audio' },
  { id: 'accessories', name: 'Mobile Accessories', icon: 'Smartphone', description: 'Premium leather phone cases, magnetic chargers & stands' },
  { id: 'beauty', name: 'Beauty Products', icon: 'Palette', description: 'Organic saffron facial oils, natural clays & ayurvedic sets' },
  { id: 'toys', name: 'Toys', icon: 'Gamepad2', description: 'Eco-friendly wooden toys, educational games & puzzles' },
  { id: 'sports', name: 'Sports', icon: 'Trophy', description: 'Premium yoga mats, gym duffel bags & sports gears' },
  { id: 'stationery', name: 'Stationery', icon: 'PenTool', description: 'Handcrafted leather journals, calligraphy sets & planner pads' },
  { id: 'festival', name: 'Festival Products', icon: 'Flame', description: 'Handmade clay diyas, festive brass lamps & puja thalis' }
];

export const BRANDS = [
  { name: 'Kashi Craft', logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&h=100&q=80' },
  { name: 'Rudrakash Gold', logo: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=200&h=100&q=80' },
  { name: 'Vedic Loom', logo: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=200&h=100&q=80' },
  { name: 'Avani Organics', logo: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=200&h=100&q=80' },
  { name: 'Shiva Alloys', logo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=200&h=100&q=80' }
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'rud-001',
    name: 'Bespoke Engraved Wooden Photo Frame',
    description: 'Beautifully handcrafted solid teak wood photo frame, custom engraved with your initials, name, or a special date. Perfect for gifting on anniversaries, weddings, or milestones.',
    price: 1299,
    originalPrice: 1999,
    discount: 35,
    category: 'Personalized Gifts',
    images: [
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544273677-c433136021d4?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.8,
    reviewsCount: 142,
    brand: 'Kashi Craft',
    stock: 25,
    isBestSeller: true,
    isTrending: true,
    customizationAvailable: true,
    sizes: ['6x8 Inches', '8x10 Inches', '12x15 Inches'],
    colors: ['Teak Brown', 'Dark Mahogany', 'Oak Natural'],
    specs: [
      { name: 'Material', value: '100% Solid Teak Wood' },
      { name: 'Engraving Type', value: 'High-Precision Laser Etching' },
      { name: 'Orientation', value: 'Dual Mode (Portrait or Landscape)' },
      { name: 'Country of Origin', value: 'India' }
    ],
    reviews: [
      { id: 'rev-1', userName: 'Shivansh Gupta', userEmail: 'shivanshgupta202007@gmail.com', rating: 5, comment: 'Exceptional finish and premium look! The wooden smell is authentic. Highly recommended as a gift.', date: '2026-06-25', helpfulCount: 14 },
      { id: 'rev-2', userName: 'Priyanka Sharma', userEmail: 'priyanka@gmail.com', rating: 4, comment: 'Very elegant engraving. Just took 1 day extra to customize, but worth the wait!', date: '2026-07-02', helpfulCount: 8 }
    ]
  },
  {
    id: 'rud-002',
    name: 'Royal Blue Handwoven Banarasi Silk Saree',
    description: 'An exquisite luxury Banarasi silk saree made from premium mulberry silk and adorned with intricate gold zari (brocade) work. Designed for grand weddings and festivals.',
    price: 8999,
    originalPrice: 14999,
    discount: 40,
    category: 'Clothing',
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.9,
    reviewsCount: 88,
    brand: 'Vedic Loom',
    stock: 8,
    isBestSeller: true,
    isFestivalOffer: true,
    colors: ['Royal Blue', 'Deep Crimson', 'Emerald Green'],
    specs: [
      { name: 'Fabric', value: 'Katan Silk (Pure Banarasi)' },
      { name: 'Zari Type', value: 'Pure Gold Plated Thread' },
      { name: 'Length', value: '5.5 meters + 0.8 meters blouse piece' },
      { name: 'Care', value: 'Dry Clean Only' }
    ],
    reviews: [
      { id: 'rev-3', userName: 'Aditi Roy', userEmail: 'aditi@gmail.com', rating: 5, comment: 'The sheen of this saree is outstanding. Felt like royalty wearing it. Authentic Banarasi weaves.', date: '2026-06-18', helpfulCount: 22 }
    ]
  },
  {
    id: 'rud-003',
    name: 'Pure Hammered Copper Water Carafe Set',
    description: 'A traditional yet contemporary health-boosting set consisting of a hammered pure copper bottle and two complementary tumblers. Scientifically proven Ayurvedic benefits.',
    price: 1899,
    originalPrice: 2999,
    discount: 37,
    category: 'Kitchen Items',
    images: [
      'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1608889174639-414d9f692d8e?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.7,
    reviewsCount: 215,
    brand: 'Shiva Alloys',
    stock: 32,
    isTodayDeal: true,
    isTrending: true,
    specs: [
      { name: 'Material', value: '99.6% Pure Hammered Copper' },
      { name: 'Capacity', value: 'Bottle: 1000ml, Tumblers: 300ml each' },
      { name: 'Finish', value: 'Lacquer coated exterior to prevent tarnish' },
      { name: 'Weight', value: '480g' }
    ],
    reviews: [
      { id: 'rev-4', userName: 'Rajesh Kumar', userEmail: 'rajesh@gmail.com', rating: 5, comment: 'Beautiful handcrafted finish. Water stays cold and tastes clean. Excellent health supplement.', date: '2026-07-01', helpfulCount: 19 }
    ]
  },
  {
    id: 'rud-004',
    name: 'Pure Kumkumadi Saffron Miracle Elixir',
    description: 'Formulated with premium Kashmiri Saffron, Sandalwood, and 26 precious Ayurvedic herbs, this skin-brightening facial oil reduces hyperpigmentation and restores natural youthfulness.',
    price: 1499,
    originalPrice: 2499,
    discount: 40,
    category: 'Beauty Products',
    images: [
      'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.6,
    reviewsCount: 310,
    brand: 'Avani Organics',
    stock: 50,
    isTrending: true,
    specs: [
      { name: 'Key Ingredient', value: 'Pure Kashmiri Saffron (Crocus Sativus)' },
      { name: 'Volume', value: '15 ml' },
      { name: 'Skin Type', value: 'All skin types, especially mature/dull' },
      { name: 'Scent', value: 'Natural Sandalwood & Herbaceous' }
    ],
    reviews: [
      { id: 'rev-5', userName: 'Meera Patel', userEmail: 'meera@gmail.com', rating: 4, comment: 'Using it for 2 weeks, can see a beautiful morning glow. Its non-greasy too!', date: '2026-06-29', helpfulCount: 11 }
    ]
  },
  {
    id: 'rud-005',
    name: 'Signature Brass Diya Puja Thali Set',
    description: 'An elegant heavy-cast brass puja thali featuring traditional engraving, dynamic diya slots, a camphor burner, an incense stick stand, and elegant bowls for roli/chawal.',
    price: 2499,
    originalPrice: 3999,
    discount: 37,
    category: 'Festival Products',
    images: [
      'https://images.unsplash.com/photo-1602631985686-2bb0604191c7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.9,
    reviewsCount: 64,
    brand: 'Rudrakash Gold',
    stock: 12,
    isFlashSale: true,
    isFestivalOffer: true,
    specs: [
      { name: 'Material', value: 'Premium Heavy Gauge Brass' },
      { name: 'Thali Diameter', value: '11 Inches' },
      { name: 'Set Items', value: 'Thali, Diya, Camphor burner, Bell, 2 Bowls' },
      { name: 'Craftsmanship', value: 'Moradabad Engraved Brassware' }
    ],
    reviews: [
      { id: 'rev-6', userName: 'Sanjay Dutt', userEmail: 'sanjay@gmail.com', rating: 5, comment: 'Stunning quality. It shines beautifully and has a premium heavy feel. Perfect for Diwali gift.', date: '2026-07-04', helpfulCount: 6 }
    ]
  },
  {
    id: 'rud-006',
    name: 'Smart Active Fit Fitness Tracker Watch',
    description: 'An ultra-sleek AMOLED smart fitness companion equipped with continuous heart rate monitoring, SPO2 sensor, 40+ dynamic sports tracking profiles, and 7-day fast-charge battery life.',
    price: 3499,
    originalPrice: 5999,
    discount: 41,
    category: 'Electronics',
    images: [
      'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1517502884422-41eaaced0168?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.5,
    reviewsCount: 1280,
    brand: 'Shiva Alloys',
    stock: 45,
    isBestSeller: true,
    colors: ['Midnight Black', 'Slate Blue', 'Rose Gold'],
    specs: [
      { name: 'Display', value: '1.43 Inch Full-Touch AMOLED' },
      { name: 'Waterproof Rating', value: '5 ATM (swim-proof)' },
      { name: 'Sensors', value: 'Heart Rate, SpO2, Accelerometer, Gyroscope' },
      { name: 'Battery', value: 'up to 7 days normal usage' }
    ],
    reviews: [
      { id: 'rev-7', userName: 'Anoop Seth', userEmail: 'anoop@gmail.com', rating: 5, comment: 'Excellent tracking accuracy. Screen is super crisp even in bright sunlight. Value for money.', date: '2026-06-30', helpfulCount: 42 }
    ]
  },
  {
    id: 'rud-007',
    name: 'Gilded Golden Premium Gift Hamper',
    description: 'The ultimate luxury token of appreciation. Packed with high-quality assorted dry fruits, premium dark chocolates, scented candles, and dry rose potpourri inside a velvet lined gold chest.',
    price: 2999,
    originalPrice: 4500,
    discount: 33,
    category: 'Gifts',
    images: [
      'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1575549594211-18c1b69a3b2a?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.8,
    reviewsCount: 54,
    brand: 'Kashi Craft',
    stock: 15,
    isFestivalOffer: true,
    isNewArrival: true,
    specs: [
      { name: 'Box Material', value: 'Embossed MDF with Velvet Interiors' },
      { name: 'Dry Fruit Mix', value: 'Premium Almonds, Cashews, Pistachios, Raisins (100g each)' },
      { name: 'Chocolates', value: 'Handmade dark cocoa truffles' },
      { name: 'Fragrance', value: 'French Lavender Scented Candles' }
    ],
    reviews: [
      { id: 'rev-8', userName: 'Komal Rao', userEmail: 'komal@gmail.com', rating: 5, comment: 'The velvet chest is absolutely premium. All dry fruits were fresh. Highly recommend as corporate gift.', date: '2026-07-06', helpfulCount: 15 }
    ]
  },
  {
    id: 'rud-008',
    name: 'Organic Scented Soy Candles (Set of 3)',
    description: 'Slow-burning, clean soot-free soy wax candles infused with essential oils of Lavender, Sandalwood, and Himalayan Jasmine. Encased in beautiful glass jars.',
    price: 899,
    originalPrice: 1499,
    discount: 40,
    category: 'Home Essentials',
    images: [
      'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1596435707241-7f61443a27f2?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.7,
    reviewsCount: 198,
    brand: 'Avani Organics',
    stock: 4, // low stock
    isTodayDeal: true,
    specs: [
      { name: 'Wax Type', value: '100% Natural Organic Soy Wax' },
      { name: 'Burn Time', value: '35 Hours per candle' },
      { name: 'Fragrances', value: 'Lavender Breeze, Sandalwood Calm, Night Jasmine' },
      { name: 'Wick', value: 'Eco-friendly natural cotton' }
    ],
    reviews: []
  },
  {
    id: 'rud-009',
    name: 'Handcrafted Genuine Leather Journal',
    description: 'A pocket notebook designed for planners, artists, and writers. Made of full-grain buffalo hide, featuring handmade cotton deckle-edge papers that are ink-bleed proof.',
    price: 1199,
    originalPrice: 1999,
    discount: 40,
    category: 'Stationery',
    images: [
      'https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.8,
    reviewsCount: 86,
    brand: 'Kashi Craft',
    stock: 22,
    isNewArrival: true,
    specs: [
      { name: 'Leather Type', value: 'Full-grain distressed vintage leather' },
      { name: 'Paper Type', value: '120 GSM Handmade Cotton deckle-edge (100 leaves/200 pages)' },
      { name: 'Closure', value: 'Leather wrap-around strap' },
      { name: 'Refillable', value: 'Yes (Stitched binding locks)' }
    ],
    reviews: []
  },
  {
    id: 'rud-010',
    name: 'Handmade Wooden Balancing Block Castle',
    description: 'An educational wooden toy set consisting of 40 multi-shaped pinewood blocks. Non-toxic organic dye colored, helping kids develop fine motor skills and spatial imagination.',
    price: 1249,
    originalPrice: 1899,
    discount: 34,
    category: 'Toys',
    images: [
      'https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1537655780520-1e392edd816a?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.6,
    reviewsCount: 55,
    brand: 'Kashi Craft',
    stock: 18,
    specs: [
      { name: 'Material', value: 'Sustainably sourced premium pine wood' },
      { name: 'Paint', value: '100% Lead-free non-toxic water dye' },
      { name: 'Age Recommendation', value: '3 to 8 years' },
      { name: 'Package Contents', value: '40 blocks + canvas pouch' }
    ],
    reviews: []
  },
  {
    id: 'rud-011',
    name: 'Premium Cork Anti-Slip Yoga Mat',
    description: 'An eco-conscious high-density workout mat made from organic oak cork and biodegradable natural rubber. Offers a heavy-duty grip even during sweaty hot yoga sessions.',
    price: 2199,
    originalPrice: 3499,
    discount: 37,
    category: 'Sports',
    images: [
      'https://images.unsplash.com/photo-1592432678016-e910b452f9a2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.7,
    reviewsCount: 112,
    brand: 'Avani Organics',
    stock: 20,
    specs: [
      { name: 'Upper Layer', value: '100% Natural Portuguese Oak Cork' },
      { name: 'Base Layer', value: 'Haram-free Natural Tree Rubber' },
      { name: 'Thickness', value: '6 mm (Superior knee cushioning)' },
      { name: 'Dimensions', value: '183 cm x 61 cm (Full size)' }
    ],
    reviews: []
  },
  {
    id: 'rud-012',
    name: 'Vintage Full-Grain Leather Phone Back Cover',
    description: 'A sophisticated genuine leather protective cover featuring luxury stitching, built-in magnetic ring for wireless charging, and metallic tactile clicky buttons.',
    price: 1599,
    originalPrice: 2499,
    discount: 36,
    category: 'Mobile Accessories',
    images: [
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.5,
    reviewsCount: 340,
    brand: 'Kashi Craft',
    stock: 14,
    colors: ['Vintage Tan', 'Cognac Amber', 'Stealth Black'],
    sizes: ['iPhone 15 Pro', 'iPhone 15 Pro Max', 'Galaxy S24 Ultra'],
    specs: [
      { name: 'Material', value: 'Full-Grain Italian Calfskin Leather' },
      { name: 'Compatibility', value: 'MagSafe and QI-Wireless Chargers' },
      { name: 'Lining', value: 'Ultra-soft microfiber internal shield' },
      { name: 'Drop Protection', value: '6ft military drop certified' }
    ],
    reviews: []
  }
];

export const MOCK_COUPONS: Coupon[] = [
  { code: 'RUDRAKASH10', description: 'Get 10% off on your entire cart. No minimum order limit!', discountType: 'percentage', value: 10, minPurchase: 0 },
  { code: 'SHIVANSH300', description: 'Flat ₹300 off on order values of ₹2500 and above.', discountType: 'fixed', value: 300, minPurchase: 2500 },
  { code: 'FESTIVAL500', description: 'Special flat ₹500 discount for festival shopping above ₹4000!', discountType: 'fixed', value: 500, minPurchase: 4000 },
  { code: 'FIRSTSHOP', description: 'First-time user exclusive: 15% off up to ₹1000.', discountType: 'percentage', value: 15, minPurchase: 500 }
];

export const TESTIMONIALS = [
  {
    name: 'Ananya Deshmukh',
    role: 'Premium Client',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80',
    comment: 'The quality of the Banarasi silk saree and custom wooden frame I ordered exceeded my expectations. Rudrakash offers authentic luxury. Their packaging is beautiful!',
    rating: 5
  },
  {
    name: 'Vikram Malhotra',
    role: 'Loyal Shopper',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80',
    comment: 'I am amazed by the fast delivery in Bangalore. Pincode estimation said 2 days, and it arrived right on schedule. The customer support chat was extremely helpful as well.',
    rating: 5
  },
  {
    name: 'Karan Mehra',
    role: 'Verified Purchaser',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120&q=80',
    comment: 'Buying personalized gifts is always a risk, but Rudrakash laser etching was incredibly precise. My parents loved the anniversary plaque. 10/10!',
    rating: 5
  }
];

export const FAQS = [
  {
    q: 'How long does it take to ship a personalized gift?',
    a: 'Personalized gifts (e.g., custom wood engravings) take 24–48 hours to design and curate. Standard delivery across Indian metros takes 3 to 5 business days after customization is complete.'
  },
  {
    q: 'Can I check if cash on delivery (COD) or express shipping is available for my location?',
    a: 'Yes! Simply use the "Pincode Availability Check" on any product details page. It will instantly show COD availability and estimate delivery charges and times.'
  },
  {
    q: 'Is it safe to pay online? What payment methods are supported?',
    a: 'We use industry-standard encrypted channels with full SSL security. We support UPI (PhonePe, Google Pay, Paytm, BHIM), Credit/Debit Cards, Net Banking, major Wallets, and Cash on Delivery.'
  },
  {
    q: 'What is your refund and exchange policy?',
    a: 'We have a hassle-free 7-day return/exchange policy for clothing, home, and daily products. Note that personalized gifts are only eligible for returns or replacements if they arrive damaged or with printing errors.'
  }
];
