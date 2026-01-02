
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartItem, Order } from '../types';
import { Trash2, Plus, Minus, ChevronRight, Truck, Wallet, CheckCircle, ShoppingCart, MessageCircle, LogIn } from 'lucide-react';
import { CONTACT_INFO } from '../constants';

interface CartProps {
  cart: CartItem[];
  updateQuantity: (id: string, delta: number) => void;
  placeOrder: (method: 'COD' | 'Online') => Order | undefined;
  isLoggedIn: boolean;
}

const Cart: React.FC<CartProps> = ({ cart, updateQuantity, placeOrder, isLoggedIn }) => {
  const [step, setStep] = useState<'review' | 'success'>('review');
  const [placedOrder, setPlacedOrder] = useState<Order | null>(null);
  const navigate = useNavigate();

  const totalMrp = cart.reduce((sum, item) => sum + (item.product.mrp * item.quantity), 0);
  const totalAmount = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const totalDiscount = totalMrp - totalAmount;

  const handleCheckout = () => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
    const order = placeOrder('COD');
    if (order) {
      setPlacedOrder(order);
      setStep('success');
    }
  };

  const confirmOnWhatsApp = () => {
    if (!placedOrder) return;
    const itemsText = placedOrder.items.map(i => `${i.product.name} x ${i.quantity}`).join(', ');
    const text = `Namaste! I just placed an order on Radhe Krishna Ayurveda.
Order ID: ${placedOrder.id}
Items: ${itemsText}
Total: ₹${placedOrder.totalAmount}
Payment: Cash on Delivery. Please confirm.`;
    window.open(`https://wa.me/${CONTACT_INFO.phone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  if (cart.length === 0 && step === 'review') {
    return (
      <div className="flex flex-col items-center justify-center h-80 space-y-4 animate-in fade-in">
        <div className="bg-gray-100 p-8 rounded-full">
          <ShoppingCart className="w-16 h-16 text-gray-300" />
        </div>
        <h2 className="text-xl font-bold text-gray-900">Your cart is empty!</h2>
        <p className="text-gray-500">Add some Ayurvedic goodness to get started.</p>
        <Link to="/" className="bg-emerald-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg active:scale-95 transition-all">Shop Now</Link>
      </div>
    );
  }

  if (step === 'success' && placedOrder) {
    return (
      <div className="flex flex-col items-center justify-center p-8 space-y-6 text-center animate-in zoom-in duration-500">
        <div className="relative">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-16 h-16 text-green-600 animate-bounce" />
          </div>
          <div className="absolute -inset-2 border-4 border-green-500/20 rounded-full animate-ping"></div>
        </div>
        
        <div>
          <h2 className="text-3xl font-bold text-gray-900 brand-font">Order Placed!</h2>
          <p className="text-gray-500 mt-2">Order ID: <span className="font-bold text-emerald-700">#{placedOrder.id}</span></p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-emerald-100 w-full max-w-sm shadow-sm space-y-4">
          <p className="text-gray-600 text-sm">Your order for <span className="font-bold">₹{placedOrder.totalAmount}</span> has been successfully placed via <span className="font-bold">Cash on Delivery</span>.</p>
          <button 
            onClick={confirmOnWhatsApp}
            className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95"
          >
            <MessageCircle className="w-5 h-5 fill-white" /> CONFIRM ON WHATSAPP
          </button>
        </div>

        <div className="flex flex-col gap-3 w-full max-w-sm">
          <button 
            onClick={() => navigate('/profile')} 
            className="bg-emerald-600 text-white px-8 py-3 rounded-xl font-bold shadow-md hover:bg-emerald-700 transition-all"
          >
            View My Orders
          </button>
          <button 
            onClick={() => navigate('/')} 
            className="text-emerald-700 font-bold py-2 hover:underline"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in slide-in-from-bottom-4">
      <div className="md:col-span-2 space-y-4">
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="bg-emerald-50 p-2 rounded-lg"><Truck className="w-6 h-6 text-emerald-600" /></div>
          <div className="flex-1">
            <h4 className="font-bold text-sm">Delivering to Dhule</h4>
            <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Default Address Select</p>
          </div>
          <button className="text-emerald-600 text-xs font-bold px-3 py-1 bg-emerald-50 rounded-lg">CHANGE</button>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm divide-y overflow-hidden">
          {cart.map((item) => (
            <div key={item.product.id} className="p-4 flex gap-4 hover:bg-gray-50/50 transition-colors">
              <img src={item.product.images[0]} alt="" className="w-24 h-24 object-cover rounded-xl border border-gray-100 shadow-sm" />
              <div className="flex-1 space-y-1">
                <h3 className="font-bold text-gray-900 text-sm line-clamp-1">{item.product.name}</h3>
                <p className="text-[10px] text-emerald-600 font-bold uppercase">{item.product.category}</p>
                <div className="flex items-baseline gap-2">
                  <span className="font-bold text-lg">₹{item.product.price}</span>
                  <span className="text-xs text-gray-400 line-through">₹{item.product.mrp}</span>
                </div>
                
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center bg-gray-50 rounded-xl p-1 border">
                    <button onClick={() => updateQuantity(item.product.id, -1)} className="p-1.5 hover:bg-white rounded-lg transition-all"><Minus className="w-3 h-3" /></button>
                    <span className="w-8 text-center font-bold text-sm">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.product.id, 1)} className="p-1.5 hover:bg-white rounded-lg transition-all"><Plus className="w-3 h-3" /></button>
                  </div>
                  <button onClick={() => updateQuantity(item.product.id, -item.quantity)} className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden sticky top-24">
          <div className="p-4 border-b bg-gray-50">
            <h3 className="font-bold text-gray-400 uppercase text-[10px] tracking-widest">Order Summary</h3>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Price ({cart.length} items)</span>
              <span className="font-medium text-gray-900">₹{totalMrp}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Discount</span>
              <span className="text-green-600 font-bold">-₹{totalDiscount}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Delivery Charges</span>
              <span className="text-green-600 font-bold uppercase text-[10px]">Free</span>
            </div>
            <div className="pt-4 border-t flex justify-between font-bold text-xl text-gray-900">
              <span>Total Amount</span>
              <span className="text-emerald-700">₹{totalAmount}</span>
            </div>
            <div className="bg-green-50 p-2 rounded-lg">
              <p className="text-green-700 text-[10px] font-bold text-center">YAY! YOU SAVE ₹{totalDiscount} ON THIS ORDER</p>
            </div>
          </div>
          <div className="p-4 bg-emerald-50 border-t flex items-center gap-3">
            <Wallet className="w-5 h-5 text-emerald-600" />
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-tighter">Cash on Delivery (COD)</span>
          </div>
        </div>

        <button 
          onClick={handleCheckout}
          className="w-full bg-emerald-600 text-white font-bold py-4 rounded-2xl shadow-xl shadow-emerald-200 hover:bg-emerald-700 transition-all active:scale-95 flex items-center justify-center gap-2 group"
        >
          {isLoggedIn ? (
            <>CONFIRM ORDER <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></>
          ) : (
             <>LOGIN TO ORDER <LogIn className="w-5 h-5" /></>
          )}
        </button>
      </div>
    </div>
  );
};

export default Cart;
