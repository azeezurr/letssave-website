import type { Metadata } from 'next';
import DocumentsModule from '@/components/workspace/DocumentsModule';

export const metadata: Metadata = { title: 'Document vault' };

export default async function DocumentsPage({ searchParams }: { searchParams: Promise<{ doc?: string; q?: string }> }) {
  const params = await searchParams;
  return <DocumentsModule key={`${params.doc || ''}:${params.q || ''}`} initialDoc={params.doc} initialQuery={params.q} />;
}
