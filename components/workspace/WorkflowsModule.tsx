'use client';

import { useEffect, useState } from 'react';

const nodes = [
  { id: 'intake', title: 'Intake', detail: 'A record or a case enters the flow.' },
  { id: 'extract', title: 'Read fields', detail: 'Amount, party, and classification are proposed from the file.' },
  { id: 'branch', title: 'Amount gate', detail: 'At or above 10,000 goes to finance. Below that, the manager signs.' },
  { id: 'finance', title: 'Finance approval', detail: 'Finance confirms the threshold path.' },
  { id: 'manager', title: 'Manager sign-off', detail: 'The line manager approves the ordinary path.' },
  { id: 'archive', title: 'Archive', detail: 'The decision and the file are sealed under the retention class.' },
];

export default function WorkflowsModule() {
  const [selected, setSelected] = useState('branch');
  const [running, setRunning] = useState(false);
  const [step, setStep] = useState(-1);
  const [prompt, setPrompt] = useState('Invoices under 10,000 need a manager. Larger ones need finance, then archive.');
  const [draft, setDraft] = useState('');
  const active = nodes.find((node) => node.id === selected) || nodes[0];
  const path = ['intake', 'extract', 'branch', 'finance', 'archive'];

  useEffect(() => {
    if (!running) return;
    if (step >= path.length - 1) return;
    const timer = setTimeout(() => setStep((value) => value + 1), 700);
    return () => clearTimeout(timer);
  }, [running, step, path.length]);

  return (
    <div className="space-y-5">
      <header>
        <p className="text-xs font-bold uppercase tracking-wider text-teal-800">BPM studio</p>
        <h1 className="font-heading text-3xl font-black">A flow you can point at</h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-600">Select a node, run the sample path, or ask the copilot to draft the same graph from a sentence. Publishing stays with a person.</p>
      </header>
      <div className="grid gap-4 lg:grid-cols-[1.4fr_0.6fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-4">
          <div className="grid gap-3 sm:grid-cols-2">
            {nodes.map((node) => {
              const index = path.indexOf(node.id);
              const lit = running && index > -1 && index <= step;
              return (
                <button
                  key={node.id}
                  type="button"
                  onClick={() => setSelected(node.id)}
                  className={`min-h-20 rounded-2xl border p-4 text-left ${selected === node.id ? 'border-teal-600' : 'border-slate-200'} ${lit ? 'bg-teal-50' : 'bg-white'}`}
                >
                  <p className="text-xs font-bold text-slate-400">{lit ? 'Active in this run' : 'Node'}</p>
                  <p className="font-heading font-bold">{node.title}</p>
                </button>
              );
            })}
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              className="min-h-11 rounded-xl bg-teal-700 px-4 text-sm font-bold text-white"
              onClick={() => {
                setStep(-1);
                setRunning(true);
              }}
            >
              Simulate the path
            </button>
            <button type="button" className="min-h-11 rounded-xl border border-slate-300 px-4 text-sm font-bold" onClick={() => { setRunning(false); setStep(-1); }}>
              Reset
            </button>
          </div>
        </div>
        <aside className="space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <h2 className="font-heading text-lg font-bold">{active.title}</h2>
            <p className="mt-2 text-sm text-slate-600">{active.detail}</p>
          </div>
          <form
            className="rounded-2xl border border-slate-200 bg-white p-4"
            onSubmit={(event) => {
              event.preventDefault();
              setDraft(`Draft ready: Intake → Read fields → Amount gate → Finance or manager → Archive. Roles are suggested from “${prompt.slice(0, 72)}”. Confirm before this flow can run.`);
              setSelected('branch');
            }}
          >
            <label className="block text-sm font-bold">
              Describe the approval
              <textarea value={prompt} onChange={(event) => setPrompt(event.target.value)} rows={4} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm font-normal" />
            </label>
            <button type="submit" className="mt-3 min-h-11 w-full rounded-xl bg-slate-900 text-sm font-bold text-white">Draft with the copilot</button>
            {draft && <p className="mt-3 text-sm text-slate-700" role="status">{draft}</p>}
          </form>
        </aside>
      </div>
    </div>
  );
}
