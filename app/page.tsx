'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Archive, Mail, PlayCircle } from 'lucide-react';
import SolutionCatalog from '@/components/SolutionCatalog';
import HowItWorks from '@/components/HowItWorks';
import InteractivePrototype, { PrototypeTab } from '@/components/InteractivePrototype';
import DeploymentSolutions from '@/components/DeploymentSolutions';
import PaperlessArchivingSection from '@/components/PaperlessArchivingSection';
import Testimonials from '@/components/Testimonials';
import KnowledgeCenter from '@/components/KnowledgeCenter';
import MarketingShell from '@/components/marketing/MarketingShell';
import { useDemoModal } from '@/components/marketing/DemoModalProvider';

export default function LandingPage() {
  const { openDemo } = useDemoModal();
  const [prototypeTab, setPrototypeTab] = useState<PrototypeTab>('documents');

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -90;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleSelectPrototypeTab = (tabId: PrototypeTab) => {
    setPrototypeTab(tabId);
    scrollToSection('prototype-section');
  };

  return (
    <MarketingShell>
    <div className="min-h-screen bg-white text-slate-900 overflow-x-hidden selection:bg-teal-100 selection:text-teal-900 font-sans">
      {/* Hero Section with Vyaptax-Style Radial Background */}
      <section className="relative pt-32 sm:pt-40 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden vyap-radial-bg bg-gradient-to-b from-teal-50/30 via-white to-slate-50/40">
        <div className="max-w-6xl mx-auto text-center space-y-7">
          {/* Executive Tagline Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs sm:text-sm font-bold shadow-2xs font-heading">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-600"></span>
            </span>
            <span>Enterprise DMS, Long-Term Archiving & Paperless Transformation</span>
          </div>

          {/* Master Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-slate-900 tracking-tight leading-[1.08] font-heading">
            Complete Document Lifecycle,<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-800 via-teal-700 to-teal-900">
              Compliant Archiving & Sovereign AI
            </span>
          </h1>

          {/* Subheading */}
          <p className="max-w-3xl mx-auto text-base sm:text-xl text-slate-600 font-normal leading-relaxed">
            Eliminate physical paper silos, automate case approvals with visual BPM, enforce SEC 17a-4 compliant long-term archiving, and protect intellectual property with dynamic watermarked viewing.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
            <button
              onClick={() => scrollToSection('prototype-section')}
              className="w-full sm:w-auto px-8 py-4 bg-teal-700 hover:bg-teal-800 text-white rounded-xl font-bold text-sm sm:text-base shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2.5 font-heading"
            >
              <PlayCircle size={20} className="text-teal-200" />
              <span>Launch Live Prototype</span>
            </button>

            <button
              onClick={() => scrollToSection('archiving-paperless')}
              className="w-full sm:w-auto px-7 py-4 bg-white text-slate-800 border border-slate-200 hover:bg-slate-50 rounded-xl font-bold text-sm sm:text-base transition-all flex items-center justify-center gap-2 shadow-2xs font-heading"
            >
              <Archive size={18} className="text-teal-700" />
              <span>Explore Archiving & Paperless</span>
            </button>
            <Link
              href="/dashboard"
              className="w-full sm:w-auto px-7 py-4 bg-slate-900 text-white hover:bg-slate-800 rounded-xl font-bold text-sm sm:text-base transition-all flex items-center justify-center gap-2 font-heading"
            >
              Open the product workspace
            </Link>
          </div>
          <p className="text-sm text-slate-500">
            <Link href="/solutions" className="font-bold text-teal-800 hover:underline">Browse every capability</Link>
            <span aria-hidden="true"> · </span>
            <Link href="/pricing" className="font-bold text-teal-800 hover:underline">Compare evaluations</Link>
          </p>

          {/* Vyaptax-Style Trust Counters Bar */}
          <div className="pt-8 max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
              {[
                { label: 'Documents Managed', val: '10M+', sub: 'Indexed & Archived' },
                { label: 'SLA Compliance Rate', val: '99.4%', sub: 'Zero Missed Deadlines' },
                { label: 'Statutory Compliance', val: '100%', sub: 'SOC2, HIPAA & SEC 17a-4' },
                { label: 'Deployment Options', val: 'Flexible', sub: 'Cloud, On-Prem & Air-Gapped' }
              ].map((stat, sIdx) => (
                <div key={sIdx} className="text-center py-2 px-1 border-r last:border-r-0 border-slate-100">
                  <p className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-mono font-heading">{stat.val}</p>
                  <p className="text-xs font-bold text-slate-700 mt-0.5">{stat.label}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">{stat.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1: Dedicated Archiving & Paperless Transformation */}
      <PaperlessArchivingSection />

      {/* SECTION 2: How It Works (4-Step Customer Process) */}
      <HowItWorks />

      {/* SECTION 3: Solution Catalog (Searchable & Categorized 16+ Features) */}
      <SolutionCatalog onOpenPrototypeTab={handleSelectPrototypeTab} />

      {/* SECTION 4: Interactive Live Prototype (The User-Requested Centerpiece) */}
      <InteractivePrototype initialTab={prototypeTab} />

      {/* SECTION 5: Wide Options of Deployment Available (Cloud, On-Prem, Sovereign Air-Gapped) */}
      <DeploymentSolutions />

      {/* SECTION 6: Customer Testimonials & Social Proof */}
      <Testimonials />

      {/* SECTION 7: Learning Centre & Statutory Guides */}
      <KnowledgeCenter />

      {/* SECTION 8: Call to Action (CTA) */}
      <section id="cta" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900 text-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-500/10 border border-teal-400/30 text-teal-300 text-xs font-bold uppercase tracking-wider font-heading">
            Enterprise Engagement
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight font-heading">
            Accelerate Your Paperless & Archiving Transformation
          </h2>
          <p className="text-sm sm:text-lg text-slate-300 max-w-2xl mx-auto font-normal">
            Schedule a dedicated technical walkthrough with our infrastructure architects. We will customize the evaluation to your exact deployment, archiving, and paperless transformation goals.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={() => openDemo()}
              className="w-full sm:w-auto px-8 py-4 bg-teal-700 hover:bg-teal-800 text-white rounded-xl font-bold text-sm sm:text-base shadow-lg transition-all font-heading"
            >
              Schedule Enterprise Consultation
            </button>
            <a
              href="mailto:sales@letssave.in"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-4 rounded-xl border border-slate-700 hover:bg-slate-800 text-white font-bold text-sm transition-all font-heading"
            >
              <Mail size={16} />
              <span>sales@letssave.in</span>
            </a>
          </div>
        </div>
      </section>
    </div>
    </MarketingShell>
  );
}
