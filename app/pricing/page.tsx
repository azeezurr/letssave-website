import type { Metadata } from 'next';
import { Check, Minus } from 'lucide-react';
import ConsultButton from '@/components/marketing/ConsultButton';
import MarketingShell from '@/components/marketing/MarketingShell';
import PageIntro from '@/components/marketing/PageIntro';
import { comparisonRows, pricingTiers } from '@/lib/catalog';

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'Team, Professional, and Enterprise evaluations. Commercial terms are quoted from volume, residency, and deployment.',
};

export default function PricingPage() {
  return (
    <MarketingShell>
      <main className="px-4 pb-20 pt-32 sm:px-6 lg:px-8">
        <PageIntro
          eyebrow="Evaluations"
          title="Choose the scope. We quote the commercial terms."
          lede="LetsSave is priced from document volume, residency, and whether the system runs in our region or yours. These tiers show what is in each evaluation, not a public rate card."
        />
        <div className="mx-auto mt-12 grid max-w-6xl gap-5 lg:grid-cols-3">
          {pricingTiers.map((tier) => (
            <article
              key={tier.id}
              className={`flex flex-col rounded-3xl border p-6 ${tier.recommended ? 'border-teal-600 bg-teal-950 text-white shadow-xl' : 'border-slate-200 bg-white'}`}
            >
              <div className="flex items-center justify-between">
                <h2 className="font-heading text-2xl font-black">{tier.name}</h2>
                {tier.recommended && <span className="rounded-full bg-teal-400 px-2 py-0.5 text-[10px] font-bold uppercase text-teal-950">Recommended</span>}
              </div>
              <p className={`mt-2 text-sm ${tier.recommended ? 'text-teal-100' : 'text-slate-500'}`}>{tier.audience}</p>
              <p className="mt-4 text-sm leading-relaxed">{tier.summary}</p>
              <ul className="mt-5 flex-1 space-y-2 text-sm">
                {tier.includes.map((item) => (
                  <li key={item} className="flex gap-2">
                    <Check size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <ConsultButton label={tier.cta} variant={tier.recommended ? 'light' : 'primary'} />
              </div>
            </article>
          ))}
        </div>

        <section className="mx-auto mt-16 max-w-6xl overflow-x-auto">
          <h2 className="font-heading text-2xl font-black text-slate-900">What each evaluation includes</h2>
          <table className="mt-5 w-full min-w-[640px] border-separate border-spacing-0 text-left text-sm">
            <thead>
              <tr>
                <th className="border-b border-slate-200 py-3 pr-4 font-heading">Capability</th>
                <th className="border-b border-slate-200 py-3 font-heading">Team</th>
                <th className="border-b border-slate-200 py-3 font-heading text-teal-800">Professional</th>
                <th className="border-b border-slate-200 py-3 font-heading">Enterprise</th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row) => (
                <tr key={row.label}>
                  <th scope="row" className="border-b border-slate-100 py-3 pr-4 font-medium text-slate-700">{row.label}</th>
                  {[row.team, row.professional, row.enterprise].map((included, index) => (
                    <td key={index} className="border-b border-slate-100 py-3">
                      {included ? (
                        <span className="inline-flex items-center gap-1 font-semibold text-teal-800"><Check size={16} aria-hidden="true" /> Included</span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-slate-400"><Minus size={16} aria-hidden="true" /> Not in this tier</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </MarketingShell>
  );
}
