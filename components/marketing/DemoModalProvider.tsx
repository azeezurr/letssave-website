'use client';

import React, { createContext, useContext, useMemo, useState } from 'react';
import { X } from 'lucide-react';

const ACCESS_KEY = '4fd41cd7-dc25-4fef-9c82-bd8fbd6f63c4';

interface DemoModalContextValue {
  openDemo: (interest?: string) => void;
}

const DemoModalContext = createContext<DemoModalContextValue>({ openDemo: () => undefined });

export function useDemoModal() {
  return useContext(DemoModalContext);
}

export async function submitConsultation(formData: FormData) {
  formData.append('access_key', ACCESS_KEY);
  formData.append('subject', `Enterprise consultation from ${formData.get('name') || 'website'}`);
  formData.append('from_name', 'LetsSave Website');
  const response = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: formData });
  const data = await response.json();
  if (!data.success) throw new Error('Submission was rejected');
}

export function DemoModalProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [interest, setInterest] = useState('all');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const value = useMemo<DemoModalContextValue>(
    () => ({
      openDemo: (nextInterest?: string) => {
        setInterest(nextInterest || 'all');
        setStatus('idle');
        setOpen(true);
      },
    }),
    []
  );

  return (
    <DemoModalContext.Provider value={value}>
      {children}
      {open && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm" role="presentation">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="consultation-title"
            className="relative my-8 w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-6 text-slate-900 shadow-2xl sm:p-10"
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute right-5 top-5 rounded-xl p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-800"
              aria-label="Close consultation form"
            >
              <X size={20} />
            </button>
            <h2 id="consultation-title" className="font-heading text-2xl font-black text-slate-900 sm:text-3xl">
              Schedule an enterprise consultation
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              A solutions architect will tailor the session to your archive, deployment, and paperless goals.
            </p>
            <form
              className="mt-6 space-y-4 text-sm"
              onSubmit={async (event) => {
                event.preventDefault();
                setIsSubmitting(true);
                setStatus('idle');
                try {
                  await submitConsultation(new FormData(event.currentTarget));
                  setStatus('success');
                } catch {
                  setStatus('error');
                } finally {
                  setIsSubmitting(false);
                }
              }}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-xs font-bold text-slate-700">
                  Full name
                  <input name="name" required placeholder="Aisha Rahman" className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-teal-700 focus:ring-2 focus:ring-teal-100" />
                </label>
                <label className="block text-xs font-bold text-slate-700">
                  Work email
                  <input type="email" name="email" required placeholder="aisha@company.com" className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-teal-700 focus:ring-2 focus:ring-teal-100" />
                </label>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-xs font-bold text-slate-700">
                  Organisation
                  <input name="company" required placeholder="Northwind Records" className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-teal-700 focus:ring-2 focus:ring-teal-100" />
                </label>
                <label className="block text-xs font-bold text-slate-700">
                  Deployment
                  <select name="deployment" className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-teal-700 focus:ring-2 focus:ring-teal-100">
                    <option value="cloud">Private cloud</option>
                    <option value="on-prem">On-premises</option>
                    <option value="air-gapped">Air-gapped</option>
                    <option value="hybrid">Hybrid</option>
                    <option value="saas">Managed service</option>
                  </select>
                </label>
              </div>
              <label className="block text-xs font-bold text-slate-700">
                Primary interest
                <select name="interest" defaultValue={interest} key={interest} className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-teal-700 focus:ring-2 focus:ring-teal-100">
                  <option value="all">Complete evaluation</option>
                  <option value="archiving">Archiving and WORM</option>
                  <option value="paperless">Paperless capture</option>
                  <option value="cases-bpm">Cases and BPM</option>
                  <option value="security">Secure viewer and identity</option>
                </select>
              </label>
              <label className="block text-xs font-bold text-slate-700">
                What should we prepare?
                <textarea name="message" rows={3} placeholder="Volumes, retention rules, and systems we should connect." className="mt-1 w-full resize-none rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-teal-700 focus:ring-2 focus:ring-teal-100" />
              </label>
              <button type="submit" disabled={isSubmitting || status === 'success'} className="w-full rounded-xl bg-teal-700 py-3.5 font-heading text-sm font-bold text-white hover:bg-teal-800 disabled:opacity-60">
                {isSubmitting ? 'Sending…' : status === 'success' ? 'Request received. We will write back.' : 'Request a walkthrough'}
              </button>
              {status === 'error' && (
                <p className="text-center text-xs text-rose-700" role="alert">
                  The form could not be sent. Email sales@letssave.in and we will pick it up directly.
                </p>
              )}
            </form>
          </div>
        </div>
      )}
    </DemoModalContext.Provider>
  );
}
