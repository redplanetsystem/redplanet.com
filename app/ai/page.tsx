'use client';

import { useState, useRef, useEffect } from 'react';

type Message = { role: 'user' | 'assistant'; content: string };

export default function RedPlanetAI() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content:
        "Red Planet Neural Link Active. I am your autonomous AI Command Assistant. I possess full knowledge of our multi-planetary empire, founders Deblaq & Win, RedPlanet.tv broadcasts, algorithmic trading bots (Expert Sniper Pro v2), and independent music rollouts. How may I assist your mission today?",
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  async function sendMessage() {
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    const nextMessages: Message[] = [...messages, { role: 'user', content: trimmed }];
    setMessages(nextMessages);
    setInput('');
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: nextMessages }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? 'Neural link failure. Check system channels.');
        setLoading(false);
        return;
      }

      setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]);
    } catch {
      setError('Could not reach the Red Planet neural cluster. Check connection and try again.');
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <main className="flex-1 flex flex-col px-6 py-8 max-w-4xl mx-auto w-full min-h-screen space-y-6">
      
      {/* Header Command Area */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-white/10 pb-6 gap-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="h-3 w-3 rounded-full bg-neonCyan animate-ping" />
            <h1 className="text-3xl font-black tracking-wider uppercase text-white">
              Red Planet // <span className="text-neonCyan">Neural AI Core</span>
            </h1>
          </div>
          <p className="text-sm text-neutral-400 mt-1 font-mono">
            Autonomous Knowledge Base | Founders: Deblaq & Win | Access: redplanetcodes@gmail.com
          </p>
        </div>
        <div className="flex items-center gap-3 bg-obsidian border border-white/10 px-4 py-2 rounded-xl text-xs font-mono">
          <span className="text-marsRed font-bold">NEURAL STATUS:</span>
          <span className="text-emerald-400">100% OPERATIONAL (14.2 PFLOPS)</span>
        </div>
      </header>

      {/* Chat Terminal Window */}
      <div className="glass-panel rounded-3xl border border-white/10 flex-1 flex flex-col overflow-hidden shadow-2xl h-[650px]">
        
        {/* Chat Feed */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-5 py-4 text-sm leading-relaxed font-mono ${
                  m.role === 'user'
                    ? 'bg-marsRed text-white shadow-mars'
                    : 'bg-obsidian border border-white/10 text-neutral-200 shadow-glass'
                }`}
              >
                {m.role === 'assistant' && (
                  <div className="text-[10px] text-neonCyan mb-1 uppercase tracking-widest font-bold">
                    [RED PLANET INTELLIGENCE NODE]
                  </div>
                )}
                {m.content}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="bg-obsidian border border-white/10 rounded-2xl px-5 py-4 text-sm text-neutral-400 font-mono flex items-center gap-2">
                <span className="text-neonCyan">Processing Neural Matrix</span>
                <span className="inline-flex gap-1">
                  <span className="animate-pulse text-marsRed">●</span>
                  <span className="animate-pulse [animation-delay:150ms] text-marsRed">●</span>
                  <span className="animate-pulse [animation-delay:300ms] text-marsRed">●</span>
                </span>
              </div>
            </div>
          )}

          {error && (
            <div className="text-xs text-red-400 bg-red-950/40 border border-red-900/50 rounded-xl px-4 py-3 font-mono">
              {error}
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Input Terminal */}
        <div className="border-t border-white/10 p-4 bg-obsidian/80 backdrop-blur flex gap-3 items-end">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Query Red Planet neural network (Win, music rollouts, trading bots, media syndication)..."
            rows={2}
            className="flex-1 resize-none bg-deepSpace border border-white/10 rounded-2xl px-4 py-3 text-sm text-white font-mono placeholder:text-neutral-500 focus:outline-none focus:border-neonCyan/50"
          />
          <button
            type="button"
            onClick={sendMessage}
            disabled={loading || !input.trim()}
            className="bg-neonCyan hover:bg-neonCyan/80 disabled:opacity-40 disabled:cursor-not-allowed text-deepSpace font-bold px-6 py-4 rounded-2xl text-xs uppercase font-mono tracking-wider transition-all shadow-cyan"
          >
            Transmit
          </button>
        </div>
      </div>
    </main>
  );
}