'use client';

import React from 'react';
import {
  Server,
  Cloud,
  ShieldCheck,
  Lock,
  Layers,
  Container,
  Cpu,
  CheckCircle2,
  Globe2,
  HardDrive
} from 'lucide-react';

export default function DeploymentSolutions() {
  const deploymentOptions = [
    {
      title: 'Enterprise Private Cloud',
      badge: 'AWS / Azure / GCP',
      desc: 'Deploy within your dedicated Virtual Private Cloud (VPC). Benefit from elastic auto-scaling, automated disaster recovery, and multi-region high availability.',
      icon: Cloud,
      features: [
        'Isolated VPC network boundary',
        'Customer-Managed Encryption Keys (CMEK)',
        'Active-active geo-redundancy with 99.99% SLA'
      ]
    },
    {
      title: 'On-Premises Data Centers',
      badge: 'Bare-Metal & Private VMs',
      desc: 'Host 100% on your internal enterprise infrastructure. Maintain full physical sovereignty over sensitive corporate assets with zero cloud egress costs.',
      icon: Server,
      features: [
        'Complete hardware & data ownership',
        'Direct SAN / NAS storage array integration',
        'Local Active Directory / LDAP authentication'
      ]
    },
    {
      title: 'Sovereign & Air-Gapped Edition',
      badge: 'Defense & Banking',
      desc: 'Engineered for high-security defense, intelligence, and banking environments. Functions 100% offline with zero external network dependencies.',
      icon: Lock,
      features: [
        'Strict zero-connectivity offline runtime',
        'Top Secret classification controls',
        'Hardware security module (HSM) key storage'
      ]
    },
    {
      title: 'Hybrid Multi-Cloud Architecture',
      badge: 'Cloud + On-Premise',
      desc: 'Combine on-premise low-latency operational access with scalable cloud cold storage for decade-long compliance archiving.',
      icon: Layers,
      features: [
        'Bi-directional seamless synchronization',
        'Automatic cold tier archival offloading',
        'Unified centralized governance dashboard'
      ]
    },
    {
      title: 'Containerized Kubernetes / OpenShift',
      badge: 'DevOps & GitOps Ready',
      desc: 'Pre-configured Helm charts and container images ready for enterprise Kubernetes, Red Hat OpenShift, or Amazon EKS / Azure AKS clusters.',
      icon: Container,
      features: [
        'Declarative GitOps configuration',
        'Zero-downtime rolling updates',
        'Native Prometheus & Grafana telemetry'
      ]
    },
    {
      title: 'Fully Managed Sovereign SaaS',
      badge: 'Turnkey Enterprise Service',
      desc: 'Zero maintenance overhead. Let our certified engineers manage infrastructure, patching, automated backups, and 24/7/365 security monitoring.',
      icon: Globe2,
      features: [
        'Guaranteed 99.999% uptime commitment',
        'Automated continuous compliance updates',
        'Dedicated Enterprise Technical Account Manager'
      ]
    }
  ];

  return (
    <section id="deployment-options" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900 text-white relative overflow-hidden">
      {/* Background Ambient Accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-teal-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-slate-800/40 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-500/10 border border-teal-400/30 text-teal-300 text-xs font-bold uppercase tracking-wider font-heading">
            Enterprise Deployment Freedom
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white font-heading">
            Wide Options of Deployment Available
          </h2>
          <p className="text-base sm:text-lg text-slate-300 font-normal">
            Whether your regulatory mandate demands on-premise hardware, isolated air-gapped sovereign defense networks, or global cloud infrastructure, LetsSave adapts to your exact IT topology.
          </p>
        </div>

        {/* 6 Deployment Option Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {deploymentOptions.map((opt, index) => {
            const Icon = opt.icon;
            return (
              <div
                key={index}
                className="p-7 rounded-3xl bg-slate-800/80 border border-slate-700/80 hover:border-teal-500 hover:bg-slate-800 transition-all flex flex-col justify-between group shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-700 flex items-center justify-center text-teal-400 group-hover:bg-teal-700 group-hover:text-white transition-all shadow-xs">
                      <Icon size={22} />
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-md bg-slate-900 text-teal-300 border border-slate-700">
                      {opt.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-teal-400 transition-colors font-heading">
                    {opt.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6 font-normal">
                    {opt.desc}
                  </p>
                </div>

                <div className="space-y-2 pt-4 border-t border-slate-700/80">
                  {opt.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-2 text-xs text-slate-300 font-medium">
                      <CheckCircle2 size={14} className="text-teal-400 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Deployment Assurance Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-950 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-1 max-w-2xl">
            <h4 className="text-lg font-bold text-white font-heading">Need a Custom Sovereign or Multi-Region Setup?</h4>
            <p className="text-xs sm:text-sm text-slate-400">
              Our enterprise solution architects will design and validate your deployment architecture to guarantee complete regulatory compliance.
            </p>
          </div>
          <a
            href="mailto:sales@letssave.in"
            className="px-6 py-3 bg-teal-700 hover:bg-teal-800 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md transition-all shrink-0 font-heading"
          >
            Consult with Infrastructure Architect
          </a>
        </div>
      </div>
    </section>
  );
}
