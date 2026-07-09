export interface SpecItem {
  name: string;
  value: string;
}

export interface Review {
  id: string;
  userName: string;
  userEmail: string;
  rating: number;
  comment: string;
  date: string;
  helpfulCount: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number; // in INR
  originalPrice: number; // for showing discount
  discount: number; // percentage
  category: string;
  images: string[]; // gallery of product images
  rating: number;
  reviewsCount: number;
  brand: string;
  stock: number;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  isTodayDeal?: boolean;
  isFlashSale?: boolean;
  isTrending?: boolean;
  isFestivalOffer?: boolean;
  sizes?: string[];
  colors?: string[];
  specs?: SpecItem[];
  reviews?: Review[];
  videoUrl?: string;
  customizationAvailable?: boolean; // For Personalized Gifts
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface Coupon {
  code: string;
  description: string;
  discountType: 'percentage' | 'fixed';
  value: number;
  minPurchase: number;
}

export interface User {
  name: string;
  email: string;
  phone?: string;
  role: 'customer' | 'admin';
  walletBalance: number;
  loyaltyPoints: number;
  isLoggedIn: boolean;
}

export interface Address {
  id: string;
  fullName: string;
  phone: string;
  streetAddress: string;
  city: string;
  state: string;
  pincode: string;
  type: 'home' | 'work';
  isDefault: boolean;
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  items: OrderItem[];
  totalAmount: number;
  discountAmount: number;
  shippingCharge: number;
  taxAmount: number;
  finalAmount: number;
  address: Address;
  paymentMethod: string;
  paymentStatus: 'Pending' | 'Paid' | 'Failed';
  orderStatus: 'Ordered' | 'Packed' | 'Shipped' | 'Out for Delivery' | 'Delivered' | 'Cancelled';
  trackingTimeline: { status: string; date: string; description: string; active: boolean }[];
  date: string;
  couponCode?: string;
}
