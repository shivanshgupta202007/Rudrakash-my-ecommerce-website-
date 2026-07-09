import React from 'react';
import { useApp } from '../context/AppContext';
import { Mail, Phone, MapPin, Heart, Shield, Award, Truck, ShieldAlert } from 'lucide-react';

export default function Footer() {
  const { lang, setActivePage } = useApp();

  const handlePageChange = (page: string) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-400 font-sans border-t border-slate-800 pt-16 pb-8 transition-colors duration-300">
      
      {/* Premium Trust Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 border-b border-slate-800 pb-12">
          
          <div className="flex items-center gap-4">
            <div className="p-3 bg-slate-800 rounded-2xl text-blue-500">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">{lang === 'en' ? 'Authentic Luxury' : 'प्रामाणिक विलासिता'}</h4>
              <p className="text-xs text-slate-500 mt-1">{lang === 'en' ? '100% Certified pure gold, silk, and teak' : '100% प्रमाणित शुद्ध रेशम और सागौन'}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="p-3 bg-slate-800 rounded-2xl text-orange-500">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">{lang === 'en' ? 'Secured Express Transit' : 'सुरक्षित एक्सप्रेस डिलीवरी'}</h4>
              <p className="text-xs text-slate-500 mt-1">{lang === 'en' ? 'Free shipping above ₹1500 with tracking' : '₹1500 से ऊपर ट्रैकिंग के साथ मुफ्त शिपिंग'}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="p-3 bg-slate-800 rounded-2xl text-purple-500">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">{lang === 'en' ? 'Secure Payments' : 'सुरक्षित भुगतान'}</h4>
              <p className="text-xs text-slate-500 mt-1">{lang === 'en' ? 'Razorpay, UPI, & Stripe fully integrated' : 'UPI और कार्ड पेमेंट एन्क्रिप्टेड'}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="p-3 bg-slate-800 rounded-2xl text-teal-500">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">{lang === 'en' ? 'Authentic Gifting' : 'विश्वसनीय गिफ्टिंग'}</h4>
              <p className="text-xs text-slate-500 mt-1">{lang === 'en' ? 'Every plaque laser engraved to perfection' : 'हर उपहार को पूर्णता से उकेरा गया है'}</p>
            </div>
          </div>

        </div>
      </div>

      {/* Main Footer Links & About */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        
        {/* Brand Column */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 cursor-pointer font-display" onClick={() => handlePageChange('landing')}>
            <span className="text-2xl font-black tracking-tighter text-slate-900 dark:text-white">
              RUDRA<span className="text-orange-500 underline underline-offset-4 decoration-2">KASH</span>
            </span>
            <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            Rudrakash is an premium Indian shopping platform curating high-quality personalized gifts, clothing, home essentials, electronics, and festival crafts. Designed for sophisticated buyers who appreciate craftsmanship and speed.
          </p>
          <div className="flex items-center gap-3 pt-2 text-xs">
            <span className="font-semibold text-slate-500">Owner:</span>
            <span className="text-slate-300 font-bold">Shivansh Gupta</span>
          </div>
        </div>

        {/* Categories Quick Links */}
        <div>
          <h4 className="text-white text-xs font-bold tracking-wider uppercase mb-5">Departments</h4>
          <ul className="space-y-2.5 text-xs">
            <li>
              <button onClick={() => handlePageChange('categories')} className="hover:text-white hover:underline transition-all">
                Personalized Gifts
              </button>
            </li>
            <li>
              <button onClick={() => handlePageChange('categories')} className="hover:text-white hover:underline transition-all">
                Silk Clothing & Apparels
              </button>
            </li>
            <li>
              <button onClick={() => handlePageChange('categories')} className="hover:text-white hover:underline transition-all">
                Kitchen Copper & Cast Iron
              </button>
            </li>
            <li>
              <button onClick={() => handlePageChange('categories')} className="hover:text-white hover:underline transition-all">
                Home Decor & Soy Candles
              </button>
            </li>
            <li>
              <button onClick={() => handlePageChange('categories')} className="hover:text-white hover:underline transition-all">
                Electronics & Smartwatches
              </button>
            </li>
          </ul>
        </div>

        {/* Policies Quick Links */}
        <div>
          <h4 className="text-white text-xs font-bold tracking-wider uppercase mb-5">Policies & Safety</h4>
          <ul className="space-y-2.5 text-xs">
            <li>
              <a href="#privacy" className="hover:text-white hover:underline transition-all">Privacy Policy</a>
            </li>
            <li>
              <a href="#refund" className="hover:text-white hover:underline transition-all">Refund & Returns Policy</a>
            </li>
            <li>
              <a href="#shipping" className="hover:text-white hover:underline transition-all">Shipping & Transit Policy</a>
            </li>
            <li>
              <a href="#terms" className="hover:text-white hover:underline transition-all">Terms & Conditions</a>
            </li>
            <li>
              <a href="#careers" className="hover:text-white hover:underline transition-all">Careers at Rudrakash</a>
            </li>
            <li>
              <a href="#seller" className="hover:text-white hover:underline transition-all">Become a Seller</a>
            </li>
          </ul>
        </div>

        {/* Contact Column */}
        <div className="space-y-4">
          <h4 className="text-white text-xs font-bold tracking-wider uppercase mb-5">Contact Support</h4>
          <ul className="space-y-3.5 text-xs">
            <li className="flex items-start gap-2.5">
              <Mail className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-[10px] text-slate-500 font-bold">Email Address</p>
                <a href="mailto:shivanshgupta202007@gmail.com" className="text-slate-200 hover:text-blue-400 transition-all font-semibold">
                  shivanshgupta202007@gmail.com
                </a>
              </div>
            </li>
            <li className="flex items-start gap-2.5">
              <Phone className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-[10px] text-slate-500 font-bold">Helpline Support</p>
                <span className="text-slate-200 font-semibold">+91 98765 43210</span>
              </div>
            </li>
            <li className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-[10px] text-slate-500 font-bold">Headquarters Hub</p>
                <span className="text-slate-200 font-semibold">Kabir Nagar, Durga Kund, Varanasi, UP, 221005</span>
              </div>
            </li>
          </ul>
        </div>

      </div>

      {/* Trademark Copyright and Footer Note */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-800 dark:border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] uppercase tracking-wider font-bold">
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-2 text-slate-500 hover:text-white transition-all cursor-pointer select-none">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            Live Tracking Active
          </div>
          <div className="flex items-center gap-2 text-slate-500 hover:text-white transition-all cursor-pointer">
            Loyalty Points: <span className="text-orange-400">1,420</span>
          </div>
        </div>
        
        <div className="text-slate-600 font-medium md:text-right">
          &copy; 2026 RUDRAKASH | DESIGNED BY SHIVANSH GUPTA
        </div>
      </div>

    </footer>
  );
}
