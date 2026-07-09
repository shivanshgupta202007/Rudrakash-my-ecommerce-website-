import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import AIRecommendations from './AIRecommendations';
import { Trash2, ShoppingBag, ArrowRight, ArrowLeft, Tag, X, Percent } from 'lucide-react';
import { MOCK_COUPONS } from '../data';

export default function CartPage() {
  const {
    cart = [],
    updateCartQuantity,
    removeFromCart,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    setActivePage,
    currency,
    lang
  } = useApp();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState<string | null>(null);

  const formatPrice = (val: number) => {
    if (currency === 'USD') {
      return `$${Math.round(val / 80)}`;
    }
    return `₹${val}`;
  };

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError(null);
    if (!couponInput.trim()) return;
    
    const err = applyCoupon(couponInput);
    if (err) {
      setCouponError(err);
    } else {
      setCouponInput('');
    }
  };

  const handleQuickCoupon = (code: string) => {
    setCouponError(null);
    const err = applyCoupon(code);
    if (err) {
      setCouponError(err);
    }
  };

  // Pricing calculations
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const totalOriginal = cart.reduce((sum, item) => sum + item.product.originalPrice * item.quantity, 0);
  const catalogSavings = totalOriginal - subtotal;
  
  let couponSavings = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountType === 'percentage') {
      couponSavings = Math.round(subtotal * (appliedCoupon.value / 100));
    } else {
      couponSavings = appliedCoupon.value;
    }
  }

  const shippingCharges = (subtotal - couponSavings) > 1500 ? 0 : 99;
  const gstTax = Math.round((subtotal - couponSavings) * 0.18); // 18% GST estimate
  const finalAmount = subtotal - couponSavings + shippingCharges;

  if (cart.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center space-y-6 font-sans min-h-screen flex flex-col justify-center items-center">
        <div className="p-5 bg-blue-50 dark:bg-slate-900 rounded-full text-blue-500 animate-bounce">
          <ShoppingBag className="w-12 h-12" />
        </div>
        
        <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Your shopping bag is empty</h2>
        <p className="text-xs text-slate-500 max-w-sm leading-relaxed">
          Explore our exclusive, premium collections of customized frames, handwoven silk sarees, copper carafes, and luxury gift hampers.
        </p>

        <button 
          onClick={() => { setActivePage('landing'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-extrabold text-xs flex items-center gap-2 shadow hover:shadow-xl transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Browse Treasures Now</span>
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 font-sans min-h-screen dark:bg-slate-950 transition-colors duration-300">
      
      <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-10">Your Shopping Bag</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
        
        {/* Left Columns: Items List */}
        <div className="lg:col-span-2 space-y-6">
          
          <div className="divide-y divide-slate-100 dark:divide-slate-800 border-b border-slate-100 dark:border-slate-800 pb-4">
            {cart.map((item, idx) => {
              const prod = item.product;
              return (
                <div key={idx} className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-6 gap-6 group">
                  
                  {/* Thumbnail and Title */}
                  <div className="flex items-center gap-4 flex-1">
                    <img 
                      src={prod.images[0]} 
                      alt={prod.name} 
                      className="w-20 h-20 rounded-2xl object-cover bg-slate-50 border border-slate-100 dark:border-slate-800"
                    />
                    <div className="space-y-1">
                      <span className="text-[9px] font-extrabold uppercase tracking-widest text-slate-400">{prod.category}</span>
                      <h3 className="text-xs font-bold text-slate-800 dark:text-slate-100 line-clamp-1 leading-snug">{prod.name}</h3>
                      
                      {/* Attributes */}
                      {(item.selectedColor || item.selectedSize) && (
                        <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold">
                          {item.selectedColor && <span>Color: {item.selectedColor}</span>}
                          {item.selectedColor && item.selectedSize && <span>•</span>}
                          {item.selectedSize && <span>Option: {item.selectedSize}</span>}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Quantity and Actions */}
                  <div className="flex items-center justify-between w-full sm:w-auto gap-8">
                    
                    {/* Qty Selector */}
                    <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-full p-0.5 bg-slate-50 dark:bg-slate-900">
                      <button 
                        onClick={() => updateCartQuantity(prod.id, item.quantity - 1, item.selectedColor, item.selectedSize)}
                        className="w-8 h-8 rounded-full hover:bg-white dark:hover:bg-slate-800 flex items-center justify-center font-bold text-slate-500"
                      >
                        -
                      </button>
                      <span className="w-6 text-center text-xs font-extrabold text-slate-800 dark:text-white">{item.quantity}</span>
                      <button 
                        onClick={() => updateCartQuantity(prod.id, item.quantity + 1, item.selectedColor, item.selectedSize)}
                        className="w-8 h-8 rounded-full hover:bg-white dark:hover:bg-slate-800 flex items-center justify-center font-bold text-slate-500"
                      >
                        +
                      </button>
                    </div>

                    {/* Price total */}
                    <div className="text-right flex flex-col justify-center min-w-[70px]">
                      <span className="text-xs font-black text-slate-900 dark:text-white">{formatPrice(prod.price * item.quantity)}</span>
                      {item.quantity > 1 && (
                        <span className="text-[9px] text-slate-400 font-semibold mt-0.5">{formatPrice(prod.price)} each</span>
                      )}
                    </div>

                    {/* Trash */}
                    <button 
                      onClick={() => removeFromCart(prod.id, item.selectedColor, item.selectedSize)}
                      className="p-2 text-slate-300 hover:text-red-500 dark:text-slate-600 dark:hover:text-red-400 transition-colors"
                      title="Remove product"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                  </div>

                </div>
              );
            })}
          </div>

          <button 
            onClick={() => { setActivePage('landing'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Continue Shopping for Treasures</span>
          </button>

        </div>

        {/* Right Column: Checkout Billing & Coupons panel */}
        <div className="space-y-6">
          
          {/* COUPONS WORKSHOP */}
          <div className="p-6 bg-slate-50 dark:bg-slate-900/60 rounded-[28px] border border-slate-100 dark:border-slate-800 text-xs space-y-4">
            <h3 className="font-extrabold text-slate-800 dark:text-white flex items-center gap-1.5">
              <Tag className="w-4 h-4 text-orange-500" />
              <span>Have a Promo Code?</span>
            </h3>
            
            {appliedCoupon ? (
              <div className="p-3 bg-blue-100/40 dark:bg-blue-950/20 rounded-xl border border-blue-200/40 dark:border-blue-800/40 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Percent className="w-4 h-4 text-blue-500 animate-pulse" />
                  <div>
                    <p className="font-extrabold text-blue-700 dark:text-blue-300">{appliedCoupon.code} Applied</p>
                    <p className="text-[10px] text-slate-500">Savings: {appliedCoupon.discountType === 'percentage' ? `${appliedCoupon.value}% Off` : `Flat ${formatPrice(appliedCoupon.value)} Off`}</p>
                  </div>
                </div>
                <button onClick={removeCoupon} className="p-1 rounded-full hover:bg-blue-100 text-slate-400 hover:text-slate-600">
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. RUDRAKASH10"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono font-bold"
                />
                <button 
                  type="submit"
                  className="px-5 py-2.5 bg-slate-900 dark:bg-slate-700 text-white font-extrabold hover:opacity-90 rounded-xl cursor-pointer"
                >
                  Apply
                </button>
              </form>
            )}

            {couponError && (
              <p className="text-red-500 font-bold text-[10px]">{couponError}</p>
            )}

            {/* Quick click suggestions */}
            {!appliedCoupon && (
              <div className="space-y-2 pt-2 border-t border-slate-200/40 dark:border-slate-700/40">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Tap to instantly apply:</p>
                <div className="flex flex-col gap-1.5">
                  {MOCK_COUPONS.map(c => (
                    <button
                      key={c.code}
                      onClick={() => handleQuickCoupon(c.code)}
                      className="w-full text-left p-2 rounded-lg bg-white dark:bg-slate-800 hover:bg-blue-50 border border-slate-100 dark:border-slate-700/60 hover:border-blue-200 transition-all flex items-center justify-between text-[10px] font-semibold text-slate-600 dark:text-slate-300"
                    >
                      <strong className="text-blue-600 dark:text-blue-400">{c.code}</strong>
                      <span className="text-slate-400 truncate max-w-[150px]">{c.description}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* BILLING BREAKDOWN */}
          <div className="p-6 bg-slate-50 dark:bg-slate-900/60 rounded-[28px] border border-slate-100 dark:border-slate-800 text-xs space-y-4">
            
            <h3 className="font-extrabold text-slate-800 dark:text-white text-sm">Order Summary</h3>

            <div className="space-y-3 border-b border-slate-100 dark:border-slate-800 pb-4 font-semibold">
              
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Total MRP (inclusive tax)</span>
                <span className="text-slate-800 dark:text-slate-200">{formatPrice(totalOriginal)}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-400">Bento Catalogue Discount</span>
                <span className="text-green-500">- {formatPrice(catalogSavings)}</span>
              </div>

              {appliedCoupon && (
                <div className="flex items-center justify-between text-blue-600 dark:text-blue-400">
                  <span>Coupon Deduction ({appliedCoupon.code})</span>
                  <span>- {formatPrice(couponSavings)}</span>
                </div>
              )}

              <div className="flex items-center justify-between">
                <span className="text-slate-400">GST Registration Tax (18% est)</span>
                <span className="text-slate-800 dark:text-slate-200">{formatPrice(gstTax)}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-400">Secured Shipping Charges</span>
                <span className="text-slate-800 dark:text-slate-200">
                  {shippingCharges === 0 ? <strong className="text-green-500 font-extrabold uppercase">FREE</strong> : formatPrice(shippingCharges)}
                </span>
              </div>

              {shippingCharges > 0 && (
                <p className="text-[9px] text-slate-400 italic">Add products worth {formatPrice(1500 - (subtotal - couponSavings))} more to unlock <strong className="text-green-500 font-extrabold">FREE SHIPPING</strong>!</p>
              )}

            </div>

            <div className="flex items-center justify-between text-base font-black text-slate-900 dark:text-white py-2">
              <span>Final Amount</span>
              <span className="text-xl font-black text-blue-600 dark:text-blue-400">{formatPrice(finalAmount)}</span>
            </div>

            <div className="text-[10px] text-slate-400 text-center leading-relaxed">
              We offer instant 100% money back guarantees. Click below to proceed to address & payment.
            </div>

            <button
              onClick={() => { setActivePage('checkout'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-95 text-white font-black text-xs rounded-full flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:scale-[1.01] transition-all cursor-pointer"
            >
              <span>PROCEED TO CHECKOUT ADDRESS</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </div>

        </div>

      </div>

      {/* AI RECOMMENDED UP-SELL ACCELERATOR SECTION */}
      <section className="mt-16 pt-10 border-t border-slate-100 dark:border-slate-850">
        <AIRecommendations 
          title="AI Spotlight: Recommended Pairings For Your Bag" 
          subtitle="Smart real-time cross-sell suggestions matching the items currently in your bag"
          location="cart"
        />
      </section>

    </div>
  );
}
