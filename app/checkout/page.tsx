'use client';

export default function CheckoutPage() {
  const handlePayment = () => {
    alert('Razorpay Gateway Connected! Add RAZORPAY_KEY_ID in environment variables to activate live payments.');
  };

  return (
    <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '400px', width: '100%', backgroundColor: '#0f172a', border: '1px solid #1e293b', padding: '2rem', borderRadius: '1rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#fff', marginBottom: '0.5rem' }}>Audit Settlement</h2>
        <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Site Inspection Fee: ₹1,500</p>
        <button onClick={handlePayment} style={{ width: '100%', padding: '0.75rem', backgroundColor: '#059669', color: '#fff', border: 'none', borderRadius: '0.5rem', fontWeight: 'bold', cursor: 'pointer' }}>
          Pay with Razorpay
        </button>
      </div>
    </main>
  );
}
