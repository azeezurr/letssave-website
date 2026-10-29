'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Lock, ShieldCheck } from 'lucide-react';
import MarketingShell from '@/components/marketing/MarketingShell';
import PageIntro from '@/components/marketing/PageIntro';
import ConsultButton from '@/components/marketing/ConsultButton';
import { complianceBadges } from '@/lib/catalog';
import { cn } from '@/lib/utils';

const regions = [
  { id: 'in', name: 'India', detail: 'Mumbai and Hyderabad residency for customers who must keep records in-country.' },
  { id: 'eu', name: 'European Union', detail: 'Frankfurt boundary for teams whose privacy review names the EU as the processing region.' },
  { id: 'us', name: 'United States', detail: 'US regions for books-and-records programmes that expect SEC 17a-4 storage.' },
  { id: 'ae', name: 'United Arab Emirates', detail: 'A regional zone for groups that require Gulf residency and a local operator.' },
  { id: 'site', name: 'Your own site', detail: 'On-premises or air-gapped. Nothing leaves the building because nothing has a route out.' },
];

const controls = [
  { title: 'Encryption', detail: 'Bytes are encrypted at rest with a key you can hold. Traffic between services stays on the private network of that deployment.' },
  { title: 'Identity', detail: 'Staff sign in with the directory you already trust. Groups become roles. Leavers lose access when the directory says they have left.' },
  { title: 'Classification', detail: 'Top Secret, Confidential, Restricted, and Internal are enforced at open time, then shown as a banner and a watermark.' },
  { title: 'Viewing policy', detail: 'The secure viewer can refuse download and print. A watermark names the reader, the address, and the time.' },
  { title: 'Audit', detail: 'Opens, shares, check-outs, holds, and attestations are events. The event remains after the file is dispositioned.' },
  { title: 'Retention', detail: 'A legal hold stops deletion even when the calendar date has passed. Disposition is itself an audited event.' },
];

export default function SecurityPage() {
  const [region, setRegion] = useState(regions[0]);
  const [openControl, setOpenControl] = useState<string | null>(controls[0].title);
  const [badge, setBadge] = useState<string | null>(null);
  const activeBadge = complianceBadges.find((item) => item.name === badge);

  return (
    <MarketingShell>
      <main className="px-4 pb-20 pt-32 sm:px-6 lg:px-8">
        <PageIntro
          eyebrow="Security & compliance"
          title="Controls a reviewer can follow"
          lede="Encryption, identity, classification, and retention are visible in the product. Certifications are explained here, not left as unexplained logos."
        />

        <section className="mx-auto mt-12 max-w-6xl">
          <h2 className="font-heading text-2xl font-black text-slate-900">Standards</h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {complianceBadges.map((item) => (
              <li key={item.name}>
                <button
                  type="button"
                  onClick={() => setBadge(item.name)}
                  onMouseEnter={() => setBadge(item.name)}
                  onFocus={() => setBadge(item.name)}
                  className={cn(
                    'flex w-full items-center gap-3 rounded-2xl border px-4 py-4 text-left',
                    badge === item.name ? 'border-teal-500 bg-teal-50' : 'border-slate-200 bg-white'
                  )}
                >
                  <ShieldCheck className="text-teal-700" aria-hidden="true" />
                  <span>
                    <span className="block font-heading font-bold text-slate-900">{item.name}</span>
                    <span className="text-xs text-slate-500">Select for the plain-language meaning</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
          <p className="mt-4 min-h-12 rounded-2xl bg-slate-50 p-4 text-sm text-slate-700" role="status">
            {activeBadge ? activeBadge.detail : 'Choose a standard to read what it covers in this product.'}
          </p>
        </section>

        <section className="mx-auto mt-14 grid max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <h2 className="font-heading text-2xl font-black text-slate-900">Where records live</h2>
            <p className="mt-2 text-sm text-slate-600">Residency is a deployment choice, agreed before go-live. Pick a region to see the commitment in words.</p>
            <div className="mt-4 grid grid-cols-2 gap-2" role="radiogroup" aria-label="Data residency">
              {regions.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  role="radio"
                  aria-checked={region.id === item.id}
                  onClick={() => setRegion(item)}
                  className={cn(
                    'rounded-xl border px-3 py-3 text-left text-sm font-bold',
                    region.id === item.id ? 'border-teal-700 bg-teal-700 text-white' : 'border-slate-200 bg-white text-slate-800'
                  )}
                >
                  {item.name}
                </button>
              ))}
            </div>
            <p className="mt-4 rounded-2xl border border-slate-200 p-4 text-sm leading-relaxed text-slate-700">{region.detail}</p>
          </div>
          <div>
            <h2 className="flex items-center gap-2 font-heading text-2xl font-black text-slate-900">
              <Lock className="text-teal-700" aria-hidden="true" />
              Control details
            </h2>
            <div className="mt-4 divide-y divide-slate-200 rounded-2xl border border-slate-200">
              {controls.map((control) => {
                const open = openControl === control.title;
                return (
                  <div key={control.title}>
                    <button
                      type="button"
                      aria-expanded={open}
                      onClick={() => setOpenControl(open ? null : control.title)}
                      className="flex w-full items-center justify-between px-4 py-4 text-left font-heading font-bold text-slate-900"
                    >
                      {control.title}
                      <span className="text-xs font-semibold text-teal-800">{open ? 'Hide' : 'Show'}</span>
                    </button>
                    {open && <p className="px-4 pb-4 text-sm leading-relaxed text-slate-600">{control.detail}</p>}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <div className="mx-auto mt-12 flex max-w-6xl flex-col gap-3 sm:flex-row">
          <ConsultButton interest="security" label="Request a security review" />
          <Link href="/solutions/watermarked-viewer" className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-5 py-3 text-sm font-bold text-slate-800">
            See the secure viewer
          </Link>
        </div>
      </main>
    </MarketingShell>
  );
}
