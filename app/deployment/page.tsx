import type { Metadata } from 'next';
import MarketingShell from '@/components/marketing/MarketingShell';
import PageIntro from '@/components/marketing/PageIntro';
import ConsultButton from '@/components/marketing/ConsultButton';
import { deployments } from '@/lib/catalog';

export const metadata: Metadata = {
  title: 'Deployment',
  description: 'Run LetsSave in a private cloud, your data centre, a hybrid fabric, Kubernetes, or fully air-gapped.',
};

export default function DeploymentPage() {
  return (
    <MarketingShell>
      <main className="px-4 pb-20 pt-32 sm:px-6 lg:px-8">
        <PageIntro
          eyebrow="Deployment"
          title="The product follows the network you are allowed to use"
          lede="Private cloud, your own machines, a hybrid tier, containers, a managed region, or a build with no path to the public internet."
        />
        <div className="mx-auto mt-12 grid max-w-6xl gap-5 md:grid-cols-2 lg:grid-cols-3">
          {deployments.map((option) => (
            <article key={option.title} className="flex flex-col rounded-3xl border border-slate-200 bg-white p-6">
              <p className="text-xs font-bold uppercase tracking-wider text-teal-800">{option.badge}</p>
              <h2 className="mt-2 font-heading text-xl font-black text-slate-900">{option.title}</h2>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">{option.summary}</p>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                {option.points.map((point) => (
                  <li key={point} className="border-t border-slate-100 pt-2">{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <div className="mx-auto mt-10 max-w-6xl">
          <ConsultButton label="Plan a deployment workshop" />
        </div>
      </main>
    </MarketingShell>
  );
}
