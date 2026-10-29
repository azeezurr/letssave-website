import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import MarketingShell from '@/components/marketing/MarketingShell';
import { getResource, resources } from '@/lib/catalog';

export function generateStaticParams() {
  return resources.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getResource(slug);
  if (!article) return { title: 'Resource' };
  return { title: article.title, description: article.summary };
}

export default async function ResourcePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getResource(slug);
  if (!article) notFound();

  return (
    <MarketingShell>
      <main className="px-4 pb-20 pt-32 sm:px-6 lg:px-8">
        <article className="mx-auto max-w-3xl">
          <Link href="/resources" className="text-sm font-semibold text-teal-800 hover:underline">All resources</Link>
          <p className="mt-4 text-xs font-bold uppercase tracking-wider text-teal-800">{article.category} · {article.minutes}</p>
          <h1 className="mt-3 font-heading text-4xl font-black tracking-tight text-slate-900">{article.title}</h1>
          <p className="mt-4 text-lg text-slate-600">{article.summary}</p>
          <div className="mt-10 space-y-8">
            {article.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="font-heading text-2xl font-bold text-slate-900">{section.heading}</h2>
                <p className="mt-3 leading-relaxed text-slate-700">{section.body}</p>
              </section>
            ))}
          </div>
        </article>
      </main>
    </MarketingShell>
  );
}
