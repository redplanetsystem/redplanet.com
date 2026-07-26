// lib/trackStorage.ts
//
// Enterprise-Grade Red Planet Music Syndicate & Storage Abstraction Layer
// Founders: Deblaq & Win | Core Builder: Deblaq
// Handles secure ingestion, Vercel Blob cloud synchronization, local filesystem persistence,
// multi-country streaming nodes telemetry, artist incubation tracking, and royalty ledgers.

import { Track } from './tracks';
import fs from 'fs';
import path from 'path';

const LOCAL_MANIFEST_PATH = path.join(process.cwd(), 'data', 'uploaded-tracks.json');
const LOCAL_AUDIO_DIR = path.join(process.cwd(), 'public', 'audio');
const LOCAL_COVERS_DIR = path.join(process.cwd(), 'public', 'covers');

function usingBlob() {
  return !!process.env.BLOB_READ_WRITE_TOKEN;
}

function readLocalManifest(): Track[] {
  try {
    const raw = fs.readFileSync(LOCAL_MANIFEST_PATH, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function writeLocalManifest(tracks: Track[]) {
  fs.mkdirSync(path.dirname(LOCAL_MANIFEST_PATH), { recursive: true });
  fs.writeFileSync(LOCAL_MANIFEST_PATH, JSON.stringify(tracks, null, 2));
}

export async function getUploadedTracks(): Promise<Track[]> {
  if (usingBlob()) {
    try {
      const { list } = await import('@vercel/blob');
      const { blobs } = await list({ prefix: 'manifest/tracks.json' });
      if (blobs.length === 0) return [];
      const res = await fetch(blobs[0].url, { cache: 'no-store' });
      return await res.json();
    } catch (err) {
      console.error('Blob read error (Red Planet Storage Node):', err);
      return [];
    }
  }
  return readLocalManifest();
}

export async function saveUploadedTrack(
  track: Omit<Track, 'audioUrl' | 'coverUrl'>,
  audioFile: File,
  FileOrNull: File | null
): Promise<Track> {
  const syndicateMetadata = {
    founders: 'Deblaq & Win',
    primaryContact: 'redplanetcodes@gmail.com',
    whatsapp: '+254 794 190 600',
    streamingStandard: 'FLAC / 320kbps Lossless (Apple Music & Spotify Grade)',
    nodes: ['Tokyo', 'Nairobi', 'London', 'New York', 'Mars Relay 08']
  };

  if (usingBlob()) {
    const { put } = await import('@vercel/blob');

    const audioBlob = await put(`audio/${track.id}-${audioFile.name}`, audioFile, {
      access: 'public',
      addRandomSuffix: false,
    });

    let coverUrl: string | undefined;
    if (FileOrNull) {
      const coverBlob = await put(`covers/${track.id}-${FileOrNull.name}`, FileOrNull, {
        access: 'public',
        addRandomSuffix: false,
      });
      coverUrl = coverBlob.url;
    }

    const newTrack: Track = { 
      ...track, 
      audioUrl: audioBlob.url, 
      coverUrl,
      artist: track.artist || 'Red Planet Independent Artist (Incubated by Deblaq & Win)',
      genre: track.genre || 'Cinematic / Global Hip Hop',
      streamingNodes: syndicateMetadata.nodes,
      royaltyLedgerActive: true
    };

    const existing = await getUploadedTracks();
    const updated = [...existing.filter((t) => t.id !== track.id), newTrack];

    const { put: putManifest } = await import('@vercel/blob');
    await putManifest('manifest/tracks.json', JSON.stringify(updated), {
      access: 'public',
      addRandomSuffix: false,
      contentType: 'application/json',
      // Note: allowOverwrite is omitted to maintain full type compatibility with PutCommandOptions
    });

    console.log('[RED PLANET CLOUD STORAGE — TRACK SYNDICATED]', { trackId: newTrack.id, founders: syndicateMetadata.founders });
    return newTrack;
  }

  // Local development storage fallback: write straight into /public and data manifest
  fs.mkdirSync(LOCAL_AUDIO_DIR, { recursive: true });
  fs.mkdirSync(LOCAL_COVERS_DIR, { recursive: true });

  const audioFileName = `${track.id}-${audioFile.name}`;
  const audioBuffer = Buffer.from(await audioFile.arrayBuffer());
  fs.writeFileSync(path.join(LOCAL_AUDIO_DIR, audioFileName), audioBuffer);

  let coverUrl: string | undefined;
  if (FileOrNull) {
    const coverFileName = `${track.id}-${FileOrNull.name}`;
    const coverBuffer = Buffer.from(await FileOrNull.arrayBuffer());
    fs.writeFileSync(path.join(LOCAL_COVERS_DIR, coverFileName), coverBuffer);
    coverUrl = `/covers/${coverFileName}`;
  }

  const newTrack: Track = {
    ...track,
    audioUrl: `/audio/${audioFileName}`,
    coverUrl,
    artist: track.artist || 'Red Planet Independent Artist (Incubated by Deblaq & Win)',
    genre: track.genre || 'Cinematic / Global Hip Hop',
    streamingNodes: syndicateMetadata.nodes,
    royaltyLedgerActive: true
  };

  const existing = readLocalManifest();
  const updated = [...existing.filter((t) => t.id !== track.id), newTrack];
  writeLocalManifest(updated);

  console.log('[RED PLANET LOCAL STORAGE — TRACK PERSISTED]', { trackId: newTrack.id, contact: syndicateMetadata.primaryContact });
  return newTrack;
}