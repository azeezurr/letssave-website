'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LogOut, Save, Home, ChevronRight, LayoutDashboard, FileText, Sparkles, HelpCircle, HardDrive } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Sidebar() {
    const pathname = usePathname();

    const navigation = [
        { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
        { name: 'Documents', href: '/documents', icon: FileText },
        { name: 'AI Hub', href: '/ai-hub', icon: Sparkles },
        { name: 'Help', href: '/help', icon: HelpCircle },
    ];

    return (
        <aside className="w-64 bg-slate-900 text-white h-screen flex flex-col fixed left-0 top-0 z-50 shadow-2xl border-r border-slate-800">
            <div className="p-10 flex items-center gap-4">
                <img src="/letssave-logo.jpg" alt="LetsSave Logo" className="h-20 w-auto" />
            </div>

            <nav className="flex-1 mt-4 px-4 space-y-2 overflow-y-auto no-scrollbar">
                <Link
                    href="/"
                    className={cn(
                        "w-full flex items-center justify-between gap-3 px-5 py-4 rounded-2xl text-slate-400 hover:bg-slate-800/60 hover:text-white transition-all group mb-8",
                        pathname === '/' && "bg-slate-800/60 text-white"
                    )}
                >
                    <div className="flex items-center gap-3">
                        <Home size={18} className="group-hover:text-indigo-400 transition-colors" />
                        <span className="font-bold text-xs uppercase tracking-widest">Home Base</span>
                    </div>
                    <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                </Link>

                <div className="px-5 py-2 text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] mb-4">Core Platform</div>

                {navigation.map((item) => {
                    const isActive = pathname.startsWith(item.href);
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                "w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-500 group relative",
                                isActive
                                    ? 'bg-indigo-600 text-white shadow-2xl shadow-indigo-950/40'
                                    : 'text-slate-400 hover:bg-slate-800/40 hover:text-white'
                            )}
                        >
                            {isActive && (
                                <div className="absolute right-3 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_10px_white]" />
                            )}
                            <span className={cn(isActive ? 'text-white' : 'text-slate-500 group-hover:text-indigo-400 transition-all duration-300')}>
                                <item.icon size={20} />
                            </span>
                            <span className="font-bold text-sm tracking-tight">{item.name}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-6 m-4 bg-slate-800/40 rounded-[2rem] border border-slate-700/50 backdrop-blur-md">
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-slate-700 border-2 border-slate-600 flex items-center justify-center text-sm font-black shadow-inner">JD</div>
                    <div className="flex-1 overflow-hidden">
                        <p className="text-sm font-black truncate leading-none mb-1">John Doe</p>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Administrator</p>
                    </div>
                </div>
                <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white rounded-xl transition-all text-xs font-black uppercase tracking-widest">
                    <LogOut size={14} />
                    Secure Logout
                </button>
            </div>
        </aside>
    );
}
