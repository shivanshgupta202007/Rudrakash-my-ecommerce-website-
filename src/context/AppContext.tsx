import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Coupon, User, Address, Order, Review } from '../types';
import { MOCK_PRODUCTS, MOCK_COUPONS } from '../data';

interface AppContextType {
  activePage: string;
  setActivePage: (page: string) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  lang: 'en' | 'hi';
  setLang: (lang: 'en' | 'hi') => void;
  currency: 'INR' | 'USD';
  setCurrency: (currency: 'INR' | 'USD') => void;
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  
  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, color?: string, size?: string) => void;
  removeFromCart: (productId: string, color?: string, size?: string) => void;
  updateCartQuantity: (productId: string, quantity: number, color?: string, size?: string) => void;
  clearCart: () => void;
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => string | null; // returns error message or null if success
  removeCoupon: () => void;
  
  // Wishlist & Recently Viewed
  wishlist: Product[];
  toggleWishlist: (product: Product) => void;
  recentlyViewed: Product[];
  addToRecentlyViewed: (product: Product) => void;
  compareProducts: Product[];
  toggleCompare: (product: Product) => void;
  
  // Auth
  user: User;
  login: (email: string, method: 'email' | 'google' | 'otp') => void;
  logout: () => void;
  signup: (name: string, email: string, phone: string) => void;
  addLoyaltyPoints: (points: number) => void;
  deductWalletBalance: (amount: number) => boolean;
  addWalletBalance: (amount: number) => void;

  // Addresses
  addresses: Address[];
  addAddress: (address: Omit<Address, 'id'>) => void;
  deleteAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
  selectedAddressId: string | null;
  setSelectedAddressId: (id: string | null) => void;
  
  // Orders
  orders: Order[];
  createOrder: (paymentMethod: string, trackingTimeline: any) => Order;
  cancelOrder: (orderId: string) => void;
  returnOrder: (orderId: string) => void;
  
  // Products
  products: Product[];
  addReviewToProduct: (productId: string, review: Omit<Review, 'id' | 'date' | 'helpfulCount'>) => void;
  
  // Search & Filters
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  voiceActive: boolean;
  setVoiceActive: (active: boolean) => void;
  filters: {
    category: string;
    minPrice: number;
    maxPrice: number;
    brand: string;
    rating: number;
    discount: number;
    color: string;
    size: string;
  };
  setFilters: React.Dispatch<React.SetStateAction<any>>;
  resetFilters: () => void;
  sorting: string;
  setSorting: (sorting: string) => void;
  
  // Chat
  chatMessages: { sender: 'user' | 'bot' | 'gemini'; text: string; timestamp: string }[];
  addChatMessage: (sender: 'user' | 'bot' | 'gemini', text: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const DEFAULT_ADDRESSES: Address[] = [
  {
    id: 'addr-1',
    fullName: 'Shivansh Gupta',
    phone: '9876543210',
    streetAddress: 'Plot No. 42, Kabir Nagar, Near Durga Kund Temple',
    city: 'Varanasi',
    state: 'Uttar Pradesh',
    pincode: '221005',
    type: 'home',
    isDefault: true
  },
  {
    id: 'addr-2',
    fullName: 'Shivansh Gupta (Office)',
    phone: '9876543211',
    streetAddress: 'Block C, Coworking Hub, Sector 62',
    city: 'Noida',
    state: 'Uttar Pradesh',
    pincode: '201301',
    type: 'work',
    isDefault: false
  }
];

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [activePage, setActivePage] = useState<string>('landing');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [lang, setLang] = useState<'en' | 'hi'>('en');
  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR');
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  
  // Storage & State
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('rud_products');
    return saved ? JSON.parse(saved) : MOCK_PRODUCTS;
  });
  
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('rud_cart');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [wishlist, setWishlist] = useState<Product[]>(() => {
    const saved = localStorage.getItem('rud_wishlist');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>(() => {
    const saved = localStorage.getItem('rud_recently');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [compareProducts, setCompareProducts] = useState<Product[]>([]);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  
  const [user, setUser] = useState<User>(() => {
    const saved = localStorage.getItem('rud_user');
    return saved ? JSON.parse(saved) : {
      name: 'Shivansh Gupta',
      email: 'shivanshgupta202007@gmail.com',
      phone: '9876543210',
      role: 'customer',
      walletBalance: 2500,
      loyaltyPoints: 120,
      isLoggedIn: true // Start logged-in for a frictionless experience
    };
  });
  
  const [addresses, setAddresses] = useState<Address[]>(() => {
    const saved = localStorage.getItem('rud_addresses');
    return saved ? JSON.parse(saved) : DEFAULT_ADDRESSES;
  });
  
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(() => {
    const defaultAddr = DEFAULT_ADDRESSES.find(a => a.isDefault);
    return defaultAddr ? defaultAddr.id : null;
  });
  
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('rud_orders');
    if (saved) return JSON.parse(saved);
    
    // Add a pre-existing realistic order for rich dashboard rendering
    return [
      {
        id: 'ORD-98412',
        items: [
          {
            productId: 'rud-003',
            name: 'Pure Hammered Copper Water Carafe Set',
            price: 1899,
            quantity: 1,
            image: 'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&w=800&q=80'
          }
        ],
        totalAmount: 1899,
        discountAmount: 189,
        shippingCharge: 0,
        taxAmount: 307,
        finalAmount: 2017,
        address: DEFAULT_ADDRESSES[0],
        paymentMethod: 'UPI (GPay)',
        paymentStatus: 'Paid',
        orderStatus: 'Delivered',
        date: '2026-07-05T14:30:00.000Z',
        trackingTimeline: [
          { status: 'Delivered', date: '08 July 2026', description: 'Package handed over to Shivansh Gupta.', active: true },
          { status: 'Out for Delivery', date: '08 July 2026', description: 'Agent out on route.', active: true },
          { status: 'Shipped', date: '07 July 2026', description: 'Shipped from Varanasi Hub.', active: true },
          { status: 'Packed', date: '06 July 2026', description: 'Packed & Quality Verified.', active: true },
          { status: 'Ordered', date: '05 July 2026', description: 'Order placed successfully.', active: true }
        ]
      }
    ];
  });
  
  // Search Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [voiceActive, setVoiceActive] = useState(false);
  const [sorting, setSorting] = useState('popular');
  const [filters, setFilters] = useState({
    category: 'all',
    minPrice: 0,
    maxPrice: 15000,
    brand: 'all',
    rating: 0,
    discount: 0,
    color: 'all',
    size: 'all'
  });
  
  // Chatbot state
  const [chatMessages, setChatMessages] = useState<{ sender: 'user' | 'bot' | 'gemini'; text: string; timestamp: string }[]>([
    { sender: 'bot', text: 'Namaste! Welcome to Rudrakash. I am your AI Shopping Assistant. Ask me to "Suggest a luxury wedding gift", "Check delivery times", or tell me what you are shopping for today!', timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
  ]);

  // Save states to localStorage
  useEffect(() => {
    localStorage.setItem('rud_cart', JSON.stringify(cart));
  }, [cart]);
  
  useEffect(() => {
    localStorage.setItem('rud_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);
  
  useEffect(() => {
    localStorage.setItem('rud_recently', JSON.stringify(recentlyViewed));
  }, [recentlyViewed]);
  
  useEffect(() => {
    localStorage.setItem('rud_user', JSON.stringify(user));
  }, [user]);
  
  useEffect(() => {
    localStorage.setItem('rud_addresses', JSON.stringify(addresses));
  }, [addresses]);
  
  useEffect(() => {
    localStorage.setItem('rud_orders', JSON.stringify(orders));
  }, [orders]);
  
  useEffect(() => {
    localStorage.setItem('rud_products', JSON.stringify(products));
  }, [products]);

  // Sync theme
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  // Cart Management
  const addToCart = (product: Product, quantity: number = 1, color?: string, size?: string) => {
    setCart(prev => {
      const exists = prev.find(item => 
        item.product.id === product.id && 
        item.selectedColor === color && 
        item.selectedSize === size
      );
      
      if (exists) {
        return prev.map(item => 
          (item.product.id === product.id && item.selectedColor === color && item.selectedSize === size)
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity, selectedColor: color, selectedSize: size }];
    });
  };

  const removeFromCart = (productId: string, color?: string, size?: string) => {
    setCart(prev => prev.filter(item => 
      !(item.product.id === productId && item.selectedColor === color && item.selectedSize === size)
    ));
  };

  const updateCartQuantity = (productId: string, quantity: number, color?: string, size?: string) => {
    if (quantity <= 0) {
      removeFromCart(productId, color, size);
      return;
    }
    setCart(prev => prev.map(item => 
      (item.product.id === productId && item.selectedColor === color && item.selectedSize === size)
        ? { ...item, quantity }
        : item
    ));
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const applyCoupon = (code: string): string | null => {
    const coupon = MOCK_COUPONS.find(c => c.code.toUpperCase() === code.trim().toUpperCase());
    if (!coupon) return 'Invalid coupon code. Try RUDRAKASH10';
    
    // Calculate current cart subtotal
    const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    if (subtotal < coupon.minPurchase) {
      return `Minimum purchase value of ₹${coupon.minPurchase} required to apply this coupon.`;
    }
    
    setAppliedCoupon(coupon);
    return null;
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  // Wishlist
  const toggleWishlist = (product: Product) => {
    setWishlist(prev => {
      const exists = prev.find(p => p.id === product.id);
      if (exists) {
        return prev.filter(p => p.id !== product.id);
      }
      return [...prev, product];
    });
  };

  // Recently Viewed
  const addToRecentlyViewed = (product: Product) => {
    setRecentlyViewed(prev => {
      const filtered = prev.filter(p => p.id !== product.id);
      return [product, ...filtered].slice(0, 10); // Keep last 10
    });
  };

  // Comparison
  const toggleCompare = (product: Product) => {
    setCompareProducts(prev => {
      const exists = prev.find(p => p.id === product.id);
      if (exists) {
        return prev.filter(p => p.id !== product.id);
      }
      if (prev.length >= 3) {
        return [...prev.slice(1), product]; // Keep max 3 for side-by-side comparison
      }
      return [...prev, product];
    });
  };

  // User Auth
  const login = (email: string, method: 'email' | 'google' | 'otp') => {
    const formattedName = email.split('@')[0];
    const uppercaseName = formattedName.charAt(0).toUpperCase() + formattedName.slice(1);
    
    setUser({
      name: uppercaseName || 'Guest User',
      email: email,
      phone: method === 'otp' ? email : '9876543210',
      role: email.toLowerCase() === 'shivanshgupta202007@gmail.com' ? 'admin' : 'customer',
      walletBalance: 2500,
      loyaltyPoints: 150,
      isLoggedIn: true
    });
  };

  const logout = () => {
    setUser({
      name: '',
      email: '',
      phone: '',
      role: 'customer',
      walletBalance: 0,
      loyaltyPoints: 0,
      isLoggedIn: false
    });
    setAppliedCoupon(null);
  };

  const signup = (name: string, email: string, phone: string) => {
    setUser({
      name,
      email,
      phone,
      role: email.toLowerCase() === 'shivanshgupta202007@gmail.com' ? 'admin' : 'customer',
      walletBalance: 100, // Gift 100 on signup
      loyaltyPoints: 50,
      isLoggedIn: true
    });
  };

  const addLoyaltyPoints = (points: number) => {
    setUser(prev => ({ ...prev, loyaltyPoints: prev.loyaltyPoints + points }));
  };

  const addWalletBalance = (amount: number) => {
    setUser(prev => ({ ...prev, walletBalance: prev.walletBalance + amount }));
  };

  const deductWalletBalance = (amount: number): boolean => {
    if (user.walletBalance < amount) return false;
    setUser(prev => ({ ...prev, walletBalance: prev.walletBalance - amount }));
    return true;
  };

  // Addresses
  const addAddress = (address: Omit<Address, 'id'>) => {
    const newAddress: Address = {
      ...address,
      id: `addr-${Date.now()}`
    };
    
    if (newAddress.isDefault) {
      setAddresses(prev => prev.map(a => ({ ...a, isDefault: false })).concat(newAddress));
      setSelectedAddressId(newAddress.id);
    } else {
      setAddresses(prev => [...prev, newAddress]);
    }
  };

  const deleteAddress = (id: string) => {
    setAddresses(prev => prev.filter(a => a.id !== id));
    if (selectedAddressId === id) {
      setSelectedAddressId(null);
    }
  };

  const setDefaultAddress = (id: string) => {
    setAddresses(prev => prev.map(a => ({ ...a, isDefault: a.id === id })));
    setSelectedAddressId(id);
  };

  // Create Order
  const createOrder = (paymentMethod: string, trackingTimelineOverride?: any): Order => {
    const selectedAddress = addresses.find(a => a.id === selectedAddressId) || addresses[0];
    const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    
    let discount = 0;
    if (appliedCoupon) {
      if (appliedCoupon.discountType === 'percentage') {
        discount = Math.round(subtotal * (appliedCoupon.value / 100));
      } else {
        discount = appliedCoupon.value;
      }
    }
    
    const shipping = subtotal - discount > 1500 ? 0 : 99;
    const tax = Math.round((subtotal - discount) * 0.18); // 18% GST
    const final = subtotal - discount + shipping;
    
    const newOrder: Order = {
      id: `ORD-${Math.floor(10000 + Math.random() * 90000)}`,
      items: cart.map(item => ({
        productId: item.product.id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        image: item.product.images[0]
      })),
      totalAmount: subtotal,
      discountAmount: discount,
      shippingCharge: shipping,
      taxAmount: tax,
      finalAmount: final,
      address: selectedAddress,
      paymentMethod,
      paymentStatus: paymentMethod === 'COD' ? 'Pending' : 'Paid',
      orderStatus: 'Ordered',
      date: new Date().toISOString(),
      trackingTimeline: [
        { status: 'Ordered', date: 'Just now', description: 'Order placed successfully and is being verified.', active: true },
        { status: 'Packed', date: 'Pending', description: 'Quality checks and packaging.', active: false },
        { status: 'Shipped', date: 'Pending', description: 'Courier pickup scheduled.', active: false },
        { status: 'Out for Delivery', date: 'Pending', description: 'Outward dispatch scan.', active: false },
        { status: 'Delivered', date: 'Pending', description: 'Delivery completion.', active: false }
      ],
      couponCode: appliedCoupon?.code
    };
    
    // Deduct stock
    setProducts(prev => prev.map(p => {
      const boughtItem = cart.find(ci => ci.product.id === p.id);
      if (boughtItem) {
        return { ...p, stock: Math.max(0, p.stock - boughtItem.quantity) };
      }
      return p;
    }));
    
    // Add dynamic rewards
    addLoyaltyPoints(Math.floor(final / 100) * 10); // 10 points per ₹100
    
    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const cancelOrder = (orderId: string) => {
    setOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        return {
          ...o,
          orderStatus: 'Cancelled',
          trackingTimeline: o.trackingTimeline.map(t => {
            if (t.status === 'Ordered') return t;
            if (t.status === 'Cancelled') return { status: 'Cancelled', date: 'Just now', description: 'Order was cancelled by the customer.', active: true };
            return { ...t, active: false };
          }).concat({ status: 'Cancelled', date: 'Just now', description: 'Order was cancelled by the customer.', active: true })
        };
      }
      return o;
    }));
  };

  const returnOrder = (orderId: string) => {
    setOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        return {
          ...o,
          orderStatus: 'Cancelled', // We can mark as Cancelled or update type to support returned, but keeping type clean
          trackingTimeline: o.trackingTimeline.map(t => {
            if (t.status === 'Delivered') return t;
            if (t.status === 'Returned') return { status: 'Returned', date: 'Just now', description: 'Product return initiated successfully.', active: true };
            return { ...t, active: false };
          }).concat({ status: 'Returned', date: 'Just now', description: 'Product return initiated successfully.', active: true })
        };
      }
      return o;
    }));
  };

  // Reviews
  const addReviewToProduct = (productId: string, reviewData: Omit<Review, 'id' | 'date' | 'helpfulCount'>) => {
    const newReview: Review = {
      ...reviewData,
      id: `rev-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      helpfulCount: 0
    };
    
    setProducts(prev => prev.map(p => {
      if (p.id === productId) {
        const updatedReviews = [newReview, ...(p.reviews || [])];
        const avgRating = Number((updatedReviews.reduce((sum, r) => sum + r.rating, 0) / updatedReviews.length).toFixed(1));
        return {
          ...p,
          reviews: updatedReviews,
          reviewsCount: updatedReviews.length,
          rating: avgRating
        };
      }
      return p;
    }));
    
    // Also sync selected product if opened
    if (selectedProduct && selectedProduct.id === productId) {
      setSelectedProduct(prev => {
        if (!prev) return null;
        const updatedReviews = [newReview, ...(prev.reviews || [])];
        const avgRating = Number((updatedReviews.reduce((sum, r) => sum + r.rating, 0) / updatedReviews.length).toFixed(1));
        return {
          ...prev,
          reviews: updatedReviews,
          reviewsCount: updatedReviews.length,
          rating: avgRating
        };
      });
    }
  };

  // Filters Reset
  const resetFilters = () => {
    setFilters({
      category: 'all',
      minPrice: 0,
      maxPrice: 15000,
      brand: 'all',
      rating: 0,
      discount: 0,
      color: 'all',
      size: 'all'
    });
  };

  // Support Chat History
  const addChatMessage = (sender: 'user' | 'bot' | 'gemini', text: string) => {
    setChatMessages(prev => [...prev, {
      sender,
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);
  };

  return (
    <AppContext.Provider value={{
      activePage,
      setActivePage,
      selectedProduct,
      setSelectedProduct,
      lang,
      setLang,
      currency,
      setCurrency,
      theme,
      setTheme,
      cart,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      clearCart,
      appliedCoupon,
      applyCoupon,
      removeCoupon,
      wishlist,
      toggleWishlist,
      recentlyViewed,
      addToRecentlyViewed,
      compareProducts,
      toggleCompare,
      user,
      login,
      logout,
      signup,
      addLoyaltyPoints,
      deductWalletBalance,
      addWalletBalance,
      addresses,
      addAddress,
      deleteAddress,
      setDefaultAddress,
      selectedAddressId,
      setSelectedAddressId,
      orders,
      createOrder,
      cancelOrder,
      returnOrder,
      products,
      addReviewToProduct,
      searchQuery,
      setSearchQuery,
      voiceActive,
      setVoiceActive,
      filters,
      setFilters,
      resetFilters,
      sorting,
      setSorting,
      chatMessages,
      addChatMessage
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
