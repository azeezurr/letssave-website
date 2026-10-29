import Link from 'next/link';
import { archiveRecords, cases, documents, policies } from '@/lib/workspace-data';

const cards = [
  { label: 'Records in the vault', value: String(documents.length), href: '/documents', note: 'Across five departmental spaces' },
  { label: 'Cases needing a person', value: String(cases.filter((item) => item.stage !== 'Resolved').length), href: '/cases', note: 'Open stages with an SLA' },
  { label: 'Policies awaiting signatures', value: String(policies.reduce((sum, policy) => sum + (policy.population - policy.signed), 0)), href: '/governance', note: 'Published policies only count once live' },
  { label: 'Archive objects on hold', value: String(archiveRecords.filter((record) => record.hold).length), href: '/archive', note: 'Hold beats the expiry date' },
];

export default function DashboardHome() {
  return (
    <div className="space-y-6">
      <header>
        <p className="text-xs font-bold uppercase tracking-wider text-teal-800">Command centre</p>
        <h1 className="font-heading text-3xl font-black">What needs a decision today</h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-600">This evaluation workspace keeps every action in the browser. It shows the same capabilities as the live prototype, with files you can check out, cases you can advance, and an archive that refuses an early deletion.</p>
      </header>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <Link key={card.label} href={card.href} className="rounded-2xl border border-slate-200 bg-white p-5 hover:border-teal-400">
            <p className="text-xs font-bold uppercase tracking-wide text-slate-400">{card.label}</p>
            <p className="mt-2 font-heading text-4xl font-black">{card.value}</p>
            <p className="mt-2 text-xs text-slate-500">{card.note}</p>
          </Link>
        ))}
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <section className="rounded-2xl border border-slate-200 bg-white p-5">
          <h2 className="font-heading text-lg font-bold">SLA watch</h2>
          <ul className="mt-3 divide-y divide-slate-100">
            {cases.filter((item) => item.stage !== 'Resolved').map((item) => (
              <li key={item.id} className="flex items-center justify-between gap-3 py-3">
                <div>
                  <p className="text-sm font-semibold">{item.title}</p>
                  <p className="text-xs text-slate-500">{item.slaState} · {item.slaLabel}</p>
                </div>
                <Link href={`/cases?case=${item.id}`} className="text-xs font-bold text-teal-800">Open</Link>
              </li>
            ))}
          </ul>
        </section>
        <section className="rounded-2xl border border-slate-200 bg-white p-5">
          <h2 className="font-heading text-lg font-bold">Recent records</h2>
          <ul className="mt-3 divide-y divide-slate-100">
            {documents.slice(0, 4).map((doc) => (
              <li key={doc.id} className="flex items-center justify-between gap-3 py-3">
                <div>
                  <p className="text-sm font-semibold">{doc.name}</p>
                  <p className="text-xs text-slate-500">{doc.classification} · {doc.site}</p>
                </div>
                <Link href={`/viewer?doc=${doc.id}`} className="text-xs font-bold text-teal-800">View</Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
