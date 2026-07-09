import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Product, Order } from '../types';
import { CATEGORIES, BRANDS } from '../data';
import { 
  ShieldAlert, Sparkles, PlusCircle, LayoutDashboard, Settings, 
  BarChart3, RefreshCw, Layers, Edit3, Trash2, ArrowUpRight, 
  ShoppingBag, CheckCircle, Package, ArrowDown, ChevronRight, Truck
} from 'lucide-react';

export default function AdminDashboard() {
  const {
    products = [],
    orders = [],
    userAddresses = [],
    updateProductStock,
    updateProductPrice,
    addNewProduct,
    updateOrderStatus,
    currency,
    lang
  } = useApp();

  const [activeAdminTab, setActiveAdminTab] = useState<'analytics' | 'inventory' | 'orders'>('analytics');
  
  // Product Creation form state
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProd, setNewProd] = useState({
    name: 'Handcrafted Heritage Brass Diya',
    description: 'An elegant heavy brass diya with a polished protective seal.',
    brand: 'Kashi Craft',
    category: 'Festival Products',
    price: 1200,
    originalPrice: 1999,
    discount: 40,
    stock: 15,
    images: ['https://images.unsplash.com/photo-1544273677-c433136021d4?auto=format&fit=crop&w=600&q=80'],
    colors: ['Gold', 'Bronze'],
    sizes: ['Standard']
  });

  const [formSuccess, setFormSuccess] = useState(false);

  const formatPrice = (val: number) => {
    if (currency === 'USD') {
      return `$${Math.round(val / 80)}`;
    }
    return `₹${val}`;
  };

  // Math Analytics calculations
  const totalRevenue = orders.reduce((sum, o) => sum + o.amount, 0);
  const totalOrdersCount = orders.length;
  const averageOrderValue = totalOrdersCount > 0 ? Math.round(totalRevenue / totalOrdersCount) : 0;
  const uniqueUsersCount = 1; // Default shivansh user
  const lowStockCount = products.filter(p => p.stock < 5).length;

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    
    const productData: Omit<Product, 'id' | 'rating' | 'reviewsCount'> = {
      name: newProd.name,
      description: newProd.description,
      brand: newProd.brand,
      category: newProd.category,
      price: Number(newProd.price),
      originalPrice: Number(newProd.originalPrice),
      discount: Number(newProd.discount),
      stock: Number(newProd.stock),
      images: newProd.images,
      colors: newProd.colors,
      sizes: newProd.sizes,
      specs: [
        { name: 'Material', value: 'Traditional Craftsmanship' },
        { name: 'Packaging', value: 'Premium Gift box' }
      ]
    };

    addNewProduct(productData);
    setFormSuccess(true);
    setTimeout(() => {
      setFormSuccess(false);
      setShowAddForm(false);
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 font-sans min-h-screen dark:bg-slate-950 transition-colors duration-300">
      
      {/* 1. ADMIN BRAND HEADER BAR */}
      <div className="bg-gradient-to-r from-blue-900 to-slate-900 rounded-[36px] p-6 md:p-10 text-white border border-slate-800 shadow-xl mb-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative overflow-hidden">
        
        {/* Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="space-y-1.5 relative z-10">
          <span className="text-[10px] font-black text-blue-400 bg-blue-500/15 px-3 py-1 border border-blue-500/30 rounded-full uppercase tracking-widest">
            Restricted Admin Privilege Access
          </span>
          <h1 className="text-3xl font-black tracking-tight flex items-center gap-2">
            <LayoutDashboard className="w-8 h-8 text-blue-400" />
            <span>Shivansh Gupta System Portal</span>
          </h1>
          <p className="text-xs text-slate-400 font-semibold leading-relaxed">
            Manage inventory units, view real-time revenue analytics, and dispatch secure courier transit codes for Rudrakash Store.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-2xl p-4 shrink-0 text-xs text-slate-300 font-bold">
          <Settings className="w-5 h-5 text-orange-400 animate-spin" />
          <span>System Version: v2.4.0</span>
        </div>

      </div>

      {/* 2. ADMIN ACTIONS NAV BAR */}
      <div className="flex border-b border-slate-100 dark:border-slate-800 text-xs font-bold gap-8 mb-8">
        <button
          onClick={() => setActiveAdminTab('analytics')}
          className={`pb-3 border-b-2 transition-all flex items-center gap-1.5 ${
            activeAdminTab === 'analytics' ? 'border-blue-600 text-blue-600 dark:text-blue-400 font-black' : 'border-transparent text-slate-400 hover:text-slate-600'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>Analytics Desk</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('inventory')}
          className={`pb-3 border-b-2 transition-all flex items-center gap-1.5 ${
            activeAdminTab === 'inventory' ? 'border-blue-600 text-blue-600 dark:text-blue-400 font-black' : 'border-transparent text-slate-400 hover:text-slate-600'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Inventory Manager ({products.length})</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('orders')}
          className={`pb-3 border-b-2 transition-all flex items-center gap-1.5 ${
            activeAdminTab === 'orders' ? 'border-blue-600 text-blue-600 dark:text-blue-400 font-black' : 'border-transparent text-slate-400 hover:text-slate-600'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Store Orders Dispatcher ({orders.length})</span>
        </button>
      </div>

      {/* 3. DYNAMIC CONTENT AREA */}
      <div className="space-y-12">
        
        {/* ANALYTICS DESK */}
        {activeAdminTab === 'analytics' && (
          <div className="space-y-10">
            
            {/* Stats grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              <div className="bg-white dark:bg-slate-850 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm flex items-center justify-between">
                <div className="space-y-1 text-xs">
                  <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest">Total Revenue</span>
                  <p className="text-2xl font-black text-slate-900 dark:text-white">{formatPrice(totalRevenue)}</p>
                  <p className="text-[9px] text-green-500 font-bold flex items-center gap-0.5"><ArrowUpRight className="w-3 h-3" /> +14.2% from last week</p>
                </div>
                <div className="p-3 bg-blue-100/40 dark:bg-blue-950 text-blue-600 rounded-2xl">
                  <ShoppingBag className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white dark:bg-slate-850 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm flex items-center justify-between">
                <div className="space-y-1 text-xs">
                  <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest">Total Orders Placed</span>
                  <p className="text-2xl font-black text-slate-900 dark:text-white">{totalOrdersCount}</p>
                  <p className="text-[9px] text-slate-400 font-bold">100% Secure Express Transit</p>
                </div>
                <div className="p-3 bg-purple-100/40 dark:bg-purple-950 text-purple-600 rounded-2xl">
                  <CheckCircle className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white dark:bg-slate-850 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm flex items-center justify-between">
                <div className="space-y-1 text-xs">
                  <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest">Avg Order Value (AOV)</span>
                  <p className="text-2xl font-black text-slate-900 dark:text-white">{formatPrice(averageOrderValue)}</p>
                  <p className="text-[9px] text-blue-500 font-bold">Reflects luxury baskets</p>
                </div>
                <div className="p-3 bg-teal-100/40 dark:bg-teal-950 text-teal-600 rounded-2xl">
                  <BarChart3 className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white dark:bg-slate-850 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm flex items-center justify-between">
                <div className="space-y-1 text-xs">
                  <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest">Low Stock Alarms</span>
                  <p className="text-2xl font-black text-red-500">{lowStockCount} items</p>
                  <p className="text-[9px] text-red-400 font-bold">Requires urgent replenishment</p>
                </div>
                <div className="p-3 bg-red-100/40 dark:bg-red-950 text-red-600 rounded-2xl">
                  <ShieldAlert className="w-6 h-6" />
                </div>
              </div>

            </div>

            {/* Low stock notifications alarms */}
            {lowStockCount > 0 && (
              <div className="p-5 bg-red-50 dark:bg-red-950/30 rounded-[28px] border border-red-200/50 dark:border-red-900 text-xs space-y-3">
                <h4 className="font-extrabold text-red-700 dark:text-red-300 flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 animate-bounce" />
                  <span>Low Stock Warning Banners</span>
                </h4>
                
                <div className="flex flex-col gap-2">
                  {products.filter(p => p.stock < 5).map(p => (
                    <div key={p.id} className="flex justify-between items-center bg-white dark:bg-slate-800 p-2.5 rounded-xl border border-red-100/40 dark:border-red-900/40">
                      <span className="font-bold text-slate-800 dark:text-slate-100">{p.name}</span>
                      <span className="text-red-500 font-extrabold font-mono">{p.stock} items left</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* General welcome */}
            <div className="bg-slate-50 dark:bg-slate-900/60 p-8 rounded-[36px] border border-slate-100 dark:border-slate-800 text-xs space-y-3">
              <h4 className="font-extrabold text-slate-800 dark:text-white text-sm flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-orange-500 animate-spin" />
                <span>Shivansh, welcome back to your Control HQ</span>
              </h4>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed max-w-2xl">
                Every transaction and stock alteration here syncs immediately to the client-side state engine database. Use the tabs above to create new luxury release collections or change active pricing filters.
              </p>
            </div>

          </div>
        )}

        {/* INVENTORY MANAGER */}
        {activeAdminTab === 'inventory' && (
          <div className="space-y-8">
            
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-slate-900 dark:text-white text-base">Catalogue Products Inventory</h3>
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="px-5 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs flex items-center gap-1.5 shadow"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Publish New Product</span>
              </button>
            </div>

            {/* Add Product Form Card */}
            {showAddForm && (
              <form onSubmit={handleCreateProduct} className="p-6 bg-slate-50 dark:bg-slate-900 rounded-[28px] border border-slate-200/60 dark:border-slate-800 text-xs space-y-4 max-w-3xl">
                <h3 className="font-black text-slate-800 dark:text-white text-sm">Fill out the Product specifications</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-slate-400 font-semibold">Product Name</label>
                    <input
                      type="text"
                      required
                      value={newProd.name}
                      onChange={(e) => setNewProd(p => ({ ...p, name: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-slate-400 font-semibold">Department Category</label>
                    <select
                      value={newProd.category}
                      onChange={(e) => setNewProd(p => ({ ...p, category: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                    >
                      {CATEGORIES.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400 font-semibold">Description</label>
                  <textarea
                    required
                    rows={2}
                    value={newProd.description}
                    onChange={(e) => setNewProd(p => ({ ...p, description: e.target.value }))}
                    className="w-full p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-slate-400 font-semibold">Brand</label>
                    <input
                      type="text"
                      required
                      value={newProd.brand}
                      onChange={(e) => setNewProd(p => ({ ...p, brand: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl bg-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-slate-400 font-semibold">Sale Price (INR)</label>
                    <input
                      type="number"
                      required
                      value={newProd.price}
                      onChange={(e) => setNewProd(p => ({ ...p, price: Number(e.target.value) }))}
                      className="w-full px-4 py-2.5 rounded-xl bg-white font-mono"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-slate-400 font-semibold">Initial Stock Units</label>
                    <input
                      type="number"
                      required
                      value={newProd.stock}
                      onChange={(e) => setNewProd(p => ({ ...p, stock: Number(e.target.value) }))}
                      className="w-full px-4 py-2.5 rounded-xl bg-white font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400 font-semibold">Image URL Source</label>
                  <input
                    type="text"
                    required
                    value={newProd.images[0]}
                    onChange={(e) => setNewProd(p => ({ ...p, images: [e.target.value] }))}
                    className="w-full px-4 py-2.5 rounded-xl bg-white font-mono"
                  />
                </div>

                {formSuccess && (
                  <p className="text-green-500 font-semibold text-[10px] animate-pulse">Product published successfully into standard Catalog!</p>
                )}

                <div className="flex gap-2">
                  <button type="submit" className="px-5 py-2.5 bg-blue-600 text-white font-extrabold rounded-xl cursor-pointer">
                    Publish Product
                  </button>
                  <button type="button" onClick={() => setShowAddForm(false)} className="px-5 py-2.5 border border-slate-200 rounded-xl font-bold">
                    Cancel
                  </button>
                </div>

              </form>
            )}

            {/* List products table with increment stock buttons */}
            <div className="bg-white dark:bg-slate-850 border border-slate-100 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm">
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {products.map(prod => (
                  <div key={prod.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors text-xs font-semibold">
                    
                    <div className="flex items-center gap-4 flex-1">
                      <img src={prod.images[0]} alt="" className="w-12 h-12 rounded-xl object-cover" />
                      <div>
                        <h4 className="font-extrabold text-slate-800 dark:text-slate-100">{prod.name}</h4>
                        <p className="text-slate-400 text-[10px]">{prod.category} • Brand: {prod.brand}</p>
                      </div>
                    </div>

                    {/* Stock modifier controls */}
                    <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                      
                      {/* Price Modifier */}
                      <div className="space-y-0.5 min-w-[100px]">
                        <span className="text-[10px] text-slate-400 block font-semibold">Sale Price</span>
                        <div className="flex items-center gap-2">
                          <span className="font-black text-slate-900 dark:text-white">{formatPrice(prod.price)}</span>
                          <button 
                            onClick={() => updateProductPrice(prod.id, prod.price - 100)}
                            className="p-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 font-bold"
                          >
                            -
                          </button>
                          <button 
                            onClick={() => updateProductPrice(prod.id, prod.price + 100)}
                            className="p-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 font-bold"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Stock units Modifier */}
                      <div className="space-y-0.5 min-w-[100px]">
                        <span className="text-[10px] text-slate-400 block font-semibold">Stock left</span>
                        <div className="flex items-center gap-2">
                          <span className={`font-mono font-bold ${prod.stock < 5 ? 'text-red-500 font-extrabold' : 'text-slate-800 dark:text-slate-200'}`}>{prod.stock} Units</span>
                          <button 
                            onClick={() => updateProductStock(prod.id, prod.stock - 1)}
                            className="p-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 font-bold"
                            disabled={prod.stock === 0}
                          >
                            -
                          </button>
                          <button 
                            onClick={() => updateProductStock(prod.id, prod.stock + 1)}
                            className="p-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 font-bold"
                          >
                            +
                          </button>
                        </div>
                      </div>

                    </div>

                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* STORE ORDERS DISPATCHER */}
        {activeAdminTab === 'orders' && (
          <div className="space-y-6 text-xs">
            {orders.length === 0 ? (
              <div className="text-center py-16 bg-slate-50 dark:bg-slate-900 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800 text-slate-400 font-semibold space-y-2">
                <span className="text-3xl">📦</span>
                <p>No transactions registered across the platform yet.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {orders.map(ord => (
                  <div key={ord.id} className="bg-white dark:bg-slate-850 border border-slate-100 dark:border-slate-850 rounded-3xl p-5 shadow-sm space-y-4">
                    
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-50 dark:border-slate-700 pb-3 gap-3">
                      <div>
                        <p className="font-extrabold text-slate-800 dark:text-slate-200 font-mono text-sm">Order ID: {ord.id}</p>
                        <p className="text-[10px] text-slate-400">Recipient: <strong>{ord.address.name}</strong> • Phone: {ord.address.phone}</p>
                      </div>
                      <div className="text-right flex items-center gap-2">
                        <span className="text-[10px] text-slate-400 font-bold uppercase">Current Status:</span>
                        <span className="px-3 py-1 bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-300 border border-blue-100 rounded-full font-bold uppercase">{ord.status}</span>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <p className="text-slate-500">Amount Paid: <strong className="text-slate-800 dark:text-white">{formatPrice(ord.amount)}</strong> via {ord.paymentMethod.toUpperCase()}</p>
                      <p className="text-slate-500">Address: {ord.address.street}, {ord.address.city}, {ord.address.state} - {ord.address.pincode}</p>
                    </div>

                    {/* Dispatch/status modifier buttons */}
                    <div className="flex items-center gap-3 pt-2">
                      <span className="text-slate-400 font-bold uppercase text-[10px]">Move Status:</span>
                      
                      {ord.status === 'pending' && (
                        <button
                          onClick={() => updateOrderStatus(ord.id, 'shipped')}
                          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-extrabold rounded-xl shadow cursor-pointer hover:opacity-90 flex items-center gap-1"
                        >
                          <Truck className="w-3.5 h-3.5" /> Dispatch/Ship Package
                        </button>
                      )}

                      {ord.status === 'shipped' && (
                        <button
                          onClick={() => updateOrderStatus(ord.id, 'delivered')}
                          className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-extrabold rounded-xl shadow cursor-pointer hover:opacity-90 flex items-center gap-1"
                        >
                          <CheckCircle className="w-3.5 h-3.5" /> Mark Delivered
                        </button>
                      )}

                      <span className="text-[10px] text-slate-400 ml-auto font-bold">Action updates customer dashboards instantly.</span>
                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>

    </div>
  );
}
