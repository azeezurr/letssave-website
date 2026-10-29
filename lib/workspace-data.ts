export type Classification = 'TOP SECRET' | 'CONFIDENTIAL' | 'RESTRICTED' | 'INTERNAL';

export interface VaultDocument {
  id: string;
  name: string;
  folder: 'legal' | 'finance' | 'governance' | 'engineering' | 'hr';
  classification: Classification;
  clearanceRank: number;
  version: string;
  history: string[];
  size: string;
  updated: string;
  summary: string;
  tags: string[];
  site: string;
  region: string;
  retention: string;
  pages: string[];
}

export const folders = [
  { id: 'legal', name: 'Legal' },
  { id: 'finance', name: 'Finance' },
  { id: 'governance', name: 'Governance' },
  { id: 'engineering', name: 'Engineering' },
  { id: 'hr', name: 'People' },
] as const;

export const colleagues = [
  { name: 'Sarah Connor', role: 'Legal counsel', clearance: 4, clearanceLabel: 'Top Secret' },
  { name: 'Mei Lin', role: 'Quality lead', clearance: 3, clearanceLabel: 'Confidential' },
  { name: 'Dev Patel', role: 'Finance analyst', clearance: 2, clearanceLabel: 'Restricted' },
  { name: 'Noah Idris', role: 'Plant supervisor', clearance: 1, clearanceLabel: 'Internal' },
];

export const currentUser = {
  name: 'Aisha Rahman',
  role: 'Records administrator',
  email: 'aisha.rahman@northwind.example',
  address: '10.4.18.22',
};

export const documents: VaultDocument[] = [
  {
    id: 'msa',
    name: 'Master service agreement v3.2.pdf',
    folder: 'legal',
    classification: 'TOP SECRET',
    clearanceRank: 4,
    version: 'v3.2',
    history: ['v3.2', 'v3.1', 'v3.0'],
    size: '4.2 MB',
    updated: '12 minutes ago',
    summary: 'Liability, residency, and breach terms for the enterprise services agreement.',
    tags: ['contract', 'residency'],
    site: 'Panvel headquarters',
    region: 'India',
    retention: 'Contract life + 7 years',
    pages: [
      'Parties, effective date, and the regions where records may be stored.',
      'Breach notice window and the liability cap for each service line.',
      'Signature blocks and the schedule of subprocessors.',
    ],
  },
  {
    id: 'audit',
    name: 'FY26 Q3 financial audit.xlsx',
    folder: 'finance',
    classification: 'CONFIDENTIAL',
    clearanceRank: 3,
    version: 'v2.0',
    history: ['v2.0', 'v1.4'],
    size: '2.1 MB',
    updated: '1 hour ago',
    summary: 'Balance sheet, tax provision, and the variance commentary for the quarter.',
    tags: ['audit', 'finance'],
    site: 'Mumbai finance hub',
    region: 'India',
    retention: '8 years',
    pages: ['Consolidated balances.', 'Tax provision roll-forward.', 'Open items for the partner review.'],
  },
  {
    id: 'soc2',
    name: 'SOC 2 evidence pack.pdf',
    folder: 'governance',
    classification: 'RESTRICTED',
    clearanceRank: 2,
    version: 'v4.1',
    history: ['v4.1', 'v4.0'],
    size: '9.8 MB',
    updated: 'Yesterday',
    summary: 'Access reviews, key rotation, and the sample of privileged actions for the period.',
    tags: ['soc2', 'evidence'],
    site: 'Hyderabad control room',
    region: 'India',
    retention: 'Audit period + 3 years',
    pages: ['Control list.', 'Sample of access reviews.', 'Key ceremony notes.'],
  },
  {
    id: 'policy',
    name: 'Information security policy v4.docx',
    folder: 'governance',
    classification: 'INTERNAL',
    clearanceRank: 1,
    version: 'v4.0',
    history: ['v4.0', 'v3.2'],
    size: '1.4 MB',
    updated: '3 days ago',
    summary: 'Clean desk, device handling, and the rule for moving records outside the vault.',
    tags: ['policy'],
    site: 'Panvel headquarters',
    region: 'India',
    retention: 'Until superseded + 3 years',
    pages: ['Purpose and scope.', 'Classification handling.', 'Leaver checklist.'],
  },
  {
    id: 'drawing',
    name: 'Plant line 4 layout.dwg',
    folder: 'engineering',
    classification: 'TOP SECRET',
    clearanceRank: 4,
    version: 'v1.5',
    history: ['v1.5', 'v1.4'],
    size: '8.4 MB',
    updated: '18 Sep 2026',
    summary: 'Current approved layout for line 4, including the scanner intake added this quarter.',
    tags: ['cad', 'plant'],
    site: 'Pune plant',
    region: 'India',
    retention: 'Life of asset',
    pages: ['Title block and revision.', 'Line 4 plan.', 'Scanner intake detail.'],
  },
  {
    id: 'hr-file',
    name: 'Retention schedule — people records.pdf',
    folder: 'hr',
    classification: 'CONFIDENTIAL',
    clearanceRank: 3,
    version: 'v1.1',
    history: ['v1.1', 'v1.0'],
    size: '860 KB',
    updated: 'Last week',
    summary: 'How long employment files, attestations, and grievance cases are kept.',
    tags: ['retention', 'hr'],
    site: 'Panvel headquarters',
    region: 'India',
    retention: 'Policy life',
    pages: ['Series list.', 'Hold rules.', 'Disposition owner.'],
  },
];

export interface WorkCase {
  id: string;
  title: string;
  stage: 'Intake' | 'Investigation' | 'Review' | 'Resolved';
  priority: 'Urgent' | 'High' | 'Normal';
  slaLabel: string;
  slaState: 'On track' | 'At risk' | 'Breached' | 'Met';
  owner: string;
  department: string;
  checklist: string[];
}

export const cases: WorkCase[] = [
  {
    id: 'CASE-2026-892',
    title: 'Vendor SOC 2 non-compliance inquiry',
    stage: 'Investigation',
    priority: 'Urgent',
    slaLabel: '2h 15m remaining',
    slaState: 'At risk',
    owner: 'Sarah Connor',
    department: 'Legal',
    checklist: ['Collect the vendor report', 'Compare exceptions to our controls', 'Draft the counsel note'],
  },
  {
    id: 'CASE-2026-895',
    title: 'New tenant provisioning',
    stage: 'Intake',
    priority: 'High',
    slaLabel: '6h 30m remaining',
    slaState: 'On track',
    owner: 'Platform lead',
    department: 'Infrastructure',
    checklist: ['Confirm residency', 'Map directory groups', 'Issue the workspace'],
  },
  {
    id: 'CASE-2026-889',
    title: 'Cross-border transfer assessment',
    stage: 'Review',
    priority: 'Urgent',
    slaLabel: '1h 05m remaining',
    slaState: 'Breached',
    owner: 'Privacy officer',
    department: 'Governance',
    checklist: ['Name the regions', 'Record the lawful basis', 'Obtain legal sign-off'],
  },
  {
    id: 'CASE-2026-880',
    title: 'Annual HR retention audit',
    stage: 'Resolved',
    priority: 'Normal',
    slaLabel: 'Met with 4 days spare',
    slaState: 'Met',
    owner: 'People director',
    department: 'People',
    checklist: ['Sample 25 files', 'Confirm holds', 'File the certificate'],
  },
];

export const archiveRecords = [
  { id: 'AR-1044', title: 'Trade confirmations — March 2024', series: 'Books and records', expires: '12 Mar 2031', hold: true, eligible: false },
  { id: 'AR-1102', title: 'Board minutes 2019', series: 'Corporate records', expires: '01 Jun 2026', hold: false, eligible: true },
  { id: 'AR-1188', title: 'Clinical study consent scans', series: 'Health records', expires: '30 Nov 2036', hold: false, eligible: false },
  { id: 'AR-1210', title: 'Vendor invoices FY22', series: 'Finance', expires: '31 Mar 2030', hold: false, eligible: false },
];

export const policies = [
  { id: 'POL-14', title: 'Information security policy', status: 'Published', renewal: '12 Jan 2027', signed: 1420, population: 1480 },
  { id: 'POL-22', title: 'Records retention standard', status: 'Legal review', renewal: '04 Apr 2026', signed: 0, population: 1480 },
  { id: 'POL-07', title: 'Acceptable use', status: 'Published', renewal: '19 Aug 2026', signed: 1311, population: 1480 },
];

export function classificationTone(level: Classification) {
  if (level === 'TOP SECRET') return 'bg-rose-600 text-white';
  if (level === 'CONFIDENTIAL') return 'bg-blue-700 text-white';
  if (level === 'RESTRICTED') return 'bg-amber-500 text-slate-950';
  return 'bg-emerald-700 text-white';
}
