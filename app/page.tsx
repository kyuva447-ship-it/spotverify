export default function HomePage() {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif', padding: '1.5rem' }}>
      <div style={{ textAlign: 'center', padding: '2rem', border: '1px solid #1e293b', borderRadius: '1rem', backgroundColor: '#0f172a', maxWidth: '480px', width: '100%', boxSizing: 'border-box' }}>
        <h1 style={{ fontSize: '1.8rem', marginBottom: '0.5rem', color: '#fff' }}>Spotverify Enterprise</h1>
        <p style={{ color: '#94a3b8', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
          Collateral Audit & Anti-Spoofing Hub
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <a href="/login" style={{ padding: '0.75rem', backgroundColor: '#2563eb', color: '#fff', textDecoration: 'none', borderRadius: '0.5rem', fontWeight: 'bold', fontSize: '0.9rem' }}>
            Login & Account Portal
          </a>
          <a href="/audit" style={{ padding: '0.75rem', backgroundColor: '#0284c7', color: '#fff', textDecoration: 'none', borderRadius: '0.5rem', fontWeight: 'bold', fontSize: '0.9rem' }}>
            Field Audit & GPS Engine
          </a>
          <a href="/checkout" style={{ padding: '0.75rem', backgroundColor: '#059669', color: '#fff', textDecoration: 'none', borderRadius: '0.5rem', fontWeight: 'bold', fontSize: '0.9rem' }}>
            Audit Settlement Checkout
          </a>
        </div>
      </div>
    </main>
  );
}
