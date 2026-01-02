
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CATEGORIES } from '../constants';
import { Product, CartItem } from '../types';
import { Star, ChevronRight, TrendingUp, ShieldCheck, Heart, ShoppingCart } from 'lucide-react';
import ExpertAdvice from '../components/ExpertAdvice';

interface HomeProps {
  products: Product[];
  addToCart: (p: Product) => void;
  cart: CartItem[];
}

const Home: React.FC<HomeProps> = ({ products, addToCart, cart }) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Hero Banner Carousel (Simplified) */}
      <section className="relative h-48 md:h-80 rounded-2xl overflow-hidden shadow-lg group">
        <img 
          src="https://picsum.photos/seed/ayurveda-hero/1200/400" 
          alt="Ayurveda Banner" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/80 to-transparent flex items-center p-8">
          <div className="max-w-md">
            <h2 className="text-white text-2xl md:text-5xl font-bold brand-font leading-tight">100% Natural<br/>Ayurvedic Care</h2>
            <p className="text-emerald-100 mt-4 text-sm md:text-lg hidden sm:block">Experience the purity of traditional Indian formulations handmade with love.</p>
            <Link to="/categories" className="inline-block mt-6 bg-white text-emerald-900 px-6 py-2 rounded-full font-bold shadow-lg hover:bg-emerald-50 transition-colors transform hover:scale-105 active:scale-95">Shop Now</Link>
          </div>
        </div>
      </section>

      {/* Categories Horizontal Scroll */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <Grid className="w-5 h-5 text-emerald-600" /> Top Categories
          </h3>
          <Link to="/categories" className="text-emerald-600 text-sm font-semibold flex items-center">
            View All <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar -mx-4 px-4">
          {CATEGORIES.map((cat) => (
            <Link 
              key={cat.name}
              to={`/category/${cat.name}`}
              className="flex-shrink-0 flex flex-col items-center gap-2 group"
            >
              <div className="w-16 h-16 md:w-20 md:h-20 bg-emerald-100 rounded-full flex items-center justify-center text-3xl group-hover:scale-110 group-hover:bg-emerald-200 transition-transform duration-300">
                {cat.icon}
              </div>
              <span className="text-xs font-medium text-gray-700 text-center whitespace-nowrap">{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* AI Expert Advice Section */}
      <ExpertAdvice />

      {/* Trending Products (Flipkart Style Grid) */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-600" /> Popular Choice
          </h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.slice(0, 4).map((product) => {
            const isInCart = cart.some(item => item.product.id === product.id);
            return (
              <div key={product.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-md transition-shadow">
                <Link to={`/product/${product.id}`} className="block relative">
                  <img 
                    src={product.images[0]} 
                    alt={product.name} 
                    className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <button 
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); }} 
                    className="absolute top-2 right-2 p-1.5 bg-white/80 backdrop-blur rounded-full text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Heart className="w-4 h-4" />
                  </button>
                  {product.discount > 0 && (
                    <span className="absolute bottom-2 left-2 bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                      {product.discount}% OFF
                    </span>
                  )}
                </Link>
                <div className="p-3">
                  <h4 className="text-sm font-semibold text-gray-800 line-clamp-1">{product.name}</h4>
                  <div className="flex items-center gap-1 mt-1">
                    <div className="bg-emerald-100 px-1 rounded flex items-center gap-0.5">
                      <span className="text-[10px] font-bold text-emerald-700">{product.rating}</span>
                      <Star className="w-2.5 h-2.5 fill-emerald-600 text-emerald-600" />
                    </div>
                    <span className="text-[10px] text-gray-400">({product.reviewsCount})</span>
                  </div>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-lg font-bold text-gray-900">₹{product.price}</span>
                    <span className="text-xs text-gray-400 line-through">₹{product.mrp}</span>
                  </div>
                  
                  {isInCart ? (
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        navigate('/cart');
                      }}
                      className="w-full mt-3 bg-emerald-600 text-white py-1.5 rounded-lg text-xs font-bold hover:bg-emerald-700 transition-all active:scale-95 flex items-center justify-center gap-2"
                    >
                      <ShoppingCart className="w-3 h-3" /> GO TO CART
                    </button>
                  ) : (
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        addToCart(product);
                      }}
                      className="w-full mt-3 border border-emerald-600 text-emerald-600 py-1.5 rounded-lg text-xs font-bold hover:bg-emerald-600 hover:text-white transition-all active:scale-95"
                    >
                      ADD TO CART
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Trust Factors */}
      <section className="bg-emerald-50 rounded-2xl p-6 grid grid-cols-1 md:grid-cols-3 gap-6 border border-emerald-100">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white rounded-full shadow-sm">
            <ShieldCheck className="w-6 h-6 text-emerald-600" />
          </div>
          <div>
            <h4 className="font-bold text-emerald-900">100% Pure</h4>
            <p className="text-xs text-emerald-700">Traditional formulations without chemicals.</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white rounded-full shadow-sm">
            <Heart className="w-6 h-6 text-emerald-600" />
          </div>
          <div>
            <h4 className="font-bold text-emerald-900">Handmade</h4>
            <p className="text-xs text-emerald-700">Crafted with care for your well-being.</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white rounded-full shadow-sm">
            <Star className="w-6 h-6 text-emerald-600" />
          </div>
          <div>
            <h4 className="font-bold text-emerald-900">Trusted Quality</h4>
            <p className="text-xs text-emerald-700">Generations of Ayurvedic wisdom.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

// Internal Grid component helper
const Grid: React.FC<{className?: string}> = ({className}) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
  </svg>
);

export default Home;
