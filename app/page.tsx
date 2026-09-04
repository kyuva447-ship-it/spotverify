'use client';

import React, { useState } from 'react';
import Link from 'next/link';

// Theme Definitions
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
  // Theme State
  const [currentTheme, setCurrentTheme] = useState<ThemeKey>('emerald');
  const t = themes[currentTheme];

  // Simulator State
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simStep, setSimStep] = useState<number>(0);

  // ROI Calculator State
  const [auditorCount, setAuditorCount] = useState<number>(35);
  const [auditsPerAuditor, setAuditsPerAuditor] = useState<number>(40);

  // Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Pricing State
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');

  // ROI Calculations
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

      {/* 2. NAVIGATION BAR WITH THEME SWITCHER */}
      <header style={{ position: 'sticky', top: 0, zIndex: 100, backgroundColor: `${t.background}ee`, backdropFilter: 'blur(16px)', borderBottom: `1px solid ${t.border}`, padding: '14px 20px' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          
          {/* SVG BRAND LOGO */}
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

          {/* CTAs */}
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

        {/* HERO CTA BUTTONS */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap', marginBottom: '60px' }}>
          <Link href="/audit" style={{ padding: '18px 36px', borderRadius: '12px', background: `linear-gradient(135deg, ${t.primary}, ${t.secondary})`, color: t.btnText, fontWeight: 900, fontSize: '16px', textDecoration: 'none', boxShadow: `0 10px 35px ${t.glow}` }}>
            Start Live Audit
          </Link>
          <a href="#roi" style={{ padding: '18px 32px', borderRadius: '12px', background: t.cardBg, border: `1px solid ${t.border}`, color: '#ffffff', fontWeight: 800, fontSize: '16px', textDecoration: 'none' }}>
            Calculate ROI
          </a>
        </div>

        {/* VIBRANT DASHBOARD DISPLAY CARD */}
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
            <h2 style={{ fontSize: '30px', fontWeight 900, color: '#ffffff', marginTop: '6px' }}>See Your Estimated Fraud Reduction</h2>
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
}            <span style={{ fontSize: '11px', background: 'rgba(16, 185, 129, 0.15)', color: '#34d399', padding: '4px 12px', borderRadius: '20px', fontWeight: '700', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
              ● REAL-TIME ACTIVE
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
            
            <div style={{ background: '#1e293b', padding: '16px', borderRadius: '14px', borderLeft: '5px solid #10b981' }}>
              <div style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', fontWeight: '700' }}>Location Status</div>
              <div style={{ fontSize: '16px', fontWeight: '800', color: '#34d399', marginTop: '6px' }}>✓ GENUINE GPS (NO SPOOF)</div>
              <div style={{ fontSize: '11px', color: '#64748b', marginTop: '4px' }}>GB Palya, Bengaluru (Accuracy: 2.1m)</div>
            </div>

            <div style={{ background: '#1e293b', padding: '16px', borderRadius: '14px', borderLeft: '5px solid #06b6d4' }}>
              <div style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', fontWeight: '700' }}>Photo Authenticity</div>
              <div style={{ fontSize: '16px', fontWeight: '800', color: '#38bdf8', marginTop: '6px' }}>🔒 SHA-256 SEALED</div>
              <div style={{ fontSize: '11px', color: '#64748b', marginTop: '4px' }}>Original Image • No Photoshop Detected</div>
            </div>

            <div style={{ background: '#1e293b', padding: '16px', borderRadius: '14px', borderLeft: '5px solid #8b5cf6' }}>
              <div style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', fontWeight: '700' }}>Automated Settlement</div>
              <div style={{ fontSize: '16px', fontWeight: '800', color: '#a78bfa', marginTop: '6px' }}>⚡ APPROVED FOR PAYOUT</div>
              <div style={{ fontSize: '11px', color: '#64748b', marginTop: '4px' }}>Invoice #992 generated via Razorpay</div>
            </div>

          </div>

        </div>

      </section>

      {/* 3. TRUST & SECURITY BADGES STRIP */}
      <section style={{ borderTop: '1px solid #1e293b', borderBottom: '1px solid #1e293b', background: '#0f172a', padding: '24px 20px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '20px', textAlign: 'center' }}>
          <div>
            <div style={{ fontSize: '26px', fontWeight: '900', color: '#ffffff' }}>150,000+</div>
            <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '2px' }}>Field Audits Verified</div>
          </div>
          <div>
            <div style={{ fontSize: '26px', fontWeight: '900', color: '#34d399' }}>99.98%</div>
            <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '2px' }}>Spoof Detection Rate</div>
          </div>
          <div>
            <div style={{ fontSize: '26px', fontWeight: '900', color: '#38bdf8' }}>&lt;100ms</div>
            <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '2px' }}>Cryptographic Hash Speed</div>
          </div>
          <div>
            <div style={{ fontSize: '26px', fontWeight: '900', color: '#fbbf24' }}>100%</div>
            <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '2px' }}>Tamper-Proof Integrity</div>
          </div>
        </div>
      </section>

      {/* 4. OLD WAY VS SPOTVERIFY WAY (EASY TO UNDERSTAND) */}
      <section id="how-it-works" style={{ maxWidth: '1100px', margin: '70px auto 0', padding: '0 20px' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span style={{ color: '#38bdf8', fontSize: '12px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px' }}>WHY YOU NEED SPOTVERIFY</span>
          <h2 style={{ fontSize: '30px', fontWeight: '900', color: '#ffffff', marginTop: '6px' }}>The Difference Spotverify Makes</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          
          {/* Old Way - Bad */}
          <div style={{ background: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.25)', borderRadius: '20px', padding: '28px' }}>
            <div style={{ display: 'inline-block', padding: '6px 12px', borderRadius: '8px', background: '#ef4444', color: '#ffffff', fontWeight: '800', fontSize: '12px', marginBottom: '16px' }}>
              ❌ Without Spotverify (High Risk)
            </div>
            <ul style={{ paddingLeft: '20px', fontSize: '14px', color: '#cbd5e1', lineHeight: '2' }}>
              <li>Auditors use Fake GPS apps from home</li>
              <li>Photos are edited or taken from computer screens</li>
              <li>Managers spend hours manually checking location calls</li>
              <li>Fake payouts waste company money and trust</li>
            </ul>
          </div>

          {/* Spotverify Way - Good */}
          <div style={{ background: 'rgba(16, 185, 129, 0.08)', border: '2px solid #10b981', borderRadius: '20px', padding: '28px', boxShadow: '0 10px 30px rgba(16,185,129,0.1)' }}>
            <div style={{ display: 'inline-block', padding: '6px 12px', borderRadius: '8px', background: '#10b981', color: '#041d14', fontWeight: '800', fontSize: '12px', marginBottom: '16px' }}>
              ✅ With Spotverify (Zero-Trust Protection)
            </div>
            <ul style={{ paddingLeft: '20px', fontSize: '14px', color: '#ffffff', lineHeight: '2' }}>
              <li>Hardware GPS checks block mock location apps instantly</li>
              <li>SHA-256 digital seals lock photo &amp; time metadata</li>
              <li>Live verification dashboard updates in real-time</li>
              <li>Automatic payouts disburse only for 100% verified audits</li>
            </ul>
          </div>

        </div>

      </section>

      {/* 5. INTERACTIVE LIVE SANDBOX DEMO */}
      <section id="demo" style={{ maxWidth: '850px', margin: '80px auto 0', padding: '0 20px' }}>
        
        <div style={{ background: 'linear-gradient(180deg, #111827 0%, #070b14 100%)', border: '1px solid #1f293d', borderRadius: '24px', padding: '36px' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <span style={{ color: '#10b981', fontSize: '12px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px' }}>TRY IT YOURSELF</span>
            <h2 style={{ fontSize: '26px', fontWeight: '900', color: '#ffffff', marginTop: '6px' }}>Test Our Verification Engine Right Now</h2>
            <p style={{ fontSize: '14px', color: '#94a3b8' }}>Click the button below to run a simulated location and photo audit check-in.</p>
          </div>

          <button 
            onClick={handleSimulate}
            disabled={isSimulating}
            style={{ width: '100%', padding: '16px', borderRadius: '12px', background: 'linear-gradient(135deg, #10b981, #06b6d4)', color: '#041d14', fontWeight: '800', fontSize: '16px', border: 'none', cursor: 'pointer' }}
          >
            {isSimulating ? 'Validating Hardware GPS & SHA-256 Digital Seal...' : 'Run Simulated Field Check-In'}
          </button>

          {simResult && (
            <div style={{ marginTop: '20px', padding: '20px', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '14px', fontSize: '13px', color: '#34d399', fontFamily: 'monospace', lineHeight: '1.8' }}>
              <div><strong>[STATUS]:</strong> 200 OK — GENUINE AUDIT VERIFIED</div>
              <div><strong>[GPS COORD]:</strong> 12.9172° N, 77.6228° E (GB Palya, Bengaluru)</div>
              <div><strong>[SPOOF DETECTION]:</strong> PASSED (Hardware Provider Verified)</div>
              <div><strong>[SHA-256 DIGITAL SEAL]:</strong> e3b0c44298fc1c149afbf4c8996fb92427ae41e4</div>
            </div>
          )}

        </div>

      </section>

      {/* 6. INTERACTIVE ROI COST CALCULATOR */}
      <section id="roi" style={{ maxWidth: '900px', margin: '80px auto 0', padding: '0 20px' }}>
        
        <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '24px', padding: '36px' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <span style={{ color: '#38bdf8', fontSize: '12px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px' }}>ENTERPRISE ROI CALCULATOR</span>
            <h2 style={{ fontSize: '26px', fontWeight: '900', color: '#ffffff', marginTop: '6px' }}>See How Much Spotverify Saves You</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '30px', alignItems: 'center' }}>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ fontSize: '13px', color: '#cbd5e1', display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span>Number of Field Auditors</span>
                  <strong style={{ color: '#10b981' }}>{auditorCount} Auditors</strong>
                </label>
                <input type="range" min="5" max="200" value={auditorCount} onChange={(e) => setAuditorCount(Number(e.target.value))} style={{ width: '100%', accentColor: '#10b981' }} />
              </div>

              <div>
                <label style={{ fontSize: '13px', color: '#cbd5e1', display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span>Audits per Auditor / Month</span>
                  <strong style={{ color: '#10b981' }}>{auditsPerAuditor} Audits</strong>
                </label>
                <input type="range" min="10" max="100" value={auditsPerAuditor} onChange={(e) => setAuditsPerAuditor(Number(e.target.value))} style={{ width: '100%', accentColor: '#10b981' }} />
              </div>
            </div>

            <div style={{ background: '#1e293b', padding: '24px', borderRadius: '18px', textAlign: 'center', border: '1px solid #334155' }}>
              <div style={{ fontSize: '13px', color: '#94a3b8' }}>Estimated Annual Fraud &amp; Overhead Savings</div>
              <div style={{ fontSize: '36px', fontWeight: '900', color: '#34d399', margin: '10px 0' }}>
                ₹{annualSavings.toLocaleString()}
              </div>
              <div style={{ fontSize: '12px', color: '#64748b' }}>Based on {totalAudits.toLocaleString()} audits every month</div>
            </div>

          </div>

        </div>

      </section>

      {/* 7. PRICING SUBSCRIPTIONS */}
      <section id="pricing" style={{ maxWidth: '1100px', margin: '80px auto 0', padding: '0 20px' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span style={{ color: '#10b981', fontSize: '12px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px' }}>TRANSPARENT PRICING</span>
          <h2 style={{ fontSize: '30px', fontWeight: '900', color: '#ffffff', marginTop: '6px' }}>Choose the Right Plan for Your Field Operations</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          
          {/* Starter Plan */}
          <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '20px', padding: '30px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#ffffff' }}>Starter SaaS</h3>
              <p style={{ fontSize: '13px', color: '#94a3b8', margin: '6px 0 20px' }}>Great for small regional field teams.</p>
              <div style={{ fontSize: '32px', fontWeight: '900', color: '#ffffff' }}>₹2,499 <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 'normal' }}>/ month</span></div>
              <ul style={{ paddingLeft: '18px', fontSize: '13px', color: '#cbd5e1', lineHeight: '2.2', marginTop: '20px' }}>
                <li>Up to 100 Verified Audits / month</li>
                <li>Standard Hardware GPS Verification</li>
                <li>Email Support</li>
              </ul>
            </div>
            <Link href="/checkout" style={{ display: 'block', textAlign: 'center', padding: '12px', borderRadius: '10px', background: '#1e293b', color: '#ffffff', fontSize: '14px', fontWeight: '700', textDecoration: 'none', marginTop: '24px' }}>
              Subscribe Starter
            </Link>
          </div>

          {/* Pro Plan - Featured */}
          <div style={{ background: 'linear-gradient(180deg, #111827 0%, #070b14 100%)', border: '2px solid #10b981', borderRadius: '20px', padding: '30px', position: 'relative', boxShadow: '0 15px 35px rgba(16,185,129,0.2)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <span style={{ position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)', background: '#10b981', color: '#041d14', fontSize: '11px', fontWeight: '900', padding: '4px 14px', borderRadius: '20px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              MOST POPULAR
            </span>
            <div>
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#ffffff' }}>Pro Enterprise</h3>
              <p style={{ fontSize: '13px', color: '#94a3b8', margin: '6px 0 20px' }}>For growing field audit networks &amp; banks.</p>
              <div style={{ fontSize: '32px', fontWeight: '900', color: '#34d399' }}>₹7,999 <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 'normal' }}>/ month</span></div>
              <ul style={{ paddingLeft: '18px', fontSize: '13px', color: '#ffffff', lineHeight: '2.2', marginTop: '20px' }}>
                <li>Up to 1,000 Verified Audits / month</li>
                <li>SHA-256 Digital Tamper Seals</li>
                <li>Anti-Spoof Velocity Detection</li>
                <li>Automated Razorpay Settlements</li>
              </ul>
            </div>
            <Link href="/checkout" style={{ display: 'block', textAlign: 'center', padding: '12px', borderRadius: '10px', background: 'linear-gradient(135deg, #10b981, #06b6d4)', color: '#041d14', fontSize: '14px', fontWeight: '800', textDecoration: 'none', marginTop: '24px' }}>
              Subscribe Pro Enterprise
            </Link>
          </div>

          {/* Custom ERP Plan */}
          <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '20px', padding: '30px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#ffffff' }}>Custom ERP</h3>
              <p style={{ fontSize: '13px', color: '#94a3b8', margin: '6px 0 20px' }}>For high-volume enterprise operations.</p>
              <div style={{ fontSize: '32px', fontWeight: '900', color: '#ffffff' }}>Custom</div>
              <ul style={{ paddingLeft: '18px', fontSize: '13px', color: '#cbd5e1', lineHeight: '2.2', marginTop: '20px' }}>
                <li>Unlimited Field Audits</li>
                <li>Dedicated Database Instance</li>
                <li>Custom ERP Webhooks &amp; SLA</li>
              </ul>
            </div>
            <a href="#contact" style={{ display: 'block', textAlign: 'center', padding: '12px', borderRadius: '10px', background: '#1e293b', color: '#ffffff', fontSize: '14px', fontWeight: '700', textDecoration: 'none', marginTop: '24px' }}>
              Contact Enterprise Sales
            </a>
          </div>

        </div>

      </section>

      {/* 8. FAQ ACCORDION */}
      <section style={{ maxWidth: '750px', margin: '80px auto 0', padding: '0 20px' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h2 style={{ fontSize: '26px', fontWeight: '900', color: '#ffffff' }}>Frequently Asked Questions</h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {[
            { q: 'How does Spotverify stop Fake GPS apps?', a: 'Spotverify connects directly to native mobile hardware providers and checks satellite signal patterns, mock location flags, and speed anomalies to catch spoofing instantly.' },
            { q: 'What is SHA-256 Digital Tamper Sealing?', a: 'When a photo is taken, its exact pixels and GPS coordinates are converted into an unbreakable 64-character cryptographic hash. Any image editing breaks this seal, alerting managers to photo fraud.' },
            { q: 'Does it work in areas with weak or no mobile signal?', a: 'Yes. Audits taken offline are safely saved into encrypted browser storage and automatically uploaded when the worker returns to network coverage.' }
          ].map((faq, idx) => (
            <div key={idx} style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', overflow: 'hidden' }}>
              <button 
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                style={{ width: '100%', padding: '18px', textAlign: 'left', background: 'none', border: 'none', color: '#ffffff', fontWeight: '700', fontSize: '14px', display: 'flex', justifyContent: 'space-between', cursor: 'pointer' }}
              >
                <span>{faq.q}</span>
                <span style={{ color: '#10b981', fontSize: '18px' }}>{openFaq === idx ? '−' : '+'}</span>
              </button>
              {openFaq === idx && (
                <div style={{ padding: '0 18px 18px', fontSize: '13px', color: '#94a3b8', lineHeight: '1.6' }}>
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

      </section>

      {/* 9. FOOTER & COMPLIANCE */}
      <footer style={{ borderTop: '1px solid #1e293b', marginTop: '100px', padding: '40px 20px 30px', background: '#04070e', fontSize: '13px', color: '#64748b' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '20px', alignItems: 'center' }}>
          <div>
            <strong style={{ color: '#ffffff', fontSize: '16px' }}>Spotverify Enterprise</strong>
            <div style={{ marginTop: '4px' }}>58, 7th Main Road, GB Palya, Bengaluru, Karnataka, India</div>
          </div>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <Link href="/privacy" style={{ color: '#10b981', textDecoration: 'underline', fontWeight: '600' }}>Privacy Policy &amp; Terms</Link>
            <span>spotverify992@gmail.com</span>
            <span>+91 8247831885</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
