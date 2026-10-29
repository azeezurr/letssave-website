'use client';

import { ArrowRight } from 'lucide-react';
import { useDemoModal } from './DemoModalProvider';

export default function ConsultButton({
  label = 'Schedule a consultation',
  interest,
  variant = 'primary',
}: {
  label?: string;
  interest?: string;
  variant?: 'primary' | 'secondary' | 'light';
}) {
  const { openDemo } = useDemoModal();
  const styles = {
    primary: 'bg-teal-700 text-white hover:bg-teal-800',
    secondary: 'border border-slate-300 bg-white text-slate-800 hover:bg-slate-50',
    light: 'bg-white text-teal-900 hover:bg-teal-50',
  }[variant];
  return (
    <button
      type="button"
      onClick={() => openDemo(interest)}
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 font-heading text-sm font-bold transition ${styles}`}
    >
      {label}
      <ArrowRight size={16} aria-hidden="true" />
    </button>
  );
}
