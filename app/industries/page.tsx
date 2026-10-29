import type { Metadata } from 'next';
import Link from 'next/link';
import MarketingShell from '@/components/marketing/MarketingShell';
import PageIntro from '@/components/marketing/PageIntro';
import { FeatureIcon } from '@/components/marketing/feature-icons';
import { industries } from '@/lib/catalog';

export const metadata: Metadata = {
  title: 'Industries',
  description: 'How LetsSave is used in legal, healthcare, manufacturing, engineering, finance, and government.',
};

export default function IndustriesPage() {
  return (
    <MarketingShell>
      <main className="px-4 pb-20 pt-32 sm:px-6 lg:px-8">
        <PageIntro
          eyebrow="Industries"
          title="The same platform, aimed at the work you already do"
          lede="Each sector below uses the capabilities that match its records, its deadlines, and the rules it has to show an auditor."
        />
        <div className="mx-auto mt-12 grid max-w-6xl gap-5 md:grid-cols-2">
          {industries.map((industry) => (
            <Link key={industry.slug} href={`/industries/${industry.slug}`} className="rounded-3xl border border-slate-200 bg-white p-7 hover:border-teal-400 hover:shadow-lg">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-teal-700 text-white">
                <FeatureIcon name={industry.icon} />
              </span>
              <h2 className="mt-4 font-heading text-2xl font-black text-slate-900">{industry.name}</h2>
              <p className="mt-2 text-slate-600">{industry.headline}</p>
            </Link>
          ))}
        </div>
      </main>
    </MarketingShell>
  );
}
