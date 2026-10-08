'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, ShieldCheck, PlayCircle, Search, Layers, Archive, PhoneCall } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PrototypeTab } from './InteractivePrototype';

interface NavbarProps {
  onOpenDemoModal: () => void;
  onSelectPrototypeTab?: (tabId: PrototypeTab) => void;
}

export default function Navbar({ onOpenDemoModal, onSelectPrototypeTab }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -90;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handlePrototypeClick = (tabId?: PrototypeTab) => {
    scrollTo('prototype-section');
    if (tabId && onSelectPrototypeTab) {
      setTimeout(() => onSelectPrototypeTab(tabId), 400);
    }
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'py-3 bg-white/95 backdrop-blur-md shadow-xs border-b border-slate-200'
          : 'py-4 sm:py-5 bg-white/90 backdrop-blur-xs border-b border-slate-100'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo & Prominent Company Identity */}
        <div
          className="flex items-center gap-3.5 sm:gap-4 cursor-pointer group"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          {/* Substantially enlarged, high-visibility logo container */}
          <div className="relative flex items-center justify-center p-1 bg-white rounded-2xl shadow-xs border border-slate-200/90 group-hover:border-teal-600 transition-colors">
            <img
              src="/letssave-logo.jpg"
              alt="LetsSave Logo"
              className="h-12 sm:h-14 md:h-16 w-auto object-contain rounded-xl"
            />
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-none group-hover:text-teal-800 transition-colors font-heading">
                LetsSave
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-100 hidden sm:inline-block">
                Enterprise Platform
              </span>
            </div>
            <span className="text-[11px] sm:text-xs font-medium text-slate-500 tracking-tight mt-0.5">
              Document Management & Archiving
            </span>
          </div>
        </div>

        {/* Vyaptax-style Search Trigger Bar (Desktop) */}
        <div
          onClick={() => scrollTo('features')}
          className="hidden md:flex items-center gap-2.5 px-4 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-medium text-slate-500 cursor-pointer transition-all max-w-[280px] w-full"
        >
          <Search size={15} className="text-slate-400" />
          <span className="truncate">Search 16+ features & modules...</span>
          <kbd className="ml-auto text-[10px] font-mono bg-white px-1.5 py-0.5 rounded border border-slate-200 text-slate-400">
            /
          </kbd>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-sm font-semibold text-slate-700">
          <button
            onClick={() => scrollTo('features')}
            className="px-3.5 py-2 rounded-lg hover:text-teal-800 hover:bg-teal-50/50 transition-all"
          >
            Capabilities
          </button>

          <button
            onClick={() => scrollTo('archiving-paperless')}
            className="px-3.5 py-2 rounded-lg hover:text-teal-800 hover:bg-teal-50/50 transition-all flex items-center gap-1.5"
          >
            <Archive size={15} className="text-teal-700" />
            <span>Archiving & Paperless</span>
          </button>

          <button
            onClick={() => handlePrototypeClick()}
            className="group px-4 py-2 rounded-lg text-teal-800 bg-teal-50 hover:bg-teal-100 border border-teal-200/80 transition-all flex items-center gap-2 font-bold"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-600"></span>
            </span>
            <span>Live Prototype</span>
          </button>

          <button
            onClick={() => scrollTo('deployment-options')}
            className="px-3.5 py-2 rounded-lg hover:text-teal-800 hover:bg-teal-50/50 transition-all"
          >
            Deployment Options
          </button>

          <button
            onClick={() => scrollTo('how-it-works')}
            className="px-3.5 py-2 rounded-lg hover:text-teal-800 hover:bg-teal-50/50 transition-all"
          >
            How It Works
          </button>
        </nav>

        {/* Right CTA Actions */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href="mailto:sales@letssave.in"
            className="hidden xl:flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-teal-800 px-3 py-2 rounded-lg hover:bg-slate-50 transition-all"
          >
            <PhoneCall size={14} className="text-teal-700" />
            <span>Talk to Enterprise Team</span>
          </a>

          <button
            onClick={onOpenDemoModal}
            className="flex items-center gap-2 px-5 py-2.5 bg-teal-700 hover:bg-teal-800 text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs hover:shadow-md transition-all"
          >
            <span>Schedule Consultation</span>
            <ArrowRight size={15} />
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={() => handlePrototypeClick()}
            className="flex sm:hidden items-center gap-1 px-3 py-1.5 text-xs font-bold text-teal-800 bg-teal-50 rounded-lg border border-teal-200"
          >
            <PlayCircle size={14} />
            <span>Demo</span>
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 text-slate-700 hover:text-teal-800 hover:bg-slate-100 rounded-xl transition-colors"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[76px] bg-white/98 backdrop-blur-xl border-b border-slate-200 shadow-2xl px-6 py-6 transition-all animate-in slide-in-from-top-4 max-h-[calc(100vh-80px)] overflow-y-auto">
          <div className="space-y-4">
            {/* Quick Demo Card */}
            <div
              onClick={() => handlePrototypeClick()}
              className="p-4 rounded-2xl bg-gradient-to-br from-teal-800 to-slate-900 text-white shadow-md cursor-pointer"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] uppercase tracking-widest font-black text-teal-200">Interactive Simulator</span>
                <span className="px-2 py-0.5 text-[10px] font-bold bg-white/20 text-white rounded-full">Test Drive</span>
              </div>
              <h4 className="text-base font-bold text-white mb-1 font-heading">Launch Live DMS Prototype</h4>
              <p className="text-xs text-teal-100 mb-3">
                Experience Document Vault, Cases, BPM Flows, Archiving & AI Copilot right on mobile.
              </p>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold bg-white text-teal-800 px-3 py-1.5 rounded-lg">
                <span>Start Prototype</span>
                <ArrowRight size={13} />
              </div>
            </div>

            {/* Menu Links */}
            <div className="space-y-1 pt-1">
              <button
                onClick={() => scrollTo('features')}
                className="w-full text-left px-3.5 py-3 rounded-xl text-sm font-bold text-slate-800 hover:bg-slate-50 flex items-center justify-between"
              >
                <span>Enterprise Capabilities</span>
                <Layers size={16} className="text-slate-400" />
              </button>

              <button
                onClick={() => scrollTo('archiving-paperless')}
                className="w-full text-left px-3.5 py-3 rounded-xl text-sm font-bold text-teal-800 bg-teal-50/70 flex items-center justify-between"
              >
                <span>Archiving & Paperless Transformation</span>
                <Archive size={16} className="text-teal-700" />
              </button>

              <button
                onClick={() => scrollTo('prototype-section')}
                className="w-full text-left px-3.5 py-3 rounded-xl text-sm font-bold text-slate-800 hover:bg-slate-50 flex items-center justify-between"
              >
                <span>Interactive Live Prototype</span>
                <span className="text-[10px] font-black uppercase bg-teal-700 text-white px-2 py-0.5 rounded-full">
                  Try
                </span>
              </button>

              <button
                onClick={() => scrollTo('deployment-options')}
                className="w-full text-left px-3.5 py-3 rounded-xl text-sm font-bold text-slate-800 hover:bg-slate-50 flex items-center justify-between"
              >
                <span>Wide Deployment Options</span>
                <span className="text-xs text-slate-400">On-Prem / Cloud / Air-Gapped</span>
              </button>

              <button
                onClick={() => scrollTo('how-it-works')}
                className="w-full text-left px-3.5 py-3 rounded-xl text-sm font-bold text-slate-800 hover:bg-slate-50 flex items-center justify-between"
              >
                <span>How It Works (4 Steps)</span>
                <ShieldCheck size={16} className="text-slate-400" />
              </button>
            </div>

            {/* Mobile Actions */}
            <div className="pt-4 border-t border-slate-100 space-y-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenDemoModal();
                }}
                className="w-full py-3.5 bg-teal-700 hover:bg-teal-800 text-white text-sm font-bold rounded-xl shadow-md text-center flex items-center justify-center gap-2"
              >
                <span>Schedule Enterprise Consultation</span>
                <ArrowRight size={16} />
              </button>

              <a
                href="mailto:sales@letssave.in"
                className="block w-full py-2.5 bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl text-center"
              >
                Contact Sales (sales@letssave.in)
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
