
import React from 'react';
import { UserProfile, Order } from '../types';
import { Package, MapPin, User, LogOut, ChevronRight, Phone, Mail, Clock, Download } from 'lucide-react';
import { CONTACT_INFO } from '../constants';
import { useNavigate } from 'react-router-dom';

interface ProfileProps {
  user: UserProfile | null;
  orders: Order[];
  onLogout: () => void;
}

const Profile: React.FC<ProfileProps> = ({ user, orders, onLogout }) => {
  const navigate = useNavigate();

  // If user is null, App.tsx should ideally handle redirect, but redundancy is good
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4 animate-in fade-in">
        <h2 className="text-xl font-bold text-gray-900">Please Login</h2>
        <p className="text-gray-500 text-sm">You need to be logged in to view your profile.</p>
        <button 
          onClick={() => navigate('/login')}
          className="bg-emerald-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg"
        >
          Go to Login
        </button>
      </div>
    );
  }

  const handleInstallApp = () => {
    // This attempts to trigger the install prompt if available, or just alerts instructions
    alert("To install, tap your browser menu (3 dots) and select 'Install App' or 'Add to Home Screen'.");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500">
      {/* Header Info */}
      <div className="bg-emerald-900 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
        <div className="flex items-center gap-4 relative">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-900 text-3xl font-bold brand-font shadow-inner">
            {user.name.charAt(0)}
          </div>
          <div>
            <h2 className="text-2xl font-bold brand-font">{user.name}</h2>
            <div className="flex flex-col gap-1 mt-1 text-emerald-100/80 text-sm">
              <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {user.phone}</span>
              {user.email && <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {user.email}</span>}
            </div>
          </div>
          <button 
            onClick={onLogout}
            className="ml-auto bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-colors flex flex-col items-center gap-1"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-[9px] font-bold">LOGOUT</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Navigation Sidebar (Desktop) / Menu Items */}
        <div className="md:col-span-1 space-y-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden divide-y">
            <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors group">
              <div className="flex items-center gap-3">
                <Package className="w-5 h-5 text-emerald-600" />
                <span className="font-semibold text-gray-700">My Orders</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors group">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-emerald-600" />
                <span className="font-semibold text-gray-700">Addresses</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
            </button>
            <button onClick={handleInstallApp} className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors group">
              <div className="flex items-center gap-3">
                <Download className="w-5 h-5 text-emerald-600" />
                <span className="font-semibold text-gray-700">Install App</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100">
            <h4 className="font-bold text-emerald-900 text-sm mb-2">Need Help?</h4>
            <p className="text-xs text-emerald-700 mb-4">Our Ayurvedic experts are available for free consultation.</p>
            <a 
              href={`https://wa.me/${CONTACT_INFO.phone}`} 
              className="block text-center bg-white text-emerald-700 py-2 rounded-lg font-bold text-xs shadow-sm"
            >
              WhatsApp Support
            </a>
          </div>
        </div>

        {/* Recent Orders List */}
        <div className="md:col-span-2 space-y-4">
          <h3 className="font-bold text-gray-800">Recent Orders ({orders.length})</h3>
          {orders.length === 0 ? (
            <div className="bg-white p-12 text-center rounded-xl border border-dashed border-gray-300">
              <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No orders placed yet.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-xs text-gray-400 font-bold uppercase tracking-tighter">Order #{order.id}</p>
                      <span className={`inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        order.status === 'Placed' ? 'bg-blue-50 text-blue-600' : 'bg-green-50 text-green-600'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                    <span className="text-lg font-bold">₹{order.totalAmount}</span>
                  </div>
                  
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {order.items.map((item, idx) => (
                      <img key={idx} src={item.product.images[0]} className="w-12 h-12 rounded object-cover border border-gray-100 flex-shrink-0" alt="" />
                    ))}
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t pt-4">
                    <div className="flex items-center gap-2 text-[10px] text-gray-400">
                      <Clock className="w-3 h-3" />
                      {new Date(order.createdAt).toLocaleDateString()}
                    </div>
                    <button className="text-emerald-600 text-xs font-bold hover:underline">VIEW DETAILS</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
