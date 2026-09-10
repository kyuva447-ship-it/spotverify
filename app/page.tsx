'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  MapPin,
  Coffee,
  Utensils,
  Scissors,
  Stethoscope,
  Dumbbell,
  Wrench,
  Building2,
  Car,
  ShieldCheck,
  Star,
  Phone,
  MessageSquare,
  Wallet,
  ArrowDownLeft,
  ArrowUpRight,
  ShieldAlert,
  Menu,
  X,
  CheckCircle2,
  TrendingUp,
  AlertCircle,
  Clock,
  Plus
} from 'lucide-react';

// ==========================================
// 1. TYPO-TOLERANT & NATURAL SEARCH UTILS
// ==========================================
const DICTIONARY: Record<string, string> = {
  te: 'tea',
  tee: 'tea',
  chai: 'tea',
  saloon: 'salon',
  clinc: 'clinic',
  docter: 'doctor',
  restarent: 'restaurant',
  resturant: 'restaurant',
  gymn: 'gym',
  dentar: 'dentist',
  plumberr: 'plumber',
};

function parseSearchQuery(query: string) {
  let normalized = query.toLowerCase().trim();

  // Replace typos dynamically
  const words = normalized.split(/\s+/).map((word) => DICTIONARY[word] || word);
  normalized = words.join(' ');

  // Extract Pincode
  const pincodeMatch = normalized.match(/\b\d{6}\b/);
  const pincode = pincodeMatch ? pincodeMatch[0] : null;

  // Extract Location Intent ("near me" or "in [Location]")
  let locationTerm = '';
  if (normalized.includes('near me')) {
    normalized = normalized.replace('near me', '').trim();
  } else if (normalized.includes(' in ')) {
    const parts = normalized.split(' in ');
    normalized = parts[0].trim();
    locationTerm = parts[1] ? parts[1].trim() : '';
  }

  return {
    parsedKeyword: normalized,
    pincode,
    locationTerm,
  };
}

// ==========================================
// 2. MOCK DATABASE & SEED DATA
// ==========================================
interface Business {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  phone: string;
  whatsapp: string;
  address: string;
  city: string;
  area: string;
  pincode: string;
  lat: number;
  lng: number;
  is_verified: boolean;
  rating_avg: number;
  rating_count: number;
  price_tier: string;
}

const INITIAL_BUSINESSES: Business[] = [
  {
    id: 'biz-1',
    name: 'Sharma Tea Stall & Tiffin',
    slug: 'sharma-tea-stall',
    category: 'Tea & Snacks',
    description: 'Authentic Masala Chai, Samosas, and fresh morning snacks. Serving local tea lovers since 2012.',
    phone: '9876543210',
    whatsapp: '9876543210',
    address: 'Shop #4, Koramangala 5th Block',
    city: 'Bengaluru',
    area: 'Koramangala',
    pincode: '560001',
    lat: 12.9352,
    lng: 77.6245,
    is_verified: true,
    rating_avg: 4.8,
    rating_count: 124,
    price_tier: '₹10 - ₹100',
  },
  {
    id: 'biz-2',
    name: 'Apollo Dental Care Clinic',
    slug: 'apollo-dental-care',
    category: 'Clinics & Dentists',
    description: 'Complete family dental health, root canal treatment, teeth whitening, and braces by certified specialists.',
    phone: '9812345678',
    whatsapp: '9812345678',
    address: '100 Feet Road, Indiranagar',
    city: 'Bengaluru',
    area: 'Indiranagar',
    pincode: '560038',
    lat: 12.9784,
    lng: 77.6408,
    is_verified: true,
    rating_avg: 4.9,
    rating_count: 89,
    price_tier: '₹500 - ₹2,000',
  },
  {
    id: 'biz-3',
    name: 'Green Leaf Multi-Cuisine Restaurant',
    slug: 'green-leaf-restaurant',
    category: 'Restaurants',
    description: 'Pure Vegetarian South and North Indian Thalis, Biryani, and fresh juices.',
    phone: '9765432109',
    whatsapp: '9765432109',
    address: 'Main Road, Madanapalle',
    city: 'Madanapalle',
    area: 'Town Center',
    pincode: '517325',
    lat: 13.5503,
    lng: 78.5026,
    is_verified: true,
    rating_avg: 4.6,
    rating_count: 210,
    price_tier: '₹150 - ₹400',
  },
  {
    id: 'biz-4',
    name: 'QuickFix Mobile & Laptop Repair',
    slug: 'quickfix-mobile-repair',
    category: 'Mobile Repair',
    description: 'Instant screen replacement, battery replacement, motherboard diagnostics, and accessories.',
    phone: '9123456789',
    whatsapp: '9123456789',
    address: 'MG Road, Near Bus Stand',
    city: 'Bengaluru',
    area: 'MG Road',
    pincode: '560001',
    lat: 12.9716,
    lng: 77.5946,
    is_verified: false,
    rating_avg: 4.3,
    rating_count: 45,
    price_tier: '₹200 - ₹3,000',
  },
];

const CATEGORIES = [
  { name: 'Tea & Snacks', icon: Coffee, color: 'bg-amber-100 text-amber-700' },
  { name: 'Restaurants', icon: Utensils, color: 'bg-rose-100 text-rose-700' },
  { name: 'Salons & Beauty', icon: Scissors, color: 'bg-pink-100 text-pink-700' },
  { name: 'Clinics & Dentists', icon: Stethoscope, color: 'bg-blue-100 text-blue-700' },
  { name: 'Gyms & Fitness', icon: Dumbbell, color: 'bg-purple-100 text-purple-700' },
  { name: 'Plumbers & Repairs', icon: Wrench, color: 'bg-emerald-100 text-emerald-700' },
  { name: 'PG & Hostels', icon: Building2, color: 'bg-indigo-100 text-indigo-700' },
  { name: 'Auto & Car Care', icon: Car, color: 'bg-cyan-100 text-cyan-700' },
];

// ==========================================
// 3. PROVIDER-INDEPENDENT MAP COMPONENT
// ==========================================
function OpenStreetMap({ lat, lng, name }: { lat: number; lng: number; name: string }) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !mapRef.current) return;

    // Inject Leaflet CSS dynamically
    if (!document.getElementById('leaflet-css')) {
      const link = document.createElement('link');
      link.id = 'leaflet-css';
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);
    }

    // Inject Leaflet JS dynamically
    const loadScript = () => {
      const L = (window as any).L;
      if (!L || !mapRef.current) return;

      // Reset map container if initialized
      (mapRef.current as any)._leaflet_id = null;

      const map = L.map(mapRef.current).setView([lat, lng], 15);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(map);

      L.marker([lat, lng]).addTo(map).bindPopup(name).openPopup();
    };

    if ((window as any).L) {
      loadScript();
    } else {
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.async = true;
      script.onload = loadScript;
      document.body.appendChild(script);
    }
  }, [lat, lng, name]);

  return (
    <div className="w-full h-64 rounded-2xl overflow-hidden border border-gray-200 shadow-inner relative">
      <div ref={mapRef} className="w-full h-full bg-slate-100 flex items-center justify-center text-xs text-gray-400">
        Loading OpenStreetMap...
      </div>
    </div>
  );
}

// ==========================================
// 4. MAIN APPLICATION COMPONENT
// ==========================================
export default function NearMeIndiaApp() {
  const [currentView, setCurrentView] = useState<'home' | 'search' | 'detail' | 'dashboard' | 'pricing' | 'register'>('home');
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null);
  
  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [searchLoc, setSearchLoc] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [parsedInfo, setParsedInfo] = useState<{ parsedKeyword: string; pincode: string | null; locationTerm: string } | null>(null);

  // Business Wallet State (₹299/mo + Lead Engine)
  const [walletBalance, setWalletBalance] = useState(250.00);
  const [transactions, setTransactions] = useState([
    { id: 'tx_101', type: 'credit', amount: 300.00, desc: 'Initial Wallet Recharge', date: '2026-09-01' },
    { id: 'tx_102', type: 'debit', amount: 15.00, desc: 'Lead Charge (Qualified Value > ₹100)', date: '2026-09-08' },
  ]);
  const [leads, setLeads] = useState<any[]>([
    { id: 'ld_1', name: 'Ramesh Kumar', phone: '9876001122', source: 'call', val: 50, status: 'New', charged: 0, date: '10 mins ago' },
    { id: 'ld_2', name: 'Ananya Sharma', phone: '9811223344', source: 'whatsapp', val: 450, status: 'Interested', charged: 15, date: '1 hour ago' },
  ]);

  // Lead Generation Logic
  const handleLeadAction = (business: Business, source: 'call' | 'whatsapp', estimatedValue: number = 50) => {
    // Exact Pricing Rules:
    // Value ₹10-₹100 = INCLUDED (0 charge)
    // Value > ₹100 = SEPARATE LEAD CHARGE (Admin Configured e.g. ₹15)
    const minQualifying = 100;
    const adminLeadFee = 15.00;
    
    let isCharged = false;
    let feeApplied = 0;

    if (estimatedValue > minQualifying) {
      if (walletBalance >= adminLeadFee) {
        setWalletBalance((prev) => prev - adminLeadFee);
        feeApplied = adminLeadFee;
        isCharged = true;

        setTransactions((prev) => [
          {
            id: `tx_${Date.now()}`,
            type: 'debit',
            amount: adminLeadFee,
            desc: `Lead Charge: ${source.toUpperCase()} inquiry (>₹100 value)`,
            date: new Date().toISOString().split('T')[0],
          },
          ...prev,
        ]);
      }
    }

    setLeads((prev) => [
      {
        id: `ld_${Date.now()}`,
        name: 'Guest Customer',
        phone: 'Verified Contact',
        source,
        val: estimatedValue,
        status: 'New',
        charged: feeApplied,
        date: 'Just now',
      },
      ...prev,
    ]);

    if (source === 'call') {
      window.location.href = `tel:${business.phone}`;
    } else {
      window.open(`https://wa.me/91${business.whatsapp}?text=Hi%20${encodeURIComponent(business.name)},%20found%20you%20on%20NearMe%20India`, '_blank');
    }
  };

  // Search Submit Handler
  const executeSearch = (q: string = searchQuery, loc: string = searchLoc, cat: string | null = activeCategory) => {
    const parsed = parseSearchQuery(q);
    setParsedInfo(parsed);
    setActiveCategory(cat);
    setCurrentView('search');
  };

  // Filter Businesses
  const filteredBusinesses = INITIAL_BUSINESSES.filter((b) => {
    const matchesCategory = activeCategory ? b.category.toLowerCase().includes(activeCategory.toLowerCase()) : true;
    
    if (!parsedInfo) return matchesCategory;

    const matchName = b.name.toLowerCase().includes(parsedInfo.parsedKeyword);
    const matchCat = b.category.toLowerCase().includes(parsedInfo.parsedKeyword);
    const matchCity = parsedInfo.locationTerm ? b.city.toLowerCase().includes(parsedInfo.locationTerm.toLowerCase()) || b.area.toLowerCase().includes(parsedInfo.locationTerm.toLowerCase()) : true;
    const matchPincode = parsedInfo.pincode ? b.pincode === parsedInfo.pincode : true;

    return (matchName || matchCat) && matchCity && matchPincode && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
      {/* NAVIGATION BAR */}
      <nav className="bg-white border-b border-slate-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <button
              onClick={() => {
                setCurrentView('home');
                setSearchQuery('');
                setActiveCategory(null);
              }}
              className="flex items-center gap-2 focus:outline-none"
            >
              <span className="bg-gradient-to-r from-orange-500 via-amber-500 to-emerald-600 text-white font-black px-3 py-1.5 rounded-xl text-xl tracking-tight shadow-md">
                NearMe
              </span>
              <span className="text-xl font-bold text-slate-900 tracking-wide">INDIA</span>
            </button>

            <div className="hidden md:flex items-center space-x-6">
              <button
                onClick={() => executeSearch()}
                className={`font-semibold text-sm transition ${currentView === 'search' ? 'text-orange-600' : 'text-slate-600 hover:text-orange-600'}`}
              >
                Explore Businesses
              </button>
              <button
                onClick={() => setCurrentView('pricing')}
                className="text-emerald-700 font-bold text-xs bg-emerald-50 px-3 py-2 rounded-full hover:bg-emerald-100 transition border border-emerald-200"
              >
                For Business (₹299/mo)
              </button>
              <button
                onClick={() => setCurrentView('dashboard')}
                className={`font-semibold text-sm px-4 py-2 rounded-xl transition ${currentView === 'dashboard' ? 'bg-slate-900 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-800'}`}
              >
                Owner Dashboard
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ==========================================
          VIEW 1: HOMEPAGE
      ========================================== */}
      {currentView === 'home' && (
        <main className="flex-1">
          {/* Hero Header */}
          <section className="bg-gradient-to-b from-orange-500 via-amber-500 to-slate-900 text-white pt-16 pb-24 px-4 text-center relative">
            <div className="max-w-4xl mx-auto space-y-6">
              <span className="inline-block bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-extrabold tracking-wider text-orange-100 uppercase border border-white/20">
                India's Local Discovery Platform
              </span>
              <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight">
                Find Any Business Near You. <br />
                <span className="text-amber-300">Fast. Direct. Verified.</span>
              </h1>
              <p className="text-base sm:text-lg text-orange-100 max-w-2xl mx-auto font-medium">
                From tea stalls and Kirana stores to top dentists, salons, and repair shops across India.
              </p>

              {/* Search Box */}
              <div className="pt-4 flex justify-center">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    executeSearch();
                  }}
                  className="w-full max-w-3xl bg-white p-2 sm:p-3 rounded-2xl shadow-2xl border border-gray-100 flex flex-col sm:flex-row gap-2 text-slate-800"
                >
                  <div className="flex-1 flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-xl">
                    <Search className="w-5 h-5 text-orange-500 shrink-0" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="tea shop, dentist, salon, plumber..."
                      className="w-full bg-transparent text-sm sm:text-base font-semibold focus:outline-none placeholder-slate-400"
                    />
                  </div>
                  <div className="flex-1 flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-xl">
                    <MapPin className="w-5 h-5 text-emerald-600 shrink-0" />
                    <input
                      type="text"
                      value={searchLoc}
                      onChange={(e) => setSearchLoc(e.target.value)}
                      placeholder="Bengaluru, 560001, or Area"
                      className="w-full bg-transparent text-sm sm:text-base font-semibold focus:outline-none placeholder-slate-400"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-orange-500 hover:bg-orange-600 text-white font-extrabold px-8 py-3 rounded-xl transition shadow-md active:scale-95"
                  >
                    Search
                  </button>
                </form>
              </div>

              {/* Quick Query Chips */}
              <div className="pt-2 flex flex-wrap justify-center items-center gap-2 text-xs text-orange-100">
                <span className="font-bold text-white">Try searching:</span>
                <button onClick={() => { setSearchQuery('tea shop'); executeSearch('tea shop'); }} className="bg-white/10 hover:bg-white/20 px-3 py-1 rounded-full border border-white/10">tea shop near me</button>
                <button onClick={() => { setSearchQuery('dentist'); setSearchLoc('Bengaluru'); executeSearch('dentist', 'Bengaluru'); }} className="bg-white/10 hover:bg-white/20 px-3 py-1 rounded-full border border-white/10">dentist in Bengaluru</button>
                <button onClick={() => { setSearchQuery('saloon'); executeSearch('saloon'); }} className="bg-white/10 hover:bg-white/20 px-3 py-1 rounded-full border border-white/10">saloon (typo test)</button>
              </div>
            </div>
          </section>

          {/* Categories Grid */}
          <section className="max-w-7xl mx-auto px-4 -mt-10 relative z-10 mb-16">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-100">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-6">Popular Categories</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {CATEGORIES.map((cat) => {
                  const IconComp = cat.icon;
                  return (
                    <button
                      key={cat.name}
                      onClick={() => executeSearch('', '', cat.name)}
                      className="p-4 rounded-2xl border border-slate-100 hover:border-orange-200 hover:shadow-md transition flex flex-col items-center text-center group"
                    >
                      <div className={`p-3 rounded-2xl ${cat.color} group-hover:scale-110 transition`}>
                        <IconComp className="w-6 h-6" />
                      </div>
                      <span className="mt-3 font-bold text-xs sm:text-sm text-slate-800 group-hover:text-orange-600 transition">
                        {cat.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Business Pitch Banner */}
          <section className="max-w-7xl mx-auto px-4 mb-16">
            <div className="bg-gradient-to-r from-slate-900 to-emerald-950 rounded-3xl p-8 sm:p-12 text-white flex flex-col lg:flex-row items-center justify-between gap-8 shadow-xl">
              <div className="space-y-4 max-w-2xl">
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold px-3 py-1 rounded-full text-xs">
                  Empowering Small & Local Shops Across India
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                  Grow Your Local Business for ₹299/month
                </h2>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Tea stalls, Kirana shops, repair centers, salons, and clinics. Get verified, receive direct WhatsApp/Call leads, and track customer analytics transparently.
                </p>
                <div className="pt-2 flex gap-4">
                  <button
                    onClick={() => setCurrentView('pricing')}
                    className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black px-6 py-3 rounded-xl transition shadow-lg"
                  >
                    View Pricing & Lead Rules
                  </button>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 max-w-sm w-full space-y-3 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-slate-300 font-medium">Premium Plan</span>
                  <span className="font-extrabold text-emerald-400 text-lg">₹299 / Month</span>
                </div>
                <hr className="border-white/10" />
                <ul className="space-y-2 text-slate-300">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Activity ₹10–₹100: <strong>100% INCLUDED</strong></li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Activity &gt; ₹100: Transparent lead charge</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Clear Wallet Ledger with Zero Hidden Fees</li>
                </ul>
              </div>
            </div>
          </section>
        </main>
      )}

      {/* ==========================================
          VIEW 2: SEARCH RESULTS
      ========================================== */}
      {currentView === 'search' && (
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8 space-y-6">
          {/* Top Search Controls */}
          <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="w-full md:w-auto flex-1 flex gap-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search business..."
                className="w-full bg-slate-50 border border-slate-200 px-4 py-2 rounded-xl text-xs font-semibold focus:outline-none"
              />
              <button
                onClick={() => executeSearch()}
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-5 py-2 rounded-xl text-xs transition"
              >
                Filter
              </button>
            </div>

            {activeCategory && (
              <div className="flex items-center gap-2 bg-orange-50 text-orange-700 px-3 py-1.5 rounded-xl text-xs font-bold border border-orange-200">
                Category: {activeCategory}
                <button onClick={() => { setActiveCategory(null); executeSearch(searchQuery, searchLoc, null); }} className="hover:text-red-500">
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Typo Correction Banner */}
          {parsedInfo && parsedInfo.parsedKeyword && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-900 flex justify-between items-center">
              <span>
                Smart Search Interpretation: Searching for <strong>"{parsedInfo.parsedKeyword}"</strong> {parsedInfo.locationTerm && `in "${parsedInfo.locationTerm}"`}
              </span>
              <span className="bg-amber-200 text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded-full">Typo-Tolerant Engine</span>
            </div>
          )}

          {/* Results Grid */}
          {filteredBusinesses.length === 0 ? (
            <div className="bg-white p-12 rounded-3xl text-center border border-slate-100 space-y-3">
              <p className="text-4xl">🔍</p>
              <h3 className="font-extrabold text-lg">No businesses matched your search</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">Try clearing your filters or searching for general terms like "tea" or "dentist".</p>
              <button onClick={() => { setSearchQuery(''); setActiveCategory(null); executeSearch('', '', null); }} className="text-orange-600 font-bold text-xs underline">
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredBusinesses.map((biz) => (
                <div key={biz.id} className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h3
                            onClick={() => { setSelectedBusiness(biz); setCurrentView('detail'); }}
                            className="font-extrabold text-base text-slate-900 hover:text-orange-600 cursor-pointer transition"
                          >
                            {biz.name}
                          </h3>
                          {biz.is_verified && <ShieldCheck className="w-4 h-4 text-emerald-500 fill-emerald-100" />}
                        </div>
                        <p className="text-xs font-bold text-orange-600 mt-0.5">{biz.category}</p>
                      </div>
                      <div className="flex items-center bg-amber-50 px-2 py-1 rounded-lg border border-amber-200 shrink-0">
                        <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500 mr-1" />
                        <span className="text-xs font-black text-amber-900">{biz.rating_avg}</span>
                        <span className="text-[10px] text-slate-500 ml-1">({biz.rating_count})</span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-500 flex items-center gap-1 mt-2">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      {biz.area}, {biz.city} - {biz.pincode}
                    </p>
                    <p className="text-xs text-slate-600 mt-2 line-clamp-2">{biz.description}</p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                    <button
                      onClick={() => handleLeadAction(biz, 'call', 50)}
                      className="flex-1 flex items-center justify-center gap-1.5 bg-orange-50 hover:bg-orange-100 text-orange-700 font-bold py-2.5 rounded-xl text-xs transition border border-orange-200"
                    >
                      <Phone className="w-3.5 h-3.5" /> Call
                    </button>
                    <button
                      onClick={() => handleLeadAction(biz, 'whatsapp', 150)}
                      className="flex-1 flex items-center justify-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold py-2.5 rounded-xl text-xs transition border border-emerald-200"
                    >
                      <MessageSquare className="w-3.5 h-3.5" /> WhatsApp
                    </button>
                    <button
                      onClick={() => { setSelectedBusiness(biz); setCurrentView('detail'); }}
                      className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition"
                    >
                      View
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      )}

      {/* ==========================================
          VIEW 3: BUSINESS DETAIL VIEW
      ========================================== */}
      {currentView === 'detail' && selectedBusiness && (
        <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-8 space-y-6">
          <button onClick={() => setCurrentView('search')} className="text-xs font-bold text-slate-500 hover:text-slate-800 flex items-center gap-1">
            &larr; Back to Search Results
          </button>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-black text-slate-900">{selectedBusiness.name}</h1>
                  {selectedBusiness.is_verified && (
                    <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-xs font-bold px-2.5 py-1 rounded-full border border-emerald-200">
                      <ShieldCheck className="w-4 h-4 text-emerald-500" /> Verified Business
                    </span>
                  )}
                </div>
                <p className="text-xs sm:text-sm font-bold text-orange-600 mt-1">{selectedBusiness.category}</p>
              </div>

              <div className="flex items-center bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200">
                <Star className="w-5 h-5 text-amber-500 fill-amber-500 mr-1.5" />
                <span className="text-base font-black text-amber-900">{selectedBusiness.rating_avg}</span>
                <span className="text-xs text-slate-500 ml-1">({selectedBusiness.rating_count} reviews)</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
              {selectedBusiness.address}, {selectedBusiness.area}, {selectedBusiness.city} - {selectedBusiness.pincode}
            </p>

            {/* Direct Action Buttons */}
            <div className="flex flex-wrap gap-3 pt-4 border-t border-slate-100">
              <button
                onClick={() => handleLeadAction(selectedBusiness, 'call', 50)}
                className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-extrabold px-6 py-3 rounded-xl text-xs sm:text-sm transition shadow-sm"
              >
                <Phone className="w-4 h-4" /> Call Now
              </button>
              <button
                onClick={() => handleLeadAction(selectedBusiness, 'whatsapp', 150)}
                className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold px-6 py-3 rounded-xl text-xs sm:text-sm transition shadow-sm"
              >
                <MessageSquare className="w-4 h-4" /> WhatsApp Inquiry
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-3">
                <h3 className="font-extrabold text-sm text-slate-900">About Business</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{selectedBusiness.description}</p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm space-y-3">
              <h3 className="font-extrabold text-xs text-slate-900">Location Map</h3>
              <OpenStreetMap lat={selectedBusiness.lat} lng={selectedBusiness.lng} name={selectedBusiness.name} />
            </div>
          </div>
        </main>
      )}

      {/* ==========================================
          VIEW 4: BUSINESS OWNER DASHBOARD
      ========================================== */}
      {currentView === 'dashboard' && (
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8 space-y-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-black text-slate-900">Business Dashboard</h1>
              <p className="text-xs text-slate-500">Manage leads, track analytics, and review transparent wallet fees</p>
            </div>
            <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1.5 rounded-full border border-emerald-200">
              Premium Subscription: Active (₹299/mo)
            </span>
          </div>

          {/* Wallet Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-900 text-white p-6 rounded-3xl shadow-xl space-y-4 md:col-span-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">Current Wallet Balance</span>
                <Wallet className="w-6 h-6 text-emerald-400" />
              </div>
              <div className="text-4xl font-black text-emerald-400">
                ₹{walletBalance.toFixed(2)}
              </div>
              <div className="bg-white/10 p-3 rounded-xl border border-white/10 text-xs text-slate-300 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
                No silent deductions. Activity under ₹100 is 100% included.
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-3">
              <h3 className="font-extrabold text-xs text-slate-800">Recharge Wallet</h3>
              <input
                type="number"
                placeholder="Enter amount (e.g. 500)"
                className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none"
              />
              <button
                onClick={() => setWalletBalance((prev) => prev + 500)}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2.5 rounded-xl text-xs transition"
              >
                Top Up ₹500 via Razorpay
              </button>
            </div>
          </div>

          {/* Leads Table */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
            <h3 className="font-extrabold text-sm text-slate-900">Recent Customer Leads</h3>
            <div className="divide-y divide-slate-100">
              {leads.map((ld) => (
                <div key={ld.id} className="py-3 flex justify-between items-center text-xs">
                  <div>
                    <p className="font-bold text-slate-800">{ld.name} ({ld.source.toUpperCase()})</p>
                    <p className="text-[10px] text-slate-400">Estimated Inquiry Value: ₹{ld.val} • {ld.date}</p>
                  </div>
                  <div className="text-right">
                    <span className={`font-bold px-2 py-0.5 rounded ${ld.charged > 0 ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'}`}>
                      {ld.charged > 0 ? `Charged ₹${ld.charged}` : 'INCLUDED (Free)'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Ledger Table */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
            <h3 className="font-extrabold text-sm text-slate-900">Transparent Wallet Ledger</h3>
            <div className="divide-y divide-slate-100">
              {transactions.map((tx) => (
                <div key={tx.id} className="py-3 flex justify-between items-center text-xs">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-xl ${tx.type === 'credit' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                      {tx.type === 'credit' ? <ArrowDownLeft className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                    </div>
                    <div>
                      <p className="font-bold text-slate-800">{tx.desc}</p>
                      <p className="text-[10px] text-slate-400">{tx.date} • ID: {tx.id}</p>
                    </div>
                  </div>
                  <span className={`font-black ${tx.type === 'credit' ? 'text-emerald-600' : 'text-slate-900'}`}>
                    {tx.type === 'credit' ? '+' : '-'}₹{tx.amount.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </main>
      )}

      {/* ==========================================
          VIEW 5: PRICING & LEAD RULES
      ========================================== */}
      {currentView === 'pricing' && (
        <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-12 space-y-8">
          <div className="text-center space-y-3">
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900">Transparent Pricing for Local Businesses</h1>
            <p className="text-xs sm:text-sm text-slate-500">Built so small tea stalls, kiranas, and local service providers are never excluded.</p>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl space-y-6">
            <div className="flex justify-between items-center border-b border-slate-100 pb-6">
              <div>
                <h2 className="text-2xl font-black text-slate-900">Premium Business Listing</h2>
                <p className="text-xs text-slate-500">Full platform verification & listing access</p>
              </div>
              <div className="text-right">
                <span className="text-3xl font-black text-emerald-600">₹299</span>
                <span className="text-xs text-slate-400"> / month</span>
              </div>
            </div>

            <div className="space-y-4 text-xs sm:text-sm">
              <h3 className="font-extrabold text-slate-900">Customer Lead Charge Rules:</h3>
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-1">
                <p className="font-extrabold text-emerald-900">1. Customer Activity ₹10 – ₹100 = INCLUDED</p>
                <p className="text-emerald-700 text-xs">Small daily orders or casual inquiries have NO separate lead charge.</p>
              </div>

              <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 space-y-1">
                <p className="font-extrabold text-amber-900">2. High-Value Activity &gt; ₹100 = Qualified Charge</p>
                <p className="text-amber-700 text-xs">Configurable transparently by Admin. Never silently deducted without a clear transaction record in your dashboard wallet.</p>
              </div>
            </div>

            <button
              onClick={() => setCurrentView('dashboard')}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-extrabold py-3.5 rounded-xl transition shadow-lg text-xs sm:text-sm"
            >
              Start Subscription for ₹299/mo
            </button>
          </div>
        </main>
      )}

      {/* FOOTER */}
      <footer className="bg-slate-900 text-slate-400 py-8 px-4 border-t border-slate-800 text-xs mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="bg-orange-500 text-white font-extrabold px-2 py-1 rounded-md text-xs">NearMe</span>
            <span className="text-white font-bold">India Platform</span>
          </div>
          <p>© 2026 NearMe India. Built for local discovery and business growth.</p>
        </div>
      </footer>
    </div>
  );
}
