import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';
import ChatBot from '@/components/ChatBot';
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });

export const metadata: Metadata = {
  title: 'LetsSave - AI Empowered Document Management System',
  description: 'AI-Powered Document Management with Gemini Pro Vision. Enterprise-grade security, compliance, and collaboration.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className={`${inter.variable} ${outfit.variable} font-sans bg-[#f8fafc] text-slate-900 selection:bg-indigo-100 selection:text-indigo-900`}>
        {children}
        <ChatBot />
        <Analytics />
      </body>
    </html>
  );
}
