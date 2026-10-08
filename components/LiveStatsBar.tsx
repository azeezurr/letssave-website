'use client';

import React from 'react';
import { Database, ShieldCheck, Zap, Globe, Clock, Cpu } from 'lucide-react';

export default function LiveStatsBar() {
  const stats = [
    {
      label: 'Documents Processed',
      val: '10M+',
      sub: 'Indexed & Vectorized',
      icon: Database
    },
    {
      label: 'AI Search Latency',
      val: '< 250ms',
      sub: 'Elasticsearch + Bedrock',
      icon: Zap
    },
    {
      label: 'Compliance Assurance',
      val: '100%',
      sub: 'SOC2 / HIPAA / ISO27001',
      icon: ShieldCheck
    },
    {
      label: 'Global Locales',
      val: '12 Languages',
      sub: 'Arabic RTL & Asian Scripts',
      icon: Globe
    },
    {
      label: 'Platform Uptime SLA',
      val: '99.99%',
      sub: 'AWS Multi-AZ Redundant',
      icon: Clock
    }
  ];

  return (
    <div className="border-y border-slate-200/80 bg-white/70 backdrop-blur-md py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="flex items-center gap-3.5 group">
              <div className="w-11 h-11 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0 group-hover:scale-105 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-xs">
                <Icon size={20} />
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-none">
                  {stat.val}
                </p>
                <p className="text-xs font-bold text-slate-700 mt-1">{stat.label}</p>
                <p className="text-[11px] text-slate-400 font-medium truncate">{stat.sub}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
