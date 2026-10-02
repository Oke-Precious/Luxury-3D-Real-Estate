import React from 'react';
import { ArrowRight, ShieldCheck, Compass, Eye, Layers } from 'lucide-react';
import { BRAND_CONFIG } from '../data/config';
import { audioSystem } from '../utils/audioSystem';

export default function About({ onRequestViewing = () => {} }) {
  return (
    <div className="pt-32 pb-28 px-6 md:px-16 max-w-7xl mx-auto select-none">
      {/* Manifesto Opening */}
      <div className="border-b border-white/10 pb-16 mb-20 max-w-5xl">
        <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#C5A880] block mb-4">
          ARCHITECTURAL MANIFESTO
        </span>
        <h1 className="text-4xl md:text-7xl font-serif text-white tracking-tight leading-[1.05] mb-8">
          Architecture That Becomes Home.
        </h1>
        <p className="text-base md:text-xl text-[#D0CAC0] font-sans-ui leading-relaxed max-w-3xl">
          {BRAND_CONFIG.name} was established with a singular conviction: that extraordinary architecture should not be treated as a fungible commodity, but experienced as an enduring cultural contribution.
        </p>
      </div>

      {/* Philosophy Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-24 border-b border-white/10">
        <div className="space-y-4">
          <span className="text-xs font-mono text-[#C5A880] tracking-widest block">01 / CURATION</span>
          <h3 className="text-2xl font-serif text-white">Sovereignty of Space</h3>
          <p className="text-xs md:text-sm text-[#A0A09B] font-sans-ui leading-relaxed">
            We represent fewer than fifteen residences concurrently. Each property undergoes rigorous structural, acoustic, and aesthetic review before entering our private mandate.
          </p>
        </div>

        <div className="space-y-4">
          <span className="text-xs font-mono text-[#C5A880] tracking-widest block">02 / MATERIALITY</span>
          <h3 className="text-2xl font-serif text-white">Honesty of Matter</h3>
          <p className="text-xs md:text-sm text-[#A0A09B] font-sans-ui leading-relaxed">
            We champion structures celebrated for natural aging: bush-hammered granites, Roman travertine slabs, patinated architectural bronze, and acoustic timber joinery.
          </p>
        </div>

        <div className="space-y-4">
          <span className="text-xs font-mono text-[#C5A880] tracking-widest block">03 / DISCRETION</span>
          <h3 className="text-2xl font-serif text-white">Confidential Mandate</h3>
          <p className="text-xs md:text-sm text-[#A0A09B] font-sans-ui leading-relaxed">
            Our private client transactions remain shielded behind strict legal and institutional non-disclosure protocols, protecting both patrons and architectural provenance.
          </p>
        </div>
      </div>

      {/* Advisory Services */}
      <div className="py-24 border-b border-white/10">
        <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#C5A880] block mb-2">
          CLIENT CAPABILITIES
        </span>
        <h2 className="text-3xl md:text-5xl font-serif text-white tracking-tight mb-12">
          Private Client Services
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="border border-white/10 bg-[#121314] p-8 space-y-3">
            <h4 className="text-xl font-serif text-white">Off-Market Acquisition Mandates</h4>
            <p className="text-xs md:text-sm text-[#A0A09B] font-sans-ui leading-relaxed">
              Discreet identification and acquisition of trophy waterfront parcels and private estates across Ikoyi and Banana Island that never reach public listings.
            </p>
          </div>

          <div className="border border-white/10 bg-[#121314] p-8 space-y-3">
            <h4 className="text-xl font-serif text-white">Architectural Due Diligence</h4>
            <p className="text-xs md:text-sm text-[#A0A09B] font-sans-ui leading-relaxed">
              Comprehensive structural engineering evaluations, marine soil mechanics analysis, acoustic benchmarking, and building automation assessments.
            </p>
          </div>

          <div className="border border-white/10 bg-[#121314] p-8 space-y-3">
            <h4 className="text-xl font-serif text-white">Commission Advisory</h4>
            <p className="text-xs md:text-sm text-[#A0A09B] font-sans-ui leading-relaxed">
              Pairing visionary collectors and patrons with leading international and African master architects for ground-up bespoke residential commissions.
            </p>
          </div>

          <div className="border border-white/10 bg-[#121314] p-8 space-y-3">
            <h4 className="text-xl font-serif text-white">Curated Divestment Dossiers</h4>
            <p className="text-xs md:text-sm text-[#A0A09B] font-sans-ui leading-relaxed">
              Crafting bespoke architectural monographs, 3D interactive spatial digital twins, and cinematic film productions for signature property dispositions.
            </p>
          </div>
        </div>
      </div>

      {/* Advisory CTA */}
      <div className="pt-20 text-center space-y-6 max-w-2xl mx-auto">
        <h3 className="text-3xl font-serif text-white">
          Begin a Confidential Advisory Dialogue
        </h3>
        <p className="text-xs md:text-sm text-[#A0A09B] font-sans-ui leading-relaxed">
          Reach our private client gallery in Ikoyi or Mayfair to discuss sovereign acquisitions and private viewings.
        </p>
        <button
          onClick={() => {
            audioSystem.playClick();
            onRequestViewing();
          }}
          className="px-8 py-3.5 bg-[#F4F1EA] text-[#0E0F0F] text-xs uppercase tracking-widest font-semibold hover:bg-[#C5A880] transition-colors"
        >
          Connect with a Senior Partner
        </button>
      </div>
    </div>
  );
}
