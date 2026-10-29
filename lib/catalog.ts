export type FeatureCategory =
  | 'vault'
  | 'archiving'
  | 'paperless'
  | 'cases'
  | 'bpm'
  | 'governance'
  | 'ai'
  | 'security'
  | 'platform';

export type DemoTab = 'documents' | 'cases' | 'workflows' | 'governance' | 'assistant' | 'secure-viewer';

export type IconName =
  | 'archive'
  | 'scan'
  | 'git-branch'
  | 'folder-tree'
  | 'upload'
  | 'lock'
  | 'activity'
  | 'clock'
  | 'workflow'
  | 'sparkles'
  | 'shield'
  | 'check'
  | 'bot'
  | 'search'
  | 'eye'
  | 'key'
  | 'map-pin'
  | 'layout'
  | 'share'
  | 'file-text';

export interface Feature {
  slug: string;
  category: FeatureCategory;
  categoryLabel: string;
  title: string;
  summary: string;
  badge: string;
  icon: IconName;
  demoTab: DemoTab;
  workspaceHref: string;
  tags: string[];
  outcomes: string[];
  steps: { title: string; detail: string }[];
}

export interface Industry {
  slug: string;
  name: string;
  icon: IconName;
  headline: string;
  summary: string;
  pains: string[];
  outcomes: string[];
  featureSlugs: string[];
}

export interface PricingTier {
  id: string;
  name: string;
  audience: string;
  summary: string;
  recommended?: boolean;
  cta: string;
  includes: string[];
}

export interface ResourceArticle {
  slug: string;
  title: string;
  category: 'Whitepaper' | 'Regulatory Guide' | 'Practitioner Guide' | 'Developer Hub';
  minutes: string;
  summary: string;
  sections: { heading: string; body: string }[];
}

export const categories: { id: FeatureCategory | 'all'; label: string }[] = [
  { id: 'all', label: 'All capabilities' },
  { id: 'vault', label: 'Document vault' },
  { id: 'archiving', label: 'Compliant archiving' },
  { id: 'paperless', label: 'Paperless initiative' },
  { id: 'cases', label: 'Case management' },
  { id: 'bpm', label: 'BPM workflows' },
  { id: 'governance', label: 'Governance & policy' },
  { id: 'ai', label: 'AI & knowledge' },
  { id: 'security', label: 'Security & DLP' },
  { id: 'platform', label: 'Platform' },
];

export const features: Feature[] = [
  {
    slug: 'worm-archiving',
    category: 'archiving',
    categoryLabel: 'Compliant archiving',
    title: 'WORM immutable storage & legal hold',
    summary:
      'Write-once-read-many regulatory archiving that blocks modification or deletion until a statutory retention period expires.',
    badge: 'WORM compliant',
    icon: 'archive',
    demoTab: 'governance',
    workspaceHref: '/archive',
    tags: ['archiving', 'worm', 'retention', 'legal hold', 'sec 17a-4', 'finra'],
    outcomes: [
      'SEC 17a-4, FINRA, HIPAA, and GDPR retention schedules',
      'Instant legal-hold freeze during active litigation',
      'Cryptographic audit trail on every archived record',
    ],
    steps: [
      { title: 'Declare a retention class', detail: 'Map each record type to a statutory schedule with an expiry date and a legal owner.' },
      { title: 'Seal the object', detail: 'The archive writes the file, its hash, and the policy into immutable storage.' },
      { title: 'Hold or expire', detail: 'Counsel can freeze a record. Everyone else waits until the clock and the hold both clear.' },
    ],
  },
  {
    slug: 'paperless-scanning',
    category: 'paperless',
    categoryLabel: 'Paperless initiative',
    title: 'Legacy paper digitisation & batch scanning',
    summary:
      'Turn warehouse filing rooms into a searchable repository with high-speed capture and multilingual OCR.',
    badge: 'Paperless transformation',
    icon: 'scan',
    demoTab: 'documents',
    workspaceHref: '/documents',
    tags: ['paperless', 'digitisation', 'scanning', 'ocr', 'esg'],
    outcomes: [
      'High-speed batch scanner integration',
      'OCR and ICR for printed and handwritten records',
      'Removal of physical filing and courier loops',
    ],
    steps: [
      { title: 'Capture', detail: 'Operators scan batches or drop image folders into a watched intake.' },
      { title: 'Read', detail: 'OCR extracts text, dates, and parties, then proposes a folder and a classification.' },
      { title: 'File', detail: 'Reviewed pages land in the vault with a full-text index and a disposition date.' },
    ],
  },
  {
    slug: 'version-control',
    category: 'vault',
    categoryLabel: 'Document vault',
    title: 'Version control & check-in / check-out',
    summary:
      'Revision trees with semantic history and exclusive check-out locks so two editors never overwrite each other.',
    badge: 'Core DMS',
    icon: 'git-branch',
    demoTab: 'documents',
    workspaceHref: '/documents',
    tags: ['versioning', 'rollback', 'check-out', 'lock', 'diff'],
    outcomes: [
      'One-click rollback to any historic version',
      'Exclusive check-out with the editor’s name on the file',
      'Side-by-side revision history for audit',
    ],
    steps: [
      { title: 'Check out', detail: 'The file locks to one person. Others can read, not replace.' },
      { title: 'Revise', detail: 'A new version stores the prior bytes, the author, and a note.' },
      { title: 'Restore', detail: 'Records managers roll back without losing the later draft.' },
    ],
  },
  {
    slug: 'folder-hierarchy',
    category: 'vault',
    categoryLabel: 'Document vault',
    title: 'Departmental spaces & nested hierarchy',
    summary:
      'Hierarchical folders with inherited permissions, departmental workspaces, and metadata filing.',
    badge: 'Multi-workspace',
    icon: 'folder-tree',
    demoTab: 'documents',
    workspaceHref: '/documents',
    tags: ['folder', 'department', 'hierarchy', 'acl'],
    outcomes: [
      'Isolated spaces for Legal, HR, Finance, and Engineering',
      'Permissions inherited down the folder tree',
      'Tag-based collections that cut across folders',
    ],
    steps: [
      { title: 'Create a space', detail: 'Each department gets a root with its own owners.' },
      { title: 'Inherit access', detail: 'Subfolders take the parent ACL unless a record is marked stricter.' },
      { title: 'File by meaning', detail: 'Tags and metadata keep related records together when the tree is not enough.' },
    ],
  },
  {
    slug: 'batch-ingestion',
    category: 'vault',
    categoryLabel: 'Document vault',
    title: 'Batch ingestion & format conversion',
    summary:
      'Drag-and-drop batch upload with OCR and conversion across office, PDF, and CAD formats.',
    badge: 'High speed',
    icon: 'upload',
    demoTab: 'documents',
    workspaceHref: '/documents',
    tags: ['upload', 'ocr', 'conversion', 'pdf', 'cad'],
    outcomes: [
      'Parallel multi-part upload streams',
      'Conversion for PDF, Office, and CAD originals',
      'OCR text extracted from scanned images',
    ],
    steps: [
      { title: 'Drop a batch', detail: 'Users or an API send many files in one intake.' },
      { title: 'Normalise', detail: 'The pipeline converts what it can and keeps the original beside the rendition.' },
      { title: 'Index', detail: 'Extracted text is available to search and to the assistant within the same job.' },
    ],
  },
  {
    slug: 'marking-sets',
    category: 'security',
    categoryLabel: 'Security & access',
    title: 'Security classification marking sets',
    summary:
      'Apply Top Secret, Confidential, Restricted, and Internal markings, then enforce them against a person’s clearance.',
    badge: 'Classification',
    icon: 'lock',
    demoTab: 'documents',
    workspaceHref: '/documents',
    tags: ['classification', 'top secret', 'confidential', 'marking'],
    outcomes: [
      'Clearance checked before a file opens',
      'Marking stored as signed metadata',
      'Banner and watermark shown on every page',
    ],
    steps: [
      { title: 'Mark', detail: 'Authors or a policy rule set the classification at ingest.' },
      { title: 'Gate', detail: 'A reader without clearance sees the title, not the bytes.' },
      { title: 'Display', detail: 'The viewer prints the marking as a banner so it cannot be cropped away unnoticed.' },
    ],
  },
  {
    slug: 'case-lifecycles',
    category: 'cases',
    categoryLabel: 'Case management',
    title: 'Structured cases & stage lifecycles',
    summary:
      'Turn unstructured requests into cases with stages, required documents, and a chronological audit log.',
    badge: 'Structured work',
    icon: 'activity',
    demoTab: 'cases',
    workspaceHref: '/cases',
    tags: ['cases', 'stages', 'checklist', 'lifecycle'],
    outcomes: [
      'Stage gates from intake through resolution',
      'Mandatory document checklist on each stage',
      'Chronological audit of every case event',
    ],
    steps: [
      { title: 'Open', detail: 'A request becomes a case with an owner, a priority, and a template.' },
      { title: 'Advance', detail: 'The next stage stays locked until the checklist is complete.' },
      { title: 'Close', detail: 'Resolution writes the outcome and freezes the activity log.' },
    ],
  },
  {
    slug: 'sla-engine',
    category: 'cases',
    categoryLabel: 'Case management',
    title: 'SLA timers & supervisor escalation',
    summary:
      'Countdown clocks with warning thresholds that route a case to a senior queue when a deadline is at risk.',
    badge: 'SLA engine',
    icon: 'clock',
    demoTab: 'cases',
    workspaceHref: '/cases',
    tags: ['sla', 'timer', 'escalation', 'deadlines'],
    outcomes: [
      'Remaining time shown in hours and minutes',
      'Colour plus label warnings as deadlines approach',
      'Automatic routing to managers on breach',
    ],
    steps: [
      { title: 'Start the clock', detail: 'The template sets a target from the moment the case is accepted.' },
      { title: 'Warn', detail: 'Amber and critical states appear before the deadline, not after.' },
      { title: 'Escalate', detail: 'A breach moves the case to the supervisor queue and records who was notified.' },
    ],
  },
  {
    slug: 'visual-bpm',
    category: 'bpm',
    categoryLabel: 'BPM workflows',
    title: 'Visual BPM designer',
    summary:
      'A BPMN-style canvas for approvals, timers, and conditional splits such as invoices above a threshold.',
    badge: 'Visual BPM',
    icon: 'workflow',
    demoTab: 'workflows',
    workspaceHref: '/workflows',
    tags: ['workflow', 'bpm', 'designer', 'approval'],
    outcomes: [
      'Node canvas for tasks, gates, and timers',
      'Conditional routing, including value thresholds',
      'Digital sign-off gates inside the flow',
    ],
    steps: [
      { title: 'Model', detail: 'Place intake, review, approval, and archive nodes on the canvas.' },
      { title: 'Branch', detail: 'A condition sends high-value items to finance and the rest to the manager.' },
      { title: 'Run', detail: 'The simulator walks the path so stakeholders can see who acts next.' },
    ],
  },
  {
    slug: 'ai-workflow-copilot',
    category: 'bpm',
    categoryLabel: 'BPM workflows',
    title: 'AI workflow synthesis',
    summary:
      'Describe an approval flow in plain language and generate the BPM graph, roles, and connections.',
    badge: 'AI copilot',
    icon: 'sparkles',
    demoTab: 'workflows',
    workspaceHref: '/workflows',
    tags: ['ai workflow', 'copilot', 'synthesis'],
    outcomes: [
      'Natural language turned into a node graph',
      'Roles suggested on each gate',
      'A draft the process owner can still edit',
    ],
    steps: [
      { title: 'Describe', detail: 'Write the policy the way you would explain it to a new colleague.' },
      { title: 'Generate', detail: 'The copilot proposes nodes, edges, and owners.' },
      { title: 'Confirm', detail: 'A human publishes the flow. The assistant does not activate it alone.' },
    ],
  },
  {
    slug: 'policy-lifecycle',
    category: 'governance',
    categoryLabel: 'Governance & policy',
    title: 'Policy lifecycle & renewal tracking',
    summary:
      'Govern policies from draft and legal review through publication and the next annual renewal.',
    badge: 'Compliance',
    icon: 'shield',
    demoTab: 'governance',
    workspaceHref: '/governance',
    tags: ['policy', 'governance', 'renewal', 'legal'],
    outcomes: [
      'Draft, legal review, and published stages',
      'Annual renewal reminders',
      'Legal hold that blocks deletion of the controlling policy',
    ],
    steps: [
      { title: 'Draft', detail: 'Owners write the policy in the vault with a classification.' },
      { title: 'Review', detail: 'Legal must sign before the policy can be published to staff.' },
      { title: 'Renew', detail: 'The schedule opens the next review before the current version lapses.' },
    ],
  },
  {
    slug: 'employee-attestation',
    category: 'governance',
    categoryLabel: 'Governance & policy',
    title: 'Employee attestations & scorecards',
    summary:
      'Send a policy to staff and track who has read and signed, by person and by department.',
    badge: 'Attestation hub',
    icon: 'check',
    demoTab: 'governance',
    workspaceHref: '/governance',
    tags: ['attestation', 'signature', 'scorecard'],
    outcomes: [
      'Timestamped digital sign-off',
      'Completion meters by department',
      'Audit certificates for regulators',
    ],
    steps: [
      { title: 'Assign', detail: 'Choose the policy and the population that must attest.' },
      { title: 'Sign', detail: 'Each person confirms they have read the current version.' },
      { title: 'Report', detail: 'Outstanding names stay visible until the scorecard is complete.' },
    ],
  },
  {
    slug: 'rag-assistant',
    category: 'ai',
    categoryLabel: 'AI knowledge',
    title: 'Enterprise assistant with citations',
    summary:
      'Ask questions across the vault and receive answers that point back to the page they came from.',
    badge: 'Cited answers',
    icon: 'bot',
    demoTab: 'assistant',
    workspaceHref: '/ai-hub',
    tags: ['rag', 'chat', 'citations', 'assistant'],
    outcomes: [
      'Page-level source citations',
      'Sovereign inference options with no training on your text',
      'Cross-document questions on contracts and policies',
    ],
    steps: [
      { title: 'Ask', detail: 'The question is scoped to repositories the user is cleared to read.' },
      { title: 'Retrieve', detail: 'Hybrid search pulls the passages most likely to answer it.' },
      { title: 'Cite', detail: 'The reply names the file and the page so a reviewer can open the source.' },
    ],
  },
  {
    slug: 'global-search',
    category: 'ai',
    categoryLabel: 'AI knowledge',
    title: 'Hybrid keyword and semantic search',
    summary:
      'Combine exact full-text matching with semantic search, then filter by department, date, and classification.',
    badge: 'Sub-second search',
    icon: 'search',
    demoTab: 'assistant',
    workspaceHref: '/ai-hub',
    tags: ['search', 'vector', 'semantic', 'hybrid'],
    outcomes: [
      'Keyword and meaning search together',
      'Filters for metadata, date, department, and marking',
      'A short summary beside the hit list',
    ],
    steps: [
      { title: 'Query', detail: 'Type a clause, a party name, or a question.' },
      { title: 'Filter', detail: 'Narrow by space and classification before opening a file.' },
      { title: 'Open', detail: 'Results launch in the secure viewer when the marking allows it.' },
    ],
  },
  {
    slug: 'ai-summarization',
    category: 'ai',
    categoryLabel: 'AI knowledge',
    title: 'Summaries, extraction & smart tags',
    summary:
      'Produce a readable summary, pull key fields, and suggest tags when a document arrives.',
    badge: 'Document intelligence',
    icon: 'sparkles',
    demoTab: 'assistant',
    workspaceHref: '/ai-hub',
    tags: ['summary', 'extraction', 'tagging'],
    outcomes: [
      'Executive summary on the file record',
      'Extracted parties, dates, and amounts',
      'Suggested tags a librarian can accept or reject',
    ],
    steps: [
      { title: 'Read', detail: 'After OCR, the model reads only the text the user could read.' },
      { title: 'Propose', detail: 'Summary, fields, and tags are suggestions, not silent edits.' },
      { title: 'Accept', detail: 'A person confirms tags before they drive retention or routing.' },
    ],
  },
  {
    slug: 'watermarked-viewer',
    category: 'security',
    categoryLabel: 'Secure viewer',
    title: 'Watermarked viewer & anti-leak controls',
    summary:
      'A zero-download browser viewer that stamps each page with the reader’s identity, address, and time.',
    badge: 'Anti-leak',
    icon: 'eye',
    demoTab: 'secure-viewer',
    workspaceHref: '/viewer',
    tags: ['watermark', 'viewer', 'drm', 'dlp'],
    outcomes: [
      'Diagonal watermark with email, network address, and time',
      'Download and print blocked by the viewing policy',
      'Rights checked again each time the file opens',
    ],
    steps: [
      { title: 'Open in browser', detail: 'The original file stays in storage. The reader gets a rendition.' },
      { title: 'Stamp', detail: 'Every page carries who opened it and when.' },
      { title: 'Restrict', detail: 'Print and download stay off unless a policy explicitly allows them.' },
    ],
  },
  {
    slug: 'identity-scim',
    category: 'security',
    categoryLabel: 'Security & access',
    title: 'SSO, SCIM & directory sync',
    summary:
      'Sign-on and provisioning for Microsoft Entra ID, Okta, PingFederate, and Active Directory.',
    badge: 'Enterprise identity',
    icon: 'key',
    demoTab: 'documents',
    workspaceHref: '/security',
    tags: ['sso', 'scim', 'saml', 'oidc', 'active directory'],
    outcomes: [
      'SAML 2.0 and OpenID Connect single sign-on',
      'User and group provisioning with SCIM',
      'Kerberos for Windows-integrated networks',
    ],
    steps: [
      { title: 'Connect the directory', detail: 'Point LetsSave at the identity provider your staff already use.' },
      { title: 'Map groups', detail: 'Directory groups become vault roles and clearance levels.' },
      { title: 'Remove access', detail: 'When a person leaves, SCIM closes their sessions and check-outs.' },
    ],
  },
  {
    slug: 'geo-tagging',
    category: 'platform',
    categoryLabel: 'Platform',
    title: 'Geo tagging & location context',
    summary:
      'Record where a document was captured so teams can search by site, region, or facility.',
    badge: 'Location',
    icon: 'map-pin',
    demoTab: 'documents',
    workspaceHref: '/documents',
    tags: ['geo', 'map', 'location', 'site'],
    outcomes: [
      'Site and region stored on the record',
      'Search and filter by location',
      'A clear location label beside the file, not colour alone',
    ],
    steps: [
      { title: 'Capture location', detail: 'Scanning stations and mobile capture attach a site name.' },
      { title: 'Review', detail: 'Librarians can correct a site before the record is filed.' },
      { title: 'Find', detail: 'Search “Panvel warehouse” or filter the vault by region.' },
    ],
  },
  {
    slug: 'smart-dashboard',
    category: 'platform',
    categoryLabel: 'Platform',
    title: 'Operations command centre',
    summary:
      'One screen for volume, approvals, SLA risk, storage, and the work that needs a person today.',
    badge: 'Command centre',
    icon: 'layout',
    demoTab: 'documents',
    workspaceHref: '/dashboard',
    tags: ['dashboard', 'analytics', 'approvals'],
    outcomes: [
      'Live counts for documents, approvals, and breaches',
      'SLA risks listed with owner and time remaining',
      'Storage and attestation progress on the same page',
    ],
    steps: [
      { title: 'Land', detail: 'The home view opens on exceptions, not on a vanity chart.' },
      { title: 'Drill in', detail: 'Each figure links to the vault, the case, or the policy behind it.' },
      { title: 'Act', detail: 'Approvals and holds can be opened without a second search.' },
    ],
  },
  {
    slug: 'team-collaboration',
    category: 'platform',
    categoryLabel: 'Platform',
    title: 'Sharing, comments & approvals',
    summary:
      'Share a record inside its permission boundary, comment on a version, and collect an approval.',
    badge: 'Collaboration',
    icon: 'share',
    demoTab: 'documents',
    workspaceHref: '/documents',
    tags: ['sharing', 'comments', 'approval'],
    outcomes: [
      'Share only with people who already have clearance',
      'Comments attached to a specific version',
      'Approval recorded on the audit log',
    ],
    steps: [
      { title: 'Share', detail: 'Pick a colleague. The system refuses the share if their clearance is too low.' },
      { title: 'Comment', detail: 'Notes stay with the version they refer to.' },
      { title: 'Approve', detail: 'The decision, the person, and the time are stored with the case or the file.' },
    ],
  },
];

export const industries: Industry[] = [
  {
    slug: 'legal',
    name: 'Legal & professional services',
    icon: 'shield',
    headline: 'Matter files that stay complete, privileged, and findable.',
    summary:
      'Law firms and in-house teams use LetsSave to hold matter documents, run reviews, and produce an audit trail without mailing PDFs around.',
    pains: ['Version chaos on agreements', 'Privilege leaks through uncontrolled downloads', 'Retention that depends on a shared drive'],
    outcomes: ['Matter workspaces with check-out locks', 'Watermarked review for outside counsel', 'Legal hold that survives a cleanup project'],
    featureSlugs: ['version-control', 'watermarked-viewer', 'case-lifecycles', 'worm-archiving'],
  },
  {
    slug: 'healthcare',
    name: 'Healthcare & life sciences',
    icon: 'activity',
    headline: 'Clinical and operational records with a clearance on every open.',
    summary:
      'Hospitals and research groups separate patient-adjacent records, prove who viewed them, and keep retention aligned with health-privacy rules.',
    pains: ['Shared inboxes for patient files', 'No record of who opened a scan', 'Policies staff never actually sign'],
    outcomes: ['Classification banners on clinical records', 'View-only renditions with identity watermarks', 'Attestation for privacy and security policies'],
    featureSlugs: ['marking-sets', 'watermarked-viewer', 'employee-attestation', 'policy-lifecycle'],
  },
  {
    slug: 'manufacturing',
    name: 'Manufacturing & operations',
    icon: 'workflow',
    headline: 'Plant records, quality cases, and drawings in one controlled flow.',
    summary:
      'Quality, maintenance, and engineering share a vault so a drawing, a deviation, and the approval that closed it stay linked.',
    pains: ['Paper travellers on the shop floor', 'Drawings checked out in email', 'SLA dates tracked on spreadsheets'],
    outcomes: ['Batch scanning of legacy quality files', 'Cases with clocks for deviations', 'CAD originals kept beside the PDF rendition'],
    featureSlugs: ['paperless-scanning', 'sla-engine', 'batch-ingestion', 'visual-bpm'],
  },
  {
    slug: 'engineering',
    name: 'Engineering & infrastructure',
    icon: 'folder-tree',
    headline: 'Controlled drawings, site evidence, and review chains.',
    summary:
      'Engineering teams file CAD and specifications by project and site, then route transmittals through a visible approval path.',
    pains: ['Unmarked superseded drawings', 'Site photos with no place attached', 'Approvals lost in chat threads'],
    outcomes: ['Revision history on every drawing', 'Geo tags for site capture', 'BPM routes for transmittal approval'],
    featureSlugs: ['version-control', 'geo-tagging', 'visual-bpm', 'folder-hierarchy'],
  },
  {
    slug: 'finance',
    name: 'Financial services',
    icon: 'lock',
    headline: 'Books, records, and surveillance files that cannot be quietly edited.',
    summary:
      'Banks, brokers, and insurers keep regulated records under WORM retention, with identity controls and a search path for examinations.',
    pains: ['Records that can still be overwritten', 'Examiners asking for a trail you cannot produce', 'Staff accounts that linger after exit'],
    outcomes: ['Immutable archive for books and records', 'SSO and same-day deprovisioning', 'Cited answers across policy and contract sets'],
    featureSlugs: ['worm-archiving', 'identity-scim', 'rag-assistant', 'global-search'],
  },
  {
    slug: 'government',
    name: 'Government & public sector',
    icon: 'key',
    headline: 'Sovereign deployment for records that must never leave the building.',
    summary:
      'Agencies run LetsSave on premises or fully disconnected, with classification markings and a citizen-case clock they can explain.',
    pains: ['Cloud tools that conflict with residency rules', 'Unclassified copies of sensitive files', 'Case backlogs with no visible deadline'],
    outcomes: ['Air-gapped or on-premises operation', 'Marking sets enforced at open', 'SLA cases for citizen requests'],
    featureSlugs: ['marking-sets', 'identity-scim', 'sla-engine', 'folder-hierarchy'],
  },
];

export const pricingTiers: PricingTier[] = [
  {
    id: 'team',
    name: 'Team',
    audience: 'A single department proving the vault',
    summary: 'Document control, search, and a secure viewer for a contained rollout.',
    cta: 'Request a Team evaluation',
    includes: [
      'Departmental vault, versions, and check-out',
      'Batch upload and OCR',
      'Hybrid search across that space',
      'Watermarked browser viewer',
      'Email support during the evaluation',
    ],
  },
  {
    id: 'professional',
    name: 'Professional',
    audience: 'Operations that need cases and approvals',
    summary: 'The full work system: cases, SLA clocks, visual workflows, and directory sign-on.',
    recommended: true,
    cta: 'Request a Professional evaluation',
    includes: [
      'Everything in Team',
      'Case lifecycles and SLA escalation',
      'Visual BPM designer and AI draft flows',
      'Policy attestations',
      'SSO with SAML or OpenID Connect',
      'Named customer architect for the pilot',
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    audience: 'Regulated and sovereign environments',
    summary: 'Immutable archive, air-gapped deployment, and controls an examiner can follow.',
    cta: 'Talk with enterprise sales',
    includes: [
      'Everything in Professional',
      'WORM archive and legal hold',
      'On-premises, hybrid, or air-gapped install',
      'SCIM provisioning and classification markings',
      'Customer-managed encryption keys',
      'Security review package and retention workshop',
    ],
  },
];

export const comparisonRows: { label: string; team: boolean; professional: boolean; enterprise: boolean }[] = [
  { label: 'Versioned document vault', team: true, professional: true, enterprise: true },
  { label: 'OCR and batch ingestion', team: true, professional: true, enterprise: true },
  { label: 'Hybrid search', team: true, professional: true, enterprise: true },
  { label: 'Watermarked secure viewer', team: true, professional: true, enterprise: true },
  { label: 'Cases and SLA timers', team: false, professional: true, enterprise: true },
  { label: 'Visual BPM and AI flow draft', team: false, professional: true, enterprise: true },
  { label: 'Policy attestations', team: false, professional: true, enterprise: true },
  { label: 'SSO', team: false, professional: true, enterprise: true },
  { label: 'SCIM and classification markings', team: false, professional: false, enterprise: true },
  { label: 'WORM archive and legal hold', team: false, professional: false, enterprise: true },
  { label: 'Air-gapped sovereign install', team: false, professional: false, enterprise: true },
];

export const resources: ResourceArticle[] = [
  {
    slug: 'architecture-data-model',
    title: 'Enterprise architecture & data model',
    category: 'Whitepaper',
    minutes: '12 min read',
    summary: 'How LetsSave separates metadata, blobs, search, and workflow so each can scale and be audited on its own.',
    sections: [
      {
        heading: 'What lives where',
        body: 'File bytes sit in object storage under a customer-managed key. Metadata, ACLs, classifications, and retention live in the catalogue. Search keeps a text and vector index built only from records the pipeline has accepted. Workflow state is a separate log of who acted, not a column hidden on the file.',
      },
      {
        heading: 'Why the split matters',
        body: 'An examiner can ask for the retention decision without downloading the file. A search node can be rebuilt from the catalogue. A workflow can wait on a person without locking the object store. Each store has its own backup and its own access path.',
      },
      {
        heading: 'What we do not promise',
        body: 'This paper describes the logical model. Physical node counts, regions, and key ceremonies are agreed in the deployment workshop for that customer. They are not identical for a private-cloud bank and an air-gapped agency.',
      },
    ],
  },
  {
    slug: 'soc2-hipaa-blueprint',
    title: 'SOC 2 & HIPAA control blueprint',
    category: 'Regulatory Guide',
    minutes: '8 min read',
    summary: 'How attestations, access logs, and leaver processing map onto the controls auditors ask to see.',
    sections: [
      {
        heading: 'Access',
        body: 'People enter through the corporate identity provider. Groups map to roles. A classification the person does not hold does not open, even if a folder ACL was copied too widely. Leavers lose sessions when the directory says they have left.',
      },
      {
        heading: 'Evidence',
        body: 'Every open, check-out, share, approval, and policy signature is an event with an actor and a time. Attestation scorecards show who has not signed. Those exports are the evidence pack, not a screenshot of a dashboard.',
      },
      {
        heading: 'Health records',
        body: 'LetsSave is the system of record for the documents you choose to store. It does not replace a clinical system. Customers remain responsible for deciding which records belong here and which retention rule applies.',
      },
    ],
  },
  {
    slug: 'bpm-handbook',
    title: 'Visual BPM & workflow handbook',
    category: 'Practitioner Guide',
    minutes: '15 min read',
    summary: 'A practical way to model approvals, thresholds, and clocks without hiding the process in code.',
    sections: [
      {
        heading: 'Start from the exception',
        body: 'Write down the path a senior person already follows when something is late or expensive. That path is the workflow. The happy path is usually shorter than the meeting suggests.',
      },
      {
        heading: 'Gates people can see',
        body: 'Every gate names an owner and the evidence required to pass. A threshold, such as an invoice above a stated amount, is a visible branch, not a comment in a script.',
      },
      {
        heading: 'Let the assistant draft, not publish',
        body: 'The copilot can sketch a graph from a paragraph. A process owner publishes it. That split keeps a fluent demo from becoming an unreviewed production rule.',
      },
    ],
  },
  {
    slug: 'retention-schedule-guide',
    title: 'Retention schedule guide',
    category: 'Regulatory Guide',
    minutes: '10 min read',
    summary: 'How to turn a legal retention schedule into archive classes, holds, and a disposition someone can defend.',
    sections: [
      {
        heading: 'One class per duty',
        body: 'Do not archive “finance” as one bucket. Map contracts, invoices, and HR files to the duty that forces you to keep them, with an owner for each class.',
      },
      {
        heading: 'Holds beat calendars',
        body: 'A legal hold stops disposition even when the calendar date has passed. The archive shows both dates so an operator can see why a file is still there.',
      },
      {
        heading: 'Disposition is an event',
        body: 'When a record is eligible and not held, destruction is logged. The log remains. The bytes do not.',
      },
    ],
  },
  {
    slug: 'api-reference',
    title: 'REST API & integration notes',
    category: 'Developer Hub',
    minutes: 'Interactive notes',
    summary: 'The integration surface for ingestion, cases, and webhooks. Use it from a scanner, a line-of-business system, or an identity workflow.',
    sections: [
      {
        heading: 'Ingest',
        body: 'Send metadata and a file, or a pointer to a file already inside your network. The response returns the record id, the version, and the classification the policy assigned. Poll the job if OCR is still running.',
      },
      {
        heading: 'Cases',
        body: 'Create a case from a template, attach record ids, and post stage transitions. The SLA clock starts when the API marks the case accepted, not when the HTTP call began.',
      },
      {
        heading: 'Events',
        body: 'Webhooks fire for check-out, hold, attestation complete, and SLA breach. Receivers should treat delivery as at-least-once and key off the event id.',
      },
    ],
  },
  {
    slug: 'paperless-playbook',
    title: 'Paperless programme playbook',
    category: 'Practitioner Guide',
    minutes: '9 min read',
    summary: 'A sequence for retiring a filing room without losing the only copy of a record.',
    sections: [
      {
        heading: 'Inventory before scanners',
        body: 'Name the series, the owner, and the retention rule before anyone feeds a hopper. Scanning an unknown box creates a digital unknown box.',
      },
      {
        heading: 'Quality on a sample',
        body: 'Check OCR and classification on a sample from each series. Fix the profile, then run the rest of that series.',
      },
      {
        heading: 'Stop the paper path',
        body: 'The programme is finished for a series only when new paper is no longer filed beside the scan. Until then you have a copy, not a system of record.',
      },
    ],
  },
];

export const deployments = [
  {
    title: 'Enterprise private cloud',
    badge: 'AWS, Azure, or GCP',
    summary: 'A dedicated virtual network with customer-managed keys, elastic capacity, and regional residency you choose.',
    points: ['Isolated network boundary', 'Customer-managed encryption keys', 'Multi-zone recovery inside the region you select'],
  },
  {
    title: 'On-premises data centre',
    badge: 'Your hardware',
    summary: 'The full product on infrastructure you already own, with directory sign-on and storage arrays you operate.',
    points: ['Physical custody of disks', 'SAN or NAS for the object tier', 'Active Directory or LDAP sign-on'],
  },
  {
    title: 'Sovereign air-gapped edition',
    badge: 'Disconnected',
    summary: 'A build that runs without a route to the public internet, for defence, intelligence, and certain banking zones.',
    points: ['No runtime dependency on an external network', 'Classification markings enforced locally', 'Keys held in a hardware security module'],
  },
  {
    title: 'Hybrid fabric',
    badge: 'Cloud and premises',
    summary: 'Active records stay close to the people using them. Aged records move to a retention tier under the same catalogue.',
    points: ['One governance view', 'Policy-based tiering', 'The same identity on both sides'],
  },
  {
    title: 'Container platform',
    badge: 'Kubernetes',
    summary: 'Services packaged for the cluster standard your platform team already runs.',
    points: ['Separate workloads for catalogue, search, and workers', 'Horizontal scale on ingest', 'Your existing cluster policy and registry'],
  },
  {
    title: 'Managed sovereign service',
    badge: 'LetsSave operated',
    summary: 'We run the service inside an agreed region and hand you the audit evidence, while you keep the key and the directory.',
    points: ['Region agreed in the contract', 'Customer directory remains the source of identity', 'Operational evidence included in reviews'],
  },
];

export const complianceBadges = [
  { name: 'SEC 17a-4', detail: 'Retention controls for broker-dealer books and records, including immutable storage and a documented disposition process.' },
  { name: 'FINRA', detail: 'Recordkeeping aligned to the same family of books-and-records duties used by member firms.' },
  { name: 'SOC 2', detail: 'Control evidence for security, availability, and confidentiality. A Type II report is shared under NDA during procurement.' },
  { name: 'ISO 27001', detail: 'Information-security management practices covering access, operations, and supplier review.' },
  { name: 'HIPAA', detail: 'Safeguards for customers who store protected health information: access control, audit, and transmission protection.' },
  { name: 'GDPR', detail: 'Regional residency, access logs, and retention limits that support a customer’s own privacy duties.' },
];

export function getFeature(slug: string) {
  return features.find((feature) => feature.slug === slug);
}

export function getIndustry(slug: string) {
  return industries.find((industry) => industry.slug === slug);
}

export function getResource(slug: string) {
  return resources.find((article) => article.slug === slug);
}

export function relatedFeatures(slug: string, limit = 3) {
  const current = getFeature(slug);
  if (!current) return [];
  return features.filter((feature) => feature.slug !== slug && feature.category === current.category).slice(0, limit);
}
