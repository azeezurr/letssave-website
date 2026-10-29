import type { Metadata } from 'next';
import ViewerModule from '@/components/workspace/ViewerModule';

export const metadata: Metadata = { title: 'Secure viewer' };

export default async function ViewerPage({ searchParams }: { searchParams: Promise<{ doc?: string }> }) {
  const params = await searchParams;
  return <ViewerModule key={params.doc || 'default'} initialDoc={params.doc} />;
}
