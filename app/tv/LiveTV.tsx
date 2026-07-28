'use client';
import React, { useEffect, useMemo, useState } from 'react';

type NewsItem = { headline: string; source?: string };

const DEMO_FEED: NewsItem[] = [
  { headline: 'Global markets mixed — Red Planet telemetry nominal' },
  { headline: 'Macro: Central bank minutes show steady policy' },
  { headline: 'Geo: Shipping lanes clear; orbital window stable' },
  { headline: 'Crypto: Small cap rotation into energy tokens' },
];

async function fetchFinnhubNews(apiKey: string, signal: AbortSignal): Promise<NewsItem[]> {
  if (!apiKey) throw new Error('no-api-key');
  const url = `https://finnhub.io/api/v1/news?category=general&token=${apiKey}`;
  const resp = await fetch(url, { signal, cache: 'no-store' });
  if (!resp.ok) throw new Error(`http ${resp.status}`);
  const json = await resp.json();
  return (json || []).slice(0, 10).map((i: any) => ({ headline: i.headline || i.summary || 'news' }));
}

export default function LiveTV() {
  const [news, setNews] = useState<NewsItem[]>(DEMO_FEED);
  const [loading, setLoading] = useState(true);
  const apiKey = process.env.NEXT_PUBLIC_FINNHUB_API_KEY || '';

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    (async () => {
      try {
        if (apiKey) {
          const items = await fetchFinnhubNews(apiKey, controller.signal);
          if (items && items.length) setNews(items);
        } else {
          // no key: keep demo feed
          setNews(DEMO_FEED);
        }
      } catch (e) {
        setNews(DEMO_FEED);
      } finally {
        setLoading(false);
      }
    })();

    // refresh every 60s
    const iv = setInterval(() => {
      (async () => {
        try {
          if (apiKey) {
            const items = await fetchFinnhubNews(apiKey, controller.signal);
            if (items && items.length) setNews(items);
          }
        } catch {
          // ignore
        }
      })();
    }, 60_000);

    return () => {
      controller.abort();
      clearInterval(iv);
    };
  }, [apiKey]);

  const tickerText = useMemo(() => news.map((n) => n.headline).join('   •   '), [news]);

  return (
    <div>
      <div className="tv-frame">
        <div className="tv-screen">
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
            <div>
              <div className="tv-title">RED PLANET & INTERZONE LIVE BROADCAST TV</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)' }}>CRT Monitor — Live Signals & Telemetry</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)' }}>{new Date().toLocaleString()}</div>
              <div style={{ fontSize: 12, color: 'var(--accent-emerald)' }}>Telemetry: nominal</div>
            </div>
          </div>

          <div style={{ marginTop: 6, color: 'var(--accent-amber)', minHeight: 110 }}>
            {loading && <div style={{ opacity: 0.6 }}>Loading live feed...</div>}
            {!loading && news.length === 0 && <div style={{ opacity: 0.6 }}>No news available</div>}
            {!loading && news.length > 0 && (
              <div style={{ fontFamily: 'ui-monospace, monospace', lineHeight: 1.4, whiteSpace: 'pre-wrap' }}>
                {news.slice(0, 4).map((n, idx) => (
                  <div key={idx} style={{ marginBottom: 6 }}>
                    <strong style={{ color: 'var(--accent-cyan)' }}>{idx + 1}. </strong>
                    <span style={{ color: 'var(--accent-amber)' }}>{n.headline}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div style={{ marginTop: 10 }}>
            <div className="ticker-wrap">
              <div className="ticker-line">
                <div className="ticker-scroll">{tickerText || ' — no feed — '}</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
