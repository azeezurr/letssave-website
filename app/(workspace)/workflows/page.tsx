import type { Metadata } from 'next';
import WorkflowsModule from '@/components/workspace/WorkflowsModule';

export const metadata: Metadata = { title: 'BPM studio' };

export default function WorkflowsPage() {
  return <WorkflowsModule />;
}
