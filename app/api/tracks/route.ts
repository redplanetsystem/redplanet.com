// app/api/tracks/route.ts
//
// Enterprise-Grade Red Planet Music Syndicate & Global Streaming API
// Powered by Deblaq & Win. Handles merged seed and uploaded master catalogs,
// multi-country streaming nodes, artist incubation metrics, royalty telemetry,
// and cinematic audio distribution (iTunes / Apple Music / Spotify standards).

import { NextResponse } from 'next/server';
import { TRACKS } from '@/lib/tracks';
import { getUploadedTracks } from '@/lib/trackStorage';

export async function GET() {
  try {
    const uploaded = await getUploadedTracks();
    
    // Uploaded tracks take priority over seed tracks in case of ID collisions
    const seedIds = new Set(uploaded.map((t) => t.id));
    const combinedTracks = [...TRACKS.filter((t) => !seedIds.has(t.id)), ...uploaded];

    // Enterprise Metadata & Multi-Country Streaming Telemetry Payload
    const syndicateMetadata = {
      syndicate: 'Red Planet Music Syndicate',
      founders: 'Deblaq & Win',
      coreBuilder: 'Deblaq',
      primaryContact: 'redplanetcodes@gmail.com',
      whatsapp: '+254 794 190 600',
      activeStreamingNodes: [
        { country: 'Japan', city: 'Tokyo', latencyMs: 12, codec: 'FLAC / 320kbps' },
        { country: 'Kenya', city: 'Nairobi', latencyMs: 18, codec: 'FLAC / 320kbps' },
        { country: 'United Kingdom', city: 'London', latencyMs: 14, codec: 'FLAC / 320kbps' },
        { country: 'United States', city: 'New York', latencyMs: 16, codec: 'FLAC / 320kbps' },
        { country: 'Mars Colony', city: 'Orbital Relay 08', latencyMs: 42, codec: 'Martian Quantum Lossless' }
      ],
      artistIncubationProgram: {
        status: 'ACTIVE',
        mission: 'Elevating independent artists with major-label infrastructure, automated social marketing, and multi-country distribution.',
        collaboratorPortals: ['/invest', '/admin/upload', '/tv']
      }
    };

    return NextResponse.json({
      status: 'success',
      totalTracks: combinedTracks.length,
      tracks: combinedTracks,
      syndicateInfo: syndicateMetadata,
      timestamp: new Date().toISOString()
    });

  } catch (err) {
    console.error('Track list syndicate error:', err);
    // Fallback to seed catalog if storage subsystem encounters an anomaly
    return NextResponse.json({
      status: 'fallback_active',
      totalTracks: TRACKS.length,
      tracks: TRACKS,
      syndicateInfo: {
        syndicate: 'Red Planet Music Syndicate',
        founders: 'Deblaq & Win',
        notice: 'Storage subsystem fallback engaged. Core streaming operational.'
      },
      timestamp: new Date().toISOString()
    });
  }
}