'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const PAGES = [
  { id: 'status', label: 'System Status', href: '/' },
  { id: 'portfolio', label: 'Portfolio Overview', href: '/portfolio' },
  { id: 'tv', label: 'Live TV & Global Signal Feed', href: '/tv' },
  { id: 'history', label: 'Trade History', href: '/history' },
  { id: 'risk', label: 'Risk Management', href: '/risk' },
  { id: 'indicators', label: 'Indicators & Analytics', href: '/indicators' },
  { id: 'symbols', label: 'Symbols & Assets', href: '/symbols' },
  { id: 'streaming', label: 'Streaming & API Hub', href: '/streaming' },
  { id: 'vpn', label: 'VPN & Proxy Tunneling', href: '/vpn' },
  { id: 'marketing', label: 'Marketing Suite', href: '/marketing' },
  { id: 'integrations', label: 'External Platform Integrations', href: '/integrations' },
  { id: 'community', label: 'Community Members Portal', href: '/community' },
  { id: 'collaborators', label: 'Collaborators', href: '/collaborators' },
  { id: 'log', label: 'Activity Log', href: '/log' },
  { id: 'report', label: 'Terminal Report', href: '/report' },
];

export default function Sidebar() {
  const pathname = usePathname() || '/';
  return (
    <div className="app-card" style={{ display: 'flex', flexDirection: 'column', gap: 12, height: 'calc(100vh - 48px)' }}>
      <div style={{ paddingBottom: 6 }}>
        <h3 style={{ margin: 0, color: 'var(--accent-magenta)' }}>Navigation</h3>
        <div className="footer" style={{ marginTop: 6 }}>The Operating System of Reality</div>
      </div>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: 8, overflowY: 'auto', paddingRight: 6 }}>
        {PAGES.map((p) => {
          const active = pathname === p.href;
          return (
            <Link key={p.id} href={p.href} className="nav-link" style={{
              display: 'block',
              background: active ? 'linear-gradient(90deg, rgba(255,0,85,0.12), rgba(121,40,202,0.06))' : undefined,
              border: active ? `1px solid var(--glass-border)` : undefined
            }}>
              {p.label}
            </Link>
          );
        })}
      </nav>

      <div style={{ marginTop: 'auto', paddingTop: 8 }}>
        <div className="footer">Connected: <strong style={{ color: 'var(--accent-emerald)' }}>OK</strong></div>
        <div style={{ height: 8 }} />
        <div className="footer">Theme: Cosmic CRT</div>
      </div>
    </div>
  );
}
