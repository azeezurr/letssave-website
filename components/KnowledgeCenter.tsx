'use client';

import React from 'react';
import Link from 'next/link';
import { BookOpen, FileCode, Shield, Terminal, ArrowRight } from 'lucide-react';

export default function KnowledgeCenter() {
  const resources = [
    {
      title: 'Enterprise Architecture & Data Model',
      category: 'Technical Whitepaper',
      desc: 'Deep-dive into AWS DynamoDB single-table schema, S3 KMS encryption, and distributed async RabbitMQ workers.',
      icon: Terminal,
      time: '12 min read',
      href: '/resources/architecture-data-model'
    },
    {
      title: 'SOC2 Type II & HIPAA Compliance Blueprint',
      category: 'Regulatory Guide',
      desc: 'Step-by-step guidance on automated policy attestations, continuous audit logs, and employee offboarding SCIM de-provisioning.',
      icon: Shield,
      time: '8 min read',
      href: '/resources/soc2-hipaa-blueprint'
    },
    {
      title: 'Visual BPM & Workflow Design Handbook',
      category: 'Practitioner Guide',
      desc: 'How to build multi-level conditional approval chains, SLA timers, and AI-driven document extraction pipelines.',
      icon: BookOpen,
      time: '15 min read',
      href: '/resources/bpm-handbook'
    },
    {
      title: 'REST API Reference & OpenAPI Specs',
      category: 'Developer Hub',
      desc: 'Comprehensive API documentation for document ingestion, case creation, webhook dispatches, and CMIS integrations.',
      icon: FileCode,
      time: 'Interactive Docs',
      href: '/resources/api-reference'
    }
  ];

  return (
    <section id="knowledge" className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold uppercase tracking-wider font-heading">
              Learning Centre & Documentation
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight font-heading">
              Enterprise Knowledge Base & Guides
            </h2>
            <p className="text-base sm:text-lg text-slate-600 font-normal">
              Statutory compliance guides, system blueprints, and developer references created by our architecture team.
            </p>
          </div>
          <Link
            href="/resources"
            className="inline-flex items-center gap-2 text-sm font-bold text-teal-700 hover:text-teal-900 transition-colors shrink-0 font-heading"
          >
            <span>Open the resource library</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {resources.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Link
                key={idx}
                href={item.href}
                className="p-6 rounded-2xl bg-white border border-slate-200/90 hover:border-teal-400 hover:shadow-lg transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-teal-700 mb-4 shadow-2xs group-hover:bg-teal-700 group-hover:text-white transition-all">
                    <Icon size={19} />
                  </div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-1">
                    {item.category}
                  </span>
                  <h4 className="text-base font-bold text-slate-900 group-hover:text-teal-800 transition-colors mb-2 leading-snug font-heading">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                  <span>{item.time}</span>
                  <span className="font-bold text-teal-700 group-hover:underline flex items-center gap-1 font-heading">
                    Read &rarr;
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
