'use client';

import { usePlayer } from '@/context/PlayerContext';
import Link from 'next/link';

function formatTime(seconds: number) {
  if (!isFinite(seconds) || seconds < 0) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export default function MusicPlayer() {
  const {
    currentTrack,
    isPlaying,
    progress,
    duration,
    currentTime,
    volume,
    hasError,
    togglePlay,
    seek,
    setVolume,
    playNext,
    playPrev,
  } = usePlayer();

  if (!currentTrack) return null;

  function handleSeekClick(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const fraction = (e.clientX - rect.left) / rect.width;
    seek(Math.min(Math.max(fraction, 0), 1));
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 glass-panel-strong border-t border-white/15 shadow-2xl backdrop-blur-3xl">
      {/* Interactive Precision Progress & Scrub Bar (Spotify / Apple Music Grade) */}
      <div
        onClick={handleSeekClick}
        className="h-1.5 w-full bg-white/10 cursor-pointer relative group transition-all hover:h-2.5"
      >
        <div
          className="h-full bg-gradient-to-r from-marsRed to-neonCyan transition-all relative"
          style={{ width: `${progress * 100}%` }}
        >
          <div className="absolute right-0 top-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-white shadow-mars opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Track Metadata & Win Cinematic Art Credit */}
        <div className="flex items-center gap-4 min-w-0 w-full sm:w-auto">
          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-marsRed/40 to-neonCyan/20 flex items-center justify-center flex-shrink-0 text-white font-bold overflow-hidden border border-white/10">
            {currentTrack.coverUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={currentTrack.coverUrl} alt={currentTrack.title} className="h-full w-full object-cover" />
            ) : (
              <span>⚡</span>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-sm font-bold text-white truncate flex items-center gap-2">
              <span>{currentTrack.title}</span>
              <span className="text-[9px] font-mono bg-marsRed/20 text-marsRed px-2 py-0.5 rounded border border-marsRed/30 hidden md:inline">
                Cinematic Master by Win
              </span>
            </div>
            <div className="text-xs text-neutral-400 font-mono flex items-center gap-2">
              {hasError ? (
                <span className="text-red-400">
                  Audio asset missing in /public{currentTrack.audioUrl}
                </span>
              ) : (
                <>
                  <span>{formatTime(currentTime)} / {formatTime(duration)}</span>
                  <span className="text-neutral-600">•</span>
                  <span className="text-neonCyan hidden sm:inline">FLAC / 320kbps Lossless</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Playback Controls & Syndicate Quick Actions */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={playPrev}
              aria-label="Previous track"
              className="text-neutral-400 hover:text-white transition-colors text-base"
            >
              ⏮
            </button>
            <button
              type="button"
              onClick={togglePlay}
              aria-label={isPlaying ? 'Pause' : 'Play'}
              className="h-11 w-11 rounded-full bg-marsRed hover:bg-marsRed/80 text-white flex items-center justify-center transition-all glow-mars text-sm shadow-lg"
            >
              {isPlaying ? '⏸' : '▶'}
            </button>
            <button
              type="button"
              onClick={playNext}
              aria-label="Next track"
              className="text-neutral-400 hover:text-white transition-colors text-base"
            >
              ⏭
            </button>
          </div>

          {/* Independent Artist & Beat Trading Quick Links */}
          <div className="hidden lg:flex items-center gap-2 font-mono text-[10px]">
            <Link href="/music" className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 border border-white/10 transition-colors uppercase">
              Browse Catalog
            </Link>
            <Link href="/admin/upload" className="px-3 py-1.5 rounded-lg bg-marsRed/20 hover:bg-marsRed text-white border border-marsRed/40 transition-colors uppercase">
              Upload Track
            </Link>
          </div>
        </div>

        {/* Volume & Ecosystem Telemetry Hub */}
        <div className="hidden sm:flex items-center gap-4 w-48 justify-end">
          <div className="flex items-center gap-2 w-32">
            <span className="text-xs text-neutral-500">🔊</span>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-full accent-marsRed cursor-pointer"
              aria-label="Volume"
            />
          </div>
          <div className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Live</span>
          </div>
        </div>

      </div>
    </div>
  );
}