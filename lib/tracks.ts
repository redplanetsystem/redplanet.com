// lib/tracks.ts
//
// Enterprise-Grade Red Planet Music Syndicate Master Catalog
// Founders: Deblaq & Win | Core Builder: Deblaq
// Multi-country streaming, artist incubation, cinematic beat production,
// and high-impact audio assets designed to prepare humanity for Mars.

export type Track = {
  id: string;
  title: string;
  duration: string; // display only, e.g. "3:42"
  description: string;
  audioUrl: string;
  coverUrl?: string; // optional — falls back to a generated gradient if omitted
  artist?: string;
  genre?: string;
  streamingNodes?: string[];
  royaltyLedgerActive?: boolean;
};

export const TRACKS: Track[] = [
  {
    id: 'everything',
    title: 'EVERYTHING',
    duration: '3:45',
    description: 'Brazilian funk-influenced, hypnotic hook, built to lock the body before the mind catches up. Master release by Win.',
    audioUrl: '/audio/everything.mp3',
    coverUrl: '/covers/everything.jpg',
    artist: 'Win (Red Planet Syndicate)',
    genre: 'Alternative Hip Hop / Brazilian Funk',
    streamingNodes: ['Tokyo', 'Nairobi', 'London', 'New York', 'Mars Relay 08'],
    royaltyLedgerActive: true,
  },
  {
    id: 'am-i-real',
    title: 'AM I REAL',
    duration: '4:12',
    description: 'Ego-death centerpiece — the emotional core of the record. Engineered for multi-planetary consciousness.',
    audioUrl: '/audio/am-i-real.mp3',
    coverUrl: '/covers/am-i-real.jpg',
    artist: 'Win & Deblaq Syndicate',
    genre: 'Cinematic Ambient / Electronic',
    streamingNodes: ['Tokyo', 'Nairobi', 'London', 'New York', 'Mars Relay 08'],
    royaltyLedgerActive: true,
  },
  {
    id: 'speed-vs-stillness',
    title: 'SPEED VS. STILLNESS',
    duration: '3:20',
    description: 'Time-teleportation techniques in motion — fast then frozen, on purpose. SpaceX and Tesla mindset translated into sound.',
    audioUrl: '/audio/speed-vs-stillness.mp3',
    coverUrl: '/covers/speed-vs-stillness.jpg',
    artist: 'Win',
    genre: 'Electronic / Industrial Synthwave',
    streamingNodes: ['Tokyo', 'Nairobi', 'London', 'New York', 'Mars Relay 08'],
    royaltyLedgerActive: true,
  },
  {
    id: 'mars-colony-anthem',
    title: 'MARS COLONY ANTHEM (SOL 08)',
    duration: '3:58',
    description: 'Cinematic soundtrack dedicated to Elon Musk and early Mars pioneers. The official anthem of interplanetary migration.',
    audioUrl: '/audio/mars-colony-anthem.mp3',
    coverUrl: '/covers/mars-colony-anthem.jpg',
    artist: 'Win & Red Planet Artists',
    genre: 'Cinematic Space Orchestral',
    streamingNodes: ['Tokyo', 'Nairobi', 'London', 'New York', 'Mars Relay 08'],
    royaltyLedgerActive: true,
  },
  {
    id: 'expert-sniper-pro-rhythm',
    title: 'EXPERT SNIPER PRO (TRADING RHYTHM)',
    duration: '3:10',
    description: 'Algorithmic trading bot pulse translated into high-frequency trap beats. Built by Deblaq & Win.',
    audioUrl: '/audio/expert-sniper-pro-rhythm.mp3',
    coverUrl: '/covers/expert-sniper-pro-rhythm.jpg',
    artist: 'Deblaq & Win',
    genre: 'Electronic Trap / Financial Pulse',
    streamingNodes: ['Tokyo', 'Nairobi', 'London', 'New York', 'Mars Relay 08'],
    royaltyLedgerActive: true,
  }
];

// Syndicate Metadata & Artist Incubation Guidelines
export const SYNDICATE_MUSIC_CONFIG = {
  syndicateName: 'Red Planet Music Syndicate',
  founders: 'Deblaq & Win',
  primaryContact: 'redplanetcodes@gmail.com',
  whatsappSupport: '+254 794 190 600',
  uploadPortal: '/admin/upload',
  streamingStandard: 'FLAC / 320kbps Lossless (Apple Music & Spotify Grade)',
  artistIncubationNote: 'We elevate independent artists by providing major-label infrastructure, automated social media marketing, and multi-country streaming distribution.'
};