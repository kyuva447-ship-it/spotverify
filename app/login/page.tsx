'use client';
import { useState } from 'react';
import { createBrowserClient } from '@supabase/ssr';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'auditor' | 'client'>('auditor');
  const [isSignUp, setIsSignUp] = useState(false);
  const [msg, setMsg] = useState('');

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg('Processing...');

    if (isSignUp) {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { role, full_name: email.split('@')[0] } }
      });
      setMsg(error ? error.message : 'Account created! Check your email for verification.');
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      setMsg(error ? error.message : 'Logged in successfully!');
    }
  };

  return (
    <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem', fontFamily: 'sans-serif' }}>
      <form onSubmit={handleAuth} style={{ maxWidth: '400px', width: '100%', backgroundColor: '#0f172a', border: '1px solid #1e293b', padding: '2rem', borderRadius: '1rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#fff' }}>
          {isSignUp ? 'Create Account' : 'Login to Spotverify'}
        </h2>
        
        {isSignUp && (
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.25rem' }}>Role</label>
            <select value={role} onChange={(e) => setRole(e.target.value as any)} style={{ width: '100%', padding: '0.75rem', backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '0.5rem', color: '#fff' }}>
              <option value="auditor">Field Auditor</option>
              <option value="client">Client / Lender</option>
            </select>
          </div>
        )}

        <div style={{ marginBottom: '1rem' }}>
          <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: '100%', padding: '0.75rem', backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '0.5rem', color: '#fff', boxSizing: 'border-box' }} />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ width: '100%', padding: '0.75rem', backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '0.5rem', color: '#fff', boxSizing: 'border-box' }} />
        </div>

        <button type="submit" style={{ width: '100%', padding: '0.75rem', backgroundColor: '#2563eb', color: '#fff', border: 'none', borderRadius: '0.5rem', fontWeight: 'bold', cursor: 'pointer' }}>
          {isSignUp ? 'Sign Up' : 'Sign In'}
        </button>

        <button type="button" onClick={() => setIsSignUp(!isSignUp)} style={{ width: '100%', marginTop: '1rem', background: 'none', border: 'none', color: '#94a3b8', fontSize: '0.8rem', cursor: 'pointer' }}>
          {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
        </button>

        {msg && <p style={{ fontSize: '0.8rem', textAlign: 'center', color: '#38bdf8', marginTop: '1rem' }}>{msg}</p>}
      </form>
    </main>
  );
}
