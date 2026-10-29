'use client';

import { useSearchParams } from 'next/navigation';
import InteractivePrototype, { type PrototypeTab } from '@/components/InteractivePrototype';

const tabs: PrototypeTab[] = ['documents', 'cases', 'workflows', 'governance', 'assistant', 'secure-viewer'];

export default function DemoExperience() {
  const params = useSearchParams();
  const requested = params.get('tab');
  const tab = tabs.includes(requested as PrototypeTab) ? (requested as PrototypeTab) : 'documents';

  return (
    <div className="pt-24">
      <InteractivePrototype key={tab} initialTab={tab} />
    </div>
  );
}
