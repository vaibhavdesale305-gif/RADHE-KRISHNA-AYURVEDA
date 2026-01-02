
import React from 'react';
import { MessageCircle, Phone, Mail, MapPin, ChevronLeft, Send } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CONTACT_INFO } from '../constants';

const Support: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <Link to="/" className="flex items-center gap-2 text-gray-500 hover:text-emerald-700 transition-colors">
        <ChevronLeft className="w-5 h-5" /> Back to Home
      </Link>

      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-emerald-900 brand-font">Contact & Support</h1>
        <p className="text-gray-500">We are here to help you with your orders and Ayurvedic queries.</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <a 
          href={`https://wa.me/${CONTACT_INFO.phone}`} 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-6 group hover:border-emerald-500 transition-all active:scale-95"
        >
          <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center">
            <MessageCircle className="w-8 h-8 text-green-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-gray-900">WhatsApp Chat</h3>
            <p className="text-sm text-gray-500">Instant support for orders and advice.</p>
          </div>
          <span className="text-emerald-600 font-bold text-sm group-hover:underline">Chat Now</span>
        </a>

        <a 
          href={`tel:${CONTACT_INFO.phone}`} 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-6 group hover:border-blue-500 transition-all active:scale-95"
        >
          <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center">
            <Phone className="w-8 h-8 text-blue-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-gray-900">Call Us</h3>
            <p className="text-sm text-gray-500">Mon-Sat: 10:00 AM to 8:00 PM</p>
          </div>
          <span className="text-blue-600 font-bold text-sm group-hover:underline">Call Support</span>
        </a>

        <a 
          href={`mailto:${CONTACT_INFO.email}`} 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-6 group hover:border-red-500 transition-all active:scale-95"
        >
          <div className="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center">
            <Mail className="w-8 h-8 text-red-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-gray-900">Email Support</h3>
            <p className="text-sm text-gray-500">For bulk orders and business queries.</p>
          </div>
          <span className="text-red-600 font-bold text-sm group-hover:underline">Send Email</span>
        </a>
      </div>

      <div className="bg-gray-100 p-6 rounded-2xl space-y-4">
        <div className="flex gap-4">
          <MapPin className="w-6 h-6 text-gray-400 flex-shrink-0" />
          <div>
            <h4 className="font-bold text-gray-900">Our Address</h4>
            <p className="text-sm text-gray-600 leading-relaxed">{CONTACT_INFO.address}</p>
          </div>
        </div>
      </div>

      <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100 flex items-center gap-4">
        <Send className="w-8 h-8 text-emerald-600 opacity-50" />
        <p className="text-xs text-emerald-800 font-medium">We usually respond to WhatsApp queries within 30 minutes during business hours.</p>
      </div>
    </div>
  );
};

export default Support;
