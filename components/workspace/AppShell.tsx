'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Activity,
  Archive,
  Bot,
  Eye,
  FileText,
  HelpCircle,
  LayoutDashboard,
  Menu,
  Search,
  ShieldCheck,
  Workflow,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { cases, currentUser, documents } from '@/lib/workspace-data';

const nav = [
  { href: '/dashboard', label: 'Command centre', icon: LayoutDashboard },
  { href: '/documents', label: 'Document vault', icon: FileText },
  { href: '/cases', label: 'Cases & SLA', icon: Activity },
  { href: '/workflows', label: 'BPM studio', icon: Workflow },
  { href: '/governance', label: 'Governance', icon: ShieldCheck },
  { href: '/archive', label: 'WORM archive', icon: Archive },
  { href: '/ai-hub', label: 'AI knowledge', icon: Bot },
  { href: '/viewer', label: 'Secure viewer', icon: Eye },
  { href: '/help', label: 'Help', icon: HelpCircle },
];

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return [];
    const docs = documents
      .filter((doc) => `${doc.name} ${doc.summary} ${doc.site} ${doc.tags.join(' ')}`.toLowerCase().includes(q))
      .map((doc) => ({ href: `/documents?doc=${doc.id}`, kind: 'Document', label: doc.name }));
    const work = cases
      .filter((item) => `${item.id} ${item.title} ${item.owner}`.toLowerCase().includes(q))
      .map((item) => ({ href: `/cases?case=${item.id}`, kind: 'Case', label: `${item.id} · ${item.title}` }));
    return [...docs, ...work].slice(0, 6);
  }, [query]);

  const sidebar = (
    <div className="flex h-full flex-col">
      <Link href="/" className="flex items-center gap-3 px-4 py-5" onClick={() => setOpen(false)}>
        <Image src="/letssave-logo.jpg" alt="" width={160} height={64} className="h-12 w-auto rounded-xl bg-white" />
        <span>
          <span className="block font-heading text-base font-black leading-none">LetsSave</span>
          <span className="mt-1 block text-[11px] text-slate-400">Evaluation workspace</span>
        </span>
      </Link>
      <nav className="flex-1 space-y-1 overflow-y-auto px-3" aria-label="Workspace">
        {nav.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              aria-current={active ? 'page' : undefined}
              className={cn(
                'flex min-h-11 items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold',
                active ? 'bg-teal-600 text-white' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              )}
            >
              <Icon size={18} aria-hidden="true" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="m-3 rounded-2xl border border-slate-700 p-4">
        <p className="text-sm font-bold">{currentUser.name}</p>
        <p className="text-xs text-slate-400">{currentUser.role}</p>
        <Link href="/" className="mt-3 inline-flex min-h-11 items-center text-xs font-bold text-teal-300 hover:text-white">
          Back to the website
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 bg-slate-950 text-white md:block">{sidebar}</aside>
      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <button type="button" aria-label="Close menu" className="absolute inset-0 bg-slate-950/60" onClick={() => setOpen(false)} />
          <aside className="relative h-full w-72 bg-slate-950 text-white shadow-2xl">{sidebar}</aside>
        </div>
      )}
      <div className="md:pl-72">
        <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 px-4 py-3 backdrop-blur md:px-8">
          <div className="flex items-center gap-3">
            <button type="button" className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 md:hidden" aria-label="Open workspace menu" onClick={() => setOpen(true)}>
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
            <div className="relative min-w-0 flex-1">
              <label className="relative block">
                <span className="sr-only">Search documents and cases</span>
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} aria-hidden="true" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search the vault or a case"
                  className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm outline-none focus:border-teal-700 focus:bg-white focus:ring-2 focus:ring-teal-100"
                />
              </label>
              {results.length > 0 && (
                <ul className="absolute z-20 mt-2 w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">
                  {results.map((result) => (
                    <li key={result.href}>
                      <button
                        type="button"
                        className="flex w-full items-start gap-3 px-3 py-3 text-left hover:bg-teal-50"
                        onClick={() => {
                          setQuery('');
                          router.push(result.href);
                        }}
                      >
                        <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase text-slate-600">{result.kind}</span>
                        <span className="text-sm font-medium text-slate-800">{result.label}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </header>
        <div className="px-4 py-6 md:px-8 md:py-8">{children}</div>
      </div>
    </div>
  );
}
