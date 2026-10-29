'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ArrowRight, Menu, PlayCircle, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavbarProps {
  onOpenDemoModal: () => void;
}

const primaryLinks = [
  { href: '/solutions', label: 'Platform' },
  { href: '/industries', label: 'Industries' },
  { href: '/security', label: 'Security' },
  { href: '/deployment', label: 'Deployment' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/resources', label: 'Resources' },
];

export default function Navbar({ onOpenDemoModal }: NavbarProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = () => setMobileOpen(false);

  const itemClass = (href: string) =>
    cn(
      'rounded-lg px-3 py-2 text-sm font-semibold transition',
      pathname === href || pathname.startsWith(`${href}/`)
        ? 'bg-teal-50 text-teal-800'
        : 'text-slate-700 hover:bg-slate-50 hover:text-teal-800'
    );

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 border-b transition-all',
        scrolled ? 'border-slate-200 bg-white/95 py-2.5 shadow-sm backdrop-blur-md' : 'border-slate-100 bg-white/90 py-3.5 backdrop-blur-sm'
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <span className="rounded-2xl border border-slate-200 bg-white p-1 shadow-sm">
            <Image src="/letssave-logo.jpg" alt="" width={180} height={72} className="h-11 w-auto rounded-xl object-contain sm:h-12" />
          </span>
          <span className="min-w-0">
            <span className="block font-heading text-lg font-black leading-none text-slate-900 sm:text-xl">LetsSave</span>
            <span className="mt-1 hidden text-[11px] text-slate-500 sm:block">Document management & archiving</span>
          </span>
        </Link>

        <nav className="hidden items-center xl:flex" aria-label="Primary">
          {primaryLinks.map((link) => (
            <Link key={link.href} href={link.href} className={itemClass(link.href)} onClick={closeMenu}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Link href="/demo" className="inline-flex items-center gap-2 rounded-xl border border-teal-200 bg-teal-50 px-3 py-2 text-sm font-bold text-teal-800 hover:bg-teal-100">
            <PlayCircle size={16} aria-hidden="true" />
            Live prototype
          </Link>
          <Link href="/dashboard" className="hidden rounded-xl px-3 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50 lg:inline">
            Workspace
          </Link>
          <button type="button" onClick={onOpenDemoModal} className="inline-flex items-center gap-2 rounded-xl bg-teal-700 px-4 py-2.5 text-sm font-bold text-white hover:bg-teal-800">
            Consultation
            <ArrowRight size={15} aria-hidden="true" />
          </button>
        </div>

        <button
          type="button"
          className="rounded-xl p-2.5 text-slate-800 hover:bg-slate-100 xl:hidden"
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMobileOpen((open) => !open)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <nav id="mobile-navigation" className="max-h-[calc(100vh-76px)] overflow-y-auto border-t border-slate-200 bg-white px-4 py-4 xl:hidden" aria-label="Mobile">
          <div className="space-y-1">
            {primaryLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={closeMenu} className="block rounded-xl px-3 py-3 text-sm font-bold text-slate-800 hover:bg-slate-50">
                {link.label}
              </Link>
            ))}
            <Link href="/demo" onClick={closeMenu} className="block rounded-xl px-3 py-3 text-sm font-bold text-teal-800 hover:bg-teal-50">Live prototype</Link>
            <Link href="/dashboard" onClick={closeMenu} className="block rounded-xl px-3 py-3 text-sm font-bold text-slate-800 hover:bg-slate-50">Product workspace</Link>
            <Link href="/contact" onClick={closeMenu} className="block rounded-xl px-3 py-3 text-sm font-bold text-slate-800 hover:bg-slate-50">Contact</Link>
          </div>
          <button type="button" onClick={onOpenDemoModal} className="mt-3 w-full rounded-xl bg-teal-700 py-3.5 text-sm font-bold text-white">
            Schedule a consultation
          </button>
        </nav>
      )}
    </header>
  );
}
