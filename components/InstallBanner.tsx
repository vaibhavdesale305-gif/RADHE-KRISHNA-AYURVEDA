
import React, { useState, useEffect } from 'react';
import { Download, X } from 'lucide-react';

const InstallBanner: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowBanner(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
      setShowBanner(false);
    }
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-20 left-4 right-4 z-40 animate-in slide-in-from-bottom-10 duration-500">
      <div className="bg-emerald-900 text-white p-4 rounded-xl shadow-2xl flex items-center justify-between border border-emerald-700">
        <div className="flex items-center gap-3">
          <div className="bg-white/10 p-2 rounded-lg">
            <Download className="w-6 h-6 text-emerald-300" />
          </div>
          <div>
            <h4 className="font-bold text-sm">Install App</h4>
            <p className="text-xs text-emerald-200">Get better experience</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setShowBanner(false)}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <button 
            onClick={handleInstallClick}
            className="bg-white text-emerald-900 px-4 py-2 rounded-lg text-xs font-bold shadow-lg active:scale-95 transition-all"
          >
            INSTALL
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstallBanner;
