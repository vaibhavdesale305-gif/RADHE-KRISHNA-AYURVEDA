
import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Product, CartItem } from '../types';
import { Star, ShoppingCart, Zap, Share2, MessageCircle, ChevronLeft, CheckCircle2 } from 'lucide-react';
import { CONTACT_INFO } from '../constants';

interface ProductDetailProps {
  products: Product[];
  addToCart: (p: Product) => void;
  onBuyNow: (p: Product) => void;
  cart: CartItem[];
}

const ProductDetail: React.FC<ProductDetailProps> = ({ products, addToCart, onBuyNow, cart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => p.id === id);
  const [activeTab, setActiveTab] = useState<'details' | 'benefits' | 'usage'>('details');

  if (!product) return <div className="p-10 text-center">Product not found</div>;

  const isInCart = cart.some(item => item.product.id === product.id);

  const handleWhatsAppOrder = () => {
    const text = `Namaste! I want to order "${product.name}" for ₹${product.price}. Please share details.`;
    window.open(`https://wa.me/${CONTACT_INFO.phone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in slide-in-from-right-4 duration-500">
      <Link to="/" className="flex items-center gap-2 text-gray-500 hover:text-emerald-700 transition-colors mb-4">
        <ChevronLeft className="w-5 h-5" /> Back to Shop
      </Link>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden md:flex">
        {/* Gallery */}
        <div className="md:w-1/2 p-4">
          <div className="aspect-square rounded-xl overflow-hidden mb-4 border border-gray-100">
            <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {product.images.map((img, i) => (
              <img key={i} src={img} alt="" className="w-16 h-16 rounded-lg object-cover border-2 border-emerald-500" />
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="md:w-1/2 p-6 flex flex-col">
          <div className="flex justify-between items-start">
            <span className="text-emerald-700 font-bold text-xs bg-emerald-50 px-2 py-1 rounded uppercase tracking-wider">{product.category}</span>
            <button className="text-gray-400 hover:text-emerald-600"><Share2 className="w-5 h-5" /></button>
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mt-2 brand-font">{product.name}</h1>
          
          <div className="flex items-center gap-2 mt-2">
            <div className="bg-emerald-600 text-white px-1.5 py-0.5 rounded flex items-center gap-1">
              <span className="text-xs font-bold">{product.rating}</span>
              <Star className="w-3 h-3 fill-white" />
            </div>
            <span className="text-sm text-gray-500 font-medium">{product.reviewsCount} Ratings & Reviews</span>
          </div>

          <div className="mt-6 flex items-baseline gap-3">
            <span className="text-3xl font-bold text-gray-900">₹{product.price}</span>
            <span className="text-lg text-gray-400 line-through">₹{product.mrp}</span>
            <span className="text-emerald-600 font-bold text-sm">{product.discount}% off</span>
          </div>

          <p className="text-gray-600 mt-4 text-sm leading-relaxed">{product.description}</p>

          <div className="mt-4 flex items-center gap-2">
            <span className={`text-xs font-bold px-2 py-1 rounded-full ${
              product.stockStatus === 'In Stock' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}>
              {product.stockStatus}
            </span>
            <span className="text-xs text-gray-400">Available for delivery in 3-5 days</span>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col gap-3">
            <div className="flex gap-2">
              {isInCart ? (
                <button 
                  onClick={() => navigate('/cart')}
                  className="flex-1 bg-emerald-700 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-emerald-800 active:scale-95 transition-all shadow-md"
                >
                  <ShoppingCart className="w-5 h-5" /> GO TO CART
                </button>
              ) : (
                <button 
                  onClick={() => addToCart(product)}
                  className="flex-1 bg-white border-2 border-emerald-600 text-emerald-600 font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-emerald-50 active:scale-95 transition-all"
                >
                  <ShoppingCart className="w-5 h-5" /> ADD TO CART
                </button>
              )}
              <button 
                onClick={() => onBuyNow(product)}
                className="flex-1 bg-emerald-600 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-emerald-700 active:scale-95 transition-all shadow-md shadow-emerald-200"
              >
                <Zap className="w-5 h-5 fill-white" /> BUY NOW
              </button>
            </div>
            
            <button 
              onClick={handleWhatsAppOrder}
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              <MessageCircle className="w-5 h-5 fill-white" /> ORDER ON WHATSAPP
            </button>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex border-b">
          {(['details', 'benefits', 'usage'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-4 text-sm font-bold capitalize transition-all border-b-2 ${
                activeTab === tab ? 'border-emerald-600 text-emerald-700' : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="p-6">
          {activeTab === 'details' && (
            <div className="space-y-4">
              <h3 className="font-bold text-gray-900">Ingredients</h3>
              <div className="flex flex-wrap gap-2">
                {product.ingredients.map((ing, i) => (
                  <span key={i} className="bg-gray-100 text-gray-700 text-xs px-3 py-1.5 rounded-full border border-gray-200">{ing}</span>
                ))}
              </div>
            </div>
          )}
          {activeTab === 'benefits' && (
            <div className="space-y-3">
              {product.ayurvedicBenefits.map((benefit, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700 text-sm">{benefit}</p>
                </div>
              ))}
            </div>
          )}
          {activeTab === 'usage' && (
            <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100">
              <p className="text-emerald-900 text-sm leading-relaxed italic">"{product.usage}"</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
