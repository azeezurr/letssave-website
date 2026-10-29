'use client';

import { useMemo, useRef, useState } from 'react';
import { colleagues, classificationTone, documents as seedDocuments, folders, type VaultDocument } from '@/lib/workspace-data';

export default function DocumentsModule({ initialDoc, initialQuery = '' }: { initialDoc?: string; initialQuery?: string }) {
  const [docs, setDocs] = useState<VaultDocument[]>(seedDocuments);
  const [folder, setFolder] = useState<string>('all');
  const [selectedId, setSelectedId] = useState(initialDoc && seedDocuments.some((doc) => doc.id === initialDoc) ? initialDoc : seedDocuments[0].id);
  const [locks, setLocks] = useState<Record<string, string | null>>({ msa: 'Sarah Connor' });
  const [comments, setComments] = useState<Record<string, string[]>>({ msa: ['Please confirm the residency schedule before v3.3.'] });
  const [note, setNote] = useState('');
  const [shareWith, setShareWith] = useState(colleagues[2].name);
  const [shareMessage, setShareMessage] = useState('');
  const [uploadName, setUploadName] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const uploadTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const query = initialQuery.toLowerCase();

  const visible = useMemo(() => {
    return docs.filter((doc) => {
      const inFolder = folder === 'all' || doc.folder === folder;
      const inQuery = !query || `${doc.name} ${doc.summary} ${doc.site}`.toLowerCase().includes(query);
      return inFolder && inQuery;
    });
  }, [docs, folder, query]);

  const selected = visible.find((doc) => doc.id === selectedId) || visible[0];

  const beginUpload = (name: string) => {
    if (uploadTimer.current) clearInterval(uploadTimer.current);
    setUploadName(name);
    setProgress(25);
    let value = 25;
    uploadTimer.current = setInterval(() => {
      value += 25;
      setProgress(Math.min(value, 100));
      if (value < 100) return;
      if (uploadTimer.current) clearInterval(uploadTimer.current);
      const id = `upload-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
      setDocs((current) => {
        if (current.some((doc) => doc.id === id)) return current;
        return [
          {
            id,
            name,
            folder: 'legal',
            classification: 'INTERNAL',
            clearanceRank: 1,
            version: 'v1.0',
            history: ['v1.0'],
            size: '1.1 MB',
            updated: 'Just now',
            summary: 'OCR complete. Suggested tags are waiting for a librarian to accept them.',
            tags: ['intake', 'ocr'],
            site: 'Panvel headquarters',
            region: 'India',
            retention: 'Unclassified until review',
            pages: ['Cover page captured from the scan.', 'OCR text is ready for search.'],
          },
          ...current,
        ];
      });
      setSelectedId(id);
    }, 280);
  };

  const lockedBy = selected ? locks[selected.id] ?? null : null;

  return (
    <div className="space-y-5">
      <header className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-teal-800">Document vault</p>
          <h1 className="font-heading text-3xl font-black text-slate-900">Files, versions, and clearance</h1>
        </div>
        <label className="inline-flex min-h-11 cursor-pointer items-center rounded-xl bg-teal-700 px-4 text-sm font-bold text-white hover:bg-teal-800">
          Upload a batch
          <input
            type="file"
            className="sr-only"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (!file) return;
              beginUpload(file.name);
            }}
          />
        </label>
      </header>

      {uploadName && (
        <div className="rounded-2xl border border-slate-200 bg-white p-4" role="status">
          <div className="flex justify-between text-sm font-semibold">
            <span>{progress >= 100 ? 'Filed' : 'Reading'} {uploadName}</span>
            <span>{Math.min(progress, 100)}%</span>
          </div>
          <div className="mt-2 h-2 rounded-full bg-slate-100">
            <div className="h-2 rounded-full bg-teal-600" style={{ width: `${Math.min(progress, 100)}%` }} />
          </div>
          <p className="mt-2 text-xs text-slate-500">{progress >= 100 ? 'Summary and tags are suggestions. Accept them before they drive retention.' : 'Converting and extracting text.'}</p>
        </div>
      )}

      <div className="grid gap-4 lg:grid-cols-[220px_1fr_320px]">
        <nav className="rounded-2xl border border-slate-200 bg-white p-3" aria-label="Folders">
          <button type="button" onClick={() => setFolder('all')} className={`mb-1 flex min-h-11 w-full items-center rounded-xl px-3 text-left text-sm font-semibold ${folder === 'all' ? 'bg-teal-50 text-teal-900' : 'hover:bg-slate-50'}`}>All spaces</button>
          {folders.map((item) => (
            <button key={item.id} type="button" onClick={() => setFolder(item.id)} className={`mb-1 flex min-h-11 w-full items-center rounded-xl px-3 text-left text-sm font-semibold ${folder === item.id ? 'bg-teal-50 text-teal-900' : 'hover:bg-slate-50'}`}>
              {item.name}
            </button>
          ))}
        </nav>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3">Record</th>
                <th className="px-4 py-3">Marking</th>
                <th className="hidden px-4 py-3 md:table-cell">Version</th>
              </tr>
            </thead>
            <tbody>
              {visible.map((doc) => (
                <tr key={doc.id} className={doc.id === selected?.id ? 'bg-teal-50' : ''}>
                  <td className="px-4 py-3">
                    <button type="button" className="text-left font-semibold text-slate-900 hover:text-teal-800" onClick={() => setSelectedId(doc.id)}>
                      {doc.name}
                    </button>
                    <p className="text-xs text-slate-500">{doc.site}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`rounded px-2 py-1 text-[10px] font-bold ${classificationTone(doc.classification)}`}>{doc.classification}</span>
                  </td>
                  <td className="hidden px-4 py-3 md:table-cell">{doc.version}{locks[doc.id] ? ' · checked out' : ''}</td>
                </tr>
              ))}
              {visible.length === 0 && (
                <tr><td colSpan={3} className="px-4 py-8 text-slate-500">No records in this space match the search.</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {selected ? <aside className="space-y-4 rounded-2xl border border-slate-200 bg-white p-4">
          <p className={`inline-flex rounded px-2 py-1 text-[10px] font-bold ${classificationTone(selected.classification)}`}>{selected.classification}</p>
          <h2 className="font-heading text-lg font-bold leading-snug">{selected.name}</h2>
          <p className="text-sm text-slate-600">{selected.summary}</p>
          <dl className="grid grid-cols-2 gap-2 text-xs">
            <div><dt className="text-slate-400">Site</dt><dd className="font-semibold">{selected.site}</dd></div>
            <div><dt className="text-slate-400">Region</dt><dd className="font-semibold">{selected.region}</dd></div>
            <div><dt className="text-slate-400">Retention</dt><dd className="font-semibold">{selected.retention}</dd></div>
            <div><dt className="text-slate-400">Size</dt><dd className="font-semibold">{selected.size}</dd></div>
          </dl>
          <p className="text-xs text-slate-500">Tags: {selected.tags.join(', ')}</p>

          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-slate-400">Versions</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {selected.history.map((version) => (
                <button
                  key={version}
                  type="button"
                  className="min-h-11 rounded-lg border border-slate-200 px-3 text-xs font-bold hover:border-teal-400"
                  onClick={() => setDocs((current) => current.map((doc) => doc.id === selected.id ? { ...doc, version } : doc))}
                >
                  Restore {version}
                </button>
              ))}
            </div>
            <p className="mt-2 text-xs text-slate-500">Current version {selected.version}. Older bytes stay in the history.</p>
          </div>

          <button
            type="button"
            className="min-h-11 w-full rounded-xl bg-slate-900 text-sm font-bold text-white"
            onClick={() => setLocks((current) => ({ ...current, [selected.id]: current[selected.id] ? null : 'Aisha Rahman' }))}
          >
            {lockedBy ? `Check in · locked by ${lockedBy}` : 'Check out exclusively'}
          </button>

          <form
            className="space-y-2"
            onSubmit={(event) => {
              event.preventDefault();
              const person = colleagues.find((colleague) => colleague.name === shareWith);
              if (!person) return;
              if (person.clearance < selected.clearanceRank) {
                setShareMessage(`${person.name} holds ${person.clearanceLabel} clearance. This ${selected.classification} record cannot be shared.`);
                return;
              }
              setShareMessage(`Shared with ${person.name}. The audit log records the person and the version.`);
            }}
          >
            <label className="block text-xs font-bold text-slate-500">
              Share inside clearance
              <select value={shareWith} onChange={(event) => setShareWith(event.target.value)} className="mt-1 min-h-11 w-full rounded-xl border border-slate-200 px-3 text-sm">
                {colleagues.map((colleague) => (
                  <option key={colleague.name}>{colleague.name}</option>
                ))}
              </select>
            </label>
            <button type="submit" className="min-h-11 w-full rounded-xl border border-slate-300 text-sm font-bold">Share this version</button>
            {shareMessage && <p className="text-xs text-slate-700" role="status">{shareMessage}</p>}
          </form>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              if (!note.trim()) return;
              setComments((current) => ({ ...current, [selected.id]: [...(current[selected.id] || []), note.trim()] }));
              setNote('');
            }}
          >
            <label className="block text-xs font-bold text-slate-500">
              Comment on {selected.version}
              <textarea value={note} onChange={(event) => setNote(event.target.value)} rows={2} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm" />
            </label>
            <button type="submit" className="mt-2 min-h-11 w-full rounded-xl border border-slate-300 text-sm font-bold">Add comment</button>
          </form>
          <ul className="space-y-2 text-xs text-slate-600">
            {(comments[selected.id] || []).map((comment) => <li key={comment} className="rounded-lg bg-slate-50 p-2">{comment}</li>)}
          </ul>
        </aside> : <aside className="rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-500">No records in this space.</aside>}
      </div>
    </div>
  );
}
