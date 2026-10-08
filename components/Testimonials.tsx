'use client';

import React from 'react';
import { Quote, Star, CheckCircle2 } from 'lucide-react';

export default function Testimonials() {
  const reviews = [
    {
      quote:
        'Managing 40,000+ patient records and regulatory consent forms under HIPAA used to give our legal team nightmares. LetsSave gave us instant version rollbacks, audit logs, and an AI assistant that answers clinical policy questions in seconds.',
      author: 'Dr. Evelyn Vance',
      role: 'Chief Compliance Officer',
      org: 'Meridian Health Network',
      badge: 'Healthcare Vertical'
    },
    {
      quote:
        'The watermarked secure viewer completely eliminated our fear of IP leakage during contractor vendor audits. Seeing their email, IP, and timestamp permanently stamped over CAD drawings and contracts ensures zero leaks.',
      author: 'Marcus Chen',
      role: 'VP of Engineering & Security',
      org: 'AeroTech Systems Inc.',
      badge: 'Defense & Manufacturing'
    },
    {
      quote:
        'The visual BPM workflow designer and case management module replaced three separate SaaS subscriptions for us. Our invoice approvals and vendor onboarding now happen in hours instead of 7 days.',
      author: 'Priya Narayanan',
      role: 'Head of Finance & Operations',
      org: 'FinScale Enterprise',
      badge: 'FinTech & Banking'
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50/50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold uppercase tracking-wider font-heading">
            Customer Success
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight font-heading">
            Trusted by Enterprise Leaders
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-normal">
            See how organizations rely on LetsSave to streamline operations, enforce compliance, and protect critical assets.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <div
              key={i}
              className="bg-white rounded-3xl p-7 border border-slate-200/90 shadow-sm hover:border-teal-300 hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-amber-400 gap-1">
                    {[...Array(5)].map((_, starIdx) => (
                      <Star key={starIdx} size={15} fill="currentColor" />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-100 font-heading">
                    {r.badge}
                  </span>
                </div>

                <Quote size={28} className="text-teal-200 mb-3" />
                <p className="text-sm text-slate-700 leading-relaxed font-normal mb-6">
                  "{r.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-teal-700 text-white font-bold flex items-center justify-center text-xs shrink-0 shadow-xs font-heading">
                  {r.author.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900 leading-snug font-heading">{r.author}</h4>
                  <p className="text-xs text-slate-500">{r.role} • <span className="font-semibold text-slate-700">{r.org}</span></p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
