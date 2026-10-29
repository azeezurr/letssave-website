import type { Metadata } from 'next';
import MarketingShell from '@/components/marketing/MarketingShell';
import PageIntro from '@/components/marketing/PageIntro';
import ResourceLibrary from '@/components/marketing/ResourceLibrary';

export const metadata: Metadata = {
  title: 'Resources',
  description: 'Architecture notes, retention guidance, BPM practice, and integration notes for LetsSave.',
};

export default function ResourcesPage() {
  return (
    <MarketingShell>
      <main className="px-4 pb-20 pt-32 sm:px-6 lg:px-8">
        <PageIntro
          eyebrow="Resources"
          title="Read the decisions before the demo"
          lede="Short guides written for records managers, security reviewers, and the people who will integrate the vault."
        />
        <div className="mx-auto mt-10 max-w-5xl">
          <ResourceLibrary />
        </div>
      </main>
    </MarketingShell>
  );
}
