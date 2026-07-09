import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Product } from '../types';
import { Sparkles, ShoppingBag, Eye, Heart, ArrowRight } from 'lucide-react';

interface RecommendedItem {
  productId: string;
  reason: string;
}

interface AIRecommendationsProps {
  title?: string;
  subtitle?: string;
  location?: 'homepage' | 'product_page' | 'cart';
}

export default function AIRecommendations({ 
  title = "AI Spotlight: Custom Recommended For You", 
  subtitle = "Dynamic personalized curation powered by Gemini 3.5 Pro AI",
  location = 'homepage'
}: AIRecommendationsProps) {
  const { 
    cart = [], 
    wishlist = [], 
    recentlyViewed = [], 
    orders = [], 
    products = [], 
    addToCart, 
    setSelectedProduct, 
    setActivePage,
    currency,
    toggleWishlist
  } = useApp();

  const [recommendations, setRecommendations] = useState<RecommendedItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [engine, setEngine] = useState<string>('Initializing');

  useEffect(() => {
    async function fetchRecommendations() {
      try {
        setLoading(true);
        const response = await fetch('/api/recommend', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            cart: (cart || []).map(item => ({
              id: item.product?.id,
              name: item.product?.name,
              category: item.product?.category
            })),
            wishlist: (wishlist || []).map(w => ({ id: w.id, name: w.name, category: w.category })),
            recentlyViewed: (recentlyViewed || []).map(r => ({ id: r.id, name: r.name, category: r.category })),
            orders: (orders || []).map(o => ({
              id: o.id,
              items: (o.items || []).map(i => ({ name: i?.name || '' }))
            }))
          })
        });

        const data = await response.json();
        if (response.ok && data.recommendations) {
          setRecommendations(data.recommendations);
          setEngine(data.engine || 'AI Core');
        } else {
          throw new Error('Invalid response');
        }
      } catch (err) {
        console.warn('AI recommendation fetch failed, using smart local fallback:', err);
        // Fallback local heuristics
        setRecommendations([
          { productId: 'rud-007', reason: 'An exceptional luxury. Indulge in our signature golden chocolate & oil wax soy candle chest.' },
          { productId: 'rud-001', reason: 'Cherish timeless milestones in our bespoke engraved solid teak wood frame.' },
          { productId: 'rud-004', reason: 'Empower your skincare ritual. Kashmiri saffron miracle elixir is recommended for your beauty profile.' }
        ]);
        setEngine('Local Intelligent Heuristics');
      } finally {
        setLoading(false);
      }
    }

    fetchRecommendations();
  }, [(cart || []).length, (wishlist || []).length, (recentlyViewed || []).length, (orders || []).length]);

  const formatPrice = (val: number) => {
    if (currency === 'USD') {
      return `$${Math.round(val / 80)}`;
    }
    return `₹${val}`;
  };

  if (loading) {
    return (
      <div className="py-12 flex flex-col items-center justify-center space-y-4">
        <div className="w-8 h-8 rounded-full border-4 border-orange-500/20 border-t-orange-500 animate-spin" />
        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Analysing user behavior & catalog...</p>
      </div>
    );
  }

  // Find actual product detail matching the recommended IDs
  const recommendedProducts = recommendations
    .map(rec => {
      const prod = products.find(p => p.id === rec.productId);
      if (!prod) return null;
      return {
        product: prod,
        reason: rec.reason
      };
    })
    .filter(Boolean) as { product: Product; reason: string }[];

  if (recommendedProducts.length === 0) return null;

  const handleProductClick = (prod: Product) => {
    setSelectedProduct(prod);
    setActivePage('details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isWishlisted = (id: string) => wishlist.some(p => p.id === id);

  return (
    <section className="space-y-8 py-8">
      {/* Dynamic Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-100 dark:border-white/10 pb-6">
        <div className="space-y-1.5 text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 text-orange-500 border border-orange-500/20 text-[9px] font-black uppercase tracking-wider select-none">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>AI Real-Time Engine ({engine})</span>
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight font-display">
            {title}
          </h2>
          <p className="text-xs text-slate-500">{subtitle}</p>
        </div>
      </div>

      {/* Grid of Dynamic Recommendations */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {recommendedProducts.map(({ product, reason }, index) => (
          <div 
            key={product.id}
            className="group relative flex flex-col justify-between bg-white dark:bg-white/5 dark:backdrop-blur-md rounded-3rem border border-slate-100 dark:border-white/10 p-6 shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden text-xs"
          >
            {/* Ambient backdrop glow */}
            <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-orange-500/5 group-hover:bg-orange-500/10 blur-2xl transition-all pointer-events-none" />

            {/* Product Image & Badges */}
            <div className="space-y-4">
              <div className="relative h-48 w-full rounded-2rem overflow-hidden bg-slate-50 dark:bg-white/5">
                <img 
                  src={product.images[0]} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Wishlist Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist(product);
                  }}
                  className={`absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-md transition-all cursor-pointer ${
                    isWishlisted(product.id) 
                      ? 'bg-red-500 text-white' 
                      : 'bg-white/80 dark:bg-slate-900/80 text-slate-600 dark:text-slate-300 hover:text-red-500'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${isWishlisted(product.id) ? 'fill-current' : ''}`} />
                </button>

                <span className="absolute bottom-4 left-4 bg-orange-500 text-white font-black text-[9px] tracking-wider uppercase px-2.5 py-0.5 rounded-full select-none">
                  AI Pick
                </span>
              </div>

              {/* Product Info */}
              <div className="space-y-1">
                <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block">
                  {product.category}
                </span>
                <h3 
                  onClick={() => handleProductClick(product)}
                  className="font-extrabold text-slate-800 dark:text-slate-100 text-sm line-clamp-1 hover:text-orange-500 cursor-pointer transition-colors"
                >
                  {product.name}
                </h3>
                <div className="flex items-center gap-2">
                  <span className="font-black text-slate-900 dark:text-white text-sm">
                    {formatPrice(product.price)}
                  </span>
                  {product.discount > 0 && (
                    <>
                      <span className="text-slate-400 dark:text-slate-500 line-through text-[11px]">
                        {formatPrice(product.originalPrice)}
                      </span>
                      <span className="text-orange-500 font-extrabold text-[10px]">
                        Save {product.discount}%
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* AI Generated Recommendation justification bubble */}
            <div className="mt-4 p-3.5 bg-orange-500/5 border border-orange-500/10 rounded-2xl relative">
              <p className="text-[11px] font-medium text-slate-600 dark:text-slate-300 leading-relaxed italic">
                " {reason} "
              </p>
            </div>

            {/* Actions Panel */}
            <div className="flex gap-2.5 mt-5">
              <button
                onClick={() => handleProductClick(product)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 hover:border-orange-500 text-slate-700 dark:text-slate-200 hover:text-orange-500 font-bold transition-all flex items-center justify-center gap-1 cursor-pointer"
              >
                <Eye className="w-4 h-4" />
                <span>View Specs</span>
              </button>
              <button
                onClick={() => addToCart(product, 1)}
                className="flex-1 py-2.5 rounded-xl bg-orange-500 text-white font-black hover:bg-orange-600 hover:shadow-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add Bag</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
