import type { Metadata } from 'next';
import CasesModule from '@/components/workspace/CasesModule';

export const metadata: Metadata = { title: 'Cases and SLA' };

export default async function CasesPage({ searchParams }: { searchParams: Promise<{ case?: string }> }) {
  const params = await searchParams;
  return <CasesModule key={params.case || 'default'} initialCase={params.case} />;
}
