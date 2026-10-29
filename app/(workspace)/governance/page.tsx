import type { Metadata } from 'next';
import GovernanceModule from '@/components/workspace/GovernanceModule';

export const metadata: Metadata = { title: 'Governance' };

export default function GovernancePage() {
  return <GovernanceModule />;
}
