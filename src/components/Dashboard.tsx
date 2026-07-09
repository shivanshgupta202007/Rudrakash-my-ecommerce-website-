import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  User, ShoppingBag, Heart, Eye, Wallet, Calendar, Mail, 
  Phone, MapPin, Truck, RefreshCw, X, ArrowUpRight, AlertCircle, Trash2, Check, Lock, Smartphone, Shield, Sparkles
} from 'lucide-react';

export default function Dashboard() {
  const {
    user,
    login,
    orders = [],
    wishlist = [],
    recentlyViewed = [],
    toggleWishlist,
    addToCart,
    cancelOrder,
    returnOrder,
    currency,
    lang
  } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<'orders' | 'wishlist' | 'wallet'>('orders');
  
  // Wallet Top-Up simulation
  const [walletAmount, setWalletAmount] = useState(2500);
  const [topUpVal, setTopUpVal] = useState('');
  const [topUpSuccess, setTopUpSuccess] = useState(false);

  // Auth States
  const [activeAuthTab, setActiveAuthTab] = useState<'google' | 'phone'>('google');
  const [phoneInput, setPhoneInput] = useState('7415807062');
  const [otpInput, setOtpInput] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [showGooglePopup, setShowGooglePopup] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState('');

  const formatPrice = (val: number) => {
    if (currency === 'USD') {
      return `$${Math.round(val / 80)}`;
    }
    return `₹${val}`;
  };

  const handleTopUp = (e: React.FormEvent) => {
    e.preventDefault();
    const val = Number(topUpVal);
    if (!val || val <= 0) return;
    
    setWalletAmount(prev => prev + val);
    setTopUpSuccess(true);
    setTopUpVal('');
    setTimeout(() => setTopUpSuccess(false), 3000);
  };

  // Google Sign In Process
  const triggerGoogleSignIn = () => {
    setAuthError(null);
    setShowGooglePopup(true);
  };

  const confirmGoogleAccount = (email: string) => {
    setAuthLoading(true);
    setTimeout(() => {
      login(email, 'google');
      setAuthLoading(false);
      setShowGooglePopup(false);
    }, 1200);
  };

  // Mobile OTP Process
  const handleRequestOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    if (!phoneInput || phoneInput.length < 10) {
      setAuthError('Please enter a valid 10-digit Indian phone number.');
      return;
    }
    setAuthLoading(true);
    setTimeout(() => {
      const code = String(Math.floor(1000 + Math.random() * 9000));
      setGeneratedOtp(code);
      setOtpSent(true);
      setAuthLoading(false);
      // Automatically prefill OTP in a helper note for frictionless testing
    }, 1000);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    if (otpInput !== generatedOtp && otpInput !== '1234' && otpInput !== '2026') {
      setAuthError('Incorrect OTP entered. Please try again or use 2026.');
      return;
    }
    setAuthLoading(true);
    setTimeout(() => {
      login('shivanshgupta202007@gmail.com', 'otp');
      setAuthLoading(false);
    }, 1000);
  };

  // -----------------------------------------------------------------
  // 1. RENDER AUTHENTICATION PAGE IF LOGGED OUT
  // -----------------------------------------------------------------
  if (!user || !user.isLoggedIn) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 font-sans min-h-screen dark:bg-slate-950 transition-colors duration-300 flex flex-col justify-center items-center relative">
        {/* Decorative Ambient Radial Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-blue-500/5 dark:bg-blue-500/10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/3 w-[300px] h-[300px] rounded-full bg-orange-500/5 dark:bg-orange-500/5 blur-[100px] pointer-events-none" />

        <div className="w-full max-w-md bg-white dark:bg-white/5 dark:backdrop-blur-xl rounded-3rem border border-slate-100 dark:border-white/10 p-8 shadow-2xl relative z-10 space-y-8 text-xs">
          
          {/* Logo Brand Header */}
          <div className="text-center space-y-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-orange-500 bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">
              Rudrakash Royal Club
            </span>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight font-display mt-2">
              RUDRAKASH
            </h1>
            <p className="text-slate-500 text-xs">Verify your Indian shopping credentials</p>
          </div>

          {/* Auth Selection Tabs */}
          <div className="flex bg-slate-50 dark:bg-white/5 rounded-2xl p-1.5 border border-slate-100 dark:border-white/5">
            <button
              onClick={() => { setActiveAuthTab('google'); setAuthError(null); }}
              className={`flex-1 py-3 rounded-xl font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                activeAuthTab === 'google' 
                  ? 'bg-white dark:bg-white/10 text-slate-900 dark:text-white shadow-sm' 
                  : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
              }`}
            >
              <Sparkles className="w-4 h-4 text-blue-500" />
              <span>Google Sign-In</span>
            </button>
            <button
              onClick={() => { setActiveAuthTab('phone'); setAuthError(null); }}
              className={`flex-1 py-3 rounded-xl font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                activeAuthTab === 'phone' 
                  ? 'bg-white dark:bg-white/10 text-slate-900 dark:text-white shadow-sm' 
                  : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
              }`}
            >
              <Smartphone className="w-4 h-4 text-orange-500" />
              <span>Mobile & OTP</span>
            </button>
          </div>

          {/* AUTHENTICATION VIEWS */}
          {activeAuthTab === 'google' ? (
            // GOOGLE AUTH SCREEN
            <div className="space-y-6 text-center py-4">
              <div className="p-6 bg-slate-50 dark:bg-white/5 rounded-3xl border border-slate-100 dark:border-white/5 space-y-4">
                <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center mx-auto text-blue-500">
                  <Shield className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-extrabold text-slate-800 dark:text-white text-sm">One-Click Google Authentication</h3>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Instantly sync your wishlists, shopping carts, addresses and loyalty credentials across devices securely.
                  </p>
                </div>
              </div>

              {authError && (
                <div className="p-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 rounded-2xl text-red-500 font-bold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{authError}</span>
                </div>
              )}

              <button
                onClick={triggerGoogleSignIn}
                className="w-full py-4 rounded-full bg-white dark:bg-white/10 border border-slate-200 dark:border-white/15 hover:border-slate-400 dark:hover:border-white/30 text-slate-700 dark:text-white font-black hover:shadow-lg transition-all flex items-center justify-center gap-3 cursor-pointer"
              >
                {/* Custom Google Vector Logo */}
                <svg className="w-4.5 h-4.5 shrink-0" viewBox="0 0 24 24">
                  <path fill="#EA4335" d="M12 5.04c1.66 0 3.2.57 4.38 1.69l3.27-3.27C17.67 1.64 14.99 1 12 1 7.35 1 3.37 3.67 1.39 7.56l3.85 2.99c.92-2.77 3.51-4.51 6.76-4.51z"/>
                  <path fill="#4285F4" d="M23.49 12.27c0-.81-.07-1.59-.2-2.36H12v4.51h6.46c-.28 1.47-1.11 2.71-2.36 3.55l3.68 2.85c2.15-1.98 3.39-4.9 3.39-8.55z"/>
                  <path fill="#FBBC05" d="M5.24 14.85c-.24-.72-.38-1.5-.38-2.3s.14-1.58.38-2.3L1.39 7.26C.5 9.06 0 11.08 0 13.2s.5 4.14 1.39 5.94l3.85-2.99z"/>
                  <path fill="#34A853" d="M12 23c3.24 0 5.97-1.07 7.96-2.92l-3.68-2.85c-1.02.68-2.33 1.09-4.28 1.09-3.25 0-5.84-1.74-6.76-4.51L1.39 16.8C3.37 20.69 7.35 23 12 23z"/>
                </svg>
                <span>Continue with Google</span>
              </button>
            </div>
          ) : (
            // PHONE OTP SCREEN
            <div className="space-y-6">
              {!otpSent ? (
                <form onSubmit={handleRequestOtp} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-slate-400 font-bold uppercase tracking-wider text-[9px] block">Enter Mobile Number</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 font-extrabold text-slate-400">+91</span>
                      <input
                        type="tel"
                        maxLength={10}
                        required
                        placeholder="7415807062"
                        value={phoneInput}
                        onChange={(e) => setPhoneInput(e.target.value.replace(/\D/g, ''))}
                        className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 font-bold font-mono text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500/40"
                      />
                    </div>
                  </div>

                  {authError && (
                    <div className="p-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 rounded-2xl text-red-500 font-bold flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{authError}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={authLoading}
                    className="w-full py-4 rounded-full bg-gradient-to-r from-blue-600 via-purple-600 to-orange-500 hover:opacity-95 disabled:opacity-50 text-white font-black hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {authLoading ? (
                      <div className="w-4 h-4 rounded-full border-2 border-white/20 border-t-white animate-spin" />
                    ) : (
                      <>
                        <Lock className="w-4 h-4" />
                        <span>Send Encrypted OTP SMS</span>
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifyOtp} className="space-y-4">
                  <div className="space-y-1.5 text-center bg-orange-500/5 border border-orange-500/10 p-4 rounded-2xl">
                    <p className="font-semibold text-slate-600 dark:text-slate-300">
                      OTP sent successfully to <strong className="font-bold font-mono text-orange-500">+91 {phoneInput}</strong>
                    </p>
                    <p className="text-[10px] text-slate-400 font-bold mt-1">
                      For testing, type OTP: <span className="font-mono text-orange-500 underline font-black select-all">{generatedOtp}</span> or <span className="font-mono text-orange-500">2026</span>
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-slate-400 font-bold uppercase tracking-wider text-[9px] block">Enter 4-Digit Verification Code</label>
                    <input
                      type="text"
                      maxLength={4}
                      required
                      placeholder="Enter OTP..."
                      value={otpInput}
                      onChange={(e) => setOtpInput(e.target.value.replace(/\D/g, ''))}
                      className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 font-black font-mono text-center text-lg tracking-widest text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500/40"
                    />
                  </div>

                  {authError && (
                    <div className="p-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 rounded-2xl text-red-500 font-bold flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{authError}</span>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => { setOtpSent(false); setOtpInput(''); }}
                      className="flex-1 py-3.5 rounded-xl border border-slate-200 dark:border-white/10 text-slate-500 font-bold hover:bg-slate-50 dark:hover:bg-white/5"
                    >
                      Change Number
                    </button>
                    <button
                      type="submit"
                      disabled={authLoading}
                      className="flex-1 py-3.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-black flex items-center justify-center gap-1.5"
                    >
                      {authLoading ? (
                        <div className="w-4 h-4 rounded-full border-2 border-white/20 border-t-white animate-spin" />
                      ) : (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Verify & Login</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          <div className="text-[10px] text-slate-400 text-center flex items-center justify-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-blue-500" />
            <span>256-Bit Encrypted Indian Gateway transit routing.</span>
          </div>

        </div>

        {/* -----------------------------------------------------------------
        // 2. OFFICIAL REALISTIC GOOGLE ACCOUNTS POPUP OVERLAY
        // ----------------------------------------------------------------- */}
        {showGooglePopup && (
          <div className="fixed inset-0 bg-slate-900/65 backdrop-blur-sm flex items-center justify-center z-[100] p-4 text-slate-700 animate-fade-in">
            <div className="bg-white rounded-3xl max-w-sm w-full p-8 shadow-2xl border border-slate-100 space-y-6 text-xs text-left relative overflow-hidden">
              
              {/* Top Row: Google and Close Button */}
              <div className="flex items-center justify-between">
                {/* Official looking Google logo */}
                <svg className="h-6" viewBox="0 0 74 24">
                  <path fill="#EA4335" d="M23 12c0 3.3-2.7 6-6 6s-6-2.7-6-6 2.7-6 6-6 6 2.7 6 6zm-2.4 0c0-2.1-1.6-3.8-3.6-3.8S13.4 9.9 13.4 12s1.6 3.8 3.6 3.8 3.6-1.7 3.6-3.8zm11.8 0c0 3.3-2.7 6-6 6s-6-2.7-6-6 2.7-6 6-6 6 2.7 6 6zm-2.4 0c0-2.1-1.6-3.8-3.6-3.8S30 9.9 30 12s1.6 3.8 3.6 3.8 3.6-1.7 3.6-3.8zM45 12.3c0 3.1-2.2 5.7-5.3 5.7-1.1 0-2.2-.5-2.7-1.1v.8c0 2.2-1.2 3.4-3.1 3.4-1.6 0-2.6-1.1-3-2l2.1-.9c.4.9 1.2 1.5 2.1 1.5 1.2 0 1.9-.7 1.9-2.1v-.8c-.5.6-1.5 1.1-2.6 1.1-3.1 0-5.4-2.6-5.4-5.6s2.3-5.7 5.4-5.7c1.1 0 2.1.5 2.6 1.1v-.8H45v6.3zm-2.4-.2c0-2-1.5-3.6-3.4-3.6-2 0-3.5 1.6-3.5 3.6s1.5 3.6 3.5 3.6c1.9.1 3.4-1.5 3.4-3.6zm6.3-6.5h2.4v12h-2.4zm10.7 6.7c0-2-1.5-3.6-3.4-3.6-1.9 0-3.4 1.5-3.4 3.6H63.6l-.1-.4zm.1 1c-1 2.3-3.4 4.1-6.6 4.1-3.2 0-5.7-2.5-5.7-5.7S53.9 6 57 6c3.2 0 5.4 2.4 5.4 5.7H54.5c.1 2 1.6 3.4 3.4 3.4 1.4 0 2.3-.7 2.8-1.5l2-.1zM6.2 11.2c0-3.2 2.5-5.7 5.7-5.7 1.8 0 3.2.7 4.3 1.7l-1.8 1.8c-.7-.7-1.5-1.2-2.5-1.2-2.1 0-3.8 1.7-3.8 3.9s1.7 3.9 3.8 3.9c1.3 0 2.1-.5 2.6-1 .4-.4.7-1 .8-1.8H12v-2.4h7.5c.1.4.1.8.1 1.3 0 2.1-.6 4.3-2.3 5.9-1.6 1.7-3.8 2.6-6.4 2.6C2.8 18 0 15 0 11.2h6.2z"/>
                </svg>

                <button 
                  onClick={() => setShowGooglePopup(false)}
                  className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-all cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Account Selection Info */}
              <div className="space-y-1.5">
                <h2 className="text-lg font-bold text-slate-800">Choose an account</h2>
                <p className="text-slate-500">to continue to <strong className="font-extrabold text-slate-800">Rudrakash Store</strong></p>
              </div>

              {/* Account Options List */}
              <div className="space-y-3.5 py-2">
                {/* Master User Account Option */}
                <button
                  onClick={() => confirmGoogleAccount('shivanshgupta202007@gmail.com')}
                  className="w-full flex items-center gap-4 p-3.5 rounded-2xl hover:bg-slate-50 border border-transparent hover:border-slate-100 text-left transition-all cursor-pointer group"
                >
                  <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-black flex items-center justify-center text-sm shadow-inner shrink-0">
                    S
                  </div>
                  <div className="flex-1 space-y-0.5 truncate">
                    <h4 className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors">Shivansh Gupta</h4>
                    <p className="text-slate-400 text-[10px] truncate">shivanshgupta202007@gmail.com</p>
                  </div>
                  <div className="text-slate-300 group-hover:text-blue-500 shrink-0">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </button>

                {/* Secondary Option */}
                <button
                  onClick={() => confirmGoogleAccount('guest@rudrakash.com')}
                  className="w-full flex items-center gap-4 p-3.5 rounded-2xl hover:bg-slate-50 border border-transparent hover:border-slate-100 text-left transition-all cursor-pointer group"
                >
                  <div className="w-10 h-10 rounded-full bg-purple-500 text-white font-black flex items-center justify-center text-sm shadow-inner shrink-0">
                    G
                  </div>
                  <div className="flex-1 space-y-0.5 truncate">
                    <h4 className="font-bold text-slate-800 group-hover:text-purple-600 transition-colors">Alternative Guest Account</h4>
                    <p className="text-slate-400 text-[10px] truncate">guest@rudrakash.com</p>
                  </div>
                  <div className="text-slate-300 group-hover:text-purple-500 shrink-0">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </button>
              </div>

              {authLoading && (
                <div className="flex items-center gap-2.5 p-3.5 bg-blue-50 rounded-2xl text-blue-600 font-bold justify-center">
                  <div className="w-4 h-4 rounded-full border-2 border-blue-500/20 border-t-blue-500 animate-spin" />
                  <span>Connecting secure session...</span>
                </div>
              )}

              {/* Privacy Footer */}
              <div className="text-[10px] text-slate-400 leading-relaxed border-t border-slate-100 pt-4 space-y-1">
                <p>To continue, Google will share your name, email address, profile picture, and language preference with Rudrakash.</p>
                <p className="font-bold">See Rudrakash's Privacy Policy and Terms of Service.</p>
              </div>

            </div>
          </div>
        )}

      </div>
    );
  }

  // -----------------------------------------------------------------
  // 3. RENDER MAIN LOGGED IN DASHBOARD
  // -----------------------------------------------------------------
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 font-sans min-h-screen dark:bg-slate-950 transition-colors duration-300">
      
      {/* 1. HERO ACCOUNT PROFILE CARD */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-blue-950 rounded-[36px] p-6 md:p-10 text-white border border-slate-800 shadow-xl mb-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        
        {/* Ambient light glow */}
        <div className="absolute -bottom-10 -right-10 w-48 h-48 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="flex items-center gap-5 relative z-10">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-black text-2xl border-4 border-slate-800">
            {user?.name ? user.name.charAt(0) : 'S'}
          </div>
          <div className="space-y-1">
            <span className="text-[10px] font-black text-orange-400 bg-orange-500/15 px-3 py-0.5 border border-orange-500/30 rounded-full uppercase tracking-widest">
              Premium Customer Account
            </span>
            <h2 className="text-2xl font-black tracking-tight">{user?.name || 'Shivansh Gupta'}</h2>
            
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs text-slate-400 font-semibold">
              <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5 text-blue-400" /> {user?.email || 'shivanshgupta202007@gmail.com'}</span>
              {user?.phone && (
                <>
                  <span className="hidden sm:inline text-slate-700">|</span>
                  <span className="flex items-center gap-1"><Smartphone className="w-3.5 h-3.5 text-orange-400" /> +91 {user?.phone}</span>
                </>
              )}
              <span className="hidden sm:inline text-slate-700">|</span>
              <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-purple-400" /> Joined July 2026</span>
            </div>
          </div>
        </div>

        {/* Quick Balance Wallet */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 min-w-[200px] space-y-1.5 relative z-10">
          <span className="text-[9px] text-slate-400 uppercase tracking-widest font-extrabold flex items-center gap-1">
            <Wallet className="w-3.5 h-3.5 text-orange-400" />
            <span>Rudrakash Secured Wallet</span>
          </span>
          <p className="text-2xl font-black text-orange-400">{formatPrice(walletAmount)}</p>
          <p className="text-[9px] text-slate-400 font-semibold">Available for instant cashback & purchase rebates</p>
        </div>

      </div>

      {/* 2. DASHBOARD SUB TABS BAR */}
      <div className="flex border-b border-slate-100 dark:border-slate-800 text-xs font-bold gap-8 mb-8">
        <button
          onClick={() => setActiveSubTab('orders')}
          className={`pb-3 border-b-2 transition-all flex items-center gap-1.5 ${
            activeSubTab === 'orders' ? 'border-blue-600 text-blue-600 dark:text-blue-400 font-black' : 'border-transparent text-slate-400 hover:text-slate-600'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>My Orders ({orders.length})</span>
        </button>
        
        <button
          onClick={() => setActiveSubTab('wishlist')}
          className={`pb-3 border-b-2 transition-all flex items-center gap-1.5 ${
            activeSubTab === 'wishlist' ? 'border-blue-600 text-blue-600 dark:text-blue-400 font-black' : 'border-transparent text-slate-400 hover:text-slate-600'
          }`}
        >
          <Heart className="w-4 h-4" />
          <span>Saved Wishlist ({wishlist.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('wallet')}
          className={`pb-3 border-b-2 transition-all flex items-center gap-1.5 ${
            activeSubTab === 'wallet' ? 'border-blue-600 text-blue-600 dark:text-blue-400 font-black' : 'border-transparent text-slate-400 hover:text-slate-600'
          }`}
        >
          <Wallet className="w-4 h-4" />
          <span>Wallet Top-Up</span>
        </button>
      </div>

      {/* 3. SUBTAB CONTENT ZONE */}
      <div className="space-y-12">
        
        {/* ORDERS TAB */}
        {activeSubTab === 'orders' && (
          <div className="space-y-6">
            {orders.length === 0 ? (
              <div className="text-center py-16 bg-slate-50 dark:bg-slate-900 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800 text-slate-400 font-semibold text-xs space-y-2">
                <span className="text-3xl">📦</span>
                <p>You have not placed any orders yet.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {orders.map((ord) => (
                  <div 
                    key={ord.id} 
                    className="bg-white dark:bg-slate-850 rounded-[32px] border border-slate-100 dark:border-slate-800 p-6 shadow-sm space-y-6 hover:shadow-md transition-shadow text-xs"
                  >
                    
                    {/* Header Row */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-4 gap-4">
                      <div className="flex flex-wrap items-center gap-4 text-[11px]">
                        <div>
                          <p className="text-slate-400 font-semibold">ORDER PLACED</p>
                          <p className="font-extrabold text-slate-800 dark:text-slate-200">{ord.date ? new Date(ord.date).toLocaleDateString('en-IN', {day: 'numeric', month: 'short', year: 'numeric'}) : 'Recent'}</p>
                        </div>
                        <div>
                          <p className="text-slate-400 font-semibold">TOTAL TRANSACTION</p>
                          <p className="font-extrabold text-slate-900 dark:text-white">{formatPrice(ord.finalAmount || ord.totalAmount || 0)}</p>
                        </div>
                        <div>
                          <p className="text-slate-400 font-semibold">SHIP TO RECIPIENT</p>
                          <p className="font-extrabold text-slate-800 dark:text-slate-200">{ord.address.fullName || ord.address.fullName || ''}</p>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="text-slate-400 font-semibold">ORDER ID REFERENCE</p>
                        <p className="font-extrabold font-mono text-blue-600 dark:text-blue-400">{ord.id}</p>
                      </div>
                    </div>

                    {/* Products Rows list */}
                    <div className="divide-y divide-slate-50 dark:divide-slate-800">
                      {ord.items.map((it, itemIdx) => (
                        <div key={itemIdx} className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-4 gap-4">
                          
                          <div className="flex items-center gap-4 flex-1">
                            <img src={it.image || ''} alt="" className="w-16 h-16 rounded-xl object-cover bg-slate-50 border border-slate-100 dark:border-slate-850" />
                            <div className="space-y-0.5">
                              <h4 className="font-extrabold text-slate-800 dark:text-slate-100">{it.name}</h4>
                              <p className="text-slate-400">Quantity: {it.quantity} • Paid Price: {formatPrice(it.price)}</p>
                            </div>
                          </div>

                          {/* Order Status Badge */}
                          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                            
                            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-300 border border-blue-100/40 dark:border-blue-800/40 font-bold uppercase text-[9px] tracking-wide">
                              <Truck className="w-3.5 h-3.5" />
                              <span>{(ord.orderStatus || 'Ordered').toUpperCase()}</span>
                            </div>

                            {/* Actions conditional buttons */}
                            <div className="flex items-center gap-2">
                              {((ord.orderStatus || '').toLowerCase() === 'ordered' || (ord.orderStatus || '').toLowerCase() === 'pending') && (
                                <button
                                  onClick={() => cancelOrder(ord.id)}
                                  className="px-3 py-1.5 rounded-lg border border-red-200 text-red-500 hover:bg-red-50 dark:border-red-950 dark:hover:bg-red-950/40 font-bold flex items-center gap-1"
                                >
                                  <X className="w-3.5 h-3.5" /> Cancel Order
                                </button>
                              )}

                              {(ord.orderStatus || '').toLowerCase() === 'delivered' && (
                                <button
                                  onClick={() => returnOrder(ord.id)}
                                  className="px-3 py-1.5 rounded-lg border border-orange-200 text-orange-500 hover:bg-orange-50 dark:border-orange-950 dark:hover:bg-orange-950/40 font-bold flex items-center gap-1"
                                >
                                  <RefreshCw className="w-3.5 h-3.5" /> Return Product
                                </button>
                              )}
                            </div>

                          </div>

                        </div>
                      ))}
                    </div>

                    {/* Delivery Address Summary */}
                    <div className="bg-slate-50 dark:bg-slate-900/40 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 text-slate-500 font-semibold flex items-center justify-between">
                      <p className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-orange-500 shrink-0" />
                        <span>Deliver to: {ord.address.streetAddress || ord.address.street || ''}, {ord.address.city}, {ord.address.state} - {ord.address.pincode}</span>
                      </p>
                      <span className="text-[10px] text-slate-400 font-bold uppercase">Payment method: {ord.paymentMethod.toUpperCase()}</span>
                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* WISHLIST TAB */}
        {activeSubTab === 'wishlist' && (
          <div className="space-y-6">
            {wishlist.length === 0 ? (
              <div className="text-center py-16 bg-slate-50 dark:bg-slate-900 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800 text-slate-400 font-semibold text-xs space-y-2">
                <span className="text-3xl">💖</span>
                <p>No wishlisted creations saved yet.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {wishlist.map(prod => (
                  <div key={prod.id} className="group bg-white dark:bg-slate-800 rounded-[28px] overflow-hidden border border-slate-100 dark:border-slate-700/60 p-4 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between gap-4 relative">
                    
                    <button 
                      onClick={() => toggleWishlist(prod)}
                      className="absolute top-6 right-6 z-20 p-2 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur text-red-500 shadow-sm hover:opacity-80 transition-all"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                    <div className="relative h-44 w-full rounded-2xl overflow-hidden bg-slate-50 dark:bg-slate-900">
                      <img src={prod.images[0]} alt={prod.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>

                    <div className="space-y-1">
                      <span className="text-[9px] font-extrabold uppercase tracking-widest text-slate-400 block">{prod.category}</span>
                      <h3 className="text-xs font-bold text-slate-800 dark:text-slate-100 line-clamp-1 leading-snug">{prod.name}</h3>
                      <span className="text-sm font-black text-slate-900 dark:text-white block">{formatPrice(prod.price)}</span>
                    </div>

                    <button
                      onClick={() => addToCart(prod, 1)}
                      className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs flex items-center justify-center gap-1.5"
                    >
                      <ShoppingBag className="w-4 h-4" /> Move to Bag
                    </button>

                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* WALLET TOP UP TAB */}
        {activeSubTab === 'wallet' && (
          <div className="max-w-md mx-auto bg-white dark:bg-slate-850 border border-slate-100 dark:border-slate-800 rounded-[32px] p-8 shadow-md text-xs space-y-6">
            
            <div className="space-y-2 text-center">
              <div className="p-3.5 bg-orange-50 dark:bg-orange-950/40 rounded-full w-fit mx-auto text-orange-500">
                <Wallet className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">Secure Wallet Refills</h3>
              <p className="text-slate-400">Instantly top up your balance. No fees, encrypted routing.</p>
            </div>

            <form onSubmit={handleTopUp} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Top-Up Value (INR)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-extrabold text-slate-400 text-sm">₹</span>
                  <input
                    type="text"
                    required
                    placeholder="Enter amount (e.g. 1000)"
                    value={topUpVal}
                    onChange={(e) => setTopUpVal(e.target.value.replace(/\D/g, ''))}
                    className="w-full pl-8 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono font-bold text-sm text-slate-800 dark:text-white focus:outline-none"
                  />
                </div>
              </div>

              {/* quick click templates */}
              <div className="flex gap-2.5">
                {[500, 1000, 2000].map(amt => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setTopUpVal(String(amt))}
                    className="flex-1 py-2 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-blue-400 hover:text-blue-500 font-extrabold text-[10px] transition-colors"
                  >
                    + ₹{amt}
                  </button>
                ))}
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-95 text-white font-black shadow"
              >
                AUTHORIZE TOP-UP REFUND CARD
              </button>
            </form>

            {topUpSuccess && (
              <div className="p-3 bg-green-50 dark:bg-green-950 rounded-xl border border-green-100/40 dark:border-green-800/40 text-green-600 flex items-center gap-2 font-bold">
                <Check className="w-4 h-4 shrink-0" />
                <span>Wallet credited successfully!</span>
              </div>
            )}

          </div>
        )}

        {/* 4. RECENTLY VIEWED PRODUCTS ROW SECTION */}
        {recentlyViewed.length > 0 && (
          <section className="pt-8 border-t border-slate-100 dark:border-slate-800">
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white tracking-tight mb-6 flex items-center gap-1.5">
              <Eye className="w-4 h-4 text-blue-500" />
              <span>Your Recently Viewed Treasures</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {recentlyViewed.map(p => (
                <div 
                  key={p.id}
                  className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700/60 p-4 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow"
                >
                  <img src={p.images[0]} alt="" className="w-12 h-12 rounded-lg object-cover" />
                  <div className="space-y-0.5">
                    <h4 className="font-extrabold text-slate-800 dark:text-white line-clamp-1">{p.name}</h4>
                    <p className="text-blue-600 font-extrabold text-[10px]">{formatPrice(p.price)}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

      </div>

    </div>
  );
}
