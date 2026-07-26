'use client';

import { useState, useRef } from 'react';

export default function UploadPage() {
  // Authentication State for Admin Security Gateway
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState(false);

  // Track Upload States
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [status, setStatus] = useState<'idle' | 'uploading' | 'done' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  const ADMIN_PASSWORD = 'Anyoka@350';
  const PRIMARY_ADMIN_EMAIL = 'redplanetcodes@gmail.com';

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (passwordInput === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!audioFile) {
      setStatus('error');
      setErrorMsg('Choose an audio file first.');
      return;
    }

    setStatus('uploading');
    setErrorMsg('');

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('audio', audioFile);
    if (coverFile) formData.append('cover', coverFile);

    try {
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const data = await res.json();

      if (!res.ok) {
        setStatus('error');
        setErrorMsg(data.error ?? 'Upload failed.');
        return;
      }

      setStatus('done');
      setTitle('');
      setDescription('');
      setAudioFile(null);
      setCoverFile(null);
      formRef.current?.reset();
    } catch {
      setStatus('error');
      setErrorMsg('Could not reach the server. Try again.');
    }
  }

  // --- SECURE ADMIN GATEWAY LOCKSCREEN ---
  if (!isAuthenticated) {
    return (
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-16 max-w-md mx-auto w-full min-h-screen">
        <div className="glass-panel rounded-3xl border border-white/10 p-8 w-full shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="h-12 w-12 mx-auto rounded-2xl bg-marsRed/20 border border-marsRed/40 flex items-center justify-center text-marsRed text-xl">
              🔒
            </div>
            <h1 className="text-xl font-black tracking-wider uppercase text-white">
              Admin Command Gate
            </h1>
            <p className="text-xs text-neutral-400 font-mono">
              Restricted Area. Authorized Access Only ({PRIMARY_ADMIN_EMAIL}).
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase text-neutral-400 mb-2">
                Security Password
              </label>
              <input
                type="password"
                required
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Enter admin password..."
                className="w-full bg-deepSpace border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-marsRed font-mono"
              />
            </div>

            {authError && (
              <div className="text-xs text-red-400 bg-red-950/40 border border-red-900/50 rounded-xl px-4 py-3 font-mono">
                Access Denied. Incorrect security key.
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-marsRed hover:bg-marsRed/80 text-white font-bold py-3 px-6 rounded-xl text-xs uppercase tracking-widest transition-all glow-mars font-mono"
            >
              Authenticate & Unlock Studio
            </button>
          </form>

          <div className="pt-4 border-t border-white/5 text-center text-[10px] font-mono text-neutral-500">
            Protected by Red Planet Security Syndicate Protocol.
          </div>
        </div>
      </main>
    );
  }

  // --- SECURED UPLOAD STUDIO ---
  return (
    <main className="flex-1 flex flex-col px-6 py-12 max-w-3xl mx-auto w-full min-h-screen space-y-8">
      
      {/* Header with Security Status */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-white/10 pb-6 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest">SECURE SESSION ACTIVE</span>
          </div>
          <h1 className="text-3xl font-black tracking-wider uppercase text-white">
            Upload <span className="text-marsRed">Catalog Track</span>
          </h1>
          <p className="text-xs text-neutral-400 mt-1 font-mono">
            Direct audio injection for <span className="text-white">/music</span> stream network. Managed by Deblaq & Win.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setIsAuthenticated(false)}
          className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-mono text-neutral-400 hover:text-white border border-white/10 transition-colors"
        >
          Lock Session
        </button>
      </header>

      {/* Upload Form Container */}
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="glass-panel rounded-3xl border border-white/10 p-6 sm:p-10 flex flex-col gap-6 shadow-2xl"
      >
        <div>
          <label className="block text-xs font-mono uppercase text-neutral-400 mb-2">
            Track Title *
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-deepSpace border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-marsRed font-mono"
            placeholder="e.g. RED PLANET ANTHEM (SOL 08)"
          />
        </div>

        <div>
          <label className="block text-xs font-mono uppercase text-neutral-400 mb-2">
            Description & Rollout Notes
          </label>
          <textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-deepSpace border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-marsRed resize-none font-mono"
            placeholder="Details on genre, artist credits, or global distribution notes..."
          />
        </div>

        <div>
          <label className="block text-xs font-mono uppercase text-neutral-400 mb-2">
            Master Audio File <span className="text-marsRed">*</span>
          </label>
          <input
            type="file"
            required
            accept="audio/mpeg,audio/wav,audio/mp4,audio/aac,audio/ogg,.mp3,.wav,.m4a,.ogg"
            onChange={(e) => setAudioFile(e.target.files?.[0] ?? null)}
            className="w-full text-xs font-mono text-neutral-300 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:bg-marsRed file:text-white file:text-xs file:font-bold file:uppercase file:cursor-pointer hover:file:bg-marsRed/80 transition-all"
          />
          <p className="text-[10px] text-neutral-500 mt-1.5 font-mono">Accepted formats: MP3, WAV, M4A, OGG (Maximum 50MB).</p>
        </div>

        <div>
          <label className="block text-xs font-mono uppercase text-neutral-400 mb-2">
            Cover Art Asset (Optional)
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setCoverFile(e.target.files?.[0] ?? null)}
            className="w-full text-xs font-mono text-neutral-300 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:bg-white/10 file:text-white file:text-xs file:font-bold file:uppercase file:cursor-pointer hover:file:bg-white/20 transition-all"
          />
        </div>

        {status === 'error' && (
          <div className="text-xs text-red-400 bg-red-950/40 border border-red-900/50 rounded-xl px-4 py-3 font-mono">
            {errorMsg}
          </div>
        )}

        {status === 'done' && (
          <div className="text-xs text-emerald-400 bg-emerald-950/30 border border-emerald-900/40 rounded-xl px-4 py-3 font-mono flex items-center justify-between">
            <span>✓ Track successfully uploaded and deployed live to catalog.</span>
            <a href="/music" className="underline font-bold text-white hover:text-neonCyan">
              View /music
            </a>
          </div>
        )}

        <button
          type="submit"
          disabled={status === 'uploading'}
          className="bg-marsRed hover:bg-marsRed/80 disabled:opacity-40 text-white font-bold py-4 px-8 rounded-xl text-xs font-mono tracking-widest uppercase transition-all glow-mars"
        >
          {status === 'uploading' ? 'Encrypting & Uploading Track...' : 'Deploy Track to Global Network'}
        </button>
      </form>

      <div className="p-4 rounded-2xl bg-obsidian border border-white/10 text-xs font-mono text-neutral-400 flex justify-between items-center">
        <span>Admin Identity: <strong className="text-white">redplanetcodes@gmail.com</strong></span>
        <span className="text-emerald-400">Security Gate: Secured</span>
      </div>
    </main>
  );
}