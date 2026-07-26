'use client';

import {
  createContext,
  useContext,
  useRef,
  useState,
  useCallback,
  useEffect,
  ReactNode,
} from 'react';
import { Track, TRACKS } from '@/lib/tracks';

type PlayerContextType = {
  currentTrack: Track | null;
  isPlaying: boolean;
  progress: number; // 0 to 1
  duration: number; // seconds
  currentTime: number; // seconds
  volume: number; // 0 to 1
  hasError: boolean;
  repeatMode: 'off' | 'all' | 'one';
  shuffleMode: boolean;
  playTrack: (track: Track) => void;
  togglePlay: () => void;
  seek: (fraction: number) => void;
  setVolume: (v: number) => void;
  playNext: () => void;
  playPrev: () => void;
  setPlaylist: (tracks: Track[]) => void;
  toggleRepeat: () => void;
  toggleShuffle: () => void;
};

const PlayerContext = createContext<PlayerContextType | null>(null);

export function PlayerProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolumeState] = useState(0.85);
  const [hasError, setHasError] = useState(false);
  const [playlist, setPlaylistState] = useState<Track[]>(TRACKS);
  const [repeatMode, setRepeatMode] = useState<'off' | 'all' | 'one'>('all');
  const [shuffleMode, setShuffleMode] = useState(false);

  // Initialize Audio Engine & Global Streaming Event Listeners
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.volume = volume;
    }
    const audio = audioRef.current;

    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onLoadedMetadata = () => setDuration(audio.duration || 0);
    const onEnded = () => {
      if (repeatMode === 'one' && currentTrack) {
        audio.currentTime = 0;
        audio.play().catch(() => setHasError(true));
      } else {
        playNext();
      }
    };
    const onError = () => {
      setHasError(true);
      setIsPlaying(false);
    };

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('error', onError);

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('error', onError);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTrack, playlist, repeatMode]);

  const playTrack = useCallback((track: Track) => {
    const audio = audioRef.current;
    if (!audio) return;

    setHasError(false);

    if (currentTrack?.id === track.id) {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        audio.play().catch(() => setHasError(true));
        setIsPlaying(true);
      }
      return;
    }

    setCurrentTrack(track);
    audio.src = track.audioUrl;
    audio.play().then(() => setIsPlaying(true)).catch(() => setHasError(true));
  }, [currentTrack, isPlaying]);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().catch(() => setHasError(true));
      setIsPlaying(true);
    }
  }, [isPlaying, currentTrack]);

  const seek = useCallback((fraction: number) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    audio.currentTime = fraction * duration;
  }, [duration]);

  const setVolume = useCallback((v: number) => {
    setVolumeState(v);
    if (audioRef.current) audioRef.current.volume = v;
  }, []);

  const playNext = useCallback(() => {
    if (!currentTrack || playlist.length === 0) return;
    
    if (shuffleMode) {
      const randomIndex = Math.floor(Math.random() * playlist.length);
      playTrack(playlist[randomIndex]);
      return;
    }

    const idx = playlist.findIndex((t) => t.id === currentTrack.id);
    if (idx === playlist.length - 1 && repeatMode === 'off') {
      setIsPlaying(false);
      return;
    }
    const next = playlist[(idx + 1) % playlist.length];
    playTrack(next);
  }, [currentTrack, playlist, shuffleMode, repeatMode, playTrack]);

  const playPrev = useCallback(() => {
    if (!currentTrack || playlist.length === 0) return;
    const idx = playlist.findIndex((t) => t.id === currentTrack.id);
    const prev = playlist[(idx - 1 + playlist.length) % playlist.length];
    playTrack(prev);
  }, [currentTrack, playlist, playTrack]);

  const setPlaylist = useCallback((tracks: Track[]) => {
    setPlaylistState(tracks);
  }, []);

  const toggleRepeat = useCallback(() => {
    setRepeatMode(prev => prev === 'off' ? 'all' : prev === 'all' ? 'one' : 'off');
  }, []);

  const toggleShuffle = useCallback(() => {
    setShuffleMode(prev => !prev);
  }, []);

  const progress = duration > 0 ? currentTime / duration : 0;

  return (
    <PlayerContext.Provider
      value={{
        currentTrack,
        isPlaying,
        progress,
        duration,
        currentTime,
        volume,
        hasError,
        repeatMode,
        shuffleMode,
        playTrack,
        togglePlay,
        seek,
        setVolume,
        playNext,
        playPrev,
        setPlaylist,
        toggleRepeat,
        toggleShuffle,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error('usePlayer must be used within PlayerProvider');
  return ctx;
}