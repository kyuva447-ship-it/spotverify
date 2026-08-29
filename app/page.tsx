'use client';

import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function AuditPage() {
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [photoHash, setPhotoHash] = useState<string>('');
  const [auditorId, setAuditorId] = useState<string>('AUDITOR-001');
  const [status, setStatus] = useState<string>('VERIFIED');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  const captureLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      });
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const buffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
    setPhotoHash(hashHex);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      const { error } = await supabase.from('audits').insert([
        {
          auditor_id: auditorId,
          latitude: latitude,
          longitude: longitude,
          photo_sha256: photoHash,
          status: status,
        },
      ]);

      if (error) {
        setMessage(`Error: ${error.message}`);
      } else {
        setMessage('✅ Audit log submitted successfully to Supabase!');
      }
    } catch (err: any) {
      setMessage(`Submission failed: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#0b132b', color: '#fff', fontFamily: 'sans-serif', padding: '1.5rem' }}>
      <div style={{ border: '1px solid #1e293b', padding: '2rem', borderRadius: '1rem', backgroundColor: '#1c2541', maxWidth: '500px', width: '100%', boxSizing: 'border-box' }}>
        <h1 style={{ fontSize: '1.5rem', marginBottom: '1rem', textAlign: 'center' }}>Field Audit Engine</h1>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.25rem' }}>Auditor ID</label>
            <input
              type="text"
              value={auditorId}
              onChange={(e) => setAuditorId(e.target.value)}
              style={{ width: '100%', padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid #334155', backgroundColor: '#0f172a', color: '#fff', boxSizing: 'border-box' }}
            />
          </div>

          <button
            type="button"
            onClick={captureLocation}
            style={{ padding: '0.65rem', backgroundColor: '#2563eb', color: '#fff', border: 'none', borderRadius: '0.375rem', fontWeight: 'bold', cursor: 'pointer' }}
          >
            Capture Live GPS Coordinates
          </button>

          {latitude && longitude && (
            <p style={{ color: '#4ade80', fontSize: '0.85rem', margin: 0, textAlign: 'center' }}>
              Lat: {latitude}, Lng: {longitude}
            </p>
          )}

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.25rem' }}>Upload Site Inspection Photo</label>
            <input type="file" accept="image/*" onChange={handleFileChange} style={{ width: '100%', color: '#94a3b8' }} />
          </div>

          {photoHash && (
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8' }}>SHA-256 Anti-Spoof Hash</label>
              <p style={{ fontSize: '0.75rem', wordBreak: 'break-all', backgroundColor: '#0f172a', padding: '0.5rem', borderRadius: '0.25rem', color: '#38bdf8', margin: 0 }}>{photoHash}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting || !latitude || !photoHash}
            style={{
              marginTop: '1rem',
              padding: '0.85rem',
              backgroundColor: !latitude || !photoHash ? '#475569' : '#16a34a',
              color: '#fff',
              border: 'none',
              borderRadius: '0.5rem',
              fontWeight: 'bold',
              fontSize: '1rem',
              cursor: !latitude || !photoHash ? 'not-allowed' : 'pointer',
            }}
          >
            {isSubmitting ? 'Saving to Supabase...' : 'Submit Audit Log'}
          </button>
        </form>

        {message && (
          <p style={{ marginTop: '1rem', textAlign: 'center', fontSize: '0.9rem', color: message.includes('Error') ? '#f87171' : '#4ade80' }}>
            {message}
          </p>
        )}
      </div>
    </main>
  );
}
