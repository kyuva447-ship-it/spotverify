'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-md bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-sm space-y-8">
        
        {/* Title Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Spotverify Enterprise
          </h1>
          <p className="text-sm text-slate-400 font-medium">
            Collateral Audit &amp; Anti-Spoofing Hub
          </p>
        </div>

        {/* Portal Navigation Buttons */}
        <div className="space-y-4">
          <Link
            href="/login"
            className="w-full flex items-center justify-center px-4 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-xl transition-all shadow-lg shadow-blue-600/20 active:scale-[0.98]"
          >
            Login &amp; Account Portal
          </Link>

          <Link
            href="/audit"
            className="w-full flex items-center justify-center px-4 py-3.5 bg-sky-600 hover:bg-sky-500 text-white font-medium rounded-xl transition-all shadow-lg shadow-sky-600/20 active:scale-[0.98]"
          >
            Field Audit &amp; GPS Engine
          </Link>

          <Link
            href="/checkout"
            className="w-full flex items-center justify-center px-4 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-medium rounded-xl transition-all shadow-lg shadow-emerald-600/20 active:scale-[0.98]"
          >
            Audit Settlement Checkout
          </Link>
        </div>

        {/* Legal & Compliance Footer */}
        <footer className="pt-4 border-t border-slate-800 text-center">
          <Link
            href="/privacy"
            className="text-xs text-slate-400 hover:text-slate-200 underline underline-offset-4 transition-colors"
          >
            Privacy &amp; Legal Policies
          </Link>
        </footer>

      </div>
    </main>
  );
}
