import type { Metadata } from 'next';
import AssistantModule from '@/components/workspace/AssistantModule';

export const metadata: Metadata = { title: 'AI knowledge' };

export default function AiHubPage() {
  return <AssistantModule />;
}
