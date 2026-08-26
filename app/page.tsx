export default function HomePage() {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif' }}>
      <div style={{ textAlign: 'center', padding: '2rem', border: '1px solid #1e293b', borderRadius: '1rem', backgroundColor: '#0f172a', maxWidth: '500px' }}>
        <h1 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#fff' }}>Spotverify Enterprise</h1>
        <p style={{ color: '#94a3b8', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
          Collateral Audit & Anti-Spoofing Hub
        </p>
        <div style={{ padding: '0.75rem', backgroundColor: '#020617', borderRadius: '0.5rem', color: '#38bdf8', fontSize: '0.85rem' }}>
          Vercel Build Active & Connected
        </div>
      </div>
    </main>
  );
}
