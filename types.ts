
export type Category = 'Hair Care' | 'Skin Care' | 'Soaps' | 'Dhoop & Agarbatti';

export interface Product {
  id: string;
  name: string;
  category: Category;
  description: string;
  ayurvedicBenefits: string[];
  ingredients: string[];
  usage: string;
  price: number;
  mrp: number;
  discount: number;
  images: string[];
  stockStatus: 'In Stock' | 'Low Stock' | 'Out of Stock';
  rating: number;
  reviewsCount: number;
  isEnabled: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface UserAddress {
  id: string;
  name: string;
  phone: string;
  addressLine: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  totalAmount: number;
  status: 'Placed' | 'Shipped' | 'Delivered' | 'Cancelled';
  paymentMethod: 'COD' | 'Online';
  shippingAddress: UserAddress;
  createdAt: string;
}

export interface UserProfile {
  id: string;
  name: string;
  phone: string;
  email: string;
  addresses: UserAddress[];
  role: 'customer' | 'admin';
}

export interface AppState {
  products: Product[];
  cart: CartItem[];
  orders: Order[];
  currentUser: UserProfile | null;
  selectedCategory: Category | 'All';
}
