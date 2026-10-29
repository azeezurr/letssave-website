import type { Metadata } from 'next';
import DashboardHome from '@/components/workspace/DashboardHome';

export const metadata: Metadata = {
  title: 'Command centre',
  description: 'LetsSave evaluation workspace: records, cases, attestations, and archive holds.',
};

export default function DashboardPage() {
  return <DashboardHome />;
}
