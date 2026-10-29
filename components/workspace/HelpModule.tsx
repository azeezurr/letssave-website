import Link from 'next/link';
import { features } from '@/lib/catalog';

const modules = [
  { href: '/dashboard', title: 'Command centre', detail: 'Exceptions, SLA risk, and the records touched most recently.' },
  { href: '/documents', title: 'Document vault', detail: 'Folders, classification, check-out, versions, geo tags, comments, and sharing that respects clearance.' },
  { href: '/cases', title: 'Cases', detail: 'Stage gates, checklists, and SLA labels including breach.' },
  { href: '/workflows', title: 'BPM studio', detail: 'A visible approval path and a copilot that drafts, but does not publish.' },
  { href: '/governance', title: 'Governance', detail: 'Policy state, attestations, and legal hold.' },
  { href: '/archive', title: 'Archive', detail: 'WORM retention. Disposition is refused while a hold or a future date remains.' },
  { href: '/ai-hub', title: 'AI knowledge', detail: 'Hybrid search and answers that link to a page.' },
  { href: '/viewer', title: 'Secure viewer', detail: 'Identity watermark, with print and download refused by policy.' },
];

export default function HelpModule() {
  return (
    <div className="space-y-8">
      <header>
        <p className="text-xs font-bold uppercase tracking-wider text-teal-800">Help</p>
        <h1 className="font-heading text-3xl font-black">How this workspace maps to the product</h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-600">Use the modules below. Each one is also described on the public site for the people who buy, secure, or integrate it.</p>
      </header>
      <div className="grid gap-3 md:grid-cols-2">
        {modules.map((module) => (
          <Link key={module.href} href={module.href} className="rounded-2xl border border-slate-200 bg-white p-5 hover:border-teal-400">
            <h2 className="font-heading text-lg font-bold">{module.title}</h2>
            <p className="mt-2 text-sm text-slate-600">{module.detail}</p>
          </Link>
        ))}
      </div>
      <section>
        <h2 className="font-heading text-xl font-black">Public capability pages</h2>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {features.map((feature) => (
            <li key={feature.slug}>
              <Link href={`/solutions/${feature.slug}`} className="text-sm font-semibold text-teal-800 hover:underline">{feature.title}</Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
