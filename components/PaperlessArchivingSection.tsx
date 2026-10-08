'use client';

import React, { useState } from 'react';
import {
  Archive,
  FileCheck2,
  Lock,
  Search,
  Clock,
  ShieldCheck,
  Leaf,
  ScanLine,
  FileDigit,
  Trash2,
  CheckCircle2,
  TrendingDown,
  Building,
  Sparkles
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function PaperlessArchivingSection() {
  const [activeTab, setActiveTab] = useState<'archiving' | 'paperless'>('archiving');

  const archivingPillars = [
    {
      icon: Lock,
      title: 'WORM Immutable Storage',
      desc: 'Write-Once-Read-Many tamper-proof object locking ensuring records cannot be overwritten, modified, or deleted prior to expiry.'
    },
    {
      icon: Clock,
      title: 'Automated Lifecycle Schedules',
      desc: 'Configurable automated migration: active files transition gracefully to nearline and encrypted deep cold vaults with zero manual intervention.'
    },
    {
      icon: ShieldCheck,
      title: 'Statutory Retention & Legal Hold',
      desc: 'Full compliance with SEC 17a-4, FINRA, HIPAA, and GDPR. Freeze disposition instantly upon active litigation notices.'
    },
    {
      icon: Search,
      title: 'Sub-Second E-Discovery Retrieval',
      desc: 'Locate specific historic contracts, invoices, or board minutes from decades-old archival vaults in under 500 milliseconds.'
    },
    {
      icon: TrendingDown,
      title: 'Up to 80% Storage Cost Reduction',
      desc: 'Automated policy-driven data tiering moves inactive records to ultra-low-cost cold storage tiers automatically.'
    },
    {
      icon: Trash2,
      title: 'Certified Defensible Disposition',
      desc: 'Automated audit certificates upon scheduled document expiry, providing verifiable cryptographic proof of lawful deletion.'
    }
  ];

  const paperlessPillars = [
    {
      icon: ScanLine,
      title: 'High-Volume Batch Scan Ingestion',
      desc: 'Direct integration with industrial high-speed document scanners. Ingest boxes of legacy physical paperwork in hours.'
    },
    {
      icon: FileDigit,
      title: 'Multilingual Intelligent OCR & ICR',
      desc: 'Extract machine-printed and handwritten text automatically across multiple languages with 99.2% optical character accuracy.'
    },
    {
      icon: Building,
      title: 'Eliminate Physical Filing Cabinets',
      desc: 'Reclaim valuable office real estate and eliminate external warehouse storage rental, physical couriers, and loss risks.'
    },
    {
      icon: FileCheck2,
      title: 'Legally-Binding E-Signatures',
      desc: 'Built-in digital signature workflows adhering to eIDAS and IT Act standards for contracts, onboarding, and approvals.'
    },
    {
      icon: Sparkles,
      title: 'Smart Metadata Auto-Classification',
      desc: 'AI automatically tags and files scanned invoices, receipts, patient charts, and deeds into the correct departmental hierarchy.'
    },
    {
      icon: Leaf,
      title: 'Measurable ESG & Green Corporate Impact',
      desc: 'Quantify sustainability milestones: track reams of paper avoided, gallons of water conserved, and carbon footprint eliminated.'
    }
  ];

  return (
    <section id="archiving-paperless" className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold uppercase tracking-wider">
            Enterprise Modernization
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight font-heading">
            Long-Term Archiving & Paperless Transformation
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-normal">
            Transition your enterprise from legacy paper archives and vulnerable file systems into an automated, compliant, and sustainable digital repository.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center justify-center mb-12">
          <div className="bg-slate-100 p-1.5 rounded-2xl flex items-center border border-slate-200/80 max-w-md w-full">
            <button
              onClick={() => setActiveTab('archiving')}
              className={cn(
                'flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 font-heading',
                activeTab === 'archiving'
                  ? 'bg-white text-teal-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              )}
            >
              <Archive size={17} className={activeTab === 'archiving' ? 'text-teal-700' : 'text-slate-400'} />
              <span>Compliant Archiving</span>
            </button>

            <button
              onClick={() => setActiveTab('paperless')}
              className={cn(
                'flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 font-heading',
                activeTab === 'paperless'
                  ? 'bg-white text-teal-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              )}
            >
              <Leaf size={17} className={activeTab === 'paperless' ? 'text-teal-600' : 'text-slate-400'} />
              <span>Paperless Transformation</span>
            </button>
          </div>
        </div>

        {/* Content Panel: Archiving */}
        {activeTab === 'archiving' && (
          <div className="space-y-10 animate-in fade-in">
            {/* Overview Banner */}
            <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900 text-white flex flex-col lg:flex-row lg:items-center justify-between gap-8 shadow-xl border border-teal-900/50">
              <div className="max-w-2xl space-y-3">
                <span className="text-xs uppercase font-mono font-bold text-teal-300 tracking-wider">
                  SEC 17a-4 • FINRA • HIPAA • GDPR Ready
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white font-heading">
                  Regulatory-Grade Immutable Archival Preservation
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed font-normal">
                  Guarantee the integrity of your corporate history. With automated retention rules, WORM tamper-proofing, and cryptographic timestamping, your documents remain permanently auditable and protected against ransomware.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 shrink-0">
                <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 text-center">
                  <p className="text-2xl sm:text-3xl font-black text-teal-400 font-mono font-heading">10+ Yrs</p>
                  <span className="text-xs text-slate-300 font-medium">Retention Assurance</span>
                </div>
                <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 text-center">
                  <p className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono font-heading">80%</p>
                  <span className="text-xs text-slate-300 font-medium">Storage Savings</span>
                </div>
              </div>
            </div>

            {/* 6 Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {archivingPillars.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="p-6 sm:p-7 rounded-2xl bg-white border border-slate-200/90 hover:border-teal-400 hover:shadow-lg transition-all group flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-700 group-hover:bg-teal-700 group-hover:text-white transition-all shadow-2xs mb-4">
                        <Icon size={22} />
                      </div>
                      <h4 className="text-base font-bold text-slate-900 mb-2 group-hover:text-teal-800 transition-colors font-heading">
                        {item.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Content Panel: Paperless Initiative */}
        {activeTab === 'paperless' && (
          <div className="space-y-10 animate-in fade-in">
            {/* Overview Banner */}
            <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900 text-white flex flex-col lg:flex-row lg:items-center justify-between gap-8 shadow-xl border border-teal-900/50">
              <div className="max-w-2xl space-y-3">
                <span className="text-xs uppercase font-mono font-bold text-teal-300 tracking-wider">
                  Zero Paper • Zero Warehouse • 100% Digital
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white font-heading">
                  Turn Physical Archives into Searchable Digital Intelligence
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed font-normal">
                  End the era of lost physical documents and slow courier dispatches. Our paperless transformation digitizes historic filing rooms into searchable, secure cloud vaults with automated OCR and digital signatures.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 shrink-0">
                <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 text-center">
                  <p className="text-2xl sm:text-3xl font-black text-teal-300 font-mono font-heading">100%</p>
                  <span className="text-xs text-slate-300 font-medium">Digital Workflow</span>
                </div>
                <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 text-center">
                  <p className="text-2xl sm:text-3xl font-black text-white font-mono font-heading">&lt; 24h</p>
                  <span className="text-xs text-slate-300 font-medium">Intake Speed</span>
                </div>
              </div>
            </div>

            {/* 6 Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paperlessPillars.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="p-6 sm:p-7 rounded-2xl bg-white border border-slate-200/90 hover:border-teal-400 hover:shadow-lg transition-all group flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-700 group-hover:bg-teal-700 group-hover:text-white transition-all shadow-2xs mb-4">
                        <Icon size={22} />
                      </div>
                      <h4 className="text-base font-bold text-slate-900 mb-2 group-hover:text-teal-800 transition-colors font-heading">
                        {item.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
