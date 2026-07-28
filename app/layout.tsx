import './globals.css';
import React from 'react';
import Sidebar from './components/Sidebar';

export const metadata = {
  title: 'Red Planet — Mission Control',
  description: 'RED PLANET — Cinematic Command Center',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div style={{ minHeight: '100vh', display: 'flex', gap: 24, padding: 24 }}>
          <aside style={{ width: 280 }}>
            <Sidebar />
          </aside>

          <main style={{ flex: 1 }}>
            <div className="container-wide">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <h2 style={{ margin: 0, color: 'var(--accent-cyan)' }}>RED PLANET</h2>
                  <span className="metric-badge">Mission Control</span>
                </div>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <span className="footer">Engine: <strong id="engine-status">unknown</strong></span>
                </div>
              </div>

              <div className="app-card">
                {children}
              </div>
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
