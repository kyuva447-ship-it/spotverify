'use client';

import React, { useState } from 'react';

interface VerificationCase {
  id: string;
  applicantName: string;
  licenseNumber: string;
  status: 'Pending' | 'Approved' | 'Denied';
  submittedDate: string;
}

export default function SpotverifyDashboard() {
  const [cases, setCases] = useState<VerificationCase[]>([
    { id: 'VAL-1001', applicantName: 'Rahul Sharma', licenseNumber: 'KA-04-2023-1234567', status: 'Pending', submittedDate: '2026-08-20' },
    { id: 'VAL-1002', applicantName: 'Priya Patel', licenseNumber: 'MH-12-2022-9876543', status: 'Pending', submittedDate: '2026-08-20' },
  ]);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleAction = (id: string, newStatus: 'Approved' | 'Denied') => {
    setCases(cases.map(c => c.id === id ? { ...c, status: newStatus } : c));
  };

  const handleSelfieUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <main style={{ padding: '30px', fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif', backgroundColor: '#f4f6f9', minHeight: '100vh' }}>
      <header style={{ marginBottom: '30px', borderBottom: '2px solid #ddd', paddingBottom: '15px' }}>
        <h1 style={{ color: '#2c3e50', margin: '0 0 10px 0' }}>Spotverify - Fraud & License Verification Dashboard</h1>
        <p style={{ color: '#7f8c8d', margin: 0 }}>Senior Consultant Control Panel | Secure Verification System</p>
      </header>

      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px' }}>
        <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h2 style={{ fontSize: '18px', color: '#34495e', marginBottom: '15px' }}>Selfie & Identity Verification</h2>
          <input type="file" accept="image/*" onChange={handleSelfieUpload} style={{ marginBottom: '15px' }} />
          {selectedImage && (
            <div>
              <p style={{ fontSize: '14px', color: '#27ae60' }}>Selfie Uploaded Successfully for Verification:</p>
              <img src={selectedImage} alt="Uploaded Selfie" style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '50%', border: '2px solid #3498db' }} />
            </div>
          )}
        </div>

        <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h2 style={{ fontSize: '18px', color: '#34495e', marginBottom: '15px' }}>System Metrics</h2>
          <p style={{ margin: '5px 0' }}>Total Pending Cases: <strong>{cases.filter(c => c.status === 'Pending').length}</strong></p>
          <p style={{ margin: '5px 0' }}>Fraud Check Status: <span style={{ color: '#27ae60', fontWeight: 'bold' }}>Active & Secure</span></p>
        </div>
      </section>

      <section style={{ background: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <h2 style={{ fontSize: '18px', color: '#34495e', marginBottom: '15px' }}>Driver License & Fraud Verifications (Escalations)</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: '#ecf0f1', color: '#2c3e50' }}>
              <th style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>Case ID</th>
              <th style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>Applicant Name</th>
              <th style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>License Number</th>
              <th style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>Status</th>
              <th style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cases.map((item) => (
              <tr key={item.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '12px' }}>{item.id}</td>
                <td style={{ padding: '12px' }}>{item.applicantName}</td>
                <td style={{ padding: '12px' }}>{item.licenseNumber}</td>
                <td style={{ padding: '12px' }}>
                  <span style={{
                    padding: '5px 10px',
                    borderRadius: '4px',
                    color: '#fff',
                    backgroundColor: item.status === 'Approved' ? '#27ae60' : item.status === 'Denied' ? '#c0392b' : '#f39c12',
                    fontSize: '12px'
                  }}>
                    {item.status}
                  </span>
                </td>
                <td style={{ padding: '12px' }}>
                  <button 
                    onClick={() => handleAction(item.id, 'Approved')}
                    style={{ marginRight: '8px', padding: '6px 12px', background: '#27ae60', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                    Approve
                  </button>
                  <button 
                    onClick={() => handleAction(item.id, 'Denied')}
                    style={{ padding: '6px 12px', background: '#c0392b', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                    Deny
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}
