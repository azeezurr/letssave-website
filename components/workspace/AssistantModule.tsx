'use client';

import { FormEvent, useMemo, useState } from 'react';
import Link from 'next/link';
import { documents } from '@/lib/workspace-data';

interface Message {
  role: 'user' | 'assistant';
  text: string;
  source?: { id: string; name: string; page: string };
}

const replies: { test: (q: string) => boolean; text: string; sourceId: string; page: string }[] = [
  {
    test: (q) => q.includes('resid') || q.includes('region') || q.includes('agreement'),
    text: 'The master service agreement allows records in the regions named in its schedule. Open page 1 for the residency clause before you answer a customer.',
    sourceId: 'msa',
    page: 'Page 1',
  },
  {
    test: (q) => q.includes('retain') || q.includes('people') || q.includes('hr'),
    text: 'People records follow the retention schedule: employment files, attestations, and grievances each have an owner and a duration. Holds stop the clock.',
    sourceId: 'hr-file',
    page: 'Page 2',
  },
  {
    test: (q) => q.includes('soc') || q.includes('evidence') || q.includes('control'),
    text: 'The SOC 2 pack samples access reviews and the key ceremony. It is evidence for the period, not a substitute for the live audit log.',
    sourceId: 'soc2',
    page: 'Page 2',
  },
];

export default function AssistantModule() {
  const [tab, setTab] = useState<'ask' | 'search'>('ask');
  const [input, setInput] = useState('');
  const [search, setSearch] = useState('residency');
  const [marking, setMarking] = useState('All');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', text: 'Ask about a contract, a retention rule, or the evidence pack. Answers name the file they came from.' },
  ]);

  const hits = useMemo(() => {
    const q = search.trim().toLowerCase();
    return documents.filter((doc) => {
      const matchesMarking = marking === 'All' || doc.classification === marking;
      const matchesQuery = !q || `${doc.name} ${doc.summary} ${doc.tags.join(' ')} ${doc.pages.join(' ')}`.toLowerCase().includes(q);
      return matchesMarking && matchesQuery;
    });
  }, [search, marking]);

  const ask = (event: FormEvent) => {
    event.preventDefault();
    const question = input.trim();
    if (!question) return;
    const match = replies.find((reply) => reply.test(question.toLowerCase()));
    const sourceDoc = documents.find((doc) => doc.id === (match?.sourceId || 'policy'));
    const answer: Message = match && sourceDoc
      ? { role: 'assistant', text: match.text, source: { id: sourceDoc.id, name: sourceDoc.name, page: match.page } }
      : {
          role: 'assistant',
          text: 'I can answer from the evaluation vault: residency in the master agreement, people-record retention, or the SOC 2 evidence pack. Try one of those.',
          source: sourceDoc ? { id: sourceDoc.id, name: sourceDoc.name, page: 'Page 1' } : undefined,
        };
    setMessages((current) => [...current, { role: 'user', text: question }, answer]);
    setInput('');
  };

  return (
    <div className="space-y-5">
      <header>
        <p className="text-xs font-bold uppercase tracking-wider text-teal-800">AI knowledge</p>
        <h1 className="font-heading text-3xl font-black">Search and answers with a source</h1>
      </header>
      <div className="flex gap-2">
        {(['ask', 'search'] as const).map((item) => (
          <button key={item} type="button" onClick={() => setTab(item)} className={`min-h-11 rounded-xl px-4 text-sm font-bold ${tab === item ? 'bg-teal-700 text-white' : 'bg-white text-slate-700'}`}>
            {item === 'ask' ? 'Assistant' : 'Hybrid search'}
          </button>
        ))}
      </div>
      {tab === 'ask' ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-4">
          <div className="space-y-3">
            {messages.map((message, index) => (
              <div key={index} className={`rounded-2xl p-3 text-sm ${message.role === 'user' ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-800'}`}>
                <p>{message.text}</p>
                {message.source && (
                  <Link href={`/viewer?doc=${message.source.id}`} className="mt-2 inline-flex rounded-lg bg-white px-2 py-1 text-xs font-bold text-teal-800">
                    Source: {message.source.name} · {message.source.page}
                  </Link>
                )}
              </div>
            ))}
          </div>
          <form onSubmit={ask} className="mt-4 flex flex-col gap-2 sm:flex-row">
            <label className="sr-only" htmlFor="ask">Question</label>
            <input id="ask" value={input} onChange={(event) => setInput(event.target.value)} placeholder="Where may these records reside?" className="min-h-11 flex-1 rounded-xl border border-slate-200 px-3 text-sm" />
            <button type="submit" className="min-h-11 rounded-xl bg-teal-700 px-4 text-sm font-bold text-white">Ask</button>
          </form>
          <div className="mt-3 flex flex-wrap gap-2">
            {['Where may records reside?', 'How long are people files kept?', 'What is in the SOC 2 pack?'].map((prompt) => (
              <button key={prompt} type="button" className="rounded-full border border-slate-200 px-3 py-2 text-xs font-semibold" onClick={() => setInput(prompt)}>
                {prompt}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="rounded-3xl border border-slate-200 bg-white p-4">
          <div className="grid gap-3 sm:grid-cols-[1fr_180px]">
            <input value={search} onChange={(event) => setSearch(event.target.value)} aria-label="Search the vault" className="min-h-11 rounded-xl border border-slate-200 px-3 text-sm" />
            <select value={marking} onChange={(event) => setMarking(event.target.value)} aria-label="Classification filter" className="min-h-11 rounded-xl border border-slate-200 px-3 text-sm">
              {['All', 'TOP SECRET', 'CONFIDENTIAL', 'RESTRICTED', 'INTERNAL'].map((level) => <option key={level}>{level}</option>)}
            </select>
          </div>
          <ul className="mt-4 space-y-3">
            {hits.map((doc) => (
              <li key={doc.id} className="rounded-2xl border border-slate-100 p-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-semibold">{doc.name}</p>
                  <span className="text-[11px] font-bold text-slate-500">{doc.classification}</span>
                </div>
                <p className="mt-1 text-sm text-slate-600">{doc.summary}</p>
                <Link href={`/viewer?doc=${doc.id}`} className="mt-2 inline-block text-xs font-bold text-teal-800">Open in the secure viewer</Link>
              </li>
            ))}
            {hits.length === 0 && <li className="text-sm text-slate-500">No cleared records match that query and marking.</li>}
          </ul>
        </div>
      )}
    </div>
  );
}
