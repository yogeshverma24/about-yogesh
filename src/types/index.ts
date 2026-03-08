export type UserRole = 'CUSTOMER_B2C' | 'CUSTOMER_B2B' | 'VENDOR' | 'ADMIN' | 'SUPER_ADMIN';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  isVerified: boolean;
  gstin?: string;
  companyName?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image: string;
  productCount: number;
  subcategories?: SubCategory[];
}

export interface SubCategory {
  id: string;
  name: string;
  slug: string;
  productCount: number;
}

export interface Vendor {
  id: string;
  name: string;
  rating: number;
  reviewCount: number;
  isVerified: boolean;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  categoryId: string;
  categoryName: string;
  vendor: Vendor;
  images: string[];
  b2cPrice: number;
  b2bPrice?: number;
  moq?: number; // Minimum Order Quantity for B2B
  stock: number;
  unit: string;
  specifications?: Record<string, string | number>;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  discount?: number;
  originalPrice?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  vendorId: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  items: CartItem[];
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  totalAmount: number;
  gstAmount: number;
  shippingCharges: number;
  createdAt: string;
  deliveryAddress: Address;
}

export interface Address {
  id: string;
  type: 'home' | 'work' | 'site' | 'warehouse';
  name: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  isDefault?: boolean;
}

export interface RFQ {
  id: string;
  productDetails: string;
  quantity: number;
  status: 'open' | 'quoted' | 'converted' | 'closed';
  quotations?: Quotation[];
}

export interface Quotation {
  id: string;
  vendorId: string;
  vendorName: string;
  price: number;
  validity: string;
}
