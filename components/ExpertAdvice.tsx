
import React, { useState } from 'react';
import { getAyurvedicAdvice } from '../services/geminiService';
import { Sparkles, Send, Loader2, MessageSquare } from 'lucide-react';

const ExpertAdvice: React.FC = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setResponse(null);
    const advice = await getAyurvedicAdvice(query);
    setResponse(advice);
    setLoading(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-emerald-100 overflow-hidden my-8 animate-in fade-in duration-700">
      <div className="bg-emerald-900 p-4 flex items-center gap-3">
        <div className="bg-emerald-500 p-2 rounded-lg">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-white font-bold text-sm">Ask Our Ayurvedic Expert</h3>
          <p className="text-emerald-300 text-[10px] uppercase tracking-wider">AI Powered Natural Guidance</p>
        </div>
      </div>
      
      <div className="p-4 space-y-4">
        {!response && !loading && (
          <p className="text-xs text-gray-500 italic">"How can I reduce hair fall naturally?" or "Benefits of Neem for skin?"</p>
        )}

        {loading && (
          <div className="flex flex-col items-center py-6 space-y-2">
            <Loader2 className="w-8 h-8 text-emerald-600 animate-spin" />
            <p className="text-xs text-gray-400 font-medium">Consulting ancient wisdom...</p>
          </div>
        )}

        {response && (
          <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100 animate-in slide-in-from-top-2">
            <div className="flex items-start gap-2 mb-2">
              <MessageSquare className="w-4 h-4 text-emerald-600 mt-1" />
              <p className="text-sm text-gray-800 leading-relaxed font-medium">Expert Advice:</p>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">{response}</p>
            <button 
              onClick={() => { setResponse(null); setQuery(''); }}
              className="mt-4 text-[10px] font-bold text-emerald-700 uppercase hover:underline"
            >
              Ask Another Question
            </button>
          </div>
        )}

        {!response && !loading && (
          <form onSubmit={handleAsk} className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type your health query here..."
              className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-4 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
            />
            <button
              type="submit"
              disabled={!query.trim()}
              className="absolute right-2 top-1.5 p-2 bg-emerald-600 text-white rounded-lg disabled:opacity-50 transition-all active:scale-95"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ExpertAdvice;
