
import React, { useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Product, CartItem } from '../types';
import { CATEGORIES } from '../constants';
import { ChevronRight, Filter, Star, Heart, ShoppingCart } from 'lucide-react';

interface CategoryListingProps {
  products: Product[];
  cart: CartItem[];
  addToCart: (p: Product) => void;
}

const CategoryListing: React.FC<CategoryListingProps> = ({ products, cart, addToCart }) => {
  const { name } = useParams();
  const navigate = useNavigate();
  
  const filteredProducts = useMemo(() => {
    if (!name) return products;
    return products.filter(p => p.category === name);
  }, [name, products]);

  return (
    <div className="space-y-6 animate-in slide-in-from-left-4 duration-500">
      <div className="flex items-center gap-2 text-sm text-gray-400 overflow-x-auto no-scrollbar py-2">
        <Link to="/" className="hover:text-emerald-600 flex-shrink-0">Home</Link>
        <ChevronRight className="w-4 h-4 flex-shrink-0" />
        <Link to="/categories" className="hover:text-emerald-600 flex-shrink-0">Categories</Link>
        {name && (
          <>
            <ChevronRight className="w-4 h-4 flex-shrink-0" />
            <span className="text-emerald-700 font-bold whitespace-nowrap">{name}</span>
          </>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Filter Sidebar (Desktop) */}
        <aside className="hidden md:block w-64 space-y-6">
          <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
            <h3 className="font-bold flex items-center gap-2 mb-4">
              <Filter className="w-4 h-4" /> Filters
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase mb-2">Categories</p>
                <div className="space-y-2">
                  {CATEGORIES.map(cat => (
                    <Link 
                      key={cat.name} 
                      to={`/category/${cat.name}`}
                      className={`block text-sm py-1 hover:text-emerald-600 ${name === cat.name ? 'text-emerald-700 font-bold' : 'text-gray-600'}`}
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase mb-2">Price Range</p>
                <input type="range" className="w-full accent-emerald-600" />
                <div className="flex justify-between text-[10px] text-gray-400 font-bold">
                  <span>₹0</span>
                  <span>₹2000+</span>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900 brand-font">{name || 'All Products'} <span className="text-sm font-normal text-gray-400">({filteredProducts.length} items)</span></h2>
            <button className="md:hidden flex items-center gap-2 text-xs font-bold bg-white border px-3 py-1.5 rounded-lg">
              <Filter className="w-3 h-3" /> FILTER
            </button>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="bg-white p-12 text-center rounded-2xl border border-gray-100">
              <p className="text-gray-400 font-medium">No products found in this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProducts.map((product) => {
                const isInCart = cart.some(i => i.product.id === product.id);
                return (
                  <div key={product.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-md transition-shadow flex flex-col">
                    <Link to={`/product/${product.id}`} className="block relative">
                      <img src={product.images[0]} alt={product.name} className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500" />
                      <button className="absolute top-2 right-2 p-1.5 bg-white/80 backdrop-blur rounded-full text-gray-400 hover:text-red-500 transition-colors">
                        <Heart className="w-4 h-4" />
                      </button>
                      {product.discount > 0 && (
                        <span className="absolute bottom-2 left-2 bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                          {product.discount}% OFF
                        </span>
                      )}
                    </Link>
                    <div className="p-3 flex-grow flex flex-col">
                      <h4 className="text-sm font-semibold text-gray-800 line-clamp-1">{product.name}</h4>
                      <div className="flex items-center gap-1 mt-1">
                        <div className="bg-emerald-100 px-1 rounded flex items-center gap-0.5">
                          <span className="text-[10px] font-bold text-emerald-700">{product.rating}</span>
                          <Star className="w-2.5 h-2.5 fill-emerald-600 text-emerald-600" />
                        </div>
                        <span className="text-[10px] text-gray-400">({product.reviewsCount})</span>
                      </div>
                      <div className="mt-2 flex items-baseline gap-2 mb-3">
                        <span className="text-lg font-bold text-gray-900">₹{product.price}</span>
                        <span className="text-xs text-gray-400 line-through">₹{product.mrp}</span>
                      </div>

                      {isInCart ? (
                        <button 
                          onClick={() => navigate('/cart')}
                          className="w-full mt-auto bg-emerald-600 text-white py-1.5 rounded-lg text-xs font-bold hover:bg-emerald-700 transition-all flex items-center justify-center gap-2"
                        >
                          <ShoppingCart className="w-3 h-3" /> GO TO CART
                        </button>
                      ) : (
                        <button 
                          onClick={() => addToCart(product)}
                          className="w-full mt-auto border border-emerald-600 text-emerald-600 py-1.5 rounded-lg text-xs font-bold hover:bg-emerald-600 hover:text-white transition-all"
                        >
                          ADD TO CART
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryListing;
