'use client';
import React from 'react';
import { FileText, Clock, CheckCircle } from 'lucide-react';

export default function DashboardPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Welcome back, John</h1>
                <p className="text-slate-500 font-medium">Here is what's happening in your repository today.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Total Documents</p>
                        <p className="text-4xl font-black text-slate-900">1,248</p>
                    </div>
                    <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center">
                        <FileText size={24} />
                    </div>
                </div>
                <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Pending Approval</p>
                        <p className="text-4xl font-black text-slate-900">12</p>
                    </div>
                    <div className="w-12 h-12 bg-amber-50 text-amber-500 rounded-2xl flex items-center justify-center">
                        <Clock size={24} />
                    </div>
                </div>
                <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Approved</p>
                        <p className="text-4xl font-black text-slate-900">856</p>
                    </div>
                    <div className="w-12 h-12 bg-emerald-50 text-emerald-500 rounded-2xl flex items-center justify-center">
                        <CheckCircle size={24} />
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-sm">
                <h2 className="text-xl font-bold text-slate-900 mb-6">Recent Documents</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-slate-100 text-xs font-bold text-slate-400 uppercase tracking-wider">
                                <th className="pb-4 pl-4">Name</th>
                                <th className="pb-4">Status</th>
                                <th className="pb-4">Date</th>
                                <th className="pb-4 text-right pr-4">Size</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {[1, 2, 3].map((_, i) => (
                                <tr key={i} className="group hover:bg-slate-50 transition-colors">
                                    <td className="py-4 pl-4 font-bold text-slate-700 group-hover:text-indigo-600 transition-colors">
                                        Quarterly_Report_Q3.pdf
                                    </td>
                                    <td className="py-4">
                                        <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-xs font-bold uppercase tracking-wider">Approved</span>
                                    </td>
                                    <td className="py-4 text-slate-500 font-medium text-sm">Oct 24, 2024</td>
                                    <td className="py-4 text-right pr-4 text-slate-400 text-sm font-bold">2.4 MB</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
