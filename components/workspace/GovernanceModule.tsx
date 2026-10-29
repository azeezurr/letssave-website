'use client';

import { useState } from 'react';
import { policies as seed } from '@/lib/workspace-data';

export default function GovernanceModule() {
  const [rows, setRows] = useState(seed.map((policy) => ({ ...policy, hold: policy.id === 'POL-14' })));
  const [signedId, setSignedId] = useState<string | null>(null);

  return (
    <div className="space-y-5">
      <header>
        <p className="text-xs font-bold uppercase tracking-wider text-teal-800">Governance</p>
        <h1 className="font-heading text-3xl font-black">Policies, signatures, and holds</h1>
      </header>
      <div className="grid gap-4">
        {rows.map((policy) => {
          const percent = Math.round((policy.signed / policy.population) * 100);
          return (
            <article key={policy.id} className="rounded-2xl border border-slate-200 bg-white p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-bold text-slate-400">{policy.id} · {policy.status}</p>
                  <h2 className="font-heading text-xl font-bold">{policy.title}</h2>
                  <p className="text-sm text-slate-500">Next renewal {policy.renewal}</p>
                </div>
                <p className="text-sm font-semibold">{policy.signed.toLocaleString()} of {policy.population.toLocaleString()} signed · {percent}%</p>
              </div>
              <div className="mt-3 h-2 rounded-full bg-slate-100" aria-hidden="true">
                <div className="h-2 rounded-full bg-teal-600" style={{ width: `${percent}%` }} />
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  type="button"
                  disabled={policy.status !== 'Published' || signedId === policy.id}
                  className="min-h-11 rounded-xl bg-teal-700 px-4 text-sm font-bold text-white disabled:opacity-50"
                  onClick={() => {
                    setSignedId(policy.id);
                    setRows((current) => current.map((item) => item.id === policy.id ? { ...item, signed: item.signed + 1 } : item));
                  }}
                >
                  {signedId === policy.id ? 'You signed this version' : 'Sign attestation'}
                </button>
                <button
                  type="button"
                  className="min-h-11 rounded-xl border border-slate-300 px-4 text-sm font-bold"
                  onClick={() => setRows((current) => current.map((item) => item.id === policy.id ? { ...item, hold: !item.hold } : item))}
                >
                  {policy.hold ? 'Legal hold is on' : 'Place legal hold'}
                </button>
              </div>
              {policy.hold && <p className="mt-3 text-xs text-slate-600">Hold active. This policy cannot be deleted while counsel keeps the hold.</p>}
              {policy.status === 'Legal review' && <p className="mt-3 text-xs text-slate-600">Staff cannot attest until legal publishes this version.</p>}
            </article>
          );
        })}
      </div>
    </div>
  );
}
