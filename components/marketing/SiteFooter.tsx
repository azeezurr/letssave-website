'use client';

import Image from 'next/image';
import Link from 'next/link';
import { features } from '@/lib/catalog';
import { useDemoModal } from './DemoModalProvider';

const groups: { title: string; slugs: string[] }[] = [
  { title: 'Vault & capture', slugs: ['version-control', 'folder-hierarchy', 'batch-ingestion', 'paperless-scanning', 'geo-tagging'] },
  { title: 'Work & governance', slugs: ['case-lifecycles', 'sla-engine', 'visual-bpm', 'policy-lifecycle', 'employee-attestation'] },
  { title: 'Intelligence & protection', slugs: ['rag-assistant', 'global-search', 'watermarked-viewer', 'worm-archiving', 'identity-scim'] },
];

export default function SiteFooter() {
  const { openDemo } = useDemoModal();
  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-xs text-slate-400">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-5 lg:px-8">
        <div className="space-y-4 lg:col-span-2">
          <div className="flex items-center gap-3">
            <Image src="/letssave-logo.jpg" alt="LetsSave" width={180} height={72} className="h-12 w-auto rounded-xl border border-slate-700" />
            <div>
              <p className="font-heading text-base font-bold text-white">LetsSave</p>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-teal-400">Document management</p>
            </div>
          </div>
          <p className="max-w-sm leading-relaxed">
            Enterprise document management, statutory archiving, paperless capture, and a knowledge assistant that cites its sources.
          </p>
          <p>Sales <a className="text-teal-300 hover:underline" href="mailto:sales@letssave.in">sales@letssave.in</a></p>
          <p>Support <a className="text-teal-300 hover:underline" href="mailto:support@letssave.in">support@letssave.in</a></p>
        </div>
        {groups.map((group) => (
          <div key={group.title}>
            <h2 className="mb-3 font-heading text-xs font-bold uppercase tracking-wider text-white">{group.title}</h2>
            <ul className="space-y-2">
              {group.slugs.map((slug) => {
                const feature = features.find((item) => item.slug === slug);
                if (!feature) return null;
                return (
                  <li key={slug}>
                    <Link href={`/solutions/${slug}`} className="hover:text-white">{feature.title}</Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-slate-800">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <nav className="flex flex-wrap gap-x-4 gap-y-2" aria-label="Company">
            <Link href="/solutions" className="hover:text-white">Platform</Link>
            <Link href="/industries" className="hover:text-white">Industries</Link>
            <Link href="/security" className="hover:text-white">Security</Link>
            <Link href="/deployment" className="hover:text-white">Deployment</Link>
            <Link href="/pricing" className="hover:text-white">Pricing</Link>
            <Link href="/resources" className="hover:text-white">Resources</Link>
            <Link href="/contact" className="hover:text-white">Contact</Link>
            <Link href="/demo" className="hover:text-white">Live prototype</Link>
            <Link href="/dashboard" className="hover:text-white">Workspace</Link>
            <button type="button" onClick={() => openDemo()} className="font-semibold text-teal-300 hover:text-white">Book a consultation</button>
          </nav>
          <p>© 2026 LetsSave. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
