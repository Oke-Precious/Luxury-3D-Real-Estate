import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Check, ArrowRight, Eye } from 'lucide-react';
import { PROPERTIES } from '../data/properties';
import { formatPrice } from '../utils/formatCurrency';
import { audioSystem } from '../utils/audioSystem';

export default function Compare({
  compareIds = [],
  currency = 'NGN',
  onRemoveCompare = () => {},
  onClearCompare = () => {},
  onSelectProperty = () => {},
  onRequestViewing = () => {}
}) {
  const comparedProperties = PROPERTIES.filter((p) => compareIds.includes(p.id));

  return (
    <div className="pt-32 pb-28 px-6 md:px-16 max-w-7xl mx-auto select-none">
      {/* Header */}
      <div className="border-b border-white/10 pb-12 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#C5A880] block mb-2">
            ARCHITECTURAL BENCHMARKING
          </span>
          <h1 className="text-4xl md:text-6xl font-serif text-white tracking-tight">
            Portfolio Comparison ({comparedProperties.length} of 3)
          </h1>
        </div>

        {comparedProperties.length > 0 && (
          <button
            onClick={() => {
              audioSystem.playClick();
              onClearCompare();
            }}
            className="text-xs font-mono uppercase text-[#A0A09B] hover:text-white flex items-center gap-2 border border-white/15 px-3 py-2"
          >
            <Trash2 size={14} />
            <span>Clear Comparison</span>
          </button>
        )}
      </div>

      {comparedProperties.length === 0 ? (
        <div className="py-24 text-center border border-white/10 bg-[#121314] p-12">
          <h3 className="text-2xl font-serif text-white mb-3">No Residences Selected</h3>
          <p className="text-xs md:text-sm text-[#A0A09B] max-w-md mx-auto mb-8 leading-relaxed">
            Select "Compare" on up to 3 properties across our curated collection to evaluate structural square meters, bedroom suites, and amenities side-by-side.
          </p>
          <Link
            to="/properties"
            className="px-6 py-3 bg-[#F4F1EA] text-[#0E0F0F] text-xs uppercase tracking-widest font-semibold hover:bg-[#C5A880] transition-colors"
          >
            Browse Curated Residences
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {comparedProperties.map((p) => (
            <div key={p.id} className="border border-white/10 bg-[#121314] p-6 flex flex-col justify-between">
              <div>
                <div className="relative h-48 overflow-hidden mb-6 group">
                  <img
                    src={p.heroImage}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <button
                    onClick={() => onRemoveCompare(p.id)}
                    className="absolute top-2 right-2 p-1.5 bg-[#0E0F0F]/80 text-[#A0A09B] hover:text-white"
                  >
                    Remove
                  </button>
                </div>

                <span className="text-[10px] font-mono text-[#C5A880] uppercase block mb-1">
                  {p.district}, {p.city}
                </span>
                <h3 className="text-2xl font-serif text-white mb-2">
                  {p.title}
                </h3>
                <div className="text-lg font-serif text-[#C5A880] mb-6 pb-4 border-b border-white/10">
                  {formatPrice(p.price, currency)}
                </div>

                {/* Specs */}
                <div className="space-y-3 text-xs font-mono">
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-[#6B6B67]">INTERNAL AREA</span>
                    <span className="text-white font-medium">{p.internalArea} m²</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-[#6B6B67]">EXTERNAL AREA</span>
                    <span className="text-white font-medium">{p.externalArea} m²</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-[#6B6B67]">BEDROOM SUITES</span>
                    <span className="text-white font-medium">{p.bedrooms}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-[#6B6B67]">BATHROOMS</span>
                    <span className="text-white font-medium">{p.bathrooms}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-[#6B6B67]">VEHICLE GALLERY</span>
                    <span className="text-white font-medium">{p.parking} Bays</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-[#6B6B67]">ARCHITECT</span>
                    <span className="text-white font-sans-ui text-right truncate max-w-[150px]">{p.architect}</span>
                  </div>
                </div>

                {/* Distinctive Features */}
                <div className="mt-6 pt-4 border-t border-white/10">
                  <span className="text-[10px] font-mono text-[#C5A880] uppercase tracking-wider block mb-2">
                    HIGHLIGHTS:
                  </span>
                  <ul className="space-y-1 text-xs text-[#A0A09B]">
                    {p.amenities.slice(0, 4).map((a, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <Check size={12} className="text-[#C5A880] shrink-0" />
                        <span className="truncate">{a}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-white/10 space-y-2">
                <button
                  onClick={() => onSelectProperty(p)}
                  className="w-full py-3 bg-white/10 hover:bg-white/20 text-white text-xs uppercase tracking-widest font-medium transition-colors"
                >
                  Enter Residence
                </button>
                <button
                  onClick={() => onRequestViewing(p)}
                  className="w-full py-3 bg-[#C5A880] hover:bg-white text-[#0E0F0F] text-xs uppercase tracking-widest font-semibold transition-colors"
                >
                  Request Viewing
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
