import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import MarketingShell from '@/components/marketing/MarketingShell';
import SolutionDetail from '@/components/marketing/SolutionDetail';
import { features, getFeature } from '@/lib/catalog';

export function generateStaticParams() {
  return features.map((feature) => ({ slug: feature.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const feature = getFeature(slug);
  if (!feature) return { title: 'Capability' };
  return { title: feature.title, description: feature.summary };
}

export default async function SolutionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const feature = getFeature(slug);
  if (!feature) notFound();
  return (
    <MarketingShell>
      <SolutionDetail feature={feature} />
    </MarketingShell>
  );
}
