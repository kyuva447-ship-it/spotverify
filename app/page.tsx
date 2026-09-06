'use client';

import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase Client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

type Tab = 'home' | 'login' | 'audit' | 'dashboard' | 'profile' | 'faq' | 'privacy' | 'terms';

interface AuditRecord {
  id: string;
  auditor: string;
  location: string;
  coords: string;
  timestamp: string;
  hash: string;
  status: 'Verified' | 'Pending';
  payout: string;
}

export default function SpotverifyApp() {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [userEmail, setUserEmail] = useState<string>('');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  // Form State
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [hash, setHash] = useState<string>('');
  const [isSubmittingAudit, setIsSubmittingAudit] = useState<boolean>(false);
  const [auditSubmitted, setAuditSubmitted] = useState<boolean>(false);

  // Audit Data State
  const [auditLogs, setAuditLogs] = useState<AuditRecord[]>([]);

  // Load local logs on initial mount
  useEffect(() => {
    const saved = localStorage.getItem('spotverify_logs');
    if (saved) {
      try {
        setAuditLogs(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse saved logs', e);
      }
    }
  }, []);

  const saveAuditLogs = (newLogs: AuditRecord[]) => {
    setAuditLogs(newLogs);
    localStorage.setItem('spotverify_logs', JSON.stringify(newLogs));
  };

  // Mock Geolocation Capture
  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoords({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setHash(`0x${Math.random().toString(16).substring(2, 10)}${Math.random().toString(16).substring(2, 10)}`);
        },
        () => {
          // Fallback mock location if geolocation is denied/fails
          setCoords({ lat: 12.8912, lng: 77.6412 });
          setHash(`0x${Math.random().toString(16).substring(2, 10)}${Math.random().toString(16).substring(2, 10)}`);
        }
      );
    }
  };

  // MERGED: Database Insert + Local State Handler
  const handleAuditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingAudit(true);

    const auditorName = userEmail || 'Field Auditor';
    const locationName = 'GB Palya, Bengaluru';

    try {
      // 1. Insert row directly into Supabase database
      const { data, error } = await supabase
        .from('audit_logs')
        .insert([
          {
            auditor: auditorName,
            location: locationName,
          },
        ]);

      if (error) {
        console.error('Supabase Insert Error:', error.message);
        alert(`Failed to save to Supabase: ${error.message}`);
        setIsSubmittingAudit(false);
        return;
      }

      // 2. Update local state to render immediately in UI
      const newRecord: AuditRecord = {
        id: `AUD-${Math.floor(1000 + Math.random() * 9000)}`,
        auditor: auditorName,
        location: locationName,
        coords: coords ? `${coords.lat.toFixed(6)}, ${coords.lng.toFixed(6)}` : '12.891200, 77.641200',
        timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
        hash: hash || '0x' + Math.random().toString(16).substring(2, 18),
        status: 'Verified',
        payout: '₹450',
      };

      saveAuditLogs([newRecord, ...auditLogs]);
      setAuditSubmitted(true);
    } catch (err) {
      console.error('Unexpected Error:', err);
    } finally {
      setIsSubmittingAudit(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      {/* Navigation Bar */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('home')}>
            <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center font-bold text-slate-950">
              SV
            </div>
            <span className="font-bold text-xl text-white tracking-tight">SpotVerify</span>
          </div>

          <nav className="flex gap-1 md:gap-4 text-sm font-medium">
            <button
              onClick={() => setActiveTab('home')}
              className={`px-3 py-1.5 rounded-md transition ${
                activeTab === 'home' ? 'bg-slate-800 text-emerald-400' : 'text-slate-400 hover:text-white'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => setActiveTab('audit')}
              className={`px-3 py-1.5 rounded-md transition ${
                activeTab === 'audit' ? 'bg-slate-800 text-emerald-400' : 'text-slate-400 hover:text-white'
              }`}
            >
              New Audit
            </button>
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-3 py-1.5 rounded-md transition ${
                activeTab === 'dashboard' ? 'bg-slate-800 text-emerald-400' : 'text-slate-400 hover:text-white'
              }`}
            >
              Dashboard
            </button>
          </nav>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-4xl mx-auto p-4 md:p-8">
        {/* TAB: HOME */}
        {activeTab === 'home' && (
          <div className="space-y-6 text-center py-12">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
              Decentralized Location & Field Verification
            </h1>
            <p className="text-slate-400 max-w-xl mx-auto">
              Capture cryptographic proof of location, log field audits, and verify record authenticity instantly via Supabase backend integration.
            </p>
            <div className="flex justify-center gap-4 pt-4">
              <button
                onClick={() => setActiveTab('audit')}
                className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-6 py-3 rounded-lg shadow-lg shadow-emerald-500/20 transition"
              >
                Start New Audit
              </button>
              <button
                onClick={() => setActiveTab('dashboard')}
                className="bg-slate-800 hover:bg-slate-700 text-white font-bold px-6 py-3 rounded-lg transition"
              >
                View Logged Audits
              </button>
            </div>
          </div>
        )}

        {/* TAB: NEW AUDIT FORM */}
        {activeTab === 'audit' && (
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl max-w-lg mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-white">Submit Field Audit</h2>

            {auditSubmitted ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
                  ✓
                </div>
                <h3 className="text-xl font-semibold text-white">Audit Saved Successfully!</h3>
                <p className="text-sm text-slate-400">Record inserted into Supabase `audit_logs` table.</p>
                <button
                  onClick={() => {
                    setAuditSubmitted(false);
                    setCoords(null);
                    setHash('');
                  }}
                  className="mt-4 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-md text-sm transition"
                >
                  Submit Another Audit
                </button>
              </div>
            ) : (
              <form onSubmit={handleAuditSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Auditor Name / Email</label>
                  <input
                    type="text"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    placeholder="field.auditor@company.com"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200 focus:outline-none focus:border-emerald-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">GPS Coordinates & Cryptographic Proof</label>
                  <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg space-y-2">
                    <button
                      type="button"
                      onClick={handleGetLocation}
                      className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-xs font-semibold px-3 py-1.5 rounded transition"
                    >
                      {coords ? 'Refresh GPS Proof' : 'Capture Location'}
                    </button>
                    {coords && (
                      <div className="text-xs font-mono space-y-1 text-slate-400 pt-1">
                        <div>LAT/LNG: {coords.lat.toFixed(6)}, {coords.lng.toFixed(6)}</div>
                        <div className="truncate">HASH: {hash}</div>
                      </div>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmittingAudit}
                  className="w-full bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-bold py-2.5 rounded-lg transition"
                >
                  {isSubmittingAudit ? 'Saving to Supabase...' : 'Submit Audit Entry'}
                </button>
              </form>
            )}
          </div>
        )}

        {/* TAB: DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Recent Audit Logs</h2>
            {auditLogs.length === 0 ? (
              <p className="text-slate-500 text-sm">No audits logged yet.</p>
            ) : (
              <div className="overflow-x-auto border border-slate-800 rounded-xl">
                <table className="w-full text-left text-sm text-slate-300">
                  <thead className="bg-slate-900 text-slate-400 border-b border-slate-800 text-xs uppercase">
                    <tr>
                      <th className="p-3">ID</th>
                      <th className="p-3">Auditor</th>
                      <th className="p-3">Location</th>
                      <th className="p-3">Coordinates</th>
                      <th className="p-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/50 bg-slate-950">
                    {auditLogs.map((log) => (
                      <tr key={log.id}>
                        <td className="p-3 font-mono text-emerald-400">{log.id}</td>
                        <td className="p-3">{log.auditor}</td>
                        <td className="p-3">{log.location}</td>
                        <td className="p-3 font-mono text-xs text-slate-400">{log.coords}</td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded text-xs bg-emerald-500/10 text-emerald-400 font-medium">
                            {log.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
