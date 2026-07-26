// app/tv/page.tsx
//
// Enterprise-Grade Red Planet Autonomous Neural Broadcasting Network (RedPlanet.tv)
// Founders & Anchors: Deblaq (Operations & Satellite Telemetry), Win (Cinematic Visuals & Music), 
// and the Red Planet AI Neural Core.
// Features live satellite video streams, dynamic global news feeds, weather updates,
// multi-country music syndication, and interactive AI anchor chat.

'use client';

import { useState, useEffect, useRef } from 'react';
import { usePlayer } from '@/context/PlayerContext';
import { TRACKS } from '@/lib/tracks';

interface BroadcastChannel {
  id: string;
  name: string;
  category: string;
  anchor: string;
  streamUrl: string;
  description: string;
  source: string;
  signalStrength: string;
}

// Live Satellite Channels equipped with robust fallback video assets and live telemetry
const BROADCAST_CHANNELS: BroadcastChannel[] = [
  {
    id: 'mars-live',
    name: 'Mars Colony 08 & Orbital Relay',
    category: 'INTERPLANETARY TELEMETRY',
    anchor: 'Deblaq (Operations Anchor)',
    streamUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    description: 'Autonomous 24/7 orbital monitoring, atmospheric stabilization telemetry, and Elon Musk multi-planetary mission tracking.',
    source: 'Mars Orbital Node 08',
    signalStrength: '99.9% [LOCK]'
  },
  {
    id: 'global-news',
    name: 'Earth Weather & World News Wire',
    category: 'GLOBAL SATELLITE FEED',
    anchor: 'Red Planet Neural AI',
    streamUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    description: 'Real-time meteorological reports, global weather patterns, and breaking international news feeds fetched via satellite relays.',
    source: 'Earth Telemetry Hub',
    signalStrength: '98.4% [LOCK]'
  },
  {
    id: 'music-tv',
    name: 'Red Planet Music Syndicate TV',
    category: 'CINEMATIC AUDIO-VISUAL',
    anchor: 'Win (Visual & Music Anchor)',
    streamUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    description: 'High-definition music video rollouts, independent artist showcases, and lossless FLAC audio broadcasts across 180+ countries.',
    source: 'Win Cinematic Syndicate',
    signalStrength: '100% [OPTIMAL]'
  }
];

export default function RedPlanetTVPage() {
  const { playTrack } = usePlayer();
  
  const [activeChannel, setActiveChannel] = useState<BroadcastChannel>(BROADCAST_CHANNELS[0]);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [signalLocked, setSignalLocked] = useState(true);

  // Live Satellite News & Weather Ticker
  const [liveTicker] = useState([
    'BREAKING WORLD NEWS: Global satellite networks report shifting atmospheric high-pressure zones influencing international trade corridors.',
    'WEATHER TELEMETRY: Nairobi 24°C (Partly Cloudy) // Tokyo 18°C (Clear Skies) // New York 12°C (Rain Showers) // Mars Node 08: -63°C (Stable Atmosphere).',
    'FINANCIAL MARKETS: Expert Sniper Pro v2 automated algorithmic trading bots executing high-frequency currency arbitrage on EUR/USD & GBP/USD.',
    'MUSIC SYNDICATE: Independent artist incubation and global record distribution active. Contact redplanetcodes@gmail.com for partnerships.'
  ]);

  // AI Chat & Anchor Interaction State
  const [chatMessages, setChatMessages] = useState<Array<{ role: 'user' | 'assistant' | 'anchor'; content: string; sender: string }>>([
    { role: 'anchor', content: 'Welcome to RedPlanet.tv. Satellite uplink locked and synchronized. I am Deblaq, alongside Win and our Neural AI Core. I can stream live video feeds, world news, weather, or discuss our music rollout and trading bots. What would you like to watch or discuss?', sender: 'Deblaq' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isAiProcessing, setIsAiProcessing] = useState(false);
  const chatScrollRef = useRef<HTMLDivElement>(null);

  // Automatic channel rotation with simulated signal handshake
  useEffect(() => {
    if (!isAutoRotating) return;

    const interval = setInterval(() => {
      setSignalLocked(false);
      setTimeout(() => {
        setActiveChannel((prev) => {
          const currentIndex = BROADCAST_CHANNELS.findIndex((c) => c.id === prev.id);
          const nextIndex = (currentIndex + 1) % BROADCAST_CHANNELS.length;
          return BROADCAST_CHANNELS[nextIndex];
        });
        setSignalLocked(true);
      }, 600);
    }, 18000);

    return () => clearInterval(interval);
  }, [isAutoRotating]);

  // Auto-scroll chat window
  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [chatMessages]);

  // Handle User Transmission to AI / Anchors
  async function handleSendMessage(e: React.FormEvent) {
    e.preventDefault();
    if (!inputMessage.trim() || isAiProcessing) return;

    const userText = inputMessage.trim();
    setInputMessage('');
    setChatMessages((prev) => [...prev, { role: 'user', content: userText, sender: 'Visitor' }]);
    setIsAiProcessing(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [{ role: 'user', content: userText }]
        })
      });

      const data = await res.json();
      const reply = data.reply || 'Satellite uplink anomaly detected. Contact redplanetcodes@gmail.com directly.';

      setChatMessages((prev) => [
        ...prev,
        { role: 'assistant', content: reply, sender: 'Red Planet Neural AI / Deblaq & Win' }
      ]);
    } catch {
      setChatMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Communication relay busy. Direct uplink active via WhatsApp +254 794 190 600.', sender: 'System Core' }
      ]);
    } finally {
      setIsAiProcessing(false);
    }
  }

  return (
    <main className="flex-1 flex flex-col px-6 py-8 max-w-7xl mx-auto w-full min-h-screen space-y-8 font-mono">
      
      {/* TV Header & Broadcast Mode Control */}
      <div className="glass-panel p-6 rounded-3xl border border-white/15 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gradient-to-r from-deepSpace to-obsidian">
        <div className="space-y-1">
          <div className="text-xs text-marsRed font-bold flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-marsRed animate-ping" />
            REDPLANET.TV // LIVE SATELLITE & AI BROADCAST NETWORK
          </div>
          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-wider text-white">
            Autonomous Video & News Television
          </h1>
          <p className="text-xs text-neutral-400">
            Anchored by Deblaq & Win. Streaming live video graphics, world weather, news feeds, and lossless audio.
          </p>
        </div>

        {/* Channel Rotation Switcher: Auto vs Manual */}
        <div className="flex items-center gap-3 bg-obsidian p-2 rounded-2xl border border-white/10">
          <span className="text-[10px] text-neutral-400 uppercase">Rotation:</span>
          <button
            type="button"
            onClick={() => setIsAutoRotating(true)}
            className={`px-3 py-1.5 rounded-xl text-xs uppercase font-bold transition-all ${
              isAutoRotating
                ? 'bg-marsRed text-white shadow-mars'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Auto Satellite
          </button>
          <button
            type="button"
            onClick={() => setIsAutoRotating(false)}
            className={`px-3 py-1.5 rounded-xl text-xs uppercase font-bold transition-all ${
              !isAutoRotating
                ? 'bg-neonCyan text-obsidian shadow-lg'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Manual Control
          </button>
        </div>
      </div>

      {/* Live News & Weather Ticker Bar */}
      <div className="w-full bg-obsidian border border-marsRed/30 rounded-2xl p-3 overflow-hidden relative flex items-center shadow-lg">
        <div className="bg-marsRed text-white text-[10px] font-bold uppercase px-3 py-1 rounded-xl mr-4 flex-shrink-0 animate-pulse">
          LIVE SATELLITE WIRE
        </div>
        <div className="overflow-hidden whitespace-nowrap w-full">
          <div className="inline-block animate-marquee text-xs text-neutral-200 font-mono">
            {liveTicker.join('    ✦    ')}
          </div>
        </div>
      </div>

      {/* Main Broadcast Screen Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left/Center: Live Video Graphic Feed & Channel Selection (2 Cols) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Live HTML5 Video Display Frame with Satellite Signal Handshake */}
          <div className="relative w-full aspect-video rounded-3xl overflow-hidden border border-white/20 glass-panel bg-black shadow-2xl flex flex-col justify-between">
            
            {signalLocked ? (
              <video
                key={activeChannel.streamUrl}
                src={activeChannel.streamUrl}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover absolute inset-0 pointer-events-auto"
              />
            ) : (
              <div className="w-full h-full absolute inset-0 flex flex-col items-center justify-center bg-obsidian text-marsRed space-y-2 animate-pulse">
                <span className="text-xs uppercase tracking-widest">⚡ ACQUIRING SATELLITE SIGNAL...</span>
                <span className="text-[10px] text-neutral-400">Handshaking with Orbital Relay Node 08</span>
              </div>
            )}

            {/* Top Overlay: Active Anchor & Satellite Source */}
            <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10 pointer-events-none">
              <div className="glass-panel px-4 py-2 rounded-xl border border-white/10 bg-black/60 backdrop-blur-md flex items-center gap-2 text-xs">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-white font-bold">{activeChannel.source}</span>
              </div>
              <div className="glass-panel px-4 py-2 rounded-xl border border-marsRed/40 bg-black/60 backdrop-blur-md text-xs text-marsRed font-bold flex items-center gap-2">
                <span>Signal: {activeChannel.signalStrength}</span>
              </div>
            </div>

            {/* Bottom Overlay: Channel Info */}
            <div className="absolute bottom-4 left-4 right-4 glass-panel p-4 rounded-2xl border border-white/10 bg-black/70 backdrop-blur-md z-10 flex justify-between items-end">
              <div>
                <div className="text-[10px] text-neonCyan font-mono uppercase tracking-widest">
                  [ {activeChannel.category} // ANCHOR: {activeChannel.anchor} ]
                </div>
                <h2 className="text-base sm:text-lg font-bold text-white uppercase font-sans mt-0.5">
                  {activeChannel.name}
                </h2>
                <p className="text-xs text-neutral-300 mt-1 line-clamp-1">
                  {activeChannel.description}
                </p>
              </div>
            </div>
          </div>

          {/* Channel Selector Deck (Manual Control) */}
          <div className="glass-panel p-6 rounded-3xl border border-white/15 space-y-4">
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-sans">
                Satellite Broadcast Channels
              </h3>
              <span className="text-xs text-neutral-400">Select feed to broadcast</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {BROADCAST_CHANNELS.map((channel) => {
                const isSelected = activeChannel.id === channel.id;
                return (
                  <button
                    key={channel.id}
                    type="button"
                    onClick={() => {
                      setIsAutoRotating(false);
                      setSignalLocked(false);
                      setActiveChannel(channel);
                      setTimeout(() => setSignalLocked(true), 400);
                    }}
                    className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between gap-3 ${
                      isSelected
                        ? 'bg-marsRed/20 border-marsRed shadow-mars text-white'
                        : 'bg-obsidian border-white/10 hover:border-white/30 text-neutral-400 hover:text-white'
                    }`}
                  >
                    <div>
                      <div className="text-[10px] text-neonCyan font-mono uppercase">{channel.category}</div>
                      <div className="text-xs font-bold text-white mt-1">{channel.name}</div>
                    </div>
                    <div className="text-[10px] text-neutral-400 flex items-center justify-between pt-2 border-t border-white/5">
                      <span>{channel.anchor.split(' ')[0]}</span>
                      {isSelected ? <span className="text-marsRed font-bold animate-pulse">● LIVE</span> : <span>Switch ▶</span>}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Music Streaming Integration on TV */}
          <div className="glass-panel p-6 rounded-3xl border border-white/15 space-y-4">
            <div className="flex justify-between items-center">
              <div className="text-xs font-bold text-marsRed uppercase tracking-wider flex items-center gap-2">
                <span>🎵</span> Red Planet Syndicate Music Stream
              </div>
              <span className="text-[10px] text-neutral-400">FLAC / Lossless Audio</span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {TRACKS.slice(0, 4).map((track) => (
                <div
                  key={track.id}
                  onClick={() => playTrack(track)}
                  className="p-3.5 rounded-2xl bg-deepSpace hover:bg-marsRed/20 border border-white/10 cursor-pointer transition-all flex items-center justify-between group"
                >
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-white truncate group-hover:text-marsRed transition-colors">
                      {track.title}
                    </div>
                    <div className="text-[10px] text-neutral-400 truncate">
                      {track.description}
                    </div>
                  </div>
                  <button
                    type="button"
                    className="h-8 w-8 rounded-full bg-marsRed text-white flex items-center justify-center text-xs flex-shrink-0 shadow-mars"
                    aria-label={`Play ${track.title}`}
                  >
                    ▶
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: AI Neural Anchor Chat & Direct Uplink Hub */}
        <div className="glass-panel p-6 rounded-3xl border border-white/15 flex flex-col justify-between h-[720px] bg-obsidian/90 shadow-2xl">
          
          <div className="space-y-3 pb-3 border-b border-white/10">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-neonCyan uppercase tracking-wider flex items-center gap-1.5">
                <span>🤖</span> AI & Anchor Live Chat
              </span>
              <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Active
              </span>
            </div>
            <p className="text-[11px] text-neutral-400">
              Communicate directly with our neural core, Deblaq, and Win about live feeds, weather, music, or trading bots.
            </p>
          </div>

          {/* Chat Messages Stream */}
          <div ref={chatScrollRef} className="flex-1 overflow-y-auto space-y-3 py-4 pr-1 text-xs">
            {chatMessages.map((msg, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-2xl space-y-1 ${
                  msg.role === 'user'
                    ? 'bg-marsRed/20 border border-marsRed/40 ml-6 text-white'
                    : 'bg-deepSpace border border-white/10 mr-6 text-neutral-200'
                }`}
              >
                <div className="text-[10px] text-neonCyan font-bold uppercase">
                  {msg.sender}
                </div>
                <div className="leading-relaxed">{msg.content}</div>
              </div>
            ))}
            {isAiProcessing && (
              <div className="p-3 rounded-2xl bg-deepSpace border border-white/10 mr-6 text-xs text-neutral-400 animate-pulse">
                Red Planet AI / Deblaq analyzing satellite telemetry...
              </div>
            )}
          </div>

          {/* Chat Input Form */}
          <form onSubmit={handleSendMessage} className="pt-3 border-t border-white/10 flex gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask about weather, news, or music..."
              className="flex-1 px-4 py-2.5 rounded-xl bg-deepSpace border border-white/15 text-xs text-white focus:outline-none focus:border-marsRed"
            />
            <button
              type="submit"
              disabled={isAiProcessing}
              className="px-4 py-2.5 rounded-xl bg-marsRed hover:bg-marsRed/80 text-xs text-white uppercase font-bold transition-all shadow-mars disabled:opacity-50"
            >
              Send
            </button>
          </form>

        </div>

      </div>

    </main>
  );
}