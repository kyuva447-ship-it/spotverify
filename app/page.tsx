'use client';

import React, { useState } from 'react';

interface CarListing {
  id: string;
  carName: string;
  regNumber: string;
  sellerName: string;
  price: string;
  status: 'Pending Verification' | 'Verified & Approved' | 'Rejected';
  trustScore: number;
  engineStatus: 'Pass' | 'Fail' | 'Pending';
  chassisStatus: 'Original' | 'Repaired' | 'Pending';
  odometerStatus: 'Genuine' | 'Tampered' | 'Pending';
  rcVerified: boolean;
  insuranceValid: boolean;
}

export default function SpotverifyCompletePlatform() {
  const [activeRole, setActiveRole] = useState<'seller' | 'verifier'>('seller');
  
  const [cars, setCars] = useState<CarListing[]>([
    {
      id: 'SV-101',
      carName: 'Maruti Suzuki Swift VXI',
      regNumber: 'KA-04-MB-1234',
      sellerName: 'Karthik Kumar',
      price: '₹ 6,50,000',
      status: 'Verified & Approved',
      trustScore: 94,
      engineStatus: 'Pass',
      chassisStatus: 'Original',
      odometerStatus: 'Genuine',
      rcVerified: true,
      insuranceValid: true,
    },
    {
      id: 'SV-102',
      carName: 'Hyundai Creta SX',
      regNumber: 'AP-03-CB-5678',
      sellerName: 'Suresh Reddy',
      price: '₹ 11,20,000',
      status: 'Pending Verification',
      trustScore: 0,
      engineStatus: 'Pending',
      chassisStatus: 'Pending',
      odometerStatus: 'Pending',
      rcVerified: false,
      insuranceValid: false,
    }
  ]);

  // Seller Form State
  const [carName, setCarName] = useState('');
  const [regNumber, setRegNumber] = useState('');
  const [sellerName, setSellerName] = useState('');
  const [price, setPrice] = useState('');

  // Seller Action
  const handleAddCar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!carName || !regNumber || !sellerName) return;

    const newCar: CarListing = {
      id: `SV-${Math.floor(100 + Math.random() * 900)}`,
      carName,
      regNumber: regNumber.toUpperCase(),
      sellerName,
      price: price ? `₹ ${price}` : '₹ Negotiable',
      status: 'Pending Verification',
      trustScore: 0,
      engineStatus: 'Pending',
      chassisStatus: 'Pending',
      odometerStatus: 'Pending',
      rcVerified: false,
      insuranceValid: false,
    };

    setCars([newCar, ...cars]);
    setCarName('');
    setRegNumber('');
    setSellerName('');
    setPrice('');
  };

  // Verifier Action
  const handleVerifyCar = (id: string, approve: boolean) => {
    setCars(cars.map(car => {
      if (car.id === id) {
        return {
          ...car,
          status: approve ? 'Verified & Approved' : 'Rejected',
          trustScore: approve ? 88 : 35,
          engineStatus: approve ? 'Pass' : 'Fail',
          chassisStatus: approve ? 'Original' : 'Repaired',
          odometerStatus: approve ? 'Genuine' : 'Tampered',
          rcVerified: approve,
          insuranceValid: approve,
        };
      }
      return car;
    }));
  };

  return (
    <>
      {/* HTML Favicon & Tab Metadata Injection */}
      <head>
        <title>Projects | Trust Verification Portal</title>
        <link rel="icon" href="https://supabase.com/favicon/favicon-32x32.png" type="image/png" />
      </head>

      <div style={{ backgroundColor: '#090d16', color: '#f8fafc', minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif' }}>
        
        {/* Navigation Bar */}
        <nav style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', padding: '16px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#0f172a' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img src="https://supabase.com/favicon/favicon-32x32.png" alt="Supabase Logo" style={{ width: '24px', height: '24px' }} />
            <span style={{ fontSize: '20px', fontWeight: '800', letterSpacing: '-0.5px' }}>
              SPOTVERIFY <span style={{ color: '#38bdf8', fontSize: '12px' }}>HUB</span>
            </span>
          </div>

          {/* Rapido Dual-Portal Role Selector */}
          <div style={{ background: '#1e293b', padding: '4px', borderRadius: '8px', display: 'flex', gap: '4px' }}>
            <button 
              onClick={() => setActiveRole('seller')}
              style={{ padding: '8px 16px', borderRadius: '6px', border: 'none', background: activeRole === 'seller' ? '#0284c7' : 'transparent', color: '#fff', fontWeight: '600', fontSize: '13px', cursor: 'pointer' }}>
              Seller Dashboard
            </button>
            <button 
              onClick={() => setActiveRole('verifier')}
              style={{ padding: '8px 16px', borderRadius: '6px', border: 'none', background: activeRole === 'verifier' ? '#16a34a' : 'transparent', color: '#fff', fontWeight: '600', fontSize: '13px', cursor: 'pointer' }}>
              Inspector / Verifier Portal
            </button>
          </div>
        </nav>

        <div style={{ maxWidth: '1200px', margin: '30px auto', padding: '0 20px' }}>
          
          {/* SELLER VIEW */}
          {activeRole === 'seller' && (
            <div style={{ display: 'grid', gridTemplateColumns: '360px 1fr', gap: '30px' }}>
              
              {/* Seller Registration Form */}
              <div style={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '20px' }}>
                <h2 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '15px' }}>Sell Your Vehicle</h2>
                <form onSubmit={handleAddCar} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <input type="text" placeholder="Vehicle Name & Model" value={carName} onChange={e => setCarName(e.target.value)} style={{ padding: '10px', background: '#1e293b', border: '1px solid #334155', color: '#fff', borderRadius: '6px' }} required />
                  <input type="text" placeholder="Reg Number (e.g. KA-01-AB-1234)" value={regNumber} onChange={e => setRegNumber(e.target.value)} style={{ padding: '10px', background: '#1e293b', border: '1px solid #334155', color: '#fff', borderRadius: '6px' }} required />
                  <input type="text" placeholder="Seller Name" value={sellerName} onChange={e => setSellerName(e.target.value)} style={{ padding: '10px', background: '#1e293b', border: '1px solid #334155', color: '#fff', borderRadius: '6px' }} required />
                  <input type="text" placeholder="Expected Price (₹)" value={price} onChange={e => setPrice(e.target.value)} style={{ padding: '10px', background: '#1e293b', border: '1px solid #334155', color: '#fff', borderRadius: '6px' }} />
                  <button type="submit" style={{ padding: '12px', background: '#0284c7', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: '700', cursor: 'pointer' }}>Submit For Inspection</button>
                </form>
              </div>

              {/* Seller Inventory List */}
              <div style={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '20px' }}>
                <h2 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '15px' }}>My Listed Vehicles</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {cars.map(c => (
                    <div key={c.id} style={{ background: '#1e293b', padding: '16px', borderRadius: '8px', border: '1px solid #334155', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <h3 style={{ margin: 0, fontSize: '16px' }}>{c.carName}</h3>
                        <p style={{ margin: '4px 0', fontSize: '13px', color: '#94a3b8' }}>Reg: {c.regNumber} | Price: {c.price}</p>
                        <span style={{ fontSize: '11px', padding: '2px 8px', borderRadius: '4px', background: c.status === 'Verified & Approved' ? '#166534' : c.status === 'Rejected' ? '#991b1b' : '#854d0e', color: '#fff' }}>
                          {c.status}
                        </span>
                      </div>
                      {c.trustScore > 0 && (
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontSize: '20px', fontWeight: '800', color: '#38bdf8' }}>{c.trustScore}/100</div>
                          <span style={{ fontSize: '11px', color: '#94a3b8' }}>Trust Score</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* VERIFIER / INSPECTOR VIEW */}
          {activeRole === 'verifier' && (
            <div style={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '20px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '15px', color: '#22c55e' }}>Field Verifier Audit Console</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {cars.map(car => (
                  <div key={car.id} style={{ background: '#1e293b', border: '1px solid #334155', padding: '20px', borderRadius: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <div>
                        <h3 style={{ margin: 0, fontSize: '18px' }}>{car.carName} <span style={{ fontSize: '12px', color: '#94a3b8' }}>({car.id})</span></h3>
                        <p style={{ margin: '2px 0', fontSize: '13px', color: '#cbd5e1' }}>Reg No: {car.regNumber} | Seller: {car.sellerName}</p>
                      </div>
                      <span style={{ padding: '4px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold', background: car.status === 'Verified & Approved' ? '#16a34a' : car.status === 'Rejected' ? '#dc2626' : '#d97706', color: '#fff' }}>
                        Status: {car.status}
                      </span>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', background: '#0f172a', padding: '12px', borderRadius: '6px', fontSize: '12px', marginBottom: '15px' }}>
                      <div>Engine Check: <strong>{car.engineStatus}</strong></div>
                      <div>Chassis: <strong>{car.chassisStatus}</strong></div>
                      <div>Odometer: <strong>{car.odometerStatus}</strong></div>
                      <div>RC & Insurance: <strong>{car.rcVerified ? 'Verified' : 'Pending'}</strong></div>
                    </div>

                    {car.status === 'Pending Verification' && (
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <button onClick={() => handleVerifyCar(car.id, true)} style={{ flex: 1, padding: '10px', background: '#16a34a', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
                          ✓ Approve Vehicle & Issue Trust Score
                        </button>
                        <button onClick={() => handleVerifyCar(car.id, false)} style={{ flex: 1, padding: '10px', background: '#dc2626', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
                          ✕ Reject (Fraud Risk)
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
}
