'use client';
import { useState } from 'react';

export default function AuditPage() {
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [hash, setHash] = useState('');
  const [status, setStatus] = useState('');

  const captureGPS = () => {
    if (!navigator.geolocation) return setStatus('Geolocation is not supported by your browser.');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setStatus('GPS Location Captured!');
      },
      () => setStatus('GPS Permission Denied.')
    );
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setStatus('Calculating SHA-256 image hash...');
    const arrayBuffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hexHash = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
    
    setHash(hexHash);
    setStatus('Photo processed with SHA-256 security hash.');
  };

  return (
    <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '450px', width: '100%', backgroundColor: '#0f172a', border: '1px solid #1e293b', padding: '2rem', borderRadius: '1rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#fff' }}>Field Audit Engine</h2>

        <div style={{ marginBottom: '1.5rem' }}>
          <button onClick={captureGPS} style={{ width: '100%', padding: '0.75rem', backgroundColor: '#1e293b', color: '#fff', border: '1px solid #334155', borderRadius: '0.5rem', cursor: 'pointer' }}>
            Capture Live GPS Coordinates
          </button>
          {coords && (
            <p style={{ fontSize: '0.8rem', color: '#34d399', textAlign: 'center', marginTop: '0.5rem' }}>
              Lat: {coords.lat.toFixed(6)}, Lng: {coords.lng.toFixed(6)}
            </p>
          )}
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.5rem' }}>Upload Site Inspection Photo</label>
          <input type="file" accept="image/*" onChange={handleFileUpload} style={{ color: '#94a3b8', fontSize: '0.85rem' }} />
        </div>

        {hash && (
          <div style={{ padding: '0.75rem', backgroundColor: '#020617', borderRadius: '0.5rem', border: '1px solid #1e293b', wordBreak: 'break-all' }}>
            <p style={{ fontSize: '0.65rem', color: '#64748b', textTransform: 'uppercase', margin: 0 }}>SHA-256 Anti-Spoof Hash</p>
            <p style={{ fontSize: '0.75rem', fontFamily: 'monospace', color: '#38bdf8', margin: '0.25rem 0 0 0' }}>{hash}</p>
          </div>
        )}

        {status && <p style={{ fontSize: '0.8rem', color: '#94a3b8', textAlign: 'center', marginTop: '1rem' }}>{status}</p>}
      </div>
    </main>
  );
}
