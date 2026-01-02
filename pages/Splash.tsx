
import React from 'react';

const Splash: React.FC = () => {
  return (
    <div className="h-screen w-screen bg-emerald-900 flex flex-col items-center justify-center text-white">
      <div className="relative">
        <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center animate-pulse shadow-2xl">
          <span className="text-emerald-900 text-5xl font-bold brand-font">RK</span>
        </div>
        <div className="absolute -inset-4 border-2 border-emerald-400/30 rounded-full animate-ping"></div>
      </div>
      <h1 className="mt-8 text-3xl font-bold brand-font tracking-wider">Radhe Krishna</h1>
      <p className="text-emerald-300 mt-2 font-light uppercase tracking-[0.2em] text-sm italic">Pure Ayurveda, Pure Life</p>
      
      <div className="absolute bottom-12 flex flex-col items-center">
        <div className="flex gap-1 mb-2">
          <div className="w-2 h-2 bg-white/20 rounded-full"></div>
          <div className="w-2 h-2 bg-white/50 rounded-full"></div>
          <div className="w-2 h-2 bg-white/20 rounded-full"></div>
        </div>
        <span className="text-white/60 text-[10px] tracking-widest">MADE WITH TRADITION</span>
      </div>
    </div>
  );
};

export default Splash;
