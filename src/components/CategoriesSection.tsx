import React from 'react';
import { useApp } from '../context/AppContext';
import { CATEGORIES } from '../data';
import * as Icons from 'lucide-react';

export default function CategoriesSection() {
  const { setFilters, setActivePage, lang } = useApp();

  const handleCategorySelect = (categoryName: string) => {
    setFilters((prev: any) => ({
      ...prev,
      category: categoryName
    }));
    setActivePage('listing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Helper to render lucide icon dynamically
  const renderIcon = (iconName: string) => {
    const IconComp = (Icons as any)[iconName];
    if (IconComp) {
      return <IconComp className="w-8 h-8 text-indigo-500 dark:text-indigo-400 group-hover:scale-110 transition-transform duration-300" />;
    }
    return <Icons.HelpCircle className="w-8 h-8 text-slate-400" />;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 font-sans min-h-screen dark:bg-[#020617] transition-colors duration-300">
      
      {/* Page Header */}
      <div className="text-center space-y-3 mb-16">
        <span className="text-[10px] font-bold uppercase tracking-widest text-orange-400 bg-white/10 px-3.5 py-1 rounded-full border border-white/20 select-none">
          ESTABLISHED 2024
        </span>
        <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight font-display">
          {lang === 'en' ? 'Shop by Luxury Departments' : 'विभागों के अनुसार खरीदारी करें'}
        </h1>
        <p className="text-xs text-slate-500 max-w-md mx-auto">
          {lang === 'en' 
            ? 'Curating the finest handcrafted materials, designer clothing, custom ornaments, and health products across India.' 
            : 'भारत भर से बेहतरीन हस्तनिर्मित सामग्री, डिजाइनर कपड़े और उपहारों का संग्रह।'}
        </p>
      </div>

      {/* Grid List of Large Category Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {CATEGORIES.map((cat) => (
          <div
            key={cat.id}
            onClick={() => handleCategorySelect(cat.name)}
            className="group bg-white/95 dark:bg-white/5 dark:backdrop-blur-md rounded-[2rem] border border-slate-100 dark:border-white/10 p-6 shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer flex flex-col justify-between h-56 relative overflow-hidden"
          >
            {/* Ambient Background Gradient Glow on hover */}
            <div className="absolute -top-10 -right-10 w-24 h-24 rounded-full bg-orange-500/5 group-hover:bg-orange-500/10 blur-xl transition-all" />

            {/* Icon Block */}
            <div className="p-3.5 bg-slate-50 dark:bg-white/5 rounded-2xl w-fit group-hover:bg-orange-500/10 dark:group-hover:bg-orange-500/15 transition-colors">
              {renderIcon(cat.icon)}
            </div>

            {/* Title & Description */}
            <div className="space-y-1 mt-6">
              <h3 className="text-base font-extrabold text-slate-800 dark:text-white group-hover:text-orange-500 dark:group-hover:text-orange-400 transition-colors tracking-tight font-display">
                {cat.name}
              </h3>
              <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                {cat.description}
              </p>
            </div>

            {/* Micro Action link */}
            <div className="flex items-center gap-1 text-[10px] font-extrabold text-indigo-500 dark:text-indigo-400 pt-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <span>View Collection</span>
              <Icons.ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
