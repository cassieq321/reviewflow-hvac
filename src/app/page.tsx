'use client'

import { sendShieldAlert } from './actions';
import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function ReviewContent() {
  const searchParams = useSearchParams();
  
  const rawBizName = searchParams.get('biz') || 'REVIEWFLOW';
  const companyName = rawBizName.replace(/-/g, ' ');

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [feedback, setFeedback] = useState('');
  const [step, setStep] = useState('input');

  const handleSubmit = async () => {
    if (!name || !phone) {
      alert("Please enter your name and phone so we can follow up!");
      return;
    }
    setStep('sending');
    
    // Logic check for negative sentiment
    const negativeWords = ['bad', 'rude', 'late', 'expensive', 'terrible', 'worst', 'scam', 'poor', 'dirty'];
    const isNegative = negativeWords.some(word => feedback.toLowerCase().includes(word)) || feedback.length < 10;

    // Simulate AI processing time
    setTimeout(async () => {
      if (isNegative) {
        setStep('shielded');
        // FIRE THE EMAIL ALERT
        await sendShieldAlert(name, phone, feedback, companyName);
      } else {
        setStep('positive');
      }
    }, 1500);
  };

  return (
    <div className="max-w-md w-full bg-zinc-900 border border-zinc-800 p-8 rounded-[2.5rem] shadow-2xl transition-all duration-500 min-h-[550px] flex flex-col justify-center">
      
      {step === 'input' && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-black italic tracking-tighter uppercase">
              {companyName}<span className="text-blue-500 font-black">.</span>
            </h1>
            <p className="text-zinc-500 text-[9px] mt-2 font-bold tracking-[0.2em]">REPUTATION SHIELD ACTIVE</p>
          </div>

          <div className="space-y-4">
            <input 
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl p-4 text-white placeholder-zinc-700 focus:outline-none focus:border-blue-500 transition-all lowercase italic"
            />
            <input 
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl p-4 text-white placeholder-zinc-700 focus:outline-none focus:border-blue-500 transition-all lowercase italic"
            />
            <textarea 
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl p-4 text-white placeholder-zinc-700 focus:outline-none focus:border-blue-500 transition-all lowercase italic"
              placeholder="How was the service today?"
              rows={3}
            />
            <button 
              onClick={handleSubmit}
              className="w-full bg-blue-600 text-white hover:bg-blue-500 font-black py-6 rounded-3xl shadow-xl transition-all active:scale-[0.95] text-sm tracking-widest mt-4"
            >
              SUBMIT FEEDBACK
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
          <h2 className="text-2xl font-black mb-4 tracking-tighter text-blue-500">MESSAGE SECURED</h2>
          <p className="text-zinc-400 text-xs leading-relaxed mb-8 lowercase tracking-wide px-4">
            Thank you, {name.split(' ')[0]}. {companyName} management has been notified and will call you at {phone} to make this right immediately.
          </p>
          <button onClick={() => {setStep('input'); setFeedback(''); setName(''); setPhone('');}} className="text-[10px] font-bold text-zinc-600 hover:text-blue-400 transition-colors tracking-widest underline decoration-dotted">Back to Home</button>
        </div>
      )}

      {step === 'positive' && (
        <div className="text-center py-10 animate-in zoom-in duration-500">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-900/40 -rotate-3">
            <span className="text-3xl">🚀</span>
          </div>
          <h2 className="text-2xl font-black mb-4 italic tracking-tighter text-blue-500">YOU'RE ALL SET!</h2>
          <p className="text-zinc-400 text-xs leading-relaxed mb-8 lowercase tracking-wide px-4">
            Thanks {name.split(' ')[0]}! Since you had a great experience, could you help {companyName} by posting this to Google?
          </p>
          <button 
            className="w-full bg-white text-black font-black py-6 rounded-3xl shadow-xl transition-all hover:bg-zinc-200 uppercase tracking-widest text-sm"
            onClick={() => window.open('https://google.com', '_blank')}
          >
            Post to Google
          </button>
        </div>
      )}
    </div>
  );
}

export default function Page() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-zinc-950 text-white font-sans p-6 uppercase tracking-tight">
      <Suspense fallback={<div>Loading...</div>}>
        <ReviewContent />
      </Suspense>
    </main>
  );
}