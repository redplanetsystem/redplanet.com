// app/layout.tsx
//
// Enterprise-Grade Red Planet Root Layout
// Founders: Deblaq & Win | Core Builder: Deblaq
// Wraps the entire Next.js application with global font styling, the PlayerProvider context,
// persistent navigation, footer, and the floating music player across all multi-country streaming nodes.

import type { Metadata } from 'next';
import { PlayerProvider } from '@/context/PlayerContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MusicPlayer from '@/components/MusicPlayer';
import '@/app/globals.css';

export const metadata: Metadata = {
  title: 'Red Planet // Multi-Planetary Syndicate & Music Empire',
  description: 'Engineered by Deblaq & Win. Preparing humanity for Mars through cinematic music, autonomous trading systems, and multi-country streaming distribution.',
  keywords: ['Red Planet', 'Deblaq', 'Win', 'Mars Colonization', 'Music Syndicate', 'Expert Sniper Pro', 'Independent Artists'],
  authors: [{ name: 'Deblaq & Win', url: 'https://redplanetcodes@gmail.com' }],
  openGraph: {
    title: 'Red Planet // Multi-Planetary Syndicate',
    description: 'The autonomous digital empire and music house preparing humanity for Mars.',
    url: 'https://redplanet.com',
    siteName: 'Red Planet Syndicate',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-obsidian text-white min-h-screen flex flex-col selection:bg-marsRed selection:text-white antialiased font-sans">
        <PlayerProvider>
          {/* Persistent Enterprise Navbar with Syndicate Channels */}
          <Navbar />

          {/* Main Page Viewport Container */}
          <div className="flex-1 flex flex-col w-full">
            {children}
          </div>

          {/* Persistent Master Footer */}
          <Footer />

          {/* Floating Lossless FLAC Music Player & Audio Streaming Bar */}
          <MusicPlayer />
        </PlayerProvider>
      </body>
    </html>
  );
}
