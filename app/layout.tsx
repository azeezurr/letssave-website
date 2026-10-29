import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';
import ChatBot from '@/components/ChatBot';
import { DemoModalProvider } from '@/components/marketing/DemoModalProvider';
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });

export const metadata: Metadata = {
  title: {
    default: 'LetsSave — Enterprise document management & archiving',
    template: '%s · LetsSave',
  },
  description: 'Document vault, WORM archiving, paperless capture, case SLAs, visual BPM, and a citation-backed knowledge assistant. Cloud, on-premises, or air-gapped.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className={`${inter.variable} ${outfit.variable} font-sans bg-[#f8fafc] text-slate-900 selection:bg-indigo-100 selection:text-indigo-900`}>
        <DemoModalProvider>
          {children}
          <ChatBot />
        </DemoModalProvider>
        <Analytics />
      </body>
    </html>
  );
}
