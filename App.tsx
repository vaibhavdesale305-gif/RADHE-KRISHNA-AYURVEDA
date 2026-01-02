
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, useNavigate, Link } from 'react-router-dom';
import { MOCK_PRODUCTS } from './constants';
import { AppState, Product, Order, UserProfile } from './types';
import Layout from './components/Layout';
import Splash from './pages/Splash';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';
import CategoryListing from './pages/CategoryListing';
import About from './pages/About';
import Support from './pages/Support';
import Login from './pages/Login';
import { CheckCircle, ShoppingCart } from 'lucide-react';

const AppContent: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [toast, setToast] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [state, setState] = useState<AppState>({
    products: MOCK_PRODUCTS,
    cart: [],
    orders: [],
    currentUser: null, // Initial state is logged out
    selectedCategory: 'All',
  });

  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 4000);
  };

  const handleLogin = (user: UserProfile) => {
    setState(prev => ({ ...prev, currentUser: user }));
    showToast(`Welcome back, ${user.name}!`);
  };

  const handleLogout = () => {
    setState(prev => ({ ...prev, currentUser: null }));
    navigate('/');
    showToast("Logged out successfully");
  };

  const addToCart = (product: Product, silent = false) => {
    setState(prev => {
      const existing = prev.cart.find(item => item.product.id === product.id);
      let newCart;
      if (existing) {
        newCart = prev.cart.map(item => 
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        newCart = [...prev.cart, { product, quantity: 1 }];
      }
      return { ...prev, cart: newCart };
    });
    if (!silent) showToast(`${product.name} added to cart!`);
  };

  const handleBuyNow = (product: Product) => {
    const inCart = state.cart.find(i => i.product.id === product.id);
    if (!inCart) {
      addToCart(product, true);
    }
    navigate('/cart');
  };

  const updateCartQuantity = (productId: string, delta: number) => {
    setState(prev => ({
      ...prev,
      cart: prev.cart.map(item => 
        item.product.id === productId 
          ? { ...item, quantity: Math.max(0, item.quantity + delta) } 
          : item
      ).filter(item => item.quantity > 0)
    }));
  };

  const saveProduct = (product: Product) => {
    setState(prev => {
      const exists = prev.products.find(p => p.id === product.id);
      if (exists) {
        return {
          ...prev,
          products: prev.products.map(p => p.id === product.id ? product : p)
        };
      }
      return {
        ...prev,
        products: [product, ...prev.products]
      };
    });
    showToast("Product details updated!");
  };

  const deleteProduct = (id: string) => {
    setState(prev => ({
      ...prev,
      products: prev.products.filter(p => p.id !== id)
    }));
    showToast("Product removed.");
  };

  const placeOrder = (paymentMethod: 'COD' | 'Online') => {
    if (state.cart.length === 0) return;
    
    // Check authentication
    if (!state.currentUser) {
      showToast("Please login to place order");
      navigate('/login');
      return undefined;
    }

    const newOrder: Order = {
      id: 'ORD-' + Math.random().toString(36).substr(2, 7).toUpperCase(),
      userId: state.currentUser.id,
      items: [...state.cart],
      totalAmount: state.cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
      status: 'Placed',
      paymentMethod,
      shippingAddress: state.currentUser.addresses[0] || {
        id: 'temp',
        name: state.currentUser.name,
        phone: state.currentUser.phone,
        addressLine: 'Not Provided',
        city: 'Pending',
        state: 'Maharashtra',
        pincode: '000000',
        isDefault: true
      },
      createdAt: new Date().toISOString(),
    };

    setState(prev => ({
      ...prev,
      orders: [newOrder, ...prev.orders],
      cart: [],
    }));
    
    return newOrder;
  };

  const filteredProducts = state.products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (showSplash) return <Splash />;

  return (
    <Layout 
      cartCount={state.cart.reduce((sum, i) => sum + i.quantity, 0)} 
      isAdmin={state.currentUser?.role === 'admin'}
      onSearch={setSearchQuery}
      user={state.currentUser}
    >
      <Routes>
        <Route path="/" element={<Home products={filteredProducts} addToCart={addToCart} cart={state.cart} />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/categories" element={<CategoryListing products={state.products} cart={state.cart} addToCart={addToCart} />} />
        <Route path="/category/:name" element={<CategoryListing products={state.products} cart={state.cart} addToCart={addToCart} />} />
        <Route path="/product/:id" element={<ProductDetail products={state.products} addToCart={addToCart} onBuyNow={handleBuyNow} cart={state.cart} />} />
        <Route path="/cart" element={<Cart cart={state.cart} updateQuantity={updateCartQuantity} placeOrder={placeOrder} isLoggedIn={!!state.currentUser} />} />
        <Route path="/profile" element={<Profile user={state.currentUser} orders={state.orders} onLogout={handleLogout} />} />
        <Route path="/admin/*" element={
          state.currentUser?.role === 'admin' 
          ? <AdminDashboard products={state.products} orders={state.orders} onSave={saveProduct} onDelete={deleteProduct} />
          : <div className="p-10 text-center font-bold text-red-500">Access Denied. Admin Login Required.</div>
        } />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Support />} />
      </Routes>

      {toast && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[100] bg-emerald-900 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center justify-between gap-6 animate-in slide-in-from-bottom-10 fade-in duration-300 min-w-[280px]">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-emerald-400" />
            <span className="font-bold text-sm">{toast}</span>
          </div>
          {toast.includes("added to cart") && (
            <Link to="/cart" className="bg-emerald-600 text-[10px] font-black px-3 py-1.5 rounded-lg uppercase tracking-wider">View Cart</Link>
          )}
        </div>
      )}
    </Layout>
  );
};

const App: React.FC = () => (
  <HashRouter>
    <AppContent />
  </HashRouter>
);

export default App;
