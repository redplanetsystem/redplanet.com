'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function InvestPage() {
  const [form, setForm] = useState({ name: '', email: '', type: 'investor', investmentTier: 'strategic_syndicate', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');

    try {
      const res = await fetch('/api/invest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          destinationInbox: 'redplanetcodes@gmail.com',
          founders: 'Deblaq & Win'
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        setStatus('error');
        setErrorMsg(data.error ?? 'Transmission failure. Secure channel offline.');
        return;
      }

      setStatus('sent');
      setForm({ name: '', email: '', type: 'investor', investmentTier: 'strategic_syndicate', message: '' });
    } catch {
      setErrorMsg('Could not reach the Red Planet secure server. Try again.');
      setStatus('error');
    }
  }

  return (
    <main className="flex-1 flex flex-col px-6 py-12 max-w-5xl mx-auto w-full min-h-screen space-y-12">
      
      {/* Tesla / SpaceX Grade Investor Header */}
      <header className="border-b border-white/10 pb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="h-3 w-3 rounded-full bg-marsRed animate-ping" />
            <span className="text-xs font-mono text-neonCyan uppercase tracking-widest">[MULTI-PLANETARY CAPITAL SYNDICATE]</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-wider uppercase text-white">
            Invest <span className="text-marsRed">//</span> Collaborate
          </h1>
          <p className="text-sm text-neutral-400 mt-2 font-mono max-w-2xl">
            Engineering the multi-planetary future. We are opening direct capital allocation for visionaries, institutional partners, and frontier tech syndicates inspired by Elon Musk’s Mars colonization roadmap.
          </p>
        </div>
        <div className="bg-obsidian border border-white/10 px-4 py-3 rounded-2xl text-xs font-mono text-right">
          <div className="text-marsRed font-bold">DIRECT DISPATCH GATEWAY</div>
          <div className="text-white mt-0.5">redplanetcodes@gmail.com</div>
        </div>
      </header>

      {/* Tesla-Level Strategic Vision Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-3">
          <div className="text-xs font-mono text-marsRed">01 // COLONIZATION TIMELINE</div>
          <h3 className="text-lg font-bold text-white uppercase">The Mars Roadmap</h3>
          <p className="text-xs text-neutral-400 font-mono leading-relaxed">
            Preparing human consciousness for multi-planetary existence through immersive Martian soundscapes, autonomous broadcasting nodes, and satellite infrastructure.
          </p>
        </div>

        <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-3">
          <div className="text-xs font-mono text-neonCyan">02 // AUTONOMOUS ECOSYSTEM</div>
          <h3 className="text-lg font-bold text-white uppercase">Tesla-Grade Infrastructure</h3>
          <p className="text-xs text-neutral-400 font-mono leading-relaxed">
            Self-sustaining digital economies powered by algorithmic trading bots, automated social media syndication, and AI-driven news anchors.
          </p>
        </div>

        <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-3">
          <div className="text-xs font-mono text-emerald-400">03 // FOUNDERS SYNDICATE</div>
          <h3 className="text-lg font-bold text-white uppercase">Led by Deblaq & Win</h3>
          <p className="text-xs text-neutral-400 font-mono leading-relaxed">
            Every investor submission is reviewed personally by core creators Deblaq and Win to ensure absolute alignment with our sovereign global expansion.
          </p>
        </div>
      </section>

      {/* Secure Investor Portal & Submission Terminal */}
      <section className="glass-panel rounded-3xl border border-white/10 p-8 sm:p-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-marsRed/5 rounded-full blur-3xl pointer-events-none" />

        {status === 'sent' ? (
          <div className="py-16 text-center space-y-4">
            <div className="h-16 w-16 mx-auto rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center text-emerald-400 text-2xl">
              ✓
            </div>
            <div className="text-xl font-bold text-white uppercase tracking-wider">
              Transmission Received — Welcome to the Syndicate
            </div>
            <p className="text-neutral-300 text-sm font-mono max-w-md mx-auto">
              Your dossier has been securely routed to <span className="text-neonCyan">redplanetcodes@gmail.com</span>. Founders Deblaq & Win will review your proposal and establish secure contact.
            </p>
            <button
              type="button"
              onClick={() => setStatus('idle')}
              className="mt-6 px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-mono uppercase tracking-wider transition-colors"
            >
              Submit Another Inquiry
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="border-b border-white/10 pb-4">
              <h2 className="text-lg font-bold uppercase tracking-wide text-white">Investor & Collaborator Dossier</h2>
              <p className="text-xs text-neutral-400 font-mono mt-1">Complete the secure intake form below to request prospectus documentation or pitch strategic integration.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-mono uppercase text-neutral-400 mb-2">Full Name / Entity Name *</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-deepSpace border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-marsRed font-mono"
                  placeholder="e.g. Elon Musk / SpaceX Venture Arm"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-neutral-400 mb-2">Secure Email Address *</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-deepSpace border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-marsRed font-mono"
                  placeholder="partner@domain.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-mono uppercase text-neutral-400 mb-2">Engagement Category *</label>
                <select
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                  className="w-full bg-deepSpace border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-marsRed font-mono"
                >
                  <option value="investor" className="bg-obsidian">Institutional / Angel Investor (Mars Fund)</option>
                  <option value="collaborator" className="bg-obsidian">Creative Collaborator / Artist</option>
                  <option value="press" className="bg-obsidian">Global Press / Media Syndicate</option>
                  <option value="strategic" className="bg-obsidian">Strategic Technology Partner</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-neutral-400 mb-2">Target Allocation Tier *</label>
                <select
                  value={form.investmentTier}
                  onChange={(e) => setForm({ ...form, investmentTier: e.target.value })}
                  className="w-full bg-deepSpace border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-marsRed font-mono"
                >
                  <option value="strategic_syndicate" className="bg-obsidian">Tier 1: Strategic Syndicate ($100k+)</option>
                  <option value="growth_partner" className="bg-obsidian">Tier 2: Ecosystem Growth Partner ($25k - $100k)</option>
                  <option value="creative_angel" className="bg-obsidian">Tier 3: Creative Angel & Media Collaborator</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-neutral-400 mb-2">Strategic Proposal & Vision Statement *</label>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full bg-deepSpace border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-marsRed resize-none font-mono"
                placeholder="Detail how your capital, technology, or creative vision aligns with Red Planet's multi-planetary expansion..."
              />
            </div>

            {status === 'error' && (
              <div className="text-xs text-red-400 bg-red-950/40 border border-red-900/50 rounded-xl px-4 py-3 font-mono">
                {errorMsg}
              </div>
            )}

            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t border-white/10">
              <span className="text-xs font-mono text-neutral-500">
                Encrypted via Red Planet Secure Uplink Protocol.
              </span>
              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full sm:w-auto bg-marsRed hover:bg-marsRed/80 disabled:opacity-40 text-white font-bold py-4 px-8 rounded-xl text-xs uppercase tracking-widest transition-all glow-mars font-mono"
              >
                {status === 'sending' ? 'Transmitting Dossier...' : 'Submit Investor Dossier'}
              </button>
            </div>
          </form>
        )}
      </section>

      {/* Footer Direct Contact Note */}
      <footer className="text-center text-xs font-mono text-neutral-500 pb-8">
        Direct executive inquiries may also be routed directly to <span className="text-white">redplanetcodes@gmail.com</span> (Attn: Deblaq & Win).
      </footer>
    </main>
  );
}