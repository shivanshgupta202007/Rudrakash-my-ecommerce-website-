import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Product } from '../types';
import AIRecommendations from './AIRecommendations';
import { TESTIMONIALS, FAQS, BRANDS } from '../data';
import { 
  ArrowRight, Sparkles, ShoppingBag, Heart, Star, 
  Flame, Clock, ChevronRight, MessageSquare, Mail, Gift 
} from 'lucide-react';

export default function Hero() {
  const {
    products = [],
    setActivePage,
    setSelectedProduct,
    addToCart,
    wishlist = [],
    toggleWishlist,
    addToRecentlyViewed,
    currency,
    lang
  } = useApp();

  const [activeSlide, setActiveSlide] = useState(0);
  const [countdown, setCountdown] = useState({ hrs: 3, mins: 45, secs: 12 });
  const [emailSub, setEmailSub] = useState('');
  const [couponRewarded, setCouponRewarded] = useState<string | null>(null);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Slideshow images matching real catalog
  const SLIDES = [
    {
      title: lang === 'en' ? 'Bespoke Wooden Plaques' : 'हस्तनिर्मित लकड़ी के फ़्रेम',
      sub: lang === 'en' ? 'Teak Wood Custom Laser Engravings' : 'सागौन की लकड़ी पर विशेष नक्काशी',
      desc: lang === 'en' ? 'Personalize with names, memorable dates, or custom quotes.' : 'विशेष नाम या तारीखों के साथ अपना उपहार सजाएं।',
      prodId: 'rud-001',
      tag: 'Bestseller',
      img: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&h=500&q=80',
    },
    {
      title: lang === 'en' ? 'Royal Silk Loom Collections' : 'शाही बनारसी रेशम साड़ियाँ',
      sub: lang === 'en' ? 'Mulberry Silks with Pure Gold Zari' : 'शुद्ध सोने की ज़री के साथ शहतूत रेशम',
      desc: lang === 'en' ? 'Designed for festivals and wedding occasions with heritage weaves.' : 'विरासत और पारंपरिक बुनाई के साथ त्योहारों के लिए डिज़ाइन किया गया।',
      prodId: 'rud-002',
      tag: 'Luxury Collection',
      img: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&h=500&q=80',
    },
    {
      title: lang === 'en' ? 'Ayurvedic Skincare Miracles' : 'आयुर्वेदिक सौंदर्य चमत्कार',
      sub: lang === 'en' ? 'Saffron and Kashmiri Kumkumadi' : 'केसर और कश्मीरी कुमकुमादि तेल',
      desc: lang === 'en' ? 'Formulated with organic herbs for glowing, spotless skin.' : 'चमकदार, बेदाग त्वचा के लिए जैविक जड़ी बूटियों से निर्मित।',
      prodId: 'rud-004',
      tag: 'Trending Now',
      img: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&w=1200&h=500&q=80',
    }
  ];

  // Automatic slide rotation
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide(prev => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // Flash sale countdown timer simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev.secs > 0) {
          return { ...prev, secs: prev.secs - 1 };
        } else if (prev.mins > 0) {
          return { ...prev, mins: prev.mins - 1, secs: 59 };
        } else if (prev.hrs > 0) {
          return { hrs: prev.hrs - 1, mins: 59, secs: 59 };
        } else {
          return { hrs: 12, mins: 0, secs: 0 }; // Loop countdown
        }
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    addToRecentlyViewed(product);
    setActivePage('details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNewsletterSub = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailSub.trim() && emailSub.includes('@')) {
      setCouponRewarded('RUDRAKASH10');
      setEmailSub('');
    }
  };

  // Curate landing page product widgets
  const flashSales = products.filter(p => p.isFlashSale);
  const bestSellers = products.filter(p => p.isBestSeller);
  const trending = products.filter(p => p.isTrending);
  const festivalDeals = products.filter(p => p.isFestivalOffer);

  const formatPrice = (val: number) => {
    if (currency === 'USD') {
      return `$${Math.round(val / 80)}`;
    }
    return `₹${val}`;
  };

  return (
    <div className="space-y-20 pb-20 font-sans transition-colors duration-300 dark:bg-slate-950">
      
      {/* 1. HERO SLIDER BANNER */}
      <section className="relative h-[480px] md:h-[550px] w-full overflow-hidden bg-gradient-to-br from-[#020617] via-[#1E1B4B] to-[#020617] transition-all">
        {/* Subtle top-right radial glow from theme */}
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-35 mix-blend-screen bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-500/40 via-transparent to-transparent pointer-events-none z-10" />

        {SLIDES.map((slide, idx) => (
          <div 
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === activeSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            {/* Dark gradient mask */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#020617] via-[#020617]/70 to-transparent z-10" />
            
            <img 
              src={slide.img} 
              alt={slide.title}
              className="w-full h-full object-cover opacity-75 transform scale-105 motion-safe:animate-[pulse_10s_infinite]"
            />
            
            {/* Slide Content */}
            <div className="absolute inset-0 z-20 flex items-center">
              <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
                <div className="max-w-xl space-y-6">
                  
                  {/* Badge */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[10px] font-bold tracking-widest text-orange-400 uppercase select-none">
                    <Sparkles className="w-3 h-3 text-orange-400 animate-pulse" />
                    {slide.tag}
                  </div>

                  <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white leading-tight font-display">
                    {slide.title.split(' ')[0]} <br/>
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                      {slide.title.split(' ').slice(1).join(' ')}
                    </span>
                  </h1>
                  
                  <p className="text-sm md:text-base font-semibold text-indigo-300 tracking-wide font-display">
                    {slide.sub}
                  </p>
                  
                  <p className="text-xs text-slate-400 leading-relaxed max-w-md font-medium">
                    {slide.desc}
                  </p>
                  
                  {/* Call to actions */}
                  <div className="flex items-center gap-4 pt-4">
                    <button 
                      onClick={() => {
                        const targetProd = products.find(p => p.id === slide.prodId);
                        if (targetProd) handleProductClick(targetProd);
                      }}
                      className="px-8 py-3 bg-white text-slate-900 rounded-full font-bold text-xs hover:bg-orange-500 hover:text-white transition-all shadow-lg shadow-white/5 cursor-pointer hover:scale-[1.02]"
                    >
                      {lang === 'en' ? 'Shop Collection' : 'अभी खरीदें'}
                    </button>
                    <button 
                      onClick={() => {
                        setActivePage('listing');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="px-8 py-3 bg-white/5 border border-white/20 rounded-full font-bold text-xs text-slate-300 hover:bg-white/10 transition-all cursor-pointer"
                    >
                      {lang === 'en' ? 'View Deals' : 'डील्स देखें'}
                    </button>
                  </div>

                </div>
              </div>
            </div>

          </div>
        ))}

        {/* Carousel Indicators dots */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30 flex items-center gap-2">
          {SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveSlide(idx)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                idx === activeSlide ? 'bg-orange-500 w-6' : 'bg-white/40'
              }`}
            />
          ))}
        </div>
      </section>

      {/* 2. FLASH SALE SECTION */}
      {flashSales.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-6 mb-8 gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-orange-100 dark:bg-orange-950/30 text-orange-600 dark:text-orange-400 rounded-2xl animate-pulse">
                <Flame className="w-6 h-6 fill-current" />
              </div>
              <div>
                <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  {lang === 'en' ? 'Flash Sale' : 'फ्लैश सेल'}
                </h2>
                <p className="text-xs text-slate-500">{lang === 'en' ? 'Urgent premium offers on limited quantities' : 'सीमित मात्रा पर शानदार छूट'}</p>
              </div>
            </div>
            
            {/* Live Timer Countdown */}
            <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-2xl border border-slate-200/40 dark:border-slate-700/40">
              <Clock className="w-4 h-4 text-orange-500 animate-spin" />
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Ends in:</span>
              <div className="flex items-center gap-1 font-mono text-sm font-extrabold text-slate-800 dark:text-slate-100">
                <span className="bg-orange-500 text-white px-2 py-0.5 rounded-lg">{String(countdown.hrs).padStart(2, '0')}</span>
                <span>:</span>
                <span className="bg-orange-500 text-white px-2 py-0.5 rounded-lg">{String(countdown.mins).padStart(2, '0')}</span>
                <span>:</span>
                <span className="bg-orange-500 text-white px-2 py-0.5 rounded-lg">{String(countdown.secs).padStart(2, '0')}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {flashSales.map(prod => (
              <ProductCard key={prod.id} product={prod} onClick={() => handleProductClick(prod)} onAddToCart={addToCart} formatPrice={formatPrice} wishlist={wishlist} toggleWishlist={toggleWishlist} />
            ))}
          </div>

        </section>
      )}

      {/* 3. DYNAMIC BENTO GRID OF CATEGORIES */}
      <section className="bg-slate-50 dark:bg-slate-900/40 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-2 mb-12">
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {lang === 'en' ? 'Curated Departments' : 'श्रेणियाँ'}
            </h2>
            <p className="text-sm text-slate-500 max-w-md mx-auto">{lang === 'en' ? 'Find exceptional goods built by master craftsmen' : 'कारीगरों द्वारा बनाए गए उत्कृष्ट उत्पाद खोजें'}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* personalized gift banner card */}
            <div 
              onClick={() => { setActivePage('categories'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="group relative h-64 rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer lg:col-span-2"
            >
              <img 
                src="https://images.unsplash.com/photo-1544273677-c433136021d4?auto=format&fit=crop&w=1000&q=80" 
                alt="Personalized Plaque Banner"
                className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700 filter brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent flex flex-col justify-end p-8 space-y-2" />
              <div className="absolute bottom-8 left-8 text-white z-10 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-orange-400 bg-orange-500/15 px-2.5 py-0.5 border border-orange-500/35 rounded-full">Top Seller Category</span>
                <h3 className="text-2xl font-extrabold tracking-tight">Personalized Luxury Gifts</h3>
                <p className="text-xs text-slate-300">Custom Teak Wood laser engravings with high-precision design finishes.</p>
              </div>
              <ChevronRight className="absolute right-8 bottom-8 text-white w-6 h-6 group-hover:translate-x-2 transition-all z-10" />
            </div>

            {/* Silk wear card */}
            <div 
              onClick={() => { setActivePage('categories'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="group relative h-64 rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              <img 
                src="https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80" 
                alt="Silk sarees collection"
                className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700 filter brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent flex flex-col justify-end p-8 space-y-2" />
              <div className="absolute bottom-8 left-8 text-white z-10 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 bg-blue-500/15 px-2.5 py-0.5 border border-blue-500/35 rounded-full">Royal Looms</span>
                <h3 className="text-xl font-extrabold tracking-tight">Mulberry Silks</h3>
                <p className="text-xs text-slate-300">Authentic gold zari weaves.</p>
              </div>
            </div>

          </div>

          <div className="text-center mt-10">
            <button 
              onClick={() => { setActivePage('categories'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="px-6 py-2.5 rounded-full border border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 text-xs font-bold hover:bg-blue-600 hover:text-white dark:hover:bg-blue-400 dark:hover:text-slate-950 transition-all flex items-center gap-2 mx-auto cursor-pointer"
            >
              <span>Explore All 12 Departments</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </section>

      {/* 4. BEST SELLERS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="border-b border-slate-100 dark:border-slate-800 pb-6 mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {lang === 'en' ? 'Rudrakash Best Sellers' : 'सबसे ज्यादा बिकने वाले'}
            </h2>
            <p className="text-xs text-slate-500">{lang === 'en' ? 'Our most highly rated and treasured creations' : 'सैकड़ों ग्राहकों द्वारा प्रशंसित उत्पाद'}</p>
          </div>
          <button 
            onClick={() => { setActivePage('listing'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>View All</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {bestSellers.map(prod => (
            <ProductCard key={prod.id} product={prod} onClick={() => handleProductClick(prod)} onAddToCart={addToCart} formatPrice={formatPrice} wishlist={wishlist} toggleWishlist={toggleWishlist} />
          ))}
        </div>

      </section>

      {/* AI RECOMMENDATIONS HOME SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AIRecommendations 
          title={lang === 'en' ? "AI Spotlight: Custom Recommended For You" : "एआई स्पॉटलाइट: आपके लिए विशेष सिफारिशें"}
          subtitle={lang === 'en' ? "Dynamic personalized curation powered by Gemini 3.5 AI Core" : "जेमिनी ३.५ एआई कोर द्वारा संचालित गतिशील व्यक्तिगत चयन"}
          location="homepage"
        />
      </section>

      {/* 5. FESTIVAL SPECIAL OFFERS SECTIONS */}
      {festivalDeals.length > 0 && (
        <section className="bg-gradient-to-br from-blue-900 to-indigo-950 text-white py-16 shadow-2xl relative overflow-hidden">
          {/* subtle circles */}
          <div className="absolute top-10 right-10 w-96 h-96 rounded-full bg-orange-500/10 blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-96 h-96 rounded-full bg-purple-500/10 blur-3xl" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="border-b border-white/10 pb-6 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-orange-400 bg-orange-500/15 px-3 py-1 rounded-full border border-orange-500/30">Limited Festive Special</span>
                <h2 className="text-3xl font-extrabold tracking-tight mt-2 text-white">
                  {lang === 'en' ? 'Festival Sacred Offers' : 'उत्सव विशेष उपहार'}
                </h2>
                <p className="text-xs text-slate-300 mt-1">{lang === 'en' ? 'Authentic brass diyas, traditional hampers & silk apparel' : 'त्योहारों की शुभता के लिए विशेष पीतल की थालियां और उपहार'}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {festivalDeals.map(prod => (
                <div key={prod.id} className="bg-white/5 backdrop-blur-md rounded-3xl p-5 border border-white/10 flex flex-col gap-4 group">
                  <div className="relative h-48 w-full overflow-hidden rounded-2xl bg-white/10">
                    <img src={prod.images[0]} alt={prod.name} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500" />
                    <span className="absolute top-3 left-3 bg-orange-500 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">Save {prod.discount}%</span>
                  </div>
                  <div className="space-y-2">
                    <span className="text-[10px] text-slate-300 font-bold uppercase tracking-wider">{prod.category}</span>
                    <h3 onClick={() => handleProductClick(prod)} className="text-base font-extrabold text-white line-clamp-1 hover:text-orange-400 cursor-pointer transition-all">{prod.name}</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-extrabold text-orange-400">{formatPrice(prod.price)}</span>
                      <span className="text-xs text-slate-400 line-through">{formatPrice(prod.originalPrice)}</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => { addToCart(prod, 1); }}
                    className="w-full py-2.5 rounded-xl bg-orange-500 text-white font-extrabold text-xs hover:bg-orange-600 hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer mt-auto"
                  >
                    <ShoppingBag className="w-4 h-4" /> Add to Cart Bag
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 6. TRENDING NOW SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="border-b border-slate-100 dark:border-slate-800 pb-6 mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {lang === 'en' ? 'Trending on Rudrakash' : 'ट्रेंडिंग उत्पाद'}
            </h2>
            <p className="text-xs text-slate-500">{lang === 'en' ? 'What sophisticated Indian shoppers are buying this week' : 'इस सप्ताह हमारे प्लेटफॉर्म पर सबसे ज्यादा सर्च किए गए उत्पाद'}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {trending.map(prod => (
            <ProductCard key={prod.id} product={prod} onClick={() => handleProductClick(prod)} onAddToCart={addToCart} formatPrice={formatPrice} wishlist={wishlist} toggleWishlist={toggleWishlist} />
          ))}
        </div>

      </section>

      {/* 7. POPULAR BRANDS MARQUEE */}
      <section className="bg-slate-50 dark:bg-slate-900/40 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Curated Partnership</span>
            <h3 className="text-lg font-extrabold text-slate-800 dark:text-slate-200 mt-1">Our Heritage Brand Alliances</h3>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-75 grayscale hover:grayscale-0 transition-all">
            {BRANDS.map((brand, idx) => (
              <div key={idx} className="flex flex-col items-center gap-2 bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm min-w-[120px]">
                <span className="text-xs font-extrabold text-slate-800 dark:text-slate-300">{brand.name}</span>
                <span className="text-[9px] text-blue-500 uppercase tracking-widest font-semibold">Verified Ally</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. CUSTOMER REVIEWS & TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center space-y-2 mb-12">
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Loved by 10,000+ Indian Families
          </h2>
          <p className="text-xs text-slate-500">Honest feedback on our curated luxury products & delivery transit speed</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, idx) => (
            <div key={idx} className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-700/60 flex flex-col justify-between space-y-4">
              <p className="text-xs italic text-slate-600 dark:text-slate-300 leading-relaxed">
                "{t.comment}"
              </p>
              <div className="flex items-center gap-3">
                <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-slate-700" />
                <div>
                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">{t.name}</h4>
                  <p className="text-[10px] text-slate-400 font-bold">{t.role}</p>
                </div>
                <div className="flex items-center gap-0.5 ml-auto text-yellow-400">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* 9. FAQ ACCORDION */}
      <section className="max-w-3xl mx-auto px-4">
        
        <div className="text-center space-y-2 mb-12">
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Frequently Asked Queries
          </h2>
          <p className="text-xs text-slate-500">Need immediate clarity on deliveries, custom engravings, or security? Read below.</p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => (
            <div key={idx} className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700/60 overflow-hidden transition-all">
              <button 
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full flex items-center justify-between p-5 text-left text-xs font-bold text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-all"
              >
                <span>{faq.q}</span>
                <ChevronRight className={`w-4 h-4 text-slate-400 transition-transform ${activeFaq === idx ? 'rotate-90 text-blue-500' : ''}`} />
              </button>
              
              {activeFaq === idx && (
                <div className="px-5 pb-5 pt-1 text-xs text-slate-500 dark:text-slate-400 leading-relaxed border-t border-slate-50 dark:border-slate-700/40">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

      </section>

      {/* 10. NEWSLETTER CARD SIGNUP */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-orange-500 rounded-[36px] p-8 md:p-12 shadow-2xl relative overflow-hidden text-center text-white">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/10 to-transparent pointer-events-none" />
          
          <div className="max-w-xl mx-auto space-y-6 relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white border border-white/20 text-[10px] font-bold uppercase tracking-wider">
              <Gift className="w-3.5 h-3.5" /> First Shop Special Reward
            </div>
            
            <h2 className="text-3xl font-extrabold tracking-tight">
              {lang === 'en' ? 'Unlock flat 10% on your first order' : 'अपनी पहली खरीद पर 10% छूट पाएं'}
            </h2>
            
            <p className="text-xs text-slate-200 leading-relaxed">
              Subscribe to the Rudrakash Gazette. Receive periodic private releases, handcrafted corporate hamper deals, and premium lifestyle catalogs.
            </p>

            {couponRewarded ? (
              <div className="p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 inline-block">
                <p className="text-xs text-slate-200">Congratulations! Use code below at Checkout:</p>
                <span className="text-2xl font-black text-orange-400 block tracking-widest mt-1 animate-pulse">
                  {couponRewarded}
                </span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSub} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  required
                  placeholder={lang === 'en' ? 'Enter your premium email address' : 'अपना ईमेल दर्ज करें...'}
                  value={emailSub}
                  onChange={(e) => setEmailSub(e.target.value)}
                  className="flex-1 px-5 py-3 rounded-full bg-white/15 border border-white/20 text-xs text-white placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white transition-all shadow-inner"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-full bg-white text-slate-900 font-extrabold text-xs hover:bg-slate-100 transition-all shadow-md hover:shadow-xl shrink-0 cursor-pointer"
                >
                  {lang === 'en' ? 'Send My Discount Code' : 'कोड प्राप्त करें'}
                </button>
              </form>
            )}

          </div>
        </div>
      </section>

    </div>
  );
}

// Subcomponent: PRODUCT CARD
interface CardProps {
  key?: any;
  product: Product;
  onClick: () => void;
  onAddToCart: (p: Product, qty: number) => void;
  formatPrice: (p: number) => string;
  wishlist: Product[];
  toggleWishlist: (p: Product) => void;
}

function ProductCard({ product, onClick, onAddToCart, formatPrice, wishlist, toggleWishlist }: CardProps) {
  const isWishlisted = wishlist.some(p => p.id === product.id);

  return (
    <div className="group bg-white/95 dark:bg-white/5 dark:backdrop-blur-md rounded-[2rem] overflow-hidden border border-slate-100 dark:border-white/10 p-4 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between gap-4 relative">
      
      {/* Heart button */}
      <button 
        onClick={(e) => { e.stopPropagation(); toggleWishlist(product); }}
        className="absolute top-6 right-6 z-20 p-2 rounded-full bg-white/80 dark:bg-[#020617]/80 backdrop-blur text-slate-400 hover:text-red-500 dark:text-slate-500 dark:hover:text-red-400 shadow-sm transition-all"
        title="Add to Wishlist"
      >
        <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
      </button>

      {/* Product Image */}
      <div 
        onClick={onClick}
        className="relative h-44 w-full rounded-2xl overflow-hidden bg-slate-50 dark:bg-slate-950/60 cursor-pointer"
      >
        <img 
          src={product.images[0]} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
        />
        {product.discount > 0 && (
          <span className="absolute bottom-3 left-3 bg-white text-slate-900 text-[10px] font-bold px-2 py-0.5 rounded shadow">
            {product.discount}% OFF
          </span>
        )}
      </div>

      {/* Content */}
      <div className="space-y-1">
        <span className="text-[9px] font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500 block">
          {product.category}
        </span>
        <h3 
          onClick={onClick}
          className="text-xs font-bold text-slate-800 dark:text-slate-200 line-clamp-1 hover:text-orange-500 dark:hover:text-orange-400 cursor-pointer transition-all leading-tight font-display"
        >
          {product.name}
        </h3>
        
        {/* Rating stars */}
        <div className="flex items-center gap-1 text-[10px] text-yellow-400">
          <div className="flex items-center">
            <Star className="w-3 h-3 fill-current" />
          </div>
          <span className="font-extrabold text-slate-600 dark:text-slate-400">{product.rating}</span>
          <span className="text-slate-300 dark:text-slate-600">|</span>
          <span className="text-slate-400">({product.reviewsCount})</span>
        </div>
      </div>

      {/* Pricing and Action */}
      <div className="flex items-center justify-between mt-auto pt-2 border-t border-slate-50 dark:border-white/10">
        <div className="flex flex-col">
          <span className="text-sm font-black text-slate-900 dark:text-slate-50">{formatPrice(product.price)}</span>
          {product.discount > 0 && (
            <span className="text-[10px] text-slate-400 line-through leading-none mt-0.5">{formatPrice(product.originalPrice)}</span>
          )}
        </div>
        
        <button 
          onClick={() => onAddToCart(product, 1)}
          className="p-2.5 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:bg-orange-500 hover:text-white dark:hover:bg-orange-500 dark:hover:text-white transition-all cursor-pointer shadow-md"
          title="Add to shopping cart"
        >
          <ShoppingBag className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}
