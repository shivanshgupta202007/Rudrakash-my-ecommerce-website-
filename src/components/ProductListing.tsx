import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Product } from '../types';
import { CATEGORIES, BRANDS } from '../data';
import { 
  Filter, Grid, List, Heart, ShoppingBag, Star, Share2, 
  RefreshCw, Check, X, ArrowUpDown, Copy, Eye, ArrowLeftRight 
} from 'lucide-react';

export default function ProductListing() {
  const {
    products = [],
    cart = [],
    addToCart,
    wishlist = [],
    toggleWishlist,
    addToRecentlyViewed,
    compareProducts = [],
    toggleCompare,
    filters,
    setFilters,
    resetFilters,
    sorting,
    setSorting,
    setSelectedProduct,
    setActivePage,
    currency,
    lang,
    searchQuery,
    setSearchQuery
  } = useApp();

  const [layoutMode, setLayoutMode] = useState<'grid' | 'list'>('grid');
  const [showFilterSidebar, setShowFilterSidebar] = useState(false);
  const [compareModalOpen, setCompareModalOpen] = useState(false);
  const [copiedProductId, setCopiedProductId] = useState<string | null>(null);

  const formatPrice = (val: number) => {
    if (currency === 'USD') {
      return `$${Math.round(val / 80)}`;
    }
    return `₹${val}`;
  };

  const handleShare = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    const shareUrl = `${window.location.origin}/product/${product.id}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopiedProductId(product.id);
      setTimeout(() => setCopiedProductId(null), 2000);
    });
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    addToRecentlyViewed(product);
    setActivePage('details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filter & Sort implementation
  const filteredProducts = products.filter(p => {
    // 1. Category Filter
    if (filters.category !== 'all' && p.category.toLowerCase() !== filters.category.toLowerCase()) {
      return false;
    }
    // 2. Price Filter
    if (p.price < filters.minPrice || p.price > filters.maxPrice) {
      return false;
    }
    // 3. Brand Filter
    if (filters.brand !== 'all' && p.brand.toLowerCase() !== filters.brand.toLowerCase()) {
      return false;
    }
    // 4. Rating Filter
    if (filters.rating > 0 && p.rating < filters.rating) {
      return false;
    }
    // 5. Discount Filter
    if (filters.discount > 0 && p.discount < filters.discount) {
      return false;
    }
    // 6. Color Filter
    if (filters.color !== 'all' && (!p.colors || !p.colors.some(c => c.toLowerCase().includes(filters.color.toLowerCase())))) {
      return false;
    }
    // 7. Size Filter
    if (filters.size !== 'all' && (!p.sizes || !p.sizes.some(s => s.toLowerCase().includes(filters.size.toLowerCase())))) {
      return false;
    }
    // 8. Search Query Filter
    if (searchQuery && searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase().trim();
      const matchesName = p.name.toLowerCase().includes(query);
      const matchesDesc = p.description.toLowerCase().includes(query);
      const matchesCategory = p.category.toLowerCase().includes(query);
      const matchesBrand = p.brand.toLowerCase().includes(query);
      const matchesTags = p.tags && p.tags.some(t => t.toLowerCase().includes(query));
      if (!matchesName && !matchesDesc && !matchesCategory && !matchesBrand && !matchesTags) {
        return false;
      }
    }
    return true;
  }).sort((a, b) => {
    if (sorting === 'price-low') return a.price - b.price;
    if (sorting === 'price-high') return b.price - a.price;
    if (sorting === 'rating') return b.rating - a.rating;
    if (sorting === 'newest') return b.id.localeCompare(a.id); // Mock newer ID
    return b.reviewsCount - a.reviewsCount; // Popularity default
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-sans min-h-screen dark:bg-slate-950 transition-colors duration-300">
      
      {/* Top Banner Display */}
      <div className="bg-gradient-to-r from-blue-900/40 via-purple-900/40 to-slate-900/60 dark:from-blue-950/20 dark:to-slate-900/40 border border-slate-100 dark:border-slate-800 rounded-[32px] p-8 md:p-12 mb-10 text-center relative overflow-hidden shadow-sm">
        <span className="text-[10px] font-bold text-orange-400 bg-orange-500/15 px-3 py-1 rounded-full border border-orange-500/30 tracking-wider uppercase mb-3 inline-block">Active deals & discounts</span>
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {searchQuery ? `Search Results for "${searchQuery}"` : (filters.category === 'all' ? 'Rudrakash Treasures' : `${filters.category} Collection`)}
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto mt-2 leading-relaxed">
          Premium hand-woven silks, laser etched wood ornaments, ancient alloys, and health organic elixirs shipped directly with secure transit tracking.
        </p>
      </div>

      {/* Control Actions Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-5 mb-8 gap-4 text-xs font-semibold">
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button 
            onClick={() => setShowFilterSidebar(!showFilterSidebar)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-850 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
          >
            <Filter className="w-4 h-4 text-blue-500" />
            <span>Filters</span>
          </button>
          
          <span className="text-slate-400 font-bold">Showing {filteredProducts.length} items</span>
          {searchQuery && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-300 border border-blue-100/40 dark:border-blue-800/40 text-[11px] font-bold">
              <span>Query: {searchQuery}</span>
              <button onClick={() => setSearchQuery('')} className="hover:text-red-500 font-black ml-1 text-sm leading-none">×</button>
            </div>
          )}
        </div>

        <div className="flex items-center gap-4 justify-between w-full md:w-auto">
          
          {/* Sorting */}
          <div className="flex items-center gap-2">
            <span className="text-slate-400">Sort:</span>
            <select
              value={sorting}
              onChange={(e) => setSorting(e.target.value)}
              className="bg-slate-100 dark:bg-slate-850 text-slate-800 dark:text-slate-300 px-3.5 py-2.5 rounded-full border-none focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            >
              <option value="popular">Popularity</option>
              <option value="newest">Newest Releases</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>

          {/* Grid/List Layout toggle */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-850 rounded-full p-1 border border-slate-200/40 dark:border-slate-700/40 shadow-inner">
            <button 
              onClick={() => setLayoutMode('grid')}
              className={`p-2 rounded-full transition-all ${layoutMode === 'grid' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-white shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
              title="Grid Layout"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setLayoutMode('list')}
              className={`p-2 rounded-full transition-all ${layoutMode === 'list' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-white shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
              title="List Layout"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>

      {/* Main Grid Content Area */}
      <div className="flex gap-10">
        
        {/* Dynamic Expandable Filter Sidebar */}
        {showFilterSidebar && (
          <aside className="w-64 bg-white dark:bg-slate-850 border border-slate-100 dark:border-slate-800 p-6 rounded-[28px] h-fit sticky top-24 shadow-2xl z-20 space-y-6 text-xs text-slate-700 dark:text-slate-300">
            
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
              <span className="font-bold text-slate-900 dark:text-white text-sm">Filter Criteria</span>
              <button onClick={resetFilters} className="text-blue-600 dark:text-blue-400 hover:underline">Reset</button>
            </div>

            {/* 1. Category */}
            <div className="space-y-2">
              <h4 className="font-extrabold text-slate-900 dark:text-slate-200">Department</h4>
              <select
                value={filters.category}
                onChange={(e) => setFilters((p: any) => ({ ...p, category: e.target.value }))}
                className="w-full bg-slate-100 dark:bg-slate-800 p-2.5 rounded-xl border-none focus:outline-none"
              >
                <option value="all">All Departments</option>
                {CATEGORIES.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
              </select>
            </div>

            {/* 2. Price limit */}
            <div className="space-y-2">
              <h4 className="font-extrabold text-slate-900 dark:text-slate-200">Max Budget</h4>
              <div className="flex items-center justify-between">
                <span>{formatPrice(0)}</span>
                <span className="font-black text-blue-600 dark:text-blue-400">{formatPrice(filters.maxPrice)}</span>
              </div>
              <input
                type="range"
                min="0"
                max="15000"
                step="500"
                value={filters.maxPrice}
                onChange={(e) => setFilters((p: any) => ({ ...p, maxPrice: Number(e.target.value) }))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
            </div>

            {/* 3. Rating */}
            <div className="space-y-2">
              <h4 className="font-extrabold text-slate-900 dark:text-slate-200">Minimum Rating</h4>
              <div className="flex flex-col gap-1.5">
                {[4, 3, 0].map(star => (
                  <label key={star} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="rating-select"
                      checked={filters.rating === star}
                      onChange={() => setFilters((p: any) => ({ ...p, rating: star }))}
                      className="accent-blue-500"
                    />
                    <span className="flex items-center text-yellow-400">
                      {star > 0 ? Array.from({ length: star }).map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current" />) : 'All ratings'}
                      {star > 0 && <span className="text-slate-500 ml-1 font-semibold">& Up</span>}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* 4. Brand */}
            <div className="space-y-2">
              <h4 className="font-extrabold text-slate-900 dark:text-slate-200">Brand Partner</h4>
              <select
                value={filters.brand}
                onChange={(e) => setFilters((p: any) => ({ ...p, brand: e.target.value }))}
                className="w-full bg-slate-100 dark:bg-slate-800 p-2.5 rounded-xl border-none focus:outline-none"
              >
                <option value="all">All Brands</option>
                {BRANDS.map(b => <option key={b.name} value={b.name.toLowerCase()}>{b.name}</option>)}
              </select>
            </div>

            {/* 5. Discount minimum */}
            <div className="space-y-2">
              <h4 className="font-extrabold text-slate-900 dark:text-slate-200">Discount Percentage</h4>
              <div className="flex flex-wrap gap-2">
                {[0, 10, 30, 40].map(d => (
                  <button
                    key={d}
                    onClick={() => setFilters((p: any) => ({ ...p, discount: d }))}
                    className={`px-3 py-1.5 rounded-xl border text-[10px] font-bold ${filters.discount === d ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-200 dark:border-slate-700 text-slate-500'}`}
                  >
                    {d === 0 ? 'All' : `${d}%+`}
                  </button>
                ))}
              </div>
            </div>

            <button 
              onClick={() => setShowFilterSidebar(false)}
              className="w-full py-2.5 rounded-xl bg-slate-950 dark:bg-slate-700 text-white font-extrabold text-[10px] flex items-center justify-center gap-1 hover:opacity-95"
            >
              <Check className="w-3.5 h-3.5" /> Close Filters
            </button>

          </aside>
        )}

        {/* Product Cards Listing Zone */}
        <div className="flex-1 space-y-12">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-24 bg-slate-50 dark:bg-slate-900/30 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800 space-y-4">
              <span className="text-4xl">💎</span>
              <h3 className="text-lg font-extrabold text-slate-800 dark:text-white">No products match your filter criteria</h3>
              <p className="text-xs text-slate-400">Try loosening your price slider or department selection.</p>
              <button onClick={resetFilters} className="px-5 py-2 rounded-full bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 transition-all cursor-pointer">
                Reset All Filters
              </button>
            </div>
          ) : (
            <div>
              {layoutMode === 'grid' ? (
                /* Grid Layout */
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {filteredProducts.map(prod => {
                    const isWishlisted = wishlist.some(p => p.id === prod.id);
                    const isCompared = compareProducts.some(p => p.id === prod.id);
                    return (
                      <div 
                        key={prod.id} 
                        className="group bg-white dark:bg-slate-800 rounded-[28px] overflow-hidden border border-slate-100 dark:border-slate-700/60 p-4 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between gap-4 relative"
                      >
                        
                        {/* Quick Action Top Bar */}
                        <div className="absolute top-6 left-6 right-6 z-20 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                          
                          {/* Compare checkbox icon button */}
                          <button 
                            onClick={(e) => { e.stopPropagation(); toggleCompare(prod); }}
                            className={`p-2 rounded-full backdrop-blur shadow-sm transition-all ${
                              isCompared ? 'bg-purple-600 text-white' : 'bg-white/95 dark:bg-slate-900/95 text-slate-500 hover:text-purple-500'
                            }`}
                            title={isCompared ? 'Remove from Compare' : 'Add to Compare'}
                          >
                            <RefreshCw className={`w-3.5 h-3.5 ${isCompared ? 'animate-spin' : ''}`} />
                          </button>

                          <div className="flex items-center gap-1.5">
                            {/* Share button */}
                            <button 
                              onClick={(e) => handleShare(prod, e)}
                              className="p-2 rounded-full bg-white/95 dark:bg-slate-900/95 text-slate-500 hover:text-blue-500 shadow-sm transition-all"
                              title="Copy product link"
                            >
                              {copiedProductId === prod.id ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Share2 className="w-3.5 h-3.5" />}
                            </button>
                            
                            {/* Wishlist */}
                            <button 
                              onClick={(e) => { e.stopPropagation(); toggleWishlist(prod); }}
                              className={`p-2 rounded-full shadow-sm transition-all bg-white/95 dark:bg-slate-900/95 text-slate-400 hover:text-red-500 dark:text-slate-500 dark:hover:text-red-400`}
                              title="Add to Wishlist"
                            >
                              <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
                            </button>
                          </div>

                        </div>

                        {/* Product Image */}
                        <div 
                          onClick={() => handleProductClick(prod)}
                          className="relative h-44 w-full rounded-2xl overflow-hidden bg-slate-50 dark:bg-slate-900 cursor-pointer"
                        >
                          <img 
                            src={prod.images[0]} 
                            alt={prod.name} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                          />
                          {prod.discount > 0 && (
                            <span className="absolute bottom-3 left-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-[9px] font-extrabold px-2.5 py-0.5 rounded-full shadow">
                              -{prod.discount}% OFF
                            </span>
                          )}
                        </div>

                        {/* Content */}
                        <div className="space-y-1">
                          <span className="text-[9px] font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500 block">
                            {prod.category}
                          </span>
                          <h3 
                            onClick={() => handleProductClick(prod)}
                            className="text-xs font-bold text-slate-800 dark:text-slate-100 line-clamp-1 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-all leading-tight"
                          >
                            {prod.name}
                          </h3>
                          
                          {/* Rating */}
                          <div className="flex items-center gap-1 text-[10px] text-yellow-400">
                            <Star className="w-3 h-3 fill-current" />
                            <span className="font-extrabold text-slate-600 dark:text-slate-400">{prod.rating}</span>
                            <span className="text-slate-400">({prod.reviewsCount})</span>
                            <span className="text-[10px] font-extrabold text-slate-300 dark:text-slate-600 ml-auto">{prod.brand}</span>
                          </div>
                        </div>

                        {/* Price & Action */}
                        <div className="flex items-center justify-between mt-auto pt-2 border-t border-slate-50 dark:border-slate-700/30">
                          <div className="flex flex-col">
                            <span className="text-sm font-black text-slate-900 dark:text-slate-50">{formatPrice(prod.price)}</span>
                            {prod.discount > 0 && (
                              <span className="text-[10px] text-slate-400 line-through leading-none mt-0.5">{formatPrice(prod.originalPrice)}</span>
                            )}
                          </div>
                          
                          <button 
                            onClick={() => addToCart(prod, 1)}
                            className="p-2.5 rounded-xl bg-blue-600 text-white hover:bg-blue-700 hover:shadow shadow-sm transition-all cursor-pointer"
                            title="Add to shopping cart"
                          >
                            <ShoppingBag className="w-4 h-4" />
                          </button>
                        </div>

                      </div>
                    );
                  })}
                </div>
              ) : (
                /* List Layout */
                <div className="space-y-5">
                  {filteredProducts.map(prod => {
                    const isWishlisted = wishlist.some(p => p.id === prod.id);
                    const isCompared = compareProducts.some(p => p.id === prod.id);
                    return (
                      <div 
                        key={prod.id}
                        className="group bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700/60 p-4 shadow-sm hover:shadow-lg hover:border-slate-200 transition-all duration-300 flex flex-col sm:flex-row gap-6 relative"
                      >
                        <div className="relative h-40 w-full sm:w-48 overflow-hidden rounded-2xl bg-slate-100 shrink-0">
                          <img src={prod.images[0]} alt={prod.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                          {prod.discount > 0 && (
                            <span className="absolute bottom-3 left-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-[9px] font-extrabold px-2 py-0.5 rounded-full shadow">
                              -{prod.discount}%
                            </span>
                          )}
                        </div>

                        <div className="flex-1 flex flex-col justify-between py-1 gap-4">
                          
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">{prod.category}</span>
                              <div className="flex items-center gap-2">
                                <button 
                                  onClick={() => toggleCompare(prod)}
                                  className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${isCompared ? 'bg-purple-100 border-purple-200 text-purple-600 dark:bg-purple-950 dark:text-purple-300' : 'border-slate-200 hover:bg-slate-50'}`}
                                >
                                  {isCompared ? 'Compare Active' : '+ Compare'}
                                </button>
                                <button 
                                  onClick={() => toggleWishlist(prod)}
                                  className={`p-1.5 rounded-full border border-slate-200 dark:border-slate-700 hover:text-red-500 ${isWishlisted ? 'text-red-500' : ''}`}
                                >
                                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                                </button>
                              </div>
                            </div>
                            
                            <h3 onClick={() => handleProductClick(prod)} className="text-base font-extrabold text-slate-800 dark:text-slate-100 hover:text-blue-600 cursor-pointer transition-all leading-snug">
                              {prod.name}
                            </h3>
                            <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                              {prod.description}
                            </p>
                          </div>

                          <div className="flex items-center justify-between border-t border-slate-50 dark:border-slate-700/30 pt-3">
                            <div className="flex items-baseline gap-2">
                              <span className="text-lg font-black text-slate-900 dark:text-white">{formatPrice(prod.price)}</span>
                              {prod.discount > 0 && (
                                <span className="text-xs text-slate-400 line-through">{formatPrice(prod.originalPrice)}</span>
                              )}
                            </div>

                            <button 
                              onClick={() => addToCart(prod, 1)}
                              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs flex items-center gap-2 transition-all shadow cursor-pointer"
                            >
                              <ShoppingBag className="w-4 h-4" /> Add to Shopping Bag
                            </button>
                          </div>

                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>

      </div>

      {/* COMPARISON DRAWER WIDGET */}
      {compareProducts.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 p-4 shadow-2xl transition-all animate-slide-up flex flex-col md:flex-row items-center justify-between gap-4 max-w-7xl mx-auto rounded-t-3xl text-xs">
          <div className="flex items-center gap-4">
            <ArrowLeftRight className="w-5 h-5 text-purple-500 animate-pulse" />
            <div>
              <h4 className="font-extrabold text-slate-800 dark:text-white">Product Comparison Zone</h4>
              <p className="text-[10px] text-slate-400">Selected {compareProducts.length} out of max 3 products</p>
            </div>
          </div>

          <div className="flex items-center gap-4 overflow-x-auto py-1">
            {compareProducts.map(p => (
              <div key={p.id} className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800 px-3 py-2 rounded-xl border border-slate-100 dark:border-slate-700 shrink-0">
                <img src={p.images[0]} alt={p.name} className="w-8 h-8 rounded-lg object-cover" />
                <span className="font-extrabold text-slate-800 dark:text-slate-200 max-w-[80px] truncate">{p.name}</span>
                <button onClick={() => toggleCompare(p)} className="p-0.5 rounded-full hover:bg-red-50 text-slate-400 hover:text-red-500">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button 
              onClick={() => setCompareModalOpen(true)}
              className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-95 text-white font-extrabold rounded-xl shadow cursor-pointer"
            >
              Analyze Side-by-Side Now
            </button>
            <button 
              onClick={() => toggleCompare(compareProducts[0])}
              className="text-slate-400 hover:text-slate-600 font-bold"
            >
              Clear All
            </button>
          </div>
        </div>
      )}

      {/* COMPARISON SPECIFICS MODAL */}
      {compareModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl max-w-4xl w-full p-6 shadow-2xl relative max-h-[85vh] overflow-y-auto text-xs">
            
            <button onClick={() => setCompareModalOpen(false)} className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600">
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6">Heritage Comparison Analytics</h3>

            <div className="grid grid-cols-4 gap-4 border-b border-slate-100 dark:border-slate-800 pb-6 mb-6">
              
              {/* labels */}
              <div className="font-extrabold text-slate-400 flex flex-col justify-end">Product Attributes</div>

              {compareProducts.map(p => (
                <div key={p.id} className="text-center space-y-2">
                  <img src={p.images[0]} alt={p.name} className="w-24 h-24 rounded-2xl object-cover mx-auto shadow border border-slate-100 dark:border-slate-800" />
                  <h4 className="font-extrabold text-slate-800 dark:text-white line-clamp-2 min-h-[2.5rem]">{p.name}</h4>
                  <button onClick={() => addToCart(p, 1)} className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-[10px] flex items-center gap-1.5 mx-auto">
                    <ShoppingBag className="w-3.5 h-3.5" /> Buy Now
                  </button>
                </div>
              ))}

              {/* Pad empty columns if less than 3 */}
              {Array.from({ length: 3 - compareProducts.length }).map((_, idx) => (
                <div key={idx} className="bg-slate-50 dark:bg-slate-800/40 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-400 font-bold min-h-[150px]">
                  Add Product to Compare
                </div>
              ))}

            </div>

            {/* details matrix rows */}
            <div className="space-y-4">
              
              <div className="grid grid-cols-4 py-2 border-b border-slate-50 dark:border-slate-800/30 font-semibold">
                <span className="text-slate-400">Department</span>
                {compareProducts.map(p => <span key={p.id} className="text-slate-800 dark:text-slate-200 text-center">{p.category}</span>)}
              </div>

              <div className="grid grid-cols-4 py-2 border-b border-slate-50 dark:border-slate-800/30 font-semibold">
                <span className="text-slate-400">Price Value</span>
                {compareProducts.map(p => <span key={p.id} className="text-blue-600 dark:text-blue-400 font-black text-center">{formatPrice(p.price)}</span>)}
              </div>

              <div className="grid grid-cols-4 py-2 border-b border-slate-50 dark:border-slate-800/30 font-semibold">
                <span className="text-slate-400">Discount Offered</span>
                {compareProducts.map(p => <span key={p.id} className="text-orange-500 font-extrabold text-center">{p.discount}% Off</span>)}
              </div>

              <div className="grid grid-cols-4 py-2 border-b border-slate-50 dark:border-slate-800/30 font-semibold">
                <span className="text-slate-400">Manufacturer Brand</span>
                {compareProducts.map(p => <span key={p.id} className="text-slate-800 dark:text-slate-200 text-center">{p.brand}</span>)}
              </div>

              <div className="grid grid-cols-4 py-2 border-b border-slate-50 dark:border-slate-800/30 font-semibold">
                <span className="text-slate-400">Customer Rating</span>
                {compareProducts.map(p => (
                  <span key={p.id} className="flex items-center justify-center gap-1 text-yellow-400 font-bold">
                    <Star className="w-3.5 h-3.5 fill-current" /> {p.rating} ({p.reviewsCount})
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-4 py-2 border-b border-slate-50 dark:border-slate-800/30 font-semibold">
                <span className="text-slate-400">Inventory Stock</span>
                {compareProducts.map(p => <span key={p.id} className="text-center">{p.stock > 0 ? `${p.stock} units left` : 'Out of Stock'}</span>)}
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
