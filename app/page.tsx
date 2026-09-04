'use client';

import React, { useState } from 'react';
import Link from 'next/link';

type ThemeKey = 'emerald' | 'violet' | 'amber' | 'cyan';

const themes = {
  emerald: {
    name: 'Cyber Emerald',
    primary: '#10b981',
    secondary: '#06b6d4',
    accent: '#34d399',
    background: '#050811',
    cardBg: '#0f172a',
    border: '#1e293b',
    glow: 'rgba(16, 185, 129, 0.35)',
    btnText: '#041d14'
  },
  violet: {
    name: 'Neon Violet',
    primary: '#a855f7',
    secondary: '#ec4899',
    accent: '#f472b6',
    background: '#090514',
    cardBg: '#140c24',
    border: '#2a1a45',
    glow: 'rgba(168, 85, 247, 0.35)',
    btnText: '#ffffff'
  },
  amber: {
    name: 'Sunset Amber',
    primary: '#f59e0b',
    secondary: '#ef4444',
    accent: '#fbbf24',
    background: '#0d0803',
    cardBg: '#1c1006',
    border: '#38200d',
    glow: 'rgba(245, 158, 11, 0.35)',
    btnText: '#0d0803'
  },
  cyan: {
    name: 'Ocean Cyan',
    primary: '#06b6d4',
    secondary: '#3b82f6',
    accent: '#38bdf8',
    background: '#030a14',
    cardBg: '#081426',
    border: '#102747',
    glow: 'rgba(6, 182, 212, 0.35)',
    btnText: '#030a14'
  }
};

const faqs = [
  {
    q: 'How does Spotverify block mock location / GPS spoofing apps?',
    a: 'Spotverify bypasses high-level OS location providers and queries low-level hardware sensor data, fused with cell tower trilateration and network latency telemetry to reject mock locations and VPN overlays instantly.'
  },
  {
    q: 'What makes the SHA-256 photo cryptographic seal tamper-proof?',
    a: 'When an auditor snaps a photo, the image data, exact Unix timestamp, device serial, and GPS coordinates are hashed locally into an immutable 256-bit cryptographic signature before upload.'
  },
  {
    q: 'Can auditors operate in offline mode without cellular connection?',
    a: 'Yes. Field audits taken offline are hardware-signed and cached locally in encrypted device storage. Once connectivity is restored, cryptographic proofs are synced and validated on the backend.'
  },
  {
    q: 'How does automated payout settlement work?',
    a: 'Once an audit passes hardware verification, Spotverify triggers a webhook payload to your bank API or payout gateway, settling auditor compensation in real time.'
  }
];

export default function Home() {
  const [currentTheme, setCurrentTheme] = useState<ThemeKey>('emerald');
  const t = themes[currentTheme];

  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simStep, setSimStep] = useState<number>(0);

  const [auditorCount, setAuditorCount] = useState<number>(35);
  const [auditsPerAuditor, setAuditsPerAuditor] = useState<number>(40);

  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');

  const totalAudits = auditorCount * auditsPerAuditor;
  const monthlySavings = totalAudits * 180;
  const annualSavings = billingCycle === 'yearly' ? monthlySavings * 12 * 1.15 : monthlySavings * 12;

  const runSimulation = () => {
    setIsSimulating(true);
    setSimStep(1);
    setTimeout(() => setSimStep(2), 700);
    setTimeout(() => setSimStep(3), 1400);
    setTimeout(() => setIsSimulating(false), 2000);
  };

  return (
    <div style={{ backgroundColor: t.background, color: '#f8fafc', minHeight: '100vh', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', transition: 'background-color 0.4s ease' }}>
      
      {/* 1. ANNOUNCEMENT BANNER */}
      <div style={{ background: `linear-gradient(90deg, ${t.primary}, ${t.secondary})`, padding: '8px 16px', textAlign: 'center', fontSize: '13px', fontWeight: 800, color: t.btnText }}>
        ✨ SPOTVERIFY 2.0: Dynamic Multi-Theme Engine &amp; Hardware SHA-256 Verification Live!
      </div>

      {/* 2. NAVIGATION BAR */}
      <header style={{ position: 'sticky', top: 0, zIndex: 100, backgroundColor: `${t.background}ee`, backdropFilter: 'blur(16px)', borderBottom: `1px solid ${t.border}`, padding: '14px 20px' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '14px', background: `linear-gradient(135deg, ${t.primary}, ${t.secondary})`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 0 20px ${t.glow}`, transition: 'all 0.4s ease' }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="M9 12l2 2 4-4" />
              </svg>
            </div>
            <div>
              <div style={{ fontSize: '22px', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.5px', lineHeight: '1.1' }}>
                Spotverify
              </div>
              <div style={{ fontSize: '10px', color: t.primary, fontWeight: 800, letterSpacing: '1px' }}>
                ZERO-TRUST VERIFICATION
              </div>
            </div>
          </Link>

          {/* DYNAMIC COLOR THEME SWITCHER */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.05)', padding: '6px 14px', borderRadius: '30px', border: `1px solid ${t.border}` }}>
            <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 800 }}>THEME:</span>
            {(Object.keys(themes) as ThemeKey[]).map((key) => (
              <button
                key={key}
                onClick={() => setCurrentTheme(key)}
                style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  background: themes[key].primary,
                  border: currentTheme === key ? '2px solid #ffffff' : 'none',
                  cursor: 'pointer',
                  boxShadow: currentTheme === key ? `0 0 12px ${themes[key].primary}` : 'none',
                  transition: 'transform 0.2s'
                }}
                title={themes[key].name}
              />
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Link href="/login" style={{ padding: '10px 18px', borderRadius: '10px', fontSize: '13px', color: '#f8fafc', textDecoration: 'none', fontWeight: 700, border: `1px solid ${t.border}`, background: t.cardBg }}>
              Sign In
            </Link>
            <Link href="/audit" style={{ padding: '10px 20px', borderRadius: '10px', fontSize: '13px', color: t.btnText, textDecoration: 'none', fontWeight: 900, background: `linear-gradient(135deg, ${t.primary}, ${t.secondary})`, boxShadow: `0 4px 20px ${t.glow}` }}>
              Launch Engine
            </Link>
          </div>

        </div>
      </header>

      {/* 3. HERO SECTION */}
      <section style={{ maxWidth: '1240px', margin: '0 auto', padding: '70px 20px 50px', textAlign: 'center' }}>
        
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '8px 20px', borderRadius: '30px', background: 'rgba(255,255,255,0.05)', border: `1px solid ${t.border}`, marginBottom: '28px' }}>
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: t.primary, boxShadow: `0 0 10px ${t.primary}` }}></span>
          <span style={{ fontSize: '13px', color: t.accent, fontWeight: 800 }}>
            🛡️ ACTIVE PROTECTION: {t.name.toUpperCase()} MODE
          </span>
        </div>

        <h1 style={{ fontSize: '50px', fontWeight: 900, lineHeight: '1.15', color: '#ffffff', maxWidth: '960px', margin: '0 auto 24px', letterSpacing: '-1px' }}>
          Stop Field Inspection Fraud with <span style={{ background: `linear-gradient(135deg, ${t.primary}, ${t.secondary})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Hardware-Verified</span> Trust
        </h1>

        <p style={{ fontSize: '18px', color: '#94a3b8', maxWidth: '780px', margin: '0 auto 36px', lineHeight: '1.6' }}>
          Spotverify locks every field audit with hardware GPS checks, SHA-256 photo cryptographic seals, and automated payout settlements.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap', marginBottom: '60px' }}>
          <Link href="/audit" style={{ padding: '18px 36px', borderRadius: '12px', background: `linear-gradient(135deg, ${t.primary}, ${t.secondary})`, color: t.btnText, fontWeight: 900, fontSize: '16px', textDecoration: 'none', boxShadow: `0 10px 35px ${t.glow}` }}>
            Start Live Audit
          </Link>
          <a href="#roi" style={{ padding: '18px 32px', borderRadius: '12px', background: t.cardBg, border: `1px solid ${t.border}`, color: '#ffffff', fontWeight: 800, fontSize: '16px', textDecoration: 'none' }}>
            Calculate ROI
          </a>
        </div>

        {/* DASHBOARD DISPLAY CARD */}
        <div style={{ background: t.cardBg, border: `1px solid ${t.border}`, borderRadius: '24px', padding: '28px', maxWidth: '1000px', margin: '0 auto', boxShadow: `0 30px 80px rgba(0,0,0,0.8)`, textAlign: 'left' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: `1px solid ${t.border}`, paddingBottom: '18px', marginBottom: '22px', flexWrap: 'wrap', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#f43f5e', display: 'inline-block' }}></span>
              <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#eab308', display: 'inline-block' }}></span>
              <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: t.primary, display: 'inline-block' }}></span>
              <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 700, marginLeft: '12px' }}>LIVE VERIFICATION FEED • AUDIT #9982-BLR</span>
            </div>
            <span style={{ fontSize: '11px', background: 'rgba(255,255,255,0.08)', color: t.accent, padding: '5px 14px', borderRadius: '20px', fontWeight: 800, border: `1px solid ${t.border}` }}>
              ● REAL-TIME ACTIVE
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '20px', borderRadius: '16px', borderLeft: `6px solid ${t.primary}` }}>
              <div style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 800 }}>Hardware GPS Lock</div>
              <div style={{ fontSize: '17px', fontWeight: 900, color: t.accent, marginTop: '6px' }}>✓ GENUINE (NO MOCK)</div>
              <div style={{ fontSize: '12px', color: '#cbd5e1', marginTop: '6px' }}>📍 GB Palya, Bengaluru</div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '20px', borderRadius: '16px', borderLeft: `6px solid ${t.secondary}` }}>
              <div style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 800 }}>Cryptographic Photo Seal</div>
              <div style={{ fontSize: '17px', fontWeight: 900, color: t.secondary, marginTop: '6px' }}>🔒 SHA-256 SEALED</div>
              <div style={{ fontSize: '12px', color: '#cbd5e1', marginTop: '6px' }}>Hash: 7f8a92...b412e8</div>
            </div>
          </div>

        </div>

      </section>

      {/* 4. SOCIAL PROOF / CLIENT TRUST BAR */}
      <section style={{ maxWidth: '1240px', margin: '40px auto 0', padding: '0 20px', textAlign: 'center' }}>
        <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '24px' }}>
          TRUSTED BY 500+ FIELD OPERATIONS &amp; AUDIT LEADERS ACROSS INDIA
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '40px', flexWrap: 'wrap', opacity: 0.6 }}>
          <span style={{ fontSize: '18px', fontWeight: 900, color: '#94a3b8', letterSpacing: '1px' }}>LOGI-SECURE</span>
          <span style={{ fontSize: '18px', fontWeight: 900, color: '#94a3b8', letterSpacing: '1px' }}>FIN-CHECK</span>
          <span style={{ fontSize: '18px', fontWeight 900, color: '#94a3b8', letterSpacing: '1px' }}>HYDERABAD TRANS</span>
          <span style={{ fontSize: '18px', fontWeight: 900, color: '#94a3b8', letterSpacing: '1px' }}>APEX VERIFY</span>
          <span style={{ fontSize: '18px', fontWeight: 900, color: '#94a3b8', letterSpacing: '1px' }}>BLR AUDITS</span>
        </div>
      </section>

      {/* 5. FEATURE PILLARS GRID */}
      <section style={{ maxWidth: '1240px', margin: '80px auto 0', padding: '0 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span style={{ color: t.primary, fontSize: '12px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1.5px' }}>ZERO-TRUST INFRASTRUCTURE</span>
          <h2 style={{ fontSize: '32px', fontWeight: 900, color: '#ffffff', marginTop: '8px' }}>Engineered for Total Verification Integrity</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
          
          <div style={{ background: t.cardBg, border: `1px solid ${t.border}`, borderRadius: '20px', padding: '28px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: `${t.primary}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: t.primary, fontSize: '20px', marginBottom: '20px' }}>
              📍
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#ffffff', marginBottom: '10px' }}>Hardware GPS Lock</h3>
            <p style={{ fontSize: '14px', color: '#94a3b8', lineHeight: '1.6' }}>Direct hardware querying shuts down GPS spoofer apps, simulated developer locations, and mock overlays instantly.</p>
          </div>

          <div style={{ background: t.cardBg, border: `1px solid ${t.border}`, borderRadius: '20px', padding: '28px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: `${t.secondary}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: t.secondary, fontSize: '20px', marginBottom: '20px' }}>
              🔒
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#ffffff', marginBottom: '10px' }}>SHA-256 Photo Seal</h3>
            <p style={{ fontSize: '14px', color: '#94a3b8', lineHeight: '1.6' }}>Every photo captured is stamped with a cryptographic hash, timestamp, and metadata payload before leaving the camera device.</p>
          </div>

          <div style={{ background: t.cardBg, border: `1px solid ${t.border}`, borderRadius: '20px', padding: '28px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: `${t.accent}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: t.accent, fontSize: '20px', marginBottom: '20px' }}>
              ⚡
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#ffffff', marginBottom: '10px' }}>Automated Payouts</h3>
            <p style={{ fontSize: '14px', color: '#94a3b8', lineHeight: '1.6' }}>Connect field payouts directly to verified audit passes. Zero manual cross-checking or reimbursement disputes.</p>
          </div>

          <div style={{ background: t.cardBg, border: `1px solid ${t.border}`, borderRadius: '20px', padding: '28px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: `${t.primary}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: t.primary, fontSize: '20px', marginBottom: '20px' }}>
              🌐
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#ffffff', marginBottom: '10px' }}>Offline Proof Sync</h3>
            <p style={{ fontSize: '14px', color: '#94a3b8', lineHeight: '1.6' }}>Auditors can collect cryptographic evidence offline in zero-connectivity areas and securely sync upon re-establishing connection.</p>
          </div>

        </div>
      </section>

      {/* 6. INTERACTIVE SIMULATOR */}
      <section id="demo" style={{ maxWidth: '900px', margin: '80px auto 0', padding: '0 20px' }}>
        <div style={{ background: t.cardBg, border: `1px solid ${t.border}`, borderRadius: '28px', padding: '40px' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <span style={{ color: t.primary, fontSize: '12px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1.5px' }}>INTERACTIVE DEMO</span>
            <h2 style={{ fontSize: '30px', fontWeight: 900, color: '#ffffff', marginTop: '6px' }}>Test the Verification Engine</h2>
          </div>

          <button 
            onClick={runSimulation}
            disabled={isSimulating}
            style={{ width: '100%', padding: '18px', borderRadius: '14px', background: `linear-gradient(135deg, ${t.primary}, ${t.secondary})`, color: t.btnText, fontWeight: 900, fontSize: '17px', border: 'none', cursor: 'pointer', boxShadow: `0 8px 25px ${t.glow}` }}
          >
            {isSimulating ? '⌛ Running Hardware Diagnostics...' : '⚡ Run Simulated Field Check-In'}
          </button>

          {simStep > 0 && (
            <div style={{ marginTop: '24px', padding: '24px', background: 'rgba(0,0,0,0.4)', border: `1px solid ${t.border}`, borderRadius: '16px', fontFamily: 'monospace', fontSize: '13px', lineHeight: '1.9' }}>
              <div style={{ color: simStep >= 1 ? t.accent : '#64748b' }}>
                [STEP 1]: Fetching Native GPS... {simStep >= 1 ? '✓ PASSED (Accuracy 1.8m)' : '...'}
              </div>
              <div style={{ color: simStep >= 2 ? t.secondary : '#64748b' }}>
                [STEP 2]: Computing Photo SHA-256 Hash... {simStep >= 2 ? '✓ SEALED' : '...'}
              </div>
              <div style={{ color: simStep >= 3 ? t.primary : '#64748b' }}>
                [STEP 3]: Payout Authorization... {simStep >= 3 ? '✓ APPROVED' : '...'}
              </div>
            </div>
          )}

        </div>
      </section>

      {/* 7. ROI CALCULATOR */}
      <section id="roi" style={{ maxWidth: '950px', margin: '80px auto 0', padding: '0 20px' }}>
        <div style={{ background: t.cardBg, border: `1px solid ${t.border}`, borderRadius: '28px', padding: '40px' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <span style={{ color: t.secondary, fontSize: '12px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1.5px' }}>ROI CALCULATOR</span>
            <h2 style={{ fontSize: '30px', fontWeight: 900, color: '#ffffff', marginTop: '6px' }}>See Your Estimated Fraud Reduction</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div>
                <div style={{ fontSize: '14px', color: '#cbd5e1', display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <span>Auditors:</span>
                  <strong style={{ color: t.primary }}>{auditorCount} Auditors</strong>
                </div>
                <input type="range" min="5" max="300" value={auditorCount} onChange={(e) => setAuditorCount(Number(e.target.value))} style={{ width: '100%', accentColor: t.primary }} />
              </div>

              <div>
                <div style={{ fontSize: '14px', color: '#cbd5e1', display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <span>Monthly Audits per Auditor:</span>
                  <strong style={{ color: t.primary }}>{auditsPerAuditor} Audits</strong>
                </div>
                <input type="range" min="10" max="120" value={auditsPerAuditor} onChange={(e) => setAuditsPerAuditor(Number(e.target.value))} style={{ width: '100%', accentColor: t.primary }} />
              </div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '28px', borderRadius: '20px', textAlign: 'center', border: `1px solid ${t.border}` }}>
              <div style={{ fontSize: '13px', color: '#94a3b8' }}>Annual Fraud Savings</div>
              <div style={{ fontSize: '42px', fontWeight: 900, color: t.accent, margin: '12px 0' }}>
                ₹{annualSavings.toLocaleString('en-IN')}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 8. PRICING PLANS */}
      <section style={{ maxWidth: '1100px', margin: '80px auto 0', padding: '0 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <span style={{ color: t.accent, fontSize: '12px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1.5px' }}>TRANSPARENT PRICING</span>
          <h2 style={{ fontSize: '32px', fontWeight: 900, color: '#ffffff', marginTop: '6px' }}>Scalable Plans for Any Audit Fleet</h2>
          
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.05)', padding: '6px 16px', borderRadius: '30px', border: `1px solid ${t.border}`, marginTop: '20px' }}>
            <button onClick={() => setBillingCycle('monthly')} style={{ background: billingCycle === 'monthly' ? t.primary : 'transparent', color: billingCycle === 'monthly' ? t.btnText : '#94a3b8', border: 'none', padding: '6px 14px', borderRadius: '20px', fontWeight: 800, cursor: 'pointer', fontSize: '12px' }}>Monthly</button>
            <button onClick={() => setBillingCycle('yearly')} style={{ background: billingCycle === 'yearly' ? t.primary : 'transparent', color: billingCycle === 'yearly' ? t.btnText : '#94a3b8', border: 'none', padding: '6px 14px', borderRadius: '20px', fontWeight: 800, cursor: 'pointer', fontSize: '12px' }}>Yearly (Save 15%)</button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          
          {/* Starter */}
          <div style={{ background: t.cardBg, border: `1px solid ${t.border}`, borderRadius: '24px', padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: '18px', fontWeight: 800, color: '#ffffff' }}>Starter</div>
              <div style={{ fontSize: '13px', color: '#94a3b8', marginTop: '4px' }}>For small local inspection teams</div>
              <div style={{ fontSize: '36px', fontWeight: 900, color: '#ffffff', margin: '20px 0' }}>
                ₹{billingCycle === 'yearly' ? '2,999' : '3,499'}<span style={{ fontSize: '14px', color: '#64748b' }}>/mo</span>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '14px', color: '#cbd5e1', lineHeight: '2.2' }}>
                <li>✓ Up to 10 Auditors</li>
                <li>✓ Hardware GPS Verification</li>
                <li>✓ SHA-256 Photo Sealing</li>
                <li>✓ Web Console Access</li>
              </ul>
            </div>
            <Link href="/audit" style={{ width: '100%', padding: '12px', borderRadius: '10px', background: 'rgba(255,255,255,0.08)', color: '#ffffff', textAlign: 'center', textDecoration: 'none', fontWeight: 800, marginTop: '28px', border: `1px solid ${t.border}`, display: 'block' }}>Start Free Trial</Link>
          </div>

          {/* Growth */}
          <div style={{ background: t.cardBg, border: `2px solid ${t.primary}`, borderRadius: '24px', padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: `0 0 30px ${t.glow}`, position: 'relative' }}>
            <span style={{ position: 'absolute', top: '-12px', right: '24px', background: t.primary, color: t.btnText, fontSize: '10px', fontWeight: 900, padding: '4px 12px', borderRadius: '12px', textTransform: 'uppercase' }}>MOST POPULAR</span>
            <div>
              <div style={{ fontSize: '18px', fontWeight: 800, color: '#ffffff' }}>Growth Engine</div>
              <div style={{ fontSize: '13px', color: '#94a3b8', marginTop: '4px' }}>For expanding logistics &amp; field fleets</div>
              <div style={{ fontSize: '36px', fontWeight: 900, color: t.primary, margin: '20px 0' }}>
                ₹{billingCycle === 'yearly' ? '7,999' : '8,999'}<span style={{ fontSize: '14px', color: '#64748b' }}>/mo</span>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '14px', color: '#cbd5e1', lineHeight: '2.2' }}>
                <li>✓ Up to 50 Auditors</li>
                <li>✓ Priority Hardware Anti-Spoofing</li>
                <li>✓ Automated Bank Payout Hooks</li>
                <li>✓ Offline Proof Vault Sync</li>
                <li>✓ Dedicated Slack Support</li>
              </ul>
            </div>
            <Link href="/audit" style={{ width: '100%', padding: '12px', borderRadius: '10px', background: `linear-gradient(135deg, ${t.primary}, ${t.secondary})`, color: t.btnText, textAlign: 'center', textDecoration: 'none', fontWeight: 900, marginTop: '28px', display: 'block' }}>Get Started</Link>
          </div>

          {/* Enterprise */}
          <div style={{ background: t.cardBg, border: `1px solid ${t.border}`, borderRadius: '24px', padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: '18px', fontWeight: 800, color: '#ffffff' }}>Enterprise</div>
              <div style={{ fontSize: '13px', color: '#94a3b8', marginTop: '4px' }}>Custom multi-region operations</div>
              <div style={{ fontSize: '36px', fontWeight: 900, color: '#ffffff', margin: '20px 0' }}>
                Custom
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '14px', color: '#cbd5e1', lineHeight: '2.2' }}>
                <li>✓ Unlimited Auditor Seats</li>
                <li>✓ Custom API &amp; Webhook Pipelines</li>
                <li>✓ On-Premise Hash Verification</li>
                <li>✓ SLA &amp; Dedicated Account Manager</li>
              </ul>
            </div>
            <Link href="/login" style={{ width: '100%', padding: '12px', borderRadius: '10px', background: 'rgba(255,255,255,0.08)', color: '#ffffff', textAlign: 'center', textDecoration: 'none', fontWeight: 800, marginTop: '28px', border: `1px solid ${t.border}`, display: 'block' }}>Contact Sales</Link>
          </div>

        </div>
      </section>

      {/* 9. FAQ ACCORDION */}
      <section style={{ maxWidth: '850px', margin: '80px auto 0', padding: '0 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span style={{ color: t.primary, fontSize: '12px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1.5px' }}>FREQUENTLY ASKED QUESTIONS</span>
          <h2 style={{ fontSize: '30px', fontWeight: 900, color: '#ffffff', marginTop: '6px' }}>Everything You Need to Know</h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              onClick={() => setOpenFaq(openFaq === index ? null : index)}
              style={{ background: t.cardBg, border: `1px solid ${t.border}`, borderRadius: '16px', padding: '20px 24px', cursor: 'pointer', transition: 'all 0.3s ease' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '16px', fontWeight: 800, color: '#ffffff' }}>
                <span>{faq.q}</span>
                <span style={{ fontSize: '20px', color: t.primary }}>{openFaq === index ? '−' : '+'}</span>
              </div>
              {openFaq === index && (
                <div style={{ marginTop: '14px', fontSize: '14px', color: '#94a3b8', lineHeight: '1.6', borderTop: `1px solid ${t.border}`, paddingTop: '12px' }}>
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 10. FINAL CTA BANNER */}
      <section style={{ maxWidth: '1000px', margin: '90px auto 0', padding: '0 20px' }}>
        <div style={{ background: `linear-gradient(135deg, ${t.cardBg}, ${t.background})`, border: `1px solid ${t.primary}`, borderRadius: '28px', padding: '50px 30px', textAlign: 'center', boxShadow: `0 0 50px ${t.glow}` }}>
          <h2 style={{ fontSize: '34px', fontWeight: 900, color: '#ffffff', marginBottom: '14px' }}>Ready to Eliminate Field Audit Fraud?</h2>
          <p style={{ fontSize: '16px', color: '#94a3b8', maxWidth: '600px', margin: '0 auto 28px' }}>Join leading field operations across India enforcing zero-trust hardware verification today.</p>
          <Link href="/audit" style={{ padding: '16px 36px', borderRadius: '12px', background: `linear-gradient(135deg, ${t.primary}, ${t.secondary})`, color: t.btnText, fontWeight: 900, fontSize: '16px', textDecoration: 'none', display: 'inline-block', boxShadow: `0 10px 30px ${t.glow}` }}>
            Launch Live Engine Now
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: `1px solid ${t.border}`, marginTop: '100px', padding: '40px 20px', background: 'rgba(0,0,0,0.5)', textAlign: 'center', fontSize: '13px', color: '#64748b' }}>
        <div>Spotverify Enterprise • 58, 7th Main Road, GB Palya, Bengaluru, Karnataka, India</div>
      </footer>

    </div>
  );
}
