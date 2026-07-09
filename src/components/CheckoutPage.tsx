import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Address } from '../types';
import { 
  CreditCard, Truck, Landmark, ShoppingBag, ArrowLeft, Check, 
  MapPin, Plus, AlertCircle, Sparkles, Shield, Lock, RefreshCw
} from 'lucide-react';

export default function CheckoutPage() {
  const {
    cart = [],
    userAddresses = [],
    addUserAddress,
    createOrderFromCart,
    appliedCoupon,
    currency,
    lang,
    setActivePage
  } = useApp();

  const [selectedAddressId, setSelectedAddressId] = useState(userAddresses?.[0]?.id || '');
  const [paymentMethod, setPaymentMethod] = useState<'razorpay' | 'stripe' | 'cod'>('razorpay');
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);

  // New Address Form State aligned to Address model in types.ts
  const [addressForm, setAddressForm] = useState({
    fullName: 'Shivansh Gupta',
    phone: '9876543210',
    streetAddress: '',
    city: 'Varanasi',
    state: 'Uttar Pradesh',
    pincode: '221005',
    type: 'home' as 'home' | 'work'
  });
  const [formError, setFormError] = useState<string | null>(null);

  // UPI or Card details simulated state
  const [upiId, setUpiId] = useState('shivansh@okaxis');
  const [cardNumber, setCardNumber] = useState('4111 2222 3333 4444');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvv, setCardCvv] = useState('123');

  // Success Confirmation State
  const [orderConfirmation, setOrderConfirmation] = useState<any>(null);
  const [isPlacing, setIsPlacing] = useState(false);

  const formatPrice = (val: number) => {
    if (currency === 'USD') {
      return `$${Math.round(val / 80)}`;
    }
    return `₹${val}`;
  };

  // Pricing calculations
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  let couponSavings = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountType === 'percentage') {
      couponSavings = Math.round(subtotal * (appliedCoupon.value / 100));
    } else {
      couponSavings = appliedCoupon.value;
    }
  }
  const shippingCharges = (subtotal - couponSavings) > 1500 ? 0 : 99;
  const gstTax = Math.round((subtotal - couponSavings) * 0.18);
  const finalAmount = subtotal - couponSavings + shippingCharges;

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    const { streetAddress, city, state, pincode, fullName, phone } = addressForm;
    
    if (!streetAddress.trim() || !city.trim() || !state.trim() || pincode.length !== 6 || !fullName.trim() || phone.length < 10) {
      setFormError('Please fill out all fields with valid data.');
      return;
    }

    const newAddr: Omit<Address, 'id'> = {
      fullName,
      phone,
      streetAddress,
      city,
      state,
      pincode,
      type: addressForm.type,
      isDefault: userAddresses.length === 0
    };

    const added = addUserAddress(newAddr);
    setSelectedAddressId(added.id);
    setShowNewAddressForm(false);
    setAddressForm(prev => ({ ...prev, streetAddress: '' })); // reset
  };

  const handlePlaceOrder = () => {
    if (!selectedAddressId) {
      alert('Please select or add a shipping address.');
      return;
    }

    setIsPlacing(true);

    setTimeout(() => {
      const addressObj = userAddresses.find(a => a.id === selectedAddressId);
      if (!addressObj) return;

      const orderResult = createOrderFromCart(addressObj, paymentMethod, finalAmount);
      setOrderConfirmation(orderResult);
      setIsPlacing(false);
    }, 2000); // Simulate network latency
  };

  const handleOrderConfirmedRedirect = () => {
    setActivePage('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (orderConfirmation) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center space-y-8 font-sans min-h-screen flex flex-col justify-center items-center">
        
        <div className="p-6 bg-green-100 dark:bg-green-950 text-green-600 rounded-full animate-[pulse_1.5s_infinite]">
          <Check className="w-16 h-16" />
        </div>

        <div className="space-y-3">
          <span className="text-[10px] font-black text-orange-500 bg-orange-100 dark:bg-orange-950 px-3 py-1 rounded-full uppercase tracking-widest">
            Transacted Successfully
          </span>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Your order has been placed!</h2>
          <p className="text-xs text-slate-400">Order Reference: <strong className="text-blue-600 dark:text-blue-400 font-mono text-xs">{orderConfirmation.orderId}</strong></p>
        </div>

        <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-[28px] border border-slate-100 dark:border-slate-800 text-left text-xs w-full space-y-4">
          <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200 border-b border-slate-100 dark:border-slate-800 pb-3 font-extrabold">
            <Truck className="w-4 h-4 text-orange-500" />
            <span>Transit Estimation Tracker</span>
          </div>
          
          <div className="space-y-2">
            <p className="text-slate-500">Shipping to: <strong>{orderConfirmation.address.fullName}</strong> • {orderConfirmation.address.streetAddress}, {orderConfirmation.address.city}, {orderConfirmation.address.pincode}</p>
            <p className="text-slate-500">Est. Arrival: <strong className="text-blue-600 dark:text-blue-400">4 Business Days</strong> via Secured Express Courier</p>
            <p className="text-slate-500">Total Paid Amount: <strong className="text-slate-800 dark:text-white">{formatPrice(orderConfirmation.amount)}</strong> via {orderConfirmation.paymentMethod.toUpperCase()}</p>
          </div>
        </div>

        <button 
          onClick={handleOrderConfirmedRedirect}
          className="w-full py-4 bg-slate-900 dark:bg-slate-700 text-white font-extrabold text-xs rounded-full shadow hover:opacity-90 transition-all cursor-pointer"
        >
          Go to Orders Dashboard
        </button>

      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 font-sans min-h-screen dark:bg-slate-950 transition-colors duration-300">
      
      <button 
        onClick={() => { setActivePage('cart'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
        className="flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-slate-600 mb-8 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Cart</span>
      </button>

      <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-10">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
        
        {/* Left Column: Delivery Address & Payment */}
        <div className="lg:col-span-2 space-y-10">
          
          {/* 1. ADDRESS MANAGEMENT BLOCK */}
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h2 className="text-lg font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <span>1. Select Shipping Address</span>
              </h2>
              
              <button 
                onClick={() => setShowNewAddressForm(!showNewAddressForm)}
                className="px-4 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-300 font-bold text-xs flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add New Address</span>
              </button>
            </div>

            {/* Address Form Card */}
            {showNewAddressForm && (
              <form onSubmit={handleAddAddress} className="p-6 bg-slate-50 dark:bg-slate-900/60 rounded-[28px] border border-slate-200/50 dark:border-slate-800 text-xs space-y-4">
                <h3 className="font-extrabold text-slate-800 dark:text-white">Add shipping details</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-slate-400 font-semibold">Recipient Name</label>
                    <input
                      type="text"
                      required
                      value={addressForm.fullName}
                      onChange={(e) => setAddressForm(p => ({ ...p, fullName: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-slate-400 font-semibold">Mobile Number</label>
                    <input
                      type="text"
                      required
                      value={addressForm.phone}
                      onChange={(e) => setAddressForm(p => ({ ...p, phone: e.target.value.replace(/\D/g, '') }))}
                      className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400 font-semibold">Street & House Number</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 12, Kabir Nagar, near Durga Kund temple"
                    value={addressForm.streetAddress}
                    onChange={(e) => setAddressForm(p => ({ ...p, streetAddress: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-slate-400 font-semibold">City</label>
                    <input
                      type="text"
                      required
                      value={addressForm.city}
                      onChange={(e) => setAddressForm(p => ({ ...p, city: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-slate-400 font-semibold">State</label>
                    <input
                      type="text"
                      required
                      value={addressForm.state}
                      onChange={(e) => setAddressForm(p => ({ ...p, state: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-slate-400 font-semibold">Pincode (6-digits)</label>
                    <input
                      type="text"
                      required
                      maxLength={6}
                      value={addressForm.pincode}
                      onChange={(e) => setAddressForm(p => ({ ...p, pincode: e.target.value.replace(/\D/g, '') }))}
                      className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono font-bold"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400 font-semibold">Address Designation</label>
                  <div className="flex gap-3">
                    {[
                      { key: 'home', display: 'Home' },
                      { key: 'work', display: 'Office' }
                    ].map(opt => (
                      <button
                        key={opt.key}
                        type="button"
                        onClick={() => setAddressForm(p => ({ ...p, type: opt.key as any }))}
                        className={`px-4 py-2 rounded-xl border text-[11px] font-bold ${addressForm.type === opt.key ? 'bg-blue-600 text-white border-blue-600' : 'border-slate-200 text-slate-500'}`}
                      >
                        {opt.display}
                      </button>
                    ))}
                  </div>
                </div>

                {formError && (
                  <p className="text-red-500 font-semibold flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" /> {formError}
                  </p>
                )}

                <div className="flex gap-2">
                  <button type="submit" className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold rounded-xl cursor-pointer">
                    Save Address
                  </button>
                  <button type="button" onClick={() => setShowNewAddressForm(false)} className="px-5 py-2.5 border border-slate-200 rounded-xl font-bold">
                    Cancel
                  </button>
                </div>

              </form>
            )}

            {/* List saved addresses */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {userAddresses.length === 0 ? (
                <div className="sm:col-span-2 text-center py-8 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 text-slate-400 font-semibold">
                  No addresses saved. Please add an address to proceed.
                </div>
              ) : (
                userAddresses.map(addr => (
                  <div
                    key={addr.id}
                    onClick={() => setSelectedAddressId(addr.id)}
                    className={`p-5 rounded-3xl border-2 text-xs cursor-pointer transition-all flex flex-col justify-between h-40 relative overflow-hidden ${
                      selectedAddressId === addr.id 
                        ? 'bg-blue-50/20 border-blue-600 dark:bg-blue-950/20' 
                        : 'bg-white border-slate-100 dark:bg-slate-850 dark:border-slate-800'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold text-slate-900 dark:text-white">{addr.fullName}</span>
                        <span className="text-[9px] font-extrabold uppercase tracking-widest text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">{addr.type}</span>
                      </div>
                      <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed line-clamp-2">
                        {addr.streetAddress}, {addr.city}, {addr.state} - {addr.pincode}
                      </p>
                    </div>

                    <div className="flex items-center gap-1 text-[10px] text-slate-400 font-bold mt-3">
                      <span>Phone: {addr.phone}</span>
                      {selectedAddressId === addr.id && (
                        <span className="ml-auto flex items-center gap-1 text-blue-600 font-extrabold text-[9px] uppercase tracking-wider">
                          <Check className="w-3.5 h-3.5 fill-current" /> Selected
                        </span>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>

          </div>

          {/* 2. PAYMENT METHODS SELECTOR BLOCK */}
          <div className="space-y-6">
            <h2 className="text-lg font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              <CreditCard className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <span>2. Select Secured Payment Route</span>
            </h2>

            <div className="grid grid-cols-3 gap-4 text-xs font-bold">
              <button
                onClick={() => setPaymentMethod('razorpay')}
                className={`p-4 rounded-2xl border flex flex-col items-center gap-2 transition-all cursor-pointer ${paymentMethod === 'razorpay' ? 'bg-blue-50/40 border-blue-600 text-blue-600 dark:bg-blue-950/20' : 'border-slate-200 text-slate-500'}`}
              >
                <Landmark className="w-5 h-5" />
                <span>UPI / Razorpay</span>
              </button>
              
              <button
                onClick={() => setPaymentMethod('stripe')}
                className={`p-4 rounded-2xl border flex flex-col items-center gap-2 transition-all cursor-pointer ${paymentMethod === 'stripe' ? 'bg-blue-50/40 border-blue-600 text-blue-600 dark:bg-blue-950/20' : 'border-slate-200 text-slate-500'}`}
              >
                <CreditCard className="w-5 h-5" />
                <span>Stripe Card</span>
              </button>

              <button
                onClick={() => setPaymentMethod('cod')}
                className={`p-4 rounded-2xl border flex flex-col items-center gap-2 transition-all cursor-pointer ${paymentMethod === 'cod' ? 'bg-blue-50/40 border-blue-600 text-blue-600 dark:bg-blue-950/20' : 'border-slate-200 text-slate-500'}`}
              >
                <Truck className="w-5 h-5" />
                <span>Cash on Delivery</span>
              </button>
            </div>

            {/* Dynamic payment input simulator depending on selected tab */}
            <div className="p-6 bg-slate-50 dark:bg-slate-900/60 rounded-[28px] border border-slate-100 dark:border-slate-800 text-xs">
              
              {paymentMethod === 'razorpay' && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200 font-extrabold pb-2 border-b border-slate-200/40 dark:border-slate-700/40">
                    <span className="text-sm">💎</span>
                    <span>Razorpay Instant UPI Transfer Gateway</span>
                  </div>
                  
                  <div className="space-y-1">
                    <label className="text-slate-400 font-semibold">Enter your UPI ID Address</label>
                    <input
                      type="text"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      className="w-full max-w-sm px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono font-bold"
                    />
                  </div>
                  <p className="text-[10px] text-slate-400 italic">UPI request will be sent to your Google Pay, PhonePe, or Paytm app instantly on clicking Pay.</p>
                </div>
              )}

              {paymentMethod === 'stripe' && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200 font-extrabold pb-2 border-b border-slate-200/40 dark:border-slate-700/40">
                    <span className="text-sm">💳</span>
                    <span>Stripe Secured Credit / Debit Portal</span>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <label className="text-slate-400 font-semibold">Card Number</label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono font-bold"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-slate-400 font-semibold">Expiry Date (MM/YY)</label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono font-bold"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-slate-400 font-semibold">CVV Secure code</label>
                        <input
                          type="password"
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono font-bold"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'cod' && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200 font-extrabold pb-2 border-b border-slate-200/40 dark:border-slate-700/40">
                    <span className="text-sm">📦</span>
                    <span>Cash on Delivery Verification</span>
                  </div>
                  <p className="text-slate-500 font-medium leading-relaxed">
                    Paying cash on arrival is supported. A secure SMS / OTP will be sent on dispatch day to confirm delivery availability.
                  </p>
                </div>
              )}

            </div>

          </div>

        </div>

        {/* Right Column: Checkout Invoice & Order placements */}
        <div className="space-y-6">
          
          <div className="p-6 bg-slate-50 dark:bg-slate-900/60 rounded-[28px] border border-slate-100 dark:border-slate-800 text-xs space-y-4">
            
            <h3 className="font-extrabold text-slate-800 dark:text-white text-sm">Review Checkout Bag</h3>

            <div className="max-h-56 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800 pr-2 pb-2">
              {cart.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 py-3">
                  <img src={item.product.images[0]} alt="" className="w-10 h-10 rounded-xl object-cover" />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-slate-800 dark:text-slate-200 truncate">{item.product.name}</h4>
                    <p className="text-[10px] text-slate-400">Qty: {item.quantity} • {formatPrice(item.product.price)}</p>
                  </div>
                  <span className="font-extrabold text-slate-900 dark:text-white shrink-0">{formatPrice(item.product.price * item.quantity)}</span>
                </div>
              ))}
            </div>

            <div className="space-y-2.5 pt-4 border-t border-slate-100 dark:border-slate-800 font-semibold text-slate-500">
              <div className="flex justify-between">
                <span>Subtotal MRP</span>
                <span className="text-slate-800 dark:text-slate-200">{formatPrice(subtotal)}</span>
              </div>
              {appliedCoupon && (
                <div className="flex justify-between text-blue-600 dark:text-blue-400">
                  <span>Coupon ({appliedCoupon.code})</span>
                  <span>- {formatPrice(couponSavings)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>GST Tax rate (18%)</span>
                <span>{formatPrice(gstTax)}</span>
              </div>
              <div className="flex justify-between">
                <span>Secured express delivery</span>
                <span className="text-slate-800 dark:text-slate-200">{shippingCharges === 0 ? 'FREE' : formatPrice(shippingCharges)}</span>
              </div>
            </div>

            <div className="flex justify-between text-base font-black text-slate-900 dark:text-white pt-4 border-t border-slate-100 dark:border-slate-800">
              <span>Payable Total</span>
              <span className="text-lg font-black text-blue-600 dark:text-blue-400">{formatPrice(finalAmount)}</span>
            </div>

            {/* Trust Badges */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-slate-400 font-semibold text-[10px]">
                <Shield className="w-4 h-4 text-green-500" />
                <span>100% Safe Checkout Verified</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400 font-semibold text-[10px]">
                <Lock className="w-4 h-4 text-blue-500" />
                <span>256-bit AES SSL Secure Transit</span>
              </div>
            </div>

            <button
              onClick={handlePlaceOrder}
              disabled={isPlacing || !selectedAddressId}
              className="w-full py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-orange-500 hover:opacity-95 text-white font-black text-xs rounded-full flex items-center justify-center gap-2 shadow-lg cursor-pointer disabled:opacity-50"
            >
              {isPlacing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>SECURING TRANSACTIONS...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>SECURE & PLACE ORDER</span>
                </>
              )}
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}
