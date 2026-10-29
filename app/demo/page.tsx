import { Suspense } from 'react';
import type { Metadata } from 'next';
import DemoExperience from '@/components/marketing/DemoExperience';
import MarketingShell from '@/components/marketing/MarketingShell';

export const metadata: Metadata = {
  title: 'Live prototype',
  description: 'Click through the LetsSave document vault, cases, workflows, governance, assistant, and secure viewer.',
};

export default function DemoPage() {
  return (
    <MarketingShell>
      <Suspense fallback={<p className="px-4 pb-20 pt-36 text-center text-sm text-slate-500">Opening the prototype…</p>}>
        <DemoExperience />
      </Suspense>
    </MarketingShell>
  );
}
