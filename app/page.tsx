'use client';

import React, { useState } from 'react';
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  Brain,
  Globe,
  Mail,
  PlayCircle,
  Sparkles,
  Lock,
  FileText,
  Workflow,
  Activity,
  Bot,
  Layers,
  Clock,
  CheckCircle2,
  X,
  PhoneCall,
  Search,
  ExternalLink,
  BookOpen,
  Archive,
  Leaf
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Navbar from '@/components/Navbar';
import SolutionCatalog from '@/components/SolutionCatalog';
import HowItWorks from '@/components/HowItWorks';
import InteractivePrototype, { PrototypeTab } from '@/components/InteractivePrototype';
import DeploymentSolutions from '@/components/DeploymentSolutions';
import PaperlessArchivingSection from '@/components/PaperlessArchivingSection';
import Testimonials from '@/components/Testimonials';
import KnowledgeCenter from '@/components/KnowledgeCenter';

export default function LandingPage() {
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
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
    <div className="min-h-screen bg-white text-slate-900 overflow-x-hidden selection:bg-teal-100 selection:text-teal-900 font-sans">
      {/* Sticky Vyaptax-Style Header with Prominent Logo */}
      <Navbar
        onOpenDemoModal={() => setShowDemoModal(true)}
        onSelectPrototypeTab={handleSelectPrototypeTab}
      />

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
          </div>

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
              onClick={() => setShowDemoModal(true)}
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

      {/* Vyaptax-Style Multi-Column Footer with Prominent Brand Logo */}
      <footer className="py-16 bg-slate-950 text-slate-400 text-xs border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 pb-12 border-b border-slate-800">
            {/* Column 1: Brand & Identity */}
            <div className="col-span-2 md:col-span-3 lg:col-span-1 space-y-4">
              <div className="flex items-center gap-3">
                <img src="/letssave-logo.jpg" alt="LetsSave Logo" className="h-12 w-auto rounded-xl border border-slate-700" />
                <div>
                  <span className="font-bold text-base text-white block leading-tight font-heading">LetsSave</span>
                  <span className="text-[10px] text-teal-400 uppercase tracking-widest font-semibold">Enterprise Platform</span>
                </div>
              </div>
              <p className="text-slate-400 leading-relaxed text-xs">
                Next-generation enterprise document management, long-term regulatory archiving, paperless office transformation, and sovereign AI intelligence.
              </p>
              <div className="space-y-1 text-slate-400 pt-1">
                <p>Corporate: <a href="mailto:sales@letssave.in" className="text-teal-400 hover:underline">sales@letssave.in</a></p>
                <p>Support: <a href="mailto:support@letssave.in" className="text-teal-400 hover:underline">support@letssave.in</a></p>
              </div>
            </div>

            {/* Column 2: Solutions */}
            <div>
              <h3 className="font-bold text-white text-xs uppercase tracking-wider mb-3 font-heading">Capabilities</h3>
              <ul className="space-y-2">
                <li><button onClick={() => handleSelectPrototypeTab('documents')} className="hover:text-white">Document Vault & Locks</button></li>
                <li><button onClick={() => scrollToSection('archiving-paperless')} className="hover:text-white">WORM Archiving</button></li>
                <li><button onClick={() => scrollToSection('archiving-paperless')} className="hover:text-white">Paperless Scanning</button></li>
                <li><button onClick={() => handleSelectPrototypeTab('cases')} className="hover:text-white">Case Management & SLA</button></li>
                <li><button onClick={() => handleSelectPrototypeTab('workflows')} className="hover:text-white">Visual BPM Designer</button></li>
                <li><button onClick={() => handleSelectPrototypeTab('secure-viewer')} className="hover:text-white">Watermarked Secure Viewer</button></li>
              </ul>
            </div>

            {/* Column 3: Deployment Options */}
            <div>
              <h3 className="font-bold text-white text-xs uppercase tracking-wider mb-3 font-heading">Deployment Freedom</h3>
              <ul className="space-y-2">
                <li><button onClick={() => scrollToSection('deployment-options')} className="hover:text-white">Private Cloud (AWS/Azure/GCP)</button></li>
                <li><button onClick={() => scrollToSection('deployment-options')} className="hover:text-white">On-Premises Data Center</button></li>
                <li><button onClick={() => scrollToSection('deployment-options')} className="hover:text-white">Air-Gapped Sovereign Edition</button></li>
                <li><button onClick={() => scrollToSection('deployment-options')} className="hover:text-white">Hybrid Cloud Fabric</button></li>
                <li><button onClick={() => scrollToSection('deployment-options')} className="hover:text-white">Containerized Kubernetes</button></li>
                <li><button onClick={() => scrollToSection('deployment-options')} className="hover:text-white">Managed Sovereign SaaS</button></li>
              </ul>
            </div>

            {/* Column 4: Compliance & Governance */}
            <div>
              <h3 className="font-bold text-white text-xs uppercase tracking-wider mb-3 font-heading">Compliance Standards</h3>
              <ul className="space-y-2">
                <li><span className="text-slate-300">SEC Rule 17a-4 & FINRA</span></li>
                <li><span className="text-slate-300">SOC2 Type II Assured</span></li>
                <li><span className="text-slate-300">HIPAA Security Safeguards</span></li>
                <li><span className="text-slate-300">ISO 27001 Certified</span></li>
                <li><span className="text-slate-300">GDPR Data Residency</span></li>
                <li><span className="text-slate-300">SCIM v2 Directory Sync</span></li>
              </ul>
            </div>

            {/* Column 5: Knowledge & Contact */}
            <div>
              <h3 className="font-bold text-white text-xs uppercase tracking-wider mb-3 font-heading">Knowledge Hub</h3>
              <ul className="space-y-2">
                <li><button onClick={() => scrollToSection('knowledge')} className="hover:text-white">Deployment Whitepaper</button></li>
                <li><button onClick={() => scrollToSection('knowledge')} className="hover:text-white">Retention Schedule Guide</button></li>
                <li><button onClick={() => scrollToSection('knowledge')} className="hover:text-white">BPM Implementation Guide</button></li>
                <li><button onClick={() => scrollToSection('knowledge')} className="hover:text-white">REST API Documentation</button></li>
                <li><button onClick={() => setShowDemoModal(true)} className="hover:text-white font-bold text-teal-400">Book Technical Consultation</button></li>
                <li><a href="mailto:support@letssave.in" className="hover:text-white">Contact Help Desk</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500">
            <p>© 2026 LetsSave Enterprise DMS. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <span>Privacy Policy</span>
              <span>•</span>
              <span>Terms of Service</span>
              <span>•</span>
              <span>Security Assurance</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Demo Booking Modal */}
      {showDemoModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 sm:p-10 max-w-xl w-full relative shadow-2xl border border-slate-100 my-8 text-slate-900">
            <button
              onClick={() => setShowDemoModal(false)}
              className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
            >
              <X size={22} />
            </button>
            <div className="mb-6">
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading">Schedule Enterprise Consultation</h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Explore the platform live with a senior solutions architect. We will tailor the session to your exact deployment, archiving, and paperless transformation goals.
              </p>
            </div>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setIsSubmitting(true);
                setSubmitStatus('idle');

                const formData = new FormData(e.currentTarget);
                formData.append('access_key', '4fd41cd7-dc25-4fef-9c82-bd8fbd6f63c4');
                formData.append('subject', `Enterprise Demo Request from ${formData.get('name')}`);
                formData.append('from_name', 'LetsSave Website');

                try {
                  const res = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    body: formData
                  });
                  const data = await res.json();
                  if (data.success) {
                    setSubmitStatus('success');
                    setTimeout(() => {
                      setShowDemoModal(false);
                      setSubmitStatus('idle');
                    }, 3000);
                  } else {
                    setSubmitStatus('error');
                  }
                } catch (error) {
                  setSubmitStatus('error');
                } finally {
                  setIsSubmitting(false);
                }
              }}
              className="space-y-4 text-xs sm:text-sm"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 text-xs mb-1">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Jane Smith"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-teal-700 focus:ring-2 focus:ring-teal-100 outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 text-xs mb-1">Corporate Email *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="jane@enterprise.com"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-teal-700 focus:ring-2 focus:ring-teal-100 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 text-xs mb-1">Company / Organization *</label>
                  <input
                    type="text"
                    name="company"
                    required
                    placeholder="Enterprise Corp"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-teal-700 focus:ring-2 focus:ring-teal-100 outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 text-xs mb-1">Deployment Preference</label>
                  <select
                    name="deployment"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-teal-700 focus:ring-2 focus:ring-teal-100 outline-none bg-white"
                  >
                    <option value="cloud">Private Cloud (AWS / Azure / GCP)</option>
                    <option value="on-prem">On-Premises Data Center</option>
                    <option value="air-gapped">Air-Gapped Sovereign (Defense / Banking)</option>
                    <option value="hybrid">Hybrid Multi-Cloud</option>
                    <option value="saas">Managed Sovereign SaaS</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 text-xs mb-1">Primary Area of Interest</label>
                <select
                  name="interest"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-teal-700 focus:ring-2 focus:ring-teal-100 outline-none bg-white"
                >
                  <option value="all">Complete Enterprise DMS & Archiving Evaluation</option>
                  <option value="archiving">Compliant Archiving & WORM Preservation</option>
                  <option value="paperless">Paperless Office Digitisation & High-Speed OCR</option>
                  <option value="cases-bpm">Case Management & Visual BPM Workflows</option>
                  <option value="security">Watermarked Secure Viewer & DRM Protection</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 text-xs mb-1">Project Details / Requirements</label>
                <textarea
                  name="message"
                  rows={3}
                  placeholder="Estimated document volumes, statutory retention schedules, legacy scanning needs, etc."
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-teal-700 focus:ring-2 focus:ring-teal-100 outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || submitStatus === 'success'}
                className="w-full py-4 bg-teal-700 hover:bg-teal-800 text-white rounded-xl font-bold text-sm shadow-md transition-all disabled:opacity-60 font-heading"
              >
                {isSubmitting ? 'Submitting Request...' : submitStatus === 'success' ? 'Request Received! We Will Contact You.' : 'Request Enterprise Walkthrough'}
              </button>

              {submitStatus === 'error' && (
                <p className="text-red-500 text-xs text-center">
                  Could not submit automatically. Please email us directly at sales@letssave.in.
                </p>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
