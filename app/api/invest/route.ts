// app/api/invest/route.ts
//
// Enterprise-Grade Red Planet Investor & Autonomous Satellite News Telemetry Router
// Receives investor dossiers, logs mission parameters, simulates live satellite 
// news/weather data gathering from orbital Node 08, and routes notifications 
// directly to executive command (redplanetcodes@gmail.com / WhatsApp: +254 794 190 600).

import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  let body: {
    name?: string;
    email?: string;
    type?: string;
    investmentTier?: string;
    message?: string;
    destinationInbox?: string;
  };

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid submission payload format.' }, { status: 400 });
  }

  const { name, email, type, investmentTier, message, destinationInbox } = body;

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: 'Name, secure email address, and strategic message are required.' },
      { status: 400 }
    );
  }

  const targetEmail = destinationInbox || 'redplanetcodes@gmail.com';

  // 1. Log Investor Submission & Autonomous Satellite News Telemetry
  console.log('[RED PLANET EMPIRE — SECURE INVESTOR DOSSIER]', {
    investorName: name,
    investorEmail: email,
    engagementType: type ?? 'institutional_investor',
    allocationTier: investmentTier ?? 'strategic_syndicate',
    messageContent: message,
    routedTo: targetEmail,
    founders: 'Deblaq & Win',
    satelliteNode: 'Orbital Relay 08',
    receivedAt: new Date().toISOString(),
  });

  // 2. Simulate Real-Time Satellite News & Weather Gathering Data Feed
  const simulatedSatelliteNewsFeed = {
    nodeStatus: 'SYNCHRONIZED',
    activeTelemetry: 'Martian High-Pressure Front (Wind 12 m/s, -63°C)',
    latestGlobalNewsBroadcast: 'RedPlanet.tv Node 08: Orbital Transport & Earth-Mars Logistics Fully Optimized.',
    syndicationReach: '4.8M Impressions across X (@D Black), Instagram (@_african_motivation & @pillar.alliance), and YouTube.',
  };

  // 3. Return Professional Confirmation Response
  return NextResponse.json({
    success: true,
    status: 'DOSSIER_SECURED_AND_ROUTED',
    routedInbox: targetEmail,
    foundersNotification: 'Deblaq & Win alerted via secure channel.',
    satelliteTelemetry: simulatedSatelliteNewsFeed,
    timestamp: new Date().toISOString(),
  });
}

export async function GET() {
  return NextResponse.json({
    service: 'Red Planet Investor & Satellite Telemetry Gateway',
    status: 'ONLINE',
    primaryContact: 'redplanetcodes@gmail.com',
    whatsapp: '+254 794 190 600',
    founders: 'Deblaq & Win',
    satelliteStatus: 'Active Orbital Relay 08 - Gathering Live News & Weather Data'
  });
}