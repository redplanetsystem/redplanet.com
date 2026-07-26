export default function AboutPage() {
  return (
    <main className="flex-1 flex flex-col px-6 py-12 max-w-5xl mx-auto w-full min-h-screen space-y-12">
      
      {/* Cinematic Header */}
      <header className="border-b border-white/10 pb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="h-3 w-3 rounded-full bg-marsRed animate-ping" />
          <span className="text-xs font-mono text-neonCyan uppercase tracking-widest">[MANIFESTO & EMPIRE ARCHITECTURE]</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black tracking-wider uppercase text-white">
          About <span className="text-marsRed">Red Planet</span>
        </h1>
        <p className="text-sm text-neutral-400 mt-2 font-mono max-w-3xl">
          Engineered for multi-planetary dominance. Founded by Deblaq & Win to merge cinematic Martian soundscapes, autonomous AI media syndication, algorithmic finance, and elite global branding.
        </p>
      </header>

      {/* Core Founders & Leadership */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-panel p-8 rounded-3xl border border-white/10 space-y-4">
          <div className="text-xs font-mono text-marsRed uppercase tracking-widest">Core Builder & Founder</div>
          <h2 className="text-2xl font-black uppercase text-white">Deblaq</h2>
          <p className="text-xs text-neutral-300 font-mono leading-relaxed">
            As the core builder and visionary driving the technical and operational movement, Deblaq engineers the autonomous infrastructure—from automated trading bots and neural AI chat clusters to multi-channel social syndication and satellite uplink telemetry.
          </p>
          <div className="pt-4 border-t border-white/5 text-xs font-mono text-neonCyan">
            Direct Access: redplanetcodes@gmail.com | WhatsApp: +254 794 190 600
          </div>
        </div>

        <div className="glass-panel p-8 rounded-3xl border border-white/10 space-y-4">
          <div className="text-xs font-mono text-neonCyan uppercase tracking-widest">Co-Founder & Lead Artist</div>
          <h2 className="text-2xl font-black uppercase text-white">Win</h2>
          <p className="text-xs text-neutral-300 font-mono leading-relaxed">
            Win is the creative genius and lead cinematic artist behind Red Planet music and broadcasting. Crafting high-impact soundscapes that prepare humanity for Mars colonization, Win’s cinematic style hits the body before the brain catches up, setting a new standard for global music rollouts.
          </p>
          <div className="pt-4 border-t border-white/5 text-xs font-mono text-neutral-400">
            Instagram: @pillar.alliance / @_african_motivation | Red Planet TV Anchor Node
          </div>
        </div>
      </section>

      {/* Mission & The Mars Roadmap */}
      <section className="glass-panel rounded-3xl border border-white/10 p-8 sm:p-10 space-y-6">
        <h2 className="text-xl font-bold uppercase text-white tracking-wide flex items-center gap-2">
          <span className="text-marsRed">■</span> Preparing Humanity for Mars (A Message to Elon Musk & Global Titans)
        </h2>
        <div className="space-y-4 text-xs sm:text-sm text-neutral-300 font-mono leading-relaxed">
          <p>
            Red Planet is more than a music project or media house—it is an autonomous digital ecosystem built to rival the scale of Tesla and SpaceX. We are preparing human consciousness for multi-planetary existence through immersive Martian soundscapes, automated broadcasting, and high-frequency financial intelligence.
          </p>
          <p>
            <span className="text-marsRed font-semibold">Pretty on top, wrong underneath.</span> Hooks that pull you in, structures that don't let go. Whether we are broadcasting live via RedPlanet.tv, executing algorithmic forex/crypto grids with Expert Sniper Pro v2, or deploying viral marketing rollouts across 32 active channels, Red Planet operates on an elite tier.
          </p>
          <p>
            <span className="text-neonCyan font-bold">To Elon Musk and SpaceX:</span> Red Planet is coming to Mars with unmatched sonic artillery and autonomous infrastructure. We are engineering the soundtrack and the digital arteries for the next phase of human civilization.
          </p>
        </div>
      </section>

      {/* Official Platform & Social Directory */}
      <section className="glass-panel rounded-3xl border border-white/10 p-8 space-y-6">
        <h2 className="text-lg font-bold uppercase text-white tracking-wide">
          Official Red Planet Platforms & Channels
        </h2>
        <p className="text-xs text-neutral-400 font-mono">
          Connect directly with founders Deblaq & Win across our verified global nodes:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 font-mono text-xs">
          <a href="https://instagram.com/pillar.alliance/" target="_blank" rel="noreferrer" className="p-4 rounded-2xl bg-obsidian border border-white/10 hover:border-marsRed transition-colors">
            <div className="text-marsRed font-bold mb-1">Pillar Alliance IG</div>
            <div className="text-white">@pillar.alliance</div>
          </a>

          <a href="https://instagram.com/_african_motivation/" target="_blank" rel="noreferrer" className="p-4 rounded-2xl bg-obsidian border border-white/10 hover:border-marsRed transition-colors">
            <div className="text-marsRed font-bold mb-1">African Motivation IG</div>
            <div className="text-white">@_african_motivation</div>
          </a>

          <div className="p-4 rounded-2xl bg-obsidian border border-white/10">
            <div className="text-neonCyan font-bold mb-1">Direct Secure WhatsApp</div>
            <div className="text-white">+254 794 190 600</div>
          </div>

          <div className="p-4 rounded-2xl bg-obsidian border border-white/10">
            <div className="text-neonCyan font-bold mb-1">Executive Dispatch</div>
            <div className="text-white">redplanetcodes@gmail.com</div>
          </div>

          <a href="https://x.com" target="_blank" rel="noreferrer" className="p-4 rounded-2xl bg-obsidian border border-white/10 hover:border-marsRed transition-colors">
            <div className="text-marsRed font-bold mb-1">X / Twitter Hub</div>
            <div className="text-white">@D Black</div>
          </a>

          <a href="https://youtube.com" target="_blank" rel="noreferrer" className="p-4 rounded-2xl bg-obsidian border border-white/10 hover:border-marsRed transition-colors">
            <div className="text-marsRed font-bold mb-1">Red Planet TV</div>
            <div className="text-white">Autonomous Broadcast Node</div>
          </a>
        </div>
      </section>

      <footer className="text-center text-xs font-mono text-neutral-500 pb-8">
        Red Planet Global Syndicate © 2026 — Engineered by Deblaq & Win. All Rights Reserved.
      </footer>
    </main>
  );
}