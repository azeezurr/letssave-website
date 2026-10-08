'use client';

import React, { useState } from 'react';
import {
  FileText,
  Workflow,
  ShieldCheck,
  Brain,
  Eye,
  KeyRound,
  Layers,
  Globe2,
  Lock,
  GitBranch,
  UploadCloud,
  FolderTree,
  Clock,
  Activity,
  Sparkles,
  Search,
  Bot,
  ShieldAlert,
  Server,
  Zap,
  Users,
  CheckCircle,
  ArrowUpRight,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface FeatureShowcaseProps {
  onOpenPrototypeTab: (tabId: string) => void;
}

export default function FeatureShowcase({ onOpenPrototypeTab }: FeatureShowcaseProps) {
  const [activeCategory, setActiveCategory] = useState<number>(0);

  const pillars = [
    {
      id: 'dms',
      tabLabel: 'Document Vault',
      title: 'Enterprise Document Management & Storage',
      tagline: 'High-speed ingestion, version trees, check-in/out locks, and format conversions.',
      prototypeTab: 'documents',
      icon: FileText,
      accentColor: 'indigo',
      highlights: [
        {
          icon: GitBranch,
          title: 'Version Control & Check-in / Out',
          desc: 'Full revision tree with automated semantic diffing, single-click rollback, and check-out locking to prevent editing conflicts.'
        },
        {
          icon: FolderTree,
          title: 'Departmental Isolation & Hierarchies',
          desc: 'Deep nested folder structures with automated inheritance, space isolation, and departmental tagging.'
        },
        {
          icon: UploadCloud,
          title: 'Batch Ingestion & OCR Conversion',
          desc: 'Drag-and-drop batch file uploads with automatic LibreOffice/GCP conversion pipeline supporting PDF, Office, and CAD files.'
        },
        {
          icon: Lock,
          title: 'Marking Sets & Classifications',
          desc: 'Enforce classified marking sets (Top Secret, Confidential, Secret, Restricted, Internal) across every bucket.'
        }
      ],
      metrics: [
        { label: 'Storage Engine', val: 'AWS S3 / MinIO' },
        { label: 'Ingestion Throughput', val: '10,000+ files/min' },
        { label: 'File Types Supported', val: '100+ formats' }
      ]
    },
    {
      id: 'cases',
      tabLabel: 'Case Management',
      title: 'Dynamic Case Management & SLA Engine',
      tagline: 'Transform chaotic requests into structured, auditable work items with real-time SLA countdowns.',
      prototypeTab: 'cases',
      icon: Activity,
      accentColor: 'sky',
      highlights: [
        {
          icon: Layers,
          title: 'Structured Stage Lifecycles',
          desc: 'Define custom stage flows (Intake, Investigation, Legal Review, Resolution) tailored to HR, Compliance, or Legal work.'
        },
        {
          icon: Clock,
          title: 'Automated SLA Timers & Escalations',
          desc: 'Real-time countdown clocks with color-coded warning thresholds and automatic escalation to supervisor queues.'
        },
        {
          icon: Activity,
          title: 'Interactive Kanban & Grid Boards',
          desc: 'Fluid drag-and-drop progression, bulk task assignments, priority sorting, and team workload distribution.'
        },
        {
          icon: FileText,
          title: 'Comprehensive Activity Audit Trail',
          desc: 'Every status change, internal note, attached document, and sign-off is immutably timestamped for audits.'
        }
      ],
      metrics: [
        { label: 'Average Resolution Speed', val: '72% Faster' },
        { label: 'SLA Breach Rate', val: '< 0.5%' },
        { label: 'Audit Readiness', val: '100% Instant' }
      ]
    },
    {
      id: 'bpm',
      tabLabel: 'BPM & Workflows',
      title: 'Visual BPM Designer & Workflow Copilot',
      tagline: 'Orchestrate multi-step approval chains, conditional routing, and automated AI extractions.',
      prototypeTab: 'workflows',
      icon: Workflow,
      accentColor: 'emerald',
      highlights: [
        {
          icon: Workflow,
          title: 'Visual Node Canvas',
          desc: 'Intuitive BPMN-compatible node designer with drag-and-drop actions, approval gates, timers, and conditional splits.'
        },
        {
          icon: Sparkles,
          title: 'AI Workflow Synthesis Copilot',
          desc: 'Prompt-based workflow generation: describe your approval process in natural language and watch the canvas auto-generate.'
        },
        {
          icon: Server,
          title: 'Asynchronous Worker Engine',
          desc: 'Powered by RabbitMQ workers for reliable background processing, dead-letter recovery, and webhook integrations.'
        },
        {
          icon: CheckCircle,
          title: 'Digital Sign-offs & Unified Inbox',
          desc: 'Consolidated approval inbox for executives with one-click digital signatures and mobile push notifications.'
        }
      ],
      metrics: [
        { label: 'Process Automation', val: 'Up to 90%' },
        { label: 'Queue Engine', val: 'RabbitMQ HA' },
        { label: 'Workflow Designer', val: 'Visual Drag & Drop' }
      ]
    },
    {
      id: 'governance',
      tabLabel: 'Governance Studio',
      title: 'Policy Lifecycle & Attestation Tracking',
      tagline: 'Enforce enterprise policy governance, track mandatory employee attestations, and satisfy regulatory standards.',
      prototypeTab: 'governance',
      icon: ShieldCheck,
      accentColor: 'indigo',
      highlights: [
        {
          icon: ShieldCheck,
          title: 'Policy Lifecycle Governance',
          desc: 'Manage policies from initial Drafting to Legal Review, Version Publication, Annual Renewal, and Final Archival.'
        },
        {
          icon: Users,
          title: 'Mandatory Employee Attestations',
          desc: 'Track employee read-and-sign attestations with automated reminders, departmental compliance leaderboards, and PDF audit certificates.'
        },
        {
          icon: Lock,
          title: 'Legal Hold & Retention Policies',
          desc: 'Immutable retention schedules and legal hold locks preventing document deletion during active litigation.'
        },
        {
          icon: ShieldAlert,
          title: 'SOC2, HIPAA & GDPR Radar',
          desc: 'Pre-configured compliance mappings against ISO 27001, SOC2 Type II, HIPAA, and GDPR data residency rules.'
        }
      ],
      metrics: [
        { label: 'Employee Attestation Rate', val: '98.5% Average' },
        { label: 'Compliance Frameworks', val: 'SOC2 / HIPAA / GDPR' },
        { label: 'Audit Defense Time', val: 'Minutes vs Weeks' }
      ]
    },
    {
      id: 'ai',
      tabLabel: 'AI Knowledge Hub',
      title: 'Enterprise RAG Chat & Global Search',
      tagline: 'Instant answers synthesized from thousands of confidential documents with verified page-level citations.',
      prototypeTab: 'assistant',
      icon: Brain,
      accentColor: 'sky',
      highlights: [
        {
          icon: Bot,
          title: 'Enterprise RAG Workplace Copilot',
          desc: 'Chat directly with your company repository. The AI retrieves semantic chunks and provides answers with exact page citations.'
        },
        {
          icon: Search,
          title: 'Sub-Second Global Search',
          desc: 'Combined Elasticsearch full-text keyword indexing and vector dense embeddings for rapid natural-language discovery.'
        },
        {
          icon: Sparkles,
          title: 'Automated Document Summarization',
          desc: 'Gemini and local Ollama model integration for automatic executive summaries, entity recognition, and risk factor highlights.'
        },
        {
          icon: Lock,
          title: 'Zero-Retention Private Inference',
          desc: 'Enterprise data remains strictly within your private VPC—no customer data is ever used for external public model training.'
        }
      ],
      metrics: [
        { label: 'Search Query Latency', val: '< 250ms' },
        { label: 'AI Inference Option', val: 'Bedrock or Local Ollama' },
        { label: 'Citation Accuracy', val: '100% Verifiable' }
      ]
    },
    {
      id: 'security',
      tabLabel: 'Watermarked Viewer & DLP',
      title: 'Watermarked Secure Viewer & Anti-Leak DRM',
      tagline: 'Military-grade rights management with dynamic user watermarking and screen-leak mitigation.',
      prototypeTab: 'secure-viewer',
      icon: Eye,
      accentColor: 'rose',
      highlights: [
        {
          icon: Eye,
          title: 'Dynamic Forensic Watermarking',
          desc: 'Transparent diagonal watermarks stamping viewer email, IP address, device ID, and UTC timestamp directly onto the raster canvas.'
        },
        {
          icon: ShieldAlert,
          title: 'Anti-Copy & Print Interception',
          desc: 'Active browser protections disabling print spoolers, right-click context menus, and clipboard extraction on restricted files.'
        },
        {
          icon: Server,
          title: 'Rights Management Policy Server',
          desc: 'Decoupled microservice that validates session tokens, cryptographic signatures, and expiration windows for every viewed page.'
        },
        {
          icon: Lock,
          title: 'Desktop Agent Integration',
          desc: 'Lightweight desktop companion agent for enhanced operating-system level screen capture prevention and hardware binding.'
        }
      ],
      metrics: [
        { label: 'Watermark Timestamp', val: 'Sub-second UTC' },
        { label: 'DLP Enforcement', val: 'Server & Client Tier' },
        { label: 'Decryption Mode', val: 'Ephemeral Memory Only' }
      ]
    },
    {
      id: 'identity',
      tabLabel: 'Identity & SCIM',
      title: 'Enterprise Identity, SCIM v2 & SSO',
      tagline: 'Seamless integration with Microsoft Entra ID, Okta, PingFederate, and Windows Active Directory.',
      prototypeTab: 'documents',
      icon: KeyRound,
      accentColor: 'indigo',
      highlights: [
        {
          icon: KeyRound,
          title: 'Enterprise Single Sign-On (SSO)',
          desc: 'Native support for SAML 2.0, OpenID Connect (OIDC), and Windows Integrated Kerberos authentication.'
        },
        {
          icon: Users,
          title: 'Automated SCIM v2 Provisioning',
          desc: 'Instant user onboarding, role provisioning, and immediate deactivation synced directly with Okta and Azure AD.'
        },
        {
          icon: ShieldCheck,
          title: 'Security Proxies & Granular ACL',
          desc: 'Define permissions at the space, folder, or file level with proxy marking sets and attribute-based access control (ABAC).'
        },
        {
          icon: Lock,
          title: 'Multi-Factor Authentication (MFA)',
          desc: 'Enforce TOTP and FIDO2/WebAuthn hardware security keys across all administrator and compliance officer logins.'
        }
      ],
      metrics: [
        { label: 'SSO Standards', val: 'SAML 2.0 / OIDC / Kerberos' },
        { label: 'Directory Sync', val: 'SCIM v2 Compliant' },
        { label: 'Session Management', val: 'Encrypted JWT & Cookies' }
      ]
    },
    {
      id: 'ecosystem',
      tabLabel: 'Ecosystem & Cloud',
      title: 'Plugin Architecture, SAP & AWS Marketplace',
      tagline: 'Extend the platform with custom enterprise plugins and subscribe via AWS consolidated billing.',
      prototypeTab: 'workflows',
      icon: Globe2,
      accentColor: 'emerald',
      highlights: [
        {
          icon: Layers,
          title: 'Custom Plugin Architecture',
          desc: 'Sandboxed JavaScript plugin runtime supporting custom action menus, ERP hooks (SAP, NetSuite), and CMIS repository bridges.'
        },
        {
          icon: Globe2,
          title: '12 Global Languages (i18n)',
          desc: 'Full interface localization in 12 languages including English, Arabic (RTL), Hindi, Spanish, French, German, Japanese, and Chinese.'
        },
        {
          icon: Zap,
          title: 'AWS Marketplace 1-Click Billing',
          desc: 'Procure LetsSave directly through your AWS Enterprise Discount Program (EDP) with consolidated monthly AWS invoicing.'
        },
        {
          icon: Lock,
          title: 'Multi-Currency Stripe & Razorpay',
          desc: 'Self-service subscription tiers starting at $10/user/month with automated tax invoicing and multi-tenant quotas.'
        }
      ],
      metrics: [
        { label: 'Supported Locales', val: '12 Languages (RTL Ready)' },
        { label: 'Procurement', val: 'AWS Marketplace SaaS' },
        { label: 'API Standard', val: 'OpenAPI 3.0 REST' }
      ]
    }
  ];

  const currentPillar = pillars[activeCategory];

  return (
    <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50/60 border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold uppercase tracking-wider">
            Full Enterprise Capabilities
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Built for High-Stakes Enterprise Operations
          </h2>
          <p className="text-base sm:text-xl text-slate-600 font-normal">
            Everything your organization needs: from AI-powered document intelligence and visual BPM workflows to rigorous policy governance and anti-leak watermarking.
          </p>
        </div>

        {/* Feature Navigation Tabs (Scrollable on Mobile) */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-10 -mx-4 px-4 sm:mx-0 sm:px-0">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            const isSelected = activeCategory === index;
            return (
              <button
                key={pillar.id}
                onClick={() => setActiveCategory(index)}
                className={cn(
                  'flex items-center gap-2 px-4 py-3 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all shrink-0',
                  isSelected
                    ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/10 scale-100'
                    : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200/70'
                )}
              >
                <Icon size={17} className={isSelected ? 'text-indigo-400' : 'text-slate-400'} />
                <span>{pillar.tabLabel}</span>
              </button>
            );
          })}
        </div>

        {/* Active Pillar Showcase Card */}
        <div className="bg-white rounded-3xl sm:rounded-[2.5rem] p-6 sm:p-10 lg:p-12 border border-slate-200 shadow-xl shadow-slate-200/40 transition-all">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-slate-100">
            <div className="max-w-2xl space-y-2">
              <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-widest">
                <span className="w-2 h-2 rounded-full bg-indigo-600" />
                <span>Pillar {activeCategory + 1} of 8</span>
              </div>
              <h3 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
                {currentPillar.title}
              </h3>
              <p className="text-base sm:text-lg text-slate-600">
                {currentPillar.tagline}
              </p>
            </div>

            <button
              onClick={() => {
                onOpenPrototypeTab(currentPillar.prototypeTab);
                const el = document.getElementById('prototype-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-indigo-600 to-sky-600 hover:from-indigo-700 hover:to-sky-700 text-white text-sm font-bold rounded-2xl shadow-lg shadow-indigo-500/20 hover:scale-105 transition-all shrink-0 self-start lg:self-auto"
            >
              <span>Test in Live Prototype</span>
              <ArrowUpRight size={17} />
            </button>
          </div>

          {/* 4 Feature Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8">
            {currentPillar.highlights.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-slate-50/70 border border-slate-200/70 hover:border-indigo-300 hover:bg-white hover:shadow-md transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-indigo-50 group-hover:text-indigo-600 text-slate-700 transition-all shadow-xs">
                    <Icon size={22} />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Technical Pillar Specs */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
            <div className="flex flex-wrap items-center gap-6">
              {currentPillar.metrics.map((m, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="font-semibold text-slate-400">{m.label}:</span>
                  <strong className="text-slate-800 font-mono">{m.val}</strong>
                </div>
              ))}
            </div>
            <span className="text-indigo-600 font-semibold flex items-center gap-1">
              Production Validated <CheckCircle size={14} />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
