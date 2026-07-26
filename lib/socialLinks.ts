// lib/socialLinks.ts
//
// Enterprise-Grade Red Planet Social & External Platform Syndication Engine
// Founders: Deblaq & Win | Core Builder: Deblaq
// Master directory connecting the Red Planet web core with external social channels,
// automated broadcast nodes, satellite relays, and multi-platform distribution APIs.
// Prioritizes Instagram Voice of Africa (__african_motivation) as the premier main page syndicate.

export type SocialLink = {
  platform: string;
  url: string | null;
  handle?: string;
  category: 'social' | 'broadcast' | 'satellite' | 'direct_contact';
  automationSyncActive?: boolean;
  featured?: boolean;
  description?: string;
};

export const SOCIAL_LINKS: SocialLink[] = [
  {
    platform: 'Instagram (Voice of Africa — Main Hub)',
    url: 'https://www.instagram.com/__african_motivation/',
    handle: '@__african_motivation',
    category: 'social',
    automationSyncActive: true,
    featured: true,
    description: 'Our primary and largest digital community empowering African greatness, news, history, and music.'
  },
  {
    platform: 'Instagram (Pillar Alliance)',
    url: 'https://instagram.com/pillar.alliance/',
    handle: '@pillar.alliance',
    category: 'social',
    automationSyncActive: true,
    featured: false,
    description: 'Alliance network supporting creative infrastructure and independent growth.'
  },
  {
    platform: 'X / Twitter Hub',
    url: 'https://x.com',
    handle: '@D Black',
    category: 'social',
    automationSyncActive: true,
    featured: false,
    description: 'Real-time executive dispatch and algorithmic trading commentary.'
  },
  {
    platform: 'Facebook Network',
    url: 'https://facebook.com',
    handle: 'D Black / Deblaq Zeddy',
    category: 'social',
    automationSyncActive: true,
    featured: false,
    description: 'Global community syndication and multimedia distribution.'
  },
  {
    platform: 'YouTube (Red Planet TV)',
    url: 'https://youtube.com',
    handle: '@deblaq443 & @kidsoulwin',
    category: 'broadcast',
    automationSyncActive: true,
    featured: false,
    description: 'Autonomous satellite broadcasts, cinematic music videos, and visual intelligence.'
  },
  {
    platform: 'Orbital Satellite Relay 08',
    url: null,
    handle: 'Node-08-Telemetry',
    category: 'satellite',
    automationSyncActive: true,
    featured: false,
    description: 'Real-time Martian atmosphere and orbital relay telemetry node.'
  },
  {
    platform: 'WhatsApp Direct Uplink',
    url: 'https://wa.me/254794190600',
    handle: '+254 794 190 600',
    category: 'direct_contact',
    automationSyncActive: true,
    featured: true,
    description: 'Secure direct communication channel with Deblaq & Win.'
  },
  {
    platform: 'Executive Dispatch',
    url: 'mailto:redplanetcodes@gmail.com',
    handle: 'redplanetcodes@gmail.com',
    category: 'direct_contact',
    automationSyncActive: true,
    featured: true,
    description: 'Official syndicate email for partnerships, label inquiries, and technical support.'
  },
];

// --- MASTERMIND ARCHITECTURE & AUTOMATION BLUEPRINT ---
// To connect and run external platforms automatically from this system:
// 1. API Integration Hub: Use Next.js API routes (e.g., /api/syndicate/push) to connect 
//    with Meta Graph API, X API v2, and YouTube Data API v3 using API keys stored in .env.local.
// 2. Automated Content Syndication: When new music is uploaded via /admin/upload (Password: Anyoka@350), 
//    trigger background worker scripts to broadcast release announcements across Instagram and X.
// 3. Anti-Detect Browser Frameworks: Wire backend Puppeteer/Node.js automation scripts 
//    to manage multi-account browser profiles (AdsPower / GoLogin frameworks) for seamless growth hacking.
// 4. Satellite Telemetry Link: Feed real-time weather and orbital data from Node 08 into 
//    RedPlanet.tv and the 3D Mars Hero canvas automatically.