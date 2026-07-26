// app/page.tsx
//
// Enterprise-Grade Red Planet Command Center Homepage
// Founders: Deblaq & Win | Core Builder: Deblaq
// Features the 3D WebGL Mars Hero, interactive telemetry grids, cinematic music syndication,
// algorithmic trading links, and direct multi-planetary expansion gateways.

import Mars3DHero from '@/components/Mars3DHero';
import Link from 'next/link';

export default function CommandCenter() {
  return (
    <main className="flex-1 flex flex-col px-6 py-10 max-w-7xl mx-auto w-full min-h-screen space-y-12">
      
      {/* 3D Mars Interactive Hero & Satellite Telemetry Hub */}
      <Mars3DHero />

      {/* Core Syndicate Strategic Pillars */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Pillar 1: Cinematic Audio & Music Syndicate */}
        <div className="glass-panel p-8 rounded-3xl border border-white/15 space-y-4 hover:border-marsRed/50 transition-all shadow-xl group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-marsRed font-bold">01 // CINEMATIC AUDIO</span>
            <span className="text-xs font-mono text-neutral-500">FLAC / 320kbps</span>
          </div>
          <h3 className="text-xl font-bold uppercase tracking-wide group-hover:text-marsRed transition-colors">
            The Win Catalog
          </h3>
          <p className="text-xs text-neutral-300 font-mono leading-relaxed">
            Soundscapes designed to hit the body before the mind catches up. Pretty on top, wrong underneath. Engineered by Win.
          </p>
          <div className="pt-2 flex items-center justify-between border-t border-white/10">
            <Link href="/music" className="text-xs font-mono text-neonCyan hover:underline font-bold flex items-center gap-1">
              Stream Master Catalog <span>→</span>
            </Link>
            <Link href="/admin/upload" className="text-[10px] font-mono bg-white/5 hover:bg-marsRed text-neutral-300 hover:text-white px-2.5 py-1 rounded-lg border border-white/10 transition-colors uppercase">
              Upload Track
            </Link>
          </div>
        </div>

        {/* Pillar 2: Autonomous Finance & Trading Bots */}
        <div className="glass-panel p-8 rounded-3xl border border-white/15 space-y-4 hover:border-neonCyan/50 transition-all shadow-xl group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-neonCyan font-bold">02 // AUTONOMOUS FINANCE</span>
            <span className="text-xs font-mono text-emerald-400">Node 08 Active</span>
          </div>
          <h3 className="text-xl font-bold uppercase tracking-wide group-hover:text-neonCyan transition-colors">
            Expert Sniper Pro v2
          </h3>
          <p className="text-xs text-neutral-300 font-mono leading-relaxed">
            Algorithmic MetaTrader 5 bots and web automation frameworks developed by core builder Deblaq. High-frequency market intelligence.
          </p>
          <div className="pt-2 flex items-center justify-between border-t border-white/10">
            <Link href="/trading" className="text-xs font-mono text-marsRed hover:underline font-bold flex items-center gap-1">
              View Telemetry <span>→</span>
            </Link>
            <span className="text-[10px] font-mono text-neutral-500">Secured Node</span>
          </div>
        </div>

        {/* Pillar 3: Mars Expansion & Investor Syndicate */}
        <div className="glass-panel p-8 rounded-3xl border border-white/15 space-y-4 hover:border-emerald-400/50 transition-all shadow-xl group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-emerald-400 font-bold">03 // MARS EXPANSION</span>
            <span className="text-xs font-mono text-marsRed">Sol 08</span>
          </div>
          <h3 className="text-xl font-bold uppercase tracking-wide group-hover:text-emerald-400 transition-colors">
            The Elon Musk Roadmap
          </h3>
          <p className="text-xs text-neutral-300 font-mono leading-relaxed">
            Fulfilling multi-planetary migration through sovereign infrastructure, direct investor syndicates, and Martian soundscapes.
          </p>
          <div className="pt-2 flex items-center justify-between border-t border-white/10">
            <Link href="/invest" className="text-xs font-mono text-emerald-400 hover:underline font-bold flex items-center gap-1">
              Invest / Collaborate <span>→</span>
            </Link>
            <a href="mailto:redplanetcodes@gmail.com" className="text-[10px] font-mono text-neonCyan hover:underline">
              Direct Email
            </a>
          </div>
        </div>

      </section>

      {/* Live Syndicate Directives & Communication Footer Banner */}
      <section className="glass-panel p-8 rounded-3xl border border-white/15 flex flex-col md:flex-row items-center justify-between gap-6 bg-gradient-to-r from-deepSpace to-obsidian">
        <div className="space-y-2 text-center md:text-left">
          <div className="text-xs font-mono text-marsRed uppercase tracking-widest font-bold">
            Autonomous Empire Uplink
          </div>
          <h4 className="text-lg font-black uppercase tracking-wider text-white">
            Ready to Join the Red Planet Syndicate?
          </h4>
          <p className="text-xs text-neutral-400 font-mono max-w-xl">
            Co-founded by Deblaq and Win. Whether you are an independent artist looking for distribution or an institutional investor backing the future of Mars — connect directly.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          <a
            href="https://wa.me/254794190600"
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-obsidian text-xs font-mono uppercase tracking-widest font-bold transition-all text-center shadow-lg"
          >
            WhatsApp (+254 794 190 600)
          </a>
          <Link
            href="/invest"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-marsRed hover:bg-marsRed/80 text-white text-xs font-mono uppercase tracking-widest font-bold transition-all text-center glow-mars shadow-lg"
          >
            Open Investor Dossier
          </Link>
        </div>
      </section>

    </main>
  );
}
