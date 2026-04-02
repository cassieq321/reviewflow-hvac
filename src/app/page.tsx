'use client'

import React, { useState } from 'react';

export default function Page() {
  const [feedback, setFeedback] = useState('');
  const [step, setStep] = useState('input'); // 'input', 'sending', 'shielded', 'positive'

  const handleSubmit = () => {
    setStep('sending');
    
    // Simulating the "AI Analysis" for 1.5 seconds
    setTimeout(() => {
      const negativeWords = ['bad', 'rude', 'late', 'expensive', 'terrible', 'worst', 'scam', 'poor', 'dirty'];
      const isNegative = negativeWords.some(word => feedback.toLowerCase().includes(word)) || feedback.length < 10;

      if (isNegative) {
        setStep('shielded');
        console.log("ALERT SENT TO OWNER:", feedback); // This is where the email trigger happens
      } else {
        setStep('positive');
      }
    }, 1500);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-zinc-950 text-white font-sans p-6 uppercase tracking-tight">
      <div className="max-w-md w-full bg-zinc-900 border border-zinc-800 p-8 rounded-[2.5rem] shadow-2xl transition-all duration-500 min-h-[450px] flex flex-col justify-center">
        
        {step === 'input' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="text-center mb-10">
              <h1 className="text-3xl font-black italic tracking-tighter">ARCTIC<span className="text-blue-500">AIR</span></h1>
              <div className="mt-2 inline-flex items-center gap-2 px-2 py-1 bg-blue-500/10 border border-blue-500/20 rounded-md">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="text-[9px] font-bold text-blue-400 tracking-widest">SHIELD v1.0 ACTIVE</span>
              </div>
            </div>

            <div className="space-y-6">
              <textarea 
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-3xl p-6 text-white placeholder-zinc-700 focus:outline-none focus:border-blue-500 transition-all lowercase italic"
                placeholder="Describe your service experience..."
                rows={5}
              />
              <button 
                onClick={handleSubmit}
                className="w-full bg-white text-black hover:bg-blue-500 hover:text-white font-black py-6 rounded-3xl shadow-xl transition-all active:scale-[0.95] text-sm tracking-widest border-none"
              >
                ANALYZE FEEDBACK
              </button>
            </div>
          </div>
        )}

        {step === 'sending' && (
          <div className="text-center animate-pulse">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
            <p className="text-zinc-500 text-xs font-black tracking-[.3em]">AI SHIELD PROCESSING...</p>
          </div>
        )}

        {step === 'shielded' && (
          <div className="text-center py-10 animate-in zoom-in duration-500">
            <div className="w-16 h-16 bg-zinc-800 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-zinc-700 rotate-3">
              <span className="text-3xl">🛡️</span>
            </div>
            <h2 className="text-2xl font-black mb-4 tracking-tighter">MESSAGE SECURED</h2>
            <p className="text-zinc-400 text-xs leading-relaxed mb-8 lowercase tracking-wide px-4">
              Feedback intercepted. Our owner has been alerted privately to resolve this with you immediately.
            </p>
            <button onClick={() => {setStep('input'); setFeedback('');}} className="text-[10px] font-bold text-zinc-600 hover:text-blue-400 transition-colors tracking-widest">RESET ENGINE</button>
          </div>
        )}

        {step === 'positive' && (
          <div className="text-center py-10 animate-in zoom-in duration-500">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-900/40 -rotate-3">
              <span className="text-3xl">🚀</span>
            </div>
            <h2 className="text-2xl font-black mb-4 italic tracking-tighter">PERFECT SCORE</h2>
            <p className="text-zinc-400 text-xs leading-relaxed mb-8 lowercase tracking-wide px-4">
              Your technician will be thrilled! mind supporting us with a 5-star boost on google?
            </p>
            <button 
              className="w-full bg-blue-600 text-white font-black py-6 rounded-3xl shadow-xl transition-all hover:bg-blue-500 uppercase tracking-widest text-sm"
              onClick={() => window.open('https://google.com', '_blank')}
            >
              BOOST ON GOOGLE
            </button>
          </div>
        )}

      </div>
    </main>
  )
}