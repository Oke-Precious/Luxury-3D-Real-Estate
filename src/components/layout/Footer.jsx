import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import { BRAND_CONFIG } from '../../data/config';
import { audioSystem } from '../../utils/audioSystem';

export default function Footer({ onRequestViewing = () => {} }) {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) return;
    audioSystem.playTransition();
    setIsSubscribed(true);
  };

  return (
    <footer className="relative bg-[#0A0B0B] text-[#F4F1EA] border-t border-white/10 pt-20 pb-12 overflow-hidden select-none">
      {/* Background Architectural Watermark */}
      <div className="absolute top-0 right-0 pointer-events-none opacity-[0.03] select-none">
        <span className="font-serif text-[18vw] leading-none text-white block">
          ATELIER
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Massive Editorial Closing Statement */}
        <div className="border-b border-white/10 pb-16 mb-16">
          <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#C5A880] block mb-4">
            CONFIDENTIAL CLIENT ACQUISITION
          </span>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <h2 className="text-4xl md:text-7xl lg:text-8xl font-serif text-white tracking-tight leading-[0.95]">
              FIND<br />
              <span className="italic text-[#C5A880]">YOUR PLACE.</span>
            </h2>

            <div className="max-w-md space-y-4">
              <p className="text-sm text-[#A0A09B] font-sans-ui leading-relaxed">
                Whether seeking an offshore ocean sanctuary, a sky duplex, or commissioning a visionary private estate, our partners guide every acquisition with discretion.
              </p>
              <button
                onClick={() => {
                  audioSystem.playClick();
                  onRequestViewing();
                }}
                className="px-6 py-3 bg-[#F4F1EA] text-[#0E0F0F] text-xs uppercase tracking-widest font-semibold hover:bg-[#C5A880] transition-colors inline-flex items-center gap-3"
              >
                <span>Initiate Private Briefing</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Multi-column Navigation & Directory */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 pb-16 border-b border-white/10 text-xs">
          {/* Col 1: Portfolio */}
          <div className="space-y-4">
            <span className="font-mono text-[#C5A880] tracking-widest uppercase block">
              PORTFOLIO
            </span>
            <ul className="space-y-2.5 text-[#A0A09B]">
              <li><Link to="/properties" className="hover:text-white transition-colors">The Azure Residence</Link></li>
              <li><Link to="/properties" className="hover:text-white transition-colors">Ocean House</Link></li>
              <li><Link to="/properties" className="hover:text-white transition-colors">The Meridian Penthouse</Link></li>
              <li><Link to="/properties" className="hover:text-white transition-colors">The Monolith Pavilion</Link></li>
              <li><Link to="/properties" className="hover:text-white transition-colors">Lumina Glass Sanctuary</Link></li>
            </ul>
          </div>

          {/* Col 2: Developments */}
          <div className="space-y-4">
            <span className="font-mono text-[#C5A880] tracking-widest uppercase block">
              DEVELOPMENTS
            </span>
            <ul className="space-y-2.5 text-[#A0A09B]">
              <li><Link to="/developments" className="hover:text-white transition-colors">The Obsidian Towers</Link></li>
              <li><Link to="/developments" className="hover:text-white transition-colors">Aura Waterfront</Link></li>
              <li><Link to="/developments" className="hover:text-white transition-colors">The Brise-Soleil</Link></li>
              <li><Link to="/developments" className="hover:text-white transition-colors">Marina Sky Collection</Link></li>
            </ul>
          </div>

          {/* Col 3: Enclaves */}
          <div className="space-y-4">
            <span className="font-mono text-[#C5A880] tracking-widest uppercase block">
              LOCATIONS
            </span>
            <ul className="space-y-2.5 text-[#A0A09B]">
              <li><Link to="/locations" className="hover:text-white transition-colors">Ikoyi Enclave</Link></li>
              <li><Link to="/locations" className="hover:text-white transition-colors">Banana Island Point</Link></li>
              <li><Link to="/locations" className="hover:text-white transition-colors">Victoria Island Waterfront</Link></li>
              <li><Link to="/locations" className="hover:text-white transition-colors">Eko Atlantic Marina</Link></li>
              <li><Link to="/locations" className="hover:text-white transition-colors">Lekki Coastal Shore</Link></li>
            </ul>
          </div>

          {/* Col 4: Atelier */}
          <div className="space-y-4">
            <span className="font-mono text-[#C5A880] tracking-widest uppercase block">
              ATELIER
            </span>
            <ul className="space-y-2.5 text-[#A0A09B]">
              <li><Link to="/about" className="hover:text-white transition-colors">Architectural Manifesto</Link></li>
              <li><Link to="/journal" className="hover:text-white transition-colors">Journal & Insights</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Private Client Galleries</Link></li>
              <li><Link to="/compare" className="hover:text-white transition-colors">Compare Portfolio</Link></li>
            </ul>
          </div>

          {/* Col 5: Private Dispatch / Newsletter */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1 space-y-4">
            <span className="font-mono text-[#C5A880] tracking-widest uppercase block">
              PRIVATE DISPATCH
            </span>
            <p className="text-xs text-[#A0A09B] leading-relaxed">
              Curated monographs on off-market architectural listings, twice per quarter.
            </p>
            {isSubscribed ? (
              <div className="p-3 bg-white/5 border border-[#C5A880]/30 text-xs text-[#C5A880] flex items-center gap-2">
                <CheckCircle2 size={14} />
                <span>Subscription Confirmed</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  placeholder="Enter confidential email..."
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full bg-[#141516] border border-white/15 px-3 py-2 text-xs text-[#F4F1EA] placeholder:text-[#6B6B67] focus:border-[#C5A880] focus:outline-none"
                />
                <button
                  type="submit"
                  className="w-full py-2 bg-white/10 hover:bg-[#C5A880] hover:text-[#0E0F0F] text-xs font-mono uppercase tracking-wider transition-colors"
                >
                  Join Private List
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Credits & Disclaimers */}
        <div className="pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-[11px] font-mono text-[#6B6B67]">
          <div>
            © {new Date().getFullYear()} {BRAND_CONFIG.legalName}. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <span className="hover:text-white transition-colors cursor-pointer">Privacy Protocol</span>
            <span className="hover:text-white transition-colors cursor-pointer">Terms of Mandate</span>
            <span className="hover:text-white transition-colors cursor-pointer">Architectural Accreditation</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
