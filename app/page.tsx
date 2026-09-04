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

export default function Home() {
  const [currentTheme, setCurrentTheme] = useState<ThemeKey>('emerald');
  const t = themes[currentTheme];

  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simStep, setSimStep] = useState<number>(0);

  const [auditorCount, setAuditorCount] = useState<number>(35);
  const [auditsPerAuditor, setAuditsPerAuditor] = useState<number>(40);

  const totalAudits = auditorCount * auditsPerAuditor;
  const monthlySavings = totalAudits * 180;
  const annualSavings = monthlySavings * 12 * 1.15;

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
        <div style={{ maxWidth: '1240px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          
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
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: `1px solid ${t.border}`, paddingBottom: '18px', marginBottom: '22px' }}>
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

      {/* 4. INTERACTIVE SIMULATOR */}
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

      {/* 5. ROI CALCULATOR */}
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

      {/* FOOTER */}
      <footer style={{ borderTop: `1px solid ${t.border}`, marginTop: '100px', padding: '40px 20px', background: 'rgba(0,0,0,0.5)', textAlign: 'center', fontSize: '13px', color: '#64748b' }}>
        <div>Spotverify Enterprise • 58, 7th Main Road, GB Palya, Bengaluru, Karnataka, India</div>
      </footer>

    </div>
  );
}
