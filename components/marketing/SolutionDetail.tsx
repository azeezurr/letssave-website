import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { features, relatedFeatures, type Feature } from '@/lib/catalog';
import { FeatureIcon } from './feature-icons';
import ConsultButton from './ConsultButton';

export default function SolutionDetail({ feature }: { feature: Feature }) {
  const related = relatedFeatures(feature.slug);
  const more = related.length > 0 ? related : features.filter((item) => item.slug !== feature.slug).slice(0, 3);

  return (
    <article className="px-4 pb-20 pt-32 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <nav className="mb-6 text-sm text-slate-500" aria-label="Breadcrumb">
          <Link href="/solutions" className="font-semibold text-teal-800 hover:underline">Platform</Link>
          <span aria-hidden="true"> / </span>
          <span>{feature.categoryLabel}</span>
        </nav>
        <div className="grid items-start gap-10 lg:grid-cols-[1.3fr_0.7fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-teal-800">{feature.categoryLabel}</p>
            <h1 className="mt-3 font-heading text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">{feature.title}</h1>
            <p className="mt-5 text-lg leading-relaxed text-slate-600">{feature.summary}</p>
            <ul className="mt-6 space-y-3">
              {feature.outcomes.map((outcome) => (
                <li key={outcome} className="flex gap-3 text-sm text-slate-700">
                  <CheckCircle2 className="mt-0.5 shrink-0 text-teal-700" size={18} aria-hidden="true" />
                  <span>{outcome}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href={feature.workspaceHref} className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-700 px-5 py-3 font-heading text-sm font-bold text-white hover:bg-teal-800">
                Open in the workspace
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <Link href={`/demo?tab=${feature.demoTab}`} className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-5 py-3 font-heading text-sm font-bold text-slate-800 hover:bg-slate-50">
                Try the live prototype
              </Link>
            </div>
          </div>
          <aside className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-700 text-white">
              <FeatureIcon name={feature.icon} />
            </div>
            <p className="mt-4 text-xs font-bold uppercase tracking-wider text-teal-800">{feature.badge}</p>
            <h2 className="mt-2 font-heading text-xl font-bold text-slate-900">How a team uses it</h2>
            <ol className="mt-4 space-y-4">
              {feature.steps.map((step, index) => (
                <li key={step.title}>
                  <p className="text-xs font-bold text-slate-400">Step {index + 1}</p>
                  <p className="font-heading font-bold text-slate-900">{step.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">{step.detail}</p>
                </li>
              ))}
            </ol>
          </aside>
        </div>

        <section className="mt-16">
          <h2 className="font-heading text-2xl font-black text-slate-900">Related capabilities</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {more.map((item) => (
              <Link key={item.slug} href={`/solutions/${item.slug}`} className="rounded-2xl border border-slate-200 p-5 hover:border-teal-400 hover:shadow-md">
                <FeatureIcon name={item.icon} />
                <h3 className="mt-3 font-heading font-bold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{item.summary}</p>
              </Link>
            ))}
          </div>
          <div className="mt-10">
            <ConsultButton label="Discuss this capability" />
          </div>
        </section>
      </div>
    </article>
  );
}
