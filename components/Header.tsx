'use client';
import React, { useState, useEffect } from 'react';
import { Bell, Search, Settings, Command } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Header() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={cn(
            "sticky top-0 z-40 transition-all duration-300",
            scrolled ? 'p-4' : 'p-10 pb-4'
        )}>
            <div className={cn(
                "flex items-center justify-between mx-auto max-w-7xl transition-all duration-500",
                scrolled ? 'glass px-8 py-4 rounded-[2rem] shadow-xl shadow-slate-200/40' : ''
            )}>
                <div className="flex items-center gap-4 bg-white/60 backdrop-blur-sm px-6 py-3.5 rounded-2xl border border-slate-200/60 shadow-sm w-full max-w-[480px] focus-within:ring-4 focus-within:ring-indigo-500/10 focus-within:border-indigo-400 transition-all group">
                    <Search className="text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={20} />
                    <input
                        type="text"
                        placeholder="Search repository, AI insights, help..."
                        className="bg-transparent border-none focus:outline-none text-sm w-full font-semibold placeholder:text-slate-400"
                    />
                    <div className="flex items-center gap-1 opacity-40 group-focus-within:opacity-100 transition-opacity">
                        <Command size={14} />
                        <span className="text-[10px] font-bold">K</span>
                    </div>
                </div>

                <div className="flex items-center gap-8 pl-8">
                    <div className="flex items-center gap-2">
                        <button className="relative p-3 text-slate-500 hover:text-indigo-600 hover:bg-white rounded-xl transition-all shadow-sm border border-transparent hover:border-slate-100" aria-label="Notifications">
                            <Bell size={22} />
                            <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-indigo-500 rounded-full border-2 border-white"></span>
                        </button>
                        <button className="p-3 text-slate-500 hover:text-indigo-600 hover:bg-white rounded-xl transition-all shadow-sm border border-transparent hover:border-slate-100" aria-label="Settings">
                            <Settings size={22} />
                        </button>
                    </div>

                    <div className="h-10 w-px bg-slate-200/60"></div>

                    <div className="flex items-center gap-4 group cursor-pointer">
                        <div className="text-right hidden xl:block">
                            <p className="text-sm font-extrabold text-slate-900 leading-none mb-1 group-hover:text-indigo-600 transition-colors">John Doe</p>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Enterprise Admin</p>
                        </div>
                        <div className="relative">
                            <div className="w-12 h-12 rounded-2xl bg-indigo-100 p-0.5 group-hover:scale-105 transition-transform">
                                <img
                                    src="https://picsum.photos/seed/johndoe/64/64"
                                    alt="Profile"
                                    className="w-full h-full rounded-[0.85rem] object-cover shadow-md"
                                />
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-4 border-[#f8fafc] rounded-full"></div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
