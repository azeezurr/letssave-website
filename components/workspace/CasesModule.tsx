'use client';

import { useState } from 'react';
import { cases as seedCases, type WorkCase } from '@/lib/workspace-data';

const order: WorkCase['stage'][] = ['Intake', 'Investigation', 'Review', 'Resolved'];

const tone: Record<WorkCase['slaState'], string> = {
  'On track': 'bg-emerald-50 text-emerald-800 border-emerald-200',
  'At risk': 'bg-amber-50 text-amber-900 border-amber-200',
  Breached: 'bg-rose-50 text-rose-800 border-rose-200',
  Met: 'bg-slate-100 text-slate-700 border-slate-200',
};

export default function CasesModule({ initialCase }: { initialCase?: string }) {
  const [items, setItems] = useState(seedCases);
  const [activeId, setActiveId] = useState(initialCase && seedCases.some((item) => item.id === initialCase) ? initialCase : seedCases[0].id);
  const [onlyUrgent, setOnlyUrgent] = useState(false);
  const [done, setDone] = useState<Record<string, boolean>>({});
  const active = items.find((item) => item.id === activeId) || items[0];

  const visible = items.filter((item) => !onlyUrgent || item.priority === 'Urgent');

  return (
    <div className="space-y-5">
      <header className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-teal-800">Cases & SLA</p>
          <h1 className="font-heading text-3xl font-black">Work with a clock and a checklist</h1>
        </div>
        <button type="button" aria-pressed={onlyUrgent} onClick={() => setOnlyUrgent((value) => !value)} className="min-h-11 rounded-xl border border-slate-300 bg-white px-4 text-sm font-bold">
          {onlyUrgent ? 'Showing urgent only' : 'Show urgent only'}
        </button>
      </header>
      <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-3">
          {visible.map((item) => (
            <button key={item.id} type="button" onClick={() => setActiveId(item.id)} className={`w-full rounded-2xl border bg-white p-4 text-left ${item.id === active.id ? 'border-teal-500' : 'border-slate-200'}`}>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-heading font-bold">{item.title}</p>
                <span className={`rounded-full border px-2 py-1 text-[11px] font-bold ${tone[item.slaState]}`}>{item.slaState}</span>
              </div>
              <p className="mt-1 text-xs text-slate-500">{item.id} · {item.stage} · {item.owner}</p>
              <p className="mt-2 text-sm font-semibold text-slate-800">{item.slaLabel}</p>
            </button>
          ))}
        </div>
        <aside className="rounded-2xl border border-slate-200 bg-white p-5">
          <p className="text-xs font-bold text-slate-400">{active.id}</p>
          <h2 className="mt-1 font-heading text-xl font-black">{active.title}</h2>
          <p className="mt-2 text-sm text-slate-600">{active.department} · {active.priority} · {active.slaLabel}</p>
          <p className="mt-1 text-sm font-semibold">Stage: {active.stage}. Status: {active.slaState}.</p>
          <h3 className="mt-5 text-sm font-bold">Required before the next stage</h3>
          <ul className="mt-2 space-y-2">
            {active.checklist.map((task) => {
              const key = `${active.id}:${task}`;
              return (
                <li key={task}>
                  <label className="flex min-h-11 items-center gap-3 text-sm">
                    <input
                      type="checkbox"
                      checked={Boolean(done[key])}
                      onChange={() => setDone((current) => ({ ...current, [key]: !current[key] }))}
                    />
                    {task}
                  </label>
                </li>
              );
            })}
          </ul>
          <button
            type="button"
            className="mt-4 min-h-11 w-full rounded-xl bg-teal-700 text-sm font-bold text-white disabled:opacity-50"
            disabled={active.stage === 'Resolved' || active.checklist.some((task) => !done[`${active.id}:${task}`])}
            onClick={() => {
              setItems((current) => current.map((item) => {
                if (item.id !== active.id) return item;
                const next = order[Math.min(order.indexOf(item.stage) + 1, order.length - 1)];
                return {
                  ...item,
                  stage: next,
                  slaState: next === 'Resolved' ? 'Met' : item.slaState,
                  slaLabel: next === 'Resolved' ? 'Closed inside the audit log' : item.slaLabel,
                };
              }));
            }}
          >
            {active.stage === 'Resolved' ? 'Case is closed' : 'Advance stage'}
          </button>
          {active.stage !== 'Resolved' && active.checklist.some((task) => !done[`${active.id}:${task}`]) && (
            <p className="mt-2 text-xs text-slate-500">The next stage stays locked until every checklist item is done.</p>
          )}
          {active.slaState === 'Breached' && <p className="mt-3 rounded-xl bg-rose-50 p-3 text-xs text-rose-800">This case is with the supervisor queue. The breach is already on the log.</p>}
        </aside>
      </div>
    </div>
  );
}
