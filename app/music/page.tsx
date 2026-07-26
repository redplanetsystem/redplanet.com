// app/music/page.tsx
//
// Enterprise-Grade Red Planet Music Syndicate & Streaming Catalog
// Founders: Deblaq & Win | Core Builder: Deblaq
// Multi-country streaming, artist incubation, lossless FLAC audio playback,
// and instant track sharing across 180+ countries.

'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Track, TRACKS as SEED_TRACKS } from '@/lib/tracks';
import { usePlayer } from '@/context/PlayerContext';

export default function MusicPage() {
  const { currentTrack, isPlaying, playTrack, setPlaylist } = usePlayer();
  const [tracks, setTracks] = useState<Track[]>(SEED_TRACKS);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedGenre, setSelectedGenre] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    fetch('/api/tracks')
      .then((res) => res.json())
      .then((data) => {
        const list: Track[] = data.tracks ?? SEED_TRACKS;
        setTracks(list);
        setPlaylist(list);
      })
      .catch(() => {
        setTracks(SEED_TRACKS);
        setPlaylist(SEED_TRACKS);
      })
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function shareTrack(track: Track) {
    const url = `${window.location.origin}/music#${track.id}`;
    if (navigator.share) {
      navigator.share({ title: `${track.title} — Red Planet Records`, url }).catch(() => {});
    } else {
      navigator.clipboard.writeText(url);
      setCopiedId(track.id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  }

  const genres = ['ALL', 'ALTERNATIVE HIP HOP', 'AFROBEATS', 'ELECTRONIC', 'SYNTHWAVE', 'GLOBAL INDIE'];

  const filteredTracks = tracks.filter((track) => {
    const matchesSearch =
      track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (track.description && track.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSearch;
  });

  return (
    <main className="flex-1 flex flex-col px-6 py-8 max-w-7xl mx-auto w-full min-h-screen pb-32 space-y-8 font-mono">
      
      {/* Sony / Apple / Epic Records Grade Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-white/10 pb-6 gap-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="h-3 w-3 rounded-full bg-marsRed animate-ping" />
            <h1 className="text-3xl sm:text-4xl font-black tracking-wider uppercase text-white font-sans">
              Red Planet <span className="text-marsRed">Music Syndicate</span>
            </h1>
          </div>
          <p className="text-sm text-neutral-400 mt-1">
            Global Artist Incubation, Multi-Country Streaming & Independent Record Distribution | Founded by Deblaq & Win
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/invest"
            className="text-xs uppercase tracking-wide px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/10 font-bold"
          >
            Artist & Label Partnership
          </Link>
          <Link
            href="/admin/upload"
            className="text-xs uppercase tracking-wide px-4 py-2.5 rounded-xl bg-marsRed hover:bg-marsRed/80 text-white transition-all shadow-lg glow-mars font-bold"
          >
            + Upload & Release Track
          </Link>
        </div>
      </header>

      {/* Artist Incubation & Global Distribution Banner */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel p-6 rounded-3xl border border-white/10 flex flex-col justify-between">
          <div>
            <div className="text-xs text-neonCyan mb-2 uppercase tracking-widest font-bold">[GLOBAL SYNDICATION]</div>
            <h3 className="text-lg font-bold text-white uppercase mb-2">Multi-Country Streaming</h3>
            <p className="text-xs text-neutral-400">
              Broadcasting independent artist audio catalogs directly across 180+ countries with ultra-low latency Martian satellite relay nodes.
            </p>
          </div>
          <div className="mt-4 pt-4 border-t border-white/5 text-[11px] text-emerald-400 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            Active Nodes: Tokyo, Nairobi, New York, London, Mars 08
          </div>
        </div>

        <div className="glass-panel p-6 rounded-3xl border border-white/10 flex flex-col justify-between">
          <div>
            <div className="text-xs text-marsRed mb-2 uppercase tracking-widest font-bold">[ARTIST INCUBATION]</div>
            <h3 className="text-lg font-bold text-white uppercase mb-2">Elevating Independent Talent</h3>
            <p className="text-xs text-neutral-400">
              Designed by Deblaq & Win to empower small artists with major-label infrastructure, automated social marketing, and direct fan monetization.
            </p>
          </div>
          <div className="mt-4 pt-4 border-t border-white/5 text-[11px] text-neutral-300">
            Managed by Deblaq (Operations) & Win (Strategy)
          </div>
        </div>

        <div className="glass-panel p-6 rounded-3xl border border-white/10 flex flex-col justify-between">
          <div>
            <div className="text-xs text-neonCyan mb-2 uppercase tracking-widest font-bold">[ROYALTY & TELEMETRY]</div>
            <h3 className="text-lg font-bold text-white uppercase mb-2">Instant Global Payouts</h3>
            <p className="text-xs text-neutral-400">
              Transparent smart-contract ledger tracking every stream, play count, and merchandise conversion in real time.
            </p>
          </div>
          <div className="mt-4 pt-4 border-t border-white/5 text-[11px] text-neonCyan">
            Secure Gateway: redplanetcodes@gmail.com
          </div>
        </div>
      </section>

      {/* Catalog Control Bar: Search & Genre Filters */}
      <section className="flex flex-col md:flex-row justify-between items-center gap-4 bg-obsidian p-4 rounded-2xl border border-white/10">
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {genres.map((genre) => (
            <button
              key={genre}
              type="button"
              onClick={() => setSelectedGenre(genre)}
              className={`px-3 py-1.5 rounded-lg text-xs uppercase transition-all font-bold ${
                selectedGenre === genre
                  ? 'bg-marsRed text-white shadow-mars'
                  : 'bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {genre}
            </button>
          ))}
        </div>
        <div className="w-full md:w-72">
          <input
            type="text"
            placeholder="Search catalog by title or artist..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-deepSpace border border-white/10 rounded-xl px-4 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-marsRed"
          />
        </div>
      </section>

      {/* Main Track Streaming Catalog */}
      {loading ? (
        <div className="text-sm text-neutral-500 py-12 text-center">Initializing Global Audio Stream Nodes...</div>
      ) : filteredTracks.length === 0 ? (
        <div className="text-sm text-neutral-400 py-12 text-center glass-panel rounded-3xl border border-white/10">
          No tracks found matching your query. Upload new releases via the admin portal.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredTracks.map((track, i) => {
            const isActive = currentTrack?.id === track.id;
            const isActivePlaying = isActive && isPlaying;

            return (
              <div
                key={track.id}
                id={track.id}
                className={`glass-panel rounded-2xl border p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all group ${
                  isActive ? 'border-marsRed/50 bg-marsRed/5 shadow-mars' : 'border-white/10 hover:border-white/20 hover:bg-white/[0.02]'
                }`}
              >
                <div className="flex items-center gap-4 flex-1 min-w-0 w-full">
                  <button
                    type="button"
                    onClick={() => {
                      setPlaylist(tracks);
                      playTrack(track);
                    }}
                    className="flex items-center gap-4 flex-1 min-w-0 text-left"
                  >
                    <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-marsRed/40 to-neonCyan/20 flex items-center justify-center flex-shrink-0 text-lg font-black text-white overflow-hidden border border-white/10 relative group-hover:scale-105 transition-transform">
                      {track.coverUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={track.coverUrl} alt={track.title} className="h-full w-full object-cover" />
                      ) : (
                        <span>{String(i + 1).padStart(2, '0')}</span>
                      )}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                        <span className="text-white text-xs">{isActivePlaying ? '⏸' : '▶'}</span>
                      </div>
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="font-bold text-white uppercase tracking-wide truncate text-sm sm:text-base font-sans">
                          {track.title}
                        </h3>
                        {isActivePlaying && (
                          <span className="text-[10px] text-marsRed uppercase tracking-wide flex-shrink-0 bg-marsRed/10 px-2 py-0.5 rounded border border-marsRed/30 animate-pulse">
                            ● Streaming Live
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-neutral-400 mt-1 line-clamp-1">{track.description || 'Red Planet Syndicate Release — Global Master'}</p>
                      <div className="flex items-center gap-4 mt-2 text-[10px] text-neutral-500">
                        <span>AUDIO CODEC: FLAC / 320kbps</span>
                        <span>•</span>
                        <span>DISTRIBUTION: GLOBAL SYNCHRONIZED</span>
                      </div>
                    </div>
                  </button>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto justify-end border-t sm:border-t-0 pt-3 sm:pt-0 border-white/5">
                  <button
                    type="button"
                    onClick={() => {
                      setPlaylist(tracks);
                      playTrack(track);
                    }}
                    className="px-4 py-2 rounded-xl bg-white/10 hover:bg-marsRed text-white text-xs uppercase tracking-wider transition-colors flex items-center gap-2 font-bold"
                  >
                    <span>{isActivePlaying ? 'Pause Stream' : 'Stream Track'}</span>
                    <span>{isActivePlaying ? '⏸' : '▶'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => shareTrack(track)}
                    aria-label="Share this track"
                    className="h-10 w-10 rounded-xl border border-white/10 hover:border-neonCyan/50 flex items-center justify-center text-neutral-400 hover:text-neonCyan transition-colors text-xs"
                    title="Copy shareable link"
                  >
                    {copiedId === track.id ? '✓' : '↗'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Footer Info / Documentation */}
      <footer className="mt-12 p-6 rounded-3xl border border-white/10 bg-obsidian flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-neutral-400">
        <div>
          Seed catalog managed in <code className="text-white">lib/tracks.ts</code>. Production uploads deploy instantly via <Link href="/admin/upload" className="text-marsRed underline">/admin/upload</Link>.
        </div>
        <div className="text-neonCyan">
          Red Planet Records © 2026 — All Rights Reserved
        </div>
      </footer>
    </main>
  );
}