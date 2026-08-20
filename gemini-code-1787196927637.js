'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import FileUploader from '@/components/FileUploader'

export default function DashboardPage() {
  const supabase = createClient()
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [view, setView] = useState<'buyer' | 'verifier' | 'admin'>('buyer')
  const [tasks, setTasks] = useState<any[]>([])
  
  const [title, setTitle] = useState('Used Car Verification (₹5,00,000)')
  const [amount, setAmount] = useState(500000)
  const [location, setLocation] = useState('Koramangala, Bengaluru')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    initSession()
  }, [])

  async function initSession() {
    const { data: { session } } = await supabase.auth.getSession()
    if (session?.user) {
      setUser(session.user)
      const { data } = await supabase.from('profiles').select('*').eq('id', session.user.id).single()
      if (data) setProfile(data)
      fetchTasks()
    }
  }

  async function fetchTasks() {
    const { data } = await supabase.from('tasks').select('*').order('created_at', { ascending: false })
    if (data) setTasks(data)
  }

  async function handleCreateTask(e: React.FormEvent) {
    e.preventDefault()
    if (!user) return alert('Please log in.')
    setLoading(true)

    const platformFee = amount * 0.015
    const escrowPrincipal = amount - platformFee

    const { data: taskData, error } = await supabase
      .from('tasks')
      .insert([{ 
        title, 
        amount: Number(amount), 
        platform_fee: platformFee,
        escrow_principal: escrowPrincipal,
        location, 
        buyer_id: user.id, 
        status: 'created' 
      }])
      .select()
      .single()

    if (error || !taskData) {
      alert('Error creating task.')
      setLoading(false)
      return
    }

    const res = await fetch('/api/create-order', {
      method: 'POST',
      body: JSON.stringify({ amount, taskId: taskData.id }),
    })
    const orderData = await res.json()

    await supabase.from('tasks').update({ razorpay_order_id: orderData.orderId }).eq('id', taskData.id)

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: orderData.amount,
      currency: 'INR',
      name: 'SpotVerify Escrow',
      description: 'Automated 1.5% Split & Secure Hold',
      order_id: orderData.orderId,
      handler: async function () {
        await supabase.from('tasks').update({ status: 'funded' }).eq('id', taskData.id)
        alert('Escrow funded successfully! Funds locked.')
        fetchTasks()
      },
      theme: { color: '#F59E0B' }
    }

    const rzp = new (window as any).Razorpay(options)
    rzp.open()
    setLoading(false)
  }

  async function handleReleaseFunds(taskId: string) {
    if (!confirm('Release escrow funds to seller?')) return
    await supabase.from('tasks').update({ status: 'released' }).eq('id', taskId)
    fetchTasks()
  }

  if (!user) {
    return (
      <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6">
        <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl max-w-md w-full text-center space-y-4">
          <h1 className="text-2xl font-black text-amber-400">SpotVerify Access</h1>
          <p className="text-xs text-slate-400">Please sign in to access secure escrow records.</p>
          <a href="/" className="block w-full py-3 bg-amber-500 text-black font-extrabold rounded-xl">Go to Sign In</a>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 flex flex-col justify-between">
      <div className="max-w-4xl mx-auto w-full space-y-8">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-800 pb-4 gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-amber-400">SpotVerify Platform</h1>
            <p className="text-xs text-slate-400">User: <span className="text-amber-300">{profile?.full_name || user.email}</span></p>
          </div>
          <div className="flex space-x-2">
            <button onClick={() => setView('buyer')} className={`px-3 py-1.5 rounded-lg text-xs font-bold ${view === 'buyer' ? 'bg-amber-500 text-black' : 'bg-slate-900 text-slate-300'}`}>Buyer View</button>
            <button onClick={() => setView('verifier')} className={`px-3 py-1.5 rounded-lg text-xs font-bold ${view === 'verifier' ? 'bg-amber-500 text-black' : 'bg-slate-900 text-slate-300'}`}>Verifier Portal</button>
          </div>
        </div>

        {view === 'buyer' && (
          <div className="grid md:grid-cols-2 gap-8">
            <form onSubmit={handleCreateTask} className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
              <h2 className="text-lg font-bold text-amber-400">Create Escrow Task</h2>
              <div>
                <label className="text-xs text-slate-400 uppercase font-semibold">Title</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full mt-1 p-3 bg-slate-800 rounded-xl border border-slate-700 text-sm" required />
              </div>
              <div>
                <label className="text-xs text-slate-400 uppercase font-semibold">Amount (₹)</label>
                <input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} className="w-full mt-1 p-3 bg-slate-800 rounded-xl border border-slate-700 text-sm" required />
              </div>
              <div>
                <label className="text-xs text-slate-400 uppercase font-semibold">Location</label>
                <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} className="w-full mt-1 p-3 bg-slate-800 rounded-xl border border-slate-700 text-sm" required />
              </div>
              <button type="submit" disabled={loading} className="w-full py-3.5 bg-amber-500 text-black font-extrabold rounded-xl text-sm shadow-lg">
                {loading ? 'Processing...' : `Fund ₹${amount.toLocaleString()} (Escrow)`}
              </button>
            </form>

            <div className="space-y-4">
              <h2 className="text-lg font-bold">Ledger</h2>
              {tasks.map((task) => (
                <div key={task.id} className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex justify-between font-bold text-sm">
                    <span>{task.title}</span>
                    <span className="text-amber-400">₹{task.amount?.toLocaleString()}</span>
                  </div>
                  <p className="text-xs text-slate-400">📍 {task.location}</p>
                  {task.proof_image_url && (
                    <a href={task.proof_image_url} target="_blank" rel="noreferrer" className="text-xs text-amber-400 underline block">
                      View Proof Photo ↗
                    </a>
                  )}
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 font-bold uppercase tracking-wider text-amber-300">
                      {task.status}
                    </span>
                    {task.status === 'verified' && (
                      <button onClick={() => handleReleaseFunds(task.id)} className="px-3 py-1.5 bg-emerald-500 text-black font-bold text-xs rounded-lg">
                        Release Escrow
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {view === 'verifier' && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-amber-400">Verifier Field Portal</h2>
            {tasks.map((task) => (
              <div key={task.id} className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-sm">{task.title}</h3>
                  <p className="text-xs text-slate-400">Location: {task.location} | State: <span className="text-amber-400">{task.status}</span></p>
                </div>
                {task.status === 'funded' && (
                  <FileUploader taskId={task.id} onComplete={fetchTasks} />
                )}
              </div>
            ))}
          </div>
        )}

      </div>

      <footer className="max-w-4xl mx-auto w-full mt-12 pt-4 border-t border-slate-900 text-center text-[11px] text-slate-500">
        <p>&copy; 2026 SpotVerify Technologies India Pvt Ltd. All rights reserved.</p>
      </footer>
    </main>
  )
}