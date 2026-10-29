'use client';

import { useState } from 'react';
import { archiveRecords } from '@/lib/workspace-data';

export default function ArchiveModule() {
  const [records, setRecords] = useState(archiveRecords);
  const [message, setMessage] = useState('Disposition stays blocked until the date has passed and no hold is active.');

  return (
    <div className="space-y-5">
      <header>
        <p className="text-xs font-bold uppercase tracking-wider text-teal-800">WORM archive</p>
        <h1 className="font-heading text-3xl font-black">Records that cannot be quietly edited</h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-600">Each object is sealed with its retention class. A hold beats the calendar. Destruction, when it is allowed, is an event.</p>
      </header>
      <p className="rounded-2xl bg-white p-4 text-sm text-slate-700" role="status">{message}</p>
      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              <th className="px-4 py-3">Record</th>
              <th className="px-4 py-3">Expires</th>
              <th className="px-4 py-3">Hold</th>
              <th className="px-4 py-3">Disposition</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record) => {
              const blocked = record.hold || !record.eligible;
              const reason = record.hold ? 'Legal hold is on.' : 'The retention date has not passed.';
              return (
                <tr key={record.id} className="border-t border-slate-100">
                  <td className="px-4 py-4">
                    <p className="font-semibold">{record.title}</p>
                    <p className="text-xs text-slate-500">{record.id} · {record.series} · WORM sealed</p>
                  </td>
                  <td className="px-4 py-4">{record.expires}</td>
                  <td className="px-4 py-4">
                    <button
                      type="button"
                      className="min-h-11 rounded-lg border border-slate-300 px-3 text-xs font-bold"
                      onClick={() => setRecords((current) => current.map((item) => item.id === record.id ? { ...item, hold: !item.hold } : item))}
                    >
                      {record.hold ? 'Release hold' : 'Place hold'}
                    </button>
                  </td>
                  <td className="px-4 py-4">
                    <button
                      type="button"
                      className="min-h-11 rounded-lg bg-slate-900 px-3 text-xs font-bold text-white disabled:bg-slate-200 disabled:text-slate-500"
                      disabled={blocked}
                      onClick={() => {
                        setRecords((current) => current.filter((item) => item.id !== record.id));
                        setMessage(`${record.id} was dispositioned. The bytes are gone. The event remains.`);
                      }}
                    >
                      {blocked ? 'Blocked' : 'Disposition'}
                    </button>
                    {blocked && <p className="mt-1 max-w-40 text-xs text-slate-500">{reason}</p>}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
