import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Search, Mic, Heart, ShoppingBag, Bell, User, Sun, Moon, 
  Menu, X, ChevronDown, Award, Wallet, LogOut, Settings, LayoutDashboard
} from 'lucide-react';

export default function Navbar() {
  const {
    activePage,
    setActivePage,
    cart = [],
    wishlist = [],
    lang,
    setLang,
    currency,
    setCurrency,
    theme,
    setTheme,
    user,
    logout,
    searchQuery,
    setSearchQuery,
    voiceActive,
    setVoiceActive
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'Order #ORD-98412 is packed & ready for shipment!', time: '1 hr ago', unread: true },
    { id: 2, text: 'Shivansh Gupta, use code FESTIVAL500 to save flat ₹500 today!', time: '4 hrs ago', unread: true },
    { id: 3, text: 'Welcome to Rudrakash Luxury! Enjoy premium shopping.', time: '1 day ago', unread: false }
  ]);

  const handleVoiceSearch = () => {
    setVoiceActive(true);
    // Simulate speech recognition
    setTimeout(() => {
      const phrases = ['Banarasi Silk Saree', 'Personalized Gift Hamper', 'Copper Bottle Set', 'Saffron Facial Oil'];
      const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
      setSearchQuery(randomPhrase);
      setVoiceActive(false);
      setActivePage('listing');
    }, 2500);
  };

  const handlePageChange = (page: string) => {
    setActivePage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const unreadNotifications = notifications.filter(n => n.unread).length;

  return (
    <div className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* PRE-HEADER / TRUST BAR */}
      <div className="h-8 bg-gradient-to-r from-[#1E3A8A] to-[#6366F1] flex items-center justify-center text-[10px] uppercase tracking-widest font-semibold px-6 text-white text-center select-none">
        <span>Free Express Shipping on orders over ₹1999 • Luxury Gifting Reimagined • Dedicated Support 24/7</span>
      </div>

      <nav className="bg-white/95 dark:bg-[#020617]/90 backdrop-blur-xl border-b border-slate-100 dark:border-white/10 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo Section */}
            <div className="flex items-center gap-2 cursor-pointer font-display" onClick={() => handlePageChange('landing')}>
              <div className="text-2xl font-black tracking-tighter text-slate-900 dark:text-white">
                RUDRA<span className="text-orange-500 underline underline-offset-4 decoration-2">KASH</span>
              </div>
              <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            </div>

          {/* Desktop Central Navigation Links */}
          <div className="hidden lg:flex items-center gap-8">
            <button 
              onClick={() => handlePageChange('landing')}
              className={`text-sm font-semibold tracking-wide transition-all ${
                activePage === 'landing' 
                  ? 'text-blue-600 dark:text-blue-400 font-bold border-b-2 border-blue-600 pb-1' 
                  : 'text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400'
              }`}
            >
              {lang === 'en' ? 'Home' : 'मुख्य पृष्ठ'}
            </button>
            <button 
              onClick={() => handlePageChange('categories')}
              className={`text-sm font-semibold tracking-wide transition-all ${
                activePage === 'categories' 
                  ? 'text-blue-600 dark:text-blue-400 font-bold border-b-2 border-blue-600 pb-1' 
                  : 'text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400'
              }`}
            >
              {lang === 'en' ? 'Categories' : 'श्रेणियाँ'}
            </button>
            <button 
              onClick={() => handlePageChange('listing')}
              className={`text-sm font-semibold tracking-wide transition-all ${
                activePage === 'listing' 
                  ? 'text-blue-600 dark:text-blue-400 font-bold border-b-2 border-blue-600 pb-1' 
                  : 'text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400'
              }`}
            >
              {lang === 'en' ? 'Deals & Offers' : 'डील्स और ऑफर्स'}
            </button>
          </div>

          {/* Premium Search Bar Section */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8 relative">
            <div className="relative w-full">
              <input
                type="text"
                placeholder={lang === 'en' ? 'Search luxurious Indian gifts, silks...' : 'लक्ज़री भारतीय उपहार खोजें...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handlePageChange('listing')}
                className="w-full pl-10 pr-12 py-2.5 rounded-full bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white text-sm border border-slate-200/60 dark:border-slate-700/60 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all shadow-inner"
              />
              <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
              
              {/* Voice search button */}
              <button 
                onClick={handleVoiceSearch}
                className={`absolute right-3 top-2.5 p-1 rounded-full text-slate-400 hover:text-blue-500 dark:hover:text-blue-400 transition-all ${
                  voiceActive ? 'bg-orange-100 text-orange-600 dark:bg-orange-950/50 dark:text-orange-400 animate-ping' : ''
                }`}
                title="Search using your voice"
              >
                <Mic className="w-4 h-4" />
              </button>
            </div>
            {voiceActive && (
              <div className="absolute top-12 left-0 right-0 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl p-4 shadow-xl z-50 text-center text-xs text-slate-500 dark:text-slate-400 animate-fade-in flex items-center justify-center gap-2">
                <span className="w-2 h-2 rounded-full bg-orange-500 animate-bounce" />
                <span>Listening for shopping products... Try speaking now</span>
              </div>
            )}
          </div>

          {/* Desktop Right Hand Icons Actions Panel */}
          <div className="hidden md:flex items-center gap-5">
            
            {/* Currency switcher */}
            <div className="relative">
              <button 
                onClick={() => setCurrency(currency === 'INR' ? 'USD' : 'INR')}
                className="text-xs font-bold tracking-wider px-2 py-1 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
                title="Change currency"
              >
                {currency === 'INR' ? '₹ INR' : '$ USD'}
              </button>
            </div>

            {/* Language Selection */}
            <div className="relative">
              <button 
                onClick={() => setShowLangDropdown(!showLangDropdown)}
                className="text-xs font-semibold px-2.5 py-1 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-1 transition-all"
              >
                {lang === 'en' ? 'EN' : 'HI'}
                <ChevronDown className="w-3 h-3" />
              </button>
              {showLangDropdown && (
                <div className="absolute right-0 mt-2 w-28 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 py-1 z-50">
                  <button 
                    onClick={() => { setLang('en'); setShowLangDropdown(false); }}
                    className="w-full text-left px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50"
                  >
                    English
                  </button>
                  <button 
                    onClick={() => { setLang('hi'); setShowLangDropdown(false); }}
                    className="w-full text-left px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50"
                  >
                    हिन्दी (Hindi)
                  </button>
                </div>
              )}
            </div>

            {/* Dark Mode Toggle */}
            <button 
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-all"
              title="Toggle theme"
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>

            {/* Wishlist Button */}
            <button 
              onClick={() => handlePageChange('listing')}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-all relative"
              title="My Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-orange-500 text-white font-extrabold text-[10px] w-4 h-4 rounded-full flex items-center justify-center animate-bounce shadow">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Cart Button */}
            <button 
              onClick={() => handlePageChange('cart')}
              className="p-2.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-all relative"
              title="Shopping Bag"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalCartItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-blue-600 text-white font-extrabold text-[10px] w-4 h-4 rounded-full flex items-center justify-center shadow">
                  {totalCartItems}
                </span>
              )}
            </button>

            {/* Notification Bell */}
            <div className="relative">
              <button 
                onClick={() => setShowNotificationDropdown(!showNotificationDropdown)}
                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-all relative"
                title="Notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadNotifications > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                )}
              </button>
              
              {showNotificationDropdown && (
                <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-700 p-4 z-50">
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-2 mb-2">
                    <span className="text-xs font-bold text-slate-800 dark:text-white">Notifications</span>
                    <button 
                      onClick={() => setNotifications(prev => prev.map(n => ({ ...n, unread: false })))}
                      className="text-[10px] text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      Mark all as read
                    </button>
                  </div>
                  <div className="space-y-3 max-h-60 overflow-y-auto">
                    {notifications.map(n => (
                      <div key={n.id} className={`p-2 rounded-lg text-xs transition-all ${n.unread ? 'bg-slate-50 dark:bg-slate-700/40 border-l-2 border-orange-500' : 'text-slate-500 dark:text-slate-400'}`}>
                        <p className="font-medium text-slate-800 dark:text-slate-200">{n.text}</p>
                        <span className="text-[9px] text-slate-400">{n.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Profile Dropper */}
            <div className="relative">
              {user.isLoggedIn ? (
                <div>
                  <button 
                    onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                    className="flex items-center gap-1.5 p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-all border border-slate-200 dark:border-slate-700"
                  >
                    <div className="w-7 h-7 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold flex items-center justify-center text-xs">
                      {user.name.charAt(0)}
                    </div>
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300 max-w-[80px] truncate">{user.name}</span>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                  </button>
                  {showProfileDropdown && (
                    <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-700 p-2 z-50 animate-fade-in text-xs text-slate-700 dark:text-slate-300">
                      
                      {/* Loyalty Stats */}
                      <div className="p-3 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-700/30 dark:to-slate-800/20 rounded-xl mb-2 flex flex-col gap-1.5">
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-1 text-[10px] text-slate-500 dark:text-slate-400 font-bold">
                            <Wallet className="w-3.5 h-3.5 text-orange-500" /> Wallet Balance
                          </span>
                          <span className="font-extrabold text-blue-600 dark:text-blue-400">
                            {currency === 'INR' ? `₹${user.walletBalance}` : `$${Math.round(user.walletBalance / 80)}`}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-1 text-[10px] text-slate-500 dark:text-slate-400 font-bold">
                            <Award className="w-3.5 h-3.5 text-purple-500 animate-bounce" /> Loyalty Points
                          </span>
                          <span className="font-extrabold text-purple-600 dark:text-purple-400">{user.loyaltyPoints} pts</span>
                        </div>
                      </div>

                      <button 
                        onClick={() => { handlePageChange('dashboard'); setShowProfileDropdown(false); }}
                        className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all font-semibold"
                      >
                        <User className="w-4 h-4 text-blue-500" /> My Account
                      </button>

                      {user.role === 'admin' && (
                        <button 
                          onClick={() => { handlePageChange('admin'); setShowProfileDropdown(false); }}
                          className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all font-semibold text-purple-600 dark:text-purple-400"
                        >
                          <LayoutDashboard className="w-4 h-4" /> Admin Controls
                        </button>
                      )}

                      <button 
                        onClick={() => { handlePageChange('dashboard'); setShowProfileDropdown(false); }}
                        className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all font-semibold"
                      >
                        <Settings className="w-4 h-4 text-slate-400" /> Settings
                      </button>

                      <div className="h-px bg-slate-100 dark:bg-slate-700 my-1" />

                      <button 
                        onClick={() => { logout(); setShowProfileDropdown(false); handlePageChange('landing'); }}
                        className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all font-semibold"
                      >
                        <LogOut className="w-4 h-4" /> Logout
                      </button>

                    </div>
                  )}
                </div>
              ) : (
                <button 
                  onClick={() => handlePageChange('dashboard')}
                  className="flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-xs hover:shadow-lg hover:opacity-95 transition-all shadow-md cursor-pointer"
                >
                  <User className="w-3.5 h-3.5" /> Sign In
                </button>
              )}
            </div>

          </div>

          {/* Mobile responsive toggle button */}
          <div className="flex items-center lg:hidden gap-3">
            <button 
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-all"
            >
              {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>
            <button 
              onClick={() => handlePageChange('cart')}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 relative"
            >
              <ShoppingBag className="w-4 h-4" />
              {totalCartItems > 0 && (
                <span className="absolute top-0 right-0 bg-blue-600 text-white text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-extrabold shadow">
                  {totalCartItems}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 space-y-4 shadow-xl text-sm font-semibold text-slate-700 dark:text-slate-300">
          
          {/* Mobile Search */}
          <div className="relative w-full">
            <input
              type="text"
              placeholder={lang === 'en' ? 'Search custom gifts...' : 'उपहार खोजें...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handlePageChange('listing')}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border-none text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
          </div>

          <div className="flex flex-col gap-3.5">
            <button onClick={() => handlePageChange('landing')} className="w-full text-left py-1 hover:text-blue-500">Home</button>
            <button onClick={() => handlePageChange('categories')} className="w-full text-left py-1 hover:text-blue-500">Categories</button>
            <button onClick={() => handlePageChange('listing')} className="w-full text-left py-1 hover:text-blue-500">Deals & Offers</button>
            <button onClick={() => handlePageChange('cart')} className="w-full text-left py-1 hover:text-blue-500">My Bag ({totalCartItems})</button>
            <button onClick={() => handlePageChange('dashboard')} className="w-full text-left py-1 hover:text-blue-500">My Account</button>
            
            {user.role === 'admin' && (
              <button onClick={() => handlePageChange('admin')} className="w-full text-left py-1 text-purple-500 hover:text-purple-600">Admin Dashboard</button>
            )}
          </div>

          <div className="h-px bg-slate-100 dark:bg-slate-800 my-2" />

          {/* Quick Settings */}
          <div className="flex items-center justify-between text-xs">
            <button 
              onClick={() => setCurrency(currency === 'INR' ? 'USD' : 'INR')}
              className="px-2.5 py-1 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-600 dark:text-slate-400 font-bold"
            >
              Currency: {currency === 'INR' ? '₹ INR' : '$ USD'}
            </button>
            <button 
              onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
              className="px-2.5 py-1 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-600 dark:text-slate-400 font-bold"
            >
              Lang: {lang === 'en' ? 'हिन्दी' : 'English'}
            </button>
          </div>
          
        </div>
      )}
    </nav>
    </div>
  );
}
