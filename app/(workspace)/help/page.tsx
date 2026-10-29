import type { Metadata } from 'next';
import HelpModule from '@/components/workspace/HelpModule';

export const metadata: Metadata = { title: 'Workspace help' };

export default function HelpPage() {
  return <HelpModule />;
}