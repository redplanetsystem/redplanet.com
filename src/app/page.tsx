'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0a0e27] via-[#0a0a0a] to-[#0a0a0a]">
      {/* Hero Section */}
      <section className="h-screen flex items-center justify-center px-4 md:px-8 relative overflow-hidden">
        <div className="relative z-10 text-center max-w-4xl mx-auto animate-fade-in-up">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-[#E81828] via-[#ff1744] to-[#E81828] bg-clip-text text-transparent animate-pulse">
              RED PLANET
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-400 mb-4 font-light tracking-wide">
            Multi-Planetary Autonomous Digital Media Empire
          </p>

          <p className="text-gray-500 mb-12 max-w-2xl mx-auto">
            The ultimate command center for autonomous digital operations, AI-powered intelligence, and global market dominance.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link href="#features" className="px-8 py-3 bg-[#E81828] hover:bg-[#ff1744] text-white font-bold rounded-lg transition transform hover:scale-105">
              Explore Portal
            </Link>
            <Link href="#investor" className="px-8 py-3 border-2 border-[#E81828] text-[#E81828] hover:bg-[#E81828] hover:text-white font-bold rounded-lg transition">
              Investor Access
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 md:px-8 bg-[#0a0a0a]/50 border-t border-[#E81828]/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">Core Modules</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'AI Martian Core', desc: 'Omniscient intelligence engine trained on interplanetary logistics' },
              { title: 'Red Planet TV', desc: '24/7 broadcast station with live streaming & original content' },
              { title: 'Market Tickers', desc: 'Real-time stocks, forex, and crypto surveillance' },
              { title: 'News Engine', desc: 'Autonomous Mars & tech news aggregation' },
              { title: 'Music Hub', desc: 'High-fidelity streaming with immersive visualizers' },
              { title: 'Investor Gateway', desc: 'Elite collaborator onboarding & partnership portal' },
            ].map((item, i) => (
              <div key={i} className="p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl hover:border-[#E81828]/50 transition">
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Investor Section */}
      <section id="investor" className="py-20 px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Elite Partner Gateway</h2>
          <p className="text-gray-400 mb-8">For institutional investors, tech titans, and strategic collaborators</p>
          <Link href="#" className="px-8 py-3 bg-[#E81828] hover:bg-[#ff1744] text-white font-bold rounded-lg transition inline-block">
            Access Portal
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#E81828]/20 py-12 px-4 md:px-8 text-center text-gray-600 text-sm">
        <p>© 2026 Red Planet. Autonomous. Immersive. Boundless. 🚀</p>
      </footer>
    </main>
  )
}
