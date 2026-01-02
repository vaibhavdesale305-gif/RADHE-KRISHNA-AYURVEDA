
import React from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { Home, ShoppingCart, User, Grid, Package, Search, Phone, LucideIcon, LogIn } from 'lucide-react';
import { CONTACT_INFO } from '../constants';
import InstallBanner from './InstallBanner';
import { UserProfile } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  cartCount: number;
  isAdmin?: boolean;
  onSearch?: (query: string) => void;
  user: UserProfile | null;
}

interface NavItem {
  label: string;
  icon: LucideIcon;
  path: string;
  badge?: number;
}

const Layout: React.FC<LayoutProps> = ({ children, cartCount, isAdmin, onSearch, user }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems: NavItem[] = [
    { label: 'Home', icon: Home, path: '/' },
    { label: 'Categories', icon: Grid, path: '/categories' },
    { label: 'Cart', icon: ShoppingCart, path: '/cart', badge: cartCount },
    { label: user ? 'Account' : 'Login', icon: user ? User : LogIn, path: user ? '/profile' : '/login' },
  ];

  const adminNavItems: NavItem[] = [
    { label: 'Dashboard', icon: Package, path: '/admin' },
    { label: 'Orders', icon: Grid, path: '/admin/orders' },
    { label: 'Support', icon: Phone, path: '/admin/support' },
  ];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onSearch) {
      onSearch(e.target.value);
      if (location.pathname !== '/') navigate('/');
    }
  };

  return (
    <div className="min-h-screen pb-20 md:pb-0 flex flex-col">
      <header className="sticky top-0 z-50 bg-emerald-900 text-white p-3 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-white p-1 rounded-full text-emerald-900 font-bold text-lg w-10 h-10 flex items-center justify-center shadow-lg">RK</div>
            <h1 className="brand-font text-xl hidden sm:block font-bold">Radhe Krishna</h1>
          </Link>
          
          <div className="flex-1 max-w-lg relative">
            <input 
              type="text" 
              placeholder="Search products..." 
              onChange={handleSearchChange}
              className="w-full bg-white/10 border border-white/20 rounded-xl py-2 pl-4 pr-10 text-sm focus:outline-none focus:bg-white focus:text-gray-900 transition-all shadow-inner"
            />
            <Search className="absolute right-3 top-2.5 w-4 h-4 opacity-50 text-white pointer-events-none" />
          </div>

          <div className="flex items-center gap-4">
            <a 
              href={`https://wa.me/${CONTACT_INFO.phone}`} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hidden md:flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 px-4 py-2 rounded-xl text-sm font-bold transition-all active:scale-95 shadow-lg"
            >
              <Phone className="w-4 h-4" />
              <span>Help</span>
            </a>
          </div>
        </div>
      </header>

      <main className="flex-grow max-w-7xl mx-auto w-full p-4 md:p-6">
        {children}
      </main>

      <InstallBanner />

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 md:hidden z-50 px-2 py-1 flex justify-around shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
        {(isAdmin ? adminNavItems : navItems).map((item) => (
          <Link 
            key={item.path} 
            to={item.path}
            className={`flex flex-col items-center p-2 min-w-[64px] transition-all ${
              location.pathname === item.path ? 'text-emerald-700 font-bold scale-110' : 'text-gray-400'
            }`}
          >
            <div className="relative">
              <item.icon className="w-6 h-6" />
              {item.badge !== undefined && item.badge > 0 && (
                <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[9px] font-black rounded-full w-4 h-4 flex items-center justify-center animate-bounce">
                  {item.badge}
                </span>
              )}
            </div>
            <span className="text-[10px] mt-1 uppercase tracking-tighter">{item.label}</span>
          </Link>
        ))}
      </nav>

      <footer className="hidden md:block bg-gray-900 text-gray-500 py-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <h3 className="text-white font-bold text-lg brand-font">Radhe Krishna Ayurveda</h3>
            <p className="text-sm leading-relaxed">Purity in every drop. We bring traditional Indian wisdom to modern lifestyle with 100% natural formulations.</p>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4 uppercase text-xs tracking-widest">Explore</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/about" className="hover:text-emerald-400 transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-emerald-400 transition-colors">Customer Support</Link></li>
              <li><Link to="/categories" className="hover:text-emerald-400 transition-colors">Shop by Category</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4 uppercase text-xs tracking-widest">Connect</h3>
            <p className="text-sm">{CONTACT_INFO.address}</p>
            <p className="text-sm mt-4 text-emerald-400 font-bold">WhatsApp: {CONTACT_INFO.displayPhone}</p>
          </div>
          <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
            <h3 className="text-white font-bold mb-2">Ayurvedic Advice?</h3>
            <p className="text-xs mb-4">Chat with our experts for free health consultations.</p>
            <a href={`https://wa.me/${CONTACT_INFO.phone}`} className="inline-block bg-emerald-600 text-white px-4 py-2 rounded-xl text-xs font-bold w-full text-center">ASK EXPERT</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
