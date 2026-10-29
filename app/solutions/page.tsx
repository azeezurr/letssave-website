import type { Metadata } from 'next';
import MarketingShell from '@/components/marketing/MarketingShell';
import PageIntro from '@/components/marketing/PageIntro';
import SolutionsBrowser from '@/components/marketing/SolutionsBrowser';
import { features } from '@/lib/catalog';

export const metadata: Metadata = {
  title: 'Platform capabilities',
  description: 'Every LetsSave capability: vault, archiving, paperless capture, cases, BPM, governance, search, and secure viewing.',
};

export default function SolutionsPage() {
  return (
    <MarketingShell>
      <main className="px-4 pb-20 pt-32 sm:px-6 lg:px-8">
        <PageIntro
          eyebrow="Platform"
          title="Every capability in one catalogue"
          lede={`LetsSave covers the document lifecycle in ${features.length} capabilities, from capture and classification through retention, cases, and cited answers.`}
        />
        <div className="mx-auto mt-10 max-w-7xl">
          <SolutionsBrowser />
        </div>
      </main>
    </MarketingShell>
  );
}
