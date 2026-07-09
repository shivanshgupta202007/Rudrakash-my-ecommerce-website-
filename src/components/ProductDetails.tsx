import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Product, Review } from '../types';
import AIRecommendations from './AIRecommendations';
import { 
  Star, Heart, Share2, ShoppingBag, Truck, Gift, RefreshCw, 
  ChevronRight, Calendar, AlertCircle, MessageSquare, Play, Info
} from 'lucide-react';

export default function ProductDetails() {
  const {
    selectedProduct,
    cart = [],
    addToCart,
    wishlist = [],
    toggleWishlist,
    currency,
    lang,
    products = [],
    setSelectedProduct,
    addToRecentlyViewed,
    recentlyViewed = [],
    addReviewToProduct
  } = useApp();

  if (!selectedProduct) {
    return (
      <div className="text-center py-24 min-h-screen">
        <p className="text-slate-500 text-xs">No product selected. Please browse our collections.</p>
      </div>
    );
  }

  const [activeImg, setActiveImg] = useState(selectedProduct.images[0]);
  const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'video'>('desc');
  const [selectedSize, setSelectedSize] = useState(selectedProduct.sizes?.[0] || '');
  const [selectedColor, setSelectedColor] = useState(selectedProduct.colors?.[0] || '');
  const [quantity, setQuantity] = useState(1);
  
  // 360 View State
  const [is360Active, setIs360Active] = useState(false);
  const [rotationAngle, setRotationAngle] = useState(0); // drag offset

  // Pincode Check
  const [pincodeInput, setPincodeInput] = useState('');
  const [pincodeResult, setPincodeResult] = useState<any>(null);
  const [pincodeLoading, setPincodeLoading] = useState(false);
  const [pincodeError, setPincodeError] = useState<string | null>(null);

  // Review Form
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
  const [reviewSuccess, setReviewSuccess] = useState(false);

  useEffect(() => {
    setActiveImg(selectedProduct.images[0]);
    setIs360Active(false);
    setPincodeResult(null);
    setPincodeError(null);
    setReviewSuccess(false);
    setNewReview({ rating: 5, comment: '' });
  }, [selectedProduct]);

  const handlePincodeCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pincodeInput || pincodeInput.length !== 6) {
      setPincodeError('Please enter a 6-digit PIN-code.');
      return;
    }
    
    setPincodeLoading(true);
    setPincodeError(null);
    setPincodeResult(null);

    try {
      const response = await fetch('/api/pincode', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pincode: pincodeInput })
      });
      const data = await response.json();
      if (response.ok) {
        setPincodeResult(data);
      } else {
        setPincodeError(data.message || 'Verification failed. Try again.');
      }
    } catch (err) {
      setPincodeError('Network connection failed. Try again later.');
    } finally {
      setPincodeLoading(false);
    }
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.comment.trim()) return;
    
    addReviewToProduct(selectedProduct.id, {
      userName: 'Shivansh Gupta', // Authenticated user
      userEmail: 'shivanshgupta202007@gmail.com',
      rating: newReview.rating,
      comment: newReview.comment
    });

    setReviewSuccess(true);
    setNewReview({ rating: 5, comment: '' });
  };

  const formatPrice = (val: number) => {
    if (currency === 'USD') {
      return `$${Math.round(val / 80)}`;
    }
    return `₹${val}`;
  };

  const isWishlisted = wishlist.some(p => p.id === selectedProduct.id);

  // Get similar products based on same category
  const similarProducts = products
    .filter(p => p.category === selectedProduct.category && p.id !== selectedProduct.id)
    .slice(0, 4);

  // 360 degree drag rotation multiplier
  const handle360Drag = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!is360Active) return;
    const bounds = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - bounds.left;
    const pct = Math.min(Math.max(0, x / bounds.width), 1);
    
    // Choose which image index to render based on horizontal drag percentage
    const index = Math.floor(pct * (selectedProduct.images.length - 1));
    setActiveImg(selectedProduct.images[index]);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 font-sans min-h-screen dark:bg-slate-950 transition-colors duration-300">
      
      {/* Breadcrumbs */}
      <div className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mb-8">
        <span>Rudrakash</span>
        <ChevronRight className="w-3.5 h-3.5" />
        <span>{selectedProduct.category}</span>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-600 dark:text-slate-300 truncate max-w-[150px]">{selectedProduct.name}</span>
      </div>

      {/* Main product card panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        
        {/* Left Column: Interactive Media Showcase */}
        <div className="space-y-6">
          
          {/* Main Visual Display */}
          <div 
            onMouseMove={handle360Drag}
            className="aspect-square w-full rounded-[36px] bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 overflow-hidden relative shadow-sm group"
          >
            <img 
              src={activeImg} 
              alt={selectedProduct.name}
              className="w-full h-full object-cover transition-transform duration-300"
            />
            
            {/* 360 View Indicator */}
            {selectedProduct.images.length > 1 && (
              <button 
                onClick={() => setIs360Active(!is360Active)}
                className={`absolute bottom-6 right-6 px-4 py-2 rounded-full backdrop-blur shadow-md font-bold text-[10px] flex items-center gap-1.5 transition-all cursor-pointer ${
                  is360Active ? 'bg-orange-500 text-white' : 'bg-white/90 text-slate-700 hover:bg-white'
                }`}
              >
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>{is360Active ? 'Interactive 360 View Active (Drag Mouse)' : 'Simulate 360 View'}</span>
              </button>
            )}

            {selectedProduct.discount > 0 && (
              <span className="absolute top-6 left-6 bg-orange-500 text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow">
                Save {selectedProduct.discount}% Today
              </span>
            )}
          </div>

          {/* Media Thumbnails Grid */}
          <div className="flex items-center gap-4 overflow-x-auto py-1">
            {selectedProduct.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => { setActiveImg(img); setIs360Active(false); }}
                className={`w-20 h-20 rounded-2xl overflow-hidden bg-slate-50 border-2 transition-all ${
                  activeImg === img && !is360Active ? 'border-blue-600 scale-95 shadow-md' : 'border-slate-100 dark:border-slate-800'
                }`}
              >
                <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

        </div>

        {/* Right Column: Detailed Product Info & Checkout form */}
        <div className="space-y-8">
          
          {/* Header titles */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold uppercase tracking-widest text-blue-600 dark:text-blue-400 bg-blue-100/40 dark:bg-blue-950/20 px-3.5 py-1 rounded-full border border-blue-200/40 dark:border-blue-800/40 w-fit">
                {selectedProduct.category}
              </span>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => toggleWishlist(selectedProduct)}
                  className={`p-2.5 rounded-full border shadow-sm transition-all ${
                    isWishlisted ? 'bg-red-50 border-red-200 text-red-500' : 'border-slate-200 dark:border-slate-700 text-slate-400 hover:text-slate-600'
                  }`}
                  title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
              </div>
            </div>

            <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-snug">
              {selectedProduct.name}
            </h1>

            {/* Brand and rating */}
            <div className="flex items-center gap-4 text-xs font-semibold">
              <span className="text-slate-500">Brand Partner: <strong className="text-slate-800 dark:text-slate-200">{selectedProduct.brand}</strong></span>
              <span className="text-slate-300">|</span>
              <div className="flex items-center gap-1 text-yellow-400">
                <Star className="w-4 h-4 fill-current" />
                <span className="text-slate-800 dark:text-slate-200 font-extrabold">{selectedProduct.rating}</span>
                <span className="text-slate-400">({selectedProduct.reviewsCount} customer reviews)</span>
              </div>
            </div>
          </div>

          {/* Pricing Value card */}
          <div className="p-6 bg-slate-50 dark:bg-slate-900/60 rounded-3xl border border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] text-slate-400 uppercase tracking-widest font-extrabold block">Special Inclusive Price</span>
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-black text-slate-900 dark:text-white">{formatPrice(selectedProduct.price)}</span>
                {selectedProduct.discount > 0 && (
                  <span className="text-sm text-slate-400 line-through font-bold">{formatPrice(selectedProduct.originalPrice)}</span>
                )}
              </div>
            </div>
            
            {/* EMI estimation badge */}
            <div className="text-right space-y-1 hidden sm:block">
              <span className="text-[10px] text-slate-400 uppercase tracking-widest font-extrabold block">No Cost EMI Plans</span>
              <p className="text-xs font-extrabold text-blue-600 dark:text-blue-400">From {formatPrice(Math.round(selectedProduct.price / 12))}/month</p>
            </div>
          </div>

          {/* Color & Size Selectors if present */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs font-semibold">
            
            {selectedProduct.colors && (
              <div className="space-y-2">
                <span className="text-slate-400">Selected Color: <strong className="text-slate-800 dark:text-slate-200">{selectedColor}</strong></span>
                <div className="flex items-center gap-2">
                  {selectedProduct.colors.map(col => (
                    <button
                      key={col}
                      onClick={() => setSelectedColor(col)}
                      className={`px-4 py-2 rounded-xl border text-[11px] font-bold tracking-wide transition-all ${
                        selectedColor === col ? 'bg-blue-600 text-white border-blue-600 shadow-sm' : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      {col}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {selectedProduct.sizes && (
              <div className="space-y-2">
                <span className="text-slate-400">Select Options: <strong className="text-slate-800 dark:text-slate-200">{selectedSize}</strong></span>
                <div className="flex items-center gap-2">
                  {selectedProduct.sizes.map(sz => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`px-4 py-2 rounded-xl border text-[11px] font-bold tracking-wide transition-all ${
                        selectedSize === sz ? 'bg-blue-600 text-white border-blue-600 shadow-sm' : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Quantity Selector and Add-To-Cart actions */}
          <div className="flex items-center gap-4 text-xs font-bold">
            
            <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-full p-1 bg-white dark:bg-slate-900 shadow-inner">
              <button 
                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                className="w-10 h-10 rounded-full hover:bg-slate-50 flex items-center justify-center text-slate-500 font-bold"
              >
                -
              </button>
              <span className="w-8 text-center text-slate-800 dark:text-white font-extrabold">{quantity}</span>
              <button 
                onClick={() => setQuantity(prev => Math.min(selectedProduct.stock, prev + 1))}
                className="w-10 h-10 rounded-full hover:bg-slate-50 flex items-center justify-center text-slate-500 font-bold"
              >
                +
              </button>
            </div>

            <button 
              onClick={() => { addToCart(selectedProduct, quantity, selectedColor, selectedSize); }}
              disabled={selectedProduct.stock === 0}
              className="flex-1 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-95 text-white font-black rounded-full flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all cursor-pointer disabled:opacity-50"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>{selectedProduct.stock > 0 ? 'ADD TO SHOPPING BAG' : 'OUT OF STOCK'}</span>
            </button>

          </div>

          {/* PINCODE DELIVERY AVAILABILITY CHECKER */}
          <div className="p-6 bg-slate-50 dark:bg-slate-900/30 rounded-3xl border border-slate-100 dark:border-slate-800 text-xs space-y-4">
            <h4 className="font-extrabold text-slate-800 dark:text-white flex items-center gap-2">
              <Truck className="w-4 h-4 text-orange-500" />
              <span>Pincode Availability & Delivery Check</span>
            </h4>
            
            <form onSubmit={handlePincodeCheck} className="flex gap-2 max-w-sm">
              <input
                type="text"
                placeholder="Enter 6-digit PIN code (e.g. 221005)"
                maxLength={6}
                value={pincodeInput}
                onChange={(e) => setPincodeInput(e.target.value.replace(/\D/g, ''))}
                className="flex-1 px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono font-bold"
              />
              <button 
                type="submit"
                disabled={pincodeLoading}
                className="px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-slate-700 text-white font-extrabold hover:opacity-90 shrink-0 cursor-pointer flex items-center justify-center gap-1.5"
              >
                {pincodeLoading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : 'Verify'}
              </button>
            </form>

            {pincodeError && (
              <p className="text-red-500 flex items-center gap-1 font-semibold text-[10px]">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{pincodeError}</span>
              </p>
            )}

            {pincodeResult && (
              <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 flex items-start gap-3">
                <span className="text-xl">✅</span>
                <div className="space-y-0.5">
                  <p className="font-extrabold text-slate-800 dark:text-white">Delivery Available to {pincodeResult.pincode}</p>
                  <p className="text-slate-500 text-[10px]">{pincodeResult.zone} — Estimated arrival in <strong className="text-blue-600 dark:text-blue-400">{pincodeResult.estimatedDays} business days</strong></p>
                  <p className="text-[10px] text-slate-400">Shipping Fees: <strong className="text-slate-600 dark:text-slate-200">{pincodeResult.deliveryCharge}</strong> • Cash on Delivery is {pincodeResult.codAvailable ? 'AVAILABLE' : 'UNAVAILABLE'}</p>
                </div>
              </div>
            )}
          </div>

          {/* Description & specs tabs */}
          <div className="space-y-4">
            
            <div className="flex border-b border-slate-100 dark:border-slate-800 text-xs font-bold gap-6">
              <button 
                onClick={() => setActiveTab('desc')}
                className={`pb-3 border-b-2 transition-all ${activeTab === 'desc' ? 'border-blue-600 text-blue-600 dark:text-blue-400 font-black' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
              >
                Description
              </button>
              <button 
                onClick={() => setActiveTab('specs')}
                className={`pb-3 border-b-2 transition-all ${activeTab === 'specs' ? 'border-blue-600 text-blue-600 dark:text-blue-400 font-black' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
              >
                Specifications
              </button>
              {selectedProduct.videoUrl && (
                <button 
                  onClick={() => setActiveTab('video')}
                  className={`pb-3 border-b-2 transition-all flex items-center gap-1 ${activeTab === 'video' ? 'border-blue-600 text-blue-600 dark:text-blue-400 font-black' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
                >
                  <Play className="w-3.5 h-3.5 fill-current" /> Play Video
                </button>
              )}
            </div>

            <div className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">
              
              {activeTab === 'desc' && (
                <p>{selectedProduct.description}</p>
              )}

              {activeTab === 'specs' && selectedProduct.specs && (
                <div className="border border-slate-100 dark:border-slate-800 rounded-2xl overflow-hidden divide-y divide-slate-50 dark:divide-slate-800">
                  {selectedProduct.specs.map((item, idx) => (
                    <div key={idx} className="grid grid-cols-2 p-3 font-semibold hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                      <span className="text-slate-400">{item.name}</span>
                      <span className="text-slate-800 dark:text-slate-200">{item.value}</span>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'video' && (
                <div className="aspect-video bg-slate-900 rounded-2xl flex flex-col items-center justify-center text-center p-6 space-y-3 border border-slate-800">
                  <Play className="w-10 h-10 text-white fill-current animate-pulse" />
                  <p className="font-bold text-white">Visual Product Tour</p>
                  <p className="text-[10px] text-slate-400">Premium model showcasing laser etching finishes and gold-zari threads details.</p>
                </div>
              )}

            </div>

          </div>

          {/* ACTIVE REVIEWS MODULE */}
          <div className="space-y-6 pt-6 border-t border-slate-100 dark:border-slate-800 text-xs">
            
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-slate-900 dark:text-white text-sm">Customer Reviews ({selectedProduct.reviewsCount})</h3>
            </div>

            {/* List existing reviews */}
            <div className="space-y-4 max-h-72 overflow-y-auto pr-2">
              {(!selectedProduct.reviews || selectedProduct.reviews.length === 0) ? (
                <p className="text-slate-400 italic">No reviews yet. Be the first to review this product!</p>
              ) : (
                selectedProduct.reviews.map(rev => (
                  <div key={rev.id} className="p-4 bg-slate-50 dark:bg-slate-900/30 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center font-bold text-[10px] text-slate-700 dark:text-slate-300">
                          {rev.userName.charAt(0)}
                        </div>
                        <span className="font-extrabold text-slate-800 dark:text-slate-200">{rev.userName}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-semibold">{rev.date}</span>
                    </div>
                    
                    <div className="flex items-center text-yellow-400">
                      {Array.from({ length: rev.rating }).map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
                    </div>

                    <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                      "{rev.comment}"
                    </p>
                  </div>
                ))
              )}
            </div>

            {/* Submit review Form */}
            <form onSubmit={handleReviewSubmit} className="space-y-4 p-5 bg-blue-50/40 dark:bg-slate-900/40 border border-blue-100/50 dark:border-slate-850 rounded-2xl">
              <h4 className="font-extrabold text-slate-800 dark:text-white">Leave your direct feedback</h4>
              
              <div className="flex items-center gap-2">
                <span className="text-slate-500">Your Rating:</span>
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewReview(p => ({ ...p, rating: star }))}
                      className="text-yellow-400 focus:outline-none"
                    >
                      <Star className={`w-4 h-4 ${star <= newReview.rating ? 'fill-current' : ''}`} />
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <textarea
                  required
                  rows={3}
                  placeholder="Share your experience (texture, packaging, shipping wait...)"
                  value={newReview.comment}
                  onChange={(e) => setNewReview(p => ({ ...p, comment: e.target.value }))}
                  className="w-full p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
                />
              </div>

              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-blue-600 text-white font-extrabold text-xs hover:bg-blue-700 transition-all cursor-pointer shadow-sm"
              >
                Submit Verified Review
              </button>

              {reviewSuccess && (
                <p className="text-green-500 font-semibold text-[10px] animate-pulse">Thank you! Your verified review has been published instantly.</p>
              )}
            </form>

          </div>

        </div>

      </div>

      {/* RECOMMENDED / SIMILAR PRODUCTS CARDS ROW */}
      {similarProducts.length > 0 && (
        <section className="mt-20 pt-10 border-t border-slate-100 dark:border-slate-800">
          
          <div className="mb-8">
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">Similar Treasures in {selectedProduct.category}</h2>
            <p className="text-xs text-slate-400 mt-1">Recommended combinations & matches</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {similarProducts.map(prod => (
              <div 
                key={prod.id}
                onClick={() => { setSelectedProduct(prod); addToRecentlyViewed(prod); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="group bg-white dark:bg-slate-800 rounded-[28px] overflow-hidden border border-slate-100 dark:border-slate-700 p-4 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between gap-4 cursor-pointer"
              >
                <div className="relative h-40 w-full rounded-2xl overflow-hidden bg-slate-50 dark:bg-slate-900">
                  <img src={prod.images[0]} alt={prod.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="space-y-1">
                  <span className="text-[9px] font-extrabold uppercase tracking-widest text-slate-400 block">{prod.category}</span>
                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100 line-clamp-1 group-hover:text-blue-600 transition-colors leading-tight">{prod.name}</h4>
                  <span className="text-xs font-black text-slate-900 dark:text-white block">{formatPrice(prod.price)}</span>
                </div>
              </div>
            ))}
          </div>

        </section>
      )}

      {/* AI INTELLIGENT MATCHES SECTION */}
      <section className="mt-12 pt-10 border-t border-slate-100 dark:border-slate-850">
        <AIRecommendations 
          title="AI Curation: Perfect Pairing Recommendations" 
          subtitle="Smart real-time cross-sell suggestions based on this product and your taste profile"
          location="product_page"
        />
      </section>

    </div>
  );
}
