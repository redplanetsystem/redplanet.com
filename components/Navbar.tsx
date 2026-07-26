'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_LINKS = [
  { href: '/', label: 'Command Center', icon: '⚡' },
  { href: '/music', label: 'Music Syndicate', icon: '🎵' },
  { href: '/tv', label: 'RedPlanet.tv', icon: '🔴' },
  { href: '/trading', label: 'Trading Bots', icon: '📈' },
  { href: '/ai', label: 'Neural AI', icon: '🤖' },
  { href: '/invest', label: 'Invest / Partner', icon: '💼' },
  { href: '/about', label: 'About & Lore', icon: '🪐' },
  { href: '/admin/upload', label: 'Admin Studio', icon: '🔒' },
];

const SYNDICATE_CHANNELS = [
  { name: 'Deblaq443 (Primary Node)', handle: '@deblaq443', type: 'YouTube Creator', href: 'https://youtube.com' },
  { name: 'Win Syndicate', handle: '@kidsoulwin', type: 'Music & Cinematic Visuals', href: 'https://youtube.com' },
  { name: 'Produced By WestLif', handle: '@YSociety-q1u', type: 'Audio Production', href: 'https://youtube.com' },
  { name: 'Sam White', handle: '@Samwitr22', type: 'Media Operations', href: 'https://youtube.com' },
  { name: 'Deon Edwards', handle: '@DeonEdwards-y9e', type: 'Network Telemetry', href: 'https://youtube.com' },
  { name: 'Playing Outside Somewhere', handle: '@Eagleeyetoo', type: 'Field Broadcast', href: 'https://youtube.com' },
  { name: 'Canarazy Beats', handle: '@thiswomanfromcanada1826', type: 'Beat Production', href: 'https://youtube.com' },
  { name: 'GetLikeMessiah', handle: '@GetLikeMessiah', type: 'Outreach Channel', href: 'https://youtube.com' },
  { name: 'Pillar Alliance', handle: '@pillar.alliance', type: 'Sovereign Union (Instagram)', href: 'https://instagram.com/pillar.alliance/' },
  { name: 'African Motivation', handle: '@_african_motivation', type: 'Voice of Africa (123K Followers)', href: 'https://instagram.com/_african_motivation/' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [channelsDropdownOpen, setChannelsDropdownOpen] = useState(false);

  return (
    <>
      {/* Enterprise Apple/Tesla Glassmorphic Navbar */}
      <nav className="sticky top-0 z-50 glass-panel-strong border-b border-white/10 shadow-2xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Brand Logo & Founders Attribution */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <span className="absolute inset-0 rounded-full bg-marsRed animate-ping opacity-75" />
              <span className="relative block h-3.5 w-3.5 rounded-full bg-marsRed" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-black tracking-widest uppercase text-white group-hover:text-marsRed transition-colors">
                Red Planet
              </span>
              <span className="text-[9px] font-mono text-neutral-400 tracking-wider">
                Deblaq & Win Syndicate
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden xl:flex items-center gap-1 bg-deepSpace/60 p-1.5 rounded-2xl border border-white/10">
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 py-2 rounded-xl text-xs font-mono uppercase tracking-wide transition-all flex items-center gap-1.5 ${
                    active
                      ? 'bg-marsRed text-white shadow-mars font-bold'
                      : 'text-neutral-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <span className="text-[10px]">{link.icon}</span>
                  <span>{link.label}</span>
                </Link>
              );
            })}

            {/* Syndicate Channels Dropdown Trigger */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setChannelsDropdownOpen(!channelsDropdownOpen)}
                className="px-3.5 py-2 rounded-xl text-xs font-mono uppercase tracking-wide transition-all flex items-center gap-1.5 text-neonCyan hover:bg-neonCyan/10 border border-neonCyan/30"
              >
                <span>📡</span>
                <span>Channels ({SYNDICATE_CHANNELS.length})</span>
                <span className="text-[10px]">▼</span>
              </button>

              {channelsDropdownOpen && (
                <div className="absolute right-0 mt-3 w-80 bg-obsidian/95 border border-white/15 rounded-2xl p-4 shadow-2xl backdrop-blur-2xl z-50 space-y-3 font-mono">
                  <div className="flex justify-between items-center pb-2 border-b border-white/10 text-[10px]">
                    <span className="text-marsRed font-bold uppercase">Syndicate Channel Roster</span>
                    <span className="text-neutral-400">Managed by Deblaq</span>
                  </div>
                  <div className="max-h-72 overflow-y-auto space-y-2 pr-1">
                    {SYNDICATE_CHANNELS.map((ch, idx) => (
                      <a
                        key={idx}
                        href={ch.href}
                        target="_blank"
                        rel="noreferrer"
                        className="block p-2 rounded-xl bg-deepSpace hover:bg-marsRed/20 border border-white/5 transition-colors group"
                      >
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-bold text-white group-hover:text-marsRed">{ch.name}</span>
                          <span className="text-[10px] text-neonCyan">{ch.handle}</span>
                        </div>
                        <div className="text-[10px] text-neutral-400 mt-0.5">{ch.type}</div>
                      </a>
                    ))}
                  </div>
                  <div className="pt-2 border-t border-white/10 text-[10px] text-center text-neutral-400">
                    Secure Email: <span className="text-white">redplanetcodes@gmail.com</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Action Hub: Secure Contact & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex flex-col items-end text-[10px] font-mono">
              <span className="text-neutral-400">Direct Uplink:</span>
              <a href="mailto:redplanetcodes@gmail.com" className="text-neonCyan hover:underline font-bold">
                redplanetcodes@gmail.com
              </a>
            </div>

            <Link
              href="/invest"
              className="hidden lg:inline-flex px-4 py-2.5 rounded-xl bg-white/10 hover:bg-marsRed text-white text-xs font-mono uppercase tracking-widest transition-all border border-white/10 font-bold"
            >
              Collaborate
            </Link>

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2.5 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-marsRed transition-colors"
              aria-label="Toggle navigation menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown & Channels Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-obsidian/95 border-t border-white/10 px-6 py-6 space-y-6 backdrop-blur-2xl animate-fadeIn">
            <div className="grid grid-cols-2 gap-2">
              {NAV_LINKS.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-4 py-3 rounded-xl text-xs font-mono uppercase tracking-wide flex items-center gap-2 transition-all ${
                      active
                        ? 'bg-marsRed text-white font-bold shadow-mars'
                        : 'bg-white/5 text-neutral-300 hover:text-white hover:bg-white/10 border border-white/5'
                    }`}
                  >
                    <span>{link.icon}</span>
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </div>

            {/* Syndicate Channels in Mobile Drawer */}
            <div className="pt-4 border-t border-white/10 space-y-3">
              <div className="text-[10px] font-mono uppercase tracking-widest text-marsRed font-bold flex items-center gap-2">
                <span>📡</span> Official Syndicate Channels & Creators:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-xs max-h-60 overflow-y-auto pr-1">
                {SYNDICATE_CHANNELS.map((ch, idx) => (
                  <a
                    key={idx}
                    href={ch.href}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-xl bg-deepSpace border border-white/10 flex justify-between items-center text-neutral-300 hover:text-white hover:border-marsRed"
                  >
                    <div>
                      <div className="font-bold text-white">{ch.name}</div>
                      <div className="text-[10px] text-neutral-400">{ch.type}</div>
                    </div>
                    <span className="text-neonCyan font-bold">{ch.handle}</span>
                  </a>
                ))}
              </div>
            </div>

            <div className="pt-2 text-center text-xs font-mono text-neutral-400">
              WhatsApp Direct: <span className="text-white">+254 794 190 600</span> | <span className="text-marsRed">redplanetcodes@gmail.com</span>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}