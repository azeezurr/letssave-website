'use client';

import React from 'react';
import {
  UploadCloud,
  Workflow,
  Bot,
  ShieldCheck,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      step: '01',
      title: 'Ingest & Classify',
      subtitle: 'Universal Ingestion Engine',
      desc: 'Drag and drop bulk files or stream via REST API. Our pipeline automatically converts 100+ file formats (PDF, Office, CAD), runs OCR, and assigns security classification marking sets.',
      icon: UploadCloud,
      bullets: ['Batch multi-part S3 upload', 'Automated OCR extraction', 'Top Secret / Confidential tagging']
    },
    {
      step: '02',
      title: 'Automate & Route',
      subtitle: 'Dynamic Cases & BPM',
      desc: 'Work items flow directly into structured case stages with automated countdown SLA clocks. Visual BPM workflows orchestrate multi-level approvals, finance thresholds, and supervisor escalations.',
      icon: Workflow,
      bullets: ['Visual drag-and-drop designer', 'Real-time SLA timers', 'Unified executive approval inbox']
    },
    {
      step: '03',
      title: 'Analyze & Collaborate',
      subtitle: 'Sovereign AI & RAG Chat',
      desc: 'Query thousands of documents in natural language. Our private RAG assistant synthesizes verified answers with page-level citations. Collaborate securely with check-in/out locks and version trees.',
      icon: Bot,
      bullets: ['Sub-250ms vector search', 'Verifiable page citations', 'Side-by-side version diffing']
    },
    {
      step: '04',
      title: 'Govern & Protect',
      subtitle: 'Anti-Leak DRM & Compliance',
      desc: 'Enforce mandatory employee policy attestations with audit certificates. View restricted files in our zero-download secure viewer with dynamic forensic user watermarking.',
      icon: ShieldCheck,
      bullets: ['Dynamic user email/IP watermark', 'Policy attestation meters', 'SOC2 / HIPAA / ISO27001 readiness']
    }
  ];

  return (
    <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold uppercase tracking-wider font-heading">
            Simple 4-Step Process
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight font-heading">
            How LetsSave Transforms Your Workspace
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-normal">
            A seamless transition from chaotic, fragmented folders into an intelligent, compliant, and auditable enterprise operating system.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-7 border border-slate-200/90 hover:border-teal-400 hover:shadow-xl transition-all relative flex flex-col justify-between group"
              >
                <div>
                  {/* Step Number & Icon */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-3xl font-black text-slate-300 group-hover:text-teal-700 transition-colors font-mono">
                      {s.step}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-700 group-hover:bg-teal-700 group-hover:text-white transition-all shadow-xs">
                      <Icon size={22} />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-1 font-heading">{s.title}</h3>
                  <span className="text-xs font-semibold text-teal-700 uppercase tracking-wider block mb-3">
                    {s.subtitle}
                  </span>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6 font-normal">
                    {s.desc}
                  </p>
                </div>

                <div className="space-y-2 pt-4 border-t border-slate-100">
                  {s.bullets.map((b, bIdx) => (
                    <div key={bIdx} className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                      <CheckCircle2 size={13} className="text-teal-600 shrink-0" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
