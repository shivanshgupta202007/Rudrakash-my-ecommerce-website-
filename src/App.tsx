import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/Hero';
import CategoriesSection from './components/CategoriesSection';
import ProductListing from './components/ProductListing';
import ProductDetails from './components/ProductDetails';
import CartPage from './components/CartPage';
import CheckoutPage from './components/CheckoutPage';
import Dashboard from './components/Dashboard';
import AdminDashboard from './components/AdminDashboard';
import Chatbot from './components/Chatbot';

function AppContent() {
  const { activePage, theme } = useApp();

  // Route selector
  const renderPage = () => {
    switch (activePage) {
      case 'landing':
        return <Hero />;
      case 'categories':
        return <CategoriesSection />;
      case 'listing':
        return <ProductListing />;
      case 'details':
        return <ProductDetails />;
      case 'cart':
        return <CartPage />;
      case 'checkout':
        return <CheckoutPage />;
      case 'dashboard':
        return <Dashboard />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return <Hero />;
    }
  };

  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen transition-colors duration-300 flex flex-col justify-between ${isDark ? 'dark bg-slate-950 text-slate-100' : 'bg-white text-slate-900'}`}>
      
      <div>
        {/* Sticky Global Navigation */}
        <Navbar />

        {/* Dynamic Main Stage */}
        <main className="pt-20">
          {renderPage()}
        </main>
      </div>

      {/* Floating AI Chatbot Assistant */}
      <Chatbot />

      {/* Structured Footer */}
      <Footer />

    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
