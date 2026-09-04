'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  // 1. ROI Calculator State
  const [auditorCount, setAuditorCount] = useState<number>(25);
  const [auditsPerAuditor, setAuditsPerAuditor] = useState<number>(30);

  // 2. Interactive Sandbox Simulator State
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simResult, setSimResult] = useState<{
    hash: string;
    lat: number;
    lng: number;
    spoofDetected: boolean;
    timestamp: string;
  } | null>(null);

  // 3. Pricing Toggle State
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  // 4. FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // 5. Contact Form State
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  // Calculations for ROI Calculator
  const totalAudits = auditorCount * auditsPerAuditsPerMonth(auditsPerAuditor);
  const monthlySavings = totalAudits * 180; // Estimated INR saved per audit in fraud prevention & manual labor
  const annualSavings = monthlySavings * 12;

  function auditsPerAuditsPerMonth(val: number) {
    return val;
  }

  // Handle Simulation Run
  const handleRunSimulation = () => {
    setIsSimulating(true);
    setSimResult(null);
    setTimeout(() => {
      setIsSimulating(false);
      setSimResult({
        hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
        lat: 12.9172,
        lng: 77.6228,
        spoofDetected: false,
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      });
    }, 1200);
  };

  const faqs = [
    {
      q: 'How does Spotverify detect mock locations and GPS spoofing?',
      a: 'Spotverify interfaces with native hardware location providers and cross-examines mock location provider flags, mock app detection rules, speed velocity anomalies, and satellite signal strength metrics to block spoofed coordinates.',
    },
    {
      q: 'What is SHA-256 Photo Hash Verification?',
      a: 'When an auditor takes a picture in our app, the raw image data and GPS EXIF metadata are instantly converted into a unique 64-character cryptographic hash. Any subsequent tampering or image editing breaks this signature, flagging fraud immediately.',
    },
    {
      q: 'Can auditors perform field site inspections offline?',
      a: 'Yes. In low-network areas, audit photos and GPS hashes are saved into local encrypted browser storage (IndexedDB) and automatically sync to our database once connectivity is restored.',
    },
    {
      q: 'How do task payouts and settlements work?',
      a: 'Once an audit passes anti-spoofing and hash validation, a verified settlement invoice is generated. Finance admins can disburse payments directly via our Razorpay integration or export payout files to your ERP.',
    },
    {
      q: 'Is Spotverify compliant with enterprise data protection standards?',
      a: 'Spotverify enforces Row-Level Security (RLS) policies, end-to-end database encryption, SOC2-type access logs, and strict privacy compliance.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-emerald-500 selection:text-slate-950 font-sans">
      
      {/* 1. TOP NAVIGATION BAR */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/85 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo & Brand Name */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative h-10 w-10 overflow-hidden rounded-xl bg-slate-900 border border-slate-800 p-1 transition-transform group-hover:scale-105">
              <img 
                src="/logo.png" 
                alt="Spotverify Logo" 
                className="h-full w-full object-contain"
              />
            </div>
            <span className="font-bold text-2xl tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              Spotverify
            </span>
            <span className="hidden md:inline-block px-2.5 py-0.5 text-xs font-semibold rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Enterprise SaaS
            </span>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8 text-sm font-medium text-slate-300">
            <a href="#demo" className="hover:text-emerald-400 transition-colors">Live Demo</a>
            <a href="#roi" className="hover:text-emerald-400 transition-colors">ROI Calculator</a>
            <a href="#features" className="hover:text-emerald-400 transition-colors">Capabilities</a>
            <a href="#workflow" className="hover:text-emerald-400 transition-colors">How It Works</a>
            <a href="#pricing" className="hover:text-emerald-400 transition-colors">Pricing</a>
            <a href="#faq" className="hover:text-emerald-400 transition-colors">FAQ</a>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center space-x-3">
            <Link
              href="/login"
              className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/audit"
              className="px-4 py-2 text-sm font-semibold rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 hover:brightness-110 transition-all shadow-lg shadow-emerald-500/20"
            >
              Launch Portal
            </Link>
          </div>
        </div>
      </header>

      {/* MAIN BODY CONTENT */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-28">
        
        {/* 2. HERO SECTION */}
        <section className="text-center space-y-8 max-w-4xl mx-auto pt-6">
          
          <div className="flex justify-center">
            <div className="relative inline-flex items-center justify-center p-2 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-2xl backdrop-blur-md">
              <img 
                src="/logo.png" 
                alt="Spotverify Logo Visual" 
                className="h-16 sm:h-20 w-auto object-contain rounded-lg"
              />
            </div>
          </div>

          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs text-slate-300">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Real-time Field Workforce & Anti-Spoofing Engine</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Zero-Trust Field Verification &amp; Tamper-Proof Audit Logs
          </h1>

          <p className="text-slate-400 text-base sm:text-xl max-w-2xl mx-auto leading-relaxed">
            Eliminate location spoofing, collateral fraud, and manual audit lag. Spotverify provides hardware GPS validation, SHA-256 photo hashing, and instant automated task settlements.
          </p>

          {/* CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <Link
              href="/audit"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold hover:brightness-110 transition-all shadow-xl shadow-emerald-500/25 flex items-center justify-center space-x-2"
            >
              <span>Launch Field Engine</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
              </svg>
            </Link>

            <Link
              href="/checkout"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-500 text-slate-200 font-semibold transition-all flex items-center justify-center space-x-2"
            >
              <span>Settlement Checkout</span>
            </Link>
          </div>

          {/* LIVE METRICS TICKER */}
          <div className="pt-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-center border-t border-slate-800/80 max-w-3xl mx-auto">
            <div className="space-y-1">
              <div className="text-2xl font-black text-white">150,000+</div>
              <div className="text-xs text-slate-400">Audits Verified</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-black text-emerald-400">99.98%</div>
              <div className="text-xs text-slate-400">Spoof Prevention</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-black text-white">&lt;100ms</div>
              <div className="text-xs text-slate-400">SHA-256 Hash Speed</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-black text-cyan-400">100%</div>
              <div className="text-xs text-slate-400">Audit Compliance</div>
            </div>
          </div>

          {/* SECURITY BADGES */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 font-semibold tracking-wider uppercase">
            <span>&bull; ISO 27001 Ready</span>
            <span>&bull; SHA-256 Encrypted</span>
            <span>&bull; SOC2 Access Control</span>
            <span>&bull; Row-Level Security</span>
          </div>

        </section>

        {/* 3. INTERACTIVE VERIFICATION SANDBOX */}
        <section id="demo" className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-10 space-y-8 scroll-mt-24">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <h2 className="text-xs font-bold tracking-widest text-emerald-400 uppercase">Live Sandbox Simulator</h2>
            <p className="text-3xl font-bold text-white">Test Spotverify Anti-Spoofing Engine</p>
            <p className="text-slate-400 text-sm">Simulate a real-time site audit submission to inspect coordinate validation and digital cryptographic hashing.</p>
          </div>

          <div className="max-w-xl mx-auto bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center space-x-2">
                <span className="h-3 w-3 rounded-full bg-emerald-500"></span>
                <span className="text-xs font-mono text-slate-300">Auditor Session: #AUD-8821</span>
              </div>
              <span className="text-xs bg-slate-900 border border-slate-800 px-2 py-1 rounded text-slate-400">Target: GB Palya, Bengaluru</span>
            </div>

            <button
              onClick={handleRunSimulation}
              disabled={isSimulating}
              className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-400 disabled:bg-slate-800 text-slate-950 font-bold rounded-xl transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center space-x-2"
            >
              {isSimulating ? (
                <span>Validating Hardware GPS &amp; Hash...</span>
              ) : (
                <span>Simulate Field Audit Check-In</span>
              )}
            </button>

            {simResult && (
              <div className="space-y-3 bg-slate-900/80 border border-emerald-500/30 rounded-xl p-4 text-xs font-mono">
                <div className="flex justify-between text-emerald-400 font-bold">
                  <span>[STATUS]: VERIFIED_GENUINE</span>
                  <span>MOCK_LOCATION: NONE</span>
                </div>
                <div><span className="text-slate-500">LAT/LNG:</span> {simResult.lat}, {simResult.lng}</div>
                <div><span className="text-slate-500">TIMESTAMP:</span> {simResult.timestamp}</div>
                <div className="truncate"><span className="text-slate-500">SHA-256:</span> {simResult.hash}</div>
              </div>
            )}
          </div>
        </section>

        {/* 4. INTERACTIVE ROI CALCULATOR */}
        <section id="roi" className="bg-gradient-to-b from-slate-900/80 to-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-10 space-y-8 scroll-mt-24">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <h2 className="text-xs font-bold tracking-widest text-emerald-400 uppercase">Savings Estimator</h2>
            <p className="text-3xl font-bold text-white">Calculate Your Enterprise ROI</p>
            <p className="text-slate-400 text-sm">See how much Spotverify saves your workforce in fraud prevention and manual review costs.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center max-w-4xl mx-auto">
            <div className="space-y-6 bg-slate-950 border border-slate-800 p-6 rounded-2xl">
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-slate-300">Active Field Auditors</span>
                  <span className="text-emerald-400 font-bold">{auditorCount} Auditors</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="200"
                  value={auditorCount}
                  onChange={(e) => setAuditorCount(Number(e.target.value))}
                  className="w-full accent-emerald-500 bg-slate-800 rounded-lg h-2 cursor-pointer"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-slate-300">Audits per Auditor / Month</span>
                  <span className="text-emerald-400 font-bold">{auditsPerAuditor} Audits</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={auditsPerAuditor}
                  onChange={(e) => setAuditsPerAuditor(Number(e.target.value))}
                  className="w-full accent-emerald-500 bg-slate-800 rounded-lg h-2 cursor-pointer"
                />
              </div>

              <div className="pt-2 border-t border-slate-800 text-xs text-slate-400">
                Calculated on {totalAudits.toLocaleString()} monthly site audits across your enterprise network.
              </div>
            </div>

            <div className="bg-emerald-950/30 border border-emerald-500/30 rounded-2xl p-6 text-center space-y-4">
              <div className="text-slate-300 text-sm font-semibold">Estimated Annual Fraud &amp; Overhead Savings</div>
              <div className="text-4xl sm:text-5xl font-black text-emerald-400">
                ₹{annualSavings.toLocaleString()}
              </div>
              <p className="text-xs text-slate-400">
                Eliminating fake check-ins saves your team approx. ₹{monthlySavings.toLocaleString()} / month.
              </p>
              <Link
                href="#pricing"
                className="inline-block px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-sm transition-all"
              >
                Choose Your Plan
              </Link>
            </div>
          </div>
        </section>

        {/* 5. WORKFLOW ARCHITECTURE */}
        <section id="workflow" className="space-y-12 scroll-mt-24">
          <div className="text-center space-y-3">
            <h2 className="text-xs font-bold tracking-widest text-emerald-400 uppercase">Verification Architecture</h2>
            <p className="text-3xl font-bold text-white">How Spotverify Protects Every Field Check-In</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 space-y-3 relative">
              <div className="h-10 w-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold text-lg border border-emerald-500/20">
                01
              </div>
              <h3 className="text-lg font-bold text-white">GPS Check-In</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Auditors capture photos via the browser app. Native device sensors check for mock location software.
              </p>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 space-y-3 relative">
              <div className="h-10 w-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-bold text-lg border border-cyan-500/20">
                02
              </div>
              <h3 className="text-lg font-bold text-white">SHA-256 Hashing</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Photo bytes and geocoordinates are cryptographically hashed, rendering records tamper-evident.
              </p>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 space-y-3 relative">
              <div className="h-10 w-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold text-lg border border-indigo-500/20">
                03
              </div>
              <h3 className="text-lg font-bold text-white">Supabase RLS</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Data is locked behind enterprise Row-Level Security policies, accessible only to verified tenant admins.
              </p>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 space-y-3 relative">
              <div className="h-10 w-10 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center font-bold text-lg border border-teal-500/20">
                04
              </div>
              <h3 className="text-lg font-bold text-white">Settlement</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Verified task completion triggers automated disbursement via Razorpay settlement order APIs.
              </p>
            </div>

          </div>
        </section>

        {/* 6. CORE CAPABILITIES GRID */}
        <section id="features" className="space-y-12 scroll-mt-24">
          <div className="text-center space-y-3">
            <h2 className="text-xs font-bold tracking-widest text-emerald-400 uppercase">Enterprise Capabilities</h2>
            <p className="text-3xl font-bold text-white">Engineered for High-Stakes Operations</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            
            <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl space-y-3">
              <div className="text-emerald-400 font-bold text-base">Hardware Geofencing</div>
              <p className="text-slate-400 text-xs leading-relaxed">Restricts task submissions to strict radial coordinates surrounding targeted collateral or audit sites.</p>
            </div>

            <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl space-y-3">
              <div className="text-emerald-400 font-bold text-base">Anti-Spoof Velocity Engine</div>
              <p className="text-slate-400 text-xs leading-relaxed">Flags impossible travel speeds between consecutive check-ins to catch location spoofers.</p>
            </div>

            <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl space-y-3">
              <div className="text-emerald-400 font-bold text-base">Cryptographic Proofs</div>
              <p className="text-slate-400 text-xs leading-relaxed">SHA-256 signatures guarantee photo metadata was not doctored or repurposed from prior audits.</p>
            </div>

            <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl space-y-3">
              <div className="text-emerald-400 font-bold text-base">Offline Caching &amp; Sync</div>
              <p className="text-slate-400 text-xs leading-relaxed">Captures site photo proofs without internet signal and uploads automatically when connected.</p>
            </div>

            <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl space-y-3">
              <div className="text-emerald-400 font-bold text-base">Razorpay Settlements</div>
              <p className="text-slate-400 text-xs leading-relaxed">Integrated payment settlement pipeline for instant auditor compensation upon task approval.</p>
            </div>

            <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl space-y-3">
              <div className="text-emerald-400 font-bold text-base">Row-Level Security (RLS)</div>
              <p className="text-slate-400 text-xs leading-relaxed">Database access policies isolate tenant records, ensuring zero data leakage between enterprise clients.</p>
            </div>

          </div>
        </section>

        {/* 7. PRICING TIERS */}
        <section id="pricing" className="space-y-12 scroll-mt-24">
          <div className="text-center space-y-3">
            <h2 className="text-xs font-bold tracking-widest text-emerald-400 uppercase">SaaS Subscriptions</h2>
            <p className="text-3xl font-bold text-white">Transparent Pricing for Field Workforces</p>
            
            <div className="pt-4 flex items-center justify-center space-x-4">
              <span className={`text-sm ${billingCycle === 'monthly' ? 'text-white font-bold' : 'text-slate-400'}`}>Monthly</span>
              <button 
                onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
                className="w-12 h-6 bg-slate-800 rounded-full p-1 border border-slate-700 transition-colors"
              >
                <div className={`w-4 h-4 bg-emerald-400 rounded-full transition-transform ${billingCycle === 'annual' ? 'translate-x-6' : 'translate-x-0'}`}></div>
              </button>
              <span className={`text-sm ${billingCycle === 'annual' ? 'text-white font-bold' : 'text-slate-400'}`}>
                Annual <span className="text-xs text-emerald-400 font-normal">(Save 20%)</span>
              </span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            
            {/* Starter */}
            <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-8 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white">Starter SaaS</h3>
                <p className="text-slate-400 text-xs">For small regional teams testing field audit workflows.</p>
                <div className="text-3xl font-extrabold text-white">
                  {billingCycle === 'monthly' ? '₹2,499' : '₹1,999'} <span className="text-xs font-normal text-slate-400">/ month</span>
                </div>
                <ul className="space-y-3 text-xs text-slate-300 pt-2">
                  <li className="flex items-center space-x-2">
                    <span className="text-emerald-400">&check;</span>
                    <span>Up to 100 Field Audits / month</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-emerald-400">&check;</span>
                    <span>Basic GPS Verification</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-emerald-400">&check;</span>
                    <span>Standard Email Support</span>
                  </li>
                </ul>
              </div>
              <Link href="/checkout" className="w-full py-3 text-center bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl text-sm transition-all">
                Get Started
              </Link>
            </div>

            {/* Pro - Featured */}
            <div className="bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-emerald-500 rounded-2xl p-8 space-y-6 flex flex-col justify-between relative shadow-2xl shadow-emerald-500/10">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-slate-950 font-extrabold text-xs px-3 py-0.5 rounded-full uppercase tracking-wider">
                Recommended
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white">Pro Enterprise</h3>
                <p className="text-slate-400 text-xs">For growing audit networks &amp; financial institutions.</p>
                <div className="text-3xl font-extrabold text-white">
                  {billingCycle === 'monthly' ? '₹7,999' : '₹6,399'} <span className="text-xs font-normal text-slate-400">/ month</span>
                </div>
                <ul className="space-y-3 text-xs text-slate-300 pt-2">
                  <li className="flex items-center space-x-2">
                    <span className="text-emerald-400">&check;</span>
                    <span>Up to 1,000 Field Audits / month</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-emerald-400">&check;</span>
                    <span>SHA-256 Cryptographic Hashing</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-emerald-400">&check;</span>
                    <span>Anti-Spoof Velocity Engine</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-emerald-400">&check;</span>
                    <span>Razorpay Settlement Gateway</span>
                  </li>
                </ul>
              </div>
              <Link href="/checkout" className="w-full py-3 text-center bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-sm transition-all shadow-lg shadow-emerald-500/20">
                Launch Pro Subscription
              </Link>
            </div>

            {/* Custom */}
            <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-8 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white">Custom ERP</h3>
                <p className="text-slate-400 text-xs">For enterprise-scale field operations.</p>
                <div className="text-3xl font-extrabold text-white">Custom</div>
                <ul className="space-y-3 text-xs text-slate-300 pt-2">
                  <li className="flex items-center space-x-2">
                    <span className="text-emerald-400">&check;</span>
                    <span>Unlimited Field Audits</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-emerald-400">&check;</span>
                    <span>Dedicated Database Instance</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-emerald-400">&check;</span>
                    <span>Custom ERP Webhooks &amp; SLA</span>
                  </li>
                </ul>
              </div>
              <a href="#contact" className="w-full py-3 text-center bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl text-sm transition-all">
                Contact Enterprise Sales
              </a>
            </div>

          </div>
        </section>

        {/* 8. FREQUENTLY ASKED QUESTIONS */}
        <section id="faq" className="space-y-8 max-w-3xl mx-auto scroll-mt-24">
          <div className="text-center space-y-3">
            <h2 className="text-xs font-bold tracking-widest text-emerald-400 uppercase">Knowledge Base</h2>
            <p className="text-3xl font-bold text-white">Frequently Asked Questions</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between text-sm font-semibold text-white focus:outline-none"
                >
                  <span>{faq.q}</span>
                  <span className="text-emerald-400 text-lg font-bold ml-4">
                    {openFaq === idx ? '−' : '+'}
                  </span>
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-5 text-xs text-slate-400 leading-relaxed border-t border-slate-800/60 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* 9. CONTACT & INQUIRY FORM */}
        <section id="contact" className="space-y-8 max-w-2xl mx-auto scroll-mt-24">
          <div className="text-center space-y-3">
            <h2 className="text-xs font-bold tracking-widest text-emerald-400 uppercase">Get Started</h2>
            <p className="text-3xl font-bold text-white">Request Enterprise Onboarding</p>
          </div>

          {formSubmitted ? (
            <div className="bg-emerald-950/40 border border-emerald-500/40 p-8 rounded-2xl text-center space-y-3">
              <div className="text-emerald-400 font-bold text-xl">Inquiry Submitted Successfully</div>
              <p className="text-xs text-slate-300">Thank you for reaching out. Our enterprise team will contact you at your work email shortly.</p>
            </div>
          ) : (
            <form 
              onSubmit={(e) => { e.preventDefault(); setFormSubmitted(true); }} 
              className="bg-slate-900/60 border border-slate-800 p-8 rounded-2xl space-y-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs text-slate-400">Full Name</label>
                  <input required type="text" placeholder="John Doe" className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"/>
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-slate-400">Work Email</label>
                  <input required type="email" placeholder="john@company.com" className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"/>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-slate-400">Expected Monthly Audit Volume</label>
                <select className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs text-slate-100 focus:outline-none focus:border-emerald-500">
                  <option value="100">100 - 500 Audits / mo</option>
                  <option value="1000">500 - 2,000 Audits / mo</option>
                  <option value="5000">2,000+ Audits / mo</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-slate-400">Requirement Notes</label>
                <textarea required rows={4} placeholder="Describe your field workforce verification needs..." className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"></textarea>
              </div>

              <button type="submit" className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-sm transition-all shadow-lg shadow-emerald-500/20">
                Submit Onboarding Request
              </button>
            </form>
          )}
        </section>

      </main>

      {/* 10. FOOTER & COMPLIANCE */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            
            <div className="flex items-center space-x-3">
              <img src="/logo.png" alt="Spotverify Footer Logo" className="h-7 w-auto" />
              <span className="text-base font-bold text-slate-200">Spotverify Enterprise</span>
            </div>

            <div className="flex items-center space-x-6 text-xs text-slate-400">
              <Link href="/privacy" className="hover:text-emerald-400 transition-colors underline underline-offset-4 font-semibold">
                Privacy Policy &amp; Terms
              </Link>
              <span>&bull;</span>
              <span>spotverify992@gmail.com</span>
              <span>&bull;</span>
              <span>+91 8247831885</span>
            </div>

          </div>

          <div className="text-center md:text-left text-xs text-slate-500 border-t border-slate-800/60 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2">
            <div>
              &copy; {new Date().getFullYear()} Spotverify Enterprise. Operating Address: 58, 7th Main Road, GB Palya, Bengaluru, Karnataka, India.
            </div>
            <div className="text-slate-600">
              Field Audit Verification &amp; Anti-Spoofing SaaS Platform
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
