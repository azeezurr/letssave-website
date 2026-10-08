'use client';

import React, { useState, useMemo } from 'react';
import {
  Search,
  FileText,
  Workflow,
  ShieldCheck,
  Brain,
  Eye,
  KeyRound,
  Layers,
  ArrowRight,
  CheckCircle2,
  Lock,
  GitBranch,
  UploadCloud,
  FolderTree,
  Clock,
  Activity,
  Sparkles,
  Bot,
  ShieldAlert,
  Server,
  Globe2,
  Archive,
  Leaf,
  ScanLine,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { PrototypeTab } from './InteractivePrototype';

interface SolutionCatalogProps {
  onOpenPrototypeTab: (tabId: PrototypeTab) => void;
}

interface FeatureItem {
  id: string;
  category: 'vault' | 'archiving' | 'paperless' | 'cases' | 'bpm' | 'governance' | 'ai' | 'security';
  categoryLabel: string;
  title: string;
  shortDesc: string;
  prototypeTab: PrototypeTab;
  tags: string[];
  icon: any;
  bullets: string[];
  badge: string;
}

export default function SolutionCatalog({ onOpenPrototypeTab }: SolutionCatalogProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Capabilities' },
    { id: 'vault', label: 'Document Vault & Storage' },
    { id: 'archiving', label: 'Compliant Archiving' },
    { id: 'paperless', label: 'Paperless Initiative' },
    { id: 'cases', label: 'Case Management & SLA' },
    { id: 'bpm', label: 'BPM Workflows' },
    { id: 'governance', label: 'Governance & Policy' },
    { id: 'ai', label: 'AI & Knowledge Search' },
    { id: 'security', label: 'Secure Viewer & DLP' }
  ];

  const features: FeatureItem[] = [
    {
      id: 'worm-archiving',
      category: 'archiving',
      categoryLabel: 'Compliant Archiving',
      title: 'WORM Immutable Storage & Legal Hold',
      shortDesc: 'Write-Once-Read-Many regulatory archiving preventing modification or deletion prior to statutory retention expiry.',
      prototypeTab: 'governance',
      tags: ['archiving', 'worm', 'retention', 'legal hold', 'sec 17a-4', 'finra', 'compliance'],
      icon: Archive,
      bullets: [
        'SEC 17a-4, FINRA, HIPAA & GDPR retention adherence',
        'Instant legal hold freeze during active litigation',
        'Immutable cryptographic audit trail on every record'
      ],
      badge: 'WORM Compliant'
    },
    {
      id: 'paperless-scanning',
      category: 'paperless',
      categoryLabel: 'Paperless Initiative',
      title: 'Legacy Paper Digitisation & Batch Scanning',
      shortDesc: 'Transform physical warehouse filing rooms into searchable digital repositories with intelligent OCR extraction.',
      prototypeTab: 'documents',
      tags: ['paperless', 'digitisation', 'scanning', 'ocr', 'green', 'esg', 'filing'],
      icon: ScanLine,
      bullets: [
        'High-speed batch industrial scanner integration',
        'Multilingual OCR/ICR across printed & handwritten records',
        '100% elimination of physical filing and courier costs'
      ],
      badge: 'Paperless Transformation'
    },
    {
      id: 'version-control',
      category: 'vault',
      categoryLabel: 'Document Vault',
      title: 'Version Control & Check-in / Out Locks',
      shortDesc: 'Complete document revision trees with automated semantic diffing and check-out locking to eliminate editing conflicts.',
      prototypeTab: 'documents',
      tags: ['versioning', 'rollback', 'check-out', 'lock', 'diff', 'revision'],
      icon: GitBranch,
      bullets: [
        'Single-click rollback to any historic version',
        'Exclusive check-out lock with user attribution',
        'Visual side-by-side revision diff viewer'
      ],
      badge: 'Core DMS'
    },
    {
      id: 'folder-hierarchy',
      category: 'vault',
      categoryLabel: 'Document Vault',
      title: 'Departmental Isolation & Nested Hierarchy',
      shortDesc: 'Hierarchical folder architecture with granular inheritance controls, departmental spaces, and metadata filing.',
      prototypeTab: 'documents',
      tags: ['folder', 'tree', 'department', 'space', 'hierarchy'],
      icon: FolderTree,
      bullets: [
        'Isolated departmental workspaces (Legal, HR, Finance)',
        'Inherited ACL permissions down sub-folder trees',
        'Tag-based dynamic smart collections'
      ],
      badge: 'Multi-Tenant'
    },
    {
      id: 'batch-ingestion',
      category: 'vault',
      categoryLabel: 'Document Vault',
      title: 'Batch Ingestion & Document Conversion Pipeline',
      shortDesc: 'Drag-and-drop batch upload with automated OCR processing and conversion for 100+ file formats.',
      prototypeTab: 'documents',
      tags: ['upload', 'ocr', 'conversion', 'pdf', 'cad', 'office'],
      icon: UploadCloud,
      bullets: [
        'Parallel multi-part direct upload streams',
        'Auto conversion of PDF, Word, Excel, PowerPoint, and CAD',
        'Automated OCR text extraction from scanned images'
      ],
      badge: 'High Speed'
    },
    {
      id: 'marking-sets',
      category: 'security',
      categoryLabel: 'Security & Access',
      title: 'Security Classification Marking Sets',
      shortDesc: 'Apply military-grade classification levels (Top Secret, Confidential, Secret, Restricted, Internal) across documents.',
      prototypeTab: 'documents',
      tags: ['security', 'classification', 'top secret', 'confidential', 'marking sets'],
      icon: Lock,
      bullets: [
        'Strict clearance enforcement based on user role',
        'Cryptographic metadata tagging on all stored records',
        'Visual banner and watermark indicator on every page'
      ],
      badge: 'Military Grade'
    },
    {
      id: 'case-lifecycles',
      category: 'cases',
      categoryLabel: 'Case Management',
      title: 'Structured Work Items & Dynamic Stage Lifecycles',
      shortDesc: 'Transform unstructured requests into structured cases with predefined stages, activities, and required checklists.',
      prototypeTab: 'cases',
      tags: ['cases', 'stages', 'checklist', 'work items', 'lifecycle'],
      icon: Activity,
      bullets: [
        'Configurable stage gates (Intake, Investigation, Review, Resolved)',
        'Mandatory document upload checklists per stage',
        'Complete chronological audit log of all case events'
      ],
      badge: 'Structured'
    },
    {
      id: 'sla-engine',
      category: 'cases',
      categoryLabel: 'Case Management',
      title: 'Automated SLA Timers & Supervisor Escalation',
      shortDesc: 'Real-time countdown clocks with color-coded warning thresholds and automatic escalation queues.',
      prototypeTab: 'cases',
      tags: ['sla', 'timer', 'escalation', 'countdown', 'deadlines'],
      icon: Clock,
      bullets: [
        'Real-time remaining hours and minutes countdown',
        'Visual warning banners as deadlines approach',
        'Automatic routing to senior managers upon breach'
      ],
      badge: 'SLA Engine'
    },
    {
      id: 'visual-bpm',
      category: 'bpm',
      categoryLabel: 'BPM Workflows',
      title: 'Visual BPM Designer & Node Canvas',
      shortDesc: 'Intuitive BPMN-compatible workflow designer with drag-and-drop actions, approval gates, timers, and conditional splits.',
      prototypeTab: 'workflows',
      tags: ['workflow', 'bpm', 'designer', 'canvas', 'approval', 'automation'],
      icon: Workflow,
      bullets: [
        'Drag-and-drop visual node configuration',
        'Conditional routing rules (e.g., invoices > $10,000)',
        'Integrated digital signature and sign-off gates'
      ],
      badge: 'Visual BPM'
    },
    {
      id: 'ai-workflow-copilot',
      category: 'bpm',
      categoryLabel: 'BPM Workflows',
      title: 'AI Workflow Synthesis Copilot',
      shortDesc: 'Describe your approval flow in plain English and let the AI copilot auto-generate the complete BPM graph.',
      prototypeTab: 'workflows',
      tags: ['ai workflow', 'copilot', 'synthesis', 'automation'],
      icon: Sparkles,
      bullets: [
        'Natural language to BPMN node graph generation',
        'Automated edge connections and role assignment',
        'Asynchronous high-reliability background execution'
      ],
      badge: 'AI Copilot'
    },
    {
      id: 'policy-lifecycle',
      category: 'governance',
      categoryLabel: 'Governance & Policy',
      title: 'Policy Lifecycle & Annual Renewal Tracking',
      shortDesc: 'Govern enterprise policies from initial draft to legal review, employee publication, and scheduled renewals.',
      prototypeTab: 'governance',
      tags: ['policy', 'governance', 'lifecycle', 'renewal', 'legal'],
      icon: ShieldCheck,
      bullets: [
        'Drafting, legal review, and publication staging',
        'Automated annual renewal reminders and audit schedules',
        'Immutable legal hold locks preventing document deletion'
      ],
      badge: 'Compliance'
    },
    {
      id: 'employee-attestation',
      category: 'governance',
      categoryLabel: 'Governance & Policy',
      title: 'Mandatory Employee Attestations & Scorecards',
      shortDesc: 'Distribute compliance policies to thousands of employees and track digital read-and-sign attestations.',
      prototypeTab: 'governance',
      tags: ['attestation', 'signature', 'compliance', 'scorecard', 'employee'],
      icon: CheckCircle2,
      bullets: [
        'One-click employee digital sign-off with timestamp',
        'Departmental compliance completion meters',
        'Downloadable audit certificates for regulatory filing'
      ],
      badge: 'Attestation Hub'
    },
    {
      id: 'rag-assistant',
      category: 'ai',
      categoryLabel: 'AI Knowledge Hub',
      title: 'Enterprise RAG Chat with Verified Citations',
      shortDesc: 'Chat directly with your entire document vault. Retrieve precise answers with clickable page-level citations.',
      prototypeTab: 'assistant',
      tags: ['rag', 'chat', 'ai', 'citations', 'knowledge base', 'assistant'],
      icon: Bot,
      bullets: [
        'Deep page and paragraph source citation badges',
        'Zero-retention sovereign AI inference options',
        'Multi-document cross-synthesis and contract Q&A'
      ],
      badge: 'RAG Copilot'
    },
    {
      id: 'global-search',
      category: 'ai',
      categoryLabel: 'AI Knowledge Hub',
      title: 'Sub-Second Hybrid Search (Vector + Full-Text)',
      shortDesc: 'Lightning-fast hybrid search combining full-text keyword matching with dense vector semantic search.',
      prototypeTab: 'assistant',
      tags: ['search', 'vector', 'semantic', 'hybrid'],
      icon: Search,
      bullets: [
        'Sub-250 millisecond query response time',
        'Filter by metadata, date range, department, and classification',
        'AI-generated executive summary directly in search results'
      ],
      badge: '< 250ms Speed'
    },
    {
      id: 'watermarked-viewer',
      category: 'security',
      categoryLabel: 'Watermarked Viewer',
      title: 'Watermarked Secure Viewer & Anti-Leak DRM',
      shortDesc: 'Zero-download browser viewer with dynamic forensic watermarks (user email, IP, timestamp) to prevent leaks.',
      prototypeTab: 'secure-viewer',
      tags: ['watermark', 'viewer', 'drm', 'anti-leak', 'dlp', 'secure'],
      icon: Eye,
      bullets: [
        'Dynamic diagonal watermark with user email and IP',
        'Client-side print spooler and screenshot mitigation',
        'Rights Management Policy Server microservice validation'
      ],
      badge: 'Anti-Leak DRM'
    },
    {
      id: 'identity-scim',
      category: 'security',
      categoryLabel: 'Security & Access',
      title: 'Enterprise SSO, SCIM v2 & Directory Sync',
      shortDesc: 'Seamless integration with Microsoft Entra ID, Okta, PingFederate, and Windows Active Directory.',
      prototypeTab: 'documents',
      tags: ['sso', 'scim', 'saml', 'oidc', 'kerberos', 'okta', 'active directory'],
      icon: KeyRound,
      bullets: [
        'Native SAML 2.0 and OpenID Connect (OIDC) Single Sign-On',
        'Automated user and group provisioning via SCIM v2',
        'Windows Integrated Kerberos authentication support'
      ],
      badge: 'Enterprise Identity'
    }
  ];

  const filteredFeatures = useMemo(() => {
    return features.filter(item => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q ||
        item.title.toLowerCase().includes(q) ||
        item.shortDesc.toLowerCase().includes(q) ||
        item.tags.some(tag => tag.toLowerCase().includes(q)) ||
        item.bullets.some(b => b.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50/60 border-b border-slate-200">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold uppercase tracking-wider">
            Explore All Capabilities
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight font-heading">
            Comprehensive Enterprise Solutions
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-normal">
            Organized into clear corporate domains. Filter by category or search below to explore specific features.
          </p>
        </div>

        {/* Search and Category Filter Bar */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-5 border border-slate-200/90 shadow-xs mb-10 max-w-4xl mx-auto">
          {/* Search Input */}
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search features (e.g. 'archiving', 'paperless', 'WORM', 'SLA', 'watermark', 'BPM')..."
              className="w-full pl-11 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-teal-700 focus:bg-white focus:ring-2 focus:ring-teal-100 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Category Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
            {categories.map(cat => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={cn(
                    'px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all shrink-0 font-heading',
                    isSelected
                      ? 'bg-teal-700 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-teal-50 hover:text-teal-900'
                  )}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6 px-1 text-xs text-slate-500">
          <span>Showing <strong>{filteredFeatures.length}</strong> enterprise capabilities</span>
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="text-teal-800 font-bold hover:underline"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFeatures.map(item => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 hover:border-teal-400 hover:shadow-lg transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Category & Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      {item.categoryLabel}
                    </span>
                    <span className="text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-100">
                      {item.badge}
                    </span>
                  </div>

                  {/* Title & Icon */}
                  <div className="flex items-start gap-3.5 mb-3">
                    <div className="w-11 h-11 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-700 group-hover:bg-teal-700 group-hover:text-white transition-all shrink-0 shadow-2xs">
                      <Icon size={20} />
                    </div>
                    <h3 className="font-bold text-base sm:text-lg text-slate-900 leading-snug group-hover:text-teal-800 transition-colors font-heading">
                      {item.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4 font-normal">
                    {item.shortDesc}
                  </p>

                  {/* Bullet Benefits */}
                  <div className="space-y-1.5 pb-4 border-b border-slate-100">
                    {item.bullets.map((b, bIdx) => (
                      <div key={bIdx} className="flex items-start gap-2 text-xs text-slate-700 font-medium">
                        <CheckCircle2 size={13} className="text-teal-600 mt-0.5 shrink-0" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom CTA to Test in Live Prototype */}
                <div className="pt-4 mt-2">
                  <button
                    onClick={() => {
                      onOpenPrototypeTab(item.prototypeTab);
                      const el = document.getElementById('prototype-section');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full py-2.5 px-3 rounded-xl bg-slate-50 hover:bg-teal-50 text-slate-700 hover:text-teal-800 text-xs font-bold border border-slate-200 hover:border-teal-200 flex items-center justify-between transition-all font-heading"
                  >
                    <span>Test in Interactive Demo</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
