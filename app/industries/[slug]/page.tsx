import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CheckCircle2 } from 'lucide-react';
import ConsultButton from '@/components/marketing/ConsultButton';
import MarketingShell from '@/components/marketing/MarketingShell';
import { getFeature, getIndustry, industries } from '@/lib/catalog';

export function generateStaticParams() {
  return industries.map((industry) => ({ slug: industry.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) return { title: 'Industry' };
  return { title: industry.name, description: industry.summary };
}

export default async function IndustryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) notFound();
  const linked = industry.featureSlugs.map((featureSlug) => getFeature(featureSlug)).filter((feature) => feature !== undefined);

  return (
    <MarketingShell>
      <main className="px-4 pb-20 pt-32 sm:px-6 lg:px-8">
        <article className="mx-auto max-w-5xl">
          <Link href="/industries" className="text-sm font-semibold text-teal-800 hover:underline">All industries</Link>
          <h1 className="mt-4 font-heading text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">{industry.name}</h1>
          <p className="mt-4 max-w-3xl text-lg text-slate-600">{industry.headline}</p>
          <p className="mt-4 max-w-3xl text-slate-700">{industry.summary}</p>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <section className="rounded-3xl border border-slate-200 p-6">
              <h2 className="font-heading text-xl font-bold">Where the work stalls today</h2>
              <ul className="mt-4 space-y-3">
                {industry.pains.map((pain) => (
                  <li key={pain} className="text-sm text-slate-700">{pain}</li>
                ))}
              </ul>
            </section>
            <section className="rounded-3xl border border-teal-100 bg-teal-50/60 p-6">
              <h2 className="font-heading text-xl font-bold">What changes</h2>
              <ul className="mt-4 space-y-3">
                {industry.outcomes.map((outcome) => (
                  <li key={outcome} className="flex gap-2 text-sm text-slate-800">
                    <CheckCircle2 className="mt-0.5 shrink-0 text-teal-700" size={16} aria-hidden="true" />
                    {outcome}
                  </li>
                ))}
              </ul>
            </section>
          </div>
          <h2 className="mt-12 font-heading text-2xl font-black">Capabilities this sector uses first</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {linked.map((feature) => (
              <Link key={feature.slug} href={`/solutions/${feature.slug}`} className="rounded-2xl border border-slate-200 p-5 hover:border-teal-400">
                <h3 className="font-heading font-bold text-slate-900">{feature.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{feature.summary}</p>
              </Link>
            ))}
          </div>
          <div className="mt-10">
            <ConsultButton label={`Talk about ${industry.name}`} />
          </div>
        </article>
      </main>
    </MarketingShell>
  );
}
