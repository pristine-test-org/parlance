import type { Metadata } from 'next';
import { Inter, JetBrains_Mono, Newsreader } from 'next/font/google';
import { AVERAGE_WINDOW } from '@/lib/voice/core-skill-average';
import './globals.css';

const newsreader = Newsreader({ subsets: ['latin'], variable: '--font-newsreader' });
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains-mono' });

export const metadata: Metadata = {
  title: 'Parlance',
  description: 'Rehearse the conversations that matter before you have them.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`dark ${newsreader.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-dvh antialiased" data-average-window={AVERAGE_WINDOW}>{children}</body>
    </html>
  );
}
