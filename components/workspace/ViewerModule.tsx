'use client';

import { useState } from 'react';
import { classificationTone, currentUser, documents } from '@/lib/workspace-data';

export default function ViewerModule({ initialDoc }: { initialDoc?: string }) {
  const initial = documents.find((doc) => doc.id === initialDoc) || documents[0];
  const [docId, setDocId] = useState(initial.id);
  const [opacity, setOpacity] = useState(28);
  const [notice, setNotice] = useState('');
  const doc = documents.find((item) => item.id === docId) || documents[0];
  const stamp = `${currentUser.email} · ${currentUser.address} · ${new Date().toLocaleString('en-IN', { hour12: false, timeZone: 'Asia/Kolkata' })} IST`;

  return (
    <div className="space-y-5">
      <header>
        <p className="text-xs font-bold uppercase tracking-wider text-teal-800">Secure viewer</p>
        <h1 className="font-heading text-3xl font-black">Read it here. Do not take a copy.</h1>
      </header>
      <div className="grid gap-4 lg:grid-cols-[240px_1fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-3">
          {documents.map((item) => (
            <button key={item.id} type="button" onClick={() => { setDocId(item.id); setNotice(''); }} className={`mb-2 min-h-11 w-full rounded-xl px-3 text-left text-sm font-semibold ${item.id === doc.id ? 'bg-teal-50 text-teal-900' : 'hover:bg-slate-50'}`}>
              {item.name}
            </button>
          ))}
        </div>
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4">
            <div>
              <span className={`rounded px-2 py-1 text-[10px] font-bold ${classificationTone(doc.classification)}`}>{doc.classification}</span>
              <p className="mt-2 font-heading font-bold">{doc.name}</p>
            </div>
            <label className="text-xs font-bold text-slate-500">
              Watermark strength {opacity}%
              <input type="range" min={12} max={60} value={opacity} onChange={(event) => setOpacity(Number(event.target.value))} className="mt-1 block w-44" />
            </label>
          </div>
          <div className="relative overflow-hidden rounded-2xl border border-slate-300 bg-white">
            <div className="border-b border-rose-200 bg-rose-50 px-4 py-2 text-center text-xs font-bold tracking-wide text-rose-800">{doc.classification} · view only</div>
            <div className="relative space-y-4 p-6">
              {doc.pages.map((page, index) => (
                <section key={page} className="rounded-xl border border-slate-200 p-4">
                  <p className="text-[11px] font-bold text-slate-400">Page {index + 1}</p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-800">{page}</p>
                </section>
              ))}
              <div
                className="pointer-events-none absolute inset-0 flex items-center justify-center"
                style={{ opacity: opacity / 100 }}
                aria-hidden="true"
              >
                <p className="-rotate-12 text-center text-2xl font-black uppercase tracking-widest text-slate-700 sm:text-4xl">{stamp}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <button type="button" className="min-h-11 rounded-xl border border-slate-300 bg-white px-4 text-sm font-bold" onClick={() => setNotice('Print is blocked by the viewing policy. The rendition stays in the browser.')}>
              Print
            </button>
            <button type="button" className="min-h-11 rounded-xl border border-slate-300 bg-white px-4 text-sm font-bold" onClick={() => setNotice('Download is blocked. Ask a records administrator if this classification allows an export.')}>
              Download
            </button>
          </div>
          {notice && <p className="rounded-xl bg-amber-50 p-3 text-sm text-amber-950" role="status">{notice}</p>}
          <p className="text-xs text-slate-500">Watermark for this session: {stamp}. Screen capture cannot be stopped by a browser; the stamp is what an investigation uses.</p>
        </div>
      </div>
    </div>
  );
}
