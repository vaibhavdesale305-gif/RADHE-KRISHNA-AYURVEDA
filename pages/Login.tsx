
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, ArrowRight, ShieldCheck, Lock, MessageSquare } from 'lucide-react';
import { UserProfile } from '../types';

interface LoginProps {
  onLogin: (user: UserProfile) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showFakeNotification, setShowFakeNotification] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (showFakeNotification) {
      const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2354/2354-preview.mp3'); // Simple notification sound
      audio.play().catch(() => {}); // Play sound if allowed
      
      const timer = setTimeout(() => {
        setShowFakeNotification(false);
      }, 5000); // Hide after 5 seconds
      return () => clearTimeout(timer);
    }
  }, [showFakeNotification]);

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length < 10) {
      alert("Please enter a valid 10-digit mobile number");
      return;
    }
    
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const newOtp = Math.floor(1000 + Math.random() * 9000).toString();
      setGeneratedOtp(newOtp);
      setStep('otp');
      setLoading(false);
      
      // Show Fake Notification after a slight delay
      setTimeout(() => {
        setShowFakeNotification(true);
      }, 500);
    }, 1500);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp === generatedOtp || otp === '1234') { // Backdoor 1234
      setLoading(true);
      setTimeout(() => {
        const isAdmin = phone === '9730593982';
        
        const user: UserProfile = {
          id: phone,
          name: isAdmin ? 'Radhe Krishna Admin' : 'New Customer',
          phone: phone,
          email: isAdmin ? 'admin@rk.com' : '',
          role: isAdmin ? 'admin' : 'customer',
          addresses: isAdmin ? [{
            id: 'addr1',
            name: 'Radhe Krishna Store',
            phone: '9730593982',
            addressLine: 'Kasare, Dhule',
            city: 'Dhule',
            state: 'Maharashtra',
            pincode: '424001',
            isDefault: true
          }] : []
        };
        
        onLogin(user);
        navigate(-1);
      }, 1000);
    } else {
      alert("Invalid OTP. Please try again.");
    }
  };

  const handleChangeNumber = () => {
    setStep('phone');
    setGeneratedOtp(null);
    setOtp('');
    setShowFakeNotification(false);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 animate-in fade-in slide-in-from-bottom-8 relative">
      
      {/* Fake Android SMS Notification */}
      {showFakeNotification && generatedOtp && (
        <div 
          onClick={() => setOtp(generatedOtp)}
          className="fixed top-4 left-4 right-4 bg-white rounded-2xl shadow-2xl p-4 z-[100] animate-in slide-in-from-top-10 cursor-pointer border-l-4 border-emerald-500"
        >
          <div className="flex items-start gap-3">
            <div className="bg-emerald-100 p-2 rounded-full">
              <MessageSquare className="w-5 h-5 text-emerald-600" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-gray-900 text-sm">Messages • now</span>
              </div>
              <p className="text-sm font-bold text-gray-800">
                RK-AYURVEDA: {generatedOtp} is your verification code. Do not share this with anyone.
              </p>
              <p className="text-xs text-emerald-600 font-bold mt-2">Tap to Auto-fill</p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white w-full max-w-md rounded-3xl shadow-xl overflow-hidden border border-emerald-100">
        <div className="bg-emerald-900 p-8 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg animate-bounce">
            <span className="text-emerald-900 text-3xl font-bold brand-font">RK</span>
          </div>
          <h2 className="text-2xl font-bold text-white brand-font">Welcome Back</h2>
          <p className="text-emerald-200 text-sm mt-1">Login to manage orders & addresses</p>
        </div>

        <div className="p-8">
          {step === 'phone' ? (
            <form onSubmit={handleSendOtp} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase ml-1">Mobile Number</label>
                <div className="relative">
                  <div className="absolute left-3 top-3.5 text-gray-400 font-bold border-r pr-2 flex items-center gap-1">
                    <Phone className="w-4 h-4" /> +91
                  </div>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-20 pr-4 font-bold text-lg text-gray-900 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                    placeholder="00000 00000"
                    autoFocus
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={loading || phone.length < 10}
                className="w-full bg-emerald-600 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-emerald-700 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:scale-100"
              >
                {loading ? 'Sending...' : 'GET OTP'} <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-6 animate-in slide-in-from-right-8">
              
              <div className="text-center mb-4">
                <p className="text-sm text-gray-500">OTP sent to <span className="font-bold text-gray-900">+91 {phone}</span></p>
                <button type="button" onClick={handleChangeNumber} className="text-xs text-emerald-600 font-bold mt-1 hover:underline">Change Number</button>
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase ml-1">Enter OTP</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 4))}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-12 pr-4 font-bold text-lg text-gray-900 focus:ring-2 focus:ring-emerald-500 outline-none transition-all tracking-widest text-center"
                    placeholder="XXXX"
                    autoFocus
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || otp.length < 4}
                className="w-full bg-emerald-600 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-emerald-700 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:scale-100"
              >
                {loading ? 'Verifying...' : 'VERIFY & LOGIN'} <ShieldCheck className="w-5 h-5" />
              </button>
              
              <div className="text-center">
                <p className="text-xs text-gray-400">Didn't receive code?</p>
                <button type="button" onClick={handleSendOtp} className="text-xs font-bold text-emerald-600 mt-1 hover:underline">Resend OTP</button>
              </div>
            </form>
          )}

          <div className="mt-8 pt-6 border-t border-dashed text-center">
            <p className="text-[10px] text-gray-400">By continuing, you agree to our Terms & Conditions</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
