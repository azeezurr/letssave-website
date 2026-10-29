'use client';

import Navbar from '@/components/Navbar';
import SiteFooter from './SiteFooter';
import { useDemoModal } from './DemoModalProvider';

export default function MarketingShell({ children }: { children: React.ReactNode }) {
  const { openDemo } = useDemoModal();
  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-slate-900">
      <Navbar onOpenDemoModal={() => openDemo()} />
      {children}
      <SiteFooter />
    </div>
  );
}
