'use client';

import { useState } from 'react';
import MarketingShell from '@/components/marketing/MarketingShell';
import PageIntro from '@/components/marketing/PageIntro';
import { submitConsultation } from '@/components/marketing/DemoModalProvider';

export default function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  return (
    <MarketingShell>
      <main className="px-4 pb-20 pt-32 sm:px-6 lg:px-8">
        <PageIntro
          eyebrow="Contact"
          title="Tell us what the archive has to survive"
          lede="Volume, residency, and the system that creates the records are enough to start. A person replies from sales@letssave.in."
        />
        <form
          className="mx-auto mt-10 max-w-2xl space-y-4 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8"
          onSubmit={async (event) => {
            event.preventDefault();
            setStatus('sending');
            try {
              await submitConsultation(new FormData(event.currentTarget));
              setStatus('success');
              event.currentTarget.reset();
            } catch {
              setStatus('error');
            }
          }}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-sm font-semibold text-slate-700">
              Name
              <input name="name" required className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-3 font-normal outline-none focus:border-teal-700 focus:ring-2 focus:ring-teal-100" />
            </label>
            <label className="text-sm font-semibold text-slate-700">
              Work email
              <input type="email" name="email" required className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-3 font-normal outline-none focus:border-teal-700 focus:ring-2 focus:ring-teal-100" />
            </label>
          </div>
          <label className="block text-sm font-semibold text-slate-700">
            Organisation
            <input name="company" required className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-3 font-normal outline-none focus:border-teal-700 focus:ring-2 focus:ring-teal-100" />
          </label>
          <label className="block text-sm font-semibold text-slate-700">
            What do you need?
            <textarea name="message" required rows={5} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-3 font-normal outline-none focus:border-teal-700 focus:ring-2 focus:ring-teal-100" />
          </label>
          <button type="submit" disabled={status === 'sending' || status === 'success'} className="rounded-xl bg-teal-700 px-5 py-3 font-heading text-sm font-bold text-white hover:bg-teal-800 disabled:opacity-60">
            {status === 'sending' ? 'Sending…' : status === 'success' ? 'Sent. We will reply by email.' : 'Send to the enterprise team'}
          </button>
          {status === 'error' && <p className="text-sm text-rose-700" role="alert">Sending failed. Email sales@letssave.in instead.</p>}
          <p className="text-sm text-slate-500">Support desk: <a className="font-semibold text-teal-800" href="mailto:support@letssave.in">support@letssave.in</a></p>
        </form>
      </main>
    </MarketingShell>
  );
}
