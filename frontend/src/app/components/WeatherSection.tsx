'use client';

import { useState, useEffect } from 'react';

interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

export default function WeatherSection() {
  const [data, setData] = useState<WeatherForecast[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      // In Aspire, the API is often proxied or available via relative path if configured
      // For now, we attempt a relative fetch. 
      // Note: Next.js dev server might need proxying in next.config.ts if this fails
      const response = await fetch('/api/weatherforecast');
      if (!response.ok) throw new Error('Failed to fetch weather data');
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 700 }}>Local Forecast</h2>
        <button className="primary-btn" onClick={fetchData} disabled={loading}>
          {loading ? 'Updating...' : 'Refresh'}
        </button>
      </div>

      {loading && data.length === 0 ? (
        <div style={{ padding: '2rem', textAlign: 'center', opacity: 0.5 }}>
          Loading atmospheric data...
        </div>
      ) : error ? (
        <div style={{ padding: '2rem', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '12px', border: '1px solid rgba(239, 68, 68, 0.2)', color: '#fca5a5' }}>
          Error: {error}
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
          {data.map((item, idx) => (
            <div key={idx} style={{ 
              padding: '1.5rem', 
              background: 'rgba(255, 255, 255, 0.05)', 
              borderRadius: '20px',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              textAlign: 'center'
            }}>
              <div style={{ color: 'var(--secondary)', fontSize: '0.85rem', marginBottom: '0.5rem', fontWeight: 500 }}>
                {new Date(item.date).toLocaleDateString(undefined, { weekday: 'long' })}
              </div>
              <div style={{ fontSize: '2.5rem', fontWeight: 800, margin: '0.5rem 0', color: 'var(--primary)' }}>
                {item.temperatureC}°
              </div>
              <div style={{ 
                background: 'rgba(56, 189, 248, 0.1)', 
                color: 'var(--primary)', 
                padding: '0.25rem 0.75rem', 
                borderRadius: '99px',
                fontSize: '0.8rem',
                display: 'inline-block',
                fontWeight: 600
              }}>
                {item.summary}
              </div>
              <div style={{ marginTop: '1rem', fontSize: '0.8rem', opacity: 0.6 }}>
                RealFeel: {item.temperatureF}°F
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
