// File: app/privacy/page.tsx (or app/terms/page.tsx)

import React from 'react';

export default function CompliancePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-12 max-w-4xl mx-auto space-y-10">
      
      {/* Header */}
      <header className="border-b border-slate-800 pb-6">
        <h1 className="text-3xl font-bold tracking-tight">Spotverify Compliance & Legal Policies</h1>
        <p className="text-slate-400 text-sm mt-1">Last Updated: September 3, 2026</p>
      </header>

      {/* 1. Contact Us */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-blue-400">1. Contact Us</h2>
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-lg space-y-2 text-sm text-slate-300">
          <p><strong>Business Name:</strong> Spotverify Enterprise</p>
          <p><strong>Support Email:</strong> spotverify992@gmail.com</p>
          <p><strong>Phone:</strong> +91 8247831885</p>
          <p><strong>Operating Address:</strong> 58, 7th Main Road, GB Palya, Bengaluru, Karnataka, India</p>
        </div>
      </section>

      {/* 2. Privacy Policy */}
      <section className="space-y-3 text-slate-300 text-sm leading-relaxed">
        <h2 className="text-xl font-semibold text-blue-400">2. Privacy Policy</h2>
        <p>
          Spotverify (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) operates a B2B Software-as-a-Service (SaaS) field audit and anti-spoofing management engine. This policy describes how we collect and manage user data.
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Data Collected:</strong> Name, email address, phone number, real-time GPS coordinates, site inspection photographs, and cryptographic hashes (SHA-256).</li>
          <li><strong>Data Usage:</strong> Collected data is strictly used for verifying site audits, preventing GPS spoofing, and processing task settlements.</li>
          <li><strong>Data Protection:</strong> We employ end-to-end Row-Level Security (RLS) policies and encrypted database storage to protect all audit logs.</li>
        </ul>
      </section>

      {/* 3. Terms & Conditions */}
      <section className="space-y-3 text-slate-300 text-sm leading-relaxed">
        <h2 className="text-xl font-semibold text-blue-400">3. Terms &amp; Conditions</h2>
        <p>
          Spotverify is an enterprise IT software solution designed for field workforce audit management. We do not operate as an e-commerce store, real estate listing platform, or reseller of physical goods.
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Auditors must capture true and untampered GPS/photo metadata during submissions.</li>
          <li>Attempts to spoof coordinates or alter digital signatures will result in immediate termination of platform access.</li>
        </ul>
      </section>

      {/* 4. Refund & Cancellation Policy */}
      <section className="space-y-3 text-slate-300 text-sm leading-relaxed">
        <h2 className="text-xl font-semibold text-blue-400">4. Refund &amp; Cancellation Policy</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Software Settlements:</strong> Charges incurred for completed and verified field audit settlements are final and non-refundable.</li>
          <li><strong>Billing Errors:</strong> In cases of double billing or technical transaction failures, refunds will be processed to the original payment method within 5–7 business days upon reaching out to spotverify992@gmail.com.</li>
        </ul>
      </section>

    </div>
  );
}
