import React from 'react';
import { ArrowUpRight, Check, Building, Compass } from 'lucide-react';
import { DEVELOPMENTS } from '../data/developments';
import { audioSystem } from '../utils/audioSystem';

export default function Developments({ onRequestViewing = () => {} }) {
  return (
    <div className="pt-32 pb-28 px-6 md:px-16 max-w-7xl mx-auto select-none">
      {/* Header */}
      <div className="border-b border-white/10 pb-12 mb-16">
        <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#C5A880] block mb-2">
          ARCHITECTURAL MASTERPLANS
        </span>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <h1 className="text-4xl md:text-6xl font-serif text-white tracking-tight">
            Signature Developments
          </h1>
          <p className="text-xs md:text-sm text-[#A0A09B] max-w-md font-sans-ui leading-relaxed">
            Pioneering waterfront towers, private sovereign islands, and boutique tropical modernist collections.
          </p>
        </div>
      </div>

      {/* Developments Showcase */}
      <div className="space-y-20">
        {DEVELOPMENTS.map((dev, index) => (
          <article 
            key={dev.id}
            className="border border-white/10 bg-[#121314] overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              {/* Image side */}
              <div className="lg:col-span-7 relative min-h-[380px] lg:min-h-[500px] overflow-hidden">
                <img
                  src={dev.heroImage}
                  alt={dev.title}
                  className="w-full h-full object-cover brightness-90 hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute top-6 left-6 px-3 py-1.5 bg-[#0E0F0F]/85 backdrop-blur-md text-[10px] font-mono text-[#C5A880] uppercase border border-white/10">
                  {dev.status}
                </div>
              </div>

              {/* Text & Specs side */}
              <div className="lg:col-span-5 p-8 md:p-12 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-[#A0A09B] uppercase tracking-wider mb-2">
                    <span>{dev.location}</span>
                    <span>·</span>
                    <span>Completion: {dev.completion}</span>
                  </div>

                  <h2 className="text-3xl md:text-4xl font-serif text-white mb-3">
                    {dev.title}
                  </h2>

                  <p className="text-xs md:text-sm text-[#A0A09B] font-sans-ui leading-relaxed mb-6">
                    {dev.description}
                  </p>

                  {/* Features Schedule */}
                  <div className="grid grid-cols-2 gap-3 py-4 border-y border-white/10 text-xs font-mono mb-6">
                    {dev.features.map((f, idx) => (
                      <div key={idx}>
                        <span className="text-[10px] text-[#6B6B67] uppercase block">{f.label}</span>
                        <span className="text-white text-xs">{f.value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Key Amenities */}
                  <div className="space-y-1.5 mb-8">
                    <span className="text-[10px] font-mono text-[#C5A880] uppercase tracking-wider block mb-2">
                      DEVELOPMENT HIGHLIGHTS:
                    </span>
                    <ul className="space-y-1 text-xs text-[#D0CAC0]">
                      {dev.amenities.slice(0, 3).map((am, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <Check size={12} className="text-[#C5A880] shrink-0" />
                          <span>{am}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-mono text-[#6B6B67] uppercase block">
                      UNIT TIERS
                    </span>
                    <span className="text-lg font-serif text-[#C5A880]">
                      {dev.startingPriceLabel}
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      audioSystem.playClick();
                      onRequestViewing();
                    }}
                    className="px-6 py-3 bg-[#F4F1EA] text-[#0E0F0F] text-xs uppercase tracking-widest font-semibold hover:bg-[#C5A880] transition-colors flex items-center gap-2"
                  >
                    <span>Register Interest</span>
                    <ArrowUpRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
