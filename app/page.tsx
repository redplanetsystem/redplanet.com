import React from 'react';
import LiveTV from './tv/LiveTV';

export default function HomePage() {
  return (
    <div>
      <header style={{ marginBottom: 18 }}>
        <h1 style={{ margin: 0, color: 'var(--accent-violet)' }}>Mission Control — Red Planet</h1>
        <p className="footer">Cinematic Command Center • Cosmic CRT aesthetic</p>
      </header>

      <section style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16 }}>
        <div>
          <LiveTV />
        </div>

        <aside>
          <div className="app-card">
            <h4 style={{ marginTop: 0 }}>System Status</h4>
            <p className="footer">Engine: <strong style={{ color: 'var(--accent-emerald)' }}>online</strong></p>
            <p className="footer">Last tick: —</p>
          </div>

          <div style={{ height: 12 }} />
          <div className="app-card">
            <h4 style={{ marginTop: 0 }}>Quick Controls</h4>
            <p className="footer">UI Themes, Telemetry levels, Diagnostics</p>
          </div>
        </aside>
      </section>
    </div>
  );
}
