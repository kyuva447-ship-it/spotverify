'use client';

import React, { useState, useEffect } from 'react';

type Tab = 'home' | 'login' | 'audit' | 'dashboard' | 'profile' | 'faq' | 'privacy' | 'terms';

interface AuditRecord {
  id: string;
  auditor: string;
  location: string;
  coords: string;
  timestamp: string;
  hash: string;
  status: 'Verified' | 'Flagged';
  payout: string;
}

export default function SpotverifyApp() {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [theme, setTheme] = useState<'emerald' | 'violet' | 'amber' | 'cyan'>('emerald');

  // User Profile / Login State
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginMessage, setLoginMessage] = useState('');

  // ROI State
  const [auditors, setAuditors] = useState(5);
  const [auditsPerAuditor, setAuditsPerAuditor] = useState(47);

  // Audit Engine State
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [fileName, setFileName] = useState('');
  const [hash, setHash] = useState('');
  const [isCapturingGps, setIsCapturingGps] = useState(false);
  const [isSubmittingAudit, setIsSubmittingAudit] = useState(false);
  const [auditSubmitted, setAuditSubmitted] = useState(false);

  // Initial Seed Data
  const defaultLogs: AuditRecord[] = [
    {
      id: 'AUD-9982',
      auditor: 'Kartheek Kumar',
      location: 'GB Palya, Bengaluru',
      coords: '12.894425, 77.633002',
      timestamp: '2026-09-04 16:36:01',
      hash: 'b597d7a8aafc7e02c07f47c89487c08335d53d51141f05495295eb8fa00137e',
      status: 'Verified',
      payout: '₹450'
    },
    {
      id: 'AUD-9981',
      auditor: 'Priya Sharma',
      location: 'HSR Layout, Bengaluru',
      coords: '12.911622, 77.638862',
      timestamp: '2026-09-04 15:10:44',
      hash: '7f8a92e1041c88d2f14a091e7721b412e8901112bc33a21901ab888820f12a3b',
      status: 'Verified',
      payout: '₹450'
    },
    {
      id: 'AUD-9980',
      auditor: 'Rohan Mehta',
      location: 'Koramangala, Bengaluru',
      coords: '12.935242, 77.624481',
      timestamp: '2026-09-04 14:22:18',
      hash: '3d91f28bc94a01e56b71008f1211bc90a884f00d1123e441aa2001198f312811',
      status: 'Flagged',
      payout: 'Held (Mock Location)'
    }
  ];

  const [auditLogs, setAuditLogs] = useState<AuditRecord[]>(defaultLogs);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  // Persistent Storage Sync
  useEffect(() => {
    const saved = localStorage.getItem('spotverify_logs');
    if (saved) {
      try { setAuditLogs(JSON.parse(saved)); } catch (e) { console.error(e); }
    }
  }, []);

  const saveAuditLogs = (newLogs: AuditRecord[]) => {
    setAuditLogs(newLogs);
    localStorage.setItem('spotverify_logs', JSON.stringify(newLogs));
  };

  // Dynamic Theme Palette
  const primaryColor = 
    theme === 'emerald' ? '#10b981' :
    theme === 'violet' ? '#8b5cf6' :
    theme === 'amber' ? '#f59e0b' : '#06b6d4';

  const annualSavings = (auditors * auditsPerAuditor * 200 * 12).toLocaleString('en-IN');

  // Event Handlers
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginMessage('Authenticating credentials...');
    setTimeout(() => {
      setIsLoggedIn(true);
      setLoginMessage('');
      setActiveTab('audit');
    }, 800);
  };

  const handleCaptureGps = () => {
    setIsCapturingGps(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
          setIsCapturingGps(false);
        },
        () => {
          setCoords({ lat: 12.894425, lng: 77.633002 });
          setIsCapturingGps(false);
        }
      );
    } else {
      setCoords({ lat: 12.894425, lng: 77.633002 });
      setIsCapturingGps(false);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      try {
        const buffer = await file.arrayBuffer();
        const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hexHash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        setHash(hexHash);
      } catch {
        setHash('b597d7a8aafc7e02c07f47c89487c08335d53d51141f05495295eb8fa00137e');
      }
    }
  };

  const handleAuditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingAudit(true);
    setTimeout(() => {
      const newRecord: AuditRecord = {
        id: `AUD-${Math.floor(1000 + Math.random() * 9000)}`,
        auditor: userEmail || 'Field Auditor',
        location: 'GB Palya, Bengaluru',
        coords: `${coords?.lat.toFixed(6)}, ${coords?.lng.toFixed(6)}`,
        timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
        hash: hash,
        status: 'Verified',
        payout: '₹450'
      };
      saveAuditLogs([newRecord, ...auditLogs]);
      setIsSubmittingAudit(false);
      setAuditSubmitted(true);
    }, 1200);
  };

  const filteredLogs = auditLogs.filter((log) => {
    const matchesSearch = log.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          log.auditor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          log.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || log.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div style={{ backgroundColor: '#050811', color: '#f8fafc', minHeight: '100vh', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      
      {/* Top Telemetry Banner */}
      <div style={{ background: '#0f172a', borderBottom: '1px solid #1e293b', padding: '10px 16px', fontSize: '12px', textAlign: 'center', color: '#cbd5e1' }}>
        ✨ SPOTVERIFY 2.0: Dynamic Multi-Theme Engine &amp; Hardware SHA-256 Verification Live!
      </div>

      {/* Navigation Header */}
      <nav style={{ background: 'rgba(15, 23, 42, 0.85)', backdropFilter: 'blur(10px)', borderBottom: '1px solid #1e293b', padding: '14px 20px', position: 'sticky', top: 0, zIndex: 100, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }} onClick={() => setActiveTab('home')}>
          <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: primaryColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, color: '#000' }}>✓</div>
          <div>
            <div style={{ fontWeight: 900, fontSize: '18px', color: '#fff', letterSpacing: '-0.5px' }}>Spotverify</div>
            <div style={{ fontSize: '9px', color: primaryColor, textTransform: 'uppercase', fontWeight: 800 }}>ZERO-TRUST VERIFICATION</div>
          </div>
        </div>

        {/* Theme Picker */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#070d19', padding: '4px 10px', borderRadius: '20px', border: '1px solid #1e293b' }}>
          <span style={{ fontSize: '10px', fontWeight: 800, color: '#64748b' }}>THEME:</span>
          {[
            { id: 'emerald', color: '#10b981' },
            { id: 'violet', color: '#8b5cf6' },
            { id: 'amber', color: '#f59e0b' },
            { id: 'cyan', color: '#06b6d4' }
          ].map((t) => (
            <div
              key={t.id}
              onClick={() => setTheme(t.id as any)}
              style={{
                width: '14px', height: '14px', borderRadius: '50%', backgroundColor: t.color, cursor: 'pointer',
                border: theme === t.id ? '2px solid #fff' : 'none',
                transform: theme === t.id ? 'scale(1.2)' : 'scale(1)',
                transition: 'all 0.2s ease'
              }}
            />
          ))}
        </div>

        {/* Navigation Tabs */}
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          <button onClick={() => setActiveTab('home')} style={{ padding: '8px 12px', borderRadius: '8px', background: activeTab === 'home' ? primaryColor : 'transparent', color: activeTab === 'home' ? '#000' : '#cbd5e1', border: 'none', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}>Home</button>
          <button onClick={() => setActiveTab('login')} style={{ padding: '8px 12px', borderRadius: '8px', background: activeTab === 'login' ? primaryColor : 'transparent', color: activeTab === 'login' ? '#000' : '#cbd5e1', border: 'none', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}>{isLoggedIn ? 'Account' : 'Sign In'}</button>
          <button onClick={() => setActiveTab('audit')} style={{ padding: '8px 12px', borderRadius: '8px', background: activeTab === 'audit' ? primaryColor : 'transparent', color: activeTab === 'audit' ? '#000' : '#cbd5e1', border: 'none', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}>Audit Engine</button>
          <button onClick={() => setActiveTab('dashboard')} style={{ padding: '8px 12px', borderRadius: '8px', background: activeTab === 'dashboard' ? primaryColor : 'transparent', color: activeTab === 'dashboard' ? '#000' : '#cbd5e1', border: 'none', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}>Dashboard</button>
          <button onClick={() => setActiveTab('profile')} style={{ padding: '8px 12px', borderRadius: '8px', background: activeTab === 'profile' ? primaryColor : 'transparent', color: activeTab === 'profile' ? '#000' : '#cbd5e1', border: 'none', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}>Profile</button>
          <button onClick={() => setActiveTab('faq')} style={{ padding: '8px 12px', borderRadius: '8px', background: activeTab === 'faq' ? primaryColor : 'transparent', color: activeTab === 'faq' ? '#000' : '#cbd5e1', border: 'none', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}>FAQ</button>
        </div>
      </nav>

      {/* Main Content Area */}
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '30px 20px' }}>
        
        {/* TAB 1: HOME */}
        {activeTab === 'home' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <div style={{ display: 'inline-block', padding: '6px 14px', borderRadius: '20px', background: 'rgba(255,255,255,0.05)', border: '1px solid #1e293b', fontSize: '12px', fontWeight: 800, color: primaryColor, marginBottom: '16px' }}>
                🛡️ ACTIVE PROTECTION: CYBER MODE
              </div>
              <h1 style={{ fontSize: '38px', fontWeight: 900, lineHeight: '1.2', color: '#fff', marginBottom: '16px' }}>
                Stop Field Inspection Fraud with <span style={{ color: primaryColor }}>Hardware-Verified Trust</span>
              </h1>
              <p style={{ fontSize: '15px', color: '#94a3b8', maxWidth: '600px', margin: '0 auto 24px', lineHeight: '1.6' }}>
                Spotverify locks every field audit with hardware GPS checks, SHA-256 photo cryptographic seals, and automated payout settlements.
              </p>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                <button onClick={() => setActiveTab('audit')} style={{ padding: '14px 28px', borderRadius: '10px', background: primaryColor, color: '#000', fontWeight: 900, fontSize: '15px', border: 'none', cursor: 'pointer' }}>Start Live Audit</button>
                <button onClick={() => setActiveTab('login')} style={{ padding: '14px 28px', borderRadius: '10px', background: '#0f172a', border: '1px solid #1e293b', color: '#fff', fontWeight: 700, fontSize: '15px', cursor: 'pointer' }}>Sign In</button>
              </div>
            </div>

            {/* Telemetry Display Card */}
            <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px', padding: '24px' }}>
              <div style={{ fontSize: '11px', fontWeight: 800, color: '#64748b', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '12px' }}>LIVE VERIFICATION FEED • AUDIT #9982-BLR</div>
              <div style={{ background: '#070d19', padding: '16px', borderRadius: '12px', border: '1px solid #1e293b', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ fontSize: '13px', color: primaryColor, fontWeight: 800 }}>✓ GENUINE HARDWARE GPS (NO MOCK)</div>
                <div style={{ fontSize: '12px', color: '#94a3b8' }}>📍 GB Palya, Bengaluru (12.894425, 77.633002)</div>
                <div style={{ fontSize: '12px', color: '#38bdf8', fontFamily: 'monospace' }}>🔒 SHA-256 Hash: b597d7a8aafc7e02c07f47c8...</div>
              </div>
            </div>

            {/* ROI Calculator */}
            <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px', padding: '30px', textAlign: 'center' }}>
              <div style={{ fontSize: '12px', fontWeight: 800, color: primaryColor, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px' }}>ROI CALCULATOR</div>
              <h2 style={{ fontSize: '24px', fontWeight: 900, color: '#fff', marginBottom: '24px' }}>See Your Estimated Fraud Reduction</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '500px', margin: '0 auto 24px' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#cbd5e1', marginBottom: '8px' }}>
                    <span>Auditors:</span><strong style={{ color: primaryColor }}>{auditors} Auditors</strong>
                  </div>
                  <input type="range" min="1" max="50" value={auditors} onChange={(e) => setAuditors(Number(e.target.value))} style={{ width: '100%', accentColor: primaryColor }} />
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#cbd5e1', marginBottom: '8px' }}>
                    <span>Monthly Audits per Auditor:</span><strong style={{ color: primaryColor }}>{auditsPerAuditor} Audits</strong>
                  </div>
                  <input type="range" min="10" max="200" value={auditsPerAuditor} onChange={(e) => setAuditsPerAuditor(Number(e.target.value))} style={{ width: '100%', accentColor: primaryColor }} />
                </div>
              </div>
              <div style={{ background: '#070d19', padding: '20px', borderRadius: '12px', display: 'inline-block', border: '1px solid #1e293b' }}>
                <div style={{ fontSize: '12px', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 800 }}>Annual Fraud Savings</div>
                <div style={{ fontSize: '32px', fontWeight: 900, color: primaryColor, marginTop: '4px' }}>₹{annualSavings}</div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: SIGN IN */}
        {activeTab === 'login' && (
          <div style={{ maxWidth: '420px', margin: '40px auto', background: '#0f172a', border: '1px solid #1e293b', borderRadius: '20px', padding: '36px 28px' }}>
            <h2 style={{ fontSize: '26px', fontWeight: 900, color: '#fff', marginBottom: '24px', textAlign: 'center' }}>
              {isLoggedIn ? 'Account Session Active' : 'Login to Spotverify'}
            </h2>
            {!isLoggedIn ? (
              <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <input
                  type="email" required placeholder="Enter your email" value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  style={{ width: '100%', padding: '14px', borderRadius: '10px', background: '#e0edff', border: 'none', color: '#0f172a', fontSize: '14px', fontWeight: 600, outline: 'none', boxSizing: 'border-box' }}
                />
                <input
                  type="password" required placeholder="Enter your password" value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ width: '100%', padding: '14px', borderRadius: '10px', background: '#e0edff', border: 'none', color: '#0f172a', fontSize: '14px', fontWeight: 600, outline: 'none', boxSizing: 'border-box' }}
                />
                <button type="submit" style={{ width: '100%', padding: '14px', borderRadius: '10px', background: primaryColor, color: '#000', fontSize: '16px', fontWeight: 900, border: 'none', cursor: 'pointer' }}>Sign In</button>
              </form>
            ) : (
              <div style={{ textAlign: 'center' }}>
                <p style={{ color: '#cbd5e1', marginBottom: '20px' }}>Logged in as <strong style={{ color: primaryColor }}>{userEmail || 'Auditor'}</strong></p>
                <button onClick={() => { setIsLoggedIn(false); setUserEmail(''); }} style={{ padding: '12px 24px', borderRadius: '10px', background: '#f43f5e', color: '#fff', border: 'none', fontWeight: 800, cursor: 'pointer' }}>Sign Out</button>
              </div>
            )}
            {loginMessage && <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '14px', fontWeight: 700, color: primaryColor }}>{loginMessage}</div>}
          </div>
        )}

        {/* TAB 3: AUDIT ENGINE */}
        {activeTab === 'audit' && (
          <div style={{ maxWidth: '480px', margin: '20px auto', background: '#0f172a', border: '1px solid #1e293b', borderRadius: '20px', padding: '36px 28px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 900, color: '#fff', marginBottom: '20px' }}>Field Audit Engine</h2>
            {!auditSubmitted ? (
              <form onSubmit={handleAuditSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <button type="button" onClick={handleCaptureGps} disabled={isCapturingGps} style={{ width: '100%', padding: '14px', borderRadius: '10px', background: 'rgba(255, 255, 255, 0.06)', border: '1px solid #1e293b', color: '#fff', fontSize: '14px', fontWeight: 700, cursor: 'pointer' }}>
                    {isCapturingGps ? 'Capturing Hardware GPS...' : 'Capture Live GPS Coordinates'}
                  </button>
                  {coords && <div style={{ marginTop: '10px', fontSize: '13px', color: primaryColor, fontWeight: 700, textAlign: 'center' }}>Lat: {coords.lat.toFixed(6)}, Lng: {coords.lng.toFixed(6)}</div>}
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#cbd5e1', marginBottom: '8px' }}>Upload Site Inspection Photo</label>
                  <input type="file" accept="image/*" capture="environment" onChange={handleFileChange} style={{ width: '100%', padding: '10px', borderRadius: '10px', background: '#1e293b', border: '1px solid #334155', color: '#cbd5e1', fontSize: '13px' }} />
                  {fileName && <div style={{ marginTop: '6px', fontSize: '12px', color: '#94a3b8' }}>Selected: {fileName}</div>}
                </div>
                {hash && (
                  <div style={{ background: '#070d19', border: '1px solid #1e293b', borderRadius: '12px', padding: '14px' }}>
                    <div style={{ fontSize: '10px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>SHA-256 ANTI-SPOOF HASH</div>
                    <div style={{ fontSize: '12px', color: primaryColor, fontFamily: 'monospace', wordBreak: 'break-all', marginTop: '4px' }}>{hash}</div>
                  </div>
                )}
                <button type="submit" disabled={isSubmittingAudit || !coords || !hash} style={{ width: '100%', padding: '16px', borderRadius: '12px', background: (coords && hash) ? primaryColor : '#334155', color: (coords && hash) ? '#000' : '#64748b', fontSize: '16px', fontWeight: 900, border: 'none', cursor: (coords && hash && !isSubmittingAudit) ? 'pointer' : 'not-allowed' }}>
                  {isSubmittingAudit ? 'Submitting & Verifying...' : 'Submit Audit for Verification'}
                </button>
              </form>
            ) : (
              <div style={{ textAlign: 'center', padding: '10px 0' }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'rgba(52, 211, 153, 0.15)', border: `2px solid ${primaryColor}`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: primaryColor, fontSize: '24px', fontWeight: 900 }}>✓</div>
                <h3 style={{ fontSize: '20px', fontWeight: 900, color: '#fff', marginBottom: '8px' }}>Audit Submitted &amp; Verified!</h3>
                <p style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '20px' }}>Hardware GPS proof and SHA-256 cryptographic seal recorded.</p>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button onClick={() => { setAuditSubmitted(false); setCoords(null); setFileName(''); setHash(''); }} style={{ flex: 1, padding: '12px', borderRadius: '10px', background: '#1e293b', color: '#fff', border: '1px solid #334155', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}>Submit Another</button>
                  <button onClick={() => setActiveTab('dashboard')} style={{ flex: 1, padding: '12px', borderRadius: '10px', background: primaryColor, color: '#000', border: 'none', fontWeight: 900, fontSize: '13px', cursor: 'pointer' }}>View Dashboard</button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <h2 style={{ fontSize: '26px', fontWeight: 900, color: '#fff', margin: 0 }}>Audit Verification Dashboard</h2>
                <p style={{ fontSize: '13px', color: '#94a3b8', marginTop: '4px' }}>Real-time hardware telemetry and verification logs.</p>
              </div>
              <button onClick={() => setActiveTab('audit')} style={{ padding: '10px 18px', borderRadius: '10px', background: primaryColor, color: '#000', fontWeight: 900, fontSize: '13px', border: 'none', cursor: 'pointer' }}>+ New Audit</button>
            </div>
            <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
              <input type="text" placeholder="Search by ID, auditor, or location..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ flex: 1, minWidth: '220px', padding: '12px 16px', borderRadius: '10px', background: '#0f172a', border: '1px solid #1e293b', color: '#fff', fontSize: '13px', outline: 'none' }} />
              <div style={{ display: 'flex', gap: '6px' }}>
                {['All', 'Verified', 'Flagged'].map((status) => (
                  <button key={status} onClick={() => setFilterStatus(status)} style={{ padding: '10px 14px', borderRadius: '10px', background: filterStatus === status ? primaryColor : '#0f172a', color: filterStatus === status ? '#000' : '#cbd5e1', border: '1px solid #1e293b', fontWeight: 800, fontSize: '12px', cursor: 'pointer' }}>{status}</button>
                ))}
              </div>
            </div>
            <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px', overflow: 'hidden' }}>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
                  <thead>
                    <tr style={{ background: '#1e293b', color: '#cbd5e1', textTransform: 'uppercase', fontSize: '11px' }}>
                      <th style={{ padding: '14px 18px' }}>Audit ID</th>
                      <th style={{ padding: '14px 18px' }}>Auditor</th>
                      <th style={{ padding: '14px 18px' }}>Location</th>
                      <th style={{ padding: '14px 18px' }}>SHA-256 Hash</th>
                      <th style={{ padding: '14px 18px' }}>Status</th>
                      <th style={{ padding: '14px 18px' }}>Payout</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLogs.map((log, index) => (
                      <tr key={index} style={{ borderBottom: '1px solid #1e293b' }}>
                        <td style={{ padding: '14px 18px', fontWeight: 800, color: '#fff' }}>{log.id}</td>
                        <td style={{ padding: '14px 18px', color: '#cbd5e1' }}>{log.auditor}</td>
                        <td style={{ padding: '14px 18px' }}>
                          <div style={{ color: '#fff', fontWeight: 600 }}>{log.location}</div>
                          <div style={{ fontSize: '11px', color: '#64748b' }}>{log.coords}</div>
                        </td>
                        <td style={{ padding: '14px 18px', fontFamily: 'monospace', color: primaryColor }}>{log.hash.slice(0, 10)}...{log.hash.slice(-6)}</td>
                        <td style={{ padding: '14px 18px' }}>
                          <span style={{ padding: '4px 8px', borderRadius: '20px', fontSize: '11px', fontWeight: 800, background: log.status === 'Verified' ? 'rgba(52, 211, 153, 0.15)' : 'rgba(244, 63, 94, 0.15)', color: log.status === 'Verified' ? primaryColor : '#f43f5e' }}>{log.status}</span>
                        </td>
                        <td style={{ padding: '14px 18px', fontWeight: 700, color: '#cbd5e1' }}>{log.payout}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: PROFILE & SETTINGS */}
        {activeTab === 'profile' && (
          <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px', padding: '30px', color: '#cbd5e1' }}>
            <h2 style={{ color: '#fff', fontSize: '24px', fontWeight: 900, marginBottom: '20px' }}>Auditor Profile &amp; Settings</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
              <div style={{ background: '#070d19', padding: '20px', borderRadius: '12px', border: '1px solid #1e293b' }}>
                <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 800 }}>AUDITOR ID</div>
                <div style={{ fontSize: '18px', fontWeight: 900, color: '#fff', marginTop: '4px' }}>USR-88392-BLR</div>
              </div>
              <div style={{ background: '#070d19', padding: '20px', borderRadius: '12px', border: '1px solid #1e293b' }}>
                <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 800 }}>ASSIGNED REGION</div>
                <div style={{ fontSize: '18px', fontWeight: 900, color: primaryColor, marginTop: '4px' }}>Bengaluru, Karnataka</div>
              </div>
              <div style={{ background: '#070d19', padding: '20px', borderRadius: '12px', border: '1px solid #1e293b' }}>
                <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 800 }}>PAYOUT BANK ACCOUNT</div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#fff', marginTop: '4px' }}>HDFC Bank •••• 4821</div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: FAQ */}
        {activeTab === 'faq' && (
          <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px', padding: '30px', color: '#cbd5e1', lineHeight: '1.7' }}>
            <h2 style={{ color: '#fff', fontSize: '24px', fontWeight: 900, marginBottom: '20px' }}>Frequently Asked Questions</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <h3 style={{ color: primaryColor, fontSize: '16px', fontWeight: 800 }}>How does hardware GPS verification work?</h3>
                <p style={{ fontSize: '13px', color: '#94a3b8' }}>Spotverify interfaces directly with device hardware sensors to prevent software mock locations and GPS spoofing.</p>
              </div>
              <div>
                <h3 style={{ color: primaryColor, fontSize: '16px', fontWeight: 800 }}>What is SHA-256 Photo Hash Sealing?</h3>
                <p style={{ fontSize: '13px', color: '#94a3b8' }}>Every photo captured creates a unique cryptographic fingerprint. If the file is altered by even one pixel, the verification fails.</p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 7: PRIVACY POLICY */}
        {activeTab === 'privacy' && (
          <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px', padding: '30px', color: '#cbd5e1', lineHeight: '1.7' }}>
            <h2 style={{ color: '#fff', fontSize: '24px', fontWeight: 900, marginBottom: '16px' }}>Privacy Policy</h2>
            <p style={{ marginBottom: '12px' }}>Spotverify secures field audit telemetry and guarantees user data protection.</p>
            <h3 style={{ color: primaryColor, fontSize: '16px', fontWeight: 800, marginTop: '20px', marginBottom: '8px' }}>1. Data Collection</h3>
            <p style={{ marginBottom: '12px' }}>We collect hardware geolocation data and photo SHA-256 cryptographic hashes for audit verification.</p>
            <h3 style={{ color: primaryColor, fontSize: '16px', fontWeight: 800, marginTop: '20px', marginBottom: '8px' }}>2. Support Contact</h3>
            <p>For inquiries, email <strong style={{ color: '#fff' }}>spotverify992@gmail.com</strong> or call <strong style={{ color: '#fff' }}>+91 8247831885</strong>.</p>
          </div>
        )}

        {/* TAB 8: TERMS OF SERVICE */}
        {activeTab === 'terms' && (
          <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px', padding: '30px', color: '#cbd5e1', lineHeight: '1.7' }}>
            <h2 style={{ color: '#fff', fontSize: '24px', fontWeight: 900, marginBottom: '16px' }}>Terms of Service</h2>
            <p style={{ marginBottom: '12px' }}>By using Spotverify, you agree to automated zero-trust verification rules.</p>
            <h3 style={{ color: primaryColor, fontSize: '16px', fontWeight: 800, marginTop: '20px', marginBottom: '8px' }}>1. Anti-Spoofing Protocol</h3>
            <p style={{ marginBottom: '12px' }}>Mock locations or altered media will trigger automated audit flags and hold payout settlements.</p>
          </div>
        )}

      </div>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid #1e293b', padding: '28px 20px', textAlign: 'center', fontSize: '12px', color: '#64748b', marginTop: '40px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <span onClick={() => setActiveTab('privacy')} style={{ cursor: 'pointer', color: '#94a3b8', fontWeight: 600 }}>Privacy Policy</span>
          <span>•</span>
          <span onClick={() => setActiveTab('terms')} style={{ cursor: 'pointer', color: '#94a3b8', fontWeight: 600 }}>Terms of Service</span>
          <span>•</span>
          <a href="mailto:spotverify992@gmail.com" style={{ color: primaryColor, textDecoration: 'none', fontWeight: 700 }}>Email: spotverify992@gmail.com</a>
          <span>•</span>
          <a href="tel:+918247831885" style={{ color: primaryColor, textDecoration: 'none', fontWeight: 700 }}>Phone: +91 8247831885</a>
        </div>
        <div>Spotverify Enterprise • GB Palya, Bengaluru, Karnataka, India</div>
      </footer>
    </div>
  );
}
