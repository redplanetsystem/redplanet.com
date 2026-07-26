import Link from 'next/link';

const SYNDICATE_FOOTER_CHANNELS = [
  { name: 'Deblaq443', handle: '@deblaq443', href: 'https://youtube.com' },
  { name: 'Win Syndicate', handle: '@kidsoulwin', href: 'https://youtube.com' },
  { name: 'Produced By WestLif', handle: '@YSociety-q1u', href: 'https://youtube.com' },
  { name: 'Sam White', handle: '@Samwitr22', href: 'https://youtube.com' },
  { name: 'Deon Edwards', handle: '@DeonEdwards-y9e', href: 'https://youtube.com' },
  { name: 'Playing Outside', handle: '@Eagleeyetoo', href: 'https://youtube.com' },
  { name: 'Canarazy Beats', handle: '@thiswomanfromcanada1826', href: 'https://youtube.com' },
  { name: 'GetLikeMessiah', handle: '@GetLikeMessiah', href: 'https://youtube.com' },
  { name: 'Pillar Alliance IG', handle: '@pillar.alliance', href: 'https://instagram.com/pillar.alliance/' },
  { name: 'African Motivation IG', handle: '@_african_motivation', href: 'https://instagram.com/_african_motivation/' },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 mt-auto bg-obsidian/90 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col space-y-8">
        
        {/* Top Footer Grid: Empire Info, Direct Contacts & Quick Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-white/10 font-mono">
          
          {/* Col 1: Brand & Founders */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-marsRed animate-pulse" />
              <span className="text-sm font-black tracking-widest uppercase text-white">
                Red Planet Syndicate
              </span>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Autonomous multi-planetary digital empire. Founded by Deblaq & Win. Engineering the future of music, media, and financial markets.
            </p>
            <div className="text-[11px] text-neonCyan font-bold">
              Secure Email: redplanetcodes@gmail.com
            </div>
            <div className="text-[11px] text-neutral-300">
              WhatsApp Direct: +254 794 190 600
            </div>
          </div>

          {/* Col 2: Core Platform Links */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-marsRed uppercase tracking-wider">
              Platform Nodes
            </h3>
            <ul className="space-y-2 text-xs">
              <li><Link href="/" className="text-neutral-400 hover:text-white transition-colors">Command Center</Link></li>
              <li><Link href="/music" className="text-neutral-400 hover:text-white transition-colors">Music Syndicate</Link></li>
              <li><Link href="/tv" className="text-neutral-400 hover:text-white transition-colors">RedPlanet.tv Live</Link></li>
              <li><Link href="/trading" className="text-neutral-400 hover:text-white transition-colors">Trading Bot Telemetry</Link></li>
              <li><Link href="/ai" className="text-neutral-400 hover:text-white transition-colors">Neural AI Core</Link></li>
            </ul>
          </div>

          {/* Col 3: Investor & Admin */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-neonCyan uppercase tracking-wider">
              Syndicate Gateway
            </h3>
            <ul className="space-y-2 text-xs">
              <li><Link href="/invest" className="text-neutral-400 hover:text-white transition-colors">Invest / Partner Portal</Link></li>
              <li><Link href="/about" className="text-neutral-400 hover:text-white transition-colors">About & Lore (Win & Deblaq)</Link></li>
              <li><Link href="/admin/upload" className="text-neutral-400 hover:text-white transition-colors">Admin Studio (Protected)</Link></li>
            </ul>
          </div>

          {/* Col 4: Verified Syndicate Creators */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-marsRed uppercase tracking-wider">
              Verified Channels
            </h3>
            <div className="grid grid-cols-2 gap-2 text-[10px] max-h-36 overflow-y-auto pr-1">
              {SYNDICATE_FOOTER_CHANNELS.map((ch, idx) => (
                <a
                  key={idx}
                  href={ch.href}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-lg bg-deepSpace hover:bg-marsRed/20 border border-white/5 transition-colors text-neutral-300 hover:text-white truncate"
                >
                  <span className="font-bold block">{ch.name}</span>
                  <span className="text-neonCyan">{ch.handle}</span>
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Copyright & Security Notice */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-neutral-500">
          <div>
            Red Planet Global Syndicate © 2026 — All Rights Reserved. Founders: Deblaq & Win.
          </div>
          <div className="text-neutral-400 text-[11px]">
            Encrypted via Red Planet Secure Satellite Relay 08.
          </div>
        </div>

      </div>
    </footer>
  );
}