
import React from 'react';
import { ShieldCheck, Leaf, Heart, Users, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <Link to="/" className="flex items-center gap-2 text-gray-500 hover:text-emerald-700 transition-colors">
        <ChevronLeft className="w-5 h-5" /> Back to Home
      </Link>

      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-emerald-900 brand-font">Our Ayurvedic Journey</h1>
        <p className="text-gray-600 max-w-2xl mx-auto italic">"Bringing the timeless wisdom of Ayurveda to your doorstep with 100% natural, handmade care."</p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <img src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800" alt="Herbs" className="rounded-3xl shadow-xl border-4 border-white" />
        <div className="space-y-6">
          <div className="flex gap-4">
            <div className="bg-emerald-100 p-3 rounded-2xl h-fit"><Leaf className="w-6 h-6 text-emerald-700" /></div>
            <div>
              <h3 className="font-bold text-gray-900">100% Natural</h3>
              <p className="text-sm text-gray-500 leading-relaxed">Every product is crafted using pure herbs sourced directly from the lap of nature, ensuring no harmful chemicals touch your skin.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="bg-emerald-100 p-3 rounded-2xl h-fit"><Heart className="w-6 h-6 text-emerald-700" /></div>
            <div>
              <h3 className="font-bold text-gray-900">Handmade with Love</h3>
              <p className="text-sm text-gray-500 leading-relaxed">We follow traditional "Gharelu" methods to preserve the potency of ingredients, just like our ancestors did for generations.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="bg-emerald-100 p-3 rounded-2xl h-fit"><ShieldCheck className="w-6 h-6 text-emerald-700" /></div>
            <div>
              <h3 className="font-bold text-gray-900">Trusted by Families</h3>
              <p className="text-sm text-gray-500 leading-relaxed">Based in Kasare, Maharashtra, we are a family-run business dedicated to the health of your family.</p>
            </div>
          </div>
        </div>
      </div>

      <section className="bg-emerald-900 text-white rounded-3xl p-8 md:p-12 text-center space-y-6">
        <Users className="w-12 h-12 mx-auto text-emerald-300 opacity-50" />
        <h2 className="text-2xl font-bold brand-font">Join the Ayurvedic Revolution</h2>
        <p className="text-emerald-100 max-w-xl mx-auto">Help us promote chemical-free living. Share our products with your friends and family and spread the gift of health.</p>
        <Link to="/" className="inline-block bg-white text-emerald-900 px-8 py-3 rounded-full font-bold shadow-lg hover:bg-emerald-50 transition-all">Start Shopping</Link>
      </section>
    </div>
  );
};

export default About;
