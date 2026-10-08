'use client';

import React, { useState, useEffect } from 'react';
import {
  Folder,
  FileText,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Lock,
  Unlock,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Play,
  RotateCcw,
  Sparkles,
  Search,
  Send,
  Eye,
  Download,
  Share2,
  GitBranch,
  Layers,
  ArrowRight,
  Workflow,
  Check,
  Bot,
  User,
  Monitor,
  Smartphone,
  Tablet,
  ChevronRight,
  ChevronDown,
  Info,
  Maximize2,
  Activity,
  Sliders,
  FileCode,
  FileSpreadsheet,
  X,
  Printer,
  Copy
} from 'lucide-react';
import { cn } from '@/lib/utils';

export type PrototypeTab = 'documents' | 'cases' | 'workflows' | 'governance' | 'assistant' | 'secure-viewer';
type DeviceMode = 'desktop' | 'tablet' | 'mobile';

interface InteractivePrototypeProps {
  initialTab?: PrototypeTab;
}

export default function InteractivePrototype({ initialTab = 'documents' }: InteractivePrototypeProps) {
  const [activeTab, setActiveTab] = useState<PrototypeTab>(initialTab);
  const [deviceMode, setDeviceMode] = useState<DeviceMode>('desktop');
  
  // Tab 1: Document Vault State
  const [selectedFolder, setSelectedFolder] = useState<string>('legal');
  const [selectedDocId, setSelectedDocId] = useState<string>('doc-1');
  const [showVersionDrawer, setShowVersionDrawer] = useState<boolean>(false);
  const [documentsState, setDocumentsState] = useState([
    {
      id: 'doc-1',
      name: 'Master_Service_Agreement_Enterprise_v3.2.pdf',
      folder: 'legal',
      size: '4.2 MB',
      updated: '12 mins ago',
      classification: 'TOP SECRET',
      classificationColor: 'bg-rose-500 text-white border-rose-600',
      isLocked: true,
      lockedBy: 'Sarah Connor (Legal Counsel)',
      version: 'v3.2',
      pages: 42,
      summary: 'Enterprise SLA agreements, data breach liabilities, and multi-region data residency terms.'
    },
    {
      id: 'doc-2',
      name: 'FY26_Q3_Financial_Audit_Report.xlsx',
      folder: 'finance',
      size: '2.1 MB',
      updated: '1 hour ago',
      classification: 'CONFIDENTIAL',
      classificationColor: 'bg-blue-600 text-white border-blue-700',
      isLocked: false,
      lockedBy: null,
      version: 'v2.0',
      pages: 18,
      summary: 'Consolidated balance sheet, tax provision reconciliations, and P&L breakdown.'
    },
    {
      id: 'doc-3',
      name: 'SOC2_TypeII_Security_Controls_Evidence.pdf',
      folder: 'governance',
      size: '9.8 MB',
      updated: 'Yesterday',
      classification: 'RESTRICTED',
      classificationColor: 'bg-amber-500 text-white border-amber-600',
      isLocked: false,
      lockedBy: null,
      version: 'v4.1',
      pages: 114,
      summary: 'Continuous compliance audit evidence, access log audits, and KMS key rotation logs.'
    },
    {
      id: 'doc-4',
      name: 'Global_Information_Security_Policy_v4.docx',
      folder: 'governance',
      size: '1.4 MB',
      updated: '3 days ago',
      classification: 'INTERNAL',
      classificationColor: 'bg-emerald-600 text-white border-emerald-700',
      isLocked: false,
      lockedBy: null,
      version: 'v4.0',
      pages: 35,
      summary: 'Enterprise clean desk guidelines, cryptographic standards, and device DLP policies.'
    },
    {
      id: 'doc-5',
      name: 'NextGen_AI_Architecture_Blueprint.dwg',
      folder: 'engineering',
      size: '8.4 MB',
      updated: 'Sep 18, 2026',
      classification: 'TOP SECRET',
      classificationColor: 'bg-rose-500 text-white border-rose-600',
      isLocked: false,
      lockedBy: null,
      version: 'v1.5',
      pages: 12,
      summary: 'High-availability vector database deployment, Ollama cluster topology, and S3 encryption.'
    }
  ]);

  // Tab 2: Case Management State
  const [cases, setCases] = useState([
    {
      id: 'CASE-2026-892',
      title: 'Vendor SOC2 Non-Compliance Inquiry',
      stage: 'investigation',
      priority: 'Urgent',
      slaRemaining: '2h 15m',
      slaStatus: 'warning',
      owner: 'Sarah Connor',
      department: 'Legal Risk'
    },
    {
      id: 'CASE-2026-895',
      title: 'New Enterprise Tenant Provisioning (AWS)',
      stage: 'intake',
      priority: 'High',
      slaRemaining: '6h 30m',
      slaStatus: 'healthy',
      owner: 'DevOps Lead',
      department: 'Infrastructure'
    },
    {
      id: 'CASE-2026-889',
      title: 'Cross-Border GDPR Data Transfer DPIA',
      stage: 'legal',
      priority: 'Urgent',
      slaRemaining: '1h 05m',
      slaStatus: 'danger',
      owner: 'Privacy Officer',
      department: 'Governance'
    },
    {
      id: 'CASE-2026-880',
      title: 'Annual Retention Schedule Audit - HR',
      stage: 'completed',
      priority: 'Normal',
      slaRemaining: 'Met (Saved 4d)',
      slaStatus: 'completed',
      owner: 'HR Director',
      department: 'Compliance'
    }
  ]);
  const [activeCaseFilter, setActiveCaseFilter] = useState<'all' | 'urgent'>('all');

  // Tab 3: BPM Workflow Designer State
  const [workflowSimulating, setWorkflowSimulating] = useState(false);
  const [activeWorkflowStep, setActiveWorkflowStep] = useState<number>(0);
  const [selectedWorkflowNode, setSelectedWorkflowNode] = useState<string>('node-3');

  // Tab 4: Governance Studio State
  const [attestationSigned, setAttestationSigned] = useState(false);
  const [attestationCount, setAttestationCount] = useState(1420);

  // Tab 5: AI RAG Assistant State
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'assistant'; text: string; sources?: string[] }>>([
    {
      sender: 'assistant',
      text: 'Hello! I am your Enterprise DMS Workplace Copilot. I have indexed 10,480 documents, active cases, and policies. Ask me anything or select a prompt below.'
    }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isAiThinking, setIsAiThinking] = useState(false);

  // Tab 6: Watermarked Secure Viewer State
  const [watermarkOpacity, setWatermarkOpacity] = useState<number>(24);
  const [dlpAlert, setDlpAlert] = useState<string | null>(null);

  // Handle Document Lock toggle
  const toggleDocLock = (id: string) => {
    setDocumentsState(prev => prev.map(doc => {
      if (doc.id === id) {
        return {
          ...doc,
          isLocked: !doc.isLocked,
          lockedBy: !doc.isLocked ? 'You (Current Session)' : null
        };
      }
      return doc;
    }));
  };

  // Run Workflow Simulation
  const runWorkflowSimulation = () => {
    if (workflowSimulating) return;
    setWorkflowSimulating(true);
    setActiveWorkflowStep(1);

    const steps = [1, 2, 3, 4, 5];
    steps.forEach((step, idx) => {
      setTimeout(() => {
        setActiveWorkflowStep(step);
        if (idx === steps.length - 1) {
          setTimeout(() => setWorkflowSimulating(false), 1200);
        }
      }, (idx + 1) * 900);
    });
  };

  // Handle Advance Case Stage
  const advanceCase = (caseId: string) => {
    const stageFlow: Record<string, string> = {
      intake: 'investigation',
      investigation: 'legal',
      legal: 'completed',
      completed: 'intake'
    };
    setCases(prev => prev.map(c => c.id === caseId ? { ...c, stage: stageFlow[c.stage] } : c));
  };

  // Handle Send AI Prompt
  const handleAiPrompt = (promptText: string) => {
    if (!promptText.trim() || isAiThinking) return;

    setChatMessages(prev => [...prev, { sender: 'user', text: promptText }]);
    setChatInput('');
    setIsAiThinking(true);

    setTimeout(() => {
      let reply = '';
      let sources: string[] = [];

      if (promptText.toLowerCase().includes('termination') || promptText.toLowerCase().includes('msa') || promptText.toLowerCase().includes('service')) {
        reply = 'According to the Master Service Agreement v3.2 (Section 14.3): Either party may terminate the agreement for convenience with 60 days written notice. In the event of an uncured material breach, termination takes immediate effect with full data export privileges within 30 calendar days.';
        sources = ['Master_Service_Agreement_Enterprise_v3.2.pdf (Page 14)', 'Vendor_Master_Addendum_2026.pdf'];
      } else if (promptText.toLowerCase().includes('soc2') || promptText.toLowerCase().includes('compliance') || promptText.toLowerCase().includes('audit')) {
        reply = 'The SOC2 Type II audit report confirms 100% adherence across all 5 Trust Service Criteria (Security, Availability, Processing Integrity, Confidentiality, Privacy). AES-256 encryption is verified for all DynamoDB and S3 objects at rest, with TLS 1.3 enforced in transit.';
        sources = ['SOC2_TypeII_Security_Controls_Evidence.pdf (Page 4-8)', 'Cloud_Security_Audit_Summary.pdf'];
      } else if (promptText.toLowerCase().includes('watermark') || promptText.toLowerCase().includes('secure viewer') || promptText.toLowerCase().includes('leak')) {
        reply = 'The Watermarked Secure Viewer generates dynamic, tamper-evident raster overlays on top of decrypted document buffers. The watermark stamps user email, IP address, machine ID, and UTC timestamp. The rights-management policy server actively terminates sessions if unauthorized screen-recording or print spooling is detected.';
        sources = ['Global_Information_Security_Policy_v4.docx (Clause 9.1)', 'Security_Guide.md'];
      } else {
        reply = `Retrieved relevant context from Enterprise Knowledge Base: Found 3 relevant policy documents and 2 active workflow instances matching "${promptText}". All systems comply with current tenant encryption standards.`;
        sources = ['Global_Information_Security_Policy_v4.docx', 'Enterprise_Architecture_Blueprint_2026.dwg'];
      }

      setChatMessages(prev => [...prev, { sender: 'assistant', text: reply, sources }]);
      setIsAiThinking(false);
    }, 800);
  };

  const selectedDoc = documentsState.find(d => d.id === selectedDocId) || documentsState[0];

  return (
    <div id="prototype-section" className="py-20 bg-slate-900 text-slate-100 relative overflow-hidden">
      {/* Decorative Glows */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-teal-600/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-slate-700/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Prototype Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 border border-teal-400/30 text-teal-300 text-xs font-bold uppercase tracking-wider font-heading">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-400"></span>
            </span>
            Live Enterprise Simulator
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white font-heading">
            Experience the Complete DMS Platform
          </h2>
          <p className="text-base sm:text-lg text-slate-300 font-normal">
            Interact with the actual core modules from our main enterprise build—right here in your browser.
            Test document locking, workflow simulation, RAG chat, and watermark protection.
          </p>
        </div>

        {/* Prototype Controls Bar (Module Tabs & Device Switcher) */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 bg-slate-800/80 p-2.5 sm:p-3.5 rounded-2xl sm:rounded-3xl border border-slate-700 shadow-xl mb-8 backdrop-blur-md">
          {/* Tabs (Horizontal scroll on small screens) */}
          <div className="w-full lg:w-auto flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 px-1">
            {[
              { id: 'documents', label: 'Document Vault', icon: Folder },
              { id: 'cases', label: 'Cases & SLA', icon: Activity },
              { id: 'workflows', label: 'BPM Designer', icon: Workflow },
              { id: 'governance', label: 'Governance & Policy', icon: ShieldCheck },
              { id: 'assistant', label: 'AI RAG Copilot', icon: Bot },
              { id: 'secure-viewer', label: 'Secure Viewer (DLP)', icon: Eye }
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as PrototypeTab)}
                  className={cn(
                    'flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all shrink-0 font-heading',
                    isActive
                      ? 'bg-teal-700 text-white shadow-md shadow-teal-900/40'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
                  )}
                >
                  <Icon size={16} className={isActive ? 'text-white' : 'text-slate-400'} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Device Switcher */}
          <div className="flex items-center justify-between w-full lg:w-auto gap-3 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-700/60 px-2">
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider hidden sm:inline">
              Preview Mode:
            </span>
            <div className="flex items-center bg-slate-900/90 p-1 rounded-xl border border-slate-700">
              <button
                onClick={() => setDeviceMode('desktop')}
                title="Desktop View (100% width)"
                className={cn(
                  'p-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 font-heading',
                  deviceMode === 'desktop' ? 'bg-teal-700 text-white shadow-xs' : 'text-slate-400 hover:text-white'
                )}
              >
                <Monitor size={15} />
                <span className="hidden sm:inline">Desktop</span>
              </button>

              <button
                onClick={() => setDeviceMode('tablet')}
                title="Tablet View (iPad landscape/portrait)"
                className={cn(
                  'p-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 font-heading',
                  deviceMode === 'tablet' ? 'bg-teal-700 text-white shadow-xs' : 'text-slate-400 hover:text-white'
                )}
              >
                <Tablet size={15} />
                <span className="hidden sm:inline">Tablet</span>
              </button>

              <button
                onClick={() => setDeviceMode('mobile')}
                title="Mobile View (iPhone / Android)"
                className={cn(
                  'p-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 font-heading',
                  deviceMode === 'mobile' ? 'bg-teal-700 text-white shadow-xs' : 'text-slate-400 hover:text-white'
                )}
              >
                <Smartphone size={15} />
                <span className="hidden sm:inline">Mobile</span>
              </button>
            </div>
          </div>
        </div>

        {/* Prototype Frame Container */}
        <div
          className={cn(
            'mx-auto transition-all duration-500 rounded-3xl bg-slate-950 border border-slate-800 shadow-2xl overflow-hidden relative',
            deviceMode === 'desktop' && 'w-full min-h-[660px]',
            deviceMode === 'tablet' && 'max-w-[780px] min-h-[680px] border-4 border-slate-700 ring-8 ring-slate-900',
            deviceMode === 'mobile' && 'max-w-[390px] min-h-[720px] border-4 border-slate-700 ring-8 ring-slate-900 rounded-[2.5rem]'
          )}
        >
          {/* Simulated App Header */}
          <div className="bg-slate-900 border-b border-slate-800 px-4 py-3 flex items-center justify-between text-xs text-slate-400">
            {/* Window Dots */}
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500/80" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="ml-2 font-mono text-[11px] text-slate-400 hidden sm:inline">
                https://dms.enterprise.internal/{activeTab}
              </span>
            </div>

            {/* Tenant badge */}
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-md bg-indigo-950 text-indigo-300 font-mono text-[10px] border border-indigo-800/60">
                Tenant: Global-Corp-Prod
              </span>
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
          </div>

          {/* Module 1: Document Vault */}
          {activeTab === 'documents' && (
            <div className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-5 min-h-[580px]">
              {/* Folder Navigation */}
              <div className="lg:col-span-3 bg-slate-900/90 rounded-2xl p-4 border border-slate-800/80">
                <div className="flex items-center justify-between mb-3 text-xs font-black uppercase tracking-wider text-slate-400">
                  <span>Folder Hierarchy</span>
                  <span className="text-[10px] text-indigo-400">5 Root</span>
                </div>
                <div className="space-y-1 text-sm">
                  {[
                    { id: 'legal', label: '01_Executive & Legal', count: 8 },
                    { id: 'finance', label: '02_Finance & Audit', count: 14 },
                    { id: 'governance', label: '03_Governance Policies', count: 6 },
                    { id: 'engineering', label: '04_Engineering & Arch', count: 21 },
                    { id: 'hr', label: '05_Human Resources', count: 9 }
                  ].map(f => (
                    <button
                      key={f.id}
                      onClick={() => setSelectedFolder(f.id)}
                      className={cn(
                        'w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left font-semibold text-xs sm:text-sm transition-all',
                        selectedFolder === f.id
                          ? 'bg-indigo-600 text-white'
                          : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                      )}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <Folder size={16} className={selectedFolder === f.id ? 'text-white' : 'text-indigo-400'} />
                        <span className="truncate">{f.label}</span>
                      </div>
                      <span className="text-[11px] opacity-70 px-1.5 py-0.5 rounded-md bg-black/20">{f.count}</span>
                    </button>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800">
                  <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/60 text-xs space-y-1.5">
                    <p className="font-bold text-slate-300 flex items-center gap-1.5">
                      <ShieldCheck size={14} className="text-emerald-400" />
                      Marking Sets Active
                    </p>
                    <p className="text-slate-400 text-[11px]">
                      Enforcing Top Secret, Confidential, and Restricted ACL rules across all S3 buckets.
                    </p>
                  </div>
                </div>
              </div>

              {/* Document List View */}
              <div className="lg:col-span-6 bg-slate-900/60 rounded-2xl p-4 border border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="font-bold text-white text-base">Repository Documents</h4>
                      <p className="text-xs text-slate-400">Click any document to inspect metadata and lock controls.</p>
                    </div>
                    <span className="text-xs font-mono bg-slate-800 text-slate-300 px-2 py-1 rounded-lg border border-slate-700">
                      {documentsState.length} Files
                    </span>
                  </div>

                  <div className="space-y-2.5 overflow-y-auto max-h-[420px] pr-1">
                    {documentsState.map(doc => {
                      const isSelected = selectedDocId === doc.id;
                      return (
                        <div
                          key={doc.id}
                          onClick={() => setSelectedDocId(doc.id)}
                          className={cn(
                            'p-3 sm:p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3',
                            isSelected
                              ? 'bg-slate-800/90 border-indigo-500 shadow-md ring-1 ring-indigo-500/50'
                              : 'bg-slate-950/50 border-slate-800/90 hover:border-slate-700 hover:bg-slate-800/40'
                          )}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="p-2 rounded-lg bg-indigo-950/70 text-indigo-400 border border-indigo-800/50 shrink-0">
                              <FileText size={20} />
                            </div>
                            <div className="min-w-0">
                              <p className="text-xs sm:text-sm font-bold text-white truncate">{doc.name}</p>
                              <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-400">
                                <span>{doc.size}</span>
                                <span>•</span>
                                <span className="font-mono">{doc.version}</span>
                                <span>•</span>
                                <span>{doc.updated}</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <span className={cn('text-[10px] font-black uppercase px-2 py-0.5 rounded-md border', doc.classificationColor)}>
                              {doc.classification}
                            </span>
                            {doc.isLocked && (
                              <span title={`Locked by ${doc.lockedBy}`} className="p-1 text-amber-400 bg-amber-950/50 rounded-md border border-amber-800/60">
                                <Lock size={13} />
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Quick actions bar */}
                <div className="pt-4 mt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs">
                  <span className="text-slate-400">Selected: <strong className="text-white">{selectedDoc.name}</strong></span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleDocLock(selectedDoc.id)}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold flex items-center gap-1.5 transition-colors"
                    >
                      {selectedDoc.isLocked ? <Unlock size={14} className="text-emerald-400" /> : <Lock size={14} className="text-amber-400" />}
                      <span>{selectedDoc.isLocked ? 'Check-In' : 'Check-Out (Lock)'}</span>
                    </button>
                    <button
                      onClick={() => setActiveTab('secure-viewer')}
                      className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold flex items-center gap-1.5 shadow-sm transition-colors"
                    >
                      <Eye size={14} />
                      <span>Secure View</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Document Inspector Details Panel */}
              <div className="lg:col-span-3 bg-slate-900/90 rounded-2xl p-4 border border-slate-800 text-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <span className="font-bold text-slate-300 uppercase tracking-wider text-[11px]">Metadata Inspector</span>
                  <span className="text-[10px] font-mono text-indigo-400">{selectedDoc.version}</span>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="text-slate-400 text-[10px] uppercase font-bold">Document Name</label>
                    <p className="font-bold text-white text-xs mt-0.5 break-all">{selectedDoc.name}</p>
                  </div>

                  <div>
                    <label className="text-slate-400 text-[10px] uppercase font-bold">Security Classification</label>
                    <div className="mt-1">
                      <span className={cn('inline-block text-[10px] font-black uppercase px-2 py-0.5 rounded-md border', selectedDoc.classificationColor)}>
                        {selectedDoc.classification}
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="text-slate-400 text-[10px] uppercase font-bold">Lock Status</label>
                    <p className="text-xs font-medium text-slate-300 mt-0.5 flex items-center gap-1.5">
                      {selectedDoc.isLocked ? (
                        <>
                          <Lock size={13} className="text-amber-400" />
                          <span>Locked by <strong className="text-amber-300">{selectedDoc.lockedBy}</strong></span>
                        </>
                      ) : (
                        <>
                          <Unlock size={13} className="text-emerald-400" />
                          <span>Available for Check-Out</span>
                        </>
                      )}
                    </p>
                  </div>

                  <div>
                    <label className="text-slate-400 text-[10px] uppercase font-bold">AI Summary</label>
                    <p className="text-[11px] text-slate-300 mt-1 leading-relaxed bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                      {selectedDoc.summary}
                    </p>
                  </div>

                  <div>
                    <label className="text-slate-400 text-[10px] uppercase font-bold">SHA-256 Checksum</label>
                    <p className="font-mono text-[10px] text-slate-400 mt-0.5 truncate bg-slate-950 px-2 py-1 rounded-md">
                      e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 space-y-2">
                  <button
                    onClick={() => setShowVersionDrawer(!showVersionDrawer)}
                    className="w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold flex items-center justify-between text-xs transition-colors"
                  >
                    <div className="flex items-center gap-1.5">
                      <GitBranch size={14} className="text-sky-400" />
                      <span>Version Tree</span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">3 revisions</span>
                  </button>

                  {showVersionDrawer && (
                    <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-[11px]">
                      <div className="flex items-center justify-between text-white font-bold">
                        <span>v3.2 (Current)</span>
                        <span className="text-emerald-400 text-[10px]">Active</span>
                      </div>
                      <div className="flex items-center justify-between text-slate-400">
                        <span>v3.1 (Approved)</span>
                        <button className="text-indigo-400 hover:underline text-[10px]">Diff</button>
                      </div>
                      <div className="flex items-center justify-between text-slate-400">
                        <span>v3.0 (Baseline)</span>
                        <button className="text-indigo-400 hover:underline text-[10px]">Rollback</button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Module 2: Case Management & SLA */}
          {activeTab === 'cases' && (
            <div className="p-4 sm:p-6 min-h-[580px] flex flex-col justify-between">
              <div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
                  <div>
                    <h4 className="font-bold text-white text-base">Case Management & Kanban Workflows</h4>
                    <p className="text-xs text-slate-400">
                      Track work items, dynamic stage lifecycles, and automated SLA countdown timers. Click "Advance" to move cards!
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <button
                      onClick={() => setActiveCaseFilter('all')}
                      className={cn('px-3 py-1.5 rounded-lg font-bold', activeCaseFilter === 'all' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300')}
                    >
                      All Cases ({cases.length})
                    </button>
                    <button
                      onClick={() => setActiveCaseFilter('urgent')}
                      className={cn('px-3 py-1.5 rounded-lg font-bold', activeCaseFilter === 'urgent' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300')}
                    >
                      Urgent Only
                    </button>
                  </div>
                </div>

                {/* Kanban Columns */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { id: 'intake', label: '1. Intake & Triage', color: 'border-slate-700' },
                    { id: 'investigation', label: '2. Investigation', color: 'border-sky-700' },
                    { id: 'legal', label: '3. Legal & Risk', color: 'border-amber-700' },
                    { id: 'completed', label: '4. Resolved & Closed', color: 'border-emerald-700' }
                  ].map(column => {
                    const columnCases = cases.filter(c => c.stage === column.id && (activeCaseFilter === 'all' || c.priority === 'Urgent'));
                    return (
                      <div key={column.id} className="bg-slate-900/80 rounded-2xl p-3.5 border border-slate-800 flex flex-col">
                        <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
                          <span className="font-bold text-xs text-slate-200">{column.label}</span>
                          <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 text-[10px] font-mono font-bold">
                            {columnCases.length}
                          </span>
                        </div>

                        <div className="space-y-3 min-h-[300px]">
                          {columnCases.map(c => (
                            <div
                              key={c.id}
                              className="p-3 bg-slate-950 rounded-xl border border-slate-800 hover:border-slate-700 transition-all shadow-xs space-y-2.5"
                            >
                              <div className="flex items-center justify-between text-[11px]">
                                <span className="font-mono text-indigo-400 font-bold">{c.id}</span>
                                <span
                                  className={cn(
                                    'px-2 py-0.5 rounded-md text-[10px] font-black uppercase',
                                    c.priority === 'Urgent' ? 'bg-rose-950 text-rose-300 border border-rose-800' :
                                    c.priority === 'High' ? 'bg-amber-950 text-amber-300 border border-amber-800' :
                                    'bg-slate-800 text-slate-300'
                                  )}
                                >
                                  {c.priority}
                                </span>
                              </div>

                              <h5 className="font-bold text-xs text-white leading-snug">{c.title}</h5>

                              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                                <span>{c.owner}</span>
                                <span
                                  className={cn(
                                    'flex items-center gap-1 font-mono font-semibold text-[10px]',
                                    c.slaStatus === 'danger' ? 'text-rose-400' :
                                    c.slaStatus === 'warning' ? 'text-amber-400' :
                                    c.slaStatus === 'completed' ? 'text-emerald-400' : 'text-sky-400'
                                  )}
                                >
                                  <Clock size={11} />
                                  <span>{c.slaRemaining}</span>
                                </span>
                              </div>

                              <button
                                onClick={() => advanceCase(c.id)}
                                className="w-full py-1.5 px-2 bg-slate-800/80 hover:bg-indigo-600 text-slate-300 hover:text-white rounded-lg text-[11px] font-bold flex items-center justify-center gap-1 transition-colors"
                              >
                                <span>Advance Stage</span>
                                <ArrowRight size={12} />
                              </button>
                            </div>
                          ))}

                          {columnCases.length === 0 && (
                            <div className="h-40 flex items-center justify-center text-xs text-slate-600 border border-dashed border-slate-800 rounded-xl">
                              No cases in this stage
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Case Stats Footer */}
              <div className="mt-6 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    Average Resolution: <strong>4.2 Hours</strong>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-indigo-400" />
                    SLA Compliance Rate: <strong>99.4%</strong>
                  </span>
                </div>
                <button
                  onClick={() => {
                    const newId = `CASE-2026-${Math.floor(Math.random() * 900 + 100)}`;
                    setCases(prev => [
                      {
                        id: newId,
                        title: 'Emergency Vendor Security Review',
                        stage: 'intake',
                        priority: 'Urgent',
                        slaRemaining: '4h 00m',
                        slaStatus: 'warning',
                        owner: 'Security Lead',
                        department: 'InfoSec'
                      },
                      ...prev
                    ]);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-all"
                >
                  + Dispatch New Case
                </button>
              </div>
            </div>
          )}

          {/* Module 3: BPM Visual Workflow Designer */}
          {activeTab === 'workflows' && (
            <div className="p-4 sm:p-6 min-h-[580px] flex flex-col justify-between">
              <div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
                  <div>
                    <h4 className="font-bold text-white text-base">Visual BPM Workflow Canvas</h4>
                    <p className="text-xs text-slate-400">
                      Multi-tenant BPM designer with AI copilot, conditional branching, and timer escalations.
                    </p>
                  </div>
                  <button
                    onClick={runWorkflowSimulation}
                    disabled={workflowSimulating}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 disabled:opacity-50 text-white text-xs font-bold rounded-xl shadow-lg transition-all"
                  >
                    <Play size={14} className={workflowSimulating ? 'animate-spin' : ''} />
                    <span>{workflowSimulating ? 'Simulating Execution...' : 'Run Live Workflow Simulation'}</span>
                  </button>
                </div>

                {/* Visual Flow Nodes Canvas */}
                <div className="bg-slate-900/90 rounded-2xl p-6 border border-slate-800 relative overflow-x-auto">
                  <div className="min-w-[680px] flex items-center justify-between relative py-12 px-4">
                    {/* Connecting line */}
                    <div className="absolute top-1/2 left-8 right-8 h-1 bg-slate-800 -translate-y-1/2 z-0" />

                    {[
                      { id: 'node-1', step: 1, title: 'Document Ingest', role: 'System Trigger', icon: FileText, desc: 'Incoming PDF or OCR scanned file' },
                      { id: 'node-2', step: 2, title: 'AI Extraction', role: 'Ollama / Gemini Model', icon: Sparkles, desc: 'Auto metadata extraction & tagging' },
                      { id: 'node-3', step: 3, title: 'Approval Matrix', role: 'Finance / Dept Lead', icon: CheckCircle2, desc: 'Conditional routing: Amount > $10K' },
                      { id: 'node-4', step: 4, title: 'Policy Attestation', role: 'Governance Officer', icon: ShieldCheck, desc: 'Regulatory attestation sign-off' },
                      { id: 'node-5', step: 5, title: 'Vault Archive & ERP', role: 'SAP / DynamoDB Sync', icon: Layers, desc: 'Encrypted S3 immutable storage' }
                    ].map(node => {
                      const isExecuted = activeWorkflowStep >= node.step;
                      const isCurrent = activeWorkflowStep === node.step;
                      const isSelected = selectedWorkflowNode === node.id;
                      const Icon = node.icon;

                      return (
                        <div
                          key={node.id}
                          onClick={() => setSelectedWorkflowNode(node.id)}
                          className={cn(
                            'relative z-10 flex flex-col items-center cursor-pointer group transition-all',
                            isSelected && 'scale-105'
                          )}
                        >
                          {/* Node Icon Box */}
                          <div
                            className={cn(
                              'w-14 h-14 rounded-2xl flex items-center justify-center border-2 transition-all shadow-lg',
                              isCurrent
                                ? 'bg-indigo-600 border-indigo-400 text-white ring-4 ring-indigo-500/30 animate-pulse'
                                : isExecuted
                                ? 'bg-emerald-600 border-emerald-400 text-white'
                                : 'bg-slate-950 border-slate-700 text-slate-400 group-hover:border-slate-500'
                            )}
                          >
                            <Icon size={22} />
                          </div>

                          {/* Node Labels */}
                          <div className="text-center mt-3 max-w-[110px]">
                            <span className="block font-bold text-xs text-white leading-tight">{node.title}</span>
                            <span className="block text-[10px] text-slate-400 mt-0.5">{node.role}</span>
                          </div>

                          {/* Step Badge */}
                          <div
                            className={cn(
                              'absolute -top-2 -right-1 w-5 h-5 rounded-full text-[10px] font-black flex items-center justify-center border',
                              isExecuted
                                ? 'bg-emerald-500 text-white border-emerald-300'
                                : 'bg-slate-800 text-slate-400 border-slate-700'
                            )}
                          >
                            {isExecuted ? '✓' : node.step}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Selected Node Properties Panel */}
                <div className="mt-5 p-4 rounded-2xl bg-slate-900 border border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-slate-400">Execution Mode</span>
                    <p className="font-bold text-white text-sm mt-0.5">Asynchronous RabbitMQ Worker</p>
                    <p className="text-slate-400 text-[11px] mt-1">Automatic retry policy with dead-letter queue.</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase text-slate-400">Escalation Timer</span>
                    <p className="font-bold text-amber-400 text-sm mt-0.5">48 Hours SLA</p>
                    <p className="text-slate-400 text-[11px] mt-1">Triggers secondary manager notification on breach.</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase text-slate-400">Plugin Webhook</span>
                    <p className="font-bold text-sky-400 text-sm mt-0.5">SAP ERP & CMIS REST API</p>
                    <p className="text-slate-400 text-[11px] mt-1">Payload digitally signed via HMAC-SHA256.</p>
                  </div>
                </div>
              </div>

              {/* Designer status footer */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span>Workflow Engine: <strong>Next.js 16 + BPMN 2.0 Compliant</strong></span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 size={13} /> Ready for deployment
                </span>
              </div>
            </div>
          )}

          {/* Module 4: Governance Studio & Attestation */}
          {activeTab === 'governance' && (
            <div className="p-4 sm:p-6 min-h-[580px] flex flex-col justify-between">
              <div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
                  <div>
                    <h4 className="font-bold text-white text-base">Governance Studio & Attestation Hub</h4>
                    <p className="text-xs text-slate-400">
                      Manage policy lifecycles, enforce mandatory employee attestations, and maintain compliance audits.
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 text-xs font-bold">
                    Overall Compliance: 99.2%
                  </span>
                </div>

                {/* Scorecards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                  {[
                    { label: 'SOC2 Type II', score: '100%', status: 'Fully Certified', color: 'text-emerald-400' },
                    { label: 'GDPR / Privacy', score: '98.5%', status: 'Compliant', color: 'text-emerald-400' },
                    { label: 'HIPAA Security', score: '97.2%', status: 'Audited', color: 'text-sky-400' },
                    { label: 'ISO 27001', score: '100%', status: 'Active Surveillance', color: 'text-emerald-400' }
                  ].map((card, i) => (
                    <div key={i} className="p-3.5 bg-slate-900 rounded-xl border border-slate-800">
                      <span className="text-[10px] uppercase font-bold text-slate-400">{card.label}</span>
                      <p className={cn('text-2xl font-black mt-1', card.color)}>{card.score}</p>
                      <span className="text-[10px] text-slate-400">{card.status}</span>
                    </div>
                  ))}
                </div>

                {/* Policy List & Interactive Attestation */}
                <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800 space-y-4">
                  <h5 className="font-bold text-xs uppercase tracking-wider text-slate-300">
                    Mandatory Enterprise Policies
                  </h5>

                  <div className="space-y-3">
                    {/* Policy Item 1 */}
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-white">Global Information Security Policy v4.0</span>
                          <span className="px-2 py-0.5 rounded-md bg-indigo-950 text-indigo-300 text-[10px] font-bold border border-indigo-800">
                            Annual Renewal
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1">
                          Covers password hygiene, device encryption, clean desk, and incident reporting.
                        </p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-slate-400">
                          <span>Attestation Rate: <strong className="text-white">{attestationCount} / 1,480 Employees (96%)</strong></span>
                          <span>Deadline: <strong>Oct 31, 2026</strong></span>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          if (!attestationSigned) {
                            setAttestationSigned(true);
                            setAttestationCount(prev => prev + 1);
                          }
                        }}
                        className={cn(
                          'px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center justify-center gap-1.5 shadow-sm',
                          attestationSigned
                            ? 'bg-emerald-600 text-white cursor-default'
                            : 'bg-indigo-600 hover:bg-indigo-500 text-white'
                        )}
                      >
                        {attestationSigned ? (
                          <>
                            <CheckCircle2 size={15} />
                            <span>Attested & Signed</span>
                          </>
                        ) : (
                          <>
                            <ShieldCheck size={15} />
                            <span>Sign Digital Attestation</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Policy Item 2 */}
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 opacity-90">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-white">Enterprise AI & Model Usage Guidelines</span>
                          <span className="px-2 py-0.5 rounded-md bg-amber-950 text-amber-300 text-[10px] font-bold border border-amber-800">
                            New Policy
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1">
                          Strict guidelines on zero-retention data transmission to external LLM endpoints.
                        </p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-slate-400">
                          <span>Attestation Rate: <strong className="text-white">1,210 / 1,480 (82%)</strong></span>
                        </div>
                      </div>
                      <span className="text-xs text-slate-400 px-3 py-1.5 bg-slate-900 rounded-lg shrink-0 text-center">
                        Attested on Sep 14
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span>Audit Logs: <strong>Immutable Write-Once S3 Glacier Storage</strong></span>
                <span>Export format: <strong>PDF & CSV Reports</strong></span>
              </div>
            </div>
          )}

          {/* Module 5: AI Workplace Assistant (RAG Chat) */}
          {activeTab === 'assistant' && (
            <div className="p-4 sm:p-6 min-h-[580px] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-gradient-to-tr from-indigo-600 to-sky-500 text-white shadow-md">
                      <Bot size={18} />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">Workplace RAG Assistant</h4>
                      <p className="text-[11px] text-slate-400">Connected to Enterprise Repository & Ollama/Bedrock LLMs</p>
                    </div>
                  </div>
                  <span className="text-[11px] px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>RAG Engine Online</span>
                  </span>
                </div>

                {/* Predefined prompt chips */}
                <div className="mb-4">
                  <span className="text-[11px] text-slate-400 font-semibold block mb-2">Try sample enterprise queries:</span>
                  <div className="flex flex-wrap gap-2">
                    {[
                      'What are the termination terms in the MSA?',
                      'Summarize SOC2 Type II compliance controls',
                      'How does the watermarked secure viewer work?'
                    ].map((p, i) => (
                      <button
                        key={i}
                        onClick={() => handleAiPrompt(p)}
                        className="text-xs px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-indigo-300 border border-slate-700/80 hover:border-indigo-500 transition-all text-left"
                      >
                        "{p}"
                      </button>
                    ))}
                  </div>
                </div>

                {/* Chat Messages Log */}
                <div className="space-y-3.5 max-h-[340px] overflow-y-auto pr-1">
                  {chatMessages.map((msg, i) => (
                    <div
                      key={i}
                      className={cn(
                        'flex gap-3 text-xs leading-relaxed max-w-[90%]',
                        msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''
                      )}
                    >
                      <div
                        className={cn(
                          'w-7 h-7 rounded-xl flex items-center justify-center shrink-0 text-white shadow-xs',
                          msg.sender === 'user' ? 'bg-indigo-600' : 'bg-slate-800 text-sky-400 border border-slate-700'
                        )}
                      >
                        {msg.sender === 'user' ? <User size={14} /> : <Bot size={14} />}
                      </div>

                      <div
                        className={cn(
                          'p-3.5 rounded-2xl',
                          msg.sender === 'user'
                            ? 'bg-indigo-600 text-white rounded-tr-none'
                            : 'bg-slate-900 text-slate-200 border border-slate-800 rounded-tl-none space-y-2'
                        )}
                      >
                        <p>{msg.text}</p>

                        {/* Verified Document Citations */}
                        {msg.sources && msg.sources.length > 0 && (
                          <div className="pt-2 border-t border-slate-800 space-y-1">
                            <span className="text-[10px] uppercase font-bold text-slate-400 block">Verified Citations:</span>
                            <div className="flex flex-wrap gap-1.5">
                              {msg.sources.map((src, idx) => (
                                <span
                                  key={idx}
                                  className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-950 text-sky-300 border border-slate-700"
                                >
                                  <FileText size={10} />
                                  <span>{src}</span>
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                  {isAiThinking && (
                    <div className="flex gap-3 text-xs text-slate-400 items-center">
                      <div className="w-7 h-7 rounded-xl bg-slate-800 text-sky-400 border border-slate-700 flex items-center justify-center">
                        <Bot size={14} />
                      </div>
                      <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
                        <span>Searching enterprise vector indices & generating cited response...</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Chat Input Box */}
              <form
                onSubmit={e => {
                  e.preventDefault();
                  handleAiPrompt(chatInput);
                }}
                className="pt-4 border-t border-slate-800 flex items-center gap-2"
              >
                <input
                  type="text"
                  value={chatInput}
                  onChange={e => setChatInput(e.target.value)}
                  placeholder="Ask a question about documents, policies, or contracts..."
                  className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
                <button
                  type="submit"
                  disabled={!chatInput.trim() || isAiThinking}
                  className="p-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-xl transition-all shadow-md"
                >
                  <Send size={15} />
                </button>
              </form>
            </div>
          )}

          {/* Module 6: Watermarked Secure Viewer */}
          {activeTab === 'secure-viewer' && (
            <div className="p-4 sm:p-6 min-h-[580px] flex flex-col justify-between">
              <div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
                  <div>
                    <h4 className="font-bold text-white text-base">Watermarked Secure Document Viewer</h4>
                    <p className="text-xs text-slate-400">
                      Zero-download DRM preview with dynamic forensic watermarks (user identity, IP address, and timestamp).
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400">Watermark Opacity:</span>
                    <input
                      type="range"
                      min={10}
                      max={50}
                      value={watermarkOpacity}
                      onChange={e => setWatermarkOpacity(Number(e.target.value))}
                      className="w-24 accent-indigo-500 cursor-pointer"
                    />
                    <span className="text-xs font-mono text-indigo-400">{watermarkOpacity}%</span>
                  </div>
                </div>

                {/* Simulated Document Canvas with Dynamic Watermark */}
                <div className="relative bg-white text-slate-900 rounded-2xl p-6 sm:p-8 shadow-inner overflow-hidden border border-slate-700 min-h-[360px] select-none">
                  {/* Dynamic Watermark Overlay (Repetitive Diagonals) */}
                  <div
                    className="absolute inset-0 pointer-events-none flex flex-wrap items-center justify-around gap-12 overflow-hidden transform -rotate-12 z-20"
                    style={{ opacity: watermarkOpacity / 100 }}
                  >
                    {[...Array(12)].map((_, idx) => (
                      <div key={idx} className="text-center font-mono font-black text-xs text-rose-600 tracking-wider">
                        CONFIDENTIAL • USER: azeez@enterprise.com • IP: 192.168.1.104 • 2026-09-20 • RESTRICTED
                      </div>
                    ))}
                  </div>

                  {/* Document Body Sample */}
                  <div className="relative z-10 max-w-2xl mx-auto space-y-4 text-xs font-serif leading-relaxed">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                      <span className="font-sans font-black text-rose-700 uppercase tracking-widest text-[11px]">
                        TOP SECRET // RESTRICTED ACCESS
                      </span>
                      <span className="text-slate-500 font-sans text-[10px]">DOC-ID: MSA-ENT-2026-v3.2</span>
                    </div>

                    <h3 className="text-lg font-bold font-sans text-slate-900 text-center py-2">
                      MASTER SERVICES AGREEMENT (ENTERPRISE EDITION)
                    </h3>

                    <p className="text-justify text-slate-800">
                      <strong>Section 9.1 Data Security & Encryption:</strong> The Provider shall maintain an information security program conforming to SOC2 Type II and ISO 27001 requirements. All data at rest within customer partitions shall be encrypted using AWS KMS-managed customer keys with AES-256 GCM encryption.
                    </p>

                    <p className="text-justify text-slate-800">
                      <strong>Section 14.3 Termination & Data Portability:</strong> Upon mutual termination, the Customer may initiate an automated cryptographic export of all document vaults, audit trails, and vector embeddings within 30 calendar days through the secure API gateway.
                    </p>
                  </div>
                </div>

                {/* DLP Alert Simulation Message */}
                {dlpAlert && (
                  <div className="mt-3 p-3 rounded-xl bg-rose-950/80 border border-rose-800 text-rose-200 text-xs flex items-center justify-between animate-in fade-in">
                    <div className="flex items-center gap-2">
                      <ShieldAlert size={16} className="text-rose-400" />
                      <span>{dlpAlert}</span>
                    </div>
                    <button onClick={() => setDlpAlert(null)} className="text-rose-400 hover:text-white">
                      <X size={14} />
                    </button>
                  </div>
                )}
              </div>

              {/* Security Actions */}
              <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setDlpAlert('DLP Violation Prevented: Right-click copy and clipboard extraction disabled by Policy Server.');
                      setTimeout(() => setDlpAlert(null), 4000);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold flex items-center gap-1.5"
                  >
                    <Copy size={13} />
                    <span>Simulate Copy Attempt</span>
                  </button>

                  <button
                    onClick={() => {
                      setDlpAlert('DLP Security Alert: Unauthorized print spooling intercepted. Event logged to SIEM audit trail.');
                      setTimeout(() => setDlpAlert(null), 4000);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold flex items-center gap-1.5"
                  >
                    <Printer size={13} />
                    <span>Simulate Print Attempt</span>
                  </button>
                </div>

                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <ShieldCheck size={14} /> Desktop Agent DLP: Active
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Prototype Navigation Tips for Mobile */}
        <div className="mt-6 text-center text-xs text-slate-400 sm:hidden">
          💡 Tap through the tabs above (Document Vault, Cases, BPM, Governance, AI Copilot, Secure Viewer) to test all modules.
        </div>
      </div>
    </div>
  );
}
