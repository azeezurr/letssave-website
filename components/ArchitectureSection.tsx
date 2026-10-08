'use client';

import React from 'react';
import {
  Server,
  Database,
  Cloud,
  Cpu,
  ShieldCheck,
  Zap,
  Lock,
  GitMerge,
  Layers,
  Terminal,
  Container,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

export default function ArchitectureSection() {
  const stackItems = [
    {
      layer: 'Frontend Tier',
      tech: 'Next.js 16 & React 19',
      desc: 'App router, Turbopack, Tailwind CSS 4, and Framer Motion micro-animations.',
      icon: Layers
    },
    {
      layer: 'Primary Datastore',
      tech: 'AWS DynamoDB & PostgreSQL',
      desc: 'High-speed multi-tenant partitioning with auxiliary relational compliance indexing.',
      icon: Database
    },
    {
      layer: 'Encrypted Object Storage',
      tech: 'AWS S3 / MinIO Object Store',
      desc: 'KMS customer-managed keys, AES-256 GCM encryption, and immutable Glacier retention.',
      icon: Cloud
    },
    {
      layer: 'Search & Retrieval Engine',
      tech: 'Elasticsearch 8.x + Vector Embeddings',
      desc: 'Sub-second hybrid full-text indexing and semantic dense vector similarity search.',
      icon: Zap
    },
    {
      layer: 'Enterprise AI Inference',
      tech: 'AWS Bedrock & Private Ollama',
      desc: 'Zero-retention private LLM runtime for document summarization, extraction, and RAG.',
      icon: Cpu
    },
    {
      layer: 'Rights Management',
      tech: 'Policy Server & Dynamic Watermarking',
      desc: 'Decoupled rights verification microservice delivering tamper-evident viewing sessions.',
      icon: Lock
    }
  ];

  const deploymentModels = [
    {
      title: 'AWS Cloud Native (CDK)',
      badge: 'Enterprise SaaS',
      desc: 'Fully automated AWS CDK infrastructure provisioning DynamoDB, S3, ECS Fargate, OpenSearch, and CloudFront with auto-scaling.',
      features: ['Multi-region active-active', 'Consolidated AWS Billing', 'SOC2 Type II Assured']
    },
    {
      title: 'Hybrid Docker & Kubernetes',
      badge: 'Self-Hosted',
      desc: 'Pre-packaged Docker Compose and Kubernetes Helm charts for deployment on private clouds, OpenShift, or on-premise hardware.',
      features: ['MinIO S3 replacement', 'DynamoDB Local & Postgres', 'Zero cloud egress costs']
    },
    {
      title: 'Air-Gapped Sovereign Edition',
      badge: 'Defense & Banking',
      desc: 'Isolated offline deployment featuring local Ollama AI models, on-prem LDAP/Kerberos sync, and hardware security key enforcement.',
      features: ['100% Offline execution', 'No external API calls', 'Top Secret classification']
    }
  ];

  return (
    <section id="architecture" className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-900 text-white relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-sky-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-400/30 text-indigo-300 text-xs font-bold uppercase tracking-wider">
            Technical Architecture
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Engineered for Million-Document Scale
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            A battle-tested distributed architecture combining Next.js 16, AWS DynamoDB, Elasticsearch, and sovereign AI inference.
          </p>
        </div>

        {/* Stack Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {stackItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700/80 hover:border-indigo-500/60 hover:bg-slate-800 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center text-indigo-400 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-xs mb-4">
                  <Icon size={22} />
                </div>
                <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">
                  {item.layer}
                </span>
                <h4 className="text-lg font-bold text-white mt-1 mb-2">
                  {item.tech}
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Deployment Models */}
        <div className="mt-20">
          <div className="text-center mb-10">
            <h3 className="text-2xl sm:text-3xl font-black text-white">Flexible Enterprise Deployment Models</h3>
            <p className="text-sm sm:text-base text-slate-400 mt-1">Deploy anywhere from public AWS cloud to isolated on-premise infrastructure.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {deploymentModels.map((model, idx) => (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-slate-950/80 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-indigo-950 text-indigo-300 border border-indigo-800/60 font-bold">
                      {model.badge}
                    </span>
                    <Container size={18} className="text-slate-500" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">{model.title}</h4>
                  <p className="text-xs sm:text-sm text-slate-300 mb-6 leading-relaxed">
                    {model.desc}
                  </p>
                </div>

                <div className="space-y-2 pt-4 border-t border-slate-800">
                  {model.features.map((feat, fidx) => (
                    <div key={fidx} className="flex items-center gap-2 text-xs text-slate-300 font-medium">
                      <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
