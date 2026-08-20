'use client';

import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// Supabase Initialization
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder'
);

type IndustryCategory = 'Vehicles' | 'Real Estate' | 'Electronics' | 'Heavy Machinery';

interface AuditItem {
  id?: string;
  category: IndustryCategory;
  item_name: string;
  identifier_no: string;
  declared_value: number;
  calculated_fee: number;
  seller_name: string;
  status: string;
  payment_status: string;
  razorpay_payment_id?: string;
  lat?: number;
  lng?: number;
  trust_score: number;
  param1_status: string;
  param2_status: string;
  param3_status: string;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function SpotverifyApp() {
  const [activeTab, setActiveTab] = useState<'client' | 'auditor' | 'admin'>('client');
  const [category, setCategory] = useState<IndustryCategory>('Vehicles');
  const [itemName, setItemName] = useState('');
  const [identifierNo, setIdentifierNo] = useState('');
  const [declaredValue, setDeclaredValue] = useState<number | ''>('');
  const [userEmail, setUserEmail] = useState('');
  const [calculatedFee, setCalculatedFee] = useState(1499);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<AuditItem[]>([]);

  // Distance calculator state for Auditor GPS
  const [auditorLat, setAuditorLat] = useState<number | null>(null);
  const [auditorLng, setAuditorLng] = useState<number | null>(null);

  // Load Razorpay Script
  useEffect(() => {
    if (typeof window !== 'undefined' && !document.getElementById('razorpay-sdk')) {
      const script = document.createElement('script');
      script.id = 'razorpay-sdk';
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      document.body.appendChild(script);
    }
    fetchItems();
  }, []);

  // Fetch Items from Supabase
  const fetchItems = async () => {
    if (supabaseUrl && !supabaseUrl.includes('placeholder')) {
      const { data, error } = await supabase.from('audit_items').select('*').order('created_at', { ascending: false });
      if (!error && data) setItems(data);
    }
  };

  // Dynamic Pricing Logic (1% - 2% with Floor & Ceiling)
  useEffect(() => {
    const val = Number(declaredValue) || 0;
    let rate = 0.01;
    let minFee = 1499;
    let maxFee = 10000;

    switch (category) {
      case 'Electronics':
        rate = 0.02; // 2%
        minFee = 499;
        maxFee = 2500;
        break;
      case 'Vehicles':
        rate = 0.01; // 1%
        minFee = 1499;
        maxFee = 8000;
        break;
      case 'Heavy Machinery':
        rate = 0.01; // 1%
        minFee = 2999;
        maxFee = 20000;
        break;
      case 'Real Estate':
        rate = 0.005; // 0.5%
        minFee = 4999;
        maxFee = 25000;
        break;
    }

    const computed = Math.round(val * rate);
    const finalFee = Math.min(Math.max(computed, minFee), maxFee);
    setCalculatedFee(finalFee);
  }, [declaredValue, category]);

  // Handle Client Submission and Razorpay Payment
  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!itemName || !identifierNo || !declaredValue || !userEmail) {
      alert('Please complete all form fields.');
      return;
    }

    setLoading(true);

    // Get client current GPS location
    navigator.geolocation.getCurrentPosition(
      (pos) => triggerRazorpay(pos.coords.latitude, pos.coords.longitude),
      () => triggerRazorpay(12.9716, 77.5946) // Default fallback coordinates
    );
  };

  const triggerRazorpay = (lat: number, lng: number) => {
    const amountInPaise = calculatedFee * 100;

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_placeholder',
      amount: amountInPaise,
      currency: 'INR',
      name: 'Spotverify Platform',
      description: `Verification Fee - ${category}`,
      handler: async function (response: any) {
        const newItem: AuditItem = {
          category,
          item_name: itemName,
          identifier_no: identifierNo.toUpperCase(),
          declared_value: Number(declaredValue),
          calculated_fee: calculatedFee,
          seller_name: userEmail.split('@')[0],
          status: 'Pending Inspection',
          payment_status: 'Paid',
          razorpay_payment_id: response.razorpay_payment_id,
          lat,
          lng,
          trust_score: 0,
          param1_status: 'Pending',
          param2_status: 'Pending',
          param3_status: 'Pending',
        };

        if (supabaseUrl && !supabaseUrl.includes('placeholder')) {
          await supabase.from('audit_items').insert([newItem]);
        } else {
          setItems((prev) => [newItem, ...prev]);
        }

        setLoading(false);
        setItemName(''); setIdentifierNo(''); setDeclaredValue('');
        alert(`Payment Success (ID: ${response.razorpay_payment_id}). Request placed!`);
        fetchItems();
      },
      prefill: { email: userEmail },
      theme: { color: '#0284c7' },
    };

    if (window.Razorpay) {
      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', () => {
        alert('Payment failed. Please try again.');
        setLoading(false);
      });
      rzp.open();
    } else {
      alert('Razorpay SDK failed to load. Please verify your connection.');
      setLoading(false);
    }
  };

  // Haversine Distance Calculator (km)
  const getDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    return (R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))).toFixed(2);
  };

  const updateParamStatus = async (item: AuditItem, paramIndex: number, pass: boolean) => {
    const updated = { ...item };
    const statusVal = pass ? 'Pass' : 'Fail';
    if (paramIndex === 1) updated.param1_status = statusVal;
    if (paramIndex === 2) updated.param2_status = statusVal;
    if (paramIndex === 3) updated.param3_status = statusVal;

    const passes = [updated.param1_status, updated.param2_status, updated.param3_status].filter((s) => s === 'Pass').length;
    const fails = [updated.param1_status, updated.param2_status, updated.param3_status].filter((s) => s === 'Fail').length;

    if (passes + fails === 3) {
      updated.status = fails > 0 ? 'Flagged / Rejected' : 'Verified & Approved';
      updated.trust_score = fails > 0 ? 28 : Math.floor(Math.random() * 12) + 87;
    }

    if (supabaseUrl && !supabaseUrl.includes('placeholder')) {
      await supabase.from('audit_items').update(updated).eq('identifier_no', item.identifier_no);
    }
    fetchItems();
  };

  return (
    <div style={{ backgroundColor: '#080c14', color: '#f8fafc', minHeight: '100vh', fontFamily: 'Inter, sans-serif', padding: '24px' }}>
      {/* Header Bar */}
      <div style={{ maxWidth: '1000px', margin: '0 auto 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', background: 'linear-gradient(to right, #38bdf8, #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            SPOTVERIFY
          </h1>
          <p style={{ fontSize: '12px', color: '#64748b' }}>Multi-Industry Asset Audit Engine</p>
        </div>
        <div style={{ display: 'flex', gap: '8px', background: '#0f172a', padding: '4px', borderRadius: '8px', border: '1px solid #1e293b' }}>
          {(['client', 'auditor', 'admin'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '6px 16px',
                borderRadius: '6px',
                border: 'none',
                background: activeTab === tab ? '#0284c7' : 'transparent',
                color: activeTab === tab ? '#fff' : '#94a3b8',
                fontSize: '12px',
                fontWeight: 'bold',
                cursor: 'pointer',
                textTransform: 'capitalize',
              }}
            >
              {tab} Console
            </button>
          ))}
        </div>
      </div>

      {/* Main Container */}
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        {/* 1. CLIENT PORTAL */}
        {activeTab === 'client' && (
          <div style={{ background: '#0f172a', borderRadius: '16px', padding: '32px', border: '1px solid #1e293b' }}>
            <h2 style={{ fontSize: '18px', marginBottom: '16px' }}>Request Asset Physical Inspection</h2>

            {/* Category Toggle */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', marginBottom: '24px' }}>
              {(['Vehicles', 'Real Estate', 'Electronics', 'Heavy Machinery'] as IndustryCategory[]).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  style={{
                    padding: '10px',
                    borderRadius: '8px',
                    border: 'none',
                    background: category === cat ? '#0284c7' : '#1e293b',
                    color: '#fff',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Form */}
            <form onSubmit={handlePaymentSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '12px', color: '#94a3b8' }}>User / Business Email</label>
                <input type="email" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} style={{ width: '100%', padding: '10px', background: '#1e293b', border: '1px solid #334155', color: '#fff', borderRadius: '6px', marginTop: '4px' }} required />
              </div>
              <div>
                <label style={{ fontSize: '12px', color: '#94a3b8' }}>Asset Title / Model</label>
                <input type="text" value={itemName} onChange={(e) => setItemName(e.target.value)} style={{ width: '100%', padding: '10px', background: '#1e293b', border: '1px solid #334155', color: '#fff', borderRadius: '6px', marginTop: '4px' }} required />
              </div>
              <div>
                <label style={{ fontSize: '12px', color: '#94a3b8' }}>Serial No / Registration / Deed ID</label>
                <input type="text" value={identifierNo} onChange={(e) => setIdentifierNo(e.target.value)} style={{ width: '100%', padding: '10px', background: '#1e293b', border: '1px solid #334155', color: '#fff', borderRadius: '6px', marginTop: '4px' }} required />
              </div>
              <div>
                <label style={{ fontSize: '12px', color: '#94a3b8' }}>Declared Asset Market Value (₹)</label>
                <input type="number" value={declaredValue} onChange={(e) => setDeclaredValue(Number(e.target.value))} style={{ width: '100%', padding: '10px', background: '#1e293b', border: '1px solid #334155', color: '#fff', borderRadius: '6px', marginTop: '4px' }} required />
              </div>

              {/* Dynamic Fee Box */}
              <div style={{ gridColumn: 'span 2', background: '#1e293b', padding: '16px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ fontSize: '12px', color: '#94a3b8' }}>Calculated Audit Fee ({category === 'Electronics' ? '2%' : category === 'Real Estate' ? '0.5%' : '1%'})</p>
                  <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#38bdf8' }}>₹ {calculatedFee.toLocaleString()}</p>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  style={{ padding: '12px 24px', background: 'linear-gradient(135deg, #0284c7, #2563eb)', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
                >
                  {loading ? 'Processing...' : `Pay ₹ ${calculatedFee.toLocaleString()} via Razorpay →`}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* 2. FIELD AUDITOR CONSOLE */}
        {activeTab === 'auditor' && (
          <div style={{ background: '#0f172a', borderRadius: '16px', padding: '32px', border: '1px solid #1e293b' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '18px' }}>Auditor Verification Queue</h2>
              <button
                onClick={() => navigator.geolocation.getCurrentPosition((pos) => { setAuditorLat(pos.coords.latitude); setAuditorLng(pos.coords.longitude); })}
                style={{ padding: '8px 16px', background: '#1e293b', border: '1px solid #334155', color: '#38bdf8', borderRadius: '6px', fontSize: '12px', cursor: 'pointer' }}
              >
                📍 Lock Current Auditor Location
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {items.map((item, idx) => {
                const dist = (auditorLat && auditorLng && item.lat && item.lng) ? getDistance(auditorLat, auditorLng, item.lat, item.lng) : null;
                return (
                  <div key={idx} style={{ background: '#1e293b', padding: '20px', borderRadius: '12px', border: '1px solid #334155' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                      <div>
                        <span style={{ fontSize: '10px', background: '#0284c7', padding: '2px 8px', borderRadius: '4px', textTransform: 'uppercase', fontWeight: 'bold' }}>{item.category}</span>
                        <h3 style={{ fontSize: '16px', marginTop: '4px' }}>{item.item_name} ({item.identifier_no})</h3>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <p style={{ fontSize: '12px', color: '#22c55e', fontWeight: 'bold' }}>{item.payment_status}</p>
                        {dist && <p style={{ fontSize: '11px', color: '#94a3b8' }}>Distance: {dist} km</p>}
                      </div>
                    </div>

                    {/* Parameter Verification Controls */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginTop: '16px' }}>
                      {[1, 2, 3].map((pNum) => {
                        const status = pNum === 1 ? item.param1_status : pNum === 2 ? item.param2_status : item.param3_status;
                        return (
                          <div key={pNum} style={{ background: '#0f172a', padding: '12px', borderRadius: '8px' }}>
                            <p style={{ fontSize: '11px', color: '#94a3b8' }}>Check #{pNum}</p>
                            <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                              <button onClick={() => updateParamStatus(item, pNum, true)} style={{ flex: 1, padding: '4px', background: status === 'Pass' ? '#16a34a' : '#334155', border: 'none', color: '#fff', borderRadius: '4px', cursor: 'pointer', fontSize: '11px' }}>Pass</button>
                              <button onClick={() => updateParamStatus(item, pNum, false)} style={{ flex: 1, padding: '4px', background: status === 'Fail' ? '#dc2626' : '#334155', border: 'none', color: '#fff', borderRadius: '4px', cursor: 'pointer', fontSize: '11px' }}>Fail</button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 3. ADMIN DASHBOARD */}
        {activeTab === 'admin' && (
          <div style={{ background: '#0f172a', borderRadius: '16px', padding: '32px', border: '1px solid #1e293b' }}>
            <h2 style={{ fontSize: '18px', marginBottom: '20px' }}>Platform Financial Overview</h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
              <div style={{ background: '#1e293b', padding: '20px', borderRadius: '12px' }}>
                <p style={{ fontSize: '12px', color: '#94a3b8' }}>Gross Platform Revenue</p>
                <h3 style={{ fontSize: '24px', color: '#38bdf8', marginTop: '4px' }}>
                  ₹ {items.reduce((acc, curr) => acc + (curr.calculated_fee || 0), 0).toLocaleString()}
                </h3>
              </div>
              <div style={{ background: '#1e293b', padding: '20px', borderRadius: '12px' }}>
                <p style={{ fontSize: '12px', color: '#94a3b8' }}>Total Audits Requested</p>
                <h3 style={{ fontSize: '24px', color: '#fff', marginTop: '4px' }}>{items.length}</h3>
              </div>
              <div style={{ background: '#1e293b', padding: '20px', borderRadius: '12px' }}>
                <p style={{ fontSize: '12px', color: '#94a3b8' }}>Approved Rate</p>
                <h3 style={{ fontSize: '24px', color: '#22c55e', marginTop: '4px' }}>
                  {items.length ? Math.round((items.filter((i) => i.status === 'Verified & Approved').length / items.length) * 100) : 0}%
                </h3>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
