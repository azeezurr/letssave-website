import type { Metadata } from 'next';
import ArchiveModule from '@/components/workspace/ArchiveModule';

export const metadata: Metadata = { title: 'WORM archive' };

export default function ArchivePage() {
  return <ArchiveModule />;
}
